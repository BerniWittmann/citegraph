import { getters } from '@/store/modules/paperEntities/getters'
import Author from '@/models/paperEntities/author'

describe('store/modules/paperEntities/getters', () => {
  it('provides the getters', () => {
    expect(getters).toMatchSnapshot()
  })

  describe('entities', () => {
    it('returns the stored entities', () => {
      const state = {
        entities: [
          new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
          new Author({ id: '2', firstName: 'Maria', lastName: 'Maier', countRecords: 24 })
        ]
      }
      const getter = getters.entities as Function

      expect(getter(state)).toEqual(state.entities)
    })

    it('returns empty array if no entities are available', () => {
      const state = {
        entities: []
      }
      const getter = getters.entities as Function

      expect(getter(state)).toEqual([])
    })
  })

  describe('entityType', () => {
    it('returns the stored entityType', () => {
      const state = {
        entityType: 'record'
      }
      const getter = getters.entityType as Function

      expect(getter(state)).toEqual(state.entityType)
    })

    it('returns undefined if no entity type is available', () => {
      const state = {
        entityType: undefined
      }
      const getter = getters.entityType as Function

      expect(getter(state)).toEqual(undefined)
    })
  })

  describe('entityCount', () => {
    it('returns the stored entityCount', () => {
      const state = {
        entityCount: 12
      }
      const getter = getters.entityCount as Function

      expect(getter(state)).toEqual(state.entityCount)
    })

    it('returns -1 if no entity count is available', () => {
      const state = {
        entityCount: -1
      }
      const getter = getters.entityCount as Function

      expect(getter(state)).toEqual(-1)
    })
  })

  describe('activeEntity', () => {
    it('returns the stored entity', () => {
      const state = {
        activeEntity: new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
      }
      const getter = getters.activeEntity as Function

      expect(getter(state)).toEqual(state.activeEntity)
    })

    it('returns undefined if no entity is available', () => {
      const state = {
        activeEntity: undefined
      }
      const getter = getters.activeEntity as Function

      expect(getter(state)).toEqual(undefined)
    })
  })

  describe('hasActiveEntity', () => {
    it('returns true if there is a  stored entity', () => {
      const state = {
        activeEntity: new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
      }
      const getter = getters.hasActiveEntity as Function

      expect(getter(state)).toBeTruthy()
    })

    it('returns false if no entity is available', () => {
      const state = {
        activeEntity: undefined
      }
      const getter = getters.hasActiveEntity as Function

      expect(getter(state)).toBeFalsy()
    })
  })
})
