import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface PublicationFields {
  name: string
  countRecords: number
}

export default class Publication extends PaperEntity implements PublicationFields {
  static key: string = 'publication'
  static schemaName: string = 'publication'
  static queryName: string = 'Publications'
  static queryFields: string = `name,
          number_citations`
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & PublicationFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }
}
