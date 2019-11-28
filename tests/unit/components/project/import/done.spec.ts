import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ProjectImportDoneComponent from '@/components/project/import/Done.vue'

describe('components/project/import/Done.vue', () => {
  function getWrapper () {
    return shallowMount(ProjectImportDoneComponent, {
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

  it('renders a button to add more files', () => {
    const wrapper = getWrapper()
    const btn = wrapper.findAll('v-btn-stub').at(0)
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toEqual('project.import.done.add_more')
    expect(wrapper.emitted('first-step')).toBeFalsy()

    btn.vm.$emit('click')

    expect(wrapper.emitted('first-step')).toBeTruthy()
  })

  it('renders a button link to the explore page', () => {
    const wrapper = getWrapper()
    const btn = wrapper.findAll('v-btn-stub').at(1)
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toEqual('project.import.done.explore')
  })
})
