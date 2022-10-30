<template>
    <IndexPage :postData="postData" :selectedTag="tag" />
</template>

<script>
export default {
    async asyncData({ params, error, $http }) {
        if (params.tagname === '') {
            error({ statusCode: 404 })
        }

        const content = await $http.$get(`/api/tag/${params.tagname}/1`)

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
