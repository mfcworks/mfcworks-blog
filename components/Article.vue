<!-- 投稿(Posts) の中身 -->
<!-- テキスト投稿に限定する -->
<template>
    <article :class="'post text'">

        <footer class="entry-meta-header" role="contentinfo">
            <span class="meta-elements date">
                <a :href="permalink"><time
                    :datetime="date.year+'-'+date.monthNumberWithZero+'-'+date.dayOfMonthWithZero">{{ date.shortMonth }}
                    {{ date.dayOfMonthWithZero }}, {{ date.year }}</time></a>
            </span>
            <span v-if="author" class="meta-elements author">
                by {{ author }}
            </span>
        </footer>

        <header class="entry-header">
            <h1 class="entry-title"><a :href="permalink">{{ title }}</a></h1>
        </header>
        <div class="entry-content">
            {{ bodyHtml }}
        </div>


        <!-- 記事フッタ -->
        <footer class="entry-footer">
            <div class="entry-meta-footer">
                <div class="meta meta-footer">
                    <span class="meta-elements timeago">
                        <a :href="permalink">{{ timeAgo }}</a>
                    </span>
                    <template v-if="tags.length > 0">
                        &nbsp;&nbsp;·&nbsp;&nbsp;
                        <span class="meta-elements hastags">
                            <a v-for="(tag, index) in tags" :key="index" :href="tag.url">#{{ tag.tag }}</a>
                        </span>
                    </template>
                </div>
            </div>
        </footer>
    </article>

</template>

<script>
export default {
    data() {
        return {
            permalink: '',
            title: '',
            date: {
                year: '',
                monthNumberWithZero: '',
                dayOfMonthWithZero: '',
                shortMonth: ''
            },
            author: '',
            bodyHtml: '',
            timeAgo: '',
            tags: [{tag: 'tag', url: 'url'}]
        }
    }
}
</script>

<!-- 
    投稿の種類
    ・テキスト投稿　　　　{block:Text}
    ・画像投稿　　　　　　{block:Photo}
    ・パノラマ投稿　　　　{block:Panorama}
    ・フォトセット投稿　　{block:Photoset}
    ・引用投稿　　　　　　{block:Quote}
    ・リンク投稿　　　　　{block:Link}
    ・チャット投稿　　　　{block:Chat}
    ・音声投稿　　　　　　{block:Audio}
    ・動画投稿　　　　　　{block:Video}
    ・回答登録？　　　　　{block:Answer}
 -->

 <!--
    全体の関連タグ
    {TagsAsClasses}
    {PostType}
    {Permalink}

    {block:Date}
        {Year}
        {MonthNumberWithZero}
        {DayOfMonthWithZero}
        {ShortMonth}
        {DayOfMonthWithZero}
        {Year}

    {block:IfAuthor}
        {text:Author}


    // テキスト投稿
    {block:Text}
        {block:Title}
        {Title}
        {Body}

    // 画像投稿
    {block:Photo}
        {LinkOpenTag}～{LinkCloseTag}
        {PhotoURL-HighRes}
        {PhotoAlt}
        {block:Caption}
            {Caption}
    
    // フォトセット投稿
    {block:Photoset}
        {Photoset-700}
        {block:Caption}
            {Caption}
    
    // 引用投稿
    {block:Quote}
        {Length}
        {Quote}
        {block:Source}
            {Source}


    // リンク投稿
    {block:Link}
        {URL}
        {Target}
        {Name}
        {block:Description}
            {Description}

    // チャット投稿
    {block:Chat}
        {block:Title}
            {Title}
        {block:Lines}
            {Alt}
            {UserNumber}
            {block:Label}
                {Label}
            
    // ビデオ投稿
    {block:Video}
        {Video-700}
        {block:Caption}
            {Caption}

    // オーディオ投稿
    {block:Audio}
        {AudioPlayerBlack}
            {block:Caption}
                {Caption}

    // 回答投稿
    {block:Answer}
        {Question}
            {AskerPortraitURL-24}
            {Asker}
            {Answer}
    
    // Content Source（何時つくのか？？）
    {block:ContentSource}
        {SourceURL}
        {lang:Source}
        {block:SourceLogo}
            {BlackLogoURL}
            {LogoWidth}
            {LogoHeight}
            {SourceTitle}
        {block:NoSourceLogo}
            {SourceTitle}



 -->