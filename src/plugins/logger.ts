import jsLogger from 'js-logger'

jsLogger.useDefaults({
  defaultLevel: process.env.production ? jsLogger.ERROR : jsLogger.DEBUG
})
