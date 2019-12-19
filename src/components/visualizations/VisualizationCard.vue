<template>
  <v-card :hover="true"
          class="visualization-card"
          height="100%">
    <div class="d-flex flex-wrap justify-space-between">
      <div class="ma-3 flex-shrink-0 flex-grow-1 d-flex justify-center">
        <v-avatar
          size="100"
          tile
        >
          <v-img contain :src="imageUrl"/>
        </v-avatar>
      </div>
      <div class="flex-grow-1 d-flex flex-column align-center">
        <v-card-title>{{ visualization.name }}</v-card-title>
        <v-card-text class="progress-information text-center">
          <span v-if="isLoading">{{ $t('visualizations.card.processing', { percent: progress }) }}</span>
          <span v-else>{{ $t('visualizations.card.ready') }}</span>
        </v-card-text>
        <v-divider style="width: 90%" class="mx-auto"></v-divider>
        <v-card-actions>
          <v-btn color="primary" text :to="{ name: 'project.single.visualization', params: { projectId: $route.params.projectId, visualizationId: visualization.id } }">
            {{ $t('visualizations.card.show') }}
          </v-btn>
          <v-btn color="primary" text :to="{ name: 'project.single.visualization.edit', params: { projectId: $route.params.projectId, visualizationId: visualization.id } }">
            {{ $t('visualizations.card.edit') }}
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <v-progress-linear color="#F37F21" background-color="#FBBF35" background-opacity="0.5" v-show="isLoading" class="progress" :value="progress" :max="100"></v-progress-linear>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Visualization from '../../models/visualizations/Visualization'
import { visualizationsKeyMap } from '@/models/visualizations'

@Component
export default class VisualizationCard extends Vue {
  @Prop() readonly visualization!: Visualization

  get visualizationClass () {
    return visualizationsKeyMap[this.visualization.key]
  }

  get imageUrl (): string {
    return `${process.env.BASE_URL}${this.visualizationClass.imageUrl}`
  }

  get progress (): number {
    return this.visualization.progress ? this.visualization.progress * 100 : 0
  }

  get isLoading (): boolean {
    return !!this.visualization.progress && (this.progress < 100)
  }
}
</script>

<style scoped lang="scss">
.progress-information {
  color: #F37F21;
}
</style>
