<template>
  <div
    class="fx-searchbar"
    :class="classes"
    @mouseenter="isExpended=true"
    @mouseleave="isExpended=false"
  >
    <div class="fx-searchbar--content" v-if="!superMode">
      <el-form ref="form" inline size="small" :model="model" @submit.native.prevent="submit">
        <slot />
      </el-form>
    </div>

    <div class="super-content" v-else>
      <div class="super-form">
        <el-form ref="form" inline size="small" :model="model" @submit.native.prevent="submit">
          <slot />
        </el-form>
      </div>

      <div class="super-handler" v-if="superMode">
        <el-button size="small" type="primary" icon="el-icon-check" @click="confirm">确定</el-button>
        <el-button size="small" type="default" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FxSearchbar",

  props: {
    superMode: Boolean,
    value: {}
  },

  data() {
    return {
      model: this.value
    };
  },

  computed: {
    classes() {
      return {
        "fx-searchbar--super": this.superMode
      };
    }
  },

  watch: {
    value: {
      handler(val) {
        this.model = val;
      },
      deep: true
    },
    model: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    },
    expended(val) {
      this.isExpended = val;
    },
    isExpended(val) {
      this.$emit("update:expended", val);
    }
  },

  methods: {
    submit() {
      this.$emit("submit", this.model);
    },

    confirm(){
      this.$emit("confirm", this.model);
    },

    reset(){
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss">
.fx-searchbar {
  height: 50px;
  position: relative;
  overflow: hidden;

  .fx-searchbar--content {
    background: #fff;
    padding: 8px 0 0 0;
  }

  &.fx-searchbar--super {
    height: auto;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.15);

    .super-content {
      background: #fff;

      .super-form{
        padding: 20px;
      }

      .super-handler {
        border-top: 1px dashed #e9e9e9;
        padding: 10px;
        text-align: center;
      }
    }
  }
}
</style>