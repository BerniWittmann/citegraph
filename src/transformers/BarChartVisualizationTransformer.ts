/* eslint-disable camelcase */
import Transformer from './Transformer'
import { VisualizationBaseFieldsDTO } from '@/models/visualizations/Visualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'

export interface BarChartVisualizationDTO extends VisualizationBaseFieldsDTO {
  data?: Object
}

export default class BarChartVisualizationTransformer extends Transformer {
  static fetch (item: BarChartVisualizationDTO): BarChartVisualization {
    return new BarChartVisualization({
      id: item.id,
      name: item.name,
      progress: item.progress,
      timePeriods: item.time_periods,
      data: item.data
    })
  }

  static send (item: BarChartVisualization): BarChartVisualizationDTO {
    return {
      id: item.id,
      name: item.name,
      progress: item.progress,
      time_periods: item.timePeriods,
      key: item.key,
      data: item.data
    }
  }
}
