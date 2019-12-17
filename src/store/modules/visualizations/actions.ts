import Axios from 'axios'
import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import Visualization from '@/models/visualizations/Visualization'
import * as types from './mutation-types'
import jsLogger from 'js-logger'
import { VisalizationFields, visualizationsKeyMap } from '@/models/visualizations'
import { VisualizationsState } from '@/store/modules/visualizations/types'
const logger = jsLogger.get('visualizations/actions')

type VisualizationResponseFields = VisalizationFields & {
  key: string
}

function parseVisualization (visualization: VisualizationResponseFields): Visualization | undefined {
  if (!visualization || !visualization.key) return undefined
  const VisualizationClass = visualizationsKeyMap[visualization.key]
  if (!VisualizationClass) return undefined
  return new VisualizationClass(visualization)
}

export const actions: ActionTree<VisualizationsState, RootState> = {
  async fetchVisualizations ({ commit, dispatch }, projectId: number): Promise<undefined> {
    try {
      const response = await Axios(`/projects/${projectId}/visualizations`)
      const visualizations: Array<Visualization> = response.data.map(parseVisualization).filter((v: Visualization | undefined) => !!v)
      commit(types.SET_VISUALIZATIONS, visualizations)
      return undefined
    } catch (error) {
      logger.error(error)
      dispatch('toasts/showError', 'visualizations.fetch_error', { root: true })
      return error
    }
  },

  async fetchVisualization ({ commit, dispatch }, { projectId, visualizationId }: { projectId: number, visualizationId: string }): Promise<void> {
    try {
      const response = await Axios(`/projects/${projectId}/visualizations/${visualizationId}`)
      const visualization: Visualization | undefined = parseVisualization(response.data)
      if (!visualization) throw new Error('Could not parse visualization')
      commit(types.SET_CURRENT_VISUALIZATION, visualization)
    } catch (error) {
      logger.error(error)
      dispatch('toasts/showError', 'visualizations.fetch_single_error', { root: true })
      return error
    }
  },

  unsetCurrentVisualization ({ commit }): void {
    commit(types.SET_CURRENT_VISUALIZATION, undefined)
  }
}
