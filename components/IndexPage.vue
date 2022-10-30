<template>
    <div id="main" class="autopagerize_page_element" role="main">
        <!-- タグが選択された場合のみ -->
        <h2 v-if="selectedTag" class="tagged">Posts tagged "{{ selectedTag }}"</h2>

        <template v-for="post in postData.postData">
            <!-- 投稿 -->
            <Post :postData="post" />

            <hr class="article-devider">
        </template>

        <!-- pagination -->
        <div class="pagenation pagenation-index">
            <NuxtLink v-if="postData.prev" :to="postData.prev" no-prefetch>Prev</NuxtLink>
            <template v-for="pagination in postData.pagination">
                <span v-if="pagination.url === ''" class="current-page">{{ pagination.no }}</span>
                <NuxtLink v-else class="jump-page" :to="pagination.url" no-prefetch>{{ pagination.no }}</NuxtLink>
            </template>
            <NuxtLink v-if="postData.next" :to="postData.next" class="next" rel="next" no-prefetch>Next</NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: this.$config.blogConfig.title
        }
    },
    props: ['postData', 'selectedTag'],
    data() {
        return {

        }
    }
}
</script>
