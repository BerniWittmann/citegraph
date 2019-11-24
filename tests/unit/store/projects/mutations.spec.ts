import { mutations } from '@/store/modules/projects/mutations'
import * as mutationTypes from '@/store/modules/projects/mutation-types'
import Project from '@/models/project'
import { ProjectsState } from '@/store/modules/projects/types'

describe('store/modules/projects/mutations', () => {
  it('provides the mutations', () => {
    expect(mutations).toMatchSnapshot()
  })

  describe('SET_ACTIVE_PROJECT', () => {
    it('sets the active Project', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }
      const payload: Project = new Project({ id: 1, name: 'My Project' })

      mutations[mutationTypes.SET_ACTIVE_PROJECT](state, payload)

      expect(state.activeProject).toEqual(payload)
    })

    it('overwrites an existing active project', () => {
      const state: ProjectsState = {
        activeProject: new Project({ id: 42, name: 'Other Project' }),
        projects: [],
        openProjects: []
      }
      const payload: Project = new Project({ id: 1, name: 'My Project' })

      mutations[mutationTypes.SET_ACTIVE_PROJECT](state, payload)

      expect(state.activeProject).toEqual(payload)
    })
  })

  describe('UNSET_ACTIVE_PROJECT', () => {
    it('unsets the active Project', () => {
      const state: ProjectsState = {
        activeProject: new Project({ id: 42, name: 'Other Project' }),
        projects: [],
        openProjects: []
      }

      mutations[mutationTypes.UNSET_ACTIVE_PROJECT](state)

      expect(state.activeProject).toBeUndefined()
    })

    it('also works when it is already unset', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }

      mutations[mutationTypes.UNSET_ACTIVE_PROJECT](state)

      expect(state.activeProject).toBeUndefined()
    })
  })

  describe('SET_PROJECTS', () => {
    it('saves the projects to the store', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }
      const projects: Array<Project> = [
        new Project({ id: 1, name: 'First Project' }),
        new Project({ id: 2, name: 'Second Project' })
      ]

      mutations[mutationTypes.SET_PROJECTS](state, projects)

      expect(state.projects).toEqual(projects)
    })

    it('overrides existing projects', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [
          new Project({ id: 99, name: 'Other Project' }),
          new Project({ id: 100, name: 'Another Project' })
        ],
        openProjects: []
      }
      const projects: Array<Project> = [
        new Project({ id: 1, name: 'First Project' }),
        new Project({ id: 2, name: 'Second Project' })
      ]

      mutations[mutationTypes.SET_PROJECTS](state, projects)

      expect(state.projects).toEqual(projects)
    })
  })

  describe('OPEN_PROJECT', () => {
    it('adds a new project to open projects', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ]
      }
      const project = new Project({ id: 42, name: 'My awesome Project' })

      mutations[mutationTypes.OPEN_PROJECT](state, project)

      expect(state.openProjects).toContainEqual(project)
      expect(state.openProjects.length).toEqual(3)
    })

    it('does not add a project twice', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ]
      }
      const project = new Project({ id: 2, name: 'Second Project' })

      mutations[mutationTypes.OPEN_PROJECT](state, project)

      expect(state.openProjects).toContainEqual(project)
      expect(state.openProjects.length).toEqual(2)
      expect(state.openProjects.map(project => project.id)).toEqual([1, 2])
    })

    it('can handle no open Projects before', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }
      const project = new Project({ id: 42, name: 'My awesome Project' })

      mutations[mutationTypes.OPEN_PROJECT](state, project)

      expect(state.openProjects).toContainEqual(project)
      expect(state.openProjects.length).toEqual(1)
    })
  })

  describe('CLOSE_PROJECT', () => {
    it('removes a project from open projects', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ]
      }
      const project = new Project({ id: 2, name: 'Second Project' })

      mutations[mutationTypes.CLOSE_PROJECT](state, project)

      expect(state.openProjects).not.toContainEqual(project)
      expect(state.openProjects.length).toEqual(1)
    })

    it('removes all instances of a project from open projects', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' }),
          new Project({ id: 2, name: 'Second Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ]
      }
      const project = new Project({ id: 2, name: 'Second Project' })

      mutations[mutationTypes.CLOSE_PROJECT](state, project)

      expect(state.openProjects).not.toContainEqual(project)
      expect(state.openProjects.length).toEqual(1)
    })

    it('does not change open projects if project was not found', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ]
      }
      const project = new Project({ id: 42, name: 'Other Project' })

      mutations[mutationTypes.CLOSE_PROJECT](state, project)

      expect(state.openProjects).not.toContainEqual(project)
      expect(state.openProjects.length).toEqual(2)
      expect(state.openProjects.map(project => project.id)).toEqual([1, 2])
    })

    it('can handle an empty open projects array', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }
      const project = new Project({ id: 42, name: 'Other Project' })

      mutations[mutationTypes.CLOSE_PROJECT](state, project)

      expect(state.openProjects.length).toEqual(0)
    })
  })

  describe('ADD_PROJECT', () => {
    it('adds a project to the store', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [new Project({ id: 42, name: 'Other Project' })],
        openProjects: []
      }
      const project = new Project({ id: 1, name: 'My awesome Project' })

      mutations[mutationTypes.ADD_PROJECT](state, project)

      expect(state.projects.length).toEqual(2)
      expect(state.projects).toContain(project)
    })

    it('can add a project to an empty store', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }

      const project = new Project({ id: 1, name: 'My awesome Project' })

      mutations[mutationTypes.ADD_PROJECT](state, project)

      expect(state.projects.length).toEqual(1)
      expect(state.projects).toContain(project)
    })
  })

  describe('DELETE_PROJECT', () => {
    it('removes a project from the projects', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ],
        openProjects: []
      }
      const project = new Project({ id: 2, name: 'Second Project' })

      mutations[mutationTypes.DELETE_PROJECT](state, project)

      expect(state.projects).not.toContainEqual(project)
      expect(state.projects.length).toEqual(1)
    })

    it('removes all instances of a project from the projects', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' }),
          new Project({ id: 2, name: 'Second Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ],
        openProjects: []
      }
      const project = new Project({ id: 2, name: 'Second Project' })

      mutations[mutationTypes.DELETE_PROJECT](state, project)

      expect(state.projects).not.toContainEqual(project)
      expect(state.projects.length).toEqual(1)
    })

    it('does not change projects if project was not found', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [
          new Project({ id: 1, name: 'First Project' }),
          new Project({ id: 2, name: 'Second Project' })
        ],
        openProjects: []
      }
      const project = new Project({ id: 42, name: 'Other Project' })

      mutations[mutationTypes.DELETE_PROJECT](state, project)

      expect(state.projects).not.toContainEqual(project)
      expect(state.projects.length).toEqual(2)
      expect(state.projects.map(project => project.id)).toEqual([1, 2])
    })

    it('can handle an empty open projects array', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: [],
        openProjects: []
      }
      const project = new Project({ id: 42, name: 'Other Project' })

      mutations[mutationTypes.DELETE_PROJECT](state, project)

      expect(state.projects.length).toEqual(0)
    })
  })
})
