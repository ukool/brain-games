
/* eslint-disable */

const resolve = require('path').resolve;

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Тренажеры для мозга',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'msapplication-TileColor',
        content: '#554D84'
      },
      {
        name: 'msapplication-square70x70logo',
        content: '/img/favicon/ms-icon-70x70.png'
      },
      {
        name: 'msapplication-TileImage',
        content: '/img/favicon/ms-icon-144x144.png'
      },
      {
        name: 'msapplication-square150x150logo',
        content: '/img/favicon/ms-icon-150x150.png'
      },
      {
        name: 'msapplication-wide310x150logo',
        content: '/img/favicon/ms-icon-310x310.png'
      },
      {
        name: 'theme-color',
        content: '#554D84'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://simulators.herokuapp.com'
      },
      {
        property: 'og:title',
        content: 'Brain Simulators'
      },
      {
        property: 'og:image',
        content: '/img/og-image.png'
      },
      {
        property: 'og:description',
        content: 'Brain Simulators - это тренажеры для мозга. Тренируйте свой мозг.'
      },
      {
        property: 'og:locale',
        content: 'ru'
      },
      {
        property: 'site_name',
        content: 'simulators.herokuapp.com'
      },
      {
        property: 'og:locale:alternate',
        content: 'ru'
      },
    ],

    htmlAttrs: {
      lang: 'ru',
    },

    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/img/favicon/apple-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/img/favicon/apple-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/img/favicon/apple-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/img/favicon/apple-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/img/favicon/apple-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/img/favicon/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/img/favicon/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/img/favicon/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/favicon/apple-icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/img/favicon/android-icon-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/img/favicon/favicon-96x96.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon/favicon-16x16.png'
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/globalComponents',
    { src: '~/plugins/v-click-outside', ssr: false },
    { src: '~/plugins/firebase', ssr: true },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
    ['vue-scrollto/nuxt', { duration: 600 }],
  ],

  styleResources: {
    stylus: [
      '@/assets/stylus/mixins/index.styl',
      '@/assets/stylus/adaptive/adaptive-mixins.styl',
      '@/assets/stylus/helpers/vars.styl',
      // '@/assets/stylus/helpers/commonStyle.styl',
    ]
  },

    /*
  ** Global CSS
  */
  css: [
    {
      src: '@/assets/stylus/style.styl',
      lang: 'styl',
    }
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['firebase'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
};
