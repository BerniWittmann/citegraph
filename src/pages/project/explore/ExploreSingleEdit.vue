<template>
  <div>
    <component v-if="currentComponent" :is="currentComponent"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CountryEditPage from '@/components/project/explore/edit/Country.vue'
import AuthorEditPage from '@/components/project/explore/edit/Author.vue'
import RecordEditPage from '@/components/project/explore/edit/Record.vue'

const components: Record<string, any> = {
  country: CountryEditPage,
  author: AuthorEditPage,
  record: RecordEditPage
}

@Component({
  components: {
    CountryEditPage,
    AuthorEditPage,
    RecordEditPage
  }
})
export default class ExploreSingleEditPage extends Vue {
  get currentComponent () {
    return components[this.queryByType]
  }

  get queryByType (): string {
    return this.$route.params.queryByType
  }
}
</script>
