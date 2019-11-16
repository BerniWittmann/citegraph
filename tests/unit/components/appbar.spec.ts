import { RouterLinkStub, mount } from '@vue/test-utils'
import { i18n, vuetify } from '../setupPlugins'

import AppBar from '@/components/AppBar.vue'

describe('components/AppBar.vue', () => {
  const router = {
    push: jest.fn().mockResolvedValue(undefined),
    resolve: jest.fn()
  }
  const getWrapper = () => {
    return mount(AppBar, {
      i18n,
      vuetify,
      mocks: {
        $route: {
          name: 'home'
        },
        $vuetify: {
          breakpoint: {
            lgAndUp: true
          }
        },
        $router: router
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      sync: false
    })
  }
  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('navigates to the home page when clicking on the title', () => {
    const wrapper = getWrapper()
    expect(wrapper.find('.v-toolbar__title').exists()).toBeTruthy()
    wrapper.find('.v-toolbar__title').trigger('click')
    expect(router.push).toHaveBeenCalledWith('/')
  })
  it('emits an event when the icon is clicked', () => {
    const wrapper = getWrapper()
    expect(wrapper.emitted('toggle-drawer')).toBeFalsy()
    expect(wrapper.find('.v-app-bar__nav-icon').exists()).toBeTruthy()
    wrapper.find('.v-app-bar__nav-icon').trigger('click')
    expect(wrapper.emitted('toggle-drawer')).toBeTruthy()
  })
})
