<template>
  <div class="project-explore">
    <data-table :query-by-type="queryByType"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataTable from '@/components/project/explore/DataTable.vue'

@Component({
  components: {
    DataTable
  }
})
export default class ExplorePage extends Vue {
  get queryByType (): string {
    return this.$route.params.queryByType
  }
}
</script>
