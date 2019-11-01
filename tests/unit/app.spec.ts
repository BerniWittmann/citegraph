import { shallowMount } from '@vue/test-utils'
import { i18n } from './setupPlugins'

import EmptySlotComponent from './EmptySlotComponent.vue'
import DefaultLayout from '@/layouts/Default.vue'

import App from '@/App.vue'

describe('App.vue', () => {
  it('renders the router view', () => {
    const wrapper = shallowMount(App, {
      i18n,
      stubs: {
        'v-layout': EmptySlotComponent,
        'router-view': '<p>Router View</p>'
      }
    })
    expect(wrapper.html()).toContain('Router View')
  })
  it('renders the layout', () => {
    const wrapper = shallowMount(App, {
      i18n,
      stubs: {
        'router-view': '<p>Router View</p>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains(DefaultLayout)).toBeTruthy()
  })
})
