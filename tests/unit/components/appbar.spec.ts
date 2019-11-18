import { RouterLinkStub, mount } from '@vue/test-utils'
import { i18n, vuetify } from '../setupPlugins'

import AppBar from '@/components/AppBar.vue'
import Project from '@/models/project'

describe('components/AppBar.vue', () => {
  const router = {
    push: jest.fn().mockResolvedValue(undefined),
    resolve: jest.fn(),
    replace: jest.fn()
  }
  const projects = [
    new Project({ id: 1, name: 'First Project' }),
    new Project({ id: 2, name: 'Second Project' }),
    new Project({ id: 3, name: 'Last Project' })
  ]
  const store = {
    getters: {
      'projects/openProjects': projects
    },
    dispatch: jest.fn()
  }
  const getWrapper = (routeName: string = 'projects.single') => {
    return mount(AppBar, {
      i18n,
      vuetify,
      mocks: {
        $route: {
          name: 'projects.single',
          matched: [{ name: routeName }],
          params: {
            projectId: 2
          }
        },
        $vuetify: {
          breakpoint: {
            lgAndUp: true
          }
        },
        $store: store,
        $router: router
      },
      stubs: {
        RouterLink: RouterLinkStub,
        VTab: '<div class="tab"><slot/></div>'
      }
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
  it('renders a tab for the projects overview', () => {
    const wrapper = getWrapper()
    const firstTab = wrapper.find('.tab')
    expect(firstTab.exists()).toBeTruthy()
    expect(firstTab.text()).toEqual('projects.title')
    expect(firstTab.props('to')).toEqual({ name: 'projects' })
  })
  it('renders the projects', () => {
    const wrapper = getWrapper()
    const tabs = wrapper.findAll('.tab')
    expect(tabs.length).toEqual(1 + projects.length)
  })
  it('the active tab is determined upon the route', () => {
    const wrapper = getWrapper()
    const tabs = wrapper.findAll('.tab')
    expect(tabs.at(1).find('.v-icon').isVisible()).toBeFalsy()
    expect(tabs.at(2).find('.v-icon').isVisible()).toBeTruthy()
    expect(tabs.at(3).find('.v-icon').isVisible()).toBeFalsy()
  })
  it('if not on a project page no tab is active', () => {
    const wrapper = getWrapper('home')
    const tabs = wrapper.findAll('.tab')
    expect.assertions(tabs.length - 1)
    for (let i = 1; i < tabs.length; i++) {
      expect(tabs.at(i).find('.v-icon').isVisible()).toBeFalsy()
    }
  })
  it('the active tab can be removed by clicking the close button', () => {
    const wrapper = getWrapper('home')
    const tabs = wrapper.findAll('.tab')
    tabs.at(2).find('.v-icon').trigger('click')
    expect(store.dispatch).toHaveBeenCalledWith('projects/closeProject', projects[1])
    expect(router.replace).toHaveBeenCalledWith({ name: 'projects' })
  })
  it('retriggers the tab slider on tab change', (done) => {
    const wrapper = getWrapper('home')
    // @ts-ignore
    wrapper.vm.$refs.projectTabs.callSlider = jest.fn()
    wrapper.find('.v-tabs').vm.$emit('change')
    expect.assertions(1)
    wrapper.vm.$nextTick(() => {
      // @ts-ignore
      expect(wrapper.vm.$refs.projectTabs.callSlider).toHaveBeenCalled()
      done()
    })
  })
})
