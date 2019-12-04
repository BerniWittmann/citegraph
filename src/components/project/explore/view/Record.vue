<template>
  <div class="project-explore-single-record">
    <layout>
      <template v-slot:title>
        <h2 class="display-5">{{ record.title }}</h2>
      </template>
      <v-container>
        <v-row>
          <v-col>
            <v-subheader class="title">{{ $t('project.explore.view.record.authors') }}</v-subheader>
            <v-chip-group column>
              <v-chip v-for="(author, index) in record.authors" :key="index"
                      :to="{ name: 'projects.single.explore.view', params: { ...$route.params, queryByType: 'author', entityId: author.id } }">
                {{ author.firstName }} {{ author.lastName }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col :cols="2">
            <v-card class="justify-center text-center pa-2 py-3">
              <b class="display-1 primary--text font-weight-black">{{ record.numberCitations }}</b>
              <p class="headline">{{ $t('project.explore.view.record.citations') }}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-subheader class="title">{{ $t('project.explore.view.record.year') }}</v-subheader>
            <p>{{ record.year }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-subheader class="title">{{ $t('project.explore.view.record.keywords') }}</v-subheader>
            <v-chip-group column>
              <v-chip v-for="(keyword, index) in record.keywords" small :key="index">{{ keyword }}</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-container>
    </layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PaperEntityLayout from '@/layouts/PaperEntity.vue'
import Record from '@/models/paperEntities/record'

@Component({
  components: {
    Layout: PaperEntityLayout
  }
})
export default class RecordViewPage extends Vue {
  get record (): Record {
    return this.$store.getters['paperEntities/activeEntity'] as Record
  }
}
</script>
