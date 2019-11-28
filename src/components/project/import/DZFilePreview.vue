<template>
  <v-sheet class="mb-2" :elevation="2">
    <v-container class="py-1">
      <v-row>
        <v-col cols="auto" class="d-flex justify-center py-0">
          <file-icon class="file-icon"/>
        </v-col>
        <v-col class="py-0">
          <v-list-item three-line>
            <v-list-item-content class="align-self-centerpy-0">
              <v-list-item-title class="title mb-1"><span data-dz-name></span></v-list-item-title>
              <v-list-item-subtitle><span data-dz-size></span></v-list-item-subtitle>
              <v-list-item-subtitle><span class="error--text" data-dz-errormessage></span></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="py-0" cols="auto">
          <v-icon @click="() => {}" large data-dz-remove>mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileIcon from '@/assets/svgs/File.vue'

@Component({
  components: {
    FileIcon
  }
})
export default class DZFilePreview extends Vue {
}
</script>

<style lang="scss" scoped>
.file-icon {
  height: 100%;
}
</style>
