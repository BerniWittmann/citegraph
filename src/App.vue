<template>
  <div id="app">
    <v-layout>
      <transition name="">
        <router-view></router-view>
      </transition>
    </v-layout>
  </div>
</template>
<script>
import DefaultLayout from '@/layouts/Default.vue'

export default {
  components: {
    VLayout: DefaultLayout
  }
}
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
