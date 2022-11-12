<template>
  <button
    class="g-button"
    :disabled="disabled"
    :class="buttonClass"
    @click="beforeClick"
    ref="buttonRef"
  >
    <g-icon :name="icon" class="icon" v-if="icon && !loading"></g-icon>
    <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
    <div class="button-content" :class="contentClass" v-show="isShow">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  // import Icon from '../icon/icon.vue'

  export default {
    props: {
      icon: {
        type: String,
      },
      iconPosition: {
        type: String,
        default: 'left',
        validator(value) {
          return value === 'left' || value === 'right'
        },
      },
      loading: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: '',
      },
      shape: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    // components: {
    //   'g-icon': Icon,
    // },
    computed: {
      isShow() {
        return this.$slots.default
      },
      buttonClass() {
        let { iconPosition, type, disabled, shape, loading } = this
        return {
          [`icon-${iconPosition}`]: true,
          [`g-button-${type}`]: type ? true : false,
          'g-button-animate': !disabled,
          [`g-button-${shape}`]: shape ? true : false,
          'g-button-loading': loading,
        }
      },
      contentClass() {
        let { iconPosition, icon } = this
        return {
          left: iconPosition === 'right',
          right: iconPosition === 'left' && icon,
        }
      },
    },
    methods: {
      beforeClick(e) {
        const x = e.pageX
        const y = e.pageY
        const buttonTop = this.$refs.buttonRef.offsetTop
        const buttonLeft = this.$refs.buttonRef.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop
        const circle = document.createElement('span')
        circle.classList.add('ripple')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'
        this.$refs.buttonRef.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
        this.$emit('click', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  $button-height: 32px;
  $font-size: 14px;
  $button-bg: #fff;
  $button-active-bg: #fff;
  $border-radius: 4px;
  $color: #555;
  $button-active-color: #0080ff;
  $border-color: #bbb;
  $border-color-hover: #0080ff;
  $button-primary-bg: #0080ff;
  $button-primary-color: #fff;
  $button-primary-border: #1890ff;
  $button-primary-bg-focus: #399cff;
  $button-primary-bg-active: #006fdb;
  $button-disabled-bg: #f5f5f5;
  $button-disabled-color: rgba(0, 0, 0, 0.25);
  $button-disabled-border: #ccc;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .g-button-primary /deep/.ripple {
    background-color: #fff;
  }
  /deep/ .ripple {
    position: absolute;
    background-color: #0080ff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: scale 0.5s ease-out;
    pointer-events: none;
  }

  @keyframes scale {
    to {
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }

  .g-button {
    height: $button-height;
    font-size: $font-size;
    color: $color;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $button-bg;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    overflow: hidden;
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      border-color: $border-color-hover;
      color: $button-active-color;
      > .icon {
        fill: #0080ff;
      }
    }
    &:active {
      border-color: $border-color-hover;
      color: $button-active-color;
    }
    &:focus {
      outline: none;
      border-color: $border-color-hover;
      color: $button-active-color;
      > .icon {
        fill: #0080ff;
      }
    }
    &[disabled] {
      background: $button-disabled-bg;
      border: 1px solid $button-disabled-border;
      color: $button-disabled-color;
      cursor: not-allowed;
      .icon {
        fill: $button-disabled-color;
      }
    }
    > .icon {
      order: 1;
      transition: all 0.3s;
      fill: $color;
    }
    > .button-content.right {
      order: 2;
      margin-left: 0.3em;
      margin-right: 0;
    }
    > .button-content.left {
      order: 1;
      margin-right: 0.3em;
      margin-left: 0;
    }
    &.icon-right {
      > .icon {
        order: 2;
      }
    }
    .loading {
      animation: spin 1s infinite linear;
    }
  }
  .g-button-round {
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
  }
  .g-button-circle {
    height: 32px;
    width: 32px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    padding: 0;
    > .icon {
      margin: 0;
    }
  }

  .g-button-primary {
    background: $button-primary-bg;
    color: $button-primary-color;
    border: $button-primary-border;
    cursor: pointer;
    &:focus {
      background: $button-primary-bg-focus;
      color: #fff;
      .icon {
        fill: #fff;
      }
    }
    &:hover {
      background: $button-primary-bg-focus;
      color: #fff;
      .icon {
        fill: #fff;
      }
    }
    &[disabled] {
      background: $button-disabled-bg;
      border: 1px solid $button-disabled-border;
      color: $button-disabled-color;
      cursor: not-allowed;
    }
    .icon {
      fill: #fff;
    }
  }
  .g-button-loading:before {
    position: absolute;
    display: block;
    content: '';
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    background: #fff;
    opacity: 0.4;
    z-index: 1;
  }
</style>
