import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import DataTable from '@/components/project/explore/DataTable.vue'
import Project from '@/models/project'
import { entityKeys, entityKeysMap, PaperEntityTableColumn } from '@/models/paperEntities'

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
  const router = {
    push: jest.fn()
  }

  function getWrapper (type: string = 'record') {
    return shallowMount(DataTable, {
      i18n,
      propsData: {
        queryByType: type
      },
      mocks: {
        $store: store,
        $router: router,
        $route: {
          params: {
            projectId: 42,
            entityType: type
          }
        }
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

        it('navigates to an entity on row click', () => {
          wrapper.vm.handleRowClick(store.getters['paperEntities/entities'][0])

          expect(router.push).toHaveBeenCalledWith({
            name: 'projects.single.explore.view',
            params: {
              projectId: 42,
              entityType: entityKey,
              entityId: 1
            }
          })
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
        searchBy: [],
        search: ''
      })

      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 42,
        entityType: 'record',
        filterBy: undefined,
        perPage: 5,
        pageOffset: 1,
        filter: ''
      })
    })
    it('calculates the correct sort parameter string', () => {
      wrapper.vm.updateOptions({
        page: 2,
        itemsPerPage: 5,
        sortBy: ['authors'],
        sortDesc: [true],
        searchBy: [],
        search: ''
      })

      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 42,
        entityType: 'record',
        perPage: 5,
        pageOffset: 1,
        filterBy: undefined,
        filter: '',
        sortBy: 'authors_DESC'
      })

      wrapper.vm.updateOptions({
        page: 2,
        itemsPerPage: 5,
        sortBy: ['title'],
        sortDesc: [false],
        search: ''
      })

      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 42,
        entityType: 'record',
        perPage: 5,
        pageOffset: 1,
        filter: '',
        sortBy: 'title_ASC'
      })
    })
    it('prevents the reload data if the page options stays the same', () => {
      wrapper.vm.updateOptions({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        search: '',
        searchBy: []
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
      wrapper.vm.handleSearch('', '')

      expect(store.dispatch).not.toHaveBeenCalled()

      wrapper.vm.currentOptions.search = 'test'

      store.dispatch.mockClear()

      wrapper.vm.handleSearch('test', 'test')

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
      searchBy: [],
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

  it('provides a function to nicely display all authors names', () => {
    const wrapper = getWrapper()
    const item = {
      authors: [
        { firstName: 'Hans', lastName: 'Meier' },
        { firstName: 'Max', lastName: 'Dorfer' }
      ]
    }
    // @ts-ignore
    expect(wrapper.vm.getAuthorNames(item)).toEqual(['H. Meier', 'M. Dorfer'])
    // @ts-ignore
    expect(wrapper.vm.getAuthorNames({})).toEqual([])
  })

  it('provides a function to nicely display an authors name', () => {
    const wrapper = getWrapper()
    const author = { firstName: 'Hans', lastName: 'Meier' }
    // @ts-ignore
    expect(wrapper.vm.getAuthorDisplayName(author)).toEqual('H. Meier')
  })

  it('display no items if no headers are selected', () => {
    const backUp = entityKeysMap['record']
    // @ts-ignore
    Object.defineProperty(entityKeysMap, 'record', {
      value: {
        displayedColumns: []
      }
    })

    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
    // @ts-ignore
    expect(wrapper.vm.headers).toEqual([])
    // @ts-ignore
    expect(wrapper.vm.items).toEqual([])

    // @ts-ignore
    Object.defineProperty(entityKeysMap, 'record', {
      value: backUp
    })
  })

  it('provides the search options', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    const options = wrapper.vm.searchByOptions as Array<PaperEntityTableColumn>
    expect.assertions(options.length + 2)
    expect(options).toMatchSnapshot()
    expect(options).toEqual(expect.any(Array))
    options.forEach((option) => {
      expect(option.filterable).toBeTruthy()
    })
  })

  it('can render a title', () => {
    const wrapper = getWrapper()
    wrapper.setProps({
      title: 'This is my title'
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('This is my title')
  })
})
