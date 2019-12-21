<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as d3 from 'd3'
import NetworkVisualization, {
  NetworkVisualizationData,
  NetworkVisualizationDataNode
} from '@/models/visualizations/NetworkVisualization'

@Component
export default class Network extends Vue {
  @Prop() readonly visualization!: NetworkVisualization

  width: number = 400
  height: number = 400
  padding: number = 10

  get diagramData (): NetworkVisualizationData {
    return this.visualization.data!
  }

  get nodes (): Array<NetworkVisualizationDataNode> {
    return this.diagramData.data.nodes
  }

  get maxX (): number {
    return Math.max(...this.nodes.map(n => Math.abs(n.x)))
  }

  get maxY (): number {
    return Math.max(...this.nodes.map(n => Math.abs(n.y)))
  }

  get countClusters (): number {
    return this.diagramData.data.nodes.reduce((max, node) => {
      return (node.cluster > max) ? node.cluster : max
    }, 0)
  }

  scaleX (x: number): number {
    return Math.round(x / this.maxX * ((this.width / 2) - this.padding))
  }

  scaleY (y: number): number {
    return Math.round(y / this.maxY * ((this.height / 2) - this.padding))
  }

  mounted () {
    const svg = d3.select(this.$el).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')')

    g.selectAll('circle .node')
      .data(this.nodes)
      .enter()
      .append('svg:circle')
      .attr('class', 'node')
      .attr('cx', (d: NetworkVisualizationDataNode) => this.scaleX(d.x))
      .attr('cy', (d: NetworkVisualizationDataNode) => this.scaleY(d.y))
      .attr('r', '5px')
      .style('fill', (d: NetworkVisualizationDataNode) => d3.interpolateViridis(d.cluster / this.countClusters))
      .style('fill-opacity', '1')
  }
}
</script>
