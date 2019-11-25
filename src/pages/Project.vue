<template>
  <div class="project">
    <div class="d-flex mr-5 mt-4">
      <h1>{{ project.name }}</h1>
      <v-spacer/>
      <v-btn :to="{ name: 'projects.single.edit', params: { projectId: project.id } }">
        <v-icon>mdi-pencil</v-icon> {{ $t('project.edit.button_text') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project from '@/models/project'

@Component
export default class ProjectPage extends Vue {
  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }
}
</script>
