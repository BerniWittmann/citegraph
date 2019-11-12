import { state } from '@/store/modules/projects/state'

describe('store/modules/projects/state', () => {
  it('provides the initial state', () => {
    expect(state).toMatchSnapshot()
  })
})
