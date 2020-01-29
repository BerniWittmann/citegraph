/* eslint-disable camelcase */
import Transformer from './Transformer'
import Country from '@/models/paperEntities/country'

export interface CountryDTO {
  id: string
  name: string
  count_records: number
  flag_url?: string
}

export default class CountryTransformer extends Transformer {
  static fetch (item: CountryDTO): Country {
    return new Country({
      id: item.id,
      name: item.name,
      flagUrl: item.flag_url,
      countRecords: item.count_records
    })
  }

  static send (data: Country): CountryDTO {
    return {
      id: data.id,
      name: data.name,
      flag_url: data.flagUrl,
      count_records: data.countRecords
    }
  }
}
