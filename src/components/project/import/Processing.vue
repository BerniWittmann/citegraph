<template>
  <div class="project-import-processing">
    <h1>{{ $t('project.import.processing.title') }}</h1>

    <v-container class="mb-4 d-flex justify-center">
      <v-progress-linear class="my-10" style="width: 80%" :indeterminate="isProcessing"></v-progress-linear>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProjectImportProcessingComponent extends Vue {
  @Prop({ default: false }) readonly isProcessing!: boolean
}
</script>
