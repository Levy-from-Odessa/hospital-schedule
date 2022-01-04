<template>
  <div>
    <UIHeaderTitle>
      shifts
      <button class="btn dark" @click="$emit('select', shift)">
        <span>
          add shift
        </span>
      </button>
    </UIHeaderTitle>
    <template v-if="allShifts.length > 0">
      <UICard v-for="shift in allShifts" :key="shift.title">
        <UICardTitle>
          {{ shift.title }}
          <FAIcon class="btn" icon="pen" @click="$emit('select', shift)" />
        </UICardTitle>
        <UICardSubtitle>
          {{ shift.description }}
        </UICardSubtitle>
        <UICardTitle>
          Dates
        </UICardTitle>
        <UITable :items="shift.dates" :headers="headers">
          <template #date-cell="{item}">
            {{ item.date.formated }}
          </template>
        </UITable>
      </UICard>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { mapGetters } from 'vuex'
@Component({
  computed: {
    ...mapGetters('shifts', ['allShifts'])
  }
})
export default class extends Vue {
  headers = ['date', 'starttime', 'endtime', 'type', 'price']
}
</script>

<style scoped>

</style>
