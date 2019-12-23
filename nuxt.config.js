import squidex from './config/squidex.json'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
  const result = dotenv.config()
  if (result.error) {
    throw result.error
  }
}

export default {
  mode: 'spa',
  /*
  ** Environment variables
  */
  env: {
    APPLI_VRP_URL: process.env.APPLI_VRP_URL || 'http://vrp.confiance-energie.fr'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Confiance Energie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/normalize.css@8.0.1/normalize.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans|Oswald|Cousine&display=swap' },
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/signature_pad@3.0.0-beta.3/dist/signature_pad.umd.min.js' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#729d39',
    failedColor: 'crimson',
    height: '10px',
  },
  loadingIndicator: {
    name: 'chasing-dots',
    color: '#729d39',
    background: 'white',
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/baseline.sass',
    '~/assets/styles.sass',
  ],
  /*
  ** Middlewares
  */
  router: {
    middleware: [
      'verify-maintenance',
      'init-squidex',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/cache.js',
    '~/plugins/api.js',
    '~/plugins/extractors.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${squidex.host}${squidex.base_path}`
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
