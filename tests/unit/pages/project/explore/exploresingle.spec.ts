import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import ExploreSinglePage from '@/pages/project/explore/ExploreSingle.vue'
import RecordViewPage from '@/components/project/explore/view/Record.vue'
import AuthorViewPage from '@/components/project/explore/view/Author.vue'
import CountryViewPage from '@/components/project/explore/view/Country.vue'

describe('pages/project/ExploreSinglePage.vue', () => {
  function getWrapper (queryByType: string = 'record') {
    return shallowMount(ExploreSinglePage, {
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
    record: RecordViewPage,
    author: AuthorViewPage,
    country: CountryViewPage
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
