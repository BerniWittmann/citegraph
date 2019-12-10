import routes from '@/router'
import { getRouteConfigByName, getRouteConfigByPath } from '../testHelpers'
import store from '@/plugins/store'

jest.mock('@/plugins/store', () => ({
  dispatch: jest.fn().mockReturnValue({
    then: (cb: Function) => cb()
  })
}))

describe('router/index', () => {
  it('returns an array of routes', () => {
    expect(Array.isArray(routes)).toBeTruthy()
  })

  it('fetches the projects on the projects page', () => {
    const route = getRouteConfigByName('projects')!
    expect(route).not.toBeUndefined()
    expect(route.name).toEqual('projects')
    expect(route.beforeEnter).toEqual(expect.any(Function))
    const next = jest.fn()
    const navigationGuard = route.beforeEnter as Function

    navigationGuard({}, {}, next)

    expect(store.dispatch).toHaveBeenCalledWith('projects/fetchProjects')
    expect(next).toHaveBeenCalled()
  })

  it('fetches the visualizations on the visualizations page', () => {
    const route = getRouteConfigByPath('visualizations')!
    expect(route).not.toBeUndefined()
    expect(route.beforeEnter).toEqual(expect.any(Function))
    const next = jest.fn()
    const navigationGuard = route.beforeEnter as Function

    navigationGuard({ params: { projectId: 42 } }, {}, next)

    expect(store.dispatch).toHaveBeenCalledWith('visualizations/fetchVisualizations', 42)
    expect(next).toHaveBeenCalled()
  })

  it('shows an error message on the catch all route', async () => {
    const route = routes[routes.length - 1]
    expect(route.path).toEqual('*')
    expect(route.beforeEnter).toEqual(expect.any(Function))
    const next = jest.fn()
    const navigationGuard = route.beforeEnter as Function

    await navigationGuard({}, {}, next)

    expect(store.dispatch).toHaveBeenCalledWith('toasts/showError', 'route_not_found')
    expect(next).toHaveBeenCalledWith('/')
  })
})
