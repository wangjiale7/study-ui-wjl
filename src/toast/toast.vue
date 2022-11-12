<template>
  <div class="el-toast" :class="toastClasses" ref="elToastRef">
    <div class="toast" ref="toastRef">
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default"></div>
      </div>
      <div class="line" ref="line"></div>
      <div class="btn" v-if="closeButton" @click="beforeClose">
        {{ closeButton.text }}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'middle', 'bottom'].indexOf(value) >= 0
        },
      },
      enableHtml: {
        type: Boolean,
        default: false,
      },
      autoClose: {
        type: [Boolean, Number],
        default: 5,
        validator(value) {
          return value === false || typeof value === 'number'
        },
      },
      closeButton: {
        type: Object,
        default: () => {
          return {
            text: '关闭',
            callback: () => {},
          }
        },
      },
    },
    computed: {
      toastClasses() {
        // return {
        //   [`position-${this.position}`]: true,
        // }
        return `position-${this.position}`
      },
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
      this.$nextTick(() => {
        this.$refs.line.style.height =
          this.$refs.toastRef.getBoundingClientRect().height + 'px'
      })
      this.autoCloseFn()
    },
    methods: {
      autoCloseFn() {
        if (this.autoClose) {
          setTimeout(() => {
            this.beforeClose()
          }, this.autoClose * 1000)
        }
      },
      beforeClose() {
        let dom = this.$refs.elToastRef
        if (!dom) return
        if (
          this.closeButton &&
          typeof this.closeButton.callback === 'function'
        ) {
          this.closeButton.callback()
        }
        dom.classList.add(this.position + '-leave')
        dom.addEventListener('animationend', () => {
          this.$el.remove()
          this.$destroy()
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  $animation-time: 0.3s;
  $slide-distance: 10px;
  .el-toast {
    user-select: none;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    &.position-middle {
      top: 50%;
      transform: translate(-50%, -50%);
      animation: fadeIn $animation-time;
    }
    &.position-top {
      top: $slide-distance;
      animation: slide-bottom $animation-time;
    }
    &.position-bottom {
      bottom: $slide-distance;
      animation: slide-up $animation-time;
    }
    &.middle-leave {
      animation: fadeIn-leave $animation-time;
    }
    &.bottom-leave {
      animation: slide-up-leave $animation-time;
    }
    &.top-leave {
      animation: slide-bottom-leave $animation-time;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes fadeIn-leave {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    @keyframes slide-bottom {
      from {
        transform: translate(-50%, -100%);
      }
      to {
        transform: translate(-50%, 0);
      }
    }
    @keyframes slide-bottom-leave {
      from {
        opacity: 1;
        transform: translate(-50%, 0);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -100%);
      }
    }
    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translate(-50%, 100%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
    @keyframes slide-up-leave {
      from {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      to {
        opacity: 0;
        transform: translate(-50%, 100%);
      }
    }

    .toast {
      color: #fff;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      overflow: hidden;
      height: 60px;

      display: flex;
      align-items: center;
      .message {
      }
      .line {
        // height: 100%;
        background-color: #fff;
        width: 2px;
        margin: 0 0 0 10px;
      }
      .btn {
        height: 100%;
        min-width: 40px;
        line-height: 60px;
        text-align: center;
        // float: left;
        cursor: pointer;
        font-size: 12px;
        &:hover {
          background-color: $primary-color;
        }
        //激活高亮增加 百分之 5%
        &:active {
          background-color: lighten($primary-color, $amount);
        }
      }
    }
  }
</style>
