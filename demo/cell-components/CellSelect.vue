<template>
  <div class="cell-component">
    <el-select v-if="isCurrent" v-model="row[column.prop]">
      <el-option v-for="i in selections" :key="i.value" v-bind="i"></el-option>
    </el-select>
    <span v-else>{{(selectedItem ? selectedItem.label : row[labelProp]) || value}}</span>
  </div>
</template>

<script>
export default {
  name: "CellSelect",
  
  props: ["value", "row", "column", "currentRow", "selections", "labelProp"],

  computed: {
    isCurrent() {
      return this.row === this.currentRow;
    },
    selectedItem() {
      return this.selections.find(i => i.value === this.value);
    }
  }
};
</script>

<style>
</style>