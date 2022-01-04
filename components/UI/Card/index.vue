<template>
  <div class="card">
    <div class="card__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class Card extends Vue {

}
</script>

<style scoped>

</style>
