<template>
  <v-slide-y-transition group class="toast-container">
    <toast v-for="toast in toasts" :key="toast.id" :toast="toast"></toast>
  </v-slide-y-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toast from '@/models/toast'
import ToastComponent from '@/components/Toast.vue'

@Component({
  components: { Toast: ToastComponent }
})
export default class ToastsContainer extends Vue {
  get toasts (): Array<Toast> {
    return this.$store.getters['toasts/toasts']
  }
}
</script>

<style lang="scss">
.toast-container {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
