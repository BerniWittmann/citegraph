<template>
  <div class="project-explore-single-record-edit">
    <v-card class="pa-4">
      <v-card-title class="headline">
        <h2 class="display-5" v-once>{{record.title }}</h2>
      </v-card-title>
      <v-container>
        <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
          <v-row justify="center">
            <v-col lg="6">
              <v-text-field
                :label="$t('project.explore.edit.record.title')"
                v-model="title"
                :rules="nameRules"
                required
                autofocus/>
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
import Record from '@/models/paperEntities/record'

@Component
export default class RecordEditPage extends Vue {
  valid: boolean = true
  loading: boolean = false
  title: string = ''

  nameRules: Array<Function> = [
    (v: string | undefined) => !!v || this.$root.$t('project.explore.edit.record.name_required'),
    (v: string | undefined) => (v && v.trim().length > 0) || this.$root.$t('project.explore.edit.record.name_not_empty')
  ]

  get record (): Record {
    return this.$store.getters['paperEntities/activeEntity'] as Record
  }

  beforeMount (): void {
    this.title = this.record.title
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
        title: this.title
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
