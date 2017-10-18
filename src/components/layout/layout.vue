<template>
  <div id="screen">
    <div class="col">
      <item class="item">1</item>
      <item class="item">2</item>
      <item class="item">3</item>
    </div>
    <div class="col" :style="centerStyle">
      <item class="item" :height="100">Title</item>
      <item class="item">1</item>
      <item class="item" :height="200">2</item>
    </div>
    <div class="col">
      <item class="item">1</item>
      <item class="item">2</item>
      <item class="item">3</item>
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
      default: 500
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
  height: calc(100vh - 20px);
  width: calc(100vw - 20px);
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
      // transition: all .3s cubic-bezier(.55,0,.1,1);
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
