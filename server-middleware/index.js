import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import fm from 'front-matter'
import { marked } from 'marked'


class System {


    /**
     * 2つの時刻(Dateオブジェクト)の差分を取り、どのくらいの期間の隔たりがあるかを返します。
     * 
     * @param {Date} past       過去時点の時刻
     * @param {Date} current    現在時刻
     * 
     * 隔たりの最大 返り値
     * 1秒まで      '0秒前'
     * 1分まで      '〇秒前'
     * 1時間まで    '〇分前'
     * 1日まで      '〇時間前'
     * 1週間まで    '〇日前'
     * 1ヵ月まで    '〇週間前'
     * 1年まで      '〇ヵ月前'
     * それ以上     '〇年前'
     */

    timeAgo(past, current) {
        const diff = (current - past) / 1000 //差分(秒)

        const second = 1
        const minute = second * 60
        const hour = minute * 60
        const day = hour * 24
        const week = day * 7
        const month = day * (365 / 12)
        const year = day * 365

        if (diff < second) { return '0秒前' }
        if (diff < minute) { return Math.trunc(diff / second) + '秒前' }
        if (diff < hour) { return Math.trunc(diff / minute) + '分前' }
        if (diff < day) { return Math.trunc(diff / hour) + '時間前' }
        if (diff < week) { return Math.trunc(diff / day) + '日前' }
        if (diff < month) { return Math.trunc(diff / week) + '週間前' }
        if (diff < year) { return Math.trunc(diff / month) + 'ヵ月前' }
        return Math.trunc(diff / year) + '年前'
    }

    /**
     * コンストラクタ
     */
    constructor(perPage) {
        /**
         * インデックスページにおける1ページあたりのエントリ数
         */
        this.PER_PAGE = perPage

        // 全てのファイル名を取得する
        const files = fs.readdirSync('posts').map((file) => {
            const fileName = file.toString()
            const ext = path.extname(fileName)
            return {
                basename: path.basename(fileName, ext),
                extname: ext
            }
        }).filter(({ extname }) => extname === '.md')
            .map(({ basename }) => basename)

        // files == ['foo', 'bar', ...]

        // 各ファイルの日付を取得する
        let entries = files.map((file) => {
            const content = fs.readFileSync(`posts/${file}.md`).toString()
            const attr = fm(content).attributes

            return {
                title: file,
                date: new Date(attr.date),
                tags: attr.tags,
                render: !attr.draft && !attr.hidden
            }
        })

        entries = entries.filter((entry) => entry.render)

        // entries == [{title: 'foo', date: <Date>, tags: []}, {title: 'bar', date: <Date>, tags: []}, ...]

        // 日付でソート（新しい順）したものを返す
        entries.sort((e1, e2) => e2.date - e1.date)
        this.allData = entries
    }


    /**
     * ファイルから記事を読み出します。
     */
    loadEntry(title) {
        // 要求ファイル名が空文字列
        if (title === '') {
            return null
        }

        // 要求ファイルが存在しない
        if (!fs.existsSync(`posts/${title}.md`)) {
            return null
        }

        const content = fs.readFileSync(`posts/${title}.md`).toString()

        // front-matter 分解
        const postData = fm(content)

        // draftだったらnullを返す
        if (postData.attributes.draft) {
            return null
        }

        return {
            title: postData.attributes.title,
            date: postData.attributes.date,
            author: postData.attributes.author,
            tags: postData.attributes.tags,
            body: marked.parse(postData.body),
            timeAgo: this.timeAgo(new Date(postData.attributes.date), new Date()),
            permalink: `/${title}/`
        }
    }

    /**
     * 
     * @param {string} tagName タグ名。空文字列の場合、全体のインデックスページを取得する
     * @param {integer} pageNo ページ番号
     */
    getTaggedPagination(tagName, pageNo) {
        // 記事のリスト(タグ名が指定されている場合は、タグ名で絞り込む)
        const entryList = (tagName === ''
            ? this.allData
            : this.allData.filter((entry) => entry.tags.includes(tagName)))

        // タグが見つからない
        if (entryList.length === 0) {
            return null
        }

        // ページ分割数
        let div = Math.trunc(entryList.length / this.PER_PAGE)
        div += (div * this.PER_PAGE !== entryList.length ? 1 : 0)

        // 範囲外の要求
        if (pageNo < 1 || div < pageNo) {
            return null
        }

        // 現ページの表示内容
        const postData = entryList.slice((pageNo - 1) * this.PER_PAGE, pageNo * this.PER_PAGE)
            .map((entry) => this.loadEntry(entry.title))

        //--------------------------------------------------
        // ページネーションの作成
        //--------------------------------------------------

        // 前のページに戻るリンク
        // タグなし /page/N/            1ページ目 /
        // タグ有り /tag/タグ名/N/
        let prev
        if (tagName === '') {
            prev = (pageNo === 1 ? null : (pageNo === 2 ? '/' : `/page/${pageNo - 1}/`))
        } else {
            prev = (pageNo === 1 ? null : (pageNo === 2 ? `/tag/${tagName}/` : `/tag/${tagName}/${pageNo - 1}/`))
        }

        // 次のページへ進むリンク
        let next
        if (tagName === '') {
            next = (pageNo === div ? null : `/page/${pageNo + 1}/`)
        } else {
            next = (pageNo === div ? null : `/tag/${tagName}/${pageNo + 1}/`)
        }

        // 番号でページに飛ぶリンク
        let arr
        if (div <= 5) {
            arr = Array(div).fill().map((_, i) => i + 1)
        } else {
            let p = pageNo
            if (p - 2 < 1) { p = 1 }
            if (p + 2 > div) { p = div - 2 }

            arr = Array(5).fill().map((_, i) => i + p - 2)
        }

        const pagination = arr.map((i) => {
            let url
            if (tagName === '') {
                url = (i === pageNo ? '' : (i === 1 ? '/' : `/page/${i}/`))
            } else {
                url = (i === pageNo ? '' : (i === 1 ? `/tag/${tagName}/` : `/tag/${tagName}/${i}/`))
            }

            return {
                no: i,
                url: url
            }
        })

        return {
            postData: postData,
            prev: prev,
            pagination: pagination,
            next: next
        }
    }


