import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { DatabaseState } from '@/store/modules/database/types'

export const getters: GetterTree<DatabaseState, RootState> = {}
