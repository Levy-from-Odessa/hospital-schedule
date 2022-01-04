<template>
  <div class="card__subtitle">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class CardSubtitle extends Vue {

}
</script>

<style scoped>

</style>
