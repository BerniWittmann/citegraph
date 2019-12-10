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

export const actions: ActionTree<VisualizationsState, RootState> = {
  async fetchVisualizations ({ commit, dispatch }, projectId: number): Promise<undefined> {
    try {
      const response = await Axios(`/projects/${projectId}/visualizations`)
      const visualizations: Array<Visualization> = response.data.map((visualization: VisualizationResponseFields) => {
        if (!visualization || !visualization.key) return undefined
        const VisualizationClass = visualizationsKeyMap[visualization.key]
        if (!VisualizationClass) return undefined
        return new VisualizationClass(visualization)
      }).filter((v: Visualization | undefined) => !!v)
      commit(types.SET_VISUALIZATIONS, visualizations)
      return undefined
    } catch (error) {
      logger.error(error)
      dispatch('toasts/showError', 'visualizations.fetch_error', { root: true })
      return error
    }
  }
}
