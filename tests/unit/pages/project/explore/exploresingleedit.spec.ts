import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ExploreSingleEditPage from '@/pages/project/explore/ExploreSingleEdit.vue'
import CountryEditPage from '@/components/project/explore/edit/Country.vue'
import AuthorEditPage from '@/components/project/explore/edit/Author.vue'

describe('pages/project/ExploreSingleEditPage.vue', () => {
  function getWrapper (queryByType: string = 'record') {
    return shallowMount(ExploreSingleEditPage, {
      i18n,
      mocks: {
        $route: {
          params: {
            queryByType
          }
        }
      }
    })
  }

  it('renders the page', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('handles an invalid type', () => {
    const wrapper = getWrapper('invalid')
    expect(wrapper.html()).toMatchSnapshot()
  })

  const components: Record<string, any> = {
    country: CountryEditPage,
    author: AuthorEditPage
  }

  describe('it renders the correct component', () => {
    Object.keys(components).forEach((type) => {
      describe(type, () => {
        it('renders the component', () => {
          const wrapper = getWrapper(type)
          expect(wrapper.contains(components[type])).toBeTruthy()
        })
      })
    })
  })
})
