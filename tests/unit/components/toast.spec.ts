import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ToastComponent from '@/components/Toast.vue'
import Toast, { ErrorToast, InfoToast, SuccessToast, WarningToast } from '@/models/toast'

describe('components/Toast.vue', () => {
  const toasts : Array<Toast> = [
    new SuccessToast('My message'),
    new InfoToast('My message'),
    new WarningToast('My message'),
    new ErrorToast('My message')
  ]
  for (let toast of toasts) {
    describe('the toast is of type ' + toast.severity, () => {
      it('renders', () => {
        const wrapper = shallowMount(ToastComponent, {
          i18n,
          propsData: {
            toast
          }
        })
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('renders the message', () => {
        const wrapper = shallowMount(ToastComponent, {
          i18n,
          propsData: {
            toast
          }
        })
        expect(wrapper.text()).toContain('My message')
      })

      it('shows the toast on mount', () => {
        const wrapper = shallowMount(ToastComponent, {
          i18n,
          propsData: {
            toast
          }
        })
        // @ts-ignore
        expect(wrapper.vm.visible).toBeTruthy()
      })

      it('can close the toast', () => {
        const dispatch = jest.fn()
        const wrapper = shallowMount(ToastComponent, {
          i18n,
          propsData: {
            toast
          },
          mocks: {
            $store: {
              dispatch
            }
          }
        })
        const btn = wrapper.find('v-btn-stub')
        expect(btn.exists()).toBeTruthy()

        // @ts-ignore
        wrapper.vm.close()

        // @ts-ignore
        expect(wrapper.vm.visible).toBeFalsy()
        expect(dispatch).toHaveBeenCalledWith('toasts/removeToast', toast)
      })
    })
  }
})
