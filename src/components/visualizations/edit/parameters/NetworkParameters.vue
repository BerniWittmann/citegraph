<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
      <v-row justify="center">
        <v-col lg="6">
          <v-slider
            v-model="visualization.parameters.pruneLeastCitedPercentage"
            :label="$t('visualizations.add.parameters.network.prune_least_cited', { percent: visualization.parameters.pruneLeastCitedPercentage })"
            :min="0"
            :max="100"
            thumb-label="always"
          ></v-slider>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col lg="6">
          <p>{{ $t('visualizations.add.parameters.network.weights') }}</p>
          <v-slider
            v-model="visualization.parameters.bibliographicCouplingWeight"
            :min="0"
            :max="100"
            thumb-label="always"
          >
            <template v-slot:prepend>
              <span class="">{{ $t('visualizations.add.parameters.network.bibliographic_coupling_weight', { percent: visualization.parameters.bibliographicCouplingWeight })}}</span>
            </template>
            <template v-slot:append>
              <span class="">
                 {{ $t('visualizations.add.parameters.network.textual_coupling_weight', { percent: 100 - visualization.parameters.bibliographicCouplingWeight })}}
              </span>
            </template>
          </v-slider>
        </v-col>
      </v-row>
      <v-row class="my-10" justify="space-between">
        <v-col cols="auto">
          <v-btn rounded large color="warning" @click="back">
            <v-icon>mdi-menu-left</v-icon>
            {{ $t('visualizations.add.parameters.back') }}
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            rounded large
            :disabled="!valid"
            color="success"
            type="submit"
          >{{ $t('visualizations.add.parameters.submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import NetworkVisualization from '@/models/visualizations/NetworkVisualization'

@Component
export default class NetworkParameters extends Vue {
  @Prop() readonly visualization!: NetworkVisualization

  valid: boolean = false

  submit (): void {
    if (!this.valid) return
    this.emitSubmit()
  }

  @Emit('submit')
  emitSubmit (): void {

  }

  @Emit()
  back (): void {
  }
}
</script>
