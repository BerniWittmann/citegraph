import * as store from '@/store'

describe('store/index', () => {
  it('is an object', () => {
    expect(typeof store).toBe('object')
    expect(Object.keys(store)).toEqual([
      'modules',
      'state',
      'actions',
      'getters',
      'mutations'
    ])
  })
  it('returns state', () => {
    expect(Object.keys(store.state)).toMatchSnapshot()
  })
  it('returns actions', () => {
    expect(Object.keys(store.actions)).toMatchSnapshot()
  })
  it('returns mutations', () => {
    expect(Object.keys(store.mutations)).toMatchSnapshot()
  })
  it('returns getters', () => {
    expect(Object.keys(store.getters)).toMatchSnapshot()
  })
  it('returns modules', () => {
    expect(Object.keys(store.modules)).toMatchSnapshot()
  })
})
