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
      commit(types.OPEN_PROJECT, payload)
      return undefined
    } catch (error) {
      console.error(error)
      commit(types.UNSET_ACTIVE_PROJECT)
      return error
    }
  },

  unsetActiveProject ({ commit }): void {
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
  },

  openProject ({ commit }, project: Project): void {
    commit(types.OPEN_PROJECT, project)
  },

  closeProject ({ commit }, project: Project): void {
    commit(types.CLOSE_PROJECT, project)
  },

  async createProject ({ commit }, data: Project): Promise<Project | undefined> {
    try {
      const response = await Axios(`/projects`, {
        method: 'POST',
        data: data
      })
      const project = new Project(response.data)
      commit(types.ADD_PROJECT, project)
      return project
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
