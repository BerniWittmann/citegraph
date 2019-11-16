<template>
  <v-app-bar
    app
    dark
    :clipped-left="breakPoint"
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title @click="$router.push('/')">{{ $t('citegraph') }}</v-toolbar-title>

    <template v-slot:extension>
      <v-tabs
        align-with-title
        background-color="transparent"
      >
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBar extends Vue {
  get breakPoint (): boolean {
    return this.$vuetify.breakpoint.lgAndUp
  }

  toggleDrawer () {
    this.$emit('toggle-drawer')
  }
}
</script>

<style scoped lang="scss">
</style>
