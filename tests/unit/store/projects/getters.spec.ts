import { getters } from '@/store/modules/projects/getters'
import Project from '@/models/project'

describe('store/modules/projects/getters', () => {
  it('provides the getters', () => {
    expect(getters).toMatchSnapshot()
  })

  describe('activeProject', () => {
    it('returns the active Project', () => {
      const state = {
        activeProject: new Project({ id: 1, name: 'My Project' })
      }
      const getter = getters.activeProject as Function

      expect(getter(state)).toEqual(state.activeProject)
    })

    it('returns undefined if no project is active', () => {
      const state = {
        activeProject: undefined
      }
      const getter = getters.activeProject as Function

      expect(getter(state)).toBeUndefined()
    })
  })

  describe('hasActiveProject', () => {
    it('returns true if there is an active Project', () => {
      const state = {
        activeProject: new Project({ id: 1, name: 'My Project' })
      }
      const getter = getters.hasActiveProject as Function

      expect(getter(state)).toBeTruthy()
    })

    it('returns undefined if no project is active', () => {
      const state = {
        activeProject: undefined
      }
      const getter = getters.hasActiveProject as Function

      expect(getter(state)).toBeFalsy()
    })
  })

  describe('projects', () => {
    it('returns the stored projects', () => {
      const state = {
        projects: [
          new Project({ id: 1, name: 'My Project' }),
          new Project({ id: 42, name: 'Other Project' })
        ]
      }
      const getter = getters.projects as Function

      expect(getter(state)).toEqual(state.projects)
    })

    it('returns empty array if no projects are available', () => {
      const state = {
        projects: []
      }
      const getter = getters.projects as Function

      expect(getter(state)).toEqual([])
    })
  })

  describe('openProjects', () => {
    it('returns the stored open projects', () => {
      const state = {
        openProjects: [
          new Project({ id: 1, name: 'My Project' }),
          new Project({ id: 42, name: 'Other Project' })
        ]
      }
      const getter = getters.openProjects as Function

      expect(getter(state)).toEqual(state.openProjects)
    })

    it('returns empty array if no open projects are available', () => {
      const state = {
        openProjects: []
      }
      const getter = getters.openProjects as Function

      expect(getter(state)).toEqual([])
    })
  })
})
