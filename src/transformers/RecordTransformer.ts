/* eslint-disable camelcase */
import Transformer from './Transformer'
import Record from '@/models/paperEntities/record'
import AuthorTransformer, { AuthorDTO } from '@/transformers/AuthorTransformer'

export interface RecordDTO {
  id: string
  title: string;
  authors?: Array<AuthorDTO>
  year: number
  keywords: Array<string>
  number_citations: number
}

export default class RecordTransformer extends Transformer {
  static fetch (item: RecordDTO): Record {
    return new Record({
      id: item.id,
      title: item.title,
      year: item.year,
      numberCitations: item.number_citations,
      keywords: item.keywords,
      authors: item.authors ? AuthorTransformer.fetchCollection(item.authors) : []
    })
  }

  static send (data: Record): RecordDTO {
    return {
      id: data.id,
      title: data.title,
      year: data.year,
      number_citations: data.numberCitations,
      keywords: data.keywords,
      authors: data.authors ? AuthorTransformer.sendCollection(data.authors) : []
    }
  }
}
