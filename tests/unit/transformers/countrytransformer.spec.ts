import CountryTransformer from '@/transformers/CountryTransformer'
import Country from '@/models/paperEntities/country'

describe('transformers/Countrytransformer', () => {
  describe('can send a country', () => {
    it('sends an country', () => {
      expect(CountryTransformer.send(new Country({ id: '1', name: 'First', countRecords: 1, flagUrl: '' }))).toMatchSnapshot()
    })
  })

  describe('can fetch an country', () => {
    it('fetches an country', () => {
      expect(CountryTransformer.fetch({ id: '1', name: 'First', flag_url: '', count_records: 1 })).toMatchSnapshot()
    })
  })
})
