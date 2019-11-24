<template>
  <div class="settings">
    <h1 class="display-1 my-5">{{ $t('settings.title') }}</h1>
    <h3 class="title mb-2">{{ $t('settings.database.title') }}</h3>
    <v-btn color="warning" @click="clearDatabase">{{ $t('settings.database.clear.title') }}</v-btn>
    <p>{{ $t('settings.database.clear.hint' )}}</p>
    <v-btn color="primary" @click="reseedDatabase">{{ $t('settings.database.reseed.title') }}</v-btn>
    <p>{{ $t('settings.database.reseed.hint' )}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SettingsPage extends Vue {
  clearDatabase (): void {
    this.$store.dispatch('database/clearDatabase')
  }

  reseedDatabase (): void {
    this.$store.dispatch('database/reseedDatabase')
  }
}
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
