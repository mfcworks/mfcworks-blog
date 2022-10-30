<template>
    <IndexPage :postData="postData" :selectedTag="tag" />
</template>

<script>
export default {
    async asyncData({ params, error, $http, redirect }) {

        if (params.number === '1') {
            redirect(`/tag/${params.tagname}/`)
        }

        const content = await $http.$get(`/api/tag/${params.tagname}/${params.number}`)

        // let content = params.number
        if (content === null) {
            // layouts/error.vueが適用
            error({ statusCode: 404 })
        } else {
            return {
                tag: params.tagname,
                postData: content
            }
        }
    }
}
</script>
