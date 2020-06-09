<template>
  <el-table-column
    :prop="(column.children && column.children.length)?'':column.prop"
    :label="column.label"
    :type="column.type"
    :sortable="column.sortable?'custom':false"
    :resizable="column.resizable"
    :show-overflow-tooltip="true"
    :align="column.align"
    :header-align="column.headerAlign"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :formatter="column.formatter"
    :key="Math.random()"
  >
    <template v-slot="{row}">
      <slot v-if="$scopedSlots.default" v-bind="{row,column,value:row[column.prop]}"></slot>

      <template v-else>
        <component
          v-if="column.component"
          :is="column.component"
          v-bind="column.componentProps"
          v-model="row[column.prop]"
          :row="row"
          :column="column"
          :currentRow="currentRow"
        ></component>
        <renderComp
          v-else-if="column.render"
          :p-render="render"
          :render="column.render"
          :renderProps="column.renderProps"
          :context="{value:row[column.prop],row,column}"
        ></renderComp>
        <span v-else-if="column.formatter" v-html="column.formatter(row[column.prop],row)"></span>
        <span v-else>{{row[column.prop]}}</span>
      </template>

      <template v-if="column.children && column.children.length">
        <FxTableColumn v-for="(i,index) in column.children" :column="i" :key="i.prop+index"></FxTableColumn>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import Vue from "vue";
import { isArray, isNotEmpty } from "../utils";

function getRenderFn(obj) {
  if (typeof obj === "string") {
    return Vue.__FxTable_presetColumnRenderers[obj];
  }
  return obj;
}

const renderComp = {
  props: {
    render: [Function, String, Array],
    renderProps: {},
    pRender: Function,
    context: {}
  },
  render(h) {
    let renderFn = null,
      renderProps = this.renderProps;

    if (typeof this.render === "string") {
      renderFn = getRenderFn(this.render);
    } else if (typeof this.render === "function") {
      renderFn = this.render;
    } else if (isArray(this.render)) {
      renderFn = getRenderFn(this.render[0]);

      renderProps = isNotEmpty(this.render[1]) ? this.render[1] : renderProps;
    }

    return this.pRender && this.pRender(h, renderFn, this.context, renderProps);
  }
};

export default {
  name: "FxTableColumn",

  props: {
    column: {},
    render: Function,
    currentRow: {}
  },

  components: {
    renderComp
  }
};
</script>