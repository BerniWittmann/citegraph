import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { ToastsState } from '@/store/modules/toasts/types'
import * as types from '@/store/modules/toasts/mutation-types'
import Toast, { ErrorToast, InfoToast, SuccessToast, WarningToast } from '@/models/toast'

export const actions: ActionTree<ToastsState, RootState> = {
  showSuccess ({ commit }, message: string): void {
    commit(types.ADD_TOAST, new SuccessToast(message))
  },

  showInfo ({ commit }, message: string): void {
    commit(types.ADD_TOAST, new InfoToast(message))
  },

  showWarning ({ commit }, message: string): void {
    commit(types.ADD_TOAST, new WarningToast(message))
  },

  showError ({ commit }, message: string): void {
    commit(types.ADD_TOAST, new ErrorToast(message))
  },

  removeToast ({ commit }, toast: Toast): void {
    commit(types.REMOVE_TOAST, toast)
  }
}
