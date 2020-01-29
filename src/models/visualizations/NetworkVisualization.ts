import Visualization, { VisualizationBaseFields } from './Visualization'
import NetworkVisualizationTransformer from '@/transformers/NetworkVisualizationTransformer'

export interface NetworkVisualizationParameters {
  pruneLeastCitedPercentage: number
  bibliographicCouplingWeight: number
}

export interface NetworkVisualizationDataNode {
  id: string
  cluster: number
  x: number
  y: number
}

export interface NetworkVisualizationData {
  data: {
    nodes: Array<NetworkVisualizationDataNode>
  }
}

export interface NetworkVisualizationFields {
  data?: NetworkVisualizationData
}

export default class NetworkVisualization extends Visualization implements NetworkVisualizationFields {
  static key: string = 'network'
  key: string = 'network'
  static title: string = 'visualizations.information.network.title'
  static description: string = 'visualizations.information.network.description'
  static longDescription: string = 'visualizations.information.network.long_description'
  static imageUrl: string = 'visualization_images/network.jpg'
  static transformer = NetworkVisualizationTransformer
  parameters: NetworkVisualizationParameters
  data?: NetworkVisualizationData

  constructor ({ id, name, progress, data, timePeriods }: VisualizationBaseFields & NetworkVisualizationFields) {
    super({ id, name, progress, timePeriods })
    this.parameters = {
      pruneLeastCitedPercentage: 5,
      bibliographicCouplingWeight: 50
    }
    this.data = data
  }
}
