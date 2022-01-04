<template>
  <div class="table">
    <template v-for="(item, index) in items">
      <div :key="index" class="table-row">
        <div v-for="(header ) in headers" :key="item[header]" class="table-cell">
          <span v-if="!isSlotExist(`${header}-cell`, $scopedSlots)">
            {{ item[header] }}
          </span>
          <slot :name="`${header}-cell`" :item="item" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { NormalizedScopedSlot } from 'vue/types/vnode'
interface IScopedSlots {
  [key: string]: NormalizedScopedSlot | undefined;
}

  @Component
export default class extends Vue {
  @Prop({ type: Array, default: () => [] })
    items!: Array<any>

  @Prop({ type: Array, default: () => [] })
    headers!: Array<string>

  isSlotExist (slotName: string, slots: IScopedSlots) {
    return typeof slots[slotName] !== 'undefined'
  };
}
</script>

<style scoped lang="scss">
.table{
  border-collapse: collapse;
  width: 100%;

  &-row{
    margin: 20px auto;
    height: 60px;
    background: #484848;
    border-radius: 6px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  &-cell{
    display: flex;
    justify-content: center;
    font-size: 20px;

    color: #FFFFFF;
  }
}
</style>
