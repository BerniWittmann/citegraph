import WordCloudVisualization, { WordCloudVisualizationFields } from './WordCloudVisualization'
import { VisualizationBaseFields } from '@/models/visualizations/Visualization'
import BarChartVisualization, { BarChartVisualizationFields } from '@/models/visualizations/BarChartVisualization'
import NetworkVisualization, { NetworkVisualizationFields } from '@/models/visualizations/NetworkVisualization'

export const visualizations = [WordCloudVisualization, BarChartVisualization, NetworkVisualization]

const visualizationsKeyMap: Record<string, any> = {}
visualizations.forEach((visualization) => {
  visualizationsKeyMap[visualization.key] = visualization
})

export {
  visualizationsKeyMap
}

export type VisalizationFields = VisualizationBaseFields & (
  WordCloudVisualizationFields &
  BarChartVisualizationFields &
  NetworkVisualizationFields
)
