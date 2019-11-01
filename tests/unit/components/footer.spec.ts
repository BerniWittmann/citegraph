import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import Footer from '@/components/Footer.vue'

describe('components/Footer.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Footer, {
      i18n,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
