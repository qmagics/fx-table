<template>
  <el-table-column
    :prop="(column.children && column.children.length)?'':column.prop"
    :label="column.label"
    :sortable="column.sortable?'custom':false"
    :resizable="column.resizable"
    :show-overflow-tooltip="true"
    :align="column.align"
    :header-align="column.headerAlign"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :formatter="column.formatter"
  >
    <template v-slot="{row}">
      <span v-html="column.formatter(row,column)" v-if="column.formatter"></span>
      <span v-else>{{row[column.prop]}}</span>
    </template>

    <template v-if="column.children && column.children.length">
      <SeTableColumn v-for="(i,index) in column.children" :column="i" :key="i.prop+index"></SeTableColumn>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "FxTableColumn",

  props: {
    column: {}
  }
};
</script>