<template>
  <div class="project-import-upload">
    <h1>{{ $t('project.import.upload.title') }}</h1>

    <v-container class="mb-4" fluid>
      <v-row class="mb-4">
        <v-col class="mr-4">
          <v-skeleton-loader
            v-if="isLoading"
            type="image"
            min-height="300"
          ></v-skeleton-loader>

          <vue-dropzone v-else ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" use-custom-slot
                        :include-styling="false"
                        @vdropzone-success="finishedUpload"
                        @vdropzone-success-multiple="finishedUpload" duplicate-check>
            <v-hover v-slot:default="{ hover }" class="mx-3">
              <v-sheet color="grey lighten-4" min-height="300" width="100%"
                       class="d-flex flex-column justify-center align-center upload-drop-zone"
                       :elevation="hover ? 6 : 0">
                <p class="text--primary title mt-12">{{ $t('project.import.upload.drop.title')}}</p>
                <v-btn color="primary" rounded dark class="mb-12">
                  <v-icon>mdi-plus</v-icon>
                  {{ $t('project.import.upload.drop.button_text') }}
                </v-btn>
                <p class="file-type-hint">{{ $t('project.import.upload.drop.file_type_hint') }}</p>
              </v-sheet>
            </v-hover>
          </vue-dropzone>
        </v-col>

        <v-col class="ml-4">
          <div id="dropzone-previews"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-spacer></v-spacer>

        <v-btn
          v-if="hasFiles"
          color="primary"
          @click="nextStep"
          x-large
          class="mr-10"
        >
          <v-icon>mdi-play</v-icon>
          {{ $t('project.import.upload.import') }}
        </v-btn>
      </v-row>

    </v-container>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import DZFilePreview from '@/components/project/import/DZFilePreview.vue'

@Component({
  components: {
    DZFilePreview
  }
})
export default class ProjectImportUploadComponent extends Vue {
  isLoading: boolean = true
  previewHTML: string | undefined = undefined
  hasFiles: boolean = false

  get dropzoneOptions (): Object {
    return {
      url: 'https://httpbin.org/post',
      acceptedFiles: 'text/csv',
      previewsContainer: '#dropzone-previews',
      previewTemplate: this.previewHTML
    }
  }

  finishedUpload (): void {
    this.hasFiles = true
  }

  @Emit()
  nextStep (): void {
  }

  created () {
    const ComponentClass = Vue.extend(DZFilePreview)
    const instance = new ComponentClass()
    instance.$mount()
    this.previewHTML = instance.$el.outerHTML

    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
.project-import-upload {
  .upload-drop-zone {
    transition: box-shadow .28s cubic-bezier(.4, 0, .2, 1);
    will-change: box-shadow;
    cursor: pointer;
  }
}
</style>
