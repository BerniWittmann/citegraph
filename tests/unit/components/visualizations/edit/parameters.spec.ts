import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import VisualizationEditParametersComponent from '@/components/visualizations/edit/Parameters.vue'
import Visualization from '@/models/visualizations/Visualization'
import { visualizations } from '@/models/visualizations'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'
import BarChartParameters from '@/components/visualizations/edit/parameters/BarChartParameters.vue'

jest.useFakeTimers()

describe('components/visualizations/edit/Parameters.vue', () => {
  const getWrapper = (vis: Visualization = new BarChartVisualization({ name: 'Test' })) => {
    return shallowMount(VisualizationEditParametersComponent, {
      i18n,
      mocks: {
        $t: (key: string) => key
      },
      propsData: {
        visualization: vis
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders if no correct visualization type was found', () => {
    const wrapper = getWrapper({ name: 'False', key: 'invalid', parameters: {}, timePeriods: [] })
    expect(wrapper.html()).toMatchSnapshot()
  })

  visualizations.forEach(VisualizationClass => {
    it('renders the correct component for ' + VisualizationClass.key, () => {
      const wrapper = getWrapper(new VisualizationClass({ name: 'Visualization' }))
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('can emit the next step event', () => {
    const wrapper = getWrapper()
    const comp = wrapper.find(BarChartParameters)
    expect(comp.exists()).toBeTruthy()
    expect(wrapper.emitted('next-step')).toBeFalsy()
    comp.vm.$emit('submit')
    expect(wrapper.emitted('next-step')).toBeTruthy()
  })

  it('can emit the previous step event', () => {
    const wrapper = getWrapper()
    const comp = wrapper.find(BarChartParameters)
    expect(comp.exists()).toBeTruthy()
    expect(wrapper.emitted('previous-step')).toBeFalsy()
    comp.vm.$emit('back')
    expect(wrapper.emitted('previous-step')).toBeTruthy()
  })
})