    loadEntries(pageNo) {
        const list = this.paginate(pageNo)

        if (list === null) {
            return null
        }

        return list.map((entry) => this.loadEntry(entry.title))
    }

    loadTaggedEntries(tagName, pageNo) {
        const list = this.paginateTagged(tagName, pageNo)

        if (list === null) {
            return null
        }

        return list.map((entry) => this.loadEntry(entry.title))
    }


    /**
     * titleが見つからないとき
     *   null
     * entriesがtitleのみのとき
     *   {prev: null, next: null}
     * titleが先頭のとき
     *   {perv: null, next: ***}
     * titleが末尾のとき
     *   {prev: ***, next: null}
     * titleが先頭でも末尾でもないとき
     *   {prev: ***, next: ***}
     */
    getPrevNext(title) {
        const index = this.allData.findIndex((entry) => entry.title === title)

        if (index < 0) {
            return null
        }

        return {
            prev: (index === 0 ? null : `/${this.allData[index - 1].title}/`),
            next: (index === this.allData.length - 1 ? null : `/${this.allData[index + 1].title}/`)
        }
    }

    // pageNo: 何ページに表示されるか
    getPagination(n) {

    }


    /**
     * allDataのうちNページ目のエントリリストを返す
     * @param n Nページ目(1 <= n)
     */
    paginate(n) {
        let div = Math.trunc(this.allData.length / this.PER_PAGE)
        div += (div * this.PER_PAGE !== this.allData.length ? 1 : 0)

        // 範囲外の要求
        if (n < 1 || div < n) {
            return null
        }

        return this.allData.slice((n - 1) * this.PER_PAGE, n * this.PER_PAGE)
    }


    /**
     * 指定したタグで絞り込まれたallDataのうちNページ目のエントリリストを返す
     * @param n Nページ目(1 <= n)
     */
    paginateTagged(tag, n) {
        const filteredData = this.allData.filter((entry) => entry.tags.includes(tag))
        let div = Math.trunc(filteredData.length / this.PER_PAGE)
        div += (div * this.PER_PAGE !== filteredData.length ? 1 : 0)

        // 範囲外の要求
        if (n < 1 || div < n) {
            return null
        }

        return filteredData.slice((n - 1) * this.PER_PAGE, n * this.PER_PAGE)
    }
}



const PER_PAGE = 3
const system = new System(PER_PAGE)

const app = express()

app.get('/page/:num', (req, res) => {
    const _num = req.params.num.match(/^[1-9][0-9]*$/g)

    // 要求が数値ではない
    if (!_num) {
        res.json(null)
        return
    }

    const num = parseInt(_num[0])
    const data = system.getTaggedPagination('', num)

    res.json(data)
    // if (data === null) {
    //     res.json(null)
    //     return
    // }

    // const pagination = system.getPagination(num)

    // res.json({ postData: entries, ...pagination })
})

// タグページ
app.get('/tag/:tagname/:num', (req, res) => {
    const tagname = req.params.tagname
    const _num = req.params.num.match(/^[1-9][0-9]*$/g)

    // タグ名が無効・要求が数値ではない
    if (tagname === '' || !_num) {
        res.json(null)
        return
    }

    const num = parseInt(_num[0])
    const data = system.getTaggedPagination(tagname, num)

    res.json(data)
    // if (entries === null) {
    //     res.json(null)
    //     return
    // }

    // const pagination = system.getPagination(num)

    // res.json({ postData: entries, ...pagination })
})

// Post を取得します
// Post.md のファイル名に使用可能な文字は
//   0-9　A-Z　a-z　_　-
// です。
app.get('/entry/:title', (req, res) => {
    const title = req.params.title.replace(/[^0-9A-Za-z_\-]/g, '')

    const postData = system.loadEntry(title)
    const prevNext = system.getPrevNext(title)

    if (postData === null) {
        res.json(null)
        return
    }

    res.json({ ...postData, ...prevNext })
})

export default app
