<template>
    <IndexPage :postData="postData" :selectedTag="null" />
</template>

<script>
export default {
    async asyncData({ params, error, $http, redirect }) {

        if (params.number === '1') {
            redirect('/')
        }

        const content = await $http.$get(`/api/page/${params.number}`)

        // let content = params.number
        if (content === null) {
            // layouts/error.vueが適用
            error({ statusCode: 404 })
        } else {
            return {
                postData: content
            }
        }
    }
}
</script>
