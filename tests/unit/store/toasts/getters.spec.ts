import { getters } from '@/store/modules/toasts/getters'
import { ErrorToast, InfoToast, SuccessToast } from '@/models/toast'

describe('store/modules/toasts/getters', () => {
  it('provides the getters', () => {
    expect(getters).toMatchSnapshot()
  })

  describe('toasts', () => {
    it('returns the stored toasts', () => {
      const state = {
        toasts: [
          new SuccessToast('Success'),
          new ErrorToast('Error'),
          new InfoToast('My Info')
        ]
      }
      const getter = getters.toasts as Function

      expect(getter(state)).toEqual(state.toasts)
    })

    it('returns empty array if no toasts are available', () => {
      const state = {
        toasts: []
      }
      const getter = getters.toasts as Function

      expect(getter(state)).toEqual([])
    })
  })
})
