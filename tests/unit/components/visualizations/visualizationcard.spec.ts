import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import VisualizationCard from '@/components/visualizations/VisualizationCard.vue'
import Visualization from '@/models/visualizations/Visualization'
import { visualizations } from '@/models/visualizations'

describe('components/visualizations/VisualizationCard.vue', () => {
  const data = {
    id: '1',
    name: 'My awesome Visualization'
  }
  const getWrapper = (visualization: Visualization) => {
    return shallowMount(VisualizationCard, {
      i18n,
      propsData: {
        visualization
      }
    })
  }

  visualizations.forEach(VisualizationClass => {
    describe('can display a card of type ' + VisualizationClass.key, () => {
      it('renders', () => {
        const wrapper = getWrapper(new VisualizationClass(data))
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('renders a progress bar', () => {
        const wrapper = getWrapper(new VisualizationClass({
          ...data,
          progress: 0.3
        }))
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('does not render a progress bar for 100%', () => {
        const wrapper = getWrapper(new VisualizationClass({
          ...data,
          progress: 1
        }))
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('renders the image', () => {
        const wrapper = getWrapper(new VisualizationClass(data))
        const img = wrapper.find('v-img-stub')
        expect(img.exists()).toBeTruthy()
        expect(img.props('src')).toContain(VisualizationClass.imageUrl)
      })
    })
  })
})
