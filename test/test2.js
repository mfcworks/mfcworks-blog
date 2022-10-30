// import fs from 'node:fs'
// import path from 'node:path'
// import fm from 'front-matter'
const fs = require('node:fs')
const path = require('node:path')
const fm = require('front-matter')

// 初期データ作成
// post を新しい順に並べた配列

const init = () => {
    // 全てのファイル名を取得する
    const files = fs.readdirSync('../posts').map((file) => {
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
    const entries = files.map((file) => {
        const content = fs.readFileSync(`../posts/${file}.md`).toString()
        const attr = fm(content).attributes

        return {
            title: file,
            date: new Date(attr.date),
            tags: attr.tags
        }
    })

    // entries == [{title: 'foo', date: <Date>, tags: []}, {title: 'bar', date: <Date>, tags: []}, ...]

    // 日付でソート（新しい順）したものを返す
    entries.sort((e1, e2) => e2.date - e1.date)
    return entries
}


const data = init()

console.log(data)