import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import ExplorePage from '@/pages/project/Explore.vue'
import Project from '@/models/project'
import DataTable from '@/components/project/explore/DataTable.vue'

describe('pages/project/Explore.vue', () => {
  function getWrapper () {
    return shallowMount(ExplorePage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/activeProject': new Project({ id: 12, name: 'My awesome Project' })
          }
        },
        $route: {
          params: {
            queryByType: 'record'
          }
        }
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the table', () => {
    const wrapper = getWrapper()
    const table = wrapper.find(DataTable)
    expect(table.exists()).toBeTruthy()
    expect(table.props('queryByType')).toEqual('record')
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

        it('thows an error if the entity key is invalid', () => {
          expect(handler({ params: { queryByType: 'invalid' } }, {}, next))
          expect(next).toHaveBeenCalledWith(new Error('project.explore.query_by_type_invalid'))
        })
      })
    })
  })
})
