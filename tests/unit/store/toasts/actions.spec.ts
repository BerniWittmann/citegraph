import { actions } from '@/store/modules/toasts/actions'
import * as mutationTypes from '@/store/modules/toasts/mutation-types'
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from '@/models/toast'

describe('store/modules/toasts/actions', () => {
  it('provides the actions', () => {
    expect(actions).toMatchSnapshot()
  })

  describe('showSuccess', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.showSuccess as Function
      action({ commit }, 'My message')
      expect(commit).toHaveBeenCalledWith(mutationTypes.ADD_TOAST, expect.any(SuccessToast))
      const toast = commit.mock.calls[0][1]
      expect(toast.text).toEqual('My message')
      expect(toast.severity).toEqual('success')
    })
  })

  describe('showInfo', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.showInfo as Function
      action({ commit }, 'My message')
      expect(commit).toHaveBeenCalledWith(mutationTypes.ADD_TOAST, expect.any(InfoToast))
      const toast = commit.mock.calls[0][1]
      expect(toast.text).toEqual('My message')
      expect(toast.severity).toEqual('info')
    })
  })

  describe('showWarning', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.showWarning as Function
      action({ commit }, 'My message')
      expect(commit).toHaveBeenCalledWith(mutationTypes.ADD_TOAST, expect.any(WarningToast))
      const toast = commit.mock.calls[0][1]
      expect(toast.text).toEqual('My message')
      expect(toast.severity).toEqual('warning')
    })
  })

  describe('showError', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.showError as Function
      action({ commit }, 'My message')
      expect(commit).toHaveBeenCalledWith(mutationTypes.ADD_TOAST, expect.any(ErrorToast))
      const toast = commit.mock.calls[0][1]
      expect(toast.text).toEqual('My message')
      expect(toast.severity).toEqual('error')
    })
  })

  describe('removeToast', () => {
    it('triggers the mutation', () => {
      const commit = jest.fn()
      const action = actions.removeToast as Function
      const toast = new SuccessToast('My message')
      action({ commit }, toast)
      expect(commit).toHaveBeenCalledWith(mutationTypes.REMOVE_TOAST, toast)
    })
  })
})
