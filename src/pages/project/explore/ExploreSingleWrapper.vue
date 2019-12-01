<template>
  <div class="project-explore-single-wrapper">
    <div v-if="!hasEntity" >
      <v-alert type="error" prominent>
        {{ $t('project.explore.entity_not_available.text') }}
      </v-alert>

      <div class="d-flex justify-center">
        <v-btn @click="goBack" x-large color="blue-grey" class="mt-2 white--text">{{ $t('project.explore.entity_not_available.button')}}</v-btn>
      </div>
    </div>

    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route, Next } from 'vue-router'
import store from '@/plugins/store'

async function beforeRouteEnterOrUpdate (to: Route, from: Route, next: Next) {
  try {
    await store.dispatch('paperEntities/fetchEntity', {
      projectId: to.params.projectId,
      entityType: to.params.queryByType,
      id: to.params.entityId
    })
    next()
  } catch (error) {
    next(error)
  }
}

@Component
export default class ExploreSingleWrapperPage extends Vue {
  get hasEntity (): boolean {
    return this.$store.getters['paperEntities/hasActiveEntity']
  }

  async beforeRouteEnter (to: Route, from: Route, next: Next) {
    await beforeRouteEnterOrUpdate(to, from, next)
  }

  async beforeRouteUpdate (to: Route, from: Route, next: Next) {
    await beforeRouteEnterOrUpdate(to, from, next)
  }

  goBack (): void {
    this.$router.back()
  }
}
</script>
