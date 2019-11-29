import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface PublisherFields {
  name: string
  countRecords: number
}

export default class Publisher extends PaperEntity implements PublisherFields {
  static key: string = 'publisher'
  static schemaName: string = 'publisher'
  static queryName: string = 'Publishers'
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & PublisherFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string, sortBy?: string): string {
    return `{
      ${Publisher.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter, sortBy)} {
        count
        ${Publisher.schemaName} {
          name,
          numberCitations
        }
      }
    }`
  }
}
