<template>
  <div class="visualization-add">
    <div class="mt-4">
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            {{ $t('visualizations.add.steps.type.title') }}
            <small>{{ $t('visualizations.add.steps.type.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2">
            {{ $t('visualizations.add.steps.general.title') }}
            <small>{{ $t('visualizations.add.steps.general.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            {{ $t('visualizations.add.steps.data.title') }}
            <small>{{ $t('visualizations.add.steps.data.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">
            {{ $t('visualizations.add.steps.parameters.title') }}
            <small>{{ $t('visualizations.add.steps.parameters.subtitle') }}</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <visualization-add-select-type-component @next-step="nextStep"></visualization-add-select-type-component>
          </v-stepper-content>

          <v-stepper-content step="2">
            Test Zwei
          </v-stepper-content>

          <v-stepper-content step="3">
            Test Drei
          </v-stepper-content>

          <v-stepper-content step="4">
            Test Vier
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VisualizationAddSelectTypeComponent from '@/components/visualizations/add/SelectType.vue'

@Component({
  components: {
    VisualizationAddSelectTypeComponent
  }
})
export default class AddVisualizationPage extends Vue {
  currentStep: number = 1
  isProcessing: boolean = false

  nextStep (): void {
    if (!this.isComplete) {
      this.currentStep++
    }
  }

  previousStep (): void {
    this.currentStep = Math.max(this.currentStep - 1, 1)
  }

  get isComplete (): boolean {
    return this.currentStep >= 4
  }
}
</script>
