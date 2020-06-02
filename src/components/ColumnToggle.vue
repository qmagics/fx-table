<template>
  <el-dropdown class="handler-item columns" trigger="click" :hide-on-click="false">
    <el-button size="small" icon="el-icon-s-grid">
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.stop v-for="(i,index) in columns" :key="i.prop+index">
        <el-checkbox v-model="i.visible">{{i.label}}</el-checkbox>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "ColumnToggle",

  props: {
    columns: Array
  },

  data() {
    return {
      vColumns: this.columns
    };
  },

  watch: {
    columns: {
      handler(val) {
        this.vColumns = val;
      },
      deep: true
    },
    vColumns: {
      handler(val) {
        this.$emit("update:column", val);
      },
      deep: true
    }
  },

  methods: {
    toggleColumns() {}
  }
};
</script>

<style>
</style>