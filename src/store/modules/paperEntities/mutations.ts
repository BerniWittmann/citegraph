import { PaperEntitiesState } from './types'
import { MutationTree } from 'vuex'
import {
  SET_ACTIVE_ENTITY,
  SET_ENTITIES,
  SET_ENTITY_COUNT,
  SET_ENTITY_TYPE, UPDATE_ENTITY
} from '@/store/modules/paperEntities/mutation-types'
import { PaperEntity } from '@/models/paperEntities'

export const mutations: MutationTree<PaperEntitiesState> = {
  [SET_ENTITIES] (state: PaperEntitiesState, payload: Array<PaperEntity>) {
    state.entities = payload
  },
  [SET_ENTITY_TYPE] (state: PaperEntitiesState, payload: string | undefined) {
    state.entityType = payload
  },
  [SET_ENTITY_COUNT] (state: PaperEntitiesState, payload: number) {
    state.entityCount = payload
  },
  [SET_ACTIVE_ENTITY] (state: PaperEntitiesState, payload: PaperEntity | undefined) {
    state.activeEntity = payload
  },
  [UPDATE_ENTITY] (state: PaperEntitiesState, payload: PaperEntity) {
    state.entities = state.entities.map((current) => current.id === payload.id ? payload : current)
    if (state.activeEntity && state.activeEntity.id === payload.id) {
      state.activeEntity = payload
    }
  }
}
