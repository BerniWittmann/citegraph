import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../../setupPlugins'

import EmptySlotComponent from '../../../../EmptySlotComponent.vue'
import CountryViewPage from '@/components/project/explore/view/Country.vue'
import Country from '@/models/paperEntities/country'

describe('components/project/explore/view/Country.vue', () => {
  function getWrapper (flagUrl: string | undefined) {
    return shallowMount(CountryViewPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'paperEntities/activeEntity': new Country({ id: '1', name: 'Germany', flagUrl, countRecords: 12 })
          }
        }
      },
      stubs: {
        layout: EmptySlotComponent
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper('https://flag.url')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the name', () => {
    const wrapper = getWrapper('https://flag.url')
    expect(wrapper.text()).toContain('Germany')
  })

  it('renders the flag', () => {
    const wrapper = getWrapper('https://flag.url')
    expect(wrapper.contains('v-icon-stub')).toBeFalsy()
    const img = wrapper.find('v-img-stub')
    expect(img.exists()).toBeTruthy()
    expect(img.props('src')).toEqual('https://flag.url')
  })

  it('renders a question mark icon if the flag is not available', () => {
    const wrapper = getWrapper(undefined)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('v-img-stub')).toBeFalsy()
    const img = wrapper.find('v-icon-stub')
    expect(img.exists()).toBeTruthy()
  })
})
