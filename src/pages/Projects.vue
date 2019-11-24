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
            class="project-card d-flex flex-column"
            height="100%"
          >
            <v-card-text @click="openProject(project)" class="flex-grow-1">
              <p class="title text--primary mb-0">
                {{ project.name }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="primary accent-4"
                @click="openProject(project)"
              >
                {{ $t('projects.open_project') }}
              </v-btn>
              <v-spacer></v-spacer>

              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                  >
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-list-item v-on="on">
                        <v-list-item-title class="error--text">{{ $t('project.delete.button_text') }}
                        </v-list-item-title>
                      </v-list-item>
                    </template>

                    <v-card>
                      <v-card-text>
                        {{ $t('project.delete.confirm_text') }}
                      </v-card-text>
                      <v-card-actions>
                        <v-btn text>{{ $t('project.delete.cancel') }}</v-btn>
                        <v-spacer/>
                        <v-btn color="error" @click="deleteProject(project)">{{ $t('project.delete.confirm') }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          key="add"
          cols="3"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-card
                min-height="130"
                outlined
                height="100%"
                :hover="true"
                v-on="on"
                class="d-flex justify-center align-center text--primary add-card"
                :to="{ name: 'projects.add' }"
              >
                <v-icon color="primary">mdi-plus</v-icon>
              </v-card>
            </template>
            <span>{{ $t('projects.add.title') }}</span>
          </v-tooltip>
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

  openProject (project: Project): void {
    this.$store.dispatch('projects/openProject', project).then(() => {
      this.$router.push({ name: 'projects.single', params: { projectId: project.id!.toString() } })
    })
  }

  deleteProject (project: Project): void {
    this.$store.dispatch('projects/deleteProject', project)
  }
}
</script>

<style lang="scss">
.add-card.v-card.theme--light.v-card--outlined {
  background-color: rgba($primary_color, 0.2);
  border: 1px rgba($primary_color, 0.7) dashed;
}
</style>
