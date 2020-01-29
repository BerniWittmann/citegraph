import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface ConferenceFields {
  name: string
  countRecords: number
}

export default class Conference extends PaperEntity implements ConferenceFields {
  static key: string = 'conference'
  static schemaName: string = 'conference'
  static queryName: string = 'Conferences'
  static queryFields: string = `name,
          number_citations`
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & ConferenceFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }
}
