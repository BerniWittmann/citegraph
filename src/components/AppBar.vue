<template>
  <v-app-bar
    app
    dark
    :clipped-left="breakPoint"
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title @click="$router.push('/').catch(() => {})">{{ $t('citegraph') }}</v-toolbar-title>

    <v-tabs
      align-with-title
      background-color="transparent"
      optional
      @change="onProjectChange"
      ref="projectTabs"
    >
      <v-tab :to="{ name: 'projects' }" key="projects">
        <v-icon class="mr-2">mdi-view-dashboard</v-icon>
        {{ $t('projects.title') }}
      </v-tab>

      <v-hover v-slot:default="{ hover }"
               v-for="project in projects"
               :key="project.id">
        <v-tab
          :to="{ name: 'projects.single', params: { projectId: project.id } }"
        >
          {{ project.name }}
          <v-icon v-show="isActiveProject(project)" small class="ml-2" @click.stop.prevent="closeProject(project)">
            mdi-close
          </v-icon>
        </v-tab>
      </v-hover>
    </v-tabs>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project from '@/models/project'
import { isProjectRoute } from '@/common/helpers'

@Component
export default class AppBar extends Vue {
  get breakPoint (): boolean {
    return this.$vuetify.breakpoint.lgAndUp
  }

  get projects (): Array<Project> {
    return this.$store.getters['projects/openProjects']
  }

  toggleDrawer (): void {
    this.$emit('toggle-drawer')
  }

  isActiveProject (project: Project): boolean {
    if (!isProjectRoute(this.$route) || !project.id || !this.$route.params.projectId) {
      return false
    }
    return project.id.toString() === this.$route.params.projectId.toString()
  }

  onProjectChange (): void {
    // @ts-ignore
    this.$nextTick(this.$refs.projectTabs.callSlider)
  }

  closeProject (project: Project): void {
    this.$router.replace({ name: 'projects' })
    this.$store.dispatch('projects/closeProject', project)
  }
}
</script>

<style lang="scss">
.v-toolbar__title {
  flex-shrink: 0;
}
</style>
