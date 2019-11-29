import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface AuthorFields {
  firstName: string
  lastName: string
  countRecords: number
}

export default class Author extends PaperEntity implements AuthorFields {
  static key: string = 'author'
  static schemaName: string = 'author'
  static queryName: string = 'Authors'
  static displayedColumns: Array<PaperEntityTableColumn> = [{
    text: 'project.explore.table.headers.author.first_name',
    value: 'firstName',
    sortable: true,
    filterable: true
  }, {
    text: 'project.explore.table.headers.author.last_name',
    value: 'lastName',
    sortable: true,
    filterable: true
  }, {
    text: 'project.explore.table.headers.author.count_records',
    value: 'countRecords',
    sortable: true,
    align: 'center'
  }]
  firstName: string
  lastName: string
  countRecords: number

  constructor ({ id, firstName, lastName, countRecords }: PaperEntityBaseFields & AuthorFields) {
    super({ id })
    this.firstName = firstName
    this.lastName = lastName
    this.countRecords = countRecords
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string): string {
    return `{
      ${Author.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter)} {
        count
        ${Author.schemaName} {
          id,
          firstName,
          lastName,
          numberCitations
        }
      }
    }`
  }
}