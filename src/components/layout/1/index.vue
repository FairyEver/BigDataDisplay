<template>
  <div id="screen">
    <div class="col">
      <item class="item hov" ref="l1"><slot name="l1"></slot></item>
      <item class="item hov" ref="l2"><slot name="l2"></slot></item>
      <item class="item hov" ref="l3"><slot name="l3"></slot></item>
    </div>
    <div class="col center" :style="centerStyle">
      <item class="item" ref="c1" :height="heightC1">
        <slot name="c1"></slot>
      </item>
      <item class="item" ref="c2" :height="heightC2">
        <slot name="c2"></slot>
      </item>
      <item class="item hov" ref="c3">
        <slot name="c3"></slot>
      </item>
      <item class="item hov" ref="c4" :height="heightC4">
        <slot name="c4"></slot>
      </item>
    </div>
    <div class="col">
      <item class="item hov" ref="r1"><slot name="r1"></slot></item>
      <item class="item hov" ref="r2"><slot name="r2"></slot></item>
      <item class="item hov" ref="r3"><slot name="r3"></slot></item>
    </div>
  </div>
</template>

<script>
import item from './_item'
export default {
  components: {
    item
  },
  props: {
    centerWidth: { default: 800 },
    heightC1: { default: 60 },
    heightC2: { default: 40 },
    heightC4: { default: 100 },
    offsetSize: { default: () => {} }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight
    }
  },
  computed: {
    centerStyle () {
      return {
        width: this.centerWidth + 'px'
      }
    }
  },
  mounted () {
    this.updateSize()
    const _this = this
    let timer = false
    window.onresize = () => {
      if (timer) {
        return false
      } else {
        timer = true
        setTimeout(() => {
          _this.screenWidth = document.body.clientWidth
          _this.screenHeight = document.body.clientHeight
          _this.updateSize()
          timer = false
        }, 1000)
      }
    }
  },
  methods: {
    updateSize () {
      let res = {}
      for (var key of Object.keys(this.$refs)) {
        res[key] = {
          height: this.$refs[key].$el.offsetHeight,
          width: this.$refs[key].$el.offsetWidth
        }
      }
      this.$emit('update:offsetSize', res)
    }
  }
}
</script>

<style lang="scss" scoped>
#screen{
  height: calc(100vh - 40px);
  width: calc(100vw - 40px);
  max-height: 1080px;
  max-width: 1920px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  .col{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &.center{
      flex-grow: 0;
    }
    .item{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      &.hov{
        &:hover{
          background-color: rgba(#FFF,0.01);
          box-shadow: 0px 0px 0px 1px rgba(#FFF,0.04);
        }  
      }
    }
  }
}
</style>
