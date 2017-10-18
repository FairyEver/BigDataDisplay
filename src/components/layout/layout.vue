<template>
  <div id="screen">
    <div class="col">
      <item class="item"><slot name="l1"></slot></item>
      <item class="item"><slot name="l2"></slot></item>
      <item class="item"><slot name="l3"></slot></item>
    </div>
    <div class="col" :style="centerStyle">
      <item class="item" :height="60">
        <slot name="c1"></slot>
      </item>
      <item class="item">
        <slot name="c2"></slot>
      </item>
      <item class="item" :height="200">
        <slot name="c3"></slot>
      </item>
    </div>
    <div class="col">
      <item class="item"><slot name="r1"></slot></item>
      <item class="item"><slot name="r2"></slot></item>
      <item class="item"><slot name="r3"></slot></item>
    </div>
  </div>
</template>

<script>
import item from './item'
export default {
  components: {
    item
  },
  props: {
    centerWidth: {
      default: 600
    }
  },
  computed: {
    centerStyle () {
      return {
        width: this.centerWidth + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#screen{
  height: calc(100vh - 10px);
  width: calc(100vw - 10px);
  max-height: 1080px;
  max-width: 1920px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  .col{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .item{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      &:hover{
        background-color: rgba(#FFF,0.03);
        box-shadow: 0px 0px 0px 1px rgba(#FFF,0.2);
      }
    }
  }
}
</style>
