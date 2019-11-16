import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import DefaultLayout from '@/layouts/Default.vue'

import AppBar from '@/components/AppBar.vue'
import Footer from '@/components/Footer.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'

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
  it('renders the App Bar', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n
    })
    expect(wrapper.contains(AppBar)).toBeTruthy()
  })
  it('renders the Navigation Drawer', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n
    })
    expect(wrapper.contains(NavigationDrawer)).toBeTruthy()
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
  it('updates the drawer state on an event from the app bar', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n
    })
    let drawer = wrapper.find(NavigationDrawer)
    expect(drawer.props('drawerVisible')).toBeTruthy()
    const bar = wrapper.find(AppBar)
    bar.vm.$emit('toggle-drawer')
    drawer = wrapper.find(NavigationDrawer)
    expect(drawer.props('drawerVisible')).toBeFalsy()
  })
})
