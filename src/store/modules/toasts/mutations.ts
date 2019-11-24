import { ToastsState } from './types'
import { MutationTree } from 'vuex'
import Toast from '@/models/toast'
import {
  ADD_TOAST,
  REMOVE_TOAST
} from './mutation-types'

export const mutations: MutationTree<ToastsState> = {
  [REMOVE_TOAST] (state: ToastsState, payload: Toast) {
    state.toasts = state.toasts.filter(toast => toast.id !== payload.id)
  },
  [ADD_TOAST] (state: ToastsState, payload: Toast) {
    state.toasts.push(payload)
  }
}
