<template>
  <div class="fx-aside" :class="classes">
    <div class="fx-aside--inner">
      <slot></slot>
      <pre>isOpened:{{isOpened}}</pre>
    </div>
    <div class="fx-aside--toggle" @click="onToggle">
      <i class="icon el-icon-s-fold"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "FxAside",

  props: {
    position: {
      type: String,
      default: "left"
    },
    opened: {}
  },

  data() {
    return {
      isOpened: this.opened
    };
  },

  watch: {
    opened(val) {
      this.isOpened = val;
    },
    isOpened(val) {
      this.$emit("update:opened", val);
    }
  },

  computed: {
    classes() {
      let arr = [`position-${this.position}`];

      if (!this.isOpened) {
        arr.push("is-closed");
      }

      return arr;
    }
  },
  methods: {
    onToggle() {
      this.isOpened = !this.isOpened;
    }
  }
};
</script>

<style lang="scss">
$transition: all 0.2s ease-in-out;

.fx-aside {
  height: 100%;
  position: absolute;
  transition: $transition;

  &.position-left {
    left: 0;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);

    .icon {
      transform-origin: right;
    }

    .fx-aside--toggle {
      top: 50%;
      right: 0;
      margin-top: -22px;

      border-bottom: 9px solid transparent;
      border-left: none;
      border-right: 13px solid #f3f3f3;
      border-top: 9px solid transparent;
      transition: all 0.1s ease;
      transform-origin: right;

      &:hover {
        transform: scale(1.6, 1);
      }

      .icon {
        color: #8c8c8c;
        text-align: center;
        position: absolute;
        font-size: 14px;
        top: 50%;
        transform: translate(0, -50%);
        transform-origin: right;
      }
    }

    &.is-closed {
      .fx-aside--toggle {
        right: -13px;
        border-right: none;
        border-left: 13px solid #e3effb;
        transform-origin: left;
        .icon {
          transform: translate(-16px, -50%);
          transform-origin: left;
        }
      }
    }
  }

  &.position-right {
    right: 0;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);

    .icon {
      transform-origin: left;
    }

    .fx-aside--toggle {
      top: 50%;
      left: 0;
      margin-top: -22px;

      border-bottom: 9px solid transparent;
      border-right: none;
      border-left: 13px solid #f3f3f3;
      border-top: 9px solid transparent;
      transition: all 0.1s ease;
      transform-origin: left;

      &:hover {
        transform: scale(1.6, 1);
      }

      .icon {
        transform: translate(-16px, -50%);
        transform-origin: left;
      }
    }

    &.is-closed {
      .fx-aside--toggle {
        left: -13px;
        border-left: none;
        border-right: 13px solid #e3effb;
        transform-origin: right;
        .icon {
          transform: translate(0, -50%);
          transform-origin: right;
        }
      }
    }
  }

  .fx-aside--inner {
    height: 100%;
    overflow: hidden;
  }
  .fx-aside--toggle {
    width: 13px;
    height: 44px;
    display: block;
    text-align: center;
    position: absolute;
    z-index: 2;
    cursor: pointer;
    transition: $transition;

    .icon {
      color: #8c8c8c;
      text-align: center;
      position: absolute;
      font-size: 14px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>