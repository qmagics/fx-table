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
      <renderComp
        v-if="column.render"
        :render="column.render"
        :context="{value:row[column.prop],row}"
      ></renderComp>
      <span v-else-if="column.formatter" v-html="column.formatter(row[column.prop],row)"></span>
      <span v-else>{{row[column.prop]}}</span>
    </template>

    <template v-if="column.children && column.children.length">
      <FxTableColumn v-for="(i,index) in column.children" :column="i" :key="i.prop+index"></FxTableColumn>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "FxTableColumn",

  props: {
    column: {}
  },

  components: {
    renderComp: {
      props: {
        render: Function,
        context: {}
      },
      render(h) {
        return this.render(h, this.context);
      }
    }
  }
};
</script>