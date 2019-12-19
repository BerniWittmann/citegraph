import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import ViewVisualizationPage from '@/pages/visualizations/visualization/ViewVisualization.vue'
import Visualization from '@/models/visualizations/Visualization'
import { visualizations } from '@/models/visualizations'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'

describe('pages/visualizations/EditVisualization.vue', () => {
  function getWrapper (visualization?: Visualization) {
    const store = {
      getters: {
        'visualizations/hasCurrentVisualization': !!visualization,
        'visualizations/currentVisualization': visualization
      }
    }

    return shallowMount(ViewVisualizationPage, {
      i18n,
      mocks: {
        $route: {
          params: {
            projectId: 23,
            visualizationId: 1
          }
        },
        $store: store
      }
    })
  }

  visualizations.forEach(VisualizationClass => {
    describe('renders the page for ' + VisualizationClass.key, () => {
      const vis = new VisualizationClass({
        id: '1',
        name: 'My Visualization'
      })
      it('renders', () => {
        vis.data = {
          foo: 'bar'
        }
        vis.progress = 1
        const wrapper = getWrapper(vis)
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.contains('v-progress-linear-stub')).toBeFalsy()
        expect(wrapper.text()).not.toContain('visualization.progressing')
        expect(wrapper.text()).not.toContain('visualization.no_data')
      })
      it('renders with progress', () => {
        vis.data = undefined
        vis.progress = 0.74
        const wrapper = getWrapper(vis)
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.contains('v-progress-linear-stub')).toBeTruthy()
        expect(wrapper.text()).toContain('visualization.progressing')
        expect(wrapper.text()).not.toContain('visualization.no_data')
      })

      it('renders without data', () => {
        vis.data = undefined
        vis.progress = undefined
        const wrapper = getWrapper(vis)
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.contains('v-progress-linear-stub')).toBeFalsy()
        expect(wrapper.text()).not.toContain('visualization.progressing')
        expect(wrapper.text()).toContain('visualization.no_data')
      })
      it('renders without progress', () => {
        vis.data = {
          foo: 'bar'
        }
        vis.progress = undefined
        const wrapper = getWrapper(vis)
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.contains('v-progress-linear-stub')).toBeFalsy()
        expect(wrapper.text()).not.toContain('visualization.progressing')
        expect(wrapper.text()).not.toContain('visualization.no_data')
        // @ts-ignore
        expect(wrapper.vm.progress).toEqual(0)
      })
    })
  })

  it('renders the page if no visualization exists', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the page for an invalid visualization', () => {
    const vis = new WordCloudVisualization({
      id: '1',
      name: 'My Visualization'
    })
    vis.key = 'invalid'
    const wrapper = getWrapper(vis)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
