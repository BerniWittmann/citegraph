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
})
