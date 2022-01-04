<template>
  <form role="form" autocomplete="new">
    <template v-for="(schemaItem, keyItem) in schema">
      <component
        :is="schemaItem.component"
        :id="keyItem"
        :key="keyItem"
        :class="{ error: hasErrors[keyItem]}"
        class="form_field"
        :name="schemaItem.label || keyItem"
        :value="value[keyItem]"
        :form="form"
        v-bind="{ ...schemaItem }"
        @input="inputHandler(keyItem, $event)"
      />
    </template>
    <template v-for="(schemaItem, keyItem) in schema">
      <div v-if="hasErrors[keyItem]" :key="keyItem" class="error">
        {{ errorMessages[keyItem] }}
      </div>
    </template>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import { FormFieldNames, IValidate } from './types'

import ValidationRules from '~/utils/ValidationRules'

export enum SaveRecordType {
  UPDATE = 'update',
  CREATE = 'create',
}
Component.registerHooks(['validations'])
@Component({
  name: 'ValidationForm',
  components: {
    [FormFieldNames.BaseInput]: () => import('./Fields/BaseInput/index.vue'),
    [FormFieldNames.BaseTextArea]: () => import('./Fields/BaseTextArea/index.vue'),
    [FormFieldNames.BaseCalendar]: () => import('./Fields/BaseCalendar/index.vue'),
    [FormFieldNames.BaseSelect]: () => import('./Fields/BaseSelect/index.vue')
  },
  mixins: [validationMixin]
})
export default class ValidationForm extends Vue {
  @Prop({ type: Object, required: true })
    schema!: any

  @Prop({ type: Object, required: true })
    value!: any

  form: {[key: string]: any} = {}

  validations (): { form: IValidate } {
    return { form: ValidationRules(this.schema) }
  }

  inputHandler (key: string, e: Event): void {
    const inputVal = (e as unknown as HTMLInputElement).value || (e.target as HTMLInputElement).value

    this.$emit('input', {
      ...this.value,
      [key]: inputVal
    })
  }

  get hasErrors (): { [key: string]: boolean } {
    const errors = {} as { [key: string]: boolean }
    Object.keys(this.schema).forEach((key) => {
      const error = this.$v.form[key]?.$error
      const dirty = this.$v.form[key]?.$dirty
      errors[key] = (dirty && error) || false
    })
    return errors
  }

  get errorMessages (): { [key: string]: string } {
    return Object.keys(this.schema).reduce(
      (messages: { [key: string]: string }, key) => {
        const form = this.$v.form[key]
        const rules = this.schema[key].validations
        const rulesKeys = rules && Object.keys(rules)

        if (!rulesKeys || !form || !rules) {
          return messages
        }

        for (const rule of rulesKeys) {
          // go thought all form rules
          if (!form[rule]) {
            // if the condition is not satisfied
            const message = rules[rule].message

            messages = {
              ...messages,
              [key]: message
            }
          }
        }
        return messages
      },
      {}
    )
  }

  @Watch('value', { deep: true, immediate: true })
  onValueChanged (newValue: { [key: string]: string }): void {
    this.createEmptyForm()
    this.inzialeForm(newValue)
  }

  createEmptyForm (): void {
    if (Object.keys(this.form).length > 0) {
      for (const name in this.form) {
        this.$set(this.form, name, null)
      }
    } else {
      for (const name in this.schema) {
        this.$set(this.form, name, null)
      }
    }
  }

  inzialeForm (newValue: { [key: string]: string }): void {
    Object.keys(newValue).forEach((key) => {
      this.form[key] = newValue[key]
    })
  }

  // FORM
  // handlers which touch, validate and clear form
  validateForm (): Promise<{
    item: any;
    type: SaveRecordType;
  }> {
    console.log('VALIDATE ASYNC FORM ')

    return new Promise((resolve, reject) => {
      const form = this.$v.form

      form.$touch()

      const item = form.$model

      if (!form.$invalid) {
        const type = this.value.id
          ? SaveRecordType.UPDATE
          : SaveRecordType.CREATE
        this.onSendForm(resolve, item, type)
      } else {
        this.onErrorForm(reject)
      }
    })
  }

  onSendForm (
    resolve: (value: { item: any; type: SaveRecordType }) => void,
    item: any,
    type: SaveRecordType = SaveRecordType.CREATE
  ): void {
    resolve({ item, type })
  }

  onErrorForm (reject: (value: unknown) => void): void {
    reject('VALIDATION ERROR')
  }

  onClearForm (): void {
    this.$v.$reset()
    this.$nextTick(() => {
      // Object.keys(this.form).forEach((key) => {
      // delete this.form[key]
      this.$emit('input', {})
    })
    // })
  }
}
</script>
<style lang="scss">
.form_field {
  position: relative;
  &.error{
    input{
      background:red !important;
    }
  }
  &-icon{
    position:absolute;
    top: 35px;
    right: 10px;
    font-size: 22px;

  }
}
.error{
  margin-top: 15px;
  color: red;
}
</style>
