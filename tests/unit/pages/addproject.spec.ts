import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'
import AddProjectPage from '@/pages/projects/AddProject.vue'
import Project from '@/models/project'

describe('pages/AddProject.vue', () => {
  const dispatch = jest.fn().mockReturnValue({
    then: (cb: Function) => cb(new Project({
      id: 42,
      name: 'My new Project'
    }))
  })
  const router = {
    push: jest.fn(),
    back: jest.fn()
  }
  const getWrapper = () => {
    return shallowMount(AddProjectPage, {
      i18n,
      mocks: {
        $store: {
          dispatch
        },
        $router: router,
        $t: (key: string) => key
      }
    })
  }
  it('renders the page', () => {
    const wrapper = getWrapper()
    // unset Rules to ensure Snapshot stability
    // @ts-ignore
    wrapper.vm.nameRules = []
    expect(wrapper.html()).toMatchSnapshot()
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
      expect(rule(undefined)).toEqual('projects.add.name_required')
      expect(rule(null)).toEqual('projects.add.name_required')
      expect(rule('')).toEqual('projects.add.name_required')
    })
    it('the text can not be an empty string', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.nameRules[1]
      expect(rule('    ')).toEqual('projects.add.name_not_empty')
      expect(rule('   test   ')).toBeTruthy()
      expect(rule(' ')).toEqual('projects.add.name_not_empty')
    })
  })

  it('has a cancel button', () => {
    const wrapper = getWrapper()
    const button = wrapper.findAll('v-btn-stub').at(0)
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toEqual('projects.add.cancel')

    // @ts-ignore
    wrapper.vm.cancel()

    expect(router.back).toHaveBeenCalled()
  })

  describe('the project can be created', () => {
    it('has a submit button', () => {
      const wrapper = getWrapper()
      const button = wrapper.findAll('v-btn-stub').at(1)
      expect(button.exists()).toBeTruthy()
      expect(button.text()).toEqual('projects.add.submit')
    })
    it('the submit button is disabled if the form is not valid', () => {
      const wrapper = getWrapper()
      const button = wrapper.findAll('v-btn-stub').at(1)
      expect(button.exists()).toBeTruthy()
      expect(button.attributes('disabled')).toEqual('true')
      // @ts-ignore
      wrapper.vm.valid = true
      expect(button.attributes('disabled')).toBeUndefined()
    })
    it('does not create the project if form is not valid', (done) => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.name = 'My new Project'
      // @ts-ignore
      wrapper.vm.valid = false

      expect.assertions(1)
      // @ts-ignore
      wrapper.vm.submit().then(() => {
        expect(dispatch).not.toHaveBeenCalled()
        done()
      })
    })
    it('creates the project on clicking the submit button', (done) => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.name = 'My new Project'
      // @ts-ignore
      wrapper.vm.valid = true

      expect.assertions(2)
      // @ts-ignore
      wrapper.vm.submit().then(() => {
        expect(dispatch).toHaveBeenCalledWith('projects/createProject', new Project({
          id: undefined,
          name: 'My new Project'
        }))
        expect(router.push).toHaveBeenCalledWith({
          name: 'projects.single',
          params: {
            projectId: '42'
          }
        })
        done()
      })
    })
  })
})
