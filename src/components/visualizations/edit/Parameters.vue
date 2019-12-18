<template>
  <div class="visualization-add-parameters">
    <h1>{{ $t('visualizations.add.parameters.title') }}</h1>
    <v-container>
      <v-row>
        <v-col>
          <component :is="currentComponent" :visualization="visualization" @back="back" @submit="submit"></component>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import Visualization from '@/models/visualizations/Visualization'
import BarChartParameters from '@/components/visualizations/edit/parameters/BarChartParameters.vue'
import WordCloudParameters from '@/components/visualizations/edit/parameters/WordCloudParameters.vue'

const componentMap: Record<string, any> = {
  'barchart': BarChartParameters,
  'wordcloud': WordCloudParameters
}

@Component({
  components: {
    BarChartParameters,
    WordCloudParameters
  }
})
export default class VisualizationEditParametersComponent extends Vue {
  @Prop() readonly visualization!: Visualization

  get currentComponent () {
    return componentMap[this.visualization.key]
  }

  @Emit()
  nextStep (): void {
  }

  @Emit('previous-step')
  back (): void {}

  submit (): void {
    this.nextStep()
  }
}
</script>
