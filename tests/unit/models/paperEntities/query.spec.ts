import { constructQuery } from '@/models/paperEntities/query'

describe('models/paperEntities/query.ts', () => {
  describe('it has a function to create a query', () => {
    const baseParams = {
      projectId: 42,
      entityType: 'record'
    }
    it('creates a query', () => {
      expect(constructQuery('Record', 'record', { ...baseParams, perPage: 7, pageOffset: 2, filter: 'test', sortBy: 'title_ASC' }, 'id, title, name')).toMatchSnapshot()
      expect(constructQuery('Record', 'record', { ...baseParams, id: '12' }, 'id, title, count')).toMatchSnapshot()
    })

    describe('it can query for a single entity by id', () => {
      it('adds an id to the query', () => {
        expect(constructQuery('Record', 'record', { ...baseParams, id: '12' }, 'id')).toContain('(id: 12)')
      })
    })

    describe('it can query for multiple with pagination and filter', () => {
      it('returns an empty string if no parameters are given', () => {
        expect(constructQuery('Record', 'record', { ...baseParams }, 'id')).not.toContain('(')
      })

      it('returns only the filter if only the filter is given', () => {
        expect(constructQuery('Record', 'record', { ...baseParams, filter: 'test' }, 'id')).toContain('(filter: test)')
      })

      it('does not return the filter by if no filter given', () => {
        expect(constructQuery('Record', 'record', { ...baseParams, filterBy: 'title author' }, 'id')).not.toContain('filterBy: title author')
      })

      it('returns the filter and the fitler by if only those two is given', () => {
        const query = constructQuery('Record', 'record', { ...baseParams, filter: 'test', filterBy: 'title author' }, 'id')
        expect(query).toContain('filter: test')
        expect(query).toContain('filterBy: title author')
      })

      it('returns only the sorting parameter if only the sorting parameter is given', () => {
        expect(constructQuery('Record', 'record', { ...baseParams, sortBy: 'title_DESC' }, 'id')).toContain('(orderBy: title_DESC)')
      })

      it('returns only the pagination if only the pagination is given', () => {
        expect(constructQuery('Record', 'record', { ...baseParams, perPage: 10, pageOffset: 1 }, 'id')).toContain('(first: 10; skip: 10)')
        expect(constructQuery('Record', 'record', { ...baseParams, perPage: 7, pageOffset: 2 }, 'id')).toContain('(first: 7; skip: 14)')
        expect(constructQuery('Record', 'record', { ...baseParams, perPage: 7, pageOffset: 0 }, 'id')).toContain('(first: 7)')
      })

      it('if all parameters are given it returns all parameters ', () => {
        expect(constructQuery('Record', 'record', { ...baseParams, perPage: 7, pageOffset: 2, filter: 'test', sortBy: 'title_ASC', filterBy: 'title author' }, 'id'))
          .toContain('(filter: test; orderBy: title_ASC; filterBy: title author; first: 7; skip: 14)')
      })
    })

    it('can include a belongs to filter', () => {
      const query = constructQuery('Record', 'record', { ...baseParams, belongsTo: '123', belongsToType: 'author' }, 'id')
      expect(query).toContain('belongsTo: 123')
      expect(query).toContain('belongsToType: author')
    })
  })
})
