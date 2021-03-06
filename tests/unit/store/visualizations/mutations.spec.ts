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

  describe('ADD_VISUALIZATION', () => {
    it('adds a visualization to the store', () => {
      const state: VisualizationsState = {
        visualizations: [
          new WordCloudVisualization({ id: '1', name: 'First Project' }),
          new WordCloudVisualization({ id: '2', name: 'Second Project' })
        ]
      }
      const visualization = new WordCloudVisualization(({ id: '42', name: 'New' }))

      mutations[mutationTypes.ADD_VISUALIZATION](state, visualization)

      expect(state.visualizations).toContain(visualization)
      expect(state.visualizations.length).toEqual(3)
    })

    it('adds to empty store', () => {
      const state: VisualizationsState = {
        visualizations: []
      }
      const visualization = new WordCloudVisualization(({ id: '42', name: 'New' }))

      mutations[mutationTypes.ADD_VISUALIZATION](state, visualization)

      expect(state.visualizations).toContain(visualization)
      expect(state.visualizations.length).toEqual(1)
    })
  })

  describe('UPDATE_VISUALIZATION', () => {
    it('updates a visualization', () => {
      const state: VisualizationsState = {
        visualizations: [
          new WordCloudVisualization({ id: '1', name: 'First Project' }),
          new WordCloudVisualization({ id: '2', name: 'Second Project' })
        ]
      }
      const visualization = new WordCloudVisualization(({ id: '1', name: 'New' }))

      mutations[mutationTypes.UPDATE_VISUALIZATION](state, visualization)

      expect(state.visualizations).toContainEqual(visualization)
      expect(state.visualizations.length).toEqual(2)
      expect(state.visualizations[0]).toEqual(visualization)
    })

    it('updates all instances of a visualization', () => {
      const state: VisualizationsState = {
        visualizations: [
          new WordCloudVisualization({ id: '1', name: 'First Project' }),
          new WordCloudVisualization({ id: '2', name: 'Second Project' }),
          new WordCloudVisualization({ id: '1', name: 'Other Project' })
        ]
      }
      const visualization = new WordCloudVisualization(({ id: '1', name: 'New' }))

      mutations[mutationTypes.UPDATE_VISUALIZATION](state, visualization)

      expect(state.visualizations).toContainEqual(visualization)
      expect(state.visualizations.length).toEqual(3)
      expect(state.visualizations[0]).toEqual(visualization)
      expect(state.visualizations[2]).toEqual(visualization)
    })

    it('does not change if project was not found', () => {
      const state: VisualizationsState = {
        visualizations: [
          new WordCloudVisualization({ id: '1', name: 'First Project' }),
          new WordCloudVisualization({ id: '2', name: 'Second Project' })
        ]
      }
      const visualization = new WordCloudVisualization(({ id: '42', name: 'Other' }))

      mutations[mutationTypes.UPDATE_VISUALIZATION](state, visualization)

      expect(state.visualizations).not.toContainEqual(visualization)
      expect(state.visualizations.length).toEqual(2)
    })

    it('can handle an empty projects array', () => {
      const state: VisualizationsState = {
        visualizations: []
      }
      const visualization = new WordCloudVisualization(({ id: '42', name: 'Other' }))

      mutations[mutationTypes.UPDATE_VISUALIZATION](state, visualization)

      expect(state.visualizations.length).toEqual(0)
    })
  })
})
