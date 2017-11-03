<template>
  <div>
    <div class="title">{{name}}</div>
    <div class="container" :style="style">
      <div :style="itemStyle" :class="[activeFlag === 0 ? 'item-active' : 'item']" @click="chooseIndex(0)">
        <div class="item-title">蛋价指数</div>
        <div class="item-number" ref="eggCount"></div>
        <!-- <div class="item-number">{{data[0].index}}</div> -->
        <div class="item-float" :class="[data[0].floatFlag >= 0 ? 'item-float-up' : 'item-float-down']">{{data[0].indexFloat}}</div>
      </div>
      <div :style="itemStyle" class="item2" :class="[activeFlag === 1 ? 'item-active' : 'item']" @click="chooseIndex(1)">
        <div class="item-title">成本指数</div>
        <div class="item-number" ref="costCount"></div>
        <div class="item-float" :class="[data[1].floatFlag >= 0 ? 'item-float-up' : 'item-float-down']">{{data[1].indexFloat}}</div>
      </div>
      <div :style="itemStyle" :class="[activeFlag === 2 ? 'item-active' : 'item']" @click="chooseIndex(2)">
        <div class="item-title">盈利指数</div>
        <div class="item-number" ref="profitCount"></div>
        <div class="item-float" :class="[data[2].floatFlag >= 0 ? 'item-float-up' : 'item-float-down']">{{data[2].indexFloat}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from 'countup.js'

export default {
  props: {
    name: { default: '未命名图表' },
    data: { default: () => [] },
    activeFlag: { default: 0 },
    size: {
      default: () => {
        return {
          height: 0,
          width: 0
        }
      }
    }
  },
  data () {
    return {
      counterObj1: null,
      counterObj2: null,
      counterObj3: null
    }
  },
  computed: {
    style () {
      return {
        height: this.size.height + 'px',
        width: this.size.width + 'px'
      }
    },
    itemStyle () {
      return {
        height: this.size.width / 3 - 32 + 'px',
        width: this.size.width / 3 + 'px'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    chooseIndex (flag) {
      this.$emit('update:activeFlag', flag)
    },
    init () {
      var options = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      }
      this.counterObj1 = new Counter(this.$refs.eggCount, 0, this.data[0].index, 2, 2, options)
      this.counterObj2 = new Counter(this.$refs.costCount, 0, this.data[1].index, 2, 2, options)
      this.counterObj3 = new Counter(this.$refs.profitCount, 0, this.data[2].index, 2, 2, options)
      this.counterObj1.start()
      this.counterObj2.start()
      this.counterObj3.start()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  color: #02fdea;
  font-size: 18px;
  font-weight: bold;
  margin-top: 60px;
  margin-bottom: 10px;
}
.container {
  display: flex;
  text-align: center;
  .item {
    padding-top: 20px;
    .item-title {
      color: #02fdea;
      font-size: 18px;
    }
    .item-number {
      color: #fc9700;
      font-size: 40px;
      font-weight: bold;
    }
    .item-float {
      font-size: 12px;
      font-weight: bold;
    }
  }
  .item-active {
    background: #117b79;
    padding-top: 20px;
    .item-title {
      color: #fff;
      font-size: 18px;
    }
    .item-number {
      color: #fff;
      font-size: 40px;
      font-weight: bold;
    }
    .item-float {
      font-size: 12px;
    }
  }
  .item2 {
    margin-left: 5px;
    margin-right: 5px;
  }
  .item-float-up {
    color: #a0ff5b;
  }
  .item-float-down {
    color: #ff5d5b;
  }
}
</style>
