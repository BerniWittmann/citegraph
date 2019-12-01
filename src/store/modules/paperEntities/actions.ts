import { ActionTree } from 'vuex'
import { RootState } from '@/store/types'
import { PaperEntitiesState } from './types'
import { PaperEntityQueryParameters, PaperEntityQueryResponse } from '@/models/paperEntities/query'
import Axios from 'axios'
import * as types from '@/store/modules/paperEntities/mutation-types'
import jsLogger from 'js-logger'
import { entityKeysMap, PaperEntity } from '@/models/paperEntities'

const logger = jsLogger.get('paperEntities/actions')

export const actions: ActionTree<PaperEntitiesState, RootState> = {
  async fetchEntities ({ commit, dispatch }, params: PaperEntityQueryParameters): Promise<undefined> {
    try {
      const EntityClass = entityKeysMap[params.entityType]
      const response = await Axios(`/projects/${params.projectId}/paper-entities`, {
        method: 'POST',
        data: {
          query: EntityClass.getQuery(params)
        }
      })
      const data = response.data.data[EntityClass.queryName]
      const totalCount = data.count
      const payload: Array<PaperEntity> = data[EntityClass.schemaName].map((entity: PaperEntityQueryResponse) => new EntityClass(entity))
      commit(types.SET_ENTITIES, payload)
      commit(types.SET_ENTITY_COUNT, totalCount)
      commit(types.SET_ENTITY_TYPE, EntityClass.key)
      return undefined
    } catch (error) {
      logger.error(error)
      dispatch('toasts/showError', 'project.explore.fetch_error', { root: true })
      commit(types.SET_ENTITIES, [])
      commit(types.SET_ENTITY_COUNT, -1)
      commit(types.SET_ENTITY_TYPE, undefined)
      return error
    }
  },

  async fetchEntity ({ commit, dispatch }, params: PaperEntityQueryParameters): Promise<void> {
    try {
      const EntityClass = entityKeysMap[params.entityType]
      const response = await Axios(`/projects/${params.projectId}/paper-entities`, {
        method: 'POST',
        data: {
          query: EntityClass.getQuery(params)
        }
      })
      const data = response.data.data[EntityClass.queryName]
      const payload: PaperEntity = new EntityClass(data[EntityClass.schemaName])
      commit(types.SET_ACTIVE_ENTITY, payload)
      return undefined
    } catch (error) {
      logger.error(error)
      dispatch('toasts/showError', 'project.explore.fetch_single_error', { root: true })
      commit(types.SET_ACTIVE_ENTITY, undefined)
      return error
    }
  }
}
