import { getters } from '@/store/modules/visualizations/getters'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'

describe('store/modules/visualizations/getters', () => {
  it('provides the getters', () => {
    expect(getters).toMatchSnapshot()
  })

  describe('visualizations', () => {
    it('returns the stored visualizations', () => {
      const state = {
        visualizations: [
          new WordCloudVisualization({ id: '1', name: 'First Project' }),
          new WordCloudVisualization({ id: '2', name: 'Second Project' })
        ]
      }
      const getter = getters.visualizations as Function

      expect(getter(state)).toEqual(state.visualizations)
    })

    it('returns empty array if no visualizations are available', () => {
      const state = {
        visualizations: []
      }
      const getter = getters.visualizations as Function

      expect(getter(state)).toEqual([])
    })
  })

  describe('currentVisualization', () => {
    it('returns the stored visualization', () => {
      const state = {
        currentVisualization: new WordCloudVisualization({ id: '1', name: 'First Project' })
      }
      const getter = getters.currentVisualization as Function

      expect(getter(state)).toEqual(state.currentVisualization)
    })

    it('returns undefined if no visualization is available', () => {
      const state = {
        currentVisualization: undefined
      }
      const getter = getters.currentVisualization as Function

      expect(getter(state)).toBeUndefined()
    })
  })

  describe('hasCurrentVisualization', () => {
    it('returns true if it has a stored visualization', () => {
      const state = {
        currentVisualization: new WordCloudVisualization({ id: '1', name: 'First Project' })
      }
      const getter = getters.hasCurrentVisualization as Function

      expect(getter(state)).toBeTruthy()
    })

    it('returns false if no visualization is available', () => {
      const state = {
        currentVisualization: undefined
      }
      const getter = getters.hasCurrentVisualization as Function

      expect(getter(state)).toBeFalsy()
    })
  })
})
