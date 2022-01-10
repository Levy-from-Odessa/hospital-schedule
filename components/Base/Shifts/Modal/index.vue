<template>
  <div class="side-modal">
    <UIHeaderTitle>
      create/edit
    </UIHeaderTitle>
    <div class="side-modal__form">
      <ValidationForm
        ref="mainShiftForm"
        v-model="formValue"
        :schema="scheduleSchema"
      />
      <template v-for="(date, index) in formValue.dates">
        <TimesForm ref="timesShiftForm" :key="date.id" v-model="timesValue[index]" :date="date" @delete="deleteDate(date.id)" />
      </template>
    </div>

    <div class="side-modal__actions">
      <button v-if="value.id" class="btn light" @click="deleteShift(value.id)">
        <span>
          delete
        </span>
      </button>
      <button class="btn dark" @click="validate">
        <span>
          save
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import ValidationForm, { SaveRecordType } from '@/components/Form/index.vue'
import TimesForm from '@/components/Base/Shifts/Times/Form/index.vue'
import { IShift } from '~/models/IShift'
import { ITime } from '~/models/ITime'
import { FormFieldNames } from '~/components/Form/types'
@Component({

  components: {
    ValidationForm,
    TimesForm
  },
  methods: {
    ...mapActions('shifts', {
      create: 'create',
      deleteShift: 'delete',
      update: 'update'
    })
  }
})
export default class extends Vue {
  [x: string]: any
  @Prop({ type: Object, default: () => ({}) })
    value!: IShift

  @Watch('value', { immediate: true })
  onValueChanged (val : IShift) {
    if (Object.keys(val).length > 0) {
      const shift = {
        ...val,
        dates: val.dates && val.dates.map((d: ITime | string) => {
          if (typeof d !== 'string') {
            return d.date
          }
          return d
        })
      }
      this.formValue = Object.assign({}, shift)
      this.timesValue = ([...val.dates || []]) as ITime[]
    } else {
      this.formValue = {} as IShift
      this.timesValue = []
    }
  }

  formValue = {} as IShift
  timesValue = [] as ITime[]

  @Ref() mainShiftForm!:ValidationForm
  @Ref() timesShiftForm!: Array<TimesForm>
  async validate () {
    try {
      const shift = await this.mainShiftForm.validateForm()
      const times = await Promise.all(
        this.timesShiftForm.map((form) => {
          return form.validateForm()
        })
      )

      if (shift.type === SaveRecordType.CREATE) {
        this.create({
          ...shift.item,
          dates: [...times]
        })
      }
      if (shift.type === SaveRecordType.UPDATE) {
        this.update({
          id: this.value.id,
          credentials: {
            ...shift.item,
            dates: [...times]
          }
        })
      }

      this.clear()
    } catch (error) {
      alert(error)
    }
  }

  clear () {
    this.mainShiftForm.onClearForm()
    if (this.timesShiftForm) {
      this.timesShiftForm.forEach((form) => {
        return form.onClearForm()
      })
    }
  }

  deleteDate (date: string) {
    const dates = Object.assign([], this.formValue.dates)
    const delIndex = dates.findIndex(d => d === date)
    dates.splice(delIndex, 1)

    Object.assign(this.formValue, {
      ...this.formValue,
      dates
    })
  }

  scheduleSchema = {
    title: {
      label: 'Title',
      component: FormFieldNames.BaseInput,
      validations: {
        required: {
          params: null,
          message: 'The title is required'
        }
      }

    },
    description: {
      label: 'Description',
      component: FormFieldNames.BaseTextArea,
      validations: {}
    },
    dates: {
      label: 'Dates',
      icon: 'calendar',
      component: FormFieldNames.BaseCalendar,
      validations: {

        required: {
          params: null,
          message: 'The title is required'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.side-modal{
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  justify-content: space-between;
  &__form{
    flex-grow: 3;
    min-height: 70%;
    overflow: auto;
  }
  &__actions{
    flex-grow: 1;
    display: flex;
  }

}
</style>
