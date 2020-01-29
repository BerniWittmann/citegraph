import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface PublisherFields {
  name: string
  countRecords: number
}

export default class Publisher extends PaperEntity implements PublisherFields {
  static key: string = 'publisher'
  static schemaName: string = 'publisher'
  static queryName: string = 'Publishers'
  static queryFields: string = `name,
          number_citations`
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & PublisherFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }
}
