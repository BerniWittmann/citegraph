<template>
  <div class="visualization-add-type">
    <h1>{{ $t('visualizations.add.type.title') }}</h1>
    <v-container>
      <v-row>
        <v-col v-for="type in types" :key="type.key" cols="12" md="4">
          <v-card hover :raised="isActive(type)"
                  height="100%">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar
                class="ma-2"
                size="125"
                tile
              >
                <v-img contain :src="type.imageUrl"/>
              </v-avatar>
              <div class="flex-grow-1 d-flex flex-column align-stretch">
                <v-card-title>{{ $t(type.title) }}</v-card-title>
                <v-card-text>
                 {{ $t(type.description) }}
                </v-card-text>
                <v-divider style="width: 90%" class="mx-auto"></v-divider>
                <v-card-actions class="d-flex justify-space-around">
                  <v-btn :color="isActive(type) ? 'success' : 'primary'" text @click="choose(type)">
                    <v-icon v-if="isActive(type)">mdi-check</v-icon>
                    {{ $t(isActive(type) ? 'visualizations.add.type.chosen' : 'visualizations.add.type.choose') }}
                  </v-btn>
                  <v-menu left>
                    <template v-slot:activator="{ on }">
                      <v-btn color="#F37F21" text v-on="on">
                        {{ $t('visualizations.add.type.info') }}
                      </v-btn>
                    </template>
                    <v-card max-width="500px">
                      <v-card-title class="d-flex justify-space-between">
                        {{ $t(type.title) }}
                        <v-btn icon><v-icon >mdi-close</v-icon></v-btn>
                      </v-card-title>
                      <v-card-text class="d-flex justify-space-between align-center">
                        <v-avatar
                          class="ma-3"
                          size="175"
                          tile
                        >
                          <v-img contain :src="type.imageUrl"/>
                        </v-avatar>
                        {{ $t(type.longDescription) }}
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="my-10" justify="space-between">
      <v-col cols="auto">
        <v-btn rounded large color="warning" @click="back">
          <v-icon>mdi-menu-left</v-icon>
          {{ $t('visualizations.add.type.back') }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          rounded large
          :disabled="!hasType"
          color="success"
          @click="nextStep"
        >{{ $t('visualizations.add.type.submit') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { visualizations } from '@/models/visualizations'

@Component
export default class VisualizationEditSelectTypeComponent extends Vue {
  @Prop(String) currentType: string | undefined
  get types (): Array<any> {
    return visualizations
  }

  get hasType (): boolean {
    return !!this.currentType
  }

  choose (type: any): any {
    this.updateType(type)
  }

  @Emit('update-type')
  updateType (type: any): any {
    return type
  }

  isActive (type: any): boolean {
    return type.key === this.currentType
  }

  @Emit()
  nextStep (): void {
  }

  back (): void {
    this.$router.back()
  }
}
</script>
