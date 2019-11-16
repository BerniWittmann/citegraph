<template>
  <v-footer
    app
    inset
  >
    <v-spacer></v-spacer>
    <div>{{ $t('footer.version', { version: version }) }}</div>
  </v-footer>
</template>

<style scoped lang="scss">
</style>
<script lang="ts">
import packageInfo from '@/../package.json'

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  get version (): string {
    return packageInfo.version
  }
}
</script>
