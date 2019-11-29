import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

describe('models/paperEntities/query.ts', () => {
  describe('it has a method to create the query parameters for pagination and filter', () => {
    it('returns an empty string if no parameters are given', () => {
      expect(createFilterAndPaginationForQuery()).toEqual('')
    })

    it('returns only the filter if only the filter is given', () => {
      expect(createFilterAndPaginationForQuery(undefined, undefined, 'test')).toEqual('(filter: test)')
    })

    it('returns only the sorting parameter if only the sorting parameter is given', () => {
      expect(createFilterAndPaginationForQuery(undefined, undefined, undefined, 'title_DESC')).toEqual('(orderBy: title_DESC)')
    })

    it('returns only the pagination if only the pagination is given', () => {
      expect(createFilterAndPaginationForQuery(10, 1)).toEqual('(first: 10 skip: 10)')
      expect(createFilterAndPaginationForQuery(7, 2)).toEqual('(first: 7 skip: 14)')
      expect(createFilterAndPaginationForQuery(7, 0)).toEqual('(first: 7)')
    })

    it('if all parameters are given it returns all parameters ', () => {
      expect(createFilterAndPaginationForQuery(7, 2, 'test', 'title_ASC')).toEqual('(filter: test orderBy: title_ASC first: 7 skip: 14)')
    })
  })
})
