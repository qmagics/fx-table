<template>
  <div class="fx-aside" :class="classes">
    <div class="fx-aside--inner">
      <slot></slot>
    </div>
    <div class="fx-aside--toggle" v-if="showToggle" @click="onToggle">
      <span class="text" v-if="toggleBtnText">{{toggleBtnText}}</span>
      <i v-else class="icon" :class="isOpened?cToggleOnIcon:cToggleOffIcon"></i>
    </div>
  </div>
</template>

<script>
import { reversePositionText } from "../utils";
export default {
  name: "FxAside",

  props: {
    position: {
      type: String,
      default: "left"
    },

    opened: {},

    showToggle: {
      type: Boolean,
      default: true
    },

    toggleOnIcon: String,

    toggleOffIcon: String,

    toggleBtnText: String
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
    },

    cToggleOnIcon() {
      return this.toggleOnIcon || `el-icon-caret-${this.position}`;
    },

    cToggleOffIcon() {
      return this.toggleOffIcon || `el-icon-caret-${reversePositionText(this.position)}`;
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
$toggle-btn-bgcolor: #f3f3f3;
$toggle-btn-active-bgcolor: #e5edf7;
$toggle-btn-color: #8c8c8c;
$toggle-btn-scale: 1.3;
$toggle-btn-size: 20px;

.fx-aside {
  position: absolute;
  transition: $transition;

  &.position-left {
    left: 0;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);

    .fx-aside--toggle {
      width: $toggle-btn-size;
      height: auto;
      min-height: 44px;
      top: 50%;
      right: 0;
      margin-top: -22px;

      border-bottom: 9px solid transparent;
      border-left: none;
      border-right: $toggle-btn-size solid $toggle-btn-bgcolor;
      border-top: 9px solid transparent;
      transition: all 0.15s ease;
      transform-origin: right;

      &:hover {
        transform: scale($toggle-btn-scale, 1);

        .text {
          transform: scale(0.7, 1);
        }
      }

      .icon {
        top: 50%;
        left: $toggle-btn-size/2;
        transform: translate(-50%, -50%);
        transform-origin: right;
      }

      .text {
        font-size: 13px;
        color: $toggle-btn-color;
      }
    }

    &.is-closed {
      .fx-aside--toggle {
        right: -$toggle-btn-size;
        border-right: none;
        border-left: $toggle-btn-size solid $toggle-btn-active-bgcolor;
        transform-origin: left;
        .icon {
          left: -$toggle-btn-size/2;
          transform: translate(-50%, -50%);
          transform-origin: left;
        }
        .text {
          transform: translate(-$toggle-btn-size, 0);
        }
      }
    }
  }

  &.position-right {
    right: 0;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);

    .fx-aside--toggle {
      width: $toggle-btn-size;
      height: auto;
      min-height: 44px;
      top: 50%;
      left: 0;
      margin-top: -22px;

      border-bottom: 9px solid transparent;
      border-right: none;
      border-left: $toggle-btn-size solid $toggle-btn-bgcolor;
      border-top: 9px solid transparent;
      transition: all 0.1s ease;
      transform-origin: left;

      &:hover {
        transform: scale($toggle-btn-scale, 1);
      }

      .icon {
        top: 50%;
        left: -$toggle-btn-size/2;
        transform: translate(-50%, -50%);
        transform-origin: left;
      }
    }

    &.is-closed {
      .fx-aside--toggle {
        left: -$toggle-btn-size;
        border-left: none;
        border-right: $toggle-btn-size solid $toggle-btn-active-bgcolor;
        transform-origin: right;
        .icon {
          left: $toggle-btn-size/2;
          transform: translate(-50%, -50%);
          transform-origin: right;
        }
      }
    }
  }

  &.position-bottom {
    bottom: 0;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

    .fx-aside--toggle {
      height: $toggle-btn-size;
      width: auto;
      min-width: 44px;
      top: 0;
      left: 50%;
      margin-left: -22px;

      border-left: 9px solid transparent;
      border-bottom: none;
      border-top: $toggle-btn-size solid $toggle-btn-bgcolor;
      border-right: 9px solid transparent;

      transition: all 0.1s ease;
      transform-origin: top;

      &:hover {
        transform: scale(1,$toggle-btn-scale);
      }

      .icon {
        left: 50%;
        top: -$toggle-btn-size/2;
        transform: translate(-50%, -50%);
        transform-origin: top;
      }
    }

    &.is-closed {
      .fx-aside--toggle {
        top: -$toggle-btn-size;
        border-top: none;
        border-bottom: $toggle-btn-size solid $toggle-btn-active-bgcolor;
        transform-origin: bottom;
        .icon {
          top: $toggle-btn-size/2;
          transform: translate(-50%, -50%);
          transform-origin: bottom;
        }
      }
    }
  }

  &.position-top {
    top: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .fx-aside--toggle {
      height: $toggle-btn-size;
      width: auto;
      min-width: 44px;
      bottom: 0;
      left: 50%;
      margin-left: -22px;

      border-left: 9px solid transparent;
      border-top: none;
      border-bottom: $toggle-btn-size solid $toggle-btn-bgcolor;
      border-right: 9px solid transparent;

      transition: all 0.1s ease;
      transform-origin: bottom;

      &:hover {
        transform: scale(1,$toggle-btn-scale);
      }

      .icon {
        left: 50%;
        top: $toggle-btn-size/2;
        transform: translate(-50%, -50%);
        transform-origin: bottom;
      }
    }

    &.is-closed {
      .fx-aside--toggle {
        bottom: -$toggle-btn-size;
        border-bottom: none;
        border-top: $toggle-btn-size solid $toggle-btn-active-bgcolor;
        transform-origin: top;
        .icon {
          top: -$toggle-btn-size/2;
          transform: translate(-50%, -50%);
          transform-origin: top;
        }
      }
    }
  }

  .fx-aside--inner {
    height: 100%;
    overflow: hidden;
  }
  .fx-aside--toggle {
    display: block;
    text-align: center;
    position: absolute;
    z-index: 2;
    cursor: pointer;
    transition: $transition;

    .icon {
      color: $toggle-btn-color;
      text-align: center;
      position: absolute;
      font-size: 14px;
    }
    .text {
      display: inline-block;
    }
  }
}
</style>