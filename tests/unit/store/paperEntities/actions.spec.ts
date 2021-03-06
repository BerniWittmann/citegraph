import moxios from 'moxios'
import { actions } from '@/store/modules/paperEntities/actions'
import { entityKeys, entityKeysMap } from '@/models/paperEntities'

function createDataWithId (id: number) {
  return {
    id: id.toString(),
    title: 'My title',
    authors: [{ id: '12', firstName: 'Author', lastName: 'LastName', countRecords: 12 }],
    keywords: ['my', 'keywords'],
    year: 2017,
    numberCitations: 12,
    firstName: 'Hans',
    lastName: 'Maier',
    countRecords: 12,
    name: 'Institution or CountryName'
  }
}
const keys: Array<string> = entityKeys

describe('store/modules/paperEntities/actions', () => {
  it('provides the actions', () => {
    expect(actions).toMatchSnapshot()
  })

  describe('fetchEntities', () => {
    const projectId = 42
    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    keys.forEach((entityKey: string) => {
      describe('can fetch the entity type ' + entityKey, () => {
        const EntityClass = entityKeysMap[entityKey]
        const data = [
          new EntityClass(createDataWithId(1)),
          new EntityClass(createDataWithId(12))
        ]

        it('fetches the entities', (done) => {
          moxios.stubRequest(`/projects/${projectId}/paper-entities`, {
            status: 200,
            response: {
              data: {
                [EntityClass.queryName]: {
                  count: 23,
                  [EntityClass.schemaName]: EntityClass.transformer.sendCollection(data)
                }
              }
            }
          })

          const onFulfilled = jest.fn()
          const commit = jest.fn()
          const dispatch = jest.fn()
          const action = actions.fetchEntities as Function

          action({ commit, dispatch }, {
            projectId,
            entityType: entityKey,
            perPage: 10,
            pageOffset: 1,
            filter: 'my filter',
            sortBy: 'title_ASC'
          }).then(onFulfilled)

          moxios.wait(() => {
            expect(onFulfilled).toHaveBeenCalledWith(undefined)
            // @ts-ignore
            const request = moxios.requests.mostRecent()
            expect(request.config.data).toMatchSnapshot()
            expect(request.config.data).toContain('filter: my filter')
            expect(request.config.data).toContain('orderBy: title_ASC')
            expect(request.config.data).toContain('first: 10')
            expect(request.config.data).toContain('skip: 10')
            expect(commit).toHaveBeenCalledWith('SET_ENTITIES', data)
            expect(commit).toHaveBeenCalledWith('SET_ENTITY_TYPE', entityKey)
            expect(commit).toHaveBeenCalledWith('SET_ENTITY_COUNT', 23)
            done()
          })
        })

        it('handles the error when one appeared during the fetching', (done) => {
          moxios.stubRequest(`/projects/${projectId}/paper-entities`, {
            status: 400,
            response: 'The given query is invalid'
          })

          const onFulfilled = jest.fn()
          const commit = jest.fn()
          const dispatch = jest.fn()
          const action = actions.fetchEntities as Function

          action({ commit, dispatch }, {
            projectId,
            entityType: entityKey,
            perPage: 10,
            pageOffset: 1,
            filter: 'my filter',
            sortBy: 'title_ASC'
          }).then(onFulfilled)

          moxios.wait(() => {
            expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 400'))
            expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'project.explore.fetch_error', { root: true })
            expect(commit).toHaveBeenCalledWith('SET_ENTITIES', [])
            expect(commit).toHaveBeenCalledWith('SET_ENTITY_TYPE', undefined)
            expect(commit).toHaveBeenCalledWith('SET_ENTITY_COUNT', -1)
            done()
          })
        })
      })
    })
  })

  describe('fetchEntity', () => {
    const projectId = 42
    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    keys.forEach((entityKey) => {
      describe('can fetch the entity type ' + entityKey, () => {
        const EntityClass = entityKeysMap[entityKey]
        const data = new EntityClass(createDataWithId(1))

        it('fetches the entity', (done) => {
          moxios.stubRequest(`/projects/${projectId}/paper-entities`, {
            status: 200,
            response: {
              data: {
                [EntityClass.queryName]: {
                  count: 1,
                  [EntityClass.schemaName]: EntityClass.transformer.send(data)
                }
              }
            }
          })

          const onFulfilled = jest.fn()
          const commit = jest.fn()
          const dispatch = jest.fn()
          const action = actions.fetchEntity as Function

          action({ commit, dispatch }, {
            projectId,
            entityType: entityKey,
            id: 1
          }).then(onFulfilled)

          moxios.wait(() => {
            expect(onFulfilled).toHaveBeenCalledWith(undefined)
            // @ts-ignore
            const request = moxios.requests.mostRecent()
            expect(request.config.data).toMatchSnapshot()
            expect(request.config.data).toContain('id: 1')
            expect(commit).toHaveBeenCalledWith('SET_ACTIVE_ENTITY', data)
            done()
          })
        })

        it('handles the error when one appeared during the fetching', (done) => {
          moxios.stubRequest(`/projects/${projectId}/paper-entities`, {
            status: 400,
            response: 'The given query is invalid'
          })

          const onFulfilled = jest.fn()
          const commit = jest.fn()
          const dispatch = jest.fn()
          const action = actions.fetchEntity as Function

          action({ commit, dispatch }, {
            projectId,
            entityType: entityKey,
            id: 1
          }).then(onFulfilled)

          moxios.wait(() => {
            expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 400'))
            expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'project.explore.fetch_single_error', { root: true })
            expect(commit).toHaveBeenCalledWith('SET_ACTIVE_ENTITY', undefined)
            done()
          })
        })
      })
    })
  })

  describe('updateEntity', () => {
    const projectId = 42
    beforeEach(() => {
      moxios.install()
    })
    afterEach(() => {
      moxios.uninstall()
    })
    keys.forEach((entityKey) => {
      describe('can update the entity type ' + entityKey, () => {
        const EntityClass = entityKeysMap[entityKey]
        const data = new EntityClass(createDataWithId(1))

        it('updates the entity', (done) => {
          moxios.stubRequest(`/projects/${projectId}/paper-entities`, {
            status: 200,
            response: {
              data: {
                [EntityClass.queryName]: EntityClass.transformer.send(data)
              }
            }
          })

          const onFulfilled = jest.fn()
          const commit = jest.fn()
          const dispatch = jest.fn()
          const action = actions.updateEntity as Function

          action({ commit, dispatch }, {
            params: {
              projectId,
              entityType: entityKey,
              id: 1
            },
            data: {
              ...data,
              additionalData: 'bar'
            }
          }).then(onFulfilled)

          moxios.wait(() => {
            expect(onFulfilled).toHaveBeenCalledWith(undefined)
            // @ts-ignore
            const request = moxios.requests.mostRecent()
            expect(request.config.data).toMatchSnapshot()
            expect(commit).toHaveBeenCalledWith('UPDATE_ENTITY', data)
            done()
          })
        })

        it('handles the error when one appeared during the update', (done) => {
          moxios.stubRequest(`/projects/${projectId}/paper-entities`, {
            status: 400,
            response: 'The given query is invalid'
          })

          const onFulfilled = jest.fn()
          const commit = jest.fn()
          const dispatch = jest.fn()
          const action = actions.updateEntity as Function

          action({ commit, dispatch }, {
            params: {
              projectId,
              entityType: entityKey,
              id: 1
            },
            data: {
              name: 'New Data',
              entityType: entityKey
            }
          }).then(onFulfilled)

          moxios.wait(() => {
            expect(onFulfilled).toHaveBeenCalledWith(new Error('Request failed with status code 400'))
            expect(dispatch).toHaveBeenCalledWith('toasts/showError', 'project.explore.update_single_error', { root: true })
            expect(commit).not.toHaveBeenCalledWith('UPDATE_ENTITY')
            done()
          })
        })
      })
    })
  })
})
