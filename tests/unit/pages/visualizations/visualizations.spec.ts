import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import VisualizationsPage from '@/pages/visualizations/Visualizations.vue'
import Visualization from '@/models/visualizations/Visualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'
import VisualizationCard from '@/components/visualizations/VisualizationCard.vue'
import EmptySlotComponent from '../../EmptySlotComponent.vue'

describe('pages/visualizations/VisualizationsPage.vue', () => {
  const visualizationsData = [
    new WordCloudVisualization({ id: '1', name: 'First Project' }),
    new BarChartVisualization({ id: '2', name: 'Second Project' })
  ]
  function getWrapper (visualizations?: Array<Visualization>) {
    visualizations = visualizations || visualizationsData
    return shallowMount(VisualizationsPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'visualizations/visualizations': visualizations
          }
        },
        $route: {
          params: {
            projectId: 23
          }
        }
      },
      stubs: {
        VTooltip: EmptySlotComponent
      }
    })
  }
  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the visualizations', () => {
    const wrapper = getWrapper()
    const cards = wrapper.findAll(VisualizationCard)
    expect(cards.length).toEqual(2)
  })

  it('has a card to add a new visualization', () => {
    const wrapper = getWrapper()
    const addCard = wrapper.find('.add-card')
    expect(addCard.exists()).toBeTruthy()
    expect(addCard.props('to')).toEqual({ name: 'project.single.visualizations.add', params: { projectId: 23 } })
  })

  it('renders a different page if no visualizations exist', () => {
    const wrapper = getWrapper([])
    expect(wrapper.html()).toMatchSnapshot()
    const addButton = wrapper.find('v-btn-stub')
    expect(addButton.exists()).toBeTruthy()
    expect(addButton.props('to')).toEqual({ name: 'project.single.visualizations.add', params: { projectId: 23 } })
  })
})
