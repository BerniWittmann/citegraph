import Visualization, { VisualizationBaseFields } from './Visualization'
import WordCloudVisualizationTransformer from '@/transformers/WordCloudVisualizationTransformer'

export interface WordCloudVisualizationParameters {
  pruneLeastCitedPercentage: number
}

export interface WordCloudDataPoint {
  word: string
  weight: number
}
export interface WordCloudData {
  data: Array<WordCloudDataPoint>
}

export interface WordCloudVisualizationFields {
  data?: WordCloudData
}

export default class WordCloudVisualization extends Visualization implements WordCloudVisualizationFields {
  static key: string = 'wordcloud'
  key: string = 'wordcloud'
  static title: string = 'visualizations.information.word_cloud.title'
  static description: string = 'visualizations.information.word_cloud.description'
  static longDescription: string = 'visualizations.information.word_cloud.long_description'
  static imageUrl: string = 'visualization_images/word_cloud.jpg'
  static transformer = WordCloudVisualizationTransformer
  parameters: WordCloudVisualizationParameters
  data?: WordCloudData

  constructor ({ id, name, progress, data, timePeriods }: VisualizationBaseFields & WordCloudVisualizationFields) {
    super({ id, name, progress, timePeriods })
    this.parameters = {
      pruneLeastCitedPercentage: 5
    }
    this.data = data
  }
}
