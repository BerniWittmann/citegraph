import Author from '@/models/paperEntities/author'
import AuthorTransformer from '@/transformers/AuthorTransformer'

describe('transformers/Authortransformer', () => {
  describe('can send an author', () => {
    it('sends an author', () => {
      expect(AuthorTransformer.send(new Author({ id: '1', firstName: 'First', lastName: 'Author', countRecords: 1 }))).toMatchSnapshot()
    })
  })

  describe('can fetch an author', () => {
    it('fetches an author', () => {
      expect(AuthorTransformer.fetch({ id: '1', first_name: 'First', last_name: 'Author', count_records: 1 })).toMatchSnapshot()
    })
  })
})
