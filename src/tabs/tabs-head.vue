<template>
  <div class="tabs-head" ref="head" :class="headClass">
    <slot></slot>
    <div class="line-bg"></div>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'g-tabs-head',
    inject: ['eventBus'],
    data() {
      return {
        direction: '',
      }
    },
    mounted() {
      this.eventBus.$on('update:selected', (item, vm, direction) => {
        this.direction = direction
        if (vm.disabled) return
        if (direction === 'vertical') {
          this.$refs.line.style.top = `${vm.$el.offsetTop}px`
        } else {
          let { width, left } = vm.$el.getBoundingClientRect()
          let { left: left2 } = this.$refs.head.getBoundingClientRect()
          this.$refs.line.style.width = `${width}px`
          this.$refs.line.style.left = `${vm.$el.offsetLeft}px`
          // this.$refs.line.style.left = `${left-left2}px`
        }
      })
    },
    computed: {
      headClass() {
        return [this.direction]
      },
    },
  }
</script>

<style scoped lang="scss">
  $tab-height: 40px;
  $line-selected-color: #0080ff;
  $line-bg-color: #eee;

  .tabs-head {
    display: flex;
    justify-content: flex-start;
    position: relative;
    &.horizontal {
      height: $tab-height;
      > .actions-wrapper {
        margin-left: auto;
      }
      > .line-bg {
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: $line-bg-color;
      }
      > .line {
        position: absolute;
        bottom: 0;
        height: 2px;
        background: $line-selected-color;
        /*z-index: 1;*/
        border-radius: 1px;
        transition: all 0.3s;
      }
    }
    &.vertical {
      flex-direction: column;
      align-items: center;
      > .line-bg {
        position: absolute;
        right: 0;
        height: 100%;
        width: 2px;
        background: $line-bg-color;
      }
      > .line {
        position: absolute;
        right: 0;
        height: $tab-height;
        width: 2px;
        background: $line-selected-color;
        /*z-index: 1;*/
        border-radius: 1px;
        transition: all 0.3s;
      }
    }
  }
</style>
