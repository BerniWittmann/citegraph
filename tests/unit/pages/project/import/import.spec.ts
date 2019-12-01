import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ImportPage from '@/pages/project/import/Import.vue'
import Project from '@/models/project'
import ProjectImportUploadComponent from '@/components/project/import/Upload.vue'
import ProjectImportProcessingComponent from '@/components/project/import/Processing.vue'
import ProjectImportDoneComponent from '@/components/project/import/Done.vue'

jest.useFakeTimers()

describe('pages/project/Import.vue', () => {
  function getWrapper () {
    return shallowMount(ImportPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/activeProject': new Project({ id: 12, name: 'My awesome Project' })
          }
        }
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
    expect(steps.length).toEqual(3)
  })

  describe('has an upload step', () => {
    it('is renders the upload component', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains(ProjectImportUploadComponent)).toBeTruthy()
    })

    it('goes to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      const uploadComponent = wrapper.find(ProjectImportUploadComponent)
      uploadComponent.vm.$emit('next-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(2)
    })
  })

  describe('has a processing step', () => {
    it('is renders the processing component', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains(ProjectImportProcessingComponent)).toBeTruthy()
    })

    it('goes to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 2
      const processingComponent = wrapper.find(ProjectImportProcessingComponent)
      expect(processingComponent.props('isProcessing')).toBeFalsy()
      processingComponent.vm.$emit('next-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(3)
    })

    it('starts processing on the start of the step', () => {
      const wrapper = getWrapper()
      const uploadComponent = wrapper.find(ProjectImportUploadComponent)
      uploadComponent.vm.$emit('next-step')

      const processingComponent = wrapper.find(ProjectImportProcessingComponent)

      expect(processingComponent.props('isProcessing')).toBeTruthy()
    })

    it('ends processing after a delay', () => {
      const wrapper = getWrapper()
      const uploadComponent = wrapper.find(ProjectImportUploadComponent)
      uploadComponent.vm.$emit('next-step')

      const processingComponent = wrapper.find(ProjectImportProcessingComponent)

      expect(processingComponent.props('isProcessing')).toBeTruthy()
      jest.runAllTimers()
      expect(processingComponent.props('isProcessing')).toBeFalsy()
    })
  })

  describe('has a done step', () => {
    it('is renders the done component', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains(ProjectImportDoneComponent)).toBeTruthy()
    })

    it('does not go to the next Step on the next step event', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentStep = 3
      // @ts-ignore
      wrapper.vm.nextStep()

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(3)
    })

    it('goes to the first Step on the first step event', () => {
      const wrapper = getWrapper()

      // @ts-ignore
      wrapper.vm.currentStep = 3
      const doneComponent = wrapper.find(ProjectImportDoneComponent)
      doneComponent.vm.$emit('first-step')

      // @ts-ignore
      expect(wrapper.vm.currentStep).toEqual(1)
    })
  })
})
