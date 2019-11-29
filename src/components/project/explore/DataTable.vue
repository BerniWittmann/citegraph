<template>
  <v-card style="width: 100%">
    <v-card-title>
      <h1 class="display-1 my-5">
        {{ $t('project.explore.title.query_by_type.' + queryByType ) }}
      </h1>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="currentOptions.search"
        append-icon="mdi-magnify"
        :label="$t('project.explore.table.search' )"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      style="width: 100%"
      :headers="headers"
      :items="items"
      :page.sync="currentOptions.page"
      :items-per-page.sync="currentOptions.itemsPerPage"
      @update:options="updateOptions"
      disable-filtering
      :server-items-length="totalItemCount"
    ></v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { entityKeysMap, PaperEntity, PaperEntityTableColumn } from '@/models/paperEntities'
import { debounce } from 'debounce'
import Project from '@/models/project'
import deepEqual from 'deep-equal'

type UpdateOptions = {
  page: number
  itemsPerPage: number
  sortBy: string[]
  sortDesc: boolean[],
  search?: string
}

@Component
export default class DataTable extends Vue {
  loading: boolean = false
  currentOptions: UpdateOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    sortDesc: [],
    search: ''
  }

  @Prop(String) readonly queryByType!: string

  get entityClass () {
    return entityKeysMap[this.queryByType]
  }

  get items (): Array<PaperEntity> {
    return this.$store.getters['paperEntities/entities']
  }

  get headers (): Array<PaperEntityTableColumn> {
    return this.entityClass.displayedColumns.map((header) => ({
      ...header,
      text: this.$t(header.text).toString()
    }))
  }

  get project (): Project {
    return this.$store.getters['projects/activeProject']
  }

  get totalItemCount (): number {
    return this.$store.getters['paperEntities/entityCount']
  }

  async reloadData (): Promise<void> {
    this.loading = true
    await this.$store.dispatch('paperEntities/fetchEntities', {
      projectId: this.project.id,
      entityType: this.queryByType,
      perPage: this.currentOptions.itemsPerPage,
      pageOffset: this.currentOptions.page - 1,
      filter: this.currentOptions.search
    })
    this.loading = false
  }

  get debouncedReloadData (): Function {
    return debounce(this.reloadData, 300)
  }

  @Watch('currentOptions.search')
  handleSearch (newVal: string): void {
    if (newVal === this.currentOptions.search) return
    this.loading = true
    this.currentOptions.search = newVal
    this.currentOptions.page = 1
    this.debouncedReloadData()
  }

  updateOptions (options: UpdateOptions): void {
    if (deepEqual(options, this.currentOptions)) return
    this.loading = true
    this.currentOptions = {
      ...this.currentOptions,
      ...options
    }
    this.debouncedReloadData()
  }

  @Watch('queryByType')
  updateQueryByType (): void {
    this.currentOptions.page = 1
    this.currentOptions.itemsPerPage = 10
    this.currentOptions.search = ''
    this.currentOptions.sortBy = []
    this.currentOptions.sortDesc = []
    this.reloadData()
  }
}
</script>
