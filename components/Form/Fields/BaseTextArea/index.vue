<template>
  <div class="form__field" :class="{dark}">
    <label :for="label">{{ label }}</label>
    <textarea
      v-bind="{...$attrs}"
      :id="label"
      class="input"
      :value="value"
      v-on="{...$listeners }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
export default class extends Vue {
  @Prop({ type: String, default: () => 'label' })
    label!:string

  @Prop({ type: String, default: () => '' })
    value!:string

  @Prop({ type: Boolean, default: () => false })
    dark!:boolean
}
</script>

<style scoped lang="scss">
</style>
