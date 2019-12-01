import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { PaperEntitiesState } from './types'
import { PaperEntity } from '@/models/paperEntities'

export const getters: GetterTree<PaperEntitiesState, RootState> = {
  entities (state: PaperEntitiesState): Array<PaperEntity> {
    return state.entities
  },

  entityType (state: PaperEntitiesState): string | undefined {
    return state.entityType
  },

  entityCount (state: PaperEntitiesState): number {
    return state.entityCount
  },

  activeEntity (state: PaperEntitiesState): PaperEntity | undefined {
    return state.activeEntity
  },

  hasActiveEntity (state: PaperEntitiesState): boolean {
    return !!state.activeEntity
  }
}
