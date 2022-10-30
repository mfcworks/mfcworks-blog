<template>
    <div>
        <div class="mobile-nav-panel" @click="showNav = !showNav">
            <i class="icon-reorder icon-large"></i>
        </div>

        <header id="header" role="banner">
            <h1 class="blog-title">
                <NuxtLink to="/">{{ $config.blogConfig.title }}</NuxtLink>
            </h1>

            <!-- PC表示用ナビゲーションバー -->
            <nav v-show="!showNav" class="nav" role="navigation">
                <ul>
                    <li v-for="(link, index) in $config.blogConfig.fixedLinks" :key="index">
                        <NuxtLink :to="`/${link}/`">{{ link }}</NuxtLink>
                    </li>
                </ul>
            </nav>
            <!-- モバイル表示用ナビゲーションメニュー -->
            <transition name="nav">
                <nav v-show="showNav" class="nav active" role="navigation">
                    <ul>
                        <li v-for="(link, index) in $config.blogConfig.fixedLinks" :key="index">
                            <NuxtLink :to="`/${link}/`">{{ link }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </transition>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // モバイル時、ハンバーガーメニュー表示フラグ
            showNav: false
        }
    },
    watch: {
        '$route': function(after, before) {
            // ページ遷移時メニュー表示リセット
            if (after.path !== before.path) {
                this.showNav = false
            }
        }
    }
}
</script>

<style scoped>
.nav-enter, .nav-leave-to {
    opacity: 0;
    transform: translateY(-5%);
}
.nav-enter-to, .nav-leave {
    opacity: 1;
    transform: translateY(0%);
}
.nav-enter-active, .nav-leave-active {
    transition: opacity .2s, transform .2s;
}
</style>
