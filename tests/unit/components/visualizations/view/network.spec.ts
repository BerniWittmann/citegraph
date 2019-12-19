import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import NetworkVisualization from '@/models/visualizations/NetworkVisualization'
import Network from '@/components/visualizations/view/Network.vue'

jest.useFakeTimers()

jest.mock('d3', () => {
  return {
    select: jest.fn().mockReturnThis(),
    append: jest.fn().mockReturnThis(),
    attr: jest.fn(function (attr, handler) {
      if (typeof handler === 'function') {
        handler({
          weight: 12,
          x: 0,
          y: 19,
          color: '#FF0000',
          source: {
            x: 0,
            y: 19
          },
          target: {
            x: 24,
            y: 54
          }
        })
      }
      // @ts-ignore
      return this
    }),
    selectAll: jest.fn().mockReturnThis(),
    data: jest.fn().mockReturnThis(),
    enter: jest.fn().mockReturnThis(),
    style: jest.fn(function (attr, handler) {
      if (typeof handler === 'function') {
        handler({
          weight: 12,
          x: 0,
          y: 19,
          color: '#FF0000',
          source: {
            x: 0,
            y: 19
          },
          target: {
            x: 24,
            y: 54
          }
        })
      }
      // @ts-ignore
      return this
    })
  }
})

describe('components/visualizations/view/Network.vue', () => {
  const getWrapper = (vis: NetworkVisualization) => {
    return shallowMount(Network, {
      i18n,
      mocks: {
        $t: (key: string) => key
      },
      propsData: {
        visualization: vis
      }
    })
  }

  const visualization = new NetworkVisualization({
    id: '1',
    name: 'My Network',
    progress: 1,
    data: {
      data: {
        nodes: [{
          id: '1',
          color: '#FF0000',
          x: 12,
          y: 24,
          weight: 24
        }, {
          id: '2',
          color: '#FF0000',
          x: 12,
          y: 24,
          weight: 24
        }, {
          id: '3',
          color: '#FF0000',
          x: 12,
          y: 24,
          weight: 24
        }],
        edges: [{
          source: '1',
          target: '2'
        }, {
          source: '3',
          target: '2'
        }]
      },
      options: {
        width: 700,
        height: 300
      }
    }
  })

  it('renders', () => {
    const wrapper = getWrapper(visualization)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
