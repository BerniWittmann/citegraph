import { Module } from 'vuex'
import { DatabaseState } from './types'
import { RootState } from '@/store/types'
import { state } from './state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const namespaced: boolean = true

export const database: Module<DatabaseState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
