import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import Navigation from '@/components/Navigation.vue'

describe('components/Navigation.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Navigation, {
      i18n,
      mocks: {
        $route: {
          name: 'home'
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
