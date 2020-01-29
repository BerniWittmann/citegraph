<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="pa-5">
          <div ref="vis"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import WordCloudVisualization, {
  WordCloudDataPoint
} from '@/models/visualizations/WordCloudVisualization'
import * as d3 from 'd3'
import cloud from 'd3-cloud'

@Component
export default class WordCloud extends Vue {
  @Prop() readonly visualization!: WordCloudVisualization

  width = 500
  height = 500
  layout: any

  get diagramData (): Array<WordCloudDataPoint> {
    return this.visualization.data!.data
  }

  draw (words: any): void {
    const fill = d3.scaleOrdinal(d3.schemeCategory10)
    const svg = d3.select(this.$refs.vis as HTMLElement).append('svg')
      .attr('width', this.layout.size()[0])
      .attr('height', this.layout.size()[1])

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.layout.size()[0] / 2 + ',' + this.layout.size()[1] / 2 + ')')

    g.selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', (d: any) => d.size + 'px')
      .style('font-family', 'Impact')
      .style('fill', (d: any, i: number) => fill(i.toString()))
      .attr('text-anchor', 'middle')
      .attr('transform', (d: any) => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
      .text((d: any) => d.text)
  }

  mounted () {
    this.layout = cloud()
      .size([this.width, this.height])
      .words(this.diagramData.map(function (d: WordCloudDataPoint) {
        return { text: d.word, size: d.weight }
      }))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font('Arial')
      .spiral('rectangular')
      .fontSize((d: any) => d.size)
      .on('end', this.draw)
    this.layout.start()
  }
}
</script>
