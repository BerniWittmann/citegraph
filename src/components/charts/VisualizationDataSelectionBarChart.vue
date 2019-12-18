<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import { materialColors } from '@/common/constants'
import hexToRgba from 'hex-to-rgba'

interface ChartData {
  x: number,
  y: number
}

@Component
export default class VisualizationDataSelectionBarChart extends Mixins(Bar) {
  @Prop() readonly entityData!: Record<string, number>
  @Prop({ default: 'Data' }) readonly entityType!: string
  @Prop() readonly timePeriods!: Array<any>

  colors: Array<string> = materialColors.sort(() => 0.5 - Math.random()) // Randomly sort colors

  get barData (): Array<ChartData> {
    const result = []
    for (let year in this.entityData) {
      result.push({
        x: parseInt(year),
        y: this.entityData[year]
      })
    }
    return result
  }

  get timePeriodsDataSets (): Array<any> {
    return this.timePeriods.map((timePeriod, i) => {
      if (!timePeriod.min || !timePeriod.max) return undefined
      const min = parseInt(timePeriod.min)
      const max = parseInt(timePeriod.max)
      if (min > max) return undefined
      const color = this.colors[i % this.colors.length]
      return {
        data: [{
          x: min + '-01-01',
          y: this.maxValue
        }, {
          x: max + '-01-01',
          y: this.maxValue
        }],
        fill: 'origin',
        type: 'line',
        backgroundColor: hexToRgba(color, 0.1),
        pointRadius: 0,
        borderWidth: 0,
        label: timePeriod.id
      }
    }).filter((v: any) => !!v)
  }

  get chartData (): Object {
    if (this.barData.length === 0) {
      return {
        datasets: []
      }
    }
    return {
      datasets: [{
        data: this.barData.map(d => ({
          ...d,
          x: d.x + '-01-01'
        })),
        label: this.entityType
      }, ...this.timePeriodsDataSets]
    }
  }

  get minYear (): number {
    if (this.barData.length === 0) {
      return 1971
    }
    return this.barData.reduce((acc: number, val: ChartData) => {
      return val.x < acc ? val.x : acc
    }, Number.MAX_SAFE_INTEGER)
  }

  get maxValue (): number {
    return this.barData.reduce((acc: number, val: ChartData) => {
      return val.y > acc ? val.y : acc
    }, 0)
  }

  get maxYear (): number {
    if (this.barData.length === 0) {
      return (new Date()).getFullYear()
    }

    return this.barData.reduce((acc: number, val: ChartData) => {
      if (val.x > acc) {
        return val.x
      } else {
        return acc
      }
    }, 0)
  }

  get chartOptions (): Object {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          bounds: 'data',
          gridLines: {
            display: true,
            offsetGridLines: true
          },
          time: {
            unit: 'year',
            tooltipFormat: 'YYYY'
          },
          ticks: {
            min: (this.minYear - 1) + '-01-01',
            max: (this.maxYear + 1) + '-01-01'
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0
          }
        }]
      },
      legend: {
        display: false
      }
    }
  }

  @Watch('chartData', { deep: true })
  updateChart () {
    this.renderChart(this.chartData, this.chartOptions)
  }

  mounted (): void {
    this.updateChart()
  }
}
</script>
