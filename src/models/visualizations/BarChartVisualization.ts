import Visualization, { VisualizationBaseFields } from './Visualization'
import BarChartVisualizationTransformer from '@/transformers/BarChartVisualizationTransformer'

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
  static transformer = BarChartVisualizationTransformer
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
