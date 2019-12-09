import Author from '@/models/paperEntities/author'
import Record from '@/models/paperEntities/record'
import Country from '@/models/paperEntities/country'

interface ProjectCountInformation {
  records: number;
  authors: number;
  institutions: number;
  countries: number;
  publications: number;
  publishers: number;
  conferences: number;
  keywords: number;

  visualizations: number;
}

interface ProjectCountryData {
  country: Country;
  relevance: number;
}

export enum ProjectStates {
  IMPORT = 'IMPORT',
  EXPLORE = 'EXPLORE',
  VISUALIZE = 'VISUALIZE'
}

export default class Project {
  name: string
  id?: number

  state?: ProjectStates = ProjectStates.IMPORT

  counts?: ProjectCountInformation
  topAuthors?: Array<Author>
  topRecords?: Array<Record>
  topKeywords?: Array<string>
  countryRelevanceData?: Array<ProjectCountryData>

  constructor ({ name, id, state, counts, topAuthors, topRecords, topKeywords, countryRelevanceData }: Project) {
    this.id = id
    this.name = name
    this.state = state || ProjectStates.IMPORT
    this.counts = counts
    this.topAuthors = topAuthors
    this.topRecords = topRecords
    this.topKeywords = topKeywords
    this.countryRelevanceData = countryRelevanceData
  }
}
