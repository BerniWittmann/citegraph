import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ExpandableChipGroup from '@/components/ExpandableChipGroup.vue'

describe('components/ExpandableChipGroup.vue', () => {
  const getWrapper = (contents: Array<string> = ['these', 'are', 'my', 'contents']) => {
    return shallowMount(ExpandableChipGroup, {
      i18n,
      propsData: {
        contents
      }
    })
  }
  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the contents', () => {
    const wrapper = getWrapper()
    expect(wrapper.findAll('v-chip-stub').length).toEqual(4)
  })

  it('has a menu and a more button if there are more contents than fit', () => {
    const wrapper = getWrapper()
    const menu = wrapper.find('v-menu-stub')
    expect(menu.exists()).toBeTruthy()
  })

  it('does not have a menu if the contents are very less', () => {
    const wrapper = getWrapper(['just', 'this'])
    expect(wrapper.html()).toMatchSnapshot()
    const menu = wrapper.find('v-menu-stub')
    expect(menu.exists()).toBeFalsy()
  })
})
