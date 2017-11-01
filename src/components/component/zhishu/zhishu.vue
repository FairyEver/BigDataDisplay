<template>
  <div>
    <div class="title">{{name}}</div>
    <div class="container" :style="style">
      <div :style="itemStyle" class="item">
        <div class="item-title">蛋价指数</div>
        <div class="item-number">3.87</div>
        <div class="item-float">+0.02 ↑0.5%</div>
      </div>
      <div :style="itemStyle" class="item item2">
        <div class="item-title">成本指数</div>
        <div class="item-number">3.87</div>
        <div class="item-float">+0.02 ↑0.5%</div>
      </div>
      <div :style="itemStyle" class="item">
        <div class="item-title">盈利指数</div>
        <div class="item-number">3.87</div>
        <div class="item-float">+0.02 ↑0.5%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { default: '未命名图表' },
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
        height: this.size.width / 3 - 10 + 'px',
        width: this.size.width / 3 + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  color: rgb(49, 175, 139);
  font-size: 24px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
}
.container {
  display: flex;
  .item {
    border: 1px solid #fff;
    text-align: center;
    padding-top: 5px;
    .item-title {
      color: rgb(49, 175, 139);
      font-size: 20px;
    }
    .item-number {
      font-size: 40px;
      font-weight: bold;
    }.item-float {
      font-size: 12px;
    }
  }
  .item2 {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
