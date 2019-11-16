import * as helpers from '@/common/helpers'

describe('common/helpers', () => {
  describe('isProjectRoute', () => {
    it('returns true if the route is a project page', () => {
      const route = {
        name: 'projects.single',
        matched: [{
          name: 'projects.single'
        }]
      }
      // @ts-ignore
      expect(helpers.isProjectRoute(route)).toBeTruthy()
    })

    it('returns true if the route is a child of project page', () => {
      const route = {
        name: 'projects.another',
        matched: [{
          name: 'projects.another'
        }, {
          name: 'projects.other'
        }, {
          name: 'projects.single'
        }]
      }
      // @ts-ignore
      expect(helpers.isProjectRoute(route)).toBeTruthy()
    })

    it('returns false if the route is not a child of project page', () => {
      const route = {
        name: 'about',
        matched: [{
          name: 'home'
        }, {
          name: 'about'
        }, {
          name: 'other'
        }]
      }
      // @ts-ignore
      expect(helpers.isProjectRoute(route)).toBeFalsy()
    })

    it('returns false for an empty route', () => {
      const route = {
        name: undefined,
        matched: []
      }
      // @ts-ignore
      expect(helpers.isProjectRoute(route)).toBeFalsy()
    })
  })
})
