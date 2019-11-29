import PaperEntity, { PaperEntityTableColumn, PaperEntityBaseFields } from './base'
import Author from './author'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface RecordFields {
  title: string;
  authors: Array<Author>
  year: number
  keywords: Array<string>
  numberCitations: number
}

export default class Record extends PaperEntity implements RecordFields {
  static key: string = 'record'
  static queryName: string = 'Records'
  static schemaName: string = 'record'
  static displayedColumns: Array<PaperEntityTableColumn> = [{
    text: 'project.explore.table.headers.record.title',
    value: 'title',
    sortable: true,
    filterable: true
  }, {
    text: 'project.explore.table.headers.record.authors',
    value: 'authors',
    sortable: false,
    filterable: true
  }, {
    text: 'project.explore.table.headers.record.year',
    value: 'year',
    sortable: true,
    align: 'center',
    filterable: true
  }, {
    text: 'project.explore.table.headers.record.number_citations',
    value: 'numberCitations',
    sortable: true,
    align: 'center'
  }, {
    text: 'project.explore.table.headers.record.keywords',
    value: 'keywords',
    filterable: true,
    sortable: false
  }]
  title: string
  authors: Array<Author>
  year: number
  keywords: Array<string>
  numberCitations: number

  constructor ({ id, title, authors, year, keywords, numberCitations }: PaperEntityBaseFields & RecordFields) {
    super({ id })
    this.title = title
    this.authors = authors
    this.year = year
    this.keywords = keywords
    this.numberCitations = numberCitations
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string, sortBy?: string): string {
    return `{
      ${Record.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter, sortBy)} {
        count
        ${Record.schemaName} {
          title,
          authors,
          year,
          keywords,
          numberCitations
        }
      }
    }`
  }
}
