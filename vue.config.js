module.exports = {
  'pluginOptions': {
    'i18n': {
      'locale': 'en',
      'fallbackLocale': 'en',
      'localeDir': 'locales',
      'enableInSFC': false
    }
  },
  'publicPath': '/',
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
