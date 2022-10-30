<template>
    <!-- <body class="{block:IndexPage}page-index{/block:IndexPage}{block:PermalinkPage}page-permalink page-{PostID}{/block:PermalinkPage}"> -->
    <!-- bodyの代わりにdiv　page-{PostID}のクラスは不要か？ -->
    <div :class="{ 'page-index': indexPage, 'page-permalink': permalinkPage }">

        <!-- IfEnableLikeButtonのスクリプト除外 -->
        <!-- カスタムCSS除外 -->

        <div id="container">
            <div class="mobile-nav-panel">
                <i class="icon-reorder icon-large"></i>
            </div>

            <header id="header" role="banner">
                <h1 class="blog-title">
                    <a href="/">{{ title }}</a>
                </h1>

                <nav class="nav" role="navigation">
                    <ul>
                        <template v-if="pages.length > 0">
                            <li v-for="(page, index) in pages" :key="index">
                                <a :href="page.url">{{ page.label }}</a>
                            </li>
                        </template>
                        <li>
                            <a href="/archive">Archive</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <div id="main" class="autopagerize_page_element" role="main">

                <h2 v-if="tagPage" class="tagged">Posts tagged "{{ tag }}"</h2>

                <!-- 投稿 -->
                <!-- ここでArticleを呼び出す -->
                

                <!-- メインページ・タグページのみ：記事ごとの区切り線 -->
                <hr class="article-devider">

                <!-- パーマリンクページのページャ(prev/next) -->
                <div class="pagenation pagenation-permalink">
                <a v-if="nextPostUrl" :href="nextPostUrl" class="next" rel="next">Newer Post</a>
                <a v-if="prevPostUrl" :href="prevPostUrl">Older Post</a>
                </div>

                <!-- メインページ・タグページのページャ(仮) -->
                <div class="pagenation pagenation-index">
                <a :href="prevPostUrl">Prev</a>
                <span class="current-page">{{1}}</span>
                <a class="jump-page" :href="jumpPostUrl">{{2}}</a>
                <a class="jump-page" :href="jumpPostUrl">{{3}}</a>
                <a class="jump-page" :href="jumpPostUrl">{{4}}</a>
                <a class="jump-page" :href="jumpPostUrl">{{5}}</a>
                <a :href="nextPostUrl" class="next" rel="next">Next</a>
            </div>

            </div> <!--END: main-->

            <footer id="footer">
            <h1 class="footer-blog-title">
                <a href="/">{{title}}</a>
            </h1>
            <span class="copyright">
                Copyright(C) {{copyrightYears}} {{title}}<br />
                <!-- ↓ ここ消さないでほしいっス. -->
                <a href="http://sanographix.github.io/tumblr/apollo/" target="_blank">Apollo</a> theme designed by <a
                    href="http://www.sanographix.net/" target="_blank">SANOGRAPHIX.NET</a>
            </span>
        </footer>

        </div> <!--END: container-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                indexPage: true,
                permalinkPage: false,
                title: 'ブログのタイトル',
                pages: [
                    { url: '/page1', label: 'page 1' },
                    { url: '/page2', label: 'page 2' },
                ],
                tagPage: false,
                tag: '関連タグ',
                prevPostUrl: 'aaa',
                nextPostUrl: 'bbb',
                jumpPostUrl: '',
                copyrightYears: '2022'
            }
        }
    }
</script>

<style scoped>
</style>