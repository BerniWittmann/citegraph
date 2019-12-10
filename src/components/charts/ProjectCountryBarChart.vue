<script lang="ts">
import { Pie } from 'vue-chartjs'
import { Component, Prop, Mixins } from 'vue-property-decorator'
import Project from '../../models/project'
import { materialColors } from '@/common/constants'

@Component
export default class ProjectCountryBarChart extends Mixins(Pie) {
  @Prop(Project) readonly project!: Project

  colors: Array<string> = materialColors.sort(() => 0.5 - Math.random()) // Randomly sort colors

  get pieChartData (): Object | null {
    if (!this.project.countryRelevanceData) return null
    return {
      labels: this.project.countryRelevanceData.map(d => d.country.name),
      datasets: [{
        data: this.project.countryRelevanceData.map(d => d.relevance),
        backgroundColor: this.project.countryRelevanceData.map((d, i) => {
          return this.colors[i % this.colors.length]
        })
      }]
    }
  }

  get pieChartOptions (): Object {
    return {
      responsive: true
    }
  }

  mounted (): void {
    if (this.pieChartData) {
      this.renderChart(this.pieChartData, this.pieChartOptions)
    }
  }
}
</script>
