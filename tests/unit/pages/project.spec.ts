import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ProjectPage from '@/pages/Project.vue'
import Project from '@/models/project'

describe('pages/Project.vue', () => {
  it('renders the page', () => {
    const wrapper = shallowMount(ProjectPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/activeProject': new Project({ id: 12, name: 'My awesome Project' })
          }
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('displays the projects name', () => {
    const wrapper = shallowMount(ProjectPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/activeProject': new Project({ id: 12, name: 'My awesome Project' })
          }
        }
      }
    })
    expect(wrapper.text()).toContain('My awesome Project')
  })

  it('shows a warning if project is not available', () => {
    const wrapper = shallowMount(ProjectPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/activeProject': undefined
          }
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
