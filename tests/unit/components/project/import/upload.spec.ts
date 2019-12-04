import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ProjectImportUploadComponent from '@/components/project/import/Upload.vue'

jest.useFakeTimers()

describe('components/project/import/Upload.vue', () => {
  function getWrapper () {
    return shallowMount(ProjectImportUploadComponent, {
      i18n,
      stubs: {
        'vue-dropzone': '<div class="dropzone"><slot/></div>'
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the dropzone', () => {
    const wrapper = getWrapper()
    expect(wrapper.contains('#dropzone')).toBeTruthy()
    expect(wrapper.contains('#dropzone-previews')).toBeTruthy()
  })

  it('renders the import button only if there exist files', () => {
    const wrapper = getWrapper()
    const dz = wrapper.find('#dropzone')
    expect(wrapper.contains('v-btn-stub')).toBeFalsy()
    dz.vm.$emit('vdropzone-file-added')

    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toContain('project.import.upload.import')
  })

  it('processes the upload queue when the import button is clicked', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getQueuedFiles = jest.fn().mockReturnValue([{}])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getAcceptedFiles = jest.fn().mockReturnValue([{}])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.processQueue = jest.fn()
    const dz = wrapper.find('#dropzone')
    dz.vm.$emit('vdropzone-file-added')

    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    button.vm.$emit('click')

    // @ts-ignore
    expect(wrapper.vm.$refs.myVueDropzone.processQueue).toHaveBeenCalled()
  })

  it('directly goes to the next step when there are no queued but accepted files', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getQueuedFiles = jest.fn().mockReturnValue([])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getAcceptedFiles = jest.fn().mockReturnValue([{}])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.processQueue = jest.fn()
    const dz = wrapper.find('#dropzone')
    dz.vm.$emit('vdropzone-file-added')
    expect(wrapper.emitted('next-step')).toBeFalsy()

    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    button.vm.$emit('click')

    // @ts-ignore
    expect(wrapper.vm.$refs.myVueDropzone.processQueue).not.toHaveBeenCalled()
    expect(wrapper.emitted('next-step')).toBeTruthy()
  })

  it('does not trigger the upload if there are no files at all', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getQueuedFiles = jest.fn().mockReturnValue([])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getAcceptedFiles = jest.fn().mockReturnValue([])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.processQueue = jest.fn()
    const dz = wrapper.find('#dropzone')
    dz.vm.$emit('vdropzone-file-added')
    expect(wrapper.emitted('next-step')).toBeFalsy()

    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    button.vm.$emit('click')

    // @ts-ignore
    expect(wrapper.vm.$refs.myVueDropzone.processQueue).not.toHaveBeenCalled()
    expect(wrapper.emitted('next-step')).toBeFalsy()
  })

  it('emits the next step event when the upload finished', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getQueuedFiles = jest.fn().mockReturnValue([{}])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.getAcceptedFiles = jest.fn().mockReturnValue([{}])
    // @ts-ignore
    wrapper.vm.$refs.myVueDropzone.processQueue = jest.fn()
    const dz = wrapper.find('#dropzone')
    dz.vm.$emit('vdropzone-file-added')
    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    button.vm.$emit('click')
    expect(wrapper.emitted('next-step')).toBeFalsy()

    expect(button.html()).toMatchSnapshot()

    dz.vm.$emit('vdropzone-success-multiple')
    expect(button.html()).toMatchSnapshot()
    jest.runAllTimers()
    expect(wrapper.emitted('next-step')).toBeTruthy()
  })

  it('provides the file preview template', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    expect(wrapper.vm.isLoading).toBeFalsy()

    // @ts-ignore
    expect(wrapper.vm.previewHTML).toEqual(expect.any(String))
  })
})
