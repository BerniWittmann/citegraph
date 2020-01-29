import WordCloudVisualizationTransformer from '@/transformers/WordCloudVisualizationTransformer'
import WordCloudVisualization from '@/models/visualizations/WordCloudVisualization'

describe('transformers/WordCloudVisualizationTransformer', () => {
  describe('can send a WordCloudVisualization', () => {
    it('sends an WordCloudVisualization', () => {
      expect(WordCloudVisualizationTransformer.send(new WordCloudVisualization({ id: '1', name: 'First', progress: 0.1 }))).toMatchSnapshot()
    })

    it('sends the data', () => {
      expect(WordCloudVisualizationTransformer.send(new WordCloudVisualization({ id: '1', name: 'First', progress: 0.1, data: { data: [] } }))).toMatchSnapshot()
    })
  })

  describe('can fetch a WordCloudVisualization', () => {
    it('fetches a WordCloudVisualization', () => {
      expect(WordCloudVisualizationTransformer.fetch({ id: '1', name: 'First', progress: 0.1, key: 'wordcloud' })).toMatchSnapshot()
    })

    it('fetches the data', () => {
      expect(WordCloudVisualizationTransformer.fetch({ id: '1', name: 'First', progress: 0.1, key: 'wordcloud', data: [] })).toMatchSnapshot()
    })
  })
})
