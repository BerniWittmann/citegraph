<template>
  <div class="project-add">
    <v-container>
      <v-row>
        <h1 class="display-1 mt-5">{{ $t('projects.add.title') }}</h1>
      </v-row>
      <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
        <v-row justify="center">
          <v-col lg="6">
            <v-text-field
              :label="$t('projects.add.name')"
              v-model="name"
              :rules="nameRules"
              required
              solo
              autofocus
              :hint="$t('projects.add.name_hint')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-5" justify="center" direction="row">
          <v-col lg="6" class="d-flex flex-row">
            <v-btn text @click="cancel">{{ $t('projects.add.cancel') }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="success"
              type="submit"
              :loading="loading"
            >{{ $t('projects.add.submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project from '@/models/project'

@Component
export default class AddProjectPage extends Vue {
  name: string = ''
  valid: boolean = false
  loading: boolean = false

  nameRules: Array<Function> = [
    (v: string | undefined) => !!v || this.$root.$t('projects.add.name_required'),
    (v: string | undefined) => (v && v.trim().length > 0) || this.$root.$t('projects.add.name_not_empty')
  ]

  async submit (): Promise<undefined> {
    if (!this.valid) return
    this.loading = true
    const data = new Project({ id: undefined, name: this.name })
    try {
      const project: Project = await this.$store.dispatch('projects/createProject', data)
      await this.$router.push({ name: 'projects.single', params: { projectId: project.id!.toString() } })
      return undefined
    } finally {
      this.loading = false
    }
  }

  cancel (): void {
    this.$router.back()
  }
}
</script>
