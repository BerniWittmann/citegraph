import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ToastsContainer from '@/components/ToastsContainer.vue'
import { ErrorToast, SuccessToast } from '@/models/toast'
import ToastComponent from '@/components/Toast.vue'

describe('components/ToastsContaienr.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(ToastsContainer, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'toasts/toasts': [
              new SuccessToast('Test Message'),
              new ErrorToast('This is an error')
            ]
          }
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the toasts', () => {
    const wrapper = shallowMount(ToastsContainer, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'toasts/toasts': [
              new SuccessToast('Test Message'),
              new ErrorToast('This is an error')
            ]
          }
        }
      }
    })
    const toasts = wrapper.findAll(ToastComponent)
    expect(toasts.length).toEqual(2)
  })

  it('handles an empty array of toasts', () => {
    const wrapper = shallowMount(ToastsContainer, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'toasts/toasts': []
          }
        }
      }
    })
    const toasts = wrapper.findAll(ToastComponent)
    expect(toasts.length).toEqual(0)
  })
})
