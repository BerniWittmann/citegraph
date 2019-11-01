import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import About from '@/pages/About.vue'

describe('pages/About.vue', () => {
  it('renders the page', () => {
    const wrapper = shallowMount(About, {
      i18n
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
