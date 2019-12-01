import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ExploreWrapperPage from '@/pages/project/explore/ExploreWrapper.vue'

describe('pages/project/ExploreWrapper.vue', () => {
  function getWrapper () {
    return shallowMount(ExploreWrapperPage, {
      i18n,
      mocks: {
        $route: {
          params: {
            queryByType: 'record'
          }
        }
      },
      stubs: {
        'router-view': '<div class="router-view"></div>'
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('it validates the query by type', () => {
    const guards = ['beforeRouteEnter', 'beforeRouteUpdate']
    guards.forEach((guardName) => {
      describe('it checks the query by type on ' + guardName, () => {
        let handler: Function
        let next: Function
        beforeEach(() => {
          const wrapper = getWrapper()
          // @ts-ignore
          handler = wrapper.vm[guardName]
          next = jest.fn()
        })
        it('passes if the entity key is valid', () => {
          expect(handler({ params: { queryByType: 'record' } }, {}, next))
          expect(next).toHaveBeenCalledWith()
        })

        it('throws an error if the entity key is invalid', () => {
          expect(handler({ params: { queryByType: 'invalid' } }, {}, next))
          expect(next).toHaveBeenCalledWith(new Error('project.explore.query_by_type_invalid'))
        })
      })
    })
  })
})
