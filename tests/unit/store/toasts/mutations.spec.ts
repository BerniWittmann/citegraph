import { mutations } from '@/store/modules/toasts/mutations'
import * as mutationTypes from '@/store/modules/toasts/mutation-types'
import { ToastsState } from '@/store/modules/toasts/types'
import { ErrorToast, SuccessToast, WarningToast } from '@/models/toast'

describe('store/modules/toasts/mutations', () => {
  it('provides the mutations', () => {
    expect(mutations).toMatchSnapshot()
  })

  describe('REMOVE_TOAST', () => {
    it('removes a toast from open toasts', () => {
      const state: ToastsState = {
        toasts: [
          new SuccessToast('Success'),
          new WarningToast('Warning'),
          new SuccessToast('Other')
        ]
      }
      const toast = state.toasts[1]

      mutations[mutationTypes.REMOVE_TOAST](state, toast)

      expect(state.toasts).not.toContainEqual(toast)
      expect(state.toasts.length).toEqual(2)
    })

    it('removes all instances of a toasts from the toasts', () => {
      const state: ToastsState = {
        toasts: [
          new SuccessToast('Success'),
          new WarningToast('Warning'),
          new SuccessToast('Other')
        ]
      }
      const toast = state.toasts[1]
      state.toasts.push(toast)

      mutations[mutationTypes.REMOVE_TOAST](state, toast)

      expect(state.toasts).not.toContainEqual(toast)
      expect(state.toasts.length).toEqual(2)
    })

    it('does not change toasts if toast was not found', () => {
      const state: ToastsState = {
        toasts: [
          new SuccessToast('Success'),
          new WarningToast('Warning'),
          new SuccessToast('Other')
        ]
      }
      const toast = new ErrorToast('Error')

      mutations[mutationTypes.REMOVE_TOAST](state, toast)

      expect(state.toasts).not.toContainEqual(toast)
      expect(state.toasts.length).toEqual(3)
    })

    it('can handle an empty open toasts array', () => {
      const state: ToastsState = {
        toasts: []
      }
      const toast = new ErrorToast('Error')

      mutations[mutationTypes.REMOVE_TOAST](state, toast)

      expect(state.toasts.length).toEqual(0)
    })
  })

  describe('ADD_TOAST', () => {
    it('adds a toast to the store', () => {
      const state: ToastsState = {
        toasts: [
          new SuccessToast('Success'),
          new WarningToast('Warning'),
          new SuccessToast('Other')
        ]
      }
      const toast = new ErrorToast('Error')

      mutations[mutationTypes.ADD_TOAST](state, toast)

      expect(state.toasts.length).toEqual(4)
      expect(state.toasts).toContain(toast)
    })

    it('can add a project to an empty store', () => {
      const state: ToastsState = {
        toasts: []
      }
      const toast = new ErrorToast('Error')

      mutations[mutationTypes.ADD_TOAST](state, toast)

      expect(state.toasts.length).toEqual(1)
      expect(state.toasts).toContain(toast)
    })
  })
})
