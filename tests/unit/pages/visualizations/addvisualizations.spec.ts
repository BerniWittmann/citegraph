import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import AddVisualizationsPage from '@/pages/visualizations/AddVisualization.vue'
import VisualizationAddSelectTypeComponent from '@/components/visualizations/add/SelectType.vue'

describe('pages/visualizations/AddVisualization.vue', () => {
  const router = {
    back: jest.fn()
  }

  function getWrapper () {
    return shallowMount(AddVisualizationsPage, {
      i18n,
      mocks: {
        $route: {
          params: {
            projectId: 23
          }
        },
        $router: router
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has several steps', () => {
    const wrapper = getWrapper()
    const steps = wrapper.findAll('v-stepper-content-stub')
    expect(steps.length).toEqual(4)
  })

  describe('has a select type step', () => {
    it('renders the select Type component', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains(VisualizationAddSelectTypeComponent)).toBeTruthy()
    })

    it('goes to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      const uploadComponent = wrapper.find(VisualizationAddSelectTypeComponent)
      uploadComponent.vm.$emit('next-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(2)
    })
  })

  describe('it can navigate through the steps', () => {
    it('can navigate to the next step', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(1)
      // @ts-ignore
      wrapper.vm.nextStep()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(2)
      // @ts-ignore
      wrapper.vm.nextStep()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(3)
      // @ts-ignore
      wrapper.vm.nextStep()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(4)
    })

    it('does not overflow when incrementing the step', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 4
      // @ts-ignore
      wrapper.vm.nextStep()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(4)
    })

    it('can go to the previous step', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 2
      // @ts-ignore
      wrapper.vm.previousStep()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(1)
    })

    it('does not go behind the first step when going to the previos step', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 1
      // @ts-ignore
      wrapper.vm.previousStep()
      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(1)
    })
  })
})
