<template>
    <SinglePage :postData="postData"/>
</template>

<script>
export default {
    async asyncData({ params, error, $http }) {
        const content = await $http.$get(`/api/entry/${params.title}`)

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
