import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'
import { createFilterAndPaginationForQuery } from '@/models/paperEntities/query'

export interface InstitutionFields {
  name: string
  countRecords: number
}

export default class Institution extends PaperEntity implements InstitutionFields {
  static key: string = 'institution'
  static schemaName: string = 'institution'
  static queryName: string = 'Institutions'
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & InstitutionFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }

  static getQuery (perPage?: number, pageOffset?: number, filter?: string): string {
    return `{
      ${Institution.queryName}${createFilterAndPaginationForQuery(perPage, pageOffset, filter)} {
        count
        ${Institution.schemaName} {
          name,
          numberCitations
        }
      }
    }`
  }
}
