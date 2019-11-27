import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ProjectWrapperPage from '@/pages/project/ProjectWrapper.vue'

describe('pages/ProjectWrapper.vue', () => {
  it('renders the page', () => {
    const wrapper = shallowMount(ProjectWrapperPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/hasActiveProject': true
          }
        }
      },
      stubs: {
        'router-view': '<div class="router-view"></div>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.router-view')).toBeTruthy()
    expect(wrapper.contains('v-alert-stub')).toBeFalsy()
    expect(wrapper.contains('v-btn-stub')).toBeFalsy()
  })

  it('displays an error if project is not available', () => {
    const wrapper = shallowMount(ProjectWrapperPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/hasActiveProject': false
          }
        }
      },
      stubs: {
        'router-view': '<div class="router-view"></div>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.router-view')).toBeFalsy()
    const alert = wrapper.find('v-alert-stub')
    expect(alert.exists()).toBeTruthy()
    expect(alert.text()).toEqual('project.not_available.text')
    const backButton = wrapper.find('v-btn-stub')
    expect(backButton.exists()).toBeTruthy()
    expect(backButton.props('to')).toEqual({ name: 'projects' })
  })
})
