<template>
  <div class="empty-slot-component-stub">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EmptySlotComponent extends Vue {}
</script>
