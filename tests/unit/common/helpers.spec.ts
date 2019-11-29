import * as helpers from '@/common/helpers'

describe('common/helpers', () => {
  describe('isProjectRoute', () => {
    it('returns true if the route is a project page', () => {
      const route = {
        name: 'projects.single',
        matched: [{
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }]
      }
      // @ts-ignore
      expect(helpers.isProjectRoute(route)).toBeTruthy()
    })

    it('returns true if the route is a child of project page', () => {
      const route = {
        name: 'projects.another',
        matched: [{
          name: 'projects.another',
          meta: {}
        }, {
          name: 'projects.other',
          meta: {}
        }, {
          name: 'projects.single',
          meta: {
            isSingleProjectPage: true
          }
        }]
      }
      // @ts-ignore
      expect(helpers.isProjectRoute(route)).toBeTruthy()
    })

    it('returns false if the route is not a child of project page', () => {
      const route = {
        name: 'about',
        matched: [{
          name: 'home',
          meta: {}
        }, {
          name: 'about',
          meta: {}
        }, {
          name: 'other',
          meta: {
            isSingleProjectPage: false
          }
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

  describe('isExploreRoute', () => {
    it('returns true if the route is an explore page', () => {
      const route = {
        name: 'projects.single',
        matched: [{
          name: 'projects.single',
          meta: {
            isExplorePage: true
          }
        }]
      }
      // @ts-ignore
      expect(helpers.isExploreRoute(route)).toBeTruthy()
    })

    it('returns true if the route is a child of explore page', () => {
      const route = {
        name: 'projects.another',
        matched: [{
          name: 'projects.another',
          meta: {}
        }, {
          name: 'projects.other',
          meta: {}
        }, {
          name: 'projects.single',
          meta: {
            isExplorePage: true
          }
        }]
      }
      // @ts-ignore
      expect(helpers.isExploreRoute(route)).toBeTruthy()
    })

    it('returns false if the route is not a child of explore page', () => {
      const route = {
        name: 'about',
        matched: [{
          name: 'home',
          meta: {}
        }, {
          name: 'about',
          meta: {}
        }, {
          name: 'other',
          meta: {
            isExplorePage: false
          }
        }]
      }
      // @ts-ignore
      expect(helpers.isExploreRoute(route)).toBeFalsy()
    })

    it('returns false for an empty route', () => {
      const route = {
        name: undefined,
        matched: []
      }
      // @ts-ignore
      expect(helpers.isExploreRoute(route)).toBeFalsy()
    })
  })
})
