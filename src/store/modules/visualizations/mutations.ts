import { VisualizationsState } from './types'
import { MutationTree } from 'vuex'
import Visualization from '@/models/visualizations/Visualization'
import {
  SET_CURRENT_VISUALIZATION,
  SET_VISUALIZATIONS
} from './mutation-types'

export const mutations: MutationTree<VisualizationsState> = {
  [SET_VISUALIZATIONS] (state: VisualizationsState, payload: Array<Visualization>) {
    state.visualizations = payload
  },
  [SET_CURRENT_VISUALIZATION] (state: VisualizationsState, payload: Visualization | undefined) {
    state.currentVisualization = payload
  }
}
