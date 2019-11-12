import moxios from 'moxios'
import { actions } from '@/store/modules/projects/actions'
import * as mutationTypes from '@/store/modules/projects/mutation-types'
import Project from '@/models/project'

const projectData = {
  id: 42,
  name: 'My awesome Project'
}

describe('store/modules/projects/actions', () => {
  it('provides the actions', () => {
    expect(actions).toMatchSnapshot()
  })

  describe('unsetProject', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.unsetProject as Function
      action({ commit })
      expect(commit).toHaveBeenCalledWith(mutationTypes.UNSET_ACTIVE_PROJECT)
    })
  })

  describe('fetchProject', () => {
    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('fetches the project', (done) => {
      moxios.stubRequest('/projects/42', {
        status: 200,
        response: projectData
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const action = actions.fetchProject as Function

      action({ commit }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.SET_ACTIVE_PROJECT, new Project(projectData))
        done()
      })
    })

    it('handles the error when one appeared during the fetching', (done) => {
      moxios.stubRequest('/projects/42', {
        status: 404,
        response: 'The project could not be found'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      console.error = jest.fn()
      const action = actions.fetchProject as Function

      action({ commit }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 404'))
        expect(commit).toHaveBeenCalledWith(mutationTypes.UNSET_ACTIVE_PROJECT)
        done()
      })
    })
  })
})
