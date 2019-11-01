import routes from '@/router'

describe('router/index', () => {
  it('returns an array of routes', () => {
    expect(Array.isArray(routes)).toBeTruthy()
  })
})
