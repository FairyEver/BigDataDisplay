<template>
  <div class="item" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: { default: 'auto' },
    width: { default: 'auto' }
  },
  computed: {
    style () {
      return {
        height: this.height === 'auto' ? this.height : this.height + 'px',
        width: this.width === 'auto' ? this.width : this.width + 'px',
        flexGrow: this.height === 'auto' ? 1 : 0,
        flexShrink: this.height === 'auto' ? 1 : 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  cursor: pointer;
}
</style>

