<template>
  <div :style="style" class="body">
    <div class="title" :style="styleColor">{{name}}</div>
    <div class="content">
      <div class="info">
        <!-- 数字信息 -->
        <item
          label="产蛋量"
          :value="info.cd"
          color="#DB5F52"
          :point="point"
          :label-size="labelSize"
          :value-size="valueSize"
          :minWidth="60">
        </item>
        <item
          label="日耗料"
          :value="info.hl"
          color="#D69E41"
          :point="point"
          :label-size="labelSize"
          :value-size="valueSize"
          :minWidth="60">
        </item>
        <item
          label="淘汰鸡"
          :value="info.tt"
          color="#58BCA0"
          :point="point"
          :label-size="labelSize"
          :value-size="valueSize"
          :minWidth="60">
        </item>
        <item
          label="疫苗"
          :value="info.ym"
          color="#A35EDA"
          :point="point"
          :label-size="labelSize"
          :value-size="valueSize"
          :minWidth="60">
        </item>
        <!-- 数字信息 结束 -->
      </div>
      <div class="map">
        <city :province="province"></city>
      </div>
      <div class="number" :style="styleColor">总存栏 {{value}} 只</div>
    </div>
  </div>
</template>

<script>
import item from '@/components/number/_item.vue'
import city from '@/components/charts/map/piece/mini.vue'
export default {
  components: {
    item,
    city
  },
  props: {
    name: { default: '' },
    size: {
      default: () => {
        return {
          height: 0,
          width: 0
        }
      }
    },
    value: { default: 0 },
    info: {
      default: () => {
        return {
          cd: 0,
          hl: 0,
          tt: 0,
          ym: 0
        }
      }
    },
    province: { default: '河北' },
    // 样式设置
    colorTitle: { default: '#FFF' }
  },
  data () {
    return {
      point: false,
      labelSize: 12,
      valueSize: 26
    }
  },
  computed: {
    style () {
      // 最外层元素的样式
      return {
        width: this.size.width + 'px',
        height: this.size.height + 'px'
      }
    },
    styleColor () {
      return {
        color: this.colorTitle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$heightTitle: 30px;
$widthInfo: 80px;
$heightNumber: 30px;
.body{
  position: relative;
  .title{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: $heightTitle;
    line-height: $heightTitle;
    text-align: center;
    font-size: 14px;
  }
  .content{
    position: absolute;
    top: $heightTitle;
    bottom: 10px;
    width: 100%;
    .info{
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      width: $widthInfo;
      // 居中
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
    }
    .map{
      position: absolute;
      top: 0px;
      left: $widthInfo;
      right: 0px;
      bottom: $heightNumber;
    }
    .number{
      position: absolute;
      bottom: 0px;
      left: $widthInfo;
      right: 0px;
      height: $heightNumber;
      line-height: $heightNumber;
    }
  }
}
</style>

