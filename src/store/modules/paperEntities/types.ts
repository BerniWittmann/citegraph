import { PaperEntity } from '@/models/paperEntities'

export interface PaperEntitiesState {
  entityType: string | undefined,
  entities: Array<PaperEntity>,
  entityCount: number,
  activeEntity: PaperEntity | undefined
}
