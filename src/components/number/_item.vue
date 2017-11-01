<template>
  <div class="item" :style="itemStyle">
    <p class="text label" :style="styleLabel">
      <span v-if="point" :style="styleBG"></span>
      {{label}}
    </p>
    <p class="text value" :style="styleValue" ref="count"></p>
    <p class="text label" :style="styleLabel">{{dw}}</p>
  </div>
</template>

<script>
import Counter from 'countup.js'
export default {
  props: {
    label: { default: 'label' },
    value: { default: 100 },
    dw: { default: '' },
    color: { default: 'red' },
    // 额外设置项
    point: { default: true },
    labelSize: { default: 14 },
    valueSize: { default: 42 },
    minWidth: { default: 160 }
  },
  data () {
    return {
      counterObj: null
    }
  },
  watch: {
    value (value) {
      if (this.counterObj !== null) {
        this.counterObj.update(value)
      }
    }
  },
  computed: {
    itemStyle () {
      // 最外层的容器样式
      return {
        minWidth: this.minWidth + 'px'
      }
    },
    style () {
      return {
        color: this.color
      }
    },
    styleBG () {
      return {
        backgroundColor: this.color
      }
    },
    styleLabel () {
      // label样式
      return {
        ...this.style,
        fontSize: this.labelSize + 'px',
        lineHeight: this.labelSize + 6 + 'px'
      }
    },
    styleValue () {
      // value样式
      return {
        ...this.style,
        fontSize: this.valueSize + 'px',
        lineHeight: this.valueSize + 6 + 'px'
      }
    }
  },
  mounted () {
    this.init()
    this.start()
  },
  methods: {
    init () {
      var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      }
      this.counterObj = new Counter(this.$refs.count, 0, this.value, 0, 1, options)
    },
    start () {
      if (!this.counterObj.error) {
        this.counterObj.start()
      } else {
        console.error(this.counterObj.error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  margin: 0px;
  .text{
    padding: 0px;
    margin: 0px;
    text-align: center;
    display: block;
    span{
      display: inline-block;
      height: 10px;
      width: 10px;
      border-radius: 5px;
    }
    &.label{
      opacity: .6;
    }
  }
}
</style>

