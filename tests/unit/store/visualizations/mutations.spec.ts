import { mutations } from '@/store/modules/visualizations/mutations'
import * as mutationTypes from '@/store/modules/visualizations/mutation-types'
import Visualization from '@/models/visualizations/Visualization'
import { VisualizationsState } from '@/store/modules/visualizations/types'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'

describe('store/modules/visualizations/mutations', () => {
  it('provides the mutations', () => {
    expect(mutations).toMatchSnapshot()
  })

  describe('SET_VISUALIZATIONS', () => {
    it('saves the visualizations to the store', () => {
      const state: VisualizationsState = {
        visualizations: []
      }
      const visualizations: Array<Visualization> = [
        new WordCloudVisualization({ id: '1', name: 'First Project' }),
        new WordCloudVisualization({ id: '2', name: 'Second Project' })
      ]

      mutations[mutationTypes.SET_VISUALIZATIONS](state, visualizations)

      expect(state.visualizations).toEqual(visualizations)
    })

    it('overrides existing projects', () => {
      const state: VisualizationsState = {
        visualizations: [
          new WordCloudVisualization({ id: '11', name: 'Other Project' }),
          new WordCloudVisualization({ id: '21', name: 'Old Project' })
        ]
      }
      const visualizations: Array<Visualization> = [
        new WordCloudVisualization({ id: '1', name: 'First Project' }),
        new WordCloudVisualization({ id: '2', name: 'Second Project' })
      ]

      mutations[mutationTypes.SET_VISUALIZATIONS](state, visualizations)

      expect(state.visualizations).toEqual(visualizations)
    })
  })

  describe('SET_CURRENT_VISUALIZATION', () => {
    it('saves the visualization to the store', () => {
      const state: VisualizationsState = {
        visualizations: [],
        currentVisualization: undefined
      }
      const visualization: Visualization = new WordCloudVisualization({ id: '1', name: 'First Project' })

      mutations[mutationTypes.SET_CURRENT_VISUALIZATION](state, visualization)

      expect(state.currentVisualization).toEqual(visualization)
    })

    it('overrides existing visualization', () => {
      const state: VisualizationsState = {
        visualizations: [],
        currentVisualization: new WordCloudVisualization({ id: '42', name: 'Other Project' })
      }
      const visualization: Visualization = new WordCloudVisualization({ id: '1', name: 'First Project' })

      mutations[mutationTypes.SET_CURRENT_VISUALIZATION](state, visualization)

      expect(state.currentVisualization).toEqual(visualization)
    })

    it('can unset a visualization', () => {
      const state: VisualizationsState = {
        visualizations: [],
        currentVisualization: new WordCloudVisualization({ id: '42', name: 'Other Project' })
      }

      const visualization = undefined
      mutations[mutationTypes.SET_CURRENT_VISUALIZATION](state, visualization)

      expect(state.currentVisualization).toEqual(visualization)
    })
  })
})
