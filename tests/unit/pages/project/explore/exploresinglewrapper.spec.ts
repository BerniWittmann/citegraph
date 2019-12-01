import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'
import store from '@/plugins/store'

import ExploreSingleWrapperPage from '@/pages/project/explore/ExploreSingleWrapper.vue'

jest.mock('@/plugins/store', () => ({
  dispatch: jest.fn()
}))

describe('pages/ExploreSingleWrapper.vue', () => {
  const router = {
    back: jest.fn()
  }
  it('renders the page', () => {
    const wrapper = shallowMount(ExploreSingleWrapperPage, {
      i18n,
      mocks: {
        $router: router,
        $store: {
          getters: {
            'paperEntities/hasActiveEntity': true
          }
        }
      },
      stubs: {
        'router-view': '<div class="router-view"></div>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.router-view')).toBeTruthy()
    expect(wrapper.contains('v-alert-stub')).toBeFalsy()
    expect(wrapper.contains('v-btn-stub')).toBeFalsy()
  })

  it('displays an error if paper entity is not available', () => {
    const wrapper = shallowMount(ExploreSingleWrapperPage, {
      i18n,
      mocks: {
        $router: router,
        $store: {
          getters: {
            'paperEntities/hasActiveEntity': false
          }
        }
      },
      stubs: {
        'router-view': '<div class="router-view"></div>'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.router-view')).toBeFalsy()
    const alert = wrapper.find('v-alert-stub')
    expect(alert.exists()).toBeTruthy()
    expect(alert.text()).toEqual('project.explore.entity_not_available.text')
    const backButton = wrapper.find('v-btn-stub')
    expect(backButton.exists()).toBeTruthy()
    backButton.vm.$emit('click')
    expect(router.back).toHaveBeenCalled()
  })

  describe('it loads the entity in the navigation guards', () => {
    const guards = ['beforeRouteEnter', 'beforeRouteUpdate']
    guards.forEach((guardName) => {
      describe('it checks the query by type on ' + guardName, () => {
        let handler: Function
        let next: Function
        beforeEach(() => {
          const wrapper = shallowMount(ExploreSingleWrapperPage, {
            i18n,
            mocks: {
              $router: router,
              $store: {
                getters: {
                  'paperEntities/hasActiveEntity': true
                }
              }
            },
            stubs: {
              'router-view': '<div class="router-view"></div>'
            }
          })
          // @ts-ignore
          handler = wrapper.vm[guardName]
          next = jest.fn()
        })
        it('fetches the entity', async () => {
          // @ts-ignore
          store.dispatch.mockImplementation(() => {})
          await handler({ params: { projectId: 12, queryByType: 'record', entityId: 42 } }, {}, next)
          expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntity', {
            projectId: 12,
            entityType: 'record',
            id: 42
          })
          expect(next).toHaveBeenCalledWith()
        })

        it('throws an error if the entity key is invalid', async () => {
          // @ts-ignore
          store.dispatch.mockImplementationOnce(() => {
            throw new Error('test')
          })
          await handler({ params: { queryByType: 'invalid' } }, {}, next)
          expect(next).toHaveBeenCalledWith(new Error('test'))
        })
      })
    })
  })
})
