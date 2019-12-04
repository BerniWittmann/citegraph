<template>
  <div class="about">
    <img alt="CiteGraph logo" src="../assets/logo.png">
    <h1>{{ $t('about.title') }}</h1>
    <p>{{ $t('about.text') }}</p>
    <p>{{ $t('about.version', { version: version }) }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import packageInfo from '@/../package.json'

@Component
export default class AboutPage extends Vue {
  get version (): string {
    return packageInfo.version
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
