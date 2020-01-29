import { AuthorFields } from '@/models/paperEntities/author'
import { ConferenceFields } from '@/models/paperEntities/conference'
import { CountryFields } from '@/models/paperEntities/country'
import { InstitutionFields } from '@/models/paperEntities/institution'
import { PublicationFields } from '@/models/paperEntities/publication'
import { PublisherFields } from '@/models/paperEntities/publisher'
import { RecordFields } from '@/models/paperEntities/record'
import { constructQuery, PaperEntityQueryParameters } from '@/models/paperEntities/query'
import { constructMutation, PaperEntityMutationParameters } from '@/models/paperEntities/mutation'
import Transformer from '@/transformers/Transformer'

export interface PaperEntityBaseFields {
  id: string;
}

export default abstract class PaperEntity implements PaperEntityBaseFields {
  id: string;
  static readonly key: string;
  static readonly schemaName: string;
  static readonly queryName: string;
  static readonly displayedColumns: Array<PaperEntityTableColumn>;
  static readonly queryFields: string;
  static readonly mutationFields: Array<string> = [];
  static readonly transformer: typeof Transformer = Transformer;

  protected constructor ({ id }: PaperEntityBaseFields) {
    this.id = id
  }

  static getQuery (params: PaperEntityQueryParameters): string {
    return constructQuery(this.queryName, this.schemaName, params, this.queryFields)
  }

  static getMutation (params: PaperEntityMutationParameters, data: Partial<PaperEntityFields>): string {
    return constructMutation(this.queryName, this.schemaName, params, this.mutationFields, data)
  }
}

export interface PaperEntityTableColumn {
  text: string;
  value: string;
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  filterable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string, item: any) => boolean
  sort?: (a: any, b: any) => number,
  displayedByDefault?: boolean
}

export type PaperEntityFields = PaperEntityBaseFields & (
  AuthorFields &
  ConferenceFields &
  CountryFields &
  InstitutionFields &
  PublicationFields &
  PublisherFields &
  RecordFields
)
