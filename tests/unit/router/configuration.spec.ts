import VueRouter from 'vue-router'
import store from '@/plugins/store'
import setupConfiguration from '@/router/configuration'

jest.mock('@/plugins/store', () => ({
  dispatch: jest.fn()
}))

describe('router/configuration', () => {
  beforeEach(() => {
    // @ts-ignore
    store.dispatch.mockClear()
  })
  it('provides a setup function', () => {
    expect(setupConfiguration).toEqual(expect.any(Function))
  })

  it('sets up the beforeEach navigation guard', () => {
    const router = new VueRouter()
    router.beforeEach = jest.fn()

    setupConfiguration(router)
    expect(router.beforeEach).toHaveBeenCalledWith(expect.any(Function))
  })

  it('sets up the afterEach navigation guard', () => {
    const router = new VueRouter()
    router.afterEach = jest.fn()

    setupConfiguration(router)
    expect(router.afterEach).toHaveBeenCalledWith(expect.any(Function))
  })

  it('sets up an on error handler', async () => {
    const router = new VueRouter()
    router.onError = jest.fn()

    setupConfiguration(router)
    expect(router.onError).toHaveBeenCalledWith(expect.any(Function))
    // @ts-ignore
    const handler = router.onError.mock.calls[0][0] as Function
    await handler(new Error('Something failed'))
    expect(store.dispatch).toHaveBeenCalledWith('toasts/showError', 'Something failed')
  })

  describe('handles the project loading in beforeEnter', () => {
    let handler: Function
    beforeEach(() => {
      const router = new VueRouter()
      router.beforeEach = jest.fn()

      setupConfiguration(router)
      // @ts-ignore
      handler = router.beforeEach.mock.calls[0][0]
    })
    it('loads the project on project pages', async () => {
      const to = {
        name: 'projects.single',
        matched: [{
          name: 'projects.single',
          params: {
            projectId: 12
          },
          meta: {
            isSingleProjectPage: true
          }
        }],
        params: {
          projectId: 12
        }
      }
      const from = {
        name: 'home'
      }
      const next = jest.fn()
      await handler(to, from, next)
      expect(store.dispatch).toHaveBeenCalledWith('projects/fetchProject', 12)
      expect(next).toHaveBeenCalledWith()
    })

    it('loads the project on nested project pages', async () => {
      const to = {
        name: 'projects.detail',
        matched: [{
          name: 'projects.base',
          meta: {}
        }, {
          name: 'projects.single',
          params: {
            projectId: 12
          },
          meta: {
            isSingleProjectPage: true
          }
        }],
        params: {
          projectId: 12
        }
      }
      const from = {
        name: 'home'
      }
      const next = jest.fn()
      await handler(to, from, next)
      expect(store.dispatch).toHaveBeenCalledWith('projects/fetchProject', 12)
      expect(next).toHaveBeenCalledWith()
    })

    it('does not load the project on other pages', async () => {
      const to = {
        name: 'about',
        matched: []
      }
      const from = {
        name: 'home'
      }
      const next = jest.fn()
      await handler(to, from, next)
      expect(store.dispatch).not.toHaveBeenCalledWith('projects/fetchProject', expect.any(Number))
      expect(next).toHaveBeenCalledWith()
    })
  })

  describe('handles the project unloading in afterEach', () => {
    let handler: Function
    beforeEach(() => {
      const router = new VueRouter()
      router.afterEach = jest.fn()

      setupConfiguration(router)
      // @ts-ignore
      handler = router.afterEach.mock.calls[0][0]
    })
    it('unloads the project on non project pages', async () => {
      const to = {
        name: 'about',
        matched: []
      }
      const from = {
        name: 'home'
      }
      await handler(to, from)
      expect(store.dispatch).toHaveBeenCalledWith('projects/unsetActiveProject')
    })
    it('does not unload the project on project pages', async () => {
      const to = {
        name: 'projects.single',
        matched: [{
          name: 'projects.single',
          params: {
            projectId: 12
          },
          meta: {
            isSingleProjectPage: true
          }
        }],
        params: {
          projectId: 12
        }
      }
      const from = {
        name: 'home'
      }
      await handler(to, from)
      expect(store.dispatch).not.toHaveBeenCalledWith('projects/unsetActiveProject')
    })
  })
})
