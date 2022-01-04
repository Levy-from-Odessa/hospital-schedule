<template>
  <div class="header">
    <div class="header__title">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HeaderTitle extends Vue {
}
</script>

<style scoped>

</style>
