<template>
  <div class="item">
    <p class="text label" :style="style">{{label}}</p>
    <p class="text value" :style="style" ref="count"></p>
  </div>
</template>

<script>
import Counter from 'countup.js'
export default {
  props: {
    label: { default: 'label' },
    value: { default: 'value' },
    color: { default: 'red' }
  },
  data () {
    return {
      counterObj: null
    }
  },
  computed: {
    style () {
      return {
        color: this.color
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
      this.counterObj = new Counter(this.$refs.count, 0, this.value, 0, 2, options)
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
  margin: 0px 20px;
  min-width: 120px;
  .text{
    padding: 0px;
    margin: 0px;
    text-align: center;
    display: block;
    &.label{
      font-size: 14px;
      line-height: 20px;
      opacity: .6;
    }
    &.value{
      font-size: 36px;
      line-height: 40px;
    }
  }
}
</style>

