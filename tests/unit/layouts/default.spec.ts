import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import DefaultLayout from '@/layouts/Default.vue'

import AppBar from '@/components/AppBar.vue'
import Footer from '@/components/Footer.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import ToastsContainer from '@/components/ToastsContainer.vue'

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
  it('renders the toasts container', () => {
    const wrapper = shallowMount(DefaultLayout, {
      i18n
    })
    expect(wrapper.contains(ToastsContainer)).toBeTruthy()
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

  describe('it sets the default value of the drawer state on route change', () => {
    it('does not set the drawer state when changing from project to project page', () => {
      const wrapper = shallowMount(DefaultLayout, {
        i18n
      })
      let drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
      // @ts-ignore
      wrapper.vm.onRouteChange({
        // @ts-ignore
        matched: [{
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }]
      }, {
        // @ts-ignore
        matched: [{
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }],
        name: 'projects.single'
      })
      drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
    })
    it('does not set the drawer state when changing from a non project to a non project page', () => {
      const wrapper = shallowMount(DefaultLayout, {
        i18n
      })
      let drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
      // @ts-ignore
      wrapper.vm.onRouteChange({
        // @ts-ignore
        matched: [{
          name: 'home',
          meta: {}
        }]
      }, {
        // @ts-ignore
        matched: [{
          name: 'about',
          meta: {}
        }],
        name: 'about'
      })
      drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
    })
    it('does set the drawer state when changing from a non project to a project page', () => {
      const wrapper = shallowMount(DefaultLayout, {
        i18n
      })
      // @ts-ignore
      wrapper.vm.toggleDrawer()
      let drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeFalsy()
      // @ts-ignore
      wrapper.vm.onRouteChange({
        // @ts-ignore
        matched: [{
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }]
      }, {
        // @ts-ignore
        matched: [{
          name: 'about',
          meta: {}
        }],
        name: 'about'
      })
      drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
    })
    it('does unset the drawer state when changing from a project to a non project page', () => {
      const wrapper = shallowMount(DefaultLayout, {
        i18n
      })
      let drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
      // @ts-ignore
      wrapper.vm.onRouteChange({
        // @ts-ignore
        matched: [{
          name: 'home',
          meta: {}
        }]
      }, {
        // @ts-ignore
        matched: [{
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }],
        name: 'projects.single'
      })
      drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeFalsy()
    })
    it('does set the drawer state when changing to a project page from a non existing page', () => {
      const wrapper = shallowMount(DefaultLayout, {
        i18n
      })
      // @ts-ignore
      wrapper.vm.toggleDrawer()
      let drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeFalsy()
      // @ts-ignore
      wrapper.vm.onRouteChange({
        // @ts-ignore
        matched: [{
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }]
      }, { name: undefined, matched: [] })
      drawer = wrapper.find(NavigationDrawer)
      expect(drawer.props('drawerVisible')).toBeTruthy()
    })
  })
})
