<template>
  <div class="visualization-add-data">
    <h1>{{ $t('visualizations.add.data.title') }}</h1>
    <v-container fluid>
      <v-row>
        <v-col lg="2" cols="12">
          <h4>{{ $t('visualizations.add.data.choose_type') }}</h4>
          <v-list>
            <v-list-item-group
              v-model="dataType"
              mandatory
              color="primary"
            >
              <v-list-item
                v-for="queryByType in queryByTypes" :key="queryByType"
                :value="queryByType"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('visualizations.add.data.data_types.' + queryByType) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col lg="7" cols="12" v-if="canSelectByYear">
          <visualization-data-selection-bar-chart
            :entity-type="$t('visualizations.add.data.data_types.' + dataType)"
            :entity-data="entitiesAggregatedByYear"
            :time-periods="timePeriodData"
          ></visualization-data-selection-bar-chart>
        </v-col>
        <v-col lg="3" cols="12" v-if="canSelectByYear">
          <h4>{{ $t('visualizations.add.data.set_time_period') }}</h4>
          <v-container fluid>
            <v-row v-for="(timePeriod, index) in timePeriods" :key="timePeriod.id" align="center">
              <v-col cols="3">
                <v-text-field
                  :label="$t('visualizations.add.data.period.from')"
                  :placeholder="$t('visualizations.add.data.period.enter_year')"
                  type="number"
                  :min="1970"
                  :max="currentYear"
                  :rules="yearRules"
                  v-model.number="timePeriod.min"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  :label="$t('visualizations.add.data.period.until')"
                  :placeholder="$t('visualizations.add.data.period.enter_year')"
                  type="number"
                  :min="1970"
                  :max="currentYear"
                  :rules="yearRules"
                  v-model.number="timePeriod.max"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">
                {{ $t('visualizations.add.data.period.elements', { count: timePeriod.count }) }}
              </v-col>
              <v-col cols="auto">
                <v-btn icon @click="removeTimePeriod(index)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="addTimePeriod">{{ $t('visualizations.add.data.period.add') }}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-container>
        <v-row class="my-10" justify="space-between">
          <v-col cols="auto">
            <v-btn rounded large color="warning" @click="back">
              <v-icon>mdi-menu-left</v-icon>
              {{ $t('visualizations.add.data.back') }}
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              rounded large
              color="success"
              type="submit"
              @click="nextStep"
            >{{ $t('visualizations.add.data.next') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import Visualization from '@/models/visualizations/Visualization'
import { entityKeys, entityKeysMap, PaperEntityFields } from '@/models/paperEntities'
import VisualizationDataSelectionBarChart from '@/components/charts/VisualizationDataSelectionBarChart.vue'
import Project from '@/models/project'

interface timePeriod {
  id: number
  min?: number,
  max?: number,
  count: number
}

@Component({
  components: {
    VisualizationDataSelectionBarChart
  }
})
export default class VisualizationAddChooseDataComponent extends Vue {
  @Prop() readonly visualization!: Visualization
  dataType: string = this.queryByTypes[0]
  timePeriodData: Array<timePeriod> = []
  nextTimePeriodNumber: number = 1

  yearRules: Array<Function> = [
    (v: number | undefined) => !!v || this.$root.$t('visualizations.add.data.period.year_required'),
    (v: number) => (v >= 1970) || this.$root.$t('visualizations.add.data.period.year_min'),
    (v: number) => (v <= this.currentYear) || this.$root.$t('visualizations.add.data.period.year_max')
  ]

  get entitiesAggregatedByYear (): Record<string, number> {
    const aggregation: Record<string, number> = {}
    this.entities.forEach((entity) => {
      if (!entity.year) return
      if (aggregation.hasOwnProperty(entity.year)) {
        aggregation[entity.year] = aggregation[entity.year] + 1
      } else {
        aggregation[entity.year] = 1
      }
    })
    return aggregation
  }

  get timePeriods (): Array<timePeriod> {
    return this.timePeriodData.map((timePeriod) => {
      if (!timePeriod.max || !timePeriod.min) return timePeriod
      if (timePeriod.min > timePeriod.max) return timePeriod
      let count = 0

      for (const year in this.entitiesAggregatedByYear) {
        if (parseInt(year) >= timePeriod.min && parseInt(year) <= timePeriod.max) {
          count += this.entitiesAggregatedByYear[year]
        }
      }
      return {
        ...timePeriod,
        count
      }
    })
  }

  get queryByTypes (): Array<string> {
    return entityKeys
  }

  get canSelectByYear (): boolean {
    return entityKeysMap[this.dataType].queryFields.includes('year')
  }

  get currentYear (): number {
    return (new Date()).getFullYear()
  }

  @Emit()
  nextStep (): void {
  }

  @Emit('previous-step')
  back (): void {
  }

  get entities (): Array<PaperEntityFields> {
    return this.$store.getters['paperEntities/entities']
  }

  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  @Watch('dataType')
  async loadData (): Promise<void> {
    if (!this.canSelectByYear) return
    await this.$store.dispatch('paperEntities/fetchEntities', {
      projectId: this.project.id,
      entityType: this.dataType
    })
  }

  addTimePeriod (): void {
    this.timePeriodData.push({
      id: this.nextTimePeriodNumber,
      count: 0,
      min: undefined,
      max: undefined
    })
    this.nextTimePeriodNumber++
  }

  removeTimePeriod (index: number): void {
    this.timePeriodData.splice(index, 1)
  }

  beforeMount () {
    this.loadData()
  }
}
</script>
