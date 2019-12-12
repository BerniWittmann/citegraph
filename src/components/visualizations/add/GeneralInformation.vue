<template>
  <div class="visualization-add-general">
    <h1>{{ $t('visualizations.add.general.title') }}</h1>
    <v-container>
      <v-form ref="form" @submit.prevent="submit" class="mt-12" v-model="valid">
        <v-row justify="center">
          <v-col lg="6">
            <v-text-field
              :label="$t('visualizations.add.general.name')"
              v-model="currentName"
              :rules="nameRules"
              required
              solo
              autofocus
              :hint="$t('visualizations.add.general.name_hint')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-10" justify="space-between">
          <v-col cols="auto">
            <v-btn rounded large color="warning" @click="back">
              <v-icon>mdi-menu-left</v-icon>
              {{ $t('visualizations.add.general.back') }}
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              rounded large
              :disabled="!valid"
              color="success"
              type="submit"
              @click="submit"
            >{{ $t('visualizations.add.general.submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Emit, PropSync, Vue } from 'vue-property-decorator'

@Component
export default class VisualizationAddGeneralInformationComponent extends Vue {
  @PropSync('name', { type: String }) currentName!: string
  valid: boolean = false

  nameRules: Array<Function> = [
    (v: string | undefined) => !!v || this.$root.$t('visualizations.add.general.name_required'),
    (v: string | undefined) => (v && v.trim().length > 0) || this.$root.$t('visualizations.add.general.name_not_empty')
  ]

  submit (): void {
    if (!this.valid) return
    this.nextStep()
  }

  @Emit()
  nextStep (): void {
  }

  @Emit('previous-step')
  back (): void {
  }
}
</script>
