import Axios from 'axios'
import { ActionTree } from 'vuex'
import { ProjectsState } from '@/store/modules/projects/types'
import { RootState } from '@/store/types'
import Project from '@/models/project'
import * as types from './mutation-types'

export const actions: ActionTree<ProjectsState, RootState> = {
  async fetchProject ({ commit }, id: string): Promise<undefined> {
    try {
      const response = await Axios(`/projects/${id}`)
      const payload: Project = new Project(response && response.data)
      commit(types.SET_ACTIVE_PROJECT, payload)
      return undefined
    } catch (error) {
      console.error(error)
      commit(types.UNSET_ACTIVE_PROJECT)
      return error
    }
  },

  unsetProject ({ commit }): void {
    commit(types.UNSET_ACTIVE_PROJECT)
  }
}
