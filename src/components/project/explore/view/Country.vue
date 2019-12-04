<template>
  <div class="project-explore-single-country">
    <layout>
      <template v-slot:title>
        <v-img v-if="country.flagUrl" :src="country.flagUrl" max-width="60" width="60" contain></v-img>
        <v-sheet v-else color="grey lighten-1" class="text-center" width="60">
          <v-icon dark>mdi-help</v-icon>
        </v-sheet>
        <h2 class="display-5 ml-5">{{country.name }}</h2>
      </template>
      <v-container>
        <v-row>
          <v-col :xl="3" :lg="6">
            <v-list>
              <v-subheader class="title">{{ $t('project.explore.view.country.metrics') }}</v-subheader>
              <v-list-item>
                <v-list-item-content>{{ $t('project.explore.view.country.count_records') }}:</v-list-item-content>
                <v-list-item-content class="align-end">{{ country.countRecords }}</v-list-item-content>
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
import Country from '@/models/paperEntities/country'

@Component({
  components: {
    Layout: PaperEntityLayout
  }
})
export default class CountryViewPage extends Vue {
  get country (): Country {
    return this.$store.getters['paperEntities/activeEntity'] as Country
  }
}
</script>
