<template>
  <div class="form__field" :class="{dark}">
    <label :for="label">{{ label }}</label>
    <select
      v-bind="{...$attrs}"
      :id="label"
      class="input"
      :value="value"
      v-on="{...$listeners}"
    >
      <option v-for="item in items" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <FAIcon v-if="icon" class="form__field-icon" :icon="icon" />
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

  @Prop({ type: Array, default: () => [] })
    items!:Array<string>

  @Prop({ type: Boolean, default: () => false })
    dark!:boolean

  @Prop({ type: String, default: () => '' })
    icon!:boolean
}
</script>

<style scoped lang="scss">
</style>
