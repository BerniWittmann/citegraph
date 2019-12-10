import { visualizations } from '@/store/modules/visualizations'
import { actions } from '@/store/modules/visualizations/actions'
import { state } from '@/store/modules/visualizations/state'
import { mutations } from '@/store/modules/visualizations/mutations'
import { getters } from '@/store/modules/visualizations/getters'

describe('store/modules/visualizations/index', () => {
  it('exports an object', () => {
    expect(typeof visualizations).toBe('object')
    expect(Object.keys(visualizations)).toEqual([
      'namespaced',
      'state',
      'getters',
      'actions',
      'mutations'
    ])
  })

  it('is a namespaced module', () => {
    expect(visualizations.namespaced).toBeTruthy()
  })

  it('exports its actions', () => {
    expect(visualizations.actions).toEqual(actions)
  })

  it('exports its state', () => {
    expect(visualizations.state).toEqual(state)
  })

  it('exports its getters', () => {
    expect(visualizations.getters).toEqual(getters)
  })

  it('exports its mutations', () => {
    expect(visualizations.mutations).toEqual(mutations)
  })
})
