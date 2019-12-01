import PaperEntity, { PaperEntityBaseFields, PaperEntityTableColumn } from './base'

export interface InstitutionFields {
  name: string
  countRecords: number
}

export default class Institution extends PaperEntity implements InstitutionFields {
  static key: string = 'institution'
  static schemaName: string = 'institution'
  static queryName: string = 'Institutions'
  static queryFields: string = `name,
          numberCitations`
  static displayedColumns: Array<PaperEntityTableColumn> = []
  name: string
  countRecords: number

  constructor ({ id, name, countRecords }: PaperEntityBaseFields & InstitutionFields) {
    super({ id })
    this.name = name
    this.countRecords = countRecords
  }
}
