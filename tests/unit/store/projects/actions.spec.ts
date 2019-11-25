import moxios from 'moxios'
import { actions } from '@/store/modules/projects/actions'
import * as mutationTypes from '@/store/modules/projects/mutation-types'
import Project from '@/models/project'

describe('store/modules/projects/actions', () => {
  it('provides the actions', () => {
    expect(actions).toMatchSnapshot()
  })

  describe('unsetActiveProject', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.unsetActiveProject as Function
      action({ commit })
      expect(commit).toHaveBeenCalledWith(mutationTypes.UNSET_ACTIVE_PROJECT)
    })
  })

  describe('fetchProject', () => {
    const projectData = {
      id: 42,
      name: 'My awesome Project'
    }

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
        expect(commit).toHaveBeenCalledWith(mutationTypes.OPEN_PROJECT, new Project(projectData))
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
      const dispatch = jest.fn()
      console.error = jest.fn()
      const action = actions.fetchProject as Function

      action({ commit, dispatch }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 404'))
        expect(commit).toHaveBeenCalledWith(mutationTypes.UNSET_ACTIVE_PROJECT)
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'project.fetch_error', { root: true })
        done()
      })
    })
  })

  describe('fetchProjects', () => {
    const projectsData = [
      { id: 42, name: 'My awesome Project' },
      { id: 1, name: 'First Project' },
      { id: 99, name: 'Last Project' }
    ]

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('fetches all projects', (done) => {
      moxios.stubRequest('/projects', {
        status: 200,
        response: projectsData
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const action = actions.fetchProjects as Function

      action({ commit }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.SET_PROJECTS, projectsData.map(project => new Project(project)))
        done()
      })
    })

    it('handles the error when one appeared during the fetching', (done) => {
      moxios.stubRequest('/projects', {
        status: 500,
        response: 'An error occured'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      console.error = jest.fn()
      const action = actions.fetchProjects as Function

      action({ commit, dispatch }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'projects.fetch_error', { root: true })
        done()
      })
    })
  })

  describe('openProject', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.openProject as Function
      const project = new Project({ id: 42, name: 'My awesome Project' })
      action({ commit }, project)
      expect(commit).toHaveBeenCalledWith(mutationTypes.OPEN_PROJECT, project)
    })
  })

  describe('closeProject', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.closeProject as Function
      const project = new Project({ id: 42, name: 'My awesome Project' })
      action({ commit }, project)
      expect(commit).toHaveBeenCalledWith(mutationTypes.CLOSE_PROJECT, project)
    })
  })

  describe('createProject', () => {
    const projectData = {
      id: 42,
      name: 'My awesome Project'
    }

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('creates a  new project', (done) => {
      moxios.stubRequest('/projects', {
        status: 201,
        response: projectData
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.createProject as Function

      action({ commit, dispatch }, projectData).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.ADD_PROJECT, new Project(projectData))
        expect(onFulfilled).toHaveBeenCalledWith(new Project(projectData))
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'projects.add.successful', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the creation', (done) => {
      moxios.stubRequest('/projects', {
        status: 400,
        response: 'The given name is invalid'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      console.error = jest.fn()
      const action = actions.createProject as Function

      action({ commit, dispatch }, projectData).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 400'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'projects.add.error', { root: true })
        done()
      })
    })
  })

  describe('deleteProject', () => {
    const projectData = {
      id: 42,
      name: 'My awesome Project'
    }

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('deletes the project', (done) => {
      moxios.stubRequest('/projects/42', {
        status: 200
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.deleteProject as Function

      action({ commit, dispatch }, projectData).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.CLOSE_PROJECT, new Project(projectData))
        expect(commit).toHaveBeenCalledWith(mutationTypes.DELETE_PROJECT, new Project(projectData))
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'project.delete.successful', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the deletion', (done) => {
      moxios.stubRequest('/projects/42', {
        status: 404,
        response: 'The project could not be found'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      console.error = jest.fn()
      const action = actions.deleteProject as Function

      action({ commit, dispatch }, projectData).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 404'))
        expect(commit).not.toHaveBeenCalledWith(mutationTypes.CLOSE_PROJECT, new Project(projectData))
        expect(commit).not.toHaveBeenCalledWith(mutationTypes.DELETE_PROJECT, new Project(projectData))
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'project.delete.error', { root: true })
        done()
      })
    })
  })

  describe('updateProject', () => {
    const projectData = {
      id: 42,
      name: 'My awesome Project'
    }

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('updates the project', (done) => {
      moxios.stubRequest('/projects/42', {
        status: 200,
        response: projectData
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.updateProject as Function

      action({ commit, dispatch }, projectData).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.UPDATE_PROJECT, new Project(projectData))
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'project.edit.successful', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the update', (done) => {
      moxios.stubRequest('/projects/42', {
        status: 404,
        response: 'The project could not be found'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      console.error = jest.fn()
      const action = actions.updateProject as Function

      action({ commit, dispatch }, projectData).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 404'))
        expect(commit).not.toHaveBeenCalledWith(mutationTypes.UPDATE_PROJECT, new Project(projectData))
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'project.edit.error', { root: true })
        done()
      })
    })
  })
})
