import moxios from 'moxios'
import { actions } from '@/store/modules/database/actions'

describe('store/modules/database/actions', () => {
  it('provides the actions', () => {
    expect(actions).toMatchSnapshot()
  })

  describe('clearDatabase', () => {
    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('clears a the database', (done) => {
      moxios.stubRequest('/database/clear', {
        status: 200
      })

      const onFulfilled = jest.fn()
      const dispatch = jest.fn()
      const action = actions.clearDatabase as Function

      action({ dispatch }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(onFulfilled).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'settings.database.clear.success', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the clearing', (done) => {
      moxios.stubRequest('/database/clear', {
        status: 500,
        response: 'Somehow it failed'
      })

      const onFulfilled = jest.fn()
      const dispatch = jest.fn()
      const action = actions.clearDatabase as Function

      action({ dispatch }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'settings.database.clear.error', { root: true })
        done()
      })
    })
  })

  describe('reseedDatabase', () => {
    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    it('reseeds a the database', (done) => {
      moxios.stubRequest('/database/reseed', {
        status: 200
      })

      const onFulfilled = jest.fn()
      const dispatch = jest.fn()
      const action = actions.reseedDatabase as Function

      action({ dispatch }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalled()
        expect(onFulfilled).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith('toasts/showSuccess', 'settings.database.reseed.success', { root: true })
        done()
      })
    })

    it('handles the error when one appeared during the reseeding', (done) => {
      moxios.stubRequest('/database/reseed', {
        status: 500,
        response: 'Somehow it failed'
      })

      const onFulfilled = jest.fn()
      const dispatch = jest.fn()
      const action = actions.reseedDatabase as Function

      action({ dispatch }).then(onFulfilled)

      moxios.wait(() => {
        expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 500'))
        expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'settings.database.reseed.error', { root: true })
        done()
      })
    })
  })
})
