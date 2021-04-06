export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'WeBe RADIO',
    htmlAttrs: {
      lang: 'it'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'La scuola che si ascolta' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/markdown-it-vue.js', ssr: false },
    '~/plugins/utils.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    jit: true
  },
  colorMode: {
    classSuffix: ''
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
  ],
  env: {
    apiUri: ( process.env.NUXT_ENV_API_URI || 'http://api.webe.radio:1337')
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: ( process.env.NUXT_ENV_API_URI || 'http://api.webe.radio:1337' )+'/graphql'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
