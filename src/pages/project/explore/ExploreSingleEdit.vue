<template>
  <div>
    <component v-if="currentComponent" :is="currentComponent"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CountryEditPage from '@/components/project/explore/edit/Country.vue'
import AuthorEditPage from '@/components/project/explore/edit/Author.vue'

const components: Record<string, any> = {
  country: CountryEditPage,
  author: AuthorEditPage
}

@Component({
  components: {
    CountryEditPage,
    AuthorEditPage
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
