import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../../setupPlugins'

import Visualization from '@/models/visualizations/Visualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'
import BarChartParameters from '@/components/visualizations/edit/parameters/BarChartParameters.vue'

jest.useFakeTimers()

describe('components/visualizations/edit/parameters/BarChartParameters.vue', () => {
  const getWrapper = (vis: Visualization = new BarChartVisualization({ name: 'Test' })) => {
    return shallowMount(BarChartParameters, {
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

  it('can submit the form', () => {
    const wrapper = getWrapper()
    const btn = wrapper.findAll('v-btn-stub').at(1)
    expect(btn.exists()).toBeTruthy()
    const form = wrapper.find('v-form-stub')
    expect(form.exists()).toBeTruthy()
    // @ts-ignore
    wrapper.vm.valid = true
    expect(wrapper.emitted('submit')).toBeFalsy()

    form.vm.$emit('submit', { preventDefault: jest.fn() })

    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('can go back', () => {
    const wrapper = getWrapper()
    const btn = wrapper.find('v-btn-stub')
    expect(btn.exists()).toBeTruthy()
    expect(wrapper.emitted('back')).toBeFalsy()
    btn.vm.$emit('click')

    expect(wrapper.emitted('back')).toBeTruthy()
  })

  it('prevents the form submit if it is not valid', () => {
    const wrapper = getWrapper()
    const btn = wrapper.findAll('v-btn-stub').at(1)
    expect(btn.exists()).toBeTruthy()
    const form = wrapper.find('v-form-stub')
    expect(form.exists()).toBeTruthy()
    // @ts-ignore
    wrapper.vm.valid = false
    expect(wrapper.emitted('submit')).toBeFalsy()

    form.vm.$emit('submit', { preventDefault: jest.fn() })

    expect(wrapper.emitted('submit')).toBeFalsy()
  })
})
