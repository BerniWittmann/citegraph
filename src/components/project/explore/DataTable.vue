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
    >
      <template v-slot:item.authors="{ item }">
        <v-chip class="mx-1" v-for="(author, index) in item.authors" :key="`${item.id}_${author.id}_${index}`" small>{{ getAuthorDisplayName(author) }}</v-chip>
      </template>
      <template v-slot:item.keywords="{ item }">
        <v-chip class="mx-1" v-for="(keyword, index) in item.keywords" :key="`${item.id}_${index}`" small>{{ keyword }}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { entityKeysMap, PaperEntity, PaperEntityTableColumn } from '@/models/paperEntities'
import { debounce } from 'debounce'
import Project from '@/models/project'
import deepEqual from 'deep-equal'
import Author from '@/models/paperEntities/author'

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
    const isSorted = this.currentOptions.sortBy.length > 0 && this.currentOptions.sortDesc.length > 0
    const sortString = isSorted ? `${this.currentOptions.sortBy[0]}_${this.currentOptions.sortDesc[0] ? 'DESC' : 'ASC'}` : undefined
    await this.$store.dispatch('paperEntities/fetchEntities', {
      projectId: this.project.id,
      entityType: this.queryByType,
      perPage: this.currentOptions.itemsPerPage,
      pageOffset: this.currentOptions.page - 1,
      filter: this.currentOptions.search,
      sortBy: sortString
    })
    this.loading = false
  }

  get debouncedReloadData (): Function {
    return debounce(this.reloadData, 300)
  }

  @Watch('currentOptions.search')
  handleSearch (newVal: string, oldVal: string): void {
    if (newVal === oldVal) return
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

  getAuthorDisplayName (author: Author): string {
    return `${author.firstName.substring(0, 1)}. ${author.lastName}`
  }
}
</script>
