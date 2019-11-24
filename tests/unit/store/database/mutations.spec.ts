import { mutations } from '@/store/modules/database/mutations'

describe('store/modules/database/mutations', () => {
  it('provides the mutations', () => {
    expect(mutations).toMatchSnapshot()
  })
})
