import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import DefaultLayout from '@/layouts/Default.vue'

import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

describe('layouts/Default.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n,
      slots: {
        default: '<p class="content">Main Content</p>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('renders the navigation', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n
    })
    expect(wrapper.contains(Navigation)).toBeTruthy()
  })
  it('renders the main content', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n,
      slots: {
        default: '<p class="content">Main Content</p>'
      }
    })
    const content = wrapper.find('.content')
    expect(content.exists()).toBeTruthy()
    expect(content.text()).toEqual('Main Content')
  })
  it('renders the footer', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n
    })
    expect(wrapper.contains(Footer)).toBeTruthy()
  })
})
