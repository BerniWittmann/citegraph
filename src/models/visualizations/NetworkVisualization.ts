import Visualization, { VisualizationBaseFields } from './Visualization'

export interface NetworkVisualizationParameters {
  pruneLeastCitedPercentage: number
  bibliographicCouplingWeight: number
}

export interface NetworkVisualizationFields {
  data?: Object
}

export default class NetworkVisualization extends Visualization implements NetworkVisualizationFields {
  static key: string = 'network'
  key: string = 'network'
  static title: string = 'visualizations.information.network.title'
  static description: string = 'visualizations.information.network.description'
  static longDescription: string = 'visualizations.information.network.long_description'
  static imageUrl: string = 'visualization_images/network.jpg'
  parameters: NetworkVisualizationParameters
  data?: Object

  constructor ({ id, name, progress, data }: VisualizationBaseFields & NetworkVisualizationFields) {
    super({ id, name, progress })
    this.parameters = {
      pruneLeastCitedPercentage: 5,
      bibliographicCouplingWeight: 50
    }
    this.data = data
  }
}
