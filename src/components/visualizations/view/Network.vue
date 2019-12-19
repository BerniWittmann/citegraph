<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as d3 from 'd3'
import NetworkVisualization, {
  NetworkVisualizationData, NetworkVisualizationDataEdge,
  NetworkVisualizationDataNode
} from '@/models/visualizations/NetworkVisualization'

interface Coordinate {
  x: number
  y: number
}
interface Edge {
  source: Coordinate
  target: Coordinate
}

@Component
export default class Network extends Vue {
  @Prop() readonly visualization!: NetworkVisualization

  layout: any

  get diagramData (): NetworkVisualizationData {
    return this.visualization.data!
  }

  get nodes (): Array<NetworkVisualizationDataNode> {
    return this.diagramData.data.nodes
  }

  get nodesIdMap (): Record<string, NetworkVisualizationDataNode> {
    const result: Record<string, NetworkVisualizationDataNode> = {}
    this.nodes.forEach((node: NetworkVisualizationDataNode) => {
      result[node.id] = node
    })
    return result
  }

  get edges (): Array<Edge> {
    return this.diagramData.data.edges.map((edge: NetworkVisualizationDataEdge) => {
      return {
        source: this.nodesIdMap[edge.source],
        target: this.nodesIdMap[edge.target]
      }
    })
  }

  mounted () {
    const svg = d3.select(this.$el).append('svg')
      .attr('width', this.diagramData.options.width)
      .attr('height', this.diagramData.options.height)

    const g = svg.append('g')

    g.selectAll('circle .node')
      .data(this.nodes)
      .enter()
      .append('svg:circle')
      .attr('class', 'node')
      .attr('cx', (d: NetworkVisualizationDataNode) => d.x)
      .attr('cy', (d: NetworkVisualizationDataNode) => d.y)
      .attr('r', (d: NetworkVisualizationDataNode) => d.weight + 'px')
      .style('fill', (d: NetworkVisualizationDataNode) => d.color)
      .style('stroke', (d: NetworkVisualizationDataNode) => d.color)
      .style('stroke-width', 2)
      .style('fill-opacity', '0.8')

    g.selectAll('.line')
      .data(this.edges)
      .enter()
      .append('line')
      .attr('class', 'line')
      .attr('x1', (d: Edge) => d.source.x)
      .attr('y1', (d: Edge) => d.source.y)
      .attr('x2', (d: Edge) => d.target.x)
      .attr('y2', (d: Edge) => d.target.y)
      .style('stroke', 'black')
      .style('stroke-opacity', 0.1)
  }
}
</script>
