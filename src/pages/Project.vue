<template>
  <div class="project">
    <el-alert v-if="!hasProject"
      :title="$t('project.not_available.title')"
      type="error"
      :description=" $t('project.not_available.text')"
      show-icon
      center
      :closable="false">
    </el-alert>

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
    return !!this.project
  }
}
</script>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
