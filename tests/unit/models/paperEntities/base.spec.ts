import PaperEntity from '@/models/paperEntities/base'

describe('models/paperEntities/base.ts', () => {
  it('thows an error if the abstract method getQuery is called', () => {
    expect(PaperEntity.getQuery).toThrow()
  })
})
