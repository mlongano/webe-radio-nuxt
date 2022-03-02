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
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/markdown-it-vue.js', ssr: false },
    { src: '~/plugins/vue-plyr.js', mode: 'client' },
    { src: '~/plugins/mdi.js', mode: 'client' },
    '~/plugins/utils.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
      '~/components',
      '~/components/spinners',
      //{ path: '~/node_modules/vue-loading-spinner/src/components/', level: 1 },
  ],


  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    jit: true
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: ''
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
  ],
  env: {
    apiUri: ( process.env.NUXT_ENV_API_URI || 'https://api.webe.radio')
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: ( process.env.NUXT_ENV_API_URI || 'https://api.webe.radio' )+'/graphql'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        [ '@babel/plugin-proposal-private-methods', { loose: true } ]
      ]
    }
  },
}
