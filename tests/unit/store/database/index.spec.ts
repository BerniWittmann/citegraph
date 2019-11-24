import { database } from '@/store/modules/database'
import { actions } from '@/store/modules/database/actions'
import { state } from '@/store/modules/database/state'
import { mutations } from '@/store/modules/database/mutations'
import { getters } from '@/store/modules/database/getters'

describe('store/modules/database/index', () => {
  it('exports an object', () => {
    expect(typeof database).toBe('object')
    expect(Object.keys(database)).toEqual([
      'namespaced',
      'state',
      'getters',
      'actions',
      'mutations'
    ])
  })

  it('is a namespaced module', () => {
    expect(database.namespaced).toBeTruthy()
  })

  it('exports its actions', () => {
    expect(database.actions).toEqual(actions)
  })

  it('exports its state', () => {
    expect(database.state).toEqual(state)
  })

  it('exports its getters', () => {
    expect(database.getters).toEqual(getters)
  })

  it('exports its mutations', () => {
    expect(database.mutations).toEqual(mutations)
  })
})
