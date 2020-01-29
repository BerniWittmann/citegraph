import { shallowMount, mount } from '@vue/test-utils'
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
          cluster: 12,
          x: 0,
          y: 19,
          id: '#FF0000'
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
          cluster: 12,
          x: 0,
          y: 19,
          id: '#FF0000'
        })
      }
      // @ts-ignore
      return this
    }),
    interpolateViridis: jest.fn().mockReturnValue('#FF0000')
  }
})

describe('components/visualizations/view/Network.vue', () => {
  const getWrapper = (vis: NetworkVisualization, shallow = true) => {
    const mountFn = shallow ? shallowMount : mount
    return mountFn(Network, {
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
          x: 12,
          y: 24,
          cluster: 3
        }, {
          id: '2',
          x: 12,
          y: 24,
          cluster: 1
        }, {
          id: '3',
          x: 12,
          y: 24,
          cluster: 2
        }, {
          id: '4',
          x: 12,
          y: 24,
          cluster: 2
        }]
      }
    }
  })

  it('renders', () => {
    const wrapper = getWrapper(visualization)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the cluster information', () => {
    const wrapper = getWrapper(visualization, false)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
