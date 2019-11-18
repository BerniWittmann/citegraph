<template>
  <div class="projects">
    <v-container>
      <v-row>
        <h1 class="display-1 mt-5">{{ $t('projects.your_projects') }}</h1>
      </v-row>
      <v-row>
        <v-col
          v-for="project in projects"
          :key="project.id"
          cols="3"
        >
          <v-card
            :hover="true"
            class="project-card"
          >
            <v-card-text>
              <p class="title text--primary">
                {{ project.name }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="primary accent-4"
                :to="{ name: 'projects.single', params: { projectId: project.id } }"
              >
                {{ $t('projects.open_project') }}
              </v-btn>
              <v-spacer></v-spacer>

              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                  >
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title class="error--text">{{ $t('project.delete') }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          key="add"
          cols="3"
        >
          <v-card
            min-height="130"
            outlined
            height="100%"
            :hover="true"
            class="d-flex justify-center align-center text--primary add-card"
            :to="{ name: 'projects.add' }"
          >
            <v-icon color="primary">mdi-plus</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project from '@/models/project'

@Component
export default class ProjectsPage extends Vue {
  get projects (): Array<Project> {
    return this.$store.getters['projects/projects']
  }
}
</script>

<style lang="scss">
.add-card.v-card.theme--light.v-card--outlined {
  background-color: rgba($primary_color, 0.2);
  border: 1px rgba($primary_color, 0.7) dashed;
}
</style>
