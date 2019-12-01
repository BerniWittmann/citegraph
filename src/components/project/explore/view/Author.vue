<template>
  <div class="project-explore-single-author">
    <layout>
      <template v-slot:title>
        <v-avatar color="primary" class="mr-5" size="62">
          <b class="white--text">{{ initials }}</b>
        </v-avatar>
        <h2 class="display-5">{{ author.firstName }} {{ author.lastName }}</h2>
      </template>
      <v-container>
        <v-row>
          <v-col :cols="3">
            <v-list>
              <v-subheader class="title">{{ $t('project.explore.view.author.metrics') }}</v-subheader>
              <v-list-item>
                <v-list-item-content>{{ $t('project.explore.view.author.count_records') }}:</v-list-item-content>
                <v-list-item-content class="align-end">{{ author.countRecords }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PaperEntityLayout from '@/layouts/PaperEntity.vue'
import Author from '@/models/paperEntities/author'

@Component({
  components: {
    Layout: PaperEntityLayout
  }
})
export default class AuthorViewPage extends Vue {
  get author (): Author {
    return this.$store.getters['paperEntities/activeEntity'] as Author
  }

  get initials (): string {
    return (this.author.firstName.substring(0, 1) + this.author.lastName.substring(0, 1)).toUpperCase()
  }
}
</script>
