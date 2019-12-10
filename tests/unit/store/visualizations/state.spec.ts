import { state } from '@/store/modules/visualizations/state'

describe('store/modules/visualizations/state', () => {
  it('provides the initial state', () => {
    expect(state).toMatchSnapshot()
  })
})
