<template>
  <div class="card__title">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class CardTitle extends Vue {

}
</script>

<style scoped>

</style>
