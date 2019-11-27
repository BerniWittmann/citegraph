<template>
  <div class="project-import">
    <div class="mt-4">
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            {{ $t('project.import.steps.upload.title') }}
            <small>{{ $t('project.import.steps.upload.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2">
            {{ $t('project.import.steps.processing.title') }}
            <small>{{ $t('project.import.steps.processing.subtitle') }}</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="isComplete" :color="isComplete ? 'green' : 'primary'" step="3">
            <div :class="{ 'success--text': isComplete, 'd-flex': true, 'flex-column': true }">
              {{ $t('project.import.steps.done.title') }}
              <small>{{ $t('project.import.steps.done.subtitle') }}</small>
            </div>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <project-import-upload-component @next-step="nextStep"></project-import-upload-component>
          </v-stepper-content>

          <v-stepper-content step="2">
            <project-import-processing-component :is-processing="isProcessing" @next-step="nextStep"></project-import-processing-component>
          </v-stepper-content>

          <v-stepper-content step="3">
            <project-import-done-component @first-step="firstStep"></project-import-done-component>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project from '@/models/project'
import ProjectImportUploadComponent from '@/components/project/import/Upload.vue'
import ProjectImportProcessingComponent from '@/components/project/import/Processing.vue'
import ProjectImportDoneComponent from '@/components/project/import/Done.vue'

@Component({
  components: {
    ProjectImportUploadComponent,
    ProjectImportProcessingComponent,
    ProjectImportDoneComponent
  }
})
export default class ImportPage extends Vue {
  currentStep: number = 1
  isProcessing: boolean = false

  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  nextStep (): void {
    if (!this.isComplete) {
      this.currentStep++
      if (this.currentStep === 2) {
        this.startProcessing()
      }
    }
  }

  get isComplete (): boolean {
    return this.currentStep >= 3
  }

  startProcessing (): void {
    this.isProcessing = true
    setTimeout(this.finishProcessing, 4000)
  }

  finishProcessing (): void {
    this.isProcessing = false
    this.nextStep()
  }

  firstStep (): void {
    this.currentStep = 1
  }
}
</script>
