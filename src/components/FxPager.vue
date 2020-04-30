<template>
  <div class="fx-pager">
    <el-pagination
      background
      :layout="layout"
      :page-sizes="config.sizes"
      :prev-text="config.prevText"
      :next-text="config.nextText"
      :total="config.total"
      :disabled="config.disabled"
      :page-size.sync="model.pageSize"
      :current-page.sync="model.pageIndex"
      :pager-count="5"
      @size-change="sizeChange"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    ></el-pagination>
  </div>
</template>

<script>
import ERD from "element-resize-detector";

export default {
  name: "FxPager",

  data() {
    const { pageSize, pageIndex, sizes } = this.config;
    return {
      model: {
        pageSize: pageSize || 10,
        pageIndex: pageIndex || 1
      },

      width: 0,

      erd: null
    };
  },

  computed: {
    layout() {
      let layout = this.config.layout;
      if (this.width <= 640) {
        let arr = layout.split(",");
        arr.splice(arr.indexOf("total"), 1);

        if (this.width <= 568) {
          arr.splice(arr.indexOf("jumper"), 1);

          if (this.width <= 450) {
            arr.splice(arr.indexOf("sizes"), 1);

            if (this.width <= 330) {
              arr.splice(arr.indexOf("pager"), 1);
            }
          }
        }
        layout = arr.join(",");
      }

      return layout;
    }
  },

  props: {
    value: {},
    config: {
      type: Object,
      required: true
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
    }
  },
  methods: {
    sizeChange(size) {
      this.$emit("size-change", size);
    },

    currentChange(current) {
      this.$emit("current-change", current);
    },

    prevClick() {
      this.$emit("prev-click");
    },

    nextClick() {
      this.$emit("next-click");
    },

    //监听组件大小变更
    watchSize() {
      this.erd = ERD();
      this.erd.listenTo(this.$el, el => {
        let width = el.offsetWidth;
        this.width = width;
      });
    },

    //停止监听
    stopWatch() {
      this.erd.uninstall(this.$el);
      this.erd = null;
    }
  },

  mounted() {
    this.width = this.$el.clientWidth;
    this.watchSize();
  },

  beforeDestroy() {
    this.stopWatch();
  }
};
</script>