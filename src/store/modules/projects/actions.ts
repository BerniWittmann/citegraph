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
  },

  async fetchProjects ({ commit }): Promise<undefined> {
    try {
      const response = await Axios(`/projects`)
      const projects = response.data.map((project: Project) => new Project(project))
      commit(types.SET_PROJECTS, projects)
      return undefined
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
