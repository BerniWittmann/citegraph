<template>
  <div class="project-explore">
    <data-table :query-by-type="queryByType"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { entityKeys } from '@/models/paperEntities'
import { Route, Next } from 'vue-router'
import DataTable from '@/components/project/explore/DataTable.vue'

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

@Component({
  components: {
    DataTable
  }
})
export default class ExplorePage extends Vue {
  get queryByType (): string {
    return this.$route.params.queryByType
  }

  beforeRouteEnter (to: Route, from: Route, next: Next) {
    beforeRouteEnterOrUpdate(to, from, next)
  }

  beforeRouteUpdate (to: Route, from: Route, next: Next) {
    beforeRouteEnterOrUpdate(to, from, next)
  }
}
</script>
