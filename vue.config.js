module.exports = {
  'pluginOptions': {
    'i18n': {
      'locale': 'en',
      'fallbackLocale': 'en',
      'localeDir': 'locales',
      'enableInSFC': false
    }
  },
  'publicPath': process.env.NODE_ENV === 'production' ? '/frontned/' : '/',
  'css': {
    'loaderOptions': {
      'scss': {
        'prependData': '@import "~@/assets/styles/globals.scss";'
      }
    }
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
