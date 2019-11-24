import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { DatabaseState } from '@/store/modules/database/types'
import Axios from 'axios'

export const actions: ActionTree<DatabaseState, RootState> = {
  async clearDatabase ({ dispatch }): Promise<undefined> {
    try {
      await Axios(`/database/clear`, {
        method: 'POST'
      })
      dispatch('toasts/showSuccess', 'settings.database.clear.success', { root: true })
      return undefined
    } catch (error) {
      console.error(error)
      dispatch('toasts/showError', 'settings.database.clear.error', { root: true })
      return error
    }
  },

  async reseedDatabase ({ dispatch }): Promise<undefined> {
    try {
      await Axios(`/database/reseed`, {
        method: 'POST'
      })
      dispatch('toasts/showSuccess', 'settings.database.reseed.success', { root: true })
      return undefined
    } catch (error) {
      console.error(error)
      dispatch('toasts/showError', 'settings.database.reseed.error', { root: true })
      return error
    }
  }
}
