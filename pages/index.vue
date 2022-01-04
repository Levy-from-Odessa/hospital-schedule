<template>
  <div class="">
    <UIHeaderTitle>
      filter
    </UIHeaderTitle>
    <ShiftsList @select="formValue = $event" />
    <ShiftsModal :value="formValue" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  components: {
    ShiftsList: () => import('@/components/Base/Shifts/List/index.vue'),
    ShiftsModal: () => import('@/components/Base/Shifts/Modal/index.vue')
  }
})
export default class extends Vue {
  formValue = {
    title: '',
    description: '',
    dates: []
  }
}
</script>

<style scoped>

</style>
