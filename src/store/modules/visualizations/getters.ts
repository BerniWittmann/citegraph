import { GetterTree } from 'vuex'
import { VisualizationsState } from './types'
import { RootState } from '@/store/types'
import Visualization from '@/models/visualizations/Visualization'

export const getters: GetterTree<VisualizationsState, RootState> = {
  visualizations (state: VisualizationsState): Array<Visualization> {
    return state.visualizations
  }
}
