import Author from '@/models/paperEntities/author'
import RecordTransformer from '@/transformers/RecordTransformer'
import Record from '@/models/paperEntities/record'

describe('transformers/Recordtransformer', () => {
  describe('can send a record', () => {
    it('sends a record', () => {
      expect(RecordTransformer.send(new Record({
        id: '1',
        title: 'First',
        year: 2000,
        numberCitations: 1,
        authors: [],
        keywords: []
      }))).toMatchSnapshot()
    })
    it('sends the authors', () => {
      expect(RecordTransformer.send(new Record({
        id: '1',
        title: 'First',
        year: 2000,
        numberCitations: 1,
        authors: [
          new Author({ id: '1', firstName: 'First', lastName: 'Author', countRecords: 12 })
        ],
        keywords: []
      }))).toMatchSnapshot()
    })
  })

  describe('can fetch a record', () => {
    it('fetches a record', () => {
      expect(RecordTransformer.fetch({
        id: '1',
        title: 'First',
        year: 2000,
        number_citations: 1,
        keywords: []
      })).toMatchSnapshot()
    })
    it('fetches the authors', () => {
      expect(RecordTransformer.fetch({
        id: '1',
        title: 'First',
        year: 2000,
        number_citations: 1,
        authors: [
          { id: '1', first_name: 'First', last_name: 'Author', count_records: 12 }
        ],
        keywords: []
      })).toMatchSnapshot()
    })
  })
})
