import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import AboutPage from '@/pages/About.vue'

describe('pages/About.vue', () => {
  it('renders the page', () => {
    const wrapper = shallowMount(AboutPage, {
      i18n
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
