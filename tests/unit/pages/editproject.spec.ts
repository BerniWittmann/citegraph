import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'
import EditProjectPage from '@/pages/EditProject.vue'
import Project from '@/models/project'

describe('pages/EditProject.vue', () => {
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
  const project = new Project({
    id: 42,
    name: 'My Project'
  })
  const getWrapper = () => {
    return shallowMount(EditProjectPage, {
      i18n,
      mocks: {
        $store: {
          dispatch,
          getters: {
            'projects/activeProject': project
          }
        },
        $router: router,
        $t: (key: string) => key
      }
    })
  }
  it('renders the page', (done) => {
    const wrapper = getWrapper()
    // unset Rules to ensure Snapshot stability
    // @ts-ignore
    wrapper.vm.nameRules = []
    expect.assertions(1)
    // @ts-ignore
    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot()
      done()
    })
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
      expect(rule(undefined)).toEqual('project.edit.name_required')
      expect(rule(null)).toEqual('project.edit.name_required')
      expect(rule('')).toEqual('project.edit.name_required')
    })
    it('the text can not be an empty string', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.nameRules[1]
      expect(rule('    ')).toEqual('project.edit.name_not_empty')
      expect(rule('   test   ')).toBeTruthy()
      expect(rule(' ')).toEqual('project.edit.name_not_empty')
    })
  })

  it('prefills the name with the name of the project', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    expect(wrapper.vm.name).toEqual(project.name)
  })

  it('has a cancel button', () => {
    const wrapper = getWrapper()
    const button = wrapper.findAll('v-btn-stub').at(0)
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toEqual('project.edit.cancel')

    // @ts-ignore
    wrapper.vm.cancel()

    expect(router.back).toHaveBeenCalled()
  })

  describe('the project can be updated', () => {
    it('has a submit button', () => {
      const wrapper = getWrapper()
      const button = wrapper.findAll('v-btn-stub').at(1)
      expect(button.exists()).toBeTruthy()
      expect(button.text()).toEqual('project.edit.submit')
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
    it('does not update the project if form is not valid', (done) => {
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
    it('updates the project on clicking the submit button', (done) => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.name = 'My new Project'
      // @ts-ignore
      wrapper.vm.valid = true

      expect.assertions(2)
      // @ts-ignore
      wrapper.vm.submit().then(() => {
        expect(dispatch).toHaveBeenCalledWith('projects/updateProject', new Project({
          id: 42,
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
