<template>
  <IndexPage :postData="postData" :selectedTag="null" />
</template>


<script>
export default {
  async asyncData({ error, $http }) {
    const content = await $http.$get('/api/page/1')

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
