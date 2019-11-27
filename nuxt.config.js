
/* eslint-disable */

const resolve = require('path').resolve;

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    // ['nuxt-stylus-resources-loader', [
    //   resolve(__dirname, '~/assets/stylus/style.styl'),
    //   resolve(__dirname, '~/assets/stylus/base/fonts.styl'),
    // ]]
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
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
};
