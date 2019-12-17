import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import VisualizationEditGeneralInformationComponent from '@/components/visualizations/edit/GeneralInformation.vue'

jest.useFakeTimers()

describe('components/visualizations/edit/GeneralInformation.vue', () => {
  const getWrapper = () => {
    return shallowMount(VisualizationEditGeneralInformationComponent, {
      i18n,
      mocks: {
        $t: (key: string) => key
      },
      propsData: {
        name: ''
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    // unset Rules to ensure Snapshot stability
    // @ts-ignore
    wrapper.vm.nameRules = []
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has a back Button', () => {
    const wrapper = getWrapper()
    const btns = wrapper.findAll('v-btn-stub')
    const btn = btns.at(btns.length - 2)
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toContain('visualizations.add.general.back')
    expect(wrapper.emitted('previous-step')).toBeFalsy()
    btn.vm.$emit('click')
    expect(wrapper.emitted('previous-step')).toBeTruthy()
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
      expect(rule(undefined)).toEqual('visualizations.add.general.name_required')
      expect(rule(null)).toEqual('visualizations.add.general.name_required')
      expect(rule('')).toEqual('visualizations.add.general.name_required')
    })
    it('the text can not be an empty string', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.nameRules[1]
      expect(rule('    ')).toEqual('visualizations.add.general.name_not_empty')
      expect(rule('   test   ')).toBeTruthy()
      expect(rule(' ')).toEqual('visualizations.add.general.name_not_empty')
    })
  })

  describe('it can save the name', () => {
    it('has a submit button', () => {
      const wrapper = getWrapper()
      const btns = wrapper.findAll('v-btn-stub')
      const btn = btns.at(btns.length - 1)
      expect(btn.exists()).toBeTruthy()
      expect(btn.text()).toContain('visualizations.add.general.submit')
    })

    it('does not emit the next step event when its not valid', () => {
      const wrapper = getWrapper()
      const btns = wrapper.findAll('v-btn-stub')
      const btn = btns.at(btns.length - 1)
      expect(btn.props('disabled')).toBeTruthy()
      const form = wrapper.find('v-form-stub')
      expect(wrapper.emitted('next-step')).toBeFalsy()
      form.vm.$emit('submit', { preventDefault: jest.fn() })
      expect(wrapper.emitted('next-step')).toBeFalsy()
    })

    it('emits the next step event when its valid', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      wrapper.vm.currentName = 'New Name'
      // @ts-ignore
      wrapper.vm.valid = true
      const btns = wrapper.findAll('v-btn-stub')
      const btn = btns.at(btns.length - 1)
      expect(btn.props('disabled')).toBeFalsy()
      const form = wrapper.find('v-form-stub')
      expect(wrapper.emitted('next-step')).toBeFalsy()
      form.vm.$emit('submit', { preventDefault: jest.fn() })
      expect(wrapper.emitted('next-step')).toBeTruthy()
    })
  })
})
