<template>
  <el-dropdown class="handler-item columns" trigger="click" :hide-on-click="false">
    <el-button size="small" icon="el-icon-s-grid">
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-checkbox v-model="allVisible" :indeterminate="isIndeterminate">全部</el-checkbox>
      </el-dropdown-item>
      <el-dropdown-item
        :divided="index===0"
        @click.stop
        v-for="(i,index) in columns"
        :key="i.prop+index"
      >
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

  computed: {
    isIndeterminate() {
      return (
        !this.vColumns.every(i => i.visible === true) &&
        this.vColumns.some(i => i.visible === true)
      );
    },

    allVisible: {
      get() {
        return this.vColumns.every(i => i.visible === true);
      },
      set(val) {
        this.vColumns.forEach(i => {
          i.visible = val;
        });
      }
    }
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