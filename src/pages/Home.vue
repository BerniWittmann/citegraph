<template>
  <div class="home">
    <img alt="CiteGraph logo" src="../assets/logo.png">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.text') }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
