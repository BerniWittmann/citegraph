import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import PaperEntityLayout from '@/layouts/PaperEntity.vue'

describe('layouts/PaperEntity.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(PaperEntityLayout, {
      i18n,
      slots: {
        title: '<h1 class="title">Title</h1>',
        default: '<p class="content">Main Content</p>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders an edit button', () => {
    const wrapper = shallowMount(PaperEntityLayout, {
      i18n,
      slots: {
        title: '<h1 class="title">Title</h1>',
        default: '<p class="content">Main Content</p>'
      }
    })
    const btn = wrapper.find('v-btn-stub')
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toContain('project.explore.view.edit')
  })
})
