<template>
  <v-container>
    <v-card class="pa-4 paper-entity-card">
      <v-card-title class="headline">
        <slot name="title"/>
        <v-spacer/>
        <v-btn :to="{ name: 'projects.single.explore.edit', params: $route.params }">
          <v-icon>mdi-pencil</v-icon>
          {{ $t('project.explore.view.edit') }}
        </v-btn>
      </v-card-title>
      <slot/>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PaperEntityLayout extends Vue {
}
</script>

<style lang="scss">
.paper-entity-card {
  .v-subheader {
    padding: 0;
  }
}
</style>
