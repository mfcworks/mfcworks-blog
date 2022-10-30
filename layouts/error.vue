<template>
    <NotFound />
</template>

<script>
export default {
    head() {
        return {
            title: '404 - ' + this.$config.blogConfig.title
        }
    }
}
</script>
