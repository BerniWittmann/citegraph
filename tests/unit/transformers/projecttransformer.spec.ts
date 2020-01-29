import ProjectTransformer from '@/transformers/ProjectTransformer'
import Project from '@/models/project'
import Author from '@/models/paperEntities/author'
import Record from '@/models/paperEntities/record'
import Country from '@/models/paperEntities/country'

describe('transformers/ProjectTransformer', () => {
  describe('can send a project', () => {
    it('sends a project', () => {
      expect(ProjectTransformer.send(new Project({ name: 'Project' }))).toMatchSnapshot()
    })

    it('sends the counts', () => {
      expect(ProjectTransformer.send(new Project({
        name: 'Project',
        counts: {
          records: 1,
          authors: 2,
          institutions: 3,
          countries: 4,
          publications: 5,
          publishers: 6,
          conferences: 7,
          keywords: 8,
          visualizations: 9
        }
      }))).toMatchSnapshot()
    })

    it('sends the authors', () => {
      expect(ProjectTransformer.send(new Project({
        name: 'Project',
        topAuthors: [
          new Author({ id: '1', firstName: 'First', lastName: 'Author', countRecords: 1 }),
          new Author({ id: '2', firstName: 'Second', lastName: 'Author', countRecords: 2 })
        ]
      }))).toMatchSnapshot()
    })

    it('sends the records', () => {
      expect(ProjectTransformer.send(new Project({
        name: 'Project',
        topRecords: [
          new Record({ id: '1', title: 'First', year: 2000, keywords: [], authors: [], numberCitations: 1 }),
          new Record({ id: '2', title: 'Second', year: 2000, keywords: [], authors: [], numberCitations: 1 })
        ]
      }))).toMatchSnapshot()
    })

    it('sends the country relevance data', () => {
      expect(ProjectTransformer.send(new Project({
        name: 'Project',
        countryRelevanceData: [
          {
            country: new Country({ id: '1', name: 'Deutschland', countRecords: 1 }),
            relevance: 0.4
          }
        ]
      }))).toMatchSnapshot()
    })
  })

  describe('can fetch a project', () => {
    it('fetches a project', () => {
      expect(ProjectTransformer.fetch({ name: 'Project' })).toMatchSnapshot()
    })

    it('fetches the counts', () => {
      expect(ProjectTransformer.fetch({
        name: 'Project',
        count_records: 1,
        count_authors: 2,
        count_institutions: 3,
        count_countries: 4,
        count_publications: 5,
        count_publishers: 6,
        count_conferences: 7,
        count_keywords: 8,
        count_visualizations: 9
      })).toMatchSnapshot()
    })

    it('fetches the authors', () => {
      expect(ProjectTransformer.fetch({
        name: 'Project',
        top_authors: [
          { id: '1', first_name: 'First', last_name: 'Author', count_records: 1 },
          { id: '2', first_name: 'Second', last_name: 'Author', count_records: 2 }
        ]
      })).toMatchSnapshot()
    })

    it('fetches the records', () => {
      expect(ProjectTransformer.fetch({
        name: 'Project',
        top_records: [
          { id: '1', title: 'First', year: 2000, keywords: [], authors: [], number_citations: 1 },
          { id: '2', title: 'Second', year: 2000, keywords: [], authors: [], number_citations: 1 }
        ]
      })).toMatchSnapshot()
    })

    it('fetches the country relevance data', () => {
      expect(ProjectTransformer.fetch({
        name: 'Project',
        countries: [
          {
            id: '1',
            name: 'Deutschland',
            count_records: 1,
            relevance: 0.4
          }
        ]
      })).toMatchSnapshot()
    })
  })
})
