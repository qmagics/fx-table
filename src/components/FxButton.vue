<template>
  <component
    class="fx-button"
    :class="'fx-button--'+category"
    :is="component"
    v-bind="$props"
    @click="onClick"
  >
    <slot v-if="category!=='dropdown'" />

    <template v-else>
      <slot v-if="split" />
      <slot name="button" v-else>
        <FxButton category="button">
          <slot />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </FxButton>
      </slot>
      <el-dropdown-menu slot="dropdown">
        <slot name="items" />
      </el-dropdown-menu>
    </template>
  </component>
</template>

<script>
export default {
  name: "FxButton",

  inject: {},

  props: {
    category: {
      type: String,
      default: "button"
    },

    size: {
      type: String,
      default: "small"
    },

    icon: {},

    split: Boolean,

    trigger: {},

    type: {},

    plain: {},

    round: {},

    circle: {},

    loading: {}
  },

  data() {
    return {
      native: "native"
    };
  },

  computed: {
    component() {
      return {
        button: "el-button",
        group: "el-button-group",
        dropdown: "el-dropdown",
        item: "el-dropdown-item"
      }[this.category];
    }
  },

  methods: {
    onClick() {
      this.$emit("click");
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
.fx-button {
  // display: inline-block;
  & + .fx-button {
    margin-left: 10px;
  }

  & + .fx-button--item {
    margin-left: 0;
  }
}
</style>