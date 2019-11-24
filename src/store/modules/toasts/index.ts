import { Module } from 'vuex'
import { ToastsState } from './types'
import { RootState } from '@/store/types'
import { state } from './state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const namespaced: boolean = true

export const toasts: Module<ToastsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
