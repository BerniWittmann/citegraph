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
})
