import { state } from '@/store/modules/database/state'

describe('store/modules/database/state', () => {
  it('provides the initial state', () => {
    expect(state).toMatchSnapshot()
  })
})
