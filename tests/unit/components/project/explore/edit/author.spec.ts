import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../../setupPlugins'

import EmptySlotComponent from '../../../../EmptySlotComponent.vue'
import AuthorEditPage from '@/components/project/explore/edit/Author.vue'
import Author from '@/models/paperEntities/author'

describe('components/project/explore/edit/Author.vue', () => {
  const router = {
    back: jest.fn()
  }
  const dispatch = jest.fn()

  function getWrapper () {
    return shallowMount(AuthorEditPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'paperEntities/activeEntity': new Author({
              id: '1',
              firstName: 'Hans',
              lastName: 'Meier',
              countRecords: 12
            })
          },
          dispatch
        },
        $router: router,
        $route: {
          params: {
            projectId: 42,
            queryByType: 'author',
            entityId: '1'
          }
        },
        $t: (key: string) => key
      },
      stubs: {
        layout: EmptySlotComponent
      }
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the page', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.nameRules = []
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has a back button', () => {
    const wrapper = getWrapper()
    const btn = wrapper.find('v-btn-stub')
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toContain('project.explore.edit.back')
    expect(router.back).not.toHaveBeenCalled()
    btn.vm.$emit('click')
    expect(router.back).toHaveBeenCalled()
  })

  it('has a form', () => {
    const wrapper = getWrapper()
    expect(wrapper.contains('v-form-stub')).toBeTruthy()
  })

  describe('it has a text field of the name', () => {
    it('has a text field', () => {
      const wrapper = getWrapper()
      expect(wrapper.contains('v-text-field-stub')).toBeTruthy()
    })
    it('the text needs to be entered', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rules = wrapper.vm.nameRules
      expect.assertions(rules.length)
      for (let rule of rules) {
        expect(rule('test')).toBeTruthy()
      }
    })
    it('the text is required', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.nameRules[0]
      expect(rule(undefined)).toEqual('project.explore.edit.author.name_required')
      expect(rule(null)).toEqual('project.explore.edit.author.name_required')
      expect(rule('')).toEqual('project.explore.edit.author.name_required')
    })
    it('the text can not be an empty string', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.nameRules[1]
      expect(rule('    ')).toEqual('project.explore.edit.author.name_not_empty')
      expect(rule('   test   ')).toBeTruthy()
      expect(rule(' ')).toEqual('project.explore.edit.author.name_not_empty')
    })
  })

  describe('it can submit the form', () => {
    it('saves the author on submit', async () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.firstName = 'Olli'
      // @ts-ignore
      wrapper.vm.lastName = 'Kahn'
      // @ts-ignore
      await wrapper.vm.submit()
      expect(dispatch).toHaveBeenCalledWith('paperEntities/updateEntity', {
        params: {
          projectId: 42,
          entityType: 'author',
          id: '1'
        },
        data: {
          firstName: 'Olli',
          lastName: 'Kahn'
        }
      })
      expect(router.back).toHaveBeenCalled()
    })

    it('does nothing if the form is not valid', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.valid = false
      // @ts-ignore
      wrapper.vm.submit()
      expect(dispatch).not.toHaveBeenCalled()
      expect(router.back).not.toHaveBeenCalled()
    })
  })
})
