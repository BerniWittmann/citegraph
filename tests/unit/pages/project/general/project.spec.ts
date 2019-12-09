import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ProjectPage from '@/pages/project/general/Project.vue'
import Project, { ProjectStates } from '@/models/project'
import Author from '@/models/paperEntities/author'
import Record from '@/models/paperEntities/record'
import Country from '@/models/paperEntities/country'

const projectData = {
  id: 12,
  name: 'My awesome Project',
  state: ProjectStates.EXPLORE,
  counts: {
    records: 1234,
    authors: 23,
    institutions: 21,
    countries: 14,
    publications: 54,
    publishers: 23,
    conferences: 25,
    keywords: 46,
    visualizations: 3
  },
  topAuthors: [
    new Author({ id: '1', firstName: 'Hans', lastName: 'Meier', countRecords: 23 }),
    new Author({ id: '2', firstName: 'Heinz', lastName: 'Schmidt', countRecords: 23 }),
    new Author({ id: '3', firstName: 'Friedrich', lastName: 'Bauer', countRecords: 23 })
  ],
  topRecords: [
    new Record({ id: '1', title: 'This is the first record', authors: [], keywords: [], numberCitations: 23, year: 1994 }),
    new Record({ id: '2', title: 'This is the second record', authors: [], keywords: [], numberCitations: 23, year: 1994 }),
    new Record({ id: '3', title: 'This is the third record', authors: [], keywords: [], numberCitations: 23, year: 1994 })
  ],
  topKeywords: ['these', 'are', 'the', 'most', 'popular', 'keywords'],
  countryRelevanceData: [{
    country: new Country({
      id: '1',
      name: 'United States of America',
      flagUrl: 'https://restcountries.eu/data/usa.svg',
      countRecords: 23
    }),
    relevance: 0.4
  }, {
    country: new Country({
      id: '2',
      name: 'Germany',
      flagUrl: 'https://restcountries.eu/data/deu.svg',
      countRecords: 23
    }),
    relevance: 0.3
  }, {
    country: new Country({
      id: '3',
      name: 'France',
      flagUrl: 'https://restcountries.eu/data/fra.svg',
      countRecords: 23
    }),
    relevance: 0.1
  }, {
    country: new Country({
      id: '5',
      name: 'China',
      flagUrl: 'https://restcountries.eu/data/chn.svg',
      countRecords: 23
    }),
    relevance: 0.2
  }]
}

describe('pages/Project.vue', () => {
  function getWrapper (project?: Project) {
    return shallowMount(ProjectPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/activeProject': project || new Project(projectData)
          }
        }
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders an alternate page depending on the project state', () => {
    const wrapper = getWrapper(new Project({
      ...projectData,
      state: ProjectStates.IMPORT
    }))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('displays the projects name', () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain('My awesome Project')
  })

  it('has a button to edit the project', () => {
    const wrapper = getWrapper()
    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toContain('project.edit.button_text')
    expect(button.props('to')).toEqual({
      name: 'projects.single.edit', params: { projectId: 12 }
    })
  })

  it('can handle incomplete data on the project object', () => {
    const wrapper = getWrapper(new Project({
      ...projectData,
      counts: undefined,
      topKeywords: undefined,
      topRecords: undefined,
      topAuthors: undefined,
      countryRelevanceData: undefined
    }))
    expect(wrapper.html()).toMatchSnapshot()
  })
})
