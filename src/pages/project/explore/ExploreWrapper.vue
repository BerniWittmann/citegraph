<template>
  <router-view/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route, Next } from 'vue-router'
import { entityKeys } from '@/models/paperEntities'

function checkQueryTypeValid (to: Route): boolean {
  const queryByType: string | undefined = to.params.queryByType
  if (queryByType && entityKeys.includes(queryByType)) {
    return true
  } else {
    throw new Error('project.explore.query_by_type_invalid')
  }
}

function beforeRouteEnterOrUpdate (to: Route, from: Route, next: Next) {
  try {
    checkQueryTypeValid(to)
    next()
  } catch (error) {
    next(error)
  }
}

@Component
export default class ExploreWrapperPage extends Vue {
  beforeRouteEnter (to: Route, from: Route, next: Next) {
    beforeRouteEnterOrUpdate(to, from, next)
  }

  beforeRouteUpdate (to: Route, from: Route, next: Next) {
    beforeRouteEnterOrUpdate(to, from, next)
  }
}
</script>
