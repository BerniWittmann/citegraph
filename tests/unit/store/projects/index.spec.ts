import { projects } from '@/store/modules/projects'
import { actions } from '@/store/modules/projects/actions'
import { state } from '@/store/modules/projects/state'
import { mutations } from '@/store/modules/projects/mutations'
import { getters } from '@/store/modules/projects/getters'

describe('store/modules/projects/index', () => {
  it('exports an object', () => {
    expect(typeof projects).toBe('object')
    expect(Object.keys(projects)).toEqual([
      'namespaced',
      'state',
      'getters',
      'actions',
      'mutations'
    ])
  })

  it('is a namespaced module', () => {
    expect(projects.namespaced).toBeTruthy()
  })

  it('exports its actions', () => {
    expect(projects.actions).toEqual(actions)
  })

  it('exports its state', () => {
    expect(projects.state).toEqual(state)
  })

  it('exports its getters', () => {
    expect(projects.getters).toEqual(getters)
  })

  it('exports its mutations', () => {
    expect(projects.mutations).toEqual(mutations)
  })
})
