<template>
  <div id="app">
    <v-layout>
      <transition name="">
        <router-view></router-view>
      </transition>
    </v-layout>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import DefaultLayout from '@/layouts/Default.vue'

@Component({
  components: {
    VLayout: DefaultLayout
  }
})
export default class App extends Vue {}
</script>
<style lang="scss">
body {
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app {
  height: 100vh;
  overflow: auto;
  display: flex;
}
</style>
