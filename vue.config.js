module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/globals.scss";`
      }
    }
  }
}
