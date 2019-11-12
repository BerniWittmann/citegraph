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
        projects: []
      }
      const payload: Project = new Project({ id: 1, name: 'My Project' })

      mutations[mutationTypes.SET_ACTIVE_PROJECT](state, payload)

      expect(state.activeProject).toEqual(payload)
    })

    it('overwrites an existing active project', () => {
      const state: ProjectsState = {
        activeProject: new Project({ id: 42, name: 'Other Project' }),
        projects: []
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
        projects: []
      }

      mutations[mutationTypes.UNSET_ACTIVE_PROJECT](state)

      expect(state.activeProject).toBeUndefined()
    })

    it('also works when it is already unset', () => {
      const state: ProjectsState = {
        activeProject: undefined,
        projects: []
      }

      mutations[mutationTypes.UNSET_ACTIVE_PROJECT](state)

      expect(state.activeProject).toBeUndefined()
    })
  })
})
