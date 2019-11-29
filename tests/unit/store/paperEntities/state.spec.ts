import { state } from '@/store/modules/paperEntities/state'

describe('store/modules/paperEntities/state', () => {
  it('provides the initial state', () => {
    expect(state).toMatchSnapshot()
  })
})
