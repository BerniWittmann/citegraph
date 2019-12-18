<template>
  <div class="visualization-add">
    <div class="mt-4">
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1" :editable="furthestStep > 0">
            {{ $t('visualizations.add.steps.type.title') }}
            <small>{{ $t('visualizations.add.steps.type.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2" :editable="furthestStep > 1">
            {{ $t('visualizations.add.steps.general.title') }}
            <small>{{ $t('visualizations.add.steps.general.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 3" step="3" :editable="furthestStep > 2">
            {{ $t('visualizations.add.steps.data.title') }}
            <small>{{ $t('visualizations.add.steps.data.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 4" step="4" :editable="furthestStep > 3">
            {{ $t('visualizations.add.steps.parameters.title') }}
            <small>{{ $t('visualizations.add.steps.parameters.subtitle') }}</small>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <visualization-edit-select-type-component
              :current-type="currentType"
              @next-step="nextStep"
              @update-type="updateType"
            ></visualization-edit-select-type-component>
          </v-stepper-content>

          <v-stepper-content step="2">
            <visualization-edit-general-information-component
              :name="visualization.name"
              @update:name="updateName"
              @next-step="nextStep"
              @previous-step="previousStep"></visualization-edit-general-information-component>
          </v-stepper-content>

          <v-stepper-content step="3">
            <visualization-edit-choose-data-component
              ref="chooseDataComponent"
              :visualization="visualization"
              @next-step="nextStep"
              @previous-step="previousStep"
            ></visualization-edit-choose-data-component>
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
import VisualizationEditSelectTypeComponent from '@/components/visualizations/edit/SelectType.vue'
import VisualizationEditGeneralInformationComponent from '@/components/visualizations/edit/GeneralInformation.vue'
import Visualization from '@/models/visualizations/Visualization'
import { visualizations } from '@/models/visualizations'
import VisualizationEditChooseDataComponent from '@/components/visualizations/edit/ChooseData.vue'

@Component({
  components: {
    VisualizationEditSelectTypeComponent,
    VisualizationEditGeneralInformationComponent,
    VisualizationEditChooseDataComponent
  }
})
export default class EditVisualizationPage extends Vue {
  currentStep: number = 1
  furthestStep: number = 1
  isProcessing: boolean = false
  hasChosenType: boolean = false
  visualization: Visualization = new visualizations[0]({
    name: ''
  })

  nextStep (): void {
    if (!this.isComplete) {
      this.currentStep++
    }
    this.setFurthestStep()
    if (this.currentStep === 3) {
      this.$nextTick(() => {
        // @ts-ignore
        this.$refs.chooseDataComponent.updateChart()
      })
    }
  }

  setFurthestStep (): void {
    this.furthestStep = Math.max(this.currentStep, this.furthestStep)
  }

  previousStep (): void {
    this.currentStep = Math.max(this.currentStep - 1, 1)
  }

  get isComplete (): boolean {
    return this.currentStep >= 4
  }

  get currentType (): string | undefined {
    if (!this.hasChosenType) return undefined
    return this.visualization.key
  }

  updateType (Type: any): void {
    this.visualization = new Type(this.visualization)
    this.hasChosenType = true
  }

  updateName (name: string): void {
    this.visualization.name = name
  }

  get hasCurrentVisualization (): boolean {
    return this.$store.getters['visualizations/hasCurrentVisualization']
  }

  get currentVisualization (): Visualization | undefined {
    return this.$store.getters['visualizations/currentVisualization']
  }

  beforeMount (): void {
    if (this.hasCurrentVisualization) {
      this.visualization = this.currentVisualization!
      this.hasChosenType = true
    }
  }
}
</script>
