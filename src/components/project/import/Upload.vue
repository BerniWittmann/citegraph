<template>
  <div class="project-import-upload">
    <h1>{{ $t('project.import.upload.title') }}</h1>

    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" use-custom-slot class="mb-4"
                  @vdropzone-success="finishedUpload"
                  @vdropzone-success-multiple="finishedUpload" duplicate-check>
      <p class="text--primary title">{{ $t('project.import.upload.drop.title')}}</p>
      <v-btn color="primary" rounded dark>
        <v-icon>mdi-plus</v-icon>
        {{ $t('project.import.upload.drop.button_text') }}
      </v-btn>
    </vue-dropzone>

    <v-btn
      v-if="hasFiles"
      color="primary"
      @click="nextStep"
    >
      <v-icon>mdi-play</v-icon>
      {{ $t('project.import.upload.import') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import Project from '@/models/project'

@Component
export default class ProjectImportUploadComponent extends Vue {
  hasFiles: boolean = false
  dropzoneOptions: Object = {
    url: 'https://httpbin.org/post',
    acceptedFiles: 'text/csv',
    addRemoveLinks: true
  }

  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  get url (): string {
    return 'http://www.mocky.io/v2/5dde8d47310000d3253ae32f'
  }

  finishedUpload () : void {
    this.hasFiles = true
  }

  @Emit()
  nextStep (): void {
  }
}
</script>
