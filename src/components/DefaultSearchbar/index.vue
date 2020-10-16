<template>
  <div class="fx-searchbar">
    <div class="fx-searchbar--form" :style="formStyle">
      <el-form
        ref="form"
        inline
        size="small"
        :model="model"
        @submit.native.prevent="submit"
      >
        <slot />
      </el-form>
    </div>

    <div class="fx-searchbar--handler">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="confirm"
        >搜索</el-button
      >
      <el-button
        size="small"
        type="default"
        icon="el-icon-refresh-right"
        @click="reset"
        >重置</el-button
      >
      <el-button
        size="mini"
        @click="$fxTable.toggleSearchbarSize"
        class="fx-searchbar--toggle"
        :icon="
          'el-icon-arrow-' + ($fxTable.searchbarSize === 'max' ? 'up' : 'down')
        "
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
  },

  data() {
    return {
      model: this.value,
    };
  },

  inject: ["$fxTable"],

  watch: {
    value: {
      handler(val) {
        this.model = val;
      },
      deep: true,
    },
    model: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true,
    },
  },

  computed: {
    formStyle() {
      return {
        overflow: this.$fxTable.cOptions.searchbarProps.scrollable
          ? "auto"
          : "hidden",
      };
    },
  },

  methods: {
    submit() {
      this.$emit("submit", this.model);
    },

    confirm() {
      this.submit();
    },

    reset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="scss">
.fx-searchbar {
  height: 100%;
  display: flex;
  flex-direction: column;
  .fx-searchbar--form {
    flex: 1;
    padding: 15px;
  }
  .fx-searchbar--handler {
    // border-top: 1px solid #ddd;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    // background: #eee;

    .fx-searchbar--toggle {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>