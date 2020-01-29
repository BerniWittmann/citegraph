import BarChartVisualizationTransformer from '@/transformers/BarChartVisualizationTransformer'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'

describe('transformers/BarChartVisualizationTransformer', () => {
  describe('can send a BarChartVisualization', () => {
    it('sends an BarChartVisualization', () => {
      expect(BarChartVisualizationTransformer.send(new BarChartVisualization({ id: '1', name: 'First', progress: 0.1 }))).toMatchSnapshot()
    })
  })

  describe('can fetch a BarChartVisualization', () => {
    it('fetches a BarChartVisualization', () => {
      expect(BarChartVisualizationTransformer.fetch({ id: '1', name: 'First', progress: 0.1, key: 'barchart' })).toMatchSnapshot()
    })
  })
})
