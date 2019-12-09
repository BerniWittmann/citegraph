<template>
  <v-card style="width: 100%">
    <v-card-title>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <h1 class="display-1">
            {{ displayedTitle }}
          </h1>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="currentOptions.search"
            append-icon="mdi-magnify"
            :label="$t('project.explore.table.search' )"
            single-line
            hide-details
            clearable
            class="pt-0 mt-0"
          >
            <template v-slot:append-outer>
              <v-menu :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    icon
                  >
                    <v-icon>
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-subheader>
                    {{ $t('project.explore.table.search_by_title') }}
                  </v-subheader>
                  <v-list-item
                    v-for="(header, index) in searchByOptions"
                    :key="index"
                  >
                    <v-checkbox v-model="currentOptions.searchBy" :label="header.text" :value="header.value"></v-checkbox>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <p class="mb-0">{{ $t('project.explore.table.total_items', { number: Math.max(totalItemCount, 0) } ) }}</p>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :loading="loading"
      style="width: 100%"
      :headers="currentHeaders"
      :items="items"
      :page.sync="currentOptions.page"
      :items-per-page.sync="currentOptions.itemsPerPage"
      @update:options="updateOptions"
      disable-filtering
      :server-items-length="totalItemCount"
      @click:row="handleRowClick"
    >
      <template v-slot:item.authors="{ item }">
        <expandable-chip-group :small="true" :contents="getAuthorNames(item)" color="#F37F21" :dark="true"
                               more-chip-color="#FBBF35"></expandable-chip-group>
      </template>
      <template v-slot:item.keywords="{ item }">
        <expandable-chip-group :small="true" :contents="item.keywords"></expandable-chip-group>
      </template>
      <template v-slot:item.flagUrl="{ item }">
        <v-img v-if="item.flagUrl" :src="item.flagUrl" :width="40" class="mx-auto"></v-img>
      </template>

      <template v-slot:no-data>
        <empty-icon class="my-6"></empty-icon>
        <p v-if="currentHeaders.length > 0">{{ $t('project.explore.table.no_data') }}</p>
        <p v-else>{{ $t('project.explore.table.no_headers') }}</p>
      </template>

      <template v-slot:top>
        <div class="ml-auto px-6" style="width: max-content">
          <v-select
            v-model="selectedHeaders"
            :items="headers"
            chips
            item-text="text"
            item-value="value"
            :label="$t('project.explore.table.columns')"
            multiple
            small-chips
            deletable-chips
            prepend-icon="mdi-view-column"
          ></v-select>
        </div>
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
import ExpandableChipGroup from '@/components/ExpandableChipGroup.vue'
import EmptyIcon from '@/assets/svgs/Empty.vue'

type UpdateOptions = {
  page: number
  itemsPerPage: number
  sortBy: string[]
  sortDesc: boolean[],
  search?: string
  searchBy?: string[]
}

@Component({
  components: {
    ExpandableChipGroup,
    EmptyIcon
  }
})
export default class DataTable extends Vue {
  loading: boolean = false
  currentOptions: UpdateOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    sortDesc: [],
    search: '',
    searchBy: []
  }
  selectedHeaders: Array<string> = []

  @Prop(String) readonly queryByType!: string
  @Prop() readonly title: string | undefined
  @Prop() readonly belongsTo: string | undefined
  @Prop() readonly belongsToType: string | undefined

  get displayedTitle () {
    return this.title ? this.title : this.$t('project.explore.title.query_by_type.' + this.queryByType)
  }

  get entityClass () {
    return entityKeysMap[this.queryByType]
  }

  get items (): Array<PaperEntity> {
    if (this.currentHeaders.length === 0) {
      return []
    }
    return this.$store.getters['paperEntities/entities']
  }

  get currentHeaders (): Array<PaperEntityTableColumn> {
    const selectedItems = this.selectedHeaders
    return selectedItems.map((key) => {
      return this.headerMap[key]
    }).filter(val => !!val)
  }

  get headerMap (): Record<string, PaperEntityTableColumn> {
    const map: Record<string, PaperEntityTableColumn> = {}
    this.headers.forEach((header) => {
      map[header.value] = header
    })
    return map
  }

  get headers (): Array<PaperEntityTableColumn> {
    return this.entityClass.displayedColumns.map((header) => ({
      ...header,
      text: this.$t(header.text).toString()
    }))
  }

  get searchByOptions (): Array<PaperEntityTableColumn> {
    return this.headers.filter((header) => header.filterable)
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
    const filterByString = this.currentOptions.searchBy && this.currentOptions.searchBy.length > 0 ? this.currentOptions.searchBy.join(' ') : undefined
    await this.$store.dispatch('paperEntities/fetchEntities', {
      projectId: this.project.id,
      entityType: this.queryByType,
      perPage: this.currentOptions.itemsPerPage,
      pageOffset: this.currentOptions.page - 1,
      filter: this.currentOptions.search,
      filterBy: filterByString,
      sortBy: sortString,
      belongsTo: this.belongsTo,
      belongsToType: this.belongsToType
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

  @Watch('currentOptions.searchBy')
  handleSearchBy (newVal: Array<string>, oldVal: Array<string>): void {
    if (deepEqual(newVal, oldVal)) return
    this.loading = true
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
    this.currentOptions.searchBy = []
    this.currentOptions.sortBy = []
    this.currentOptions.sortDesc = []
    this.initializeHeaders()
    this.reloadData()
  }

  getAuthorNames (item: any): Array<string> {
    if (!item.authors) return []
    return item.authors.map((author: Author) => this.getAuthorDisplayName(author))
  }

  getAuthorDisplayName (author: Author): string {
    return `${author.firstName.substring(0, 1)}. ${author.lastName}`
  }

  handleRowClick (item: PaperEntity): void {
    this.$router.push({
      name: 'projects.single.explore.view',
      params: {
        ...this.$route.params,
        entityId: item.id
      }
    })
  }

  initializeHeaders (): void {
    this.selectedHeaders = this.headers.filter((header) => header.displayedByDefault).map((header) => header.value)
  }

  beforeMount (): void {
    this.initializeHeaders()
  }
}
</script>
