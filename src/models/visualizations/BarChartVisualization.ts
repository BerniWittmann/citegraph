import Visualization, { VisualizationBaseFields } from './Visualization'

export interface BarChartVisualizationFields {}

export default class BarChartVisualization extends Visualization implements BarChartVisualizationFields {
  static key: string = 'barchart'
  key: string = 'barchart'
  static title: string = 'visualizations.information.bar_chart.title'
  static description: string = 'visualizations.information.bar_chart.description'
  static longDescription: string = 'visualizations.information.bar_chart.long_description'
  static imageUrl: string = 'visualization_images/bar_chart.png'

  constructor ({ id, name, progress }: VisualizationBaseFields & BarChartVisualizationFields) {
    super({ id, name, progress })
  }
}
