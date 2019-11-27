<template>
  <div class="project-import-done">
    <h1>{{ $t('project.import.done.title') }}</h1>
    <div class="my-10 d-flex justify-space-around">
      <v-btn rounded large color="warning" @click="addMore">
        {{ $t('project.import.done.add_more') }}
      </v-btn>
      <v-btn rounded large color="primary">{{ $t('project.import.done.explore') }}</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import Project from '@/models/project'

@Component
export default class ProjectImportDoneComponent extends Vue {
  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  @Emit('first-step')
  addMore (): void {}
}
</script>
