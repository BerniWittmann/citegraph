import NetworkVisualizationTransformer from '@/transformers/NetworkVisualizationTransformer'
import NetworkVisualization from '@/models/visualizations/NetworkVisualization'

describe('transformers/NetworkVisualizationTransformer', () => {
  describe('can send a NetworkVisualization', () => {
    it('sends an NetworkVisualization', () => {
      expect(NetworkVisualizationTransformer.send(new NetworkVisualization({ id: '1', name: 'First', progress: 0.1 }))).toMatchSnapshot()
    })

    it('sends the data', () => {
      expect(NetworkVisualizationTransformer.send(new NetworkVisualization({ id: '1', name: 'First', progress: 0.1, data: { data: { nodes: [] } } }))).toMatchSnapshot()
    })
  })

  describe('can fetch a NetworkVisualization', () => {
    it('fetches a NetworkVisualization', () => {
      expect(NetworkVisualizationTransformer.fetch({ id: '1', name: 'First', progress: 0.1, key: 'network' })).toMatchSnapshot()
    })

    it('fetches the data', () => {
      expect(NetworkVisualizationTransformer.fetch({ id: '1', name: 'First', progress: 0.1, key: 'network', data: [] })).toMatchSnapshot()
    })
  })
})
