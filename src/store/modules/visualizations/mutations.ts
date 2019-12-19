import { VisualizationsState } from './types'
import { MutationTree } from 'vuex'
import Visualization from '@/models/visualizations/Visualization'
import {
  ADD_VISUALIZATION,
  SET_CURRENT_VISUALIZATION,
  SET_VISUALIZATIONS, UPDATE_VISUALIZATION
} from './mutation-types'

export const mutations: MutationTree<VisualizationsState> = {
  [SET_VISUALIZATIONS] (state: VisualizationsState, payload: Array<Visualization>) {
    state.visualizations = payload
  },
  [SET_CURRENT_VISUALIZATION] (state: VisualizationsState, payload: Visualization | undefined) {
    state.currentVisualization = payload
  },
  [ADD_VISUALIZATION] (state: VisualizationsState, payload: Visualization) {
    state.visualizations.push(payload)
  },
  [UPDATE_VISUALIZATION] (state: VisualizationsState, payload: Visualization) {
    state.visualizations = state.visualizations.map(visualization => visualization.id !== payload.id ? visualization : payload)
  }
}
