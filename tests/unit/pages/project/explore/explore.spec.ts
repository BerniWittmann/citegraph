import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ExplorePage from '@/pages/project/explore/Explore.vue'
import DataTable from '@/components/project/explore/DataTable.vue'

describe('pages/project/Explore.vue', () => {
  function getWrapper () {
    return shallowMount(ExplorePage, {
      i18n,
      mocks: {
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
})
