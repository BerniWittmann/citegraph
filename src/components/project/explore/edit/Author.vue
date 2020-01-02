<template>
  <div class="project-explore-single-author-edit">
    <v-card class="pa-4">
      <v-card-title class="headline">
        <h2 class="display-5" v-once>{{ author.firstName }} {{ author.lastName }}</h2>
      </v-card-title>
      <v-container>
        <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
          <v-row justify="center">
            <v-col lg="6">
              <v-text-field
                :label="$t('project.explore.edit.author.first_name')"
                v-model="firstName"
                :rules="nameRules"
                required
                autofocus/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col lg="6">
              <v-text-field
                :label="$t('project.explore.edit.author.last_name')"
                v-model="lastName"
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
import Author from '@/models/paperEntities/author'

@Component
export default class AuthorEditPage extends Vue {
  valid: boolean = true
  loading: boolean = false
  firstName: string = ''
  lastName: string = ''

  nameRules: Array<Function> = [
    (v: string | undefined) => !!v || this.$root.$t('project.explore.edit.author.name_required'),
    (v: string | undefined) => (v && v.trim().length > 0) || this.$root.$t('project.explore.edit.author.name_not_empty')
  ]

  urlRules: Array<Function> = []

  get author (): Author {
    return this.$store.getters['paperEntities/activeEntity'] as Author
  }

  beforeMount (): void {
    this.firstName = this.author.firstName
    this.lastName = this.author.lastName
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
        firstName: this.firstName,
        lastName: this.lastName
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
