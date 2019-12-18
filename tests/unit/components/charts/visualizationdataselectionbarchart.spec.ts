import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../setupPlugins'

import VisualizationDataSelectionBarChart from '@/components/charts/VisualizationDataSelectionBarChart.vue'

describe('components/charts/VisualizationDataSelectionBarChart.vue', () => {
  const entityData = {
    2011: 21,
    2010: 19,
    2012: 31,
    2014: 4,
    2016: 3
  }
  const timeSeriesData = [{
    min: 2010,
    max: 2011
  }, {
    min: 2012,
    max: 2015
  }, {
    min: 2015, // invalid time period
    max: 2012
  }, {
    min: undefined, // invalid time period
    max: 2012
  }]
  const renderChart = jest.fn()
  const getWrapper = (data?: Record<string, number>, timeSeries?: Array<Object>, type?: string) => {
    data = data || entityData
    timeSeries = timeSeries || timeSeriesData
    return shallowMount(VisualizationDataSelectionBarChart, {
      i18n,
      propsData: {
        entityData: data,
        timePeriods: timeSeries,
        entityType: type
      },
      methods: {
        renderChart
      }
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the chart', () => {
    getWrapper()
    expect(renderChart).toHaveBeenCalledWith({
      datasets: [{
        data: [{
          x: '2010-01-01',
          y: 19
        }, {
          x: '2011-01-01',
          y: 21
        }, {
          x: '2012-01-01',
          y: 31
        }, {
          x: '2014-01-01',
          y: 4
        }, {
          x: '2016-01-01',
          y: 3
        }],
        label: 'Data'
      }, {
        backgroundColor: expect.any(String),
        borderWidth: 0,
        data: [{
          x: '2010-01-01',
          y: 31
        }, {
          x: '2011-01-01',
          y: 31
        }],
        fill: 'origin',
        label: undefined,
        pointRadius: 0,
        type: 'line'
      }, {
        backgroundColor: expect.any(String),
        borderWidth: 0,
        data: [{
          x: '2012-01-01',
          y: 31
        }, {
          x: '2015-01-01',
          y: 31
        }],
        fill: 'origin',
        label: undefined,
        pointRadius: 0,
        type: 'line'
      }]
    }, expect.any(Object))
  })

  it('can handle invalid entity Data', () => {
    getWrapper({ '-1': 23 }, [])
    expect(renderChart).toHaveBeenCalledWith({
      datasets: [{
        data: [{
          x: '-1-01-01',
          y: 23
        }],
        label: 'Data'
      }]
    }, expect.any(Object))
  })

  it('handles empty data', () => {
    getWrapper({}, [])
    expect(renderChart).toHaveBeenCalledWith({ datasets: [] }, expect.any(Object))
  })
})
