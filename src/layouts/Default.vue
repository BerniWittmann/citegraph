<template>
  <el-container>
    <el-header>
      <v-navigation></v-navigation>
    </el-header>
    <el-main>
      <!-- Page Content -->
      <slot></slot>
    </el-main>
    <el-footer>
      <v-footer></v-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    VNavigation: Navigation,
    VFooter: Footer
  }
})
export default class DefaultLayout extends Vue {}
</script>
