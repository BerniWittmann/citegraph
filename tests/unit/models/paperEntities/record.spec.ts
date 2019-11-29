import Record from '@/models/paperEntities/record'
import Author from '@/models/paperEntities/author'

describe('models/paperEntities/record.ts', () => {
  const record = new Record({
    id: '12',
    title: 'My title',
    authors: [
      new Author({ id: '1', firstName: 'Hans', lastName: 'Meier', countRecords: 12 }),
      new Author({ id: '2', firstName: 'Franz', lastName: 'Beckenbauer', countRecords: 99 })
    ],
    keywords: ['these', 'are', 'my', 'keywords'],
    numberCitations: 12,
    year: 2019
  })
  it('has a method to render the authors to a string', () => {
    expect(record.renderedAuthors).toEqual('H. Meier; F. Beckenbauer')
  })

  it('has a method to render the keywords to a string', () => {
    expect(record.renderedKeywords).toEqual('these; are; my; keywords')
  })
})
