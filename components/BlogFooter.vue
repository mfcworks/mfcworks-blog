<template>
    <footer id="footer">
        <h1 class="footer-blog-title">
            <NuxtLink to="/">{{ $config.blogConfig.title }}</NuxtLink>
        </h1>
        <span class="copyright">
            Copyright © {{ $config.blogConfig.copyright }}<br />
            <!-- ↓ ここ消さないでほしいっス. -->
            <a href="https://github.com/sanographix/tumblr/tree/master/apollo" target="_blank">Apollo</a> theme designed by <a
                href="http://www.sanographix.net/" target="_blank">SANOGRAPHIX.NET</a>
        </span>
    </footer>
</template>

<script>
</script>
