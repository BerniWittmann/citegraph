<template>
  <div class="project">
    <v-alert v-if="!hasProject" type="error" prominent>
      {{ $t('project.not_available') }}
    </v-alert>

    <div v-if="hasProject">
      <h1>{{ project.name }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project from '@/models/project'

@Component
export default class ProjectPage extends Vue {
  get project (): Project | undefined {
    return this.$store.getters['projects/activeProject']
  }

  get hasProject (): boolean {
    return this.$store.getters['projects/hasActiveProject']
  }
}
</script>
