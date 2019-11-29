import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface CountryFields {
  name: string
  countRecords: number
}

export default class Country extends PaperEntity implements CountryFields {
  static key: string = 'country'
  static schemaName: string = 'country'
  static queryName: string = 'Countries'
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & CountryFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string, sortBy?: string): string {
    return `{
      ${Country.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter, sortBy)} {
        count
        ${Country.schemaName} {
          name,
          numberCitations
        }
      }
    }`
  }
}
