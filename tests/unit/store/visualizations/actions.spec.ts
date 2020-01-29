import moxios from 'moxios'
import { actions } from '@/store/modules/visualizations/actions'
import * as mutationTypes from '@/store/modules/visualizations/mutation-types'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'
import WordCloudVisualizationTransformer from '@/transformers/WordCloudVisualizationTransformer'

describe('store/modules/visualizations/actions', () => {
  it('provides the actions', () => {
    expect(actions).toMatchSnapshot()
  })

  describe('fetchVisualizations', () => {
    const visualizationsData = [
      { id: '42', name: 'My undefined Project' },
      { id: '43', name: 'My wrong Project', key: 'wrong' },
      { id: '1', name: 'First Project', progress: 0.8, key: WordCloudVisualization.key },
      { id: '2', name: 'Second Project', key: BarChartVisualization.key }
    ]

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('fetches all projects', (done) => {
      moxios.stubRequest('/projects/42/visualizations', {
        status: 200,
        response: visualizationsData
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const action = actions.fetchVisualizations as Function

      action({ commit }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.SET_VISUALIZATIONS, [
          new WordCloudVisualization({ id: '1', name: 'First Project', progress: 0.8 }),
          new BarChartVisualization({ id: '2', name: 'Second Project' })
        ])
        done()
      })
    })

    it('handles the error when one appeared during the fetching', (done) => {
      moxios.stubRequest('/projects/42/visualizations', {
        status: 500,
        response: 'An error occured'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.fetchVisualizations as Function

      action({ commit, dispatch }, 42).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualizations.fetch_error', { root: true })
        done()
      })
    })
  })

  describe('unsetCurrentVisualization', () => {
    it('unsets the visualization', () => {
      const commit = jest.fn()
      const action = actions.unsetCurrentVisualization as Function

      action({ commit })
      expect(commit).toHaveBeenCalledWith(mutationTypes.SET_CURRENT_VISUALIZATION, undefined)
    })
  })

  describe('fetchVisualization', () => {
    const visualizationData = { id: '1', name: 'First Project', progress: 0.8, key: WordCloudVisualization.key }

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('fetches the visualization', (done) => {
      moxios.stubRequest('/projects/42/visualizations/1', {
        status: 200,
        response: visualizationData
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const action = actions.fetchVisualization as Function

      action({ commit }, {
        projectId: 42,
        visualizationId: 1
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.SET_CURRENT_VISUALIZATION,
          new WordCloudVisualization({ id: '1', name: 'First Project', progress: 0.8 })
        )
        done()
      })
    })

    it('handles the error when one appeared during the fetching', (done) => {
      moxios.stubRequest('/projects/42/visualizations/1', {
        status: 500,
        response: 'An error occured'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.fetchVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationId: 1
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualizations.fetch_single_error', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the parsing', (done) => {
      moxios.stubRequest('/projects/42/visualizations/1', {
        status: 200,
        response: {
          ...visualizationData,
          key: 'invalid'
        }
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.fetchVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationId: 1
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Could not parse visualization'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualizations.fetch_single_error', { root: true })
        done()
      })
    })
  })

  describe('createVisualization', () => {
    const visualizationData = { id: '1', name: 'First Project', progress: 0.8, key: WordCloudVisualization.key }

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('creates the visualization', (done) => {
      moxios.stubRequest('/projects/42/visualizations', {
        status: 200,
        response: WordCloudVisualizationTransformer.send(visualizationData as any)
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.createVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationData,
        visualizationClass: WordCloudVisualization
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.ADD_VISUALIZATION,
          new WordCloudVisualization({ id: '1', name: 'First Project', progress: 0.8 })
        )
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'visualizations.add.successful', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the creation', (done) => {
      moxios.stubRequest('/projects/42/visualizations', {
        status: 500,
        response: 'An error occured'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.createVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationData,
        visualizationClass: WordCloudVisualization
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualizations.add.error', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the parsing', (done) => {
      moxios.stubRequest('/projects/42/visualizations', {
        status: 200,
        response: {
          ...WordCloudVisualizationTransformer.send(visualizationData as any),
          key: 'invalid'
        }
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.createVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationData,
        visualizationClass: WordCloudVisualization
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Could not parse visualization'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualizations.add.error', { root: true })
        done()
      })
    })
  })

  describe('updateVisualization', () => {
    const visualizationData = { id: '1', name: 'First Project', progress: 0.8, key: WordCloudVisualization.key }

    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('updates the visualization', (done) => {
      moxios.stubRequest('/projects/42/visualizations/1', {
        status: 200,
        response: WordCloudVisualizationTransformer.send(visualizationData as any)
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.updateVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationData,
        visualizationClass: WordCloudVisualization
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(commit).toHaveBeenCalledWith(mutationTypes.UPDATE_VISUALIZATION,
          new WordCloudVisualization({ id: '1', name: 'First Project', progress: 0.8 })
        )
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'visualization.edit.successful', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the updating', (done) => {
      moxios.stubRequest('/projects/42/visualizations/1', {
        status: 500,
        response: 'An error occured'
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.updateVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationData,
        visualizationClass: WordCloudVisualization
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualization.edit.error', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the parsing', (done) => {
      moxios.stubRequest('/projects/42/visualizations/1', {
        status: 200,
        response: {
          ...WordCloudVisualizationTransformer.send(visualizationData as any),
          key: 'invalid'
        }
      })

      const onFulfilled = jest.fn()
      const commit = jest.fn()
      const dispatch = jest.fn()
      const action = actions.updateVisualization as Function

      action({ commit, dispatch }, {
        projectId: 42,
        visualizationData,
        visualizationClass: WordCloudVisualization
      }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Could not parse visualization'))
        expect(commit).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'visualization.edit.error', { root: true })
        done()
      })
    })
  })
})
