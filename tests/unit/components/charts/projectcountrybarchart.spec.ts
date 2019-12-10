import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import ProjectCountryBarChart from '@/components/charts/ProjectCountryBarChart.vue'
import Project from '@/models/project'
import Country from '@/models/paperEntities/country'

describe('components/charts/ProjectCountryBarChart.vue', () => {
  const projectData = {
    id: 1,
    name: 'My Project',
    countryRelevanceData: [{
      country: new Country({ id: '1', name: 'USA', countRecords: 42 }),
      relevance: 0.3
    }, {
      country: new Country({ id: '2', name: 'China', countRecords: 42 }),
      relevance: 0.3
    }, {
      country: new Country({ id: '3', name: 'Germany', countRecords: 42 }),
      relevance: 0.4
    }]
  }
  const renderChart = jest.fn()
  const getWrapper = (project?: Project) => {
    project = project || new Project(projectData)
    return shallowMount(ProjectCountryBarChart, {
      i18n,
      propsData: {
        project
      },
      methods: {
        renderChart
      }
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the chart', () => {
    getWrapper()
    expect(renderChart).toHaveBeenCalledWith({
      datasets: [{
        data: [0.3, 0.3, 0.4],
        backgroundColor: [expect.any(String), expect.any(String), expect.any(String)]
      }],
      labels: ['USA', 'China', 'Germany']
    }, {
      responsive: true
    })
  })

  it('does not render the chart if the country data does not exist', () => {
    const wrapper = getWrapper(new Project({
      ...projectData,
      countryRelevanceData: undefined
    }))
    expect(wrapper.html()).toMatchSnapshot()
    expect(renderChart).not.toHaveBeenCalled()
  })
})
