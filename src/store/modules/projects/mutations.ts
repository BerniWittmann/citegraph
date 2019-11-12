import { ProjectsState } from './types'
import { MutationTree } from 'vuex'
import Project from '@/models/project'
import { SET_ACTIVE_PROJECT, UNSET_ACTIVE_PROJECT } from './mutation-types'

export const mutations: MutationTree<ProjectsState> = {
  [SET_ACTIVE_PROJECT] (state, payload: Project) {
    state.activeProject = payload
  },
  [UNSET_ACTIVE_PROJECT] (state) {
    state.activeProject = undefined
  }
}
