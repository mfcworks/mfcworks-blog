<template>
    <article class="post text">

        <footer class="entry-meta-header" role="contentinfo">
            <span class="meta-elements date">
                <NuxtLink :to="postData.permalink"><time :datetime="dateTime">{{ dateString }}</time></NuxtLink>
            </span>
            <span v-if="postData.author" class="meta-elements author">
                by {{ postData.author }}
            </span>
        </footer>

        <header class="entry-header">
            <h1 class="entry-title"><NuxtLink :to="postData.permalink">{{ postData.title }}</NuxtLink></h1>
        </header>

        <div class="entry-content" v-html="postData.body"></div>

        <!-- 記事フッタ -->
        <footer class="entry-footer">
            <div class="entry-meta-footer">
                <div class="meta meta-footer">
                    <span class="meta-elements timeago">
                        <NuxtLink :to="postData.permalink">{{ postData.timeAgo }}</NuxtLink>
                    </span>
                    <template v-if="postData.tags.length > 0">
                        &nbsp;&nbsp;·&nbsp;&nbsp;
                        <span class="meta-elements hastags">
                            <NuxtLink v-for="(tag, index) in postData.tags" :key="index" :to="`/tag/${tag}/`">#{{ tag }}</NuxtLink>
                        </span>
                    </template>
                </div>
            </div>
        </footer>
    </article>
</template>

<script>
export default {
    props: ['postData'],
    computed: {
        dateTime() {
            const d = this.postData.date
            return d.slice(0, d.indexOf('T'))
        },
        dateString() {
            const d = this.postData.date
            return d.slice(0, d.indexOf('T')).replace(/-/g, '/')
        },
    }
}
</script>
