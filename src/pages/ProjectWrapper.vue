<template>
  <div class="project-wrapper">
    <div v-if="!hasProject" >
      <v-alert type="error" prominent>
        {{ $t('project.not_available.text') }}
      </v-alert>

      <div class="d-flex justify-center">
        <v-btn :to="{ name: 'projects' }" x-large color="blue-grey" class="mt-2 white--text">{{ $t('project.not_available.button')}}</v-btn>
      </div>
    </div>

    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ProjectWrapperPage extends Vue {
  get hasProject (): boolean {
    return this.$store.getters['projects/hasActiveProject']
  }
}
</script>
