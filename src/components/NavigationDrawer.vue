<template>
  <v-navigation-drawer app v-model="visible" :clipped="$vuetify.breakpoint.lgAndUp">
    <div v-if="hasProject">
      <v-list-item class="mt-12" :to="{ name: 'projects.single', params: { projectId: project.id } }">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ project.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          key="import"
          :to="{ name: 'projects.single.import', params: { projectId: project.id } }"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-cloud-upload</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation-drawer.import') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          key="explore"
          :value="isOnExplorePage"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t('navigation-drawer.explore.title') }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="queryByType in queryByTypes" :key="queryByType"
                       :to="{ name: 'projects.single.explore', params: { projectId: project.id, queryByType: queryByType } }">
            <v-list-item-content>
              <v-list-item-title>{{ $t('navigation-drawer.explore.query_by_type.' + queryByType) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          key="visualize"
          link
          :to="{ name: 'projects.single.visualizations', params: { projectId: project.id } }"
        >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation-drawer.visualize') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </div>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-list subheader dense>
        <v-subheader>{{ $t('citegraph') }}</v-subheader>
        <v-list-item
          :to="{ name: 'about' }"
          key="help"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-help-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation-drawer.help') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'settings' }"
          key="settings"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation-drawer.settings') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
import Project from '@/models/project'
import { entityKeys } from '@/models/paperEntities'
import { isExploreRoute } from '@/common/helpers'

@Component
export default class NavigationDrawer extends Vue {
  @PropSync('drawerVisible', { type: Boolean }) visible!: boolean | undefined

  get queryByTypes (): Array<string> {
    return entityKeys
  }

  get project (): Project | undefined {
    return this.$store.getters['projects/activeProject']
  }

  get hasProject (): boolean {
    return this.$store.getters['projects/hasActiveProject']
  }

  get isOnExplorePage (): boolean {
    return isExploreRoute(this.$route)
  }
}
</script>

<style scoped lang="scss">
</style>
