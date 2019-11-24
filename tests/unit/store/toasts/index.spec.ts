import { toasts } from '@/store/modules/toasts'
import { actions } from '@/store/modules/toasts/actions'
import { state } from '@/store/modules/toasts/state'
import { mutations } from '@/store/modules/toasts/mutations'
import { getters } from '@/store/modules/toasts/getters'

describe('store/modules/toasts/index', () => {
  it('exports an object', () => {
    expect(typeof toasts).toBe('object')
    expect(Object.keys(toasts)).toEqual([
      'namespaced',
      'state',
      'getters',
      'actions',
      'mutations'
    ])
  })

  it('is a namespaced module', () => {
    expect(toasts.namespaced).toBeTruthy()
  })

  it('exports its actions', () => {
    expect(toasts.actions).toEqual(actions)
  })

  it('exports its state', () => {
    expect(toasts.state).toEqual(state)
  })

  it('exports its getters', () => {
    expect(toasts.getters).toEqual(getters)
  })

  it('exports its mutations', () => {
    expect(toasts.mutations).toEqual(mutations)
  })
})
