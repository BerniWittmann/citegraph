/* eslint-disable camelcase */
import Transformer from './Transformer'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'
import { VisualizationBaseFieldsDTO } from '@/models/visualizations/Visualization'

export interface WordCloudDataPointDTO {
  word: string
  weight: number
}

export interface WordCloudVisualizationDTO extends VisualizationBaseFieldsDTO {
  data?: Array<WordCloudDataPointDTO>
}

export default class WordCloudVisualizationTransformer extends Transformer {
  static fetch (item: WordCloudVisualizationDTO): WordCloudVisualization {
    return new WordCloudVisualization({
      id: item.id,
      name: item.name,
      progress: item.progress,
      timePeriods: item.time_periods,
      data: item.data ? {
        data: item.data
      } : undefined
    })
  }

  static send (item: WordCloudVisualization): WordCloudVisualizationDTO {
    return {
      id: item.id,
      name: item.name,
      key: item.key,
      progress: item.progress,
      time_periods: item.timePeriods,
      data: item.data ? item.data.data : undefined
    }
  }
}
