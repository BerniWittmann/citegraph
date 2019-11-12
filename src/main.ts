import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import i18n from './plugins/i18n'
import './plugins/axios'

import '@/assets/styles/index.scss'

Vue.config.productionTip = false

if (process.env.VUE_APP_API_MOCKS_ENABLED) {
  require('./plugins/mocks')
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
