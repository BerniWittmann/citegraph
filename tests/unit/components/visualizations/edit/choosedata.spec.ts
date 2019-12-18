import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import VisualizationEditChooseDataComponent from '@/components/visualizations/edit/ChooseData.vue'
import VisualizationDataSelectionBarChart from '@/components/charts/VisualizationDataSelectionBarChart.vue'

const store = {
  getters: {
    'projects/activeProject': { id: 41 },
    'paperEntities/entities': [
      { id: 1, name: 'A', year: 2011 },
      { id: 2, name: 'B', year: 2010 },
      { id: 3, name: 'C', year: 2011 },
      { id: 4, name: 'invalid' }
    ]
  },
  dispatch: jest.fn()
}

describe('components/visualizations/edit/ChooseData.vue', () => {
  const getWrapper = () => {
    return shallowMount(VisualizationEditChooseDataComponent, {
      i18n,
      mocks: {
        $t: (key: string) => key,
        $store: store
      },
      propsData: {
        name: ''
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    // unset Rules to ensure Snapshot stability
    // @ts-ignore
    wrapper.vm.yearRules = []
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the chart', () => {
    const wrapper = getWrapper()

    const chart = wrapper.find(VisualizationDataSelectionBarChart)
    expect(chart.exists()).toBeTruthy()
  })

  it('has a back Button', () => {
    const wrapper = getWrapper()
    const btns = wrapper.findAll('v-btn-stub')
    const btn = btns.at(btns.length - 2)
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toContain('visualizations.add.data.back')
    expect(wrapper.emitted('previous-step')).toBeFalsy()
    btn.vm.$emit('click')
    expect(wrapper.emitted('previous-step')).toBeTruthy()
  })

  describe('it has a text field of the year', () => {
    it('the year needs to be entered', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rules = wrapper.vm.yearRules
      expect.assertions(rules.length)
      for (let rule of rules) {
        expect(rule('2019')).toBeTruthy()
      }
    })
    it('the text is required', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.yearRules[0]
      expect(rule(undefined)).toEqual('visualizations.add.data.period.year_required')
      expect(rule(null)).toEqual('visualizations.add.data.period.year_required')
      expect(rule('')).toEqual('visualizations.add.data.period.year_required')
    })
    it('the text can not be a too low number', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.yearRules[1]
      expect(rule(1)).toEqual('visualizations.add.data.period.year_min')
      expect(rule(1970)).toBeTruthy()
      expect(rule(1969)).toEqual('visualizations.add.data.period.year_min')
    })
    it('the text can not be a too high number', () => {
      const wrapper = getWrapper()
      // @ts-ignore
      const rule = wrapper.vm.yearRules[2]
      expect(rule(819358915)).toEqual('visualizations.add.data.period.year_max')
      expect(rule((new Date()).getFullYear())).toBeTruthy()
      expect(rule((new Date()).getFullYear() + 1)).toEqual('visualizations.add.data.period.year_max')
    })
  })

  describe('it can go to the next step', () => {
    it('has a submit button', () => {
      const wrapper = getWrapper()
      const btns = wrapper.findAll('v-btn-stub')
      const btn = btns.at(btns.length - 1)
      expect(btn.exists()).toBeTruthy()
      expect(btn.text()).toContain('visualizations.add.data.next')
    })

    it('emits the next step event on click', () => {
      const wrapper = getWrapper()
      const btns = wrapper.findAll('v-btn-stub')
      const btn = btns.at(btns.length - 1)
      expect(wrapper.emitted('next-step')).toBeFalsy()
      btn.vm.$emit('click')
      expect(wrapper.emitted('next-step')).toBeTruthy()
    })
  })

  describe('loads the data', () => {
    it('loads the data on mount', () => {
      getWrapper()
      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 41,
        entityType: 'record'
      })
    })

    it('reloads the data on type change', () => {
      const wrapper = getWrapper()
      jest.clearAllMocks()
      // @ts-ignore
      wrapper.vm.loadData()
      expect(store.dispatch).toHaveBeenCalledWith('paperEntities/fetchEntities', {
        projectId: 41,
        entityType: 'record'
      })
    })

    it('does not load the data on type the can not select by year', () => {
      const wrapper = getWrapper()
      jest.clearAllMocks()
      // @ts-ignore
      wrapper.vm.dataType = 'author'
      // @ts-ignore
      wrapper.vm.loadData()
      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('it handles the time periods', () => {
    it('can add a time period', () => {
      const wrapper = getWrapper()
      const btn = wrapper.find('v-btn-stub')
      expect(btn.exists()).toBeTruthy()
      expect(btn.text()).toEqual('visualizations.add.data.period.add')
      btn.vm.$emit('click')
      // unset Rules to ensure Snapshot stability
      // @ts-ignore
      wrapper.vm.yearRules = []
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.contains('v-text-field-stub')).toBeTruthy()
    })

    it('can remove a time period', () => {
      const wrapper = getWrapper()
      const btn = wrapper.find('v-btn-stub')
      btn.vm.$emit('click')
      // unset Rules to ensure Snapshot stability
      // @ts-ignore
      wrapper.vm.yearRules = []
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.contains('v-text-field-stub')).toBeTruthy()

      const closeBtn = wrapper.findAll('v-btn-stub').at(0)
      expect(closeBtn.exists()).toBeTruthy()
      expect(closeBtn.text()).toEqual('mdi-trash-can-outline')
      closeBtn.vm.$emit('click')

      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.contains('v-text-field-stub')).toBeFalsy()
    })
  })

  describe('it correctly passes the time periods', () => {
    it('handles invalid time periods', () => {
      const wrapper = getWrapper()
      const data = [{
        id: 1,
        count: -1,
        min: undefined,
        max: undefined
      }, {
        id: 2,
        count: -1,
        min: 2019,
        max: 2000
      }]
      // @ts-ignore
      wrapper.vm.timePeriodData = data
      expect(wrapper.find(VisualizationDataSelectionBarChart).props('timePeriods')).toEqual(data)
    })

    it('calculates the amount', () => {
      const wrapper = getWrapper()
      const data = [
        { id: 1, count: -1, min: 2000, max: 2015 },
        { id: 2, count: -1, min: 1990, max: 1991 },
        { id: 3, count: -1, min: 2020, max: 2025 }
      ]
      // @ts-ignore
      wrapper.vm.timePeriodData = data
      // @ts-ignore
      expect(wrapper.vm.timePeriods).toEqual([{
        ...data[0],
        count: 3
      }, {
        ...data[1],
        count: 0
      }, {
        ...data[2],
        count: 0
      }])
    })
  })

  it('has a function to update the chart', () => {
    const wrapper = getWrapper()
    // @ts-ignore
    wrapper.vm.$refs.chart.updateChart = jest.fn()
    // @ts-ignore
    expect(wrapper.vm.updateChart).toEqual(expect.any(Function))
    // @ts-ignore
    expect(wrapper.vm.$refs.chart.updateChart).not.toHaveBeenCalled()
    // @ts-ignore
    wrapper.vm.updateChart()
    // @ts-ignore
    expect(wrapper.vm.$refs.chart.updateChart).toHaveBeenCalled()
  })
})
