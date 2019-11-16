<template>
  <layout>
    <router-view></router-view>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DefaultLayout from '@/layouts/Default.vue'

@Component({
  components: {
    Layout: DefaultLayout
  }
})
export default class App extends Vue {}
</script>
