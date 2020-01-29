/* eslint-disable camelcase */
import Transformer from './Transformer'
import Project, { ProjectStates } from '@/models/project'
import CountryTransformer, { CountryDTO } from '@/transformers/CountryTransformer'
import Country from '@/models/paperEntities/country'
import AuthorTransformer, { AuthorDTO } from '@/transformers/AuthorTransformer'
import RecordTransformer, { RecordDTO } from '@/transformers/RecordTransformer'

interface CountriesDataDTO extends CountryDTO {
  relevance: number
}

export interface ProjectDTO {
  id?: number
  name: string
  state?: ProjectStates
  count_records?: number
  count_authors?: number
  count_institutions?: number
  count_countries?: number
  count_publications?: number
  count_publishers?: number
  count_conferences?: number
  count_keywords?: number
  count_visualizations?: number

  top_authors?: Array<AuthorDTO>
  top_records?: Array<RecordDTO>
  top_keywords?: Array<string>
  countries?: Array<CountriesDataDTO>
}

export default class ProjectTransformer extends Transformer {
  static fetch (item: ProjectDTO): Project {
    const hasCounts = ![item.count_records, item.count_authors, item.count_institutions, item.count_countries, item.count_publications, item.count_publishers, item.count_conferences, item.count_keywords, item.count_visualizations].some(val => !val)
    return new Project({
      id: item.id,
      name: item.name,
      state: item.state,
      counts: hasCounts ? {
        records: item.count_records!,
        authors: item.count_authors!,
        institutions: item.count_institutions!,
        countries: item.count_countries!,
        publications: item.count_publications!,
        publishers: item.count_publications!,
        conferences: item.count_conferences!,
        keywords: item.count_keywords!,
        visualizations: item.count_visualizations!
      } : undefined,
      topAuthors: item.top_authors ? AuthorTransformer.fetchCollection(item.top_authors) : undefined,
      topRecords: item.top_records ? RecordTransformer.fetchCollection(item.top_records) : undefined,
      topKeywords: item.top_keywords,
      countryRelevanceData: item.countries ? CountryTransformer.fetchCollection(item.countries).map((c: Country, index: number) => ({
        country: c,
        relevance: item.countries![index].relevance
      })) : undefined
    })
  }

  static send (data: Project): ProjectDTO {
    return {
      id: data.id,
      name: data.name,
      state: data.state,
      count_records: data.counts ? data.counts.records : undefined,
      count_authors: data.counts ? data.counts.authors : undefined,
      count_institutions: data.counts ? data.counts.institutions : undefined,
      count_countries: data.counts ? data.counts.countries : undefined,
      count_publications: data.counts ? data.counts.publications : undefined,
      count_publishers: data.counts ? data.counts.publishers : undefined,
      count_conferences: data.counts ? data.counts.conferences : undefined,
      count_keywords: data.counts ? data.counts.keywords : undefined,
      count_visualizations: data.counts ? data.counts.visualizations : undefined,
      top_keywords: data.topKeywords,
      top_authors: data.topAuthors ? AuthorTransformer.sendCollection(data.topAuthors) : undefined,
      top_records: data.topRecords ? RecordTransformer.sendCollection(data.topRecords) : undefined,
      countries: data.countryRelevanceData ? CountryTransformer.sendCollection(data.countryRelevanceData.map(o => o.country)).map((c: CountryDTO, index: number) => ({
        ...c,
        relevance: data.countryRelevanceData![index].relevance
      })) : undefined
    }
  }
}
