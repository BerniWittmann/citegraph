import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface AuthorFields {
  firstName: string
  lastName: string
  countRecords: number
}

export default class Author extends PaperEntity implements AuthorFields {
  static key: string = 'author'
  static schemaName: string = 'author'
  static queryName: string = 'Authors'
  static queryFields: string = `id,
          firstName,
          lastName,
          numberCitations`
  static mutationFields: Array<string> = ['firstName', 'lastName']
  static displayedColumns: Array<PaperEntityTableColumn> = [{
    text: 'project.explore.table.headers.author.first_name',
    value: 'firstName',
    sortable: true,
    filterable: true,
    displayedByDefault: true
  }, {
    text: 'project.explore.table.headers.author.last_name',
    value: 'lastName',
    sortable: true,
    filterable: true,
    displayedByDefault: true
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
}
