<template>
  <div class="visualization-view">
    <v-container v-if="hasVisualization">
      <v-row>
        <v-col class="d-flex align-center justify-space-between">
          <h1 class="display-1 mt-5">{{ $t('visualization.title', { name: visualization.name }) }}</h1>
          <v-spacer/>
          <v-btn :to="{ name: 'project.single.visualization.edit', params: $route.params }">
            <v-icon>mdi-pencil</v-icon>
            {{ $t('visualization.edit') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="hasData" justify="center">
        <v-col cols="auto">
          <component :is="currentComponent" :visualization="visualization"></component>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-col :lg="3" class="d-flex justify-center flex-column text-center">
          <empty-icon class="align-self-center mb-6"></empty-icon>
          <h3 class="headline mb-5">
            <span v-if="isProgressing">{{ $t('visualization.progressing') }}</span>
            <span v-else>{{ $t('visualization.no_data') }}</span>
          </h3>
          <v-progress-linear v-if="isProgressing" :value="progress" height="25" color="#F37F21" background-color="#FBBF35" background-opacity="0.5" rounded>
            <strong class="white--text">{{ $t('visualization.progress', { progress: progress }) }}</strong>
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmptyIcon from '@/assets/svgs/Empty.vue'
import Visualization from '@/models/visualizations/Visualization'
import WordCloud from '@/components/visualizations/view/WordCloud.vue'

const componentMap: Record<string, any> = {
  'wordcloud': WordCloud
}

@Component({
  components: {
    EmptyIcon,
    WordCloud
  }
})
export default class ViewVisualizationPage extends Vue {
  get visualization (): Visualization {
    return this.$store.getters['visualizations/currentVisualization']
  }

  get hasVisualization (): Visualization {
    return this.$store.getters['visualizations/hasCurrentVisualization']
  }

  get hasData (): boolean {
    return !!this.visualization.data && !this.isProgressing
  }

  get progress (): number {
    if (!this.visualization.progress) return 0
    return Math.round(this.visualization.progress * 100)
  }

  get isProgressing (): boolean {
    return !!this.visualization.progress && this.visualization.progress < 1
  }

  get currentComponent () {
    return componentMap[this.visualization.key]
  }
}
</script>
