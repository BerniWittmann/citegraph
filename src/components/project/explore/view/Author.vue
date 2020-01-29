<template>
  <div class="project-explore-single-author" v-if="author">
    <layout>
      <template v-slot:title>
        <v-avatar color="primary" class="mr-5" size="62">
          <b class="white--text">{{ initials }}</b>
        </v-avatar>
        <h2 class="display-5">{{ author.firstName }} {{ author.lastName }}</h2>
      </template>
      <v-container>
        <v-row>
          <v-col :xl="3" :lg="6">
            <v-list>
              <v-subheader class="title">{{ $t('project.explore.view.author.metrics') }}</v-subheader>
              <v-list-item>
                <v-list-item-content>{{ $t('project.explore.view.author.count_records') }}:</v-list-item-content>
                <v-list-item-content class="align-end">{{ author.countRecords }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <data-table belongs-to-type="author" :belongs-to="author.id" query-by-type="record"></data-table>
        </v-row>
      </v-container>
    </layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PaperEntityLayout from '@/layouts/PaperEntity.vue'
import Author from '@/models/paperEntities/author'
import DataTable from '@/components/project/explore/DataTable.vue'

@Component({
  components: {
    DataTable,
    Layout: PaperEntityLayout
  }
})
export default class AuthorViewPage extends Vue {
  get author (): Author {
    return this.$store.getters['paperEntities/activeEntity'] as Author
  }

  get initials (): string {
    return ((this.author.firstName ? this.author.firstName.substring(0, 1) : '') + (this.author.lastName ? this.author.lastName.substring(0, 1) : '')).toUpperCase()
  }
}
</script>
