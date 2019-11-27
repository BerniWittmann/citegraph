import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ProjectPage from '@/pages/project/Project.vue'
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

  it('has a button to edit the project', () => {
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
    const button = wrapper.find('v-btn-stub')
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toContain('project.edit.button_text')
    expect(button.props('to')).toEqual({
      name: 'projects.single.edit', params: { projectId: 12 }
    })
  })
})
