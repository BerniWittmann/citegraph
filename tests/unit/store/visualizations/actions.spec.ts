import moxios from 'moxios'
import { actions } from '@/store/modules/visualizations/actions'
import * as mutationTypes from '@/store/modules/visualizations/mutation-types'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'

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
})
