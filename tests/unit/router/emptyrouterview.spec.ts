import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import EmptyRouterView from '@/router/EmptyRouterView.vue'

describe('components/EmptyRouterView.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(EmptyRouterView, {
      i18n,
      stubs: {
        'router-view': '<div class="router-view"></div>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.router-view')).toBeTruthy()
  })
})
