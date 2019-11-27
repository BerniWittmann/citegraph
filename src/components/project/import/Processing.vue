<template>
  <div class="project-import-processing">
    <h1>{{ $t('project.import.processing.title') }}</h1>

    <v-progress-linear :indeterminate="isProcessing"></v-progress-linear>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProjectImportProcessingComponent extends Vue {
  @Prop({ default: false }) readonly isProcessing!: boolean
}
</script>
