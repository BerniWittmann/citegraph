import Visualization, { VisualizationBaseFields } from './Visualization'

export interface BarChartVisualizationParameters {
  pruneLeastCitedPercentage: number
}

export interface BarChartVisualizationFields {
  data?: Object
}

export default class BarChartVisualization extends Visualization implements BarChartVisualizationFields {
  static key: string = 'barchart'
  key: string = 'barchart'
  static title: string = 'visualizations.information.bar_chart.title'
  static description: string = 'visualizations.information.bar_chart.description'
  static longDescription: string = 'visualizations.information.bar_chart.long_description'
  static imageUrl: string = 'visualization_images/bar_chart.png'
  parameters: BarChartVisualizationParameters
  data?: Object

  constructor ({ id, name, progress, data, timePeriods }: VisualizationBaseFields & BarChartVisualizationFields) {
    super({ id, name, progress, timePeriods })
    this.parameters = {
      pruneLeastCitedPercentage: 5
    }
    this.data = data
  }
}
