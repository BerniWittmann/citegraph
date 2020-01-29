/* eslint-disable camelcase */
import Transformer from './Transformer'
import Author from '@/models/paperEntities/author'

export interface AuthorDTO {
  id: string
  first_name: string
  last_name: string
  count_records: number
}

export default class AuthorTransformer extends Transformer {
  static fetch (item: AuthorDTO): Author {
    return new Author({
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      countRecords: item.count_records
    })
  }

  static send (data: Author): AuthorDTO {
    return {
      id: data.id,
      first_name: data.firstName,
      last_name: data.lastName,
      count_records: data.countRecords
    }
  }
}
