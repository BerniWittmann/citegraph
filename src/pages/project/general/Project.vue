import { ProjectStates } from '@/models/project'
<template>
  <div class="project">
    <div class="d-flex mr-5 mt-4">
      <h1>{{ project.name }}</h1>
      <v-spacer/>
      <v-btn :to="{ name: 'projects.single.edit', params: { projectId: project.id } }">
        <v-icon>mdi-pencil</v-icon>
        {{ $t('project.edit.button_text') }}
      </v-btn>
    </div>
    <v-container v-if="hasNoDataYet">
      <v-row justify="center">
        <v-col :lg="3" class="d-flex justify-center flex-column text-center">
          <empty-icon class="align-self-center mb-6"></empty-icon>
          <h3 class="headline">{{ $t('project.single.no_data.description') }}</h3>
          <p>{{ $t('project.single.no_data.import_data') }}</p>
          <v-btn color="primary" rounded large :to="{ name: 'projects.single.import', params: { projectId: project.id } }">
            {{ $t('project.single.no_data.button') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row v-if="datasetInformation">
        <v-col>
          <v-card>
            <v-card-title>{{ $t('project.single.dataset.title') }}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col v-for="(count, name) in datasetInformation" :key="name">
                    <v-card outlined class="d-flex flex-column justify-center text-center pa-5">
                      <p class="headline">{{count}}</p>
                      <p class="mb-0">{{ $t('project.single.dataset.' + name ) }}</p>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="3" md="6" cols="12" v-if="project.topAuthors">
          <v-card>
            <v-card-title>
              {{ $t('project.single.overview.top_10_authors') }}
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="author in project.topAuthors" :key="author.id" :to="{ name: 'projects.single.explore.view', params: {
                 projectId: project.id,
                 queryByType: 'author',
                 entityId: author.id
                }}">
                  {{ author.firstName }} {{ author.lastName }}
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" md="6" cols="12" v-if="project.topRecords">
          <v-card>
            <v-card-title>
              {{ $t('project.single.overview.top_10_records') }}
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="record in project.topRecords" :key="record.id" :to="{ name: 'projects.single.explore.view', params: {
                 projectId: project.id,
                 queryByType: 'record',
                 entityId: record.id
                }}">
                  {{ record.title }}
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" md="6" cols="12" v-if="project.countryRelevanceData">
          <v-card>
            <v-card-title>
              {{ $t('project.single.overview.country_relevance') }}
            </v-card-title>
            <v-card-text>
              TODO Diagram here
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" md="6" cols="12">
          <v-row no-gutters>
            <v-col v-if="project.topKeywords" class="mb-6">
              <v-card>
                <v-card-title>
                  {{ $t('project.single.overview.top_10_keywords') }}
                </v-card-title>
                <v-card-text>
                  <v-chip-group multiple column>
                    <v-chip v-for="keyword in project.topKeywords" :key="keyword">{{ keyword }}</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-if="project.counts">
              <v-card>
                <v-card-title>
                  {{ $t('project.single.overview.visualizations') }}
                </v-card-title>
                <v-card-text>
                  <div class="d-flex flex-column justify-center text-center pa-5" v-if="hasNoVisualizationsYet">
                    <p class="mb-0">{{ $t('project.single.overview.no_visualizations_yet') }}</p>
                    <v-btn color="primary" rounded>{{ $t('project.single.overview.add_visualization') }}</v-btn>
                  </div>
                  <v-card outlined class="d-flex flex-column justify-center text-center pa-5" v-else>
                    <p class="headline">{{ project.counts.visualizations }}</p>
                    <p class="mb-0">{{ $t('project.single.overview.visualizations') }}</p>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Project, { ProjectStates } from '@/models/project'
import EmptyIcon from '@/assets/svgs/Empty.vue'

@Component({
  components: {
    EmptyIcon
  }
})
export default class ProjectPage extends Vue {
  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  get datasetInformation (): Object | undefined {
    if (!this.project.counts) return undefined
    const data = { ...this.project.counts }
    delete data['visualizations']
    return data
  }

  get hasNoDataYet (): boolean {
    return this.project.state === ProjectStates.IMPORT
  }

  get hasNoVisualizationsYet (): boolean {
    return this.project.state === ProjectStates.EXPLORE
  }
}
</script>
