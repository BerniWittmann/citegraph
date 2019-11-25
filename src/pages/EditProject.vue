<template>
  <div class="project-edit">
    <v-container>
      <v-row>
        <h1 class="display-1 mt-5" v-once>{{ $t('project.edit.title', { name: project.name }) }}</h1>
      </v-row>

      <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
        <v-row justify="center">
          <v-col lg="6">
            <v-text-field
              :label="$t('project.edit.name')"
              v-model="name"
              :rules="nameRules"
              required
              solo
              autofocus
              :hint="$t('project.edit.name_hint')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-5" justify="center" direction="row">
          <v-col lg="6" class="d-flex flex-row">
            <v-btn text @click="cancel">{{ $t('project.edit.cancel') }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="success"
              type="submit"
              :loading="loading"
            >{{ $t('project.edit.submit') }}
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
export default class EditProjectPage extends Vue {
  name: string = ''
  valid: boolean = false
  loading: boolean = false

  nameRules: Array<Function> = [
    (v: string | undefined) => !!v || this.$root.$t('project.edit.name_required'),
    (v: string | undefined) => (v && v.trim().length > 0) || this.$root.$t('project.edit.name_not_empty')
  ]

  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  async submit (): Promise<undefined> {
    if (!this.valid) return
    this.loading = true
    const data = this.project!
    data.name = this.name
    try {
      const project: Project = await this.$store.dispatch('projects/updateProject', data)
      await this.$router.push({ name: 'projects.single', params: { projectId: project.id!.toString() } })
      return undefined
    } finally {
      this.loading = false
    }
  }

  cancel (): void {
    this.$router.back()
  }

  mounted () {
    this.name = this.project.name
  }
}
</script>
