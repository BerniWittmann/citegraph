import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import EditVisualizationsPage from '@/pages/visualizations/visualization/EditVisualization.vue'
import VisualizationEditSelectTypeComponent from '@/components/visualizations/edit/SelectType.vue'
import VisualizationEditGeneralInformationComponent from '@/components/visualizations/edit/GeneralInformation.vue'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'
import VisualizationEditChooseDataComponent from '@/components/visualizations/edit/ChooseData.vue'
import Visualization from '@/models/visualizations/Visualization'

describe('pages/visualizations/EditVisualization.vue', () => {
  const router = {
    back: jest.fn()
  }

  function getWrapper (visualization?: Visualization) {
    const store = {
      getters: {
        'visualizations/hasCurrentVisualization': !!visualization,
        'visualizations/currentVisualization': visualization
      }
    }

    const wrapper = shallowMount(EditVisualizationsPage, {
      i18n,
      mocks: {
        $route: {
          params: {
            projectId: 23
          }
        },
        $store: store,
        $router: router
      }
    })

    // @ts-ignore
    wrapper.vm.$refs.chooseDataComponent.updateChart = jest.fn()
    return wrapper
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
      expect(wrapper.contains(VisualizationEditSelectTypeComponent)).toBeTruthy()
    })

    it('goes to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      const selectTypeComponent = wrapper.find(VisualizationEditSelectTypeComponent)
      selectTypeComponent.vm.$emit('next-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(2)
    })

    it('can update the type', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      expect(wrapper.vm.visualization).toEqual(new WordCloudVisualization({
        name: ''
      }))
      const selectTypeComponent = wrapper.find(VisualizationEditSelectTypeComponent)
      selectTypeComponent.vm.$emit('update-type', BarChartVisualization)
      // @ts-ignore
      expect(wrapper.vm.visualization).toEqual(new BarChartVisualization({
        name: ''
      }))
    })
  })

  describe('has a general information step', () => {
    it('renders the general information component', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains(VisualizationEditGeneralInformationComponent)).toBeTruthy()
    })

    it('goes to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      const infoComponent = wrapper.find(VisualizationEditGeneralInformationComponent)
      infoComponent.vm.$emit('next-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(2)
    })

    it('goes to previous Step on the previous step event', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 2
      const infoComponent = wrapper.find(VisualizationEditGeneralInformationComponent)
      infoComponent.vm.$emit('previous-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(1)
    })

    it('can update the name', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      expect(wrapper.vm.visualization).toEqual(new WordCloudVisualization({
        name: ''
      }))
      const infoComponent = wrapper.find(VisualizationEditGeneralInformationComponent)
      infoComponent.vm.$emit('update:name', 'New Name')
      // @ts-ignore
      expect(wrapper.vm.visualization).toEqual(new WordCloudVisualization({
        name: 'New Name'
      }))
    })
  })

  describe('has a choose data step', () => {
    it('renders the choose data component', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains(VisualizationEditChooseDataComponent)).toBeTruthy()
    })

    it('goes to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      const infoComponent = wrapper.find(VisualizationEditChooseDataComponent)
      infoComponent.vm.$emit('next-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(2)
    })

    it('goes to previous Step on the previous step event', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 3
      const infoComponent = wrapper.find(VisualizationEditChooseDataComponent)
      infoComponent.vm.$emit('previous-step')

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

  it('if a visualization already exists the visualization data is prefilled', () => {
    const vis = new BarChartVisualization({ id: '42', name: 'My Chart' })
    const wrapper = getWrapper(vis)
    expect(wrapper.html()).toMatchSnapshot()
    // @ts-ignore
    expect(wrapper.vm.visualization).toEqual(vis)
  })

  it('updates the bar chart when going to the fitting step', (done) => {
    const wrapper = getWrapper()
    // @ts-ignore
    expect(wrapper.vm.$refs.chooseDataComponent.updateChart).not.toHaveBeenCalled()
    // @ts-ignore
    wrapper.vm.currentStep = 2
    // @ts-ignore
    wrapper.vm.nextStep()
    wrapper.vm.$nextTick(() => {
      // @ts-ignore
      expect(wrapper.vm.$refs.chooseDataComponent.updateChart).toHaveBeenCalled()
      done()
    })
  })
})
