<template>
  <div>
    <component v-if="currentComponent" :is="currentComponent"></component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataTable from '@/components/project/explore/DataTable.vue'
import RecordViewPage from '@/components/project/explore/view/Record.vue'
import AuthorViewPage from '@/components/project/explore/view/Author.vue'
import CountryViewPage from '@/components/project/explore/view/Country.vue'

const components: Record<string, any> = {
  record: RecordViewPage,
  author: AuthorViewPage,
  country: CountryViewPage
}

@Component({
  components: {
    DataTable
  }
})
export default class ExploreSinglePage extends Vue {
  get currentComponent () {
    return components[this.queryByType]
  }

  get queryByType (): string {
    return this.$route.params.queryByType
  }
}
</script>
