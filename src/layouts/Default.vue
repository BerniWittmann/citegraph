<template>
  <v-app>
    <navigation-drawer :drawer-visible.sync="drawerVisible"/>

    <app-bar @toggle-drawer="toggleDrawer"/>

    <!-- Main application Content -->
    <v-content>
      <v-container fluid id="main-content">
        <slot></slot>
      </v-container>
    </v-content>

    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AppBar from '@/components/AppBar.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import Footer from '@/components/Footer.vue'
import { Route } from 'vue-router'
import { isProjectRoute } from '@/common/helpers'

@Component({
  components: {
    AppBar,
    NavigationDrawer,
    AppFooter: Footer
  }
})
export default class DefaultLayout extends Vue {
  drawerVisible: boolean = true

  toggleDrawer () {
    this.drawerVisible = !this.drawerVisible
  }

  @Watch('$route')
  onRouteChange (to: Route, from: Route) {
    const toIsProjectRoute = isProjectRoute(to)
    const fromIsProjectRoute = isProjectRoute(from)
    if (!from.name || toIsProjectRoute !== fromIsProjectRoute) {
      this.drawerVisible = toIsProjectRoute
    }
  }
}
</script>
