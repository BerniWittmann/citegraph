<template>
  <div class="about">
    <img alt="CiteGraph logo" src="../assets/logo.png">
    <h1>{{ $t('about.title') }}</h1>
    <p>{{ $t('about.text') }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AboutPage extends Vue {}
</script>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
