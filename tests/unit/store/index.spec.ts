import * as store from '@/store'

describe('store/index', () => {
  it('is an object', () => {
    expect(typeof store).toBe('object')
    expect(Object.keys(store)).toEqual([
      'modules',
      'state',
      'mutations',
      'actions',
      'getters'
    ])
  })
  it('returns state', () => {
    expect(store.state).toMatchSnapshot()
  })
  it('returns actions', () => {
    expect(store.actions).toMatchSnapshot()
  })
  it('returns mutations', () => {
    expect(store.mutations).toMatchSnapshot()
  })
  it('returns getters', () => {
    expect(store.getters).toMatchSnapshot()
  })
  it('returns modules', () => {
    expect(store.modules).toMatchSnapshot()
  })
})
