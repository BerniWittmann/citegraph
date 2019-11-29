import { paperEntities } from '@/store/modules/paperEntities'
import { actions } from '@/store/modules/paperEntities/actions'
import { state } from '@/store/modules/paperEntities/state'
import { mutations } from '@/store/modules/paperEntities/mutations'
import { getters } from '@/store/modules/paperEntities/getters'

describe('store/modules/paperEntities/index', () => {
  it('exports an object', () => {
    expect(typeof paperEntities).toBe('object')
    expect(Object.keys(paperEntities)).toEqual([
      'namespaced',
      'state',
      'getters',
      'actions',
      'mutations'
    ])
  })

  it('is a namespaced module', () => {
    expect(paperEntities.namespaced).toBeTruthy()
  })

  it('exports its actions', () => {
    expect(paperEntities.actions).toEqual(actions)
  })

  it('exports its state', () => {
    expect(paperEntities.state).toEqual(state)
  })

  it('exports its getters', () => {
    expect(paperEntities.getters).toEqual(getters)
  })

  it('exports its mutations', () => {
    expect(paperEntities.mutations).toEqual(mutations)
  })
})
