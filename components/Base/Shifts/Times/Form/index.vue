<template>
  <div class="times">
    <UICardSubtitle>
      {{ date.formated }}
      <FAIcon icon="times" class="btn" @click="$emit('delete')" />
    </UICardSubtitle>
    <div class="times_card">
      <ValidationForm
        ref="form1"
        :value="value"
        class="times_card-top"
        :schema="timeSchema"
        @input="$emit('input', $event)"
      />
      <ValidationForm
        ref="form2"
        :value="value"
        :schema="typeSchema"
        @input="$emit('input', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { FormFieldNames } from '~/components/Form/types'

import { IDay } from '@/models/IDay'
import { ITime } from '@/models/ITime'

import ValidationForm from '@/components/Form/index.vue'
@Component({
  components: {
    ValidationForm
  }
})
export default class extends Vue {
  @Prop({ type: Object, default: () => ({}) })
    date!:IDay

  @Prop({ type: Object, default: () => ({}) })
    value!: ITime

  @Ref() form1!:ValidationForm
  @Ref() form2!:ValidationForm
  async validateForm () : Promise<ITime> {
    try {
      const item1 = await this.form1.validateForm()
      const item2 = await this.form2.validateForm()
      return {
        ...item1.item,
        ...item2.item,
        date: this.date
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  onClearForm () {
    this.form1.onClearForm()
    this.form2.onClearForm()
  }

  typeSchema = {
    type: {
      label: 'type',
      dark: true,
      icon: 'chevron-down',
      items: ['Consultation', 'Telephone', 'Ambulance'],
      component: FormFieldNames.BaseSelect,
      validations: {
        required: {
          params: null,
          message: 'The title is required'
        }

      }
    }
  }

  timeSchema = {
    starttime: {
      label: 'starttime',
      dark: true,
      icon: 'clock',
      component: FormFieldNames.BaseInput,
      validations: {
        required: {
          params: null,
          message: 'The title is required'
        },
        isTime: {
          params: null,
          message: 'pls, enter HH:MM'
        }
      }
    },
    endtime: {
      label: 'endtime',
      dark: true,
      icon: 'clock',
      component: FormFieldNames.BaseInput,
      validations: {
        required: {
          params: null,
          message: 'The title is required'
        },
        isTime: {
          params: null,
          message: 'pls, enter HH:MM'
        }
      }
    },
    price: {
      label: 'price',
      dark: true,
      component: FormFieldNames.BaseInput,
      icon: 'euro-sign',
      type: 'number',
      validations: {
        required: {
          params: null,
          message: 'The title is required'
        },
        minValue: {
          params: 1,
          message: 'pls, provide price greater than 0'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.times{
  margin-top: 30px;
  &_card {
    background: #484848;
    border-radius: 3px;
    padding: 20px 10px;
    &-top{
      display: flex;
    }
  }
}
</style>
