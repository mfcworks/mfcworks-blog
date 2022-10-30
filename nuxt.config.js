export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'mynuxt5',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      //<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/http'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/index.js' }
  ],

  server: {
    host: '0',
    port: 3000
  },

  http: {
    browserBaseURL: '/'
  },

  router: {
    // URL末尾のスラッシュを強制する
    trailingSlash: true
  },

  publicRuntimeConfig: {
    // Blog configuration
    blogConfig: {
      // ブログのタイトル
      title: '技術メモ',
      // ヘッダ部へ固定するページへのリンク
      fixedLinks: ['about'],
      // Copyright
      copyright: '2022 mfcworks. All rights reserved.'
    }
  }
}
