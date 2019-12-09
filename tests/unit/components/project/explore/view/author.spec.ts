import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../../setupPlugins'

import AuthorViewPage from '@/components/project/explore/view/Author.vue'
import EmptySlotComponent from '../../../../EmptySlotComponent.vue'
import Author from '@/models/paperEntities/author'

describe('components/project/explore/view/Author.vue', () => {
  function getWrapper () {
    return shallowMount(AuthorViewPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'paperEntities/activeEntity': new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 })
          }
        }
      },
      stubs: {
        layout: EmptySlotComponent
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the name', () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain('Max Mustermann')
  })

  it('renders a data table for the records', () => {
    const wrapper = getWrapper()
    const table = wrapper.find('data-table-stub')
    expect(table.exists()).toBeTruthy()
    expect(table.props()).toEqual({
      belongsTo: '1',
      belongsToType: 'author',
      queryByType: 'record'
    })
  })
})
