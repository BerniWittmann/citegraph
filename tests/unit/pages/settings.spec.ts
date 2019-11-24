import { mount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import SettingsPage from '@/pages/Settings.vue'

describe('pages/Settings.vue', () => {
  it('renders the page', () => {
    const wrapper = mount(SettingsPage, {
      i18n
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can clear the database', () => {
    const dispatch = jest.fn()
    const wrapper = mount(SettingsPage, {
      i18n,
      mocks: {
        $store: {
          dispatch
        }
      }
    })
    const button = wrapper.findAll('.v-btn').at(0)
    expect(button.exists()).toBeTruthy()
    button.trigger('click')
    expect(dispatch).toHaveBeenCalledWith('database/clearDatabase')
  })

  it('can reseed the database', () => {
    const dispatch = jest.fn()
    const wrapper = mount(SettingsPage, {
      i18n,
      mocks: {
        $store: {
          dispatch
        }
      }
    })
    const button = wrapper.findAll('.v-btn').at(1)
    expect(button.exists()).toBeTruthy()
    button.trigger('click')
    expect(dispatch).toHaveBeenCalledWith('database/reseedDatabase')
  })
})
