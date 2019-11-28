import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import DZFilePreview from '@/components/project/import/DZFilePreview.vue'

describe('components/project/import/DZFilePreview.vue', () => {
  function getWrapper () {
    return shallowMount(DZFilePreview, {
      i18n
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
