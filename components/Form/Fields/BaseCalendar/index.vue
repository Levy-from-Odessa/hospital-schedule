<template>
  <div class="">
    <BaseInput
      :label="label"
      :value="datesToShow"
      :icon="icon"
      @click="showCalendar = true"
    />

    <div v-if="showCalendar" class="calendar-picker">
      <UICardSubtitle>
        calendar
        <FAIcon icon="times" class="btn" @click="showCalendar = false" />
      </UICardSubtitle>
      <vc-calendar :attributes="attributes" @dayclick="onDayClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import moment from 'moment'
import { IDay } from '@/models/IDay'
@Component({
  components: {
    BaseInput: () => import('@/components/Form/Fields/BaseInput/index.vue')
  }
})
export default class extends Vue {
  @Prop({ type: String, default: () => 'label' })
    label!:string

  @Prop({ type: Array, default: () => [] })
    value!:Array<IDay>

  @Prop({ type: String, default: () => '' })
    icon!:boolean

  showCalendar = false

  get datesToShow () {
    return this.value.map(t => t.formated)
  }

  get attributes () {
    return this.value.map((day: IDay) => ({
      highlight: true,
      dates: day.date
    }))
  }

  onDayClick (day: IDay) {
    const idx = this.value.findIndex(d => d.id === day.id)
    const copyValue = Object.assign([], this.value)
    if (idx >= 0) {
      copyValue.splice(idx, 1)
      this.$emit('input', { value: copyValue })
    } else {
      copyValue.push({
        id: day.id,
        date: day.date,
        formated: moment(day.date).format('DD-MM-yyyy')
      })
      this.$emit('input', { value: copyValue })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-picker{
  position: absolute;
  z-index: 6;
  background: #fff;
  box-shadow: 0px 0px 1px 1px #333;
}
</style>
