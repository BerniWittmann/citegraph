import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface CountryFields {
  name: string
  countRecords: number
}

export default class Country extends PaperEntity implements CountryFields {
  static key: string = 'country'
  static schemaName: string = 'country'
  static queryName: string = 'Countries'
  static queryFields: string = `name,
          numberCitations`
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & CountryFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }
}
