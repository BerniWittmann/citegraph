<template>
  <v-container>
    <v-row align="start">
      <v-col md="3" sm="12" order-sm="last" order-md="first">
        <v-card>
          <v-card-title>{{ $t('visualization.network.cluster_title') }}</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-center">{{ $t('visualization.network.cluster_id') }}</th>
                  <th class="text-center">{{ $t('visualization.network.cluster_color') }}</th>
                  <th class="text-center">{{ $t('visualization.network.cluster_node_count') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="id in clusterIds" :key="id">
                  <td class="text-center">{{ id }}</td>
                  <td class="d-flex justify-center align-center">
                    <div :style="'width: 10px; height: 10px; border-radius: 50%; background-color: ' + getColorForClusterId(id) + ';'"/>
                  </td>
                  <td class="text-center">{{ nodesByCluster[id].length }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>

          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="9" class="d-flex justify-center" sm="12" order-sm="first" order-md="last">
        <v-card class="pa-5">
          <div ref="vis"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

  get nodesByCluster (): Record<number, Array<NetworkVisualizationDataNode>> {
    const result: Record<number, Array<NetworkVisualizationDataNode>> = {}
    this.nodes.forEach((node) => {
      if (result.hasOwnProperty(node.cluster)) {
        result[node.cluster].push(node)
      } else {
        result[node.cluster] = [node]
      }
    })
    return result
  }

  getColorForClusterId (id: number): string {
    return d3.interpolateViridis(id / this.countClusters)
  }

  get clusterIds (): Array<number> {
    return Object.keys(this.nodesByCluster).map(id => parseInt(id))
  }

  scaleX (x: number): number {
    return Math.round(x / this.maxX * ((this.width / 2) - this.padding))
  }

  scaleY (y: number): number {
    return Math.round(y / this.maxY * ((this.height / 2) - this.padding))
  }

  mounted () {
    const svg = d3.select(this.$refs.vis as HTMLElement).append('svg')
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
