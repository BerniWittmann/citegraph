import { mutations } from '@/store/modules/paperEntities/mutations'
import * as mutationTypes from '@/store/modules/paperEntities/mutation-types'
import { PaperEntitiesState } from '@/store/modules/paperEntities/types'
import { PaperEntity } from '@/models/paperEntities'
import Author from '@/models/paperEntities/author'

describe('store/modules/database/mutations', () => {
  it('provides the mutations', () => {
    expect(mutations).toMatchSnapshot()
  })

  describe('SET_ENTITIES', () => {
    it('saves the entities to the store', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: '',
        activeEntity: undefined
      }
      const entities: Array<PaperEntity> = [
        new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
        new Author({ id: '2', firstName: 'Maria', lastName: 'Maier', countRecords: 24 })
      ]

      mutations[mutationTypes.SET_ENTITIES](state, entities)

      expect(state.entities).toEqual(entities)
    })

    it('overrides existing entities', () => {
      const state: PaperEntitiesState = {
        entities: [
          new Author({ id: '42', firstName: 'Other', lastName: 'Author', countRecords: 12 }),
          new Author({ id: '99', firstName: 'hunter', lastName: 'Two', countRecords: 24 })
        ],
        entityCount: -1,
        entityType: '',
        activeEntity: undefined
      }
      const entities: Array<PaperEntity> = [
        new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
        new Author({ id: '2', firstName: 'Maria', lastName: 'Maier', countRecords: 24 })
      ]

      mutations[mutationTypes.SET_ENTITIES](state, entities)

      expect(state.entities).toEqual(entities)
    })
  })

  describe('SET_ENTITY_TYPE', () => {
    it('saves the entity type to the store', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: '',
        activeEntity: undefined
      }
      const type = 'record'

      mutations[mutationTypes.SET_ENTITY_TYPE](state, type)

      expect(state.entityType).toEqual(type)
    })

    it('overrides existing entity type', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: 'author',
        activeEntity: undefined
      }
      const type = 'record'

      mutations[mutationTypes.SET_ENTITY_TYPE](state, type)

      expect(state.entityType).toEqual(type)
    })
  })

  describe('SET_ENTITY_COUNT', () => {
    it('saves the entity count to the store', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: '',
        activeEntity: undefined
      }
      const count = 12

      mutations[mutationTypes.SET_ENTITY_COUNT](state, count)

      expect(state.entityCount).toEqual(count)
    })

    it('overrides existing entity count', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: 99,
        entityType: 'author',
        activeEntity: undefined
      }

      const count = 12

      mutations[mutationTypes.SET_ENTITY_COUNT](state, count)

      expect(state.entityCount).toEqual(count)
    })
  })

  describe('SET_ACTIVE_ENTITY', () => {
    it('saves the entity to the store', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: '',
        activeEntity: undefined
      }
      const entity = new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })

      mutations[mutationTypes.SET_ACTIVE_ENTITY](state, entity)

      expect(state.activeEntity).toEqual(entity)
    })

    it('overrides existing entity ', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: '',
        activeEntity: new Author({ id: '2', firstName: 'Other', lastName: 'User', countRecords: 12 })
      }

      const entity = new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })

      mutations[mutationTypes.SET_ACTIVE_ENTITY](state, entity)

      expect(state.activeEntity).toEqual(entity)
    })

    it('can unset an existing entity ', () => {
      const state: PaperEntitiesState = {
        entities: [],
        entityCount: -1,
        entityType: '',
        activeEntity: new Author({ id: '2', firstName: 'Other', lastName: 'User', countRecords: 12 })
      }

      mutations[mutationTypes.SET_ACTIVE_ENTITY](state, undefined)

      expect(state.activeEntity).toEqual(undefined)
    })
  })

  describe('UPDATE_ENTITY', () => {
    it('updates the correct entity', () => {
      const state: PaperEntitiesState = {
        entities: [
          new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '2', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '3', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
        ],
        entityCount: -1,
        entityType: '',
        activeEntity: undefined
      }
      const entity = new Author({ id: '2', firstName: 'Neuer', lastName: 'Name', countRecords: 10 })

      mutations[mutationTypes.UPDATE_ENTITY](state, entity)

      expect(state.entities.length).toEqual(3)
      expect(state.entities).toContain(entity)
    })

    it('does nothing if entity does not exist', () => {
      const state: PaperEntitiesState = {
        entities: [
          new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '2', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '3', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
        ],
        entityCount: -1,
        entityType: '',
        activeEntity: new Author({ id: '3', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
      }
      const entity = new Author({ id: '99', firstName: 'Neuer', lastName: 'Name', countRecords: 10 })

      mutations[mutationTypes.UPDATE_ENTITY](state, entity)

      expect(state.entities.length).toEqual(3)
      expect(state.entities).not.toContain(entity)
      expect(state.activeEntity).not.toEqual(entity)
    })

    it('updates the active Entity', () => {
      const state: PaperEntitiesState = {
        entities: [
          new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '2', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '3', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
        ],
        entityCount: -1,
        entityType: '',
        activeEntity: new Author({ id: '2', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
      }
      const entity = new Author({ id: '2', firstName: 'Neuer', lastName: 'Name', countRecords: 10 })

      mutations[mutationTypes.UPDATE_ENTITY](state, entity)

      expect(state.activeEntity).toEqual(entity)
    })
  })
})
