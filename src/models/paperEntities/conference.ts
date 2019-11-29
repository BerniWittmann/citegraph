import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface ConferenceFields {
  name: string
  countRecords: number
}

export default class Conference extends PaperEntity implements ConferenceFields {
  static key: string = 'conference'
  static schemaName: string = 'conference'
  static queryName: string = 'Conferences'
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & ConferenceFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string): string {
    return `{
      ${Conference.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter)} {
        count
        ${Conference.schemaName} {
          name,
          numberCitations
        }
      }
    }`
  }
}
