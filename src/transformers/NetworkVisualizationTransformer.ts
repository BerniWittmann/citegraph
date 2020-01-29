/* eslint-disable camelcase */
import Transformer from './Transformer'
import { VisualizationBaseFieldsDTO } from '@/models/visualizations/Visualization'
import NetworkVisualization from '@/models/visualizations/NetworkVisualization'

export interface NetworkVisualizationDataNodeDTO {
  id: string
  cluster: number
  x: number
  y: number
}

export interface NetworkVisualizationDTO extends VisualizationBaseFieldsDTO {
  data?: Array<NetworkVisualizationDataNodeDTO>
}

export default class NetworkVisualizationTransformer extends Transformer {
  static fetch (item: NetworkVisualizationDTO): NetworkVisualization {
    return new NetworkVisualization({
      id: item.id,
      name: item.name,
      progress: item.progress,
      timePeriods: item.time_periods,
      data: item.data ? {
        data: {
          nodes: item.data
        }
      } : undefined
    })
  }

  static send (item: NetworkVisualization): NetworkVisualizationDTO {
    return {
      id: item.id,
      name: item.name,
      progress: item.progress,
      key: item.key,
      time_periods: item.timePeriods,
      data: item.data ? item.data.data.nodes : undefined
    }
  }
}
