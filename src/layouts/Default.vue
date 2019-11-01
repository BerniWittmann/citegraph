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
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    VNavigation: Navigation,
    VFooter: Footer
  }
}
</script>
