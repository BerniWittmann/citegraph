import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { ToastsState } from '@/store/modules/toasts/types'
import Toast from '@/models/toast'

export const getters: GetterTree<ToastsState, RootState> = {
  toasts (state: ToastsState): Array<Toast> {
    return state.toasts
  }
}
