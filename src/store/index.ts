import { RootState } from '@/store/types'
import { projects } from './modules/projects'
import { toasts } from './modules/toasts'
import { database } from './modules/database'
import { paperEntities } from './modules/paperEntities'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { visualizations } from '@/store/modules/visualizations'

export const modules = {
  projects,
  toasts,
  database,
  paperEntities,
  visualizations
}

export const state: RootState = {}

export const actions: ActionTree<RootState, RootState> = {}

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}
