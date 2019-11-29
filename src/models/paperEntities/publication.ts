import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface PublicationFields {
  name: string
  countRecords: number
}

export default class Publication extends PaperEntity implements PublicationFields {
  static key: string = 'publication'
  static schemaName: string = 'publication'
  static queryName: string = 'Publications'
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & PublicationFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string): string {
    return `{
      ${Publication.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter)} {
        count
        ${Publication.schemaName} {
          name,
          numberCitations
        }
      }
    }`
  }
}
