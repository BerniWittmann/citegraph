import { state } from '@/store/modules/toasts/state'

describe('store/modules/toasts/state', () => {
  it('provides the initial state', () => {
    expect(state).toMatchSnapshot()
  })
})
