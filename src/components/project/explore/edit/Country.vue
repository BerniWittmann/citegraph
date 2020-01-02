<template>
  <div class="project-explore-single-country-edit">
    <v-card class="pa-4">
      <v-card-title class="headline">
        <h2 class="display-5" v-once>{{country.name }}</h2>
      </v-card-title>
      <v-container>
        <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
          <v-row justify="center">
            <v-col lg="6">
              <v-text-field
                :label="$t('project.explore.edit.country.name')"
                v-model="name"
                :rules="nameRules"
                required
                autofocus/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col lg="6">
              <v-text-field
                :label="$t('project.explore.edit.country.flag_url')"
                v-model="flagUrl"
                :rules="urlRules"
                >
                <template v-slot:append>
                  <v-img v-if="flagUrl" :src="flagUrl" :lazy-src="flagUrl" max-width="30" width="30" contain>
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"/>
                      </v-row>
                    </template>
                  </v-img>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="my-10" justify="space-between">
            <v-col cols="auto">
              <v-btn rounded large color="warning" @click="back">
                <v-icon>mdi-menu-left</v-icon>
                {{ $t('project.explore.edit.back') }}
              </v-btn>
            </v-col>

            <v-col cols="auto">
              <v-btn
                rounded large
                :disabled="!valid"
                :loading="loading"
                color="success"
                type="submit"
              >{{ $t('project.explore.edit.submit') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Country from '@/models/paperEntities/country'
import DataTable from '@/components/project/explore/DataTable.vue'

@Component({
  components: {
    DataTable
  }
})
export default class CountryEditPage extends Vue {
  valid: boolean = true
  loading: boolean = false
  name: string = ''
  flagUrl?: string

  nameRules: Array<Function> = [
    (v: string | undefined) => !!v || this.$root.$t('project.explore.edit.country.name_required'),
    (v: string | undefined) => (v && v.trim().length > 0) || this.$root.$t('project.explore.edit.country.name_not_empty')
  ]

  urlRules: Array<Function> = []

  get country (): Country {
    return this.$store.getters['paperEntities/activeEntity'] as Country
  }

  beforeMount (): void {
    this.name = this.country.name
    this.flagUrl = this.country.flagUrl
  }

  async submit (): Promise<void> {
    if (!this.valid) return
    this.loading = true
    await this.$store.dispatch('paperEntities/updateEntity', {
      params: {
        projectId: this.$route.params.projectId,
        entityType: this.$route.params.queryByType,
        id: this.$route.params.entityId
      },
      data: {
        name: this.name,
        flagUrl: this.flagUrl
      }
    })
    this.loading = false
    this.$router.back()
  }

  back (): void {
    this.$router.back()
  }
}
</script>
