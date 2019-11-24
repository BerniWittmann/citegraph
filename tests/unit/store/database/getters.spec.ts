import { getters } from '@/store/modules/database/getters'

describe('store/modules/database/getters', () => {
  it('provides the getters', () => {
    expect(getters).toMatchSnapshot()
  })
})
