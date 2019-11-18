import { GetterTree } from 'vuex'
import { ProjectsState } from '@/store/modules/projects/types'
import { RootState } from '@/store/types'
import Project from '@/models/project'

export const getters: GetterTree<ProjectsState, RootState> = {
  activeProject (state: ProjectsState): Project | undefined {
    return state.activeProject
  },
  hasActiveProject (state: ProjectsState): boolean {
    return !!state.activeProject
  },
  projects (state: ProjectsState): Array<Project> {
    return state.projects
  },
  openProjects (state: ProjectsState): Array<Project> {
    return state.openProjects
  }
}
