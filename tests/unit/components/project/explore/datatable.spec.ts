import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import DataTable from '@/components/project/explore/DataTable.vue'
import Project from '@/models/project'
import { entityKeys } from '@/models/paperEntities'

jest.mock('debounce', () => {
  return {
    debounce: (fn: Function) => fn
  }
})

describe('components/project/explore/DataTable.vue', () => {
  const store = {
    getters: {
      'projects/activeProject': new Project({ id: 42, name: 'Awesome Project' }),
      'paperEntities/entities': [{ id: 1, title: 'First Record' }, { id: 2, title: 'Second Record' }],
      'paperEntities/entityCount': 12
    },
    dispatch: jest.fn()
  }

  function getWrapper (type: string = 'record') {
    return shallowMount(DataTable, {
      i18n,
      propsData: {
        queryByType: type
      },
      mocks: {
        $store: store
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('it renders the different entity types', () => {
    entityKeys.forEach((entityKey) => {
      describe(entityKey, () => {
        let wrapper: any
        beforeEach(() => {
          wrapper = getWrapper(entityKey)
        })
        it('renders the title', () => {
          const title = wrapper.find('h1')
          expect(title.exists()).toBeTruthy()
          expect(title.text()).toEqual('project.explore.title.query_by_type.' + entityKey)
        })

        it('renders the correct headers', () => {
          const headers = wrapper.vm.headers
          expect(headers.map((header: any) => ({
            text: header.text,
            value: header.value
          }))).toMatchSnapshot()
        })
      })
    })
  })

  describe('handles the reloading of the data', () => {
    let wrapper: any
    beforeEach(() => {
      wrapper = getWrapper()
      store.dispatch.mockClear()
    })
    it('reloads the data if the page options updates', () => {
      wrapper.vm.updateOptions({
        page: 2,
        itemsPerPage: 5,
        sortBy: [],
        sortDesc: [],
        search: ''
      })

      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 42,
        entityType: 'record',
        perPage: 5,
        pageOffset: 1,
        filter: ''
      })
    })
    it('prevents the reload data if the page options stays the same', () => {
      wrapper.vm.updateOptions({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        search: ''
      })

      expect(store.dispatch).not.toHaveBeenCalled()
    })

    it('reloads the data if the search updates', () => {
      wrapper.vm.currentOptions = {
        page: 2,
        itemsPerPage: 5,
        sortBy: [],
        sortDesc: [],
        search: ''
      }
      wrapper.vm.handleSearch('my test')

      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 42,
        entityType: 'record',
        perPage: 5,
        pageOffset: 0,
        filter: 'my test'
      })

      expect(wrapper.vm.currentOptions).toEqual({
        page: 1,
        itemsPerPage: 5,
        sortBy: [],
        sortDesc: [],
        search: 'my test'
      })
    })
    it('prevents the reload data if the search stays the same', () => {
      wrapper.vm.handleSearch('')

      expect(store.dispatch).not.toHaveBeenCalled()

      wrapper.vm.currentOptions.search = 'test'

      wrapper.vm.handleSearch('test')

      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })

  it('handles a change of the type', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.currentOptions = {
      page: 2,
      itemsPerPage: 5,
      sortBy: ['title'],
      sortDesc: [true],
      search: 'test'
    }

    // @ts-ignore
    wrapper.vm.updateQueryByType()
    // @ts-ignore
    expect(wrapper.vm.currentOptions).toEqual({
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: [],
      search: ''
    })
    expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
      projectId: 42,
      entityType: 'record',
      perPage: 10,
      pageOffset: 0,
      filter: ''
    })
  })
})
