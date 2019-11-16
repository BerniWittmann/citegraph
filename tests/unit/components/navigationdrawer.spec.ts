import { RouterLinkStub, mount } from '@vue/test-utils'
import { i18n, vuetify } from '../setupPlugins'

import NavigationDrawer from '@/components/NavigationDrawer.vue'
import Project from '@/models/project'

describe('components/NavigationDrawer.vue', () => {
  const getWrapper = (project: Project | undefined) => {
    return mount(NavigationDrawer, {
      i18n,
      vuetify,
      mocks: {
        $route: {
          name: 'projects.single'
        },
        $vuetify: {
          breakpoint: {
            lgAndUp: true
          }
        },
        $store: {
          getters: {
            'projects/activeProject': project
          }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      sync: false
    })
  }
  it('renders', () => {
    const wrapper = getWrapper(new Project({ id: 12, name: 'My awesome Project' }))
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('My awesome Project')
  })
  it('does not render the project related stuff when no project available', () => {
    const wrapper = getWrapper(undefined)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).not.toContain('My awesome Project')
  })
})
