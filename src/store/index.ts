import { RootState } from '@/store/types'
import { projects } from './modules/projects'
import { toasts } from './modules/toasts'
import { database } from './modules/database'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

export const modules = {
  projects,
  toasts,
  database
}

export const state: RootState = {}

export const actions: ActionTree<RootState, RootState> = {}

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}
