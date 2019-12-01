<template>
  <v-container>
    <v-card class="pa-4 paper-entity-card">
      <v-card-title class="headline">
        <slot name="title"></slot>
        <v-spacer/>
        <v-btn>
          <v-icon>mdi-pencil</v-icon>
          {{ $t('project.explore.view.edit') }}
        </v-btn>
      </v-card-title>
      <slot></slot>
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
