<template>
  <v-chip-group :dark="dark" :text-color="dark ? 'white' : undefined">
    <v-chip :small="small" :color="color" v-for="(content, index) in displayedContents" :key="index">{{ content }}
    </v-chip>
    <v-menu
      :close-on-content-click="false"
      :open-on-hover="true"
      v-if="hasMoreContentThanMax"
    >
      <template v-slot:activator="{ on }">
        <v-chip v-on="on" :small="small" :dark="dark" :color="moreChipColor">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-chip>
      </template>
      <v-card class="pl-2">
        <v-chip-group :dark="dark" :text-color="dark ? 'white' : undefined" column>
          <v-chip :small="small" :color="color" v-for="(content, index) in hiddenContents" :key="index">
            {{ content }}
          </v-chip>
        </v-chip-group>
      </v-card>
    </v-menu>
  </v-chip-group>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ExpandableChipGroup extends Vue {
  @Prop({ default: [] }) readonly contents!: Array<string>
  @Prop({ default: 2 }) readonly maxDisplayed!: 2
  @Prop() readonly color: string | undefined
  @Prop() readonly moreChipColor: string | undefined
  @Prop({ default: false }) readonly dark!: boolean
  @Prop({ default: false }) readonly small!: boolean

  get displayedContents (): Array<string> {
    return this.contents.slice(0, this.maxDisplayed)
  }

  get hiddenContents (): Array<string> {
    return this.contents.slice(this.maxDisplayed)
  }

  get hasMoreContentThanMax (): boolean {
    return this.contents.length > this.maxDisplayed
  }
}
</script>
