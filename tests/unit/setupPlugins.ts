/* ============
 * Setup Plugins
 * ============
 *
 * This file setups some of the used plugins. This is needed for some of the unit test specs.
 */

import VueI18N from 'vue-i18n'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(VueI18N)
Vue.use(Vuetify)

export const i18n = new VueI18N({
  silentTranslationWarn: true
})

export const vuetify = new Vuetify()

export function monkeyPatchTransitions () {
  const { getComputedStyle } = window
  window.getComputedStyle = function getComputedStyleStub (el) {
    return {
      ...getComputedStyle(el),
      transitionDelay: '',
      transitionDuration: '',
      animationDelay: '',
      animationDuration: ''
    }
  }
}
