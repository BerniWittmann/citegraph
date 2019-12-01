import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../../setupPlugins'

import RecordViewPage from '@/components/project/explore/view/Record.vue'
import EmptySlotComponent from '../../../../EmptySlotComponent.vue'
import Record from '@/models/paperEntities/record'
import Author from '@/models/paperEntities/author'

describe('components/project/explore/view/Record.vue', () => {
  function getWrapper () {
    return shallowMount(RecordViewPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'paperEntities/activeEntity': new Record({
              id: '1',
              title: 'My awesome Paper',
              authors: [
                new Author({ id: '1', firstName: 'Max', lastName: 'Mustermann', countRecords: 12 }),
                new Author({ id: '2', firstName: 'Other', lastName: 'Author', countRecords: 13 })
              ],
              keywords: ['first', 'of', 'my', 'keywords'],
              numberCitations: 24,
              year: 2016
            })
          }
        },
        $route: {
          params: {
            projectId: 42,
            entityType: 'record',
            entityId: 1
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
})
