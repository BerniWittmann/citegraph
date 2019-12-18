import Visualization, { VisualizationBaseFields } from './Visualization'

export interface WordCloudVisualizationParameters {
  pruneLeastCitedPercentage: number
}

export interface WordCloudVisualizationFields {}

export default class WordCloudVisualization extends Visualization implements WordCloudVisualizationFields {
  static key: string = 'wordcloud'
  key: string = 'wordcloud'
  static title: string = 'visualizations.information.word_cloud.title'
  static description: string = 'visualizations.information.word_cloud.description'
  static longDescription: string = 'visualizations.information.word_cloud.long_description'
  static imageUrl: string = 'visualization_images/word_cloud.jpg'
  parameters: WordCloudVisualizationParameters

  constructor ({ id, name, progress }: VisualizationBaseFields & WordCloudVisualizationFields) {
    super({ id, name, progress })
    this.parameters = {
      pruneLeastCitedPercentage: 5
    }
  }
}
