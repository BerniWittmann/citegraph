import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import HomePage from '@/pages/Home.vue'

describe('pages/Home.vue', () => {
  it('renders the page', () => {
    const wrapper = shallowMount(HomePage, {
      i18n
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
