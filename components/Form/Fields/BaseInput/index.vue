<template>
  <div class="form__field" :class="{dark}">
    <label :for="label">{{ label }}</label>
    <input
      v-bind="{...$attrs}"
      :id="label"
      class="input"
      :value="value"
      v-on="{...$listeners }"
    >

    <FAIcon v-if="icon" class="form_field-icon" :icon="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
export default class extends Vue {
  @Prop({ type: String, default: () => 'label' })
    label!:string

  @Prop({ type: [String, Array], default: () => '' })
    value!:string

  @Prop({ type: Boolean, default: () => false })
    dark!:boolean

  @Prop({ type: String, default: () => '' })
    icon!:boolean
}
</script>
