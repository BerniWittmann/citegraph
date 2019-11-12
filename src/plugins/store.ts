import Vue from 'vue'
import Vuex from 'vuex'
import * as store from '@/store'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  ...store
})
