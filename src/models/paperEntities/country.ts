import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface CountryFields {
  name: string
  countRecords: number
  flagUrl?: string
}

export default class Country extends PaperEntity implements CountryFields {
  static key: string = 'country'
  static schemaName: string = 'country'
  static queryName: string = 'Countries'
  static queryFields: string = `name,
          numberCitations,
          flagUrl`
  static displayedColumns: Array<PaperEntityTableColumn> = [{
    text: 'project.explore.table.headers.country.name',
    value: 'name',
    sortable: true,
    filterable: true,
    displayedByDefault: true
  }, {
    text: 'project.explore.table.headers.country.flag',
    value: 'flagUrl',
    sortable: false,
    filterable: false,
    align: 'center'
  }, {
    text: 'project.explore.table.headers.country.count_records',
    value: 'countRecords',
    sortable: true,
    align: 'center'
  }]
  name: string
  countRecords: number
  flagUrl?: string

  constructor ({ id, name, countRecords, flagUrl }: PaperEntityBaseFields & CountryFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
    this.flagUrl = flagUrl
  }
}
