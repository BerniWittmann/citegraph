import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ProjectImportProcessingComponent from '@/components/project/import/Processing.vue'

describe('components/project/import/Processing.vue', () => {
  function getWrapper () {
    return shallowMount(ProjectImportProcessingComponent, {
      i18n,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('the progress loader is not loading by default', () => {
    const wrapper = getWrapper()
    const progress = wrapper.find('v-progress-linear-stub')
    expect(progress.exists()).toBeTruthy()
    expect(progress.props('indeterminate')).toBeFalsy()
  })

  it('the progress loader is can be set to loading', () => {
    const wrapper = getWrapper()
    wrapper.setProps({
      isProcessing: true
    })
    const progress = wrapper.find('v-progress-linear-stub')
    expect(progress.exists()).toBeTruthy()
    expect(progress.props('indeterminate')).toBeTruthy()
  })
})
