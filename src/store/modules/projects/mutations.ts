import { ProjectsState } from './types'
import { MutationTree } from 'vuex'
import Project from '@/models/project'
import {
  SET_ACTIVE_PROJECT,
  UNSET_ACTIVE_PROJECT,
  SET_PROJECTS,
  OPEN_PROJECT,
  CLOSE_PROJECT,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from './mutation-types'

export const mutations: MutationTree<ProjectsState> = {
  [SET_ACTIVE_PROJECT] (state: ProjectsState, payload: Project) {
    state.activeProject = payload
  },
  [UNSET_ACTIVE_PROJECT] (state: ProjectsState) {
    state.activeProject = undefined
  },
  [SET_PROJECTS] (state: ProjectsState, payload: Array<Project>) {
    state.projects = payload
  },
  [OPEN_PROJECT] (state: ProjectsState, payload: Project) {
    if (!state.openProjects.find(project => project.id === payload.id)) {
      state.openProjects.push(payload)
    }
  },
  [CLOSE_PROJECT] (state: ProjectsState, payload: Project) {
    state.openProjects = state.openProjects.filter(project => project.id !== payload.id)
  },
  [ADD_PROJECT] (state: ProjectsState, payload: Project) {
    state.projects.push(payload)
  },
  [DELETE_PROJECT] (state: ProjectsState, payload: Project) {
    state.projects = state.projects.filter(project => project.id !== payload.id)
  },
  [UPDATE_PROJECT] (state: ProjectsState, payload: Project) {
    state.projects = state.projects.map(project => project.id !== payload.id ? project : payload)
    state.openProjects = state.openProjects.map(project => project.id !== payload.id ? project : payload)
    if (state.activeProject && state.activeProject.id === payload.id) {
      state.activeProject = payload
    }
  }
}
