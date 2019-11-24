<template>
  <v-snackbar
    class="toast"
    v-model="visible"
    :color="toast.severity"
    :right="true"
    :timeout="toast.delay"
    :top="true"
    @input="close"
  >
    <v-icon dark>
      {{ toast.icon }}
    </v-icon>

    {{ $t(toast.text) }}
    <v-btn
      icon
      @click="close"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Toast from '@/models/toast'

@Component
export default class ToastComponent extends Vue {
  @Prop(Toast) readonly toast!: Toast
  visible: boolean = false

  mounted () {
    this.visible = true
  }

  close (): void {
    this.visible = false
    this.$store.dispatch('toasts/removeToast', this.toast)
  }
}
</script>

<style lang="scss">
.toast.v-snack {
  position: relative;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
