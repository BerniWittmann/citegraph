import VueRouter from 'vue-router'
import store from '@/plugins/store'
import setupNavigationGuards from '@/router/navigationGuards'

jest.mock('@/plugins/store', () => ({
  dispatch: jest.fn()
}))

describe('router/navigationGuards', () => {
  beforeEach(() => {
    // @ts-ignore
    store.dispatch.mockClear()
  })
  it('provides a setup function', () => {
    expect(setupNavigationGuards).toEqual(expect.any(Function))
  })

  it('sets up the beforeEach navigation guard', () => {
    const router = new VueRouter()
    router.beforeEach = jest.fn()

    setupNavigationGuards(router)
    expect(router.beforeEach).toHaveBeenCalledWith(expect.any(Function))
  })

  it('sets up the afterEach navigation guard', () => {
    const router = new VueRouter()
    router.afterEach = jest.fn()

    setupNavigationGuards(router)
    expect(router.afterEach).toHaveBeenCalledWith(expect.any(Function))
  })

  describe('handles the project loading in beforeEnter', () => {
    let handler: Function
    beforeEach(() => {
      const router = new VueRouter()
      router.beforeEach = jest.fn()

      setupNavigationGuards(router)
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
          name: 'projects.base'
        }, {
          name: 'projects.single',
          params: {
            projectId: 12
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

      setupNavigationGuards(router)
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
