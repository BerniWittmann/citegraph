import Project from '@/models/project'

export interface ProjectsState {
  activeProject?: Project;
  projects: Array<Project>;
  openProjects: Array<Project>;
}
