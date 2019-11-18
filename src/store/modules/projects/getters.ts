import { GetterTree } from 'vuex'
import { ProjectsState } from '@/store/modules/projects/types'
import { RootState } from '@/store/types'
import Project from '@/models/project'

export const getters: GetterTree<ProjectsState, RootState> = {
  activeProject (state): Project | undefined {
    return state.activeProject
  },
  hasActiveProject (state): boolean {
    return !!state.activeProject
  },
  projects (state): Array<Project> {
    return state.projects
  }
}
