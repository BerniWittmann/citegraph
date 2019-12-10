<template>
  <div class="visualizations">
    <v-container>
      <v-row>
        <h1 class="display-1 mt-5">{{ $t('visualizations.your_visualizations') }}</h1>
      </v-row>
      <v-row v-if="visualizations.length > 0">
        <v-col
          v-for="visualization in visualizations"
          :key="visualization.id"
          cols="3"
        >
          <visualization-card :visualization="visualization"></visualization-card>
        </v-col>

        <v-col
          key="add"
          cols="3"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-card
                min-height="130"
                outlined
                height="100%"
                :hover="true"
                v-on="on"
                class="d-flex justify-center align-center text--primary add-card"
                :to="{ name: 'project.single.visualizations.add', params: $route.params }"
              >
                <v-icon color="primary">mdi-plus</v-icon>
              </v-card>
            </template>
            <span>{{ $t('visualizations.add.title') }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-col :lg="3" class="d-flex justify-center flex-column text-center">
          <empty-icon class="align-self-center mb-6"></empty-icon>
          <h3 class="headline">{{ $t('visualizations.add.description') }}</h3>
          <p>{{ $t('visualizations.add.text') }}</p>
          <v-btn color="primary" rounded large :to="{ name: 'project.single.visualizations.add', params: $route.params }">
            <v-icon>mdi-plus</v-icon>
            {{ $t('visualizations.add.title') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmptyIcon from '@/assets/svgs/Empty.vue'
import Visualization from '../../models/visualizations/Visualization'
import VisualizationCard from '@/components/visualizations/VisualizationCard.vue'

@Component({
  components: {
    VisualizationCard,
    EmptyIcon
  }
})
export default class VisualizationsPage extends Vue {
  get visualizations (): Array<Visualization> {
    return this.$store.getters['visualizations/visualizations']
  }
}
</script>

<style lang="scss">
.add-card.v-card.theme--light.v-card--outlined {
  background-color: rgba($primary_color, 0.2);
  border: 1px rgba($primary_color, 0.7) dashed;
}
</style>
