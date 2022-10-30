<template>
    <div id="main" class="autopagerize_page_element" role="main">
        <!-- 投稿 -->
        <Post :postData="postData" />

        <!-- pagination -->
        <div class="pagenation pagenation-permalink">
            <NuxtLink v-if="postData.nextURL" :to="postData.nextURL" class="next" rel="next">Newer Post</NuxtLink>
            <NuxtLink v-if="postData.prevURL" :to="postData.prevURL">Older Post</NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: `${this.postData.title} - ${this.$config.blogConfig.title}`
        }
    },
    props: ['postData']
}
</script>
