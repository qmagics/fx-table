<template>
  <div class="fx-toolbar">
    <div class="fx-toolbar--start">
      <template v-for="(i, index) in toolbarLayout.start.items">
        <ToolbarItem v-if="i" :key="index" :type="i" />
      </template>
    </div>

    <div class="fx-toolbar--end">
      <template v-for="(i, index) in toolbarLayout.end.items">
        <ToolbarItem v-if="i" :key="index" :type="i" />
      </template>
    </div>
  </div>
</template>

<script>
import ToolbarItem from "./ToolbarItem";

export default {
  components: {
    ToolbarItem,
  },
  props: {
    layout: {
      type: String,
      default: "query",
    },
  },
  
  computed: {
    toolbarLayout() {
      let [startStr, endStr] = this.layout.split("->");

      return {
        start: {
          items: startStr ? startStr.split(",").map((i) => i.trim()) : "",
        },
        end: {
          items: endStr ? endStr.split(",").map((i) => i.trim()) : "",
        },
      };
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.fx-toolbar {
  background: #fff;
  position: relative;
  display: flex;
  height: 100%;

  .fx-toolbar--start {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .fx-toolbar--end {
    display: flex;
    width: auto;
    position: relative;
    align-items: center;
    padding: 0 0 0 15px;

    // &:before {
    //   content: "";
    //   display: block;
    //   height: 60%;
    //   width: 1px;
    //   position: absolute;
    //   left: 1px;
    //   top: 50%;
    //   // background: #eee;
    //   background-image: linear-gradient(
    //     to bottom,
    //     rgba(0, 0, 0, 0) 0%,
    //     rgba(0, 0, 0, 0.1) 50%,
    //     rgba(0, 0, 0, 0) 100%
    //   );
    //   transform: translateY(-50%);
    // }
  }

  //工具栏项目
  .toolbar-item {
    display: inline-block;
    margin-right: 10px;
    & + .toolbar-item {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }

    .el-input {
      width: auto;
    }
  }

  .toolbar-item-spliter {
    height: 60%;
    width: 1px;
    left: 1px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}
</style>