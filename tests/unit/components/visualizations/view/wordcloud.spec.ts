import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import WordCloud from '@/components/visualizations/view/WordCloud.vue'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'

jest.useFakeTimers()

jest.mock('d3', () => {
  return {
    select: jest.fn().mockReturnThis(),
    append: jest.fn().mockReturnThis(),
    attr: jest.fn(function (attr, handler) {
      if (typeof handler === 'function') {
        handler({
          size: 12,
          x: 0,
          y: 19,
          rotate: 39,
          text: 'First'
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
          size: 12,
          x: 0,
          y: 19,
          rotate: 39,
          text: 'First'
        }, 1)
      }
      // @ts-ignore
      return this
    }),
    text: jest.fn().mockReturnThis(),
    scaleOrdinal: jest.fn().mockReturnValue(jest.fn())
  }
})
jest.mock('d3-cloud', () => {
  const result = {
    start: jest.fn(),
    size: jest.fn().mockReturnValue([500, 500])
  }
  const obj = {
    size: jest.fn().mockReturnThis(),
    words: jest.fn().mockReturnThis(),
    padding: jest.fn().mockReturnThis(),
    rotate: jest.fn(function (handler) {
      if (typeof handler === 'function') {
        handler()
      }
      // @ts-ignore
      return this
    }),
    font: jest.fn().mockReturnThis(),
    spiral: jest.fn().mockReturnThis(),
    fontSize: jest.fn(function (handler) {
      if (typeof handler === 'function') {
        handler({
          size: 12,
          x: 0,
          y: 19,
          rotate: 39,
          text: 'First'
        })
      }
      // @ts-ignore
      return this
    }),
    on: jest.fn(function (event, handler) {
      setTimeout(() => {
        handler([{
          size: 12,
          x: 0,
          y: 19,
          rotate: 39,
          text: 'First'
        }, {
          size: 32,
          x: 65,
          y: 65,
          rotate: 34,
          text: 'Second'
        }, {
          size: 23,
          x: 24,
          y: 64,
          rotate: 0,
          text: 'Thrid'
        }])
      }, 1)
      return result
    }),
    start: jest.fn().mockReturnThis()
  }
  return jest.fn().mockReturnValue(obj)
})

describe('components/visualizations/view/WordCloud.vue', () => {
  const getWrapper = (vis: WordCloudVisualization) => {
    return shallowMount(WordCloud, {
      i18n,
      mocks: {
        $t: (key: string) => key
      },
      propsData: {
        visualization: vis
      }
    })
  }

  const visualization = new WordCloudVisualization({
    id: '1',
    name: 'My Word Cloud',
    progress: 1,
    data: {
      data: [{
        word: 'Test',
        weight: 12
      }, {
        word: 'Eins',
        weight: 20
      }, {
        word: 'Zwei',
        weight: 22
      }, {
        word: 'Drei',
        weight: 23
      }]
    }
  })

  it('renders', () => {
    const wrapper = getWrapper(visualization)
    jest.runAllTimers()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
