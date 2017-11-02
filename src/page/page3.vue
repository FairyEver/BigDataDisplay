<template>
  <layout
    :auto-play.sync="autoPlay"
    :nav="nav"
    :nav-active.sync="navActive"
    :data-nav="dataNav"
    :data-nav-active.sync="dataNavActive"
    :offset-size.sync="offsetSize"
    :layout-ready.sync="layoutReady"
    :h-item-l1="190"
    :h-item-r1="190">

    <template slot="title">行情大数据展示</template>

    <template slot="l1">
      <zhishu
        name="全国指数"
        :data="nationIndexData"
        :activeFlag.sync="nationEggIndex"
        :size="offsetSize.l1">
      </zhishu>
    </template>
    <template slot="l2">
      <div>
        <div class="time-wrapper">
          <div :class="[nationEggTime === 0 ? 'time-active' : 'time']" @click="nationEggTime = 0">日</div>
          <div :class="[nationEggTime === 1 ? 'time-active' : 'time']" @click="nationEggTime = 1">月</div>
          <div :class="[nationEggTime === 2 ? 'time-active' : 'time']" @click="nationEggTime = 2">年</div>
        </div>
        <broken-line
          name="全国蛋价指数趋势"
          :data="nationIndexTendencyData"
          :ready="layoutReady"
          :size="offsetSize.l2"
          :color-title="colorTitle">
        </broken-line>
      </div>
    </template>
    <template slot="l3">
      <div>
        <div :class="[nationMarketIndex === 0 ? 'market-index-btn-active' : 'market-index-btn']" @click="nationMarketIndex = 0">红壳鸡蛋</div>
        <div :class="[nationMarketIndex === 1 ? 'market-index-btn-active' : 'market-index-btn']" @click="nationMarketIndex = 1">粉壳鸡蛋</div>
        <div :class="[nationMarketIndex === 2 ? 'market-index-btn-active' : 'market-index-btn']" @click="nationMarketIndex = 2">白壳鸡蛋</div>
        <div :class="[nationMarketIndex === 3 ? 'market-index-btn-active' : 'market-index-btn']" @click="nationMarketIndex = 3">玉米</div>
        <div :class="[nationMarketIndex === 4 ? 'market-index-btn-active' : 'market-index-btn']" @click="nationMarketIndex = 4">豆粕</div>
        <div :class="[nationMarketIndex === 5 ? 'market-index-btn-active' : 'market-index-btn']" @click="nationMarketIndex = 5">淘汰鸡</div>
      </div>
      <broken-line
        name="全国行情指数趋势"
        :data="nationMarketIndexTendencyData"
        :ready="layoutReady"
        :size="offsetSize.l2"
        :color-title="colorTitle">
      </broken-line>
      <div>
        <div :class="[nationMarketTime === 0 ? 'market-time-btn-active' : 'market-time-btn']" @click="nationMarketTime = 0">日</div>
        <div :class="[nationMarketTime === 1 ? 'market-time-btn-active' : 'market-time-btn']" @click="nationMarketTime = 1">周</div>
        <div :class="[nationMarketTime === 2 ? 'market-time-btn-active' : 'market-time-btn']" @click="nationMarketTime = 2">月</div>
      </div>
    </template>

    <template slot="c1">
      <map-x
        :name="rName + '蛋鸡存栏: ' + r1Value + ' 只'"
        :ready="layoutReady"
        :size="offsetSize.c1"
        :data="dataMapFilted"
        :auto-play.sync="autoPlay"
        @check="mapClick"
        @playRound="mapPlayRound">
      </map-x>
    </template>
    <!-- <template slot="c2">
      <number-x :data="mapInfo"></number-x>
    </template> -->

    <template slot="r1">
      <zhishu
        name="河北指数"
        :data="areaIndexData"
        :activeFlag.sync="areaEggIndex"
        :size="offsetSize.l1">
      </zhishu>
    </template>
    <template slot="r2">
      <div>
        <div class="time-wrapper">
          <div :class="[areaEggTime === 0 ? 'time-active' : 'time']" @click="areaEggTime = 0">日</div>
          <div :class="[areaEggTime === 1 ? 'time-active' : 'time']" @click="areaEggTime = 1">月</div>
          <div :class="[areaEggTime === 2 ? 'time-active' : 'time']" @click="areaEggTime = 2">年</div>
        </div>
        <broken-line
          name="河北蛋价指数趋势"
          :data="areaIndexTendencyData"
          :ready="layoutReady"
          :size="offsetSize.l2"
          :color-title="colorTitle">
        </broken-line>
      </div>
    </template>
    <template slot="r3">
      <div>
        <div :class="[areaMarketIndex === 0 ? 'market-index-btn-active' : 'market-index-btn']" @click="areaMarketIndex = 0">红壳鸡蛋</div>
        <div :class="[areaMarketIndex === 1 ? 'market-index-btn-active' : 'market-index-btn']" @click="areaMarketIndex = 1">粉壳鸡蛋</div>
        <div :class="[areaMarketIndex === 2 ? 'market-index-btn-active' : 'market-index-btn']" @click="areaMarketIndex = 2">白壳鸡蛋</div>
        <div :class="[areaMarketIndex === 3 ? 'market-index-btn-active' : 'market-index-btn']" @click="areaMarketIndex = 3">玉米</div>
        <div :class="[areaMarketIndex === 4 ? 'market-index-btn-active' : 'market-index-btn']" @click="areaMarketIndex = 4">豆粕</div>
        <div :class="[areaMarketIndex === 5 ? 'market-index-btn-active' : 'market-index-btn']" @click="areaMarketIndex = 5">淘汰鸡</div>
      </div>
      <broken-line
        name="河北行情指数趋势"
        :data="areaMarketIndexTendencyData"
        :ready="layoutReady"
        :size="offsetSize.l2"
        :color-title="colorTitle">
      </broken-line>
      <div>
        <div :class="[areaMarketTime === 0 ? 'market-time-btn-active' : 'market-time-btn']" @click="areaMarketTime = 0">日</div>
        <div :class="[areaMarketTime === 1 ? 'market-time-btn-active' : 'market-time-btn']" @click="areaMarketTime = 1">周</div>
        <div :class="[areaMarketTime === 2 ? 'market-time-btn-active' : 'market-time-btn']" @click="areaMarketTime = 2">月</div>
      </div>
    </template>
  </layout>
</template>

<script>
// [组件] 主布局
import layout from '@/components/layout/2/index.vue'
import zhishu from '@/components/component/zhishu/zhishu.vue'
import mapX from '@/components/charts/map/china/simple3.vue'
import numberX from '@/components/number/index.vue'
import brokenLine from '@/components/charts/line/type1.vue'
import bar from '@/components/charts/bar/row.vue'
import pie from '@/components/charts/pie/type1.vue'
import cunlanInfo from '@/components/component/cunlan/cunlan.vue'

// 数据
import dataMap from '@/data/old/page1/地图数据.js'
import dataTop10 from '@/data/old/page1/全国存栏量.js'
import cunLanFenBu from '@/data/old/page1/全国存栏区间分布.js'
import pinZhongZhanBi from '@/data/old/page1/全国品种占比.js'
import quanGuoDanZhiShu from '@/data/new/page3/全国蛋指数.js'
import heBeiDanZhiShu from '@/data/new/page3/河北蛋指数.js'

// 下面是新的数据
import pinZhong from '@/data/new/page1/全国品种.js'
import cunLan from '@/data/new/page1/全国存栏区间.js'
import cunLanInfoChina from '@/data/new/page1/每种存栏的四项数据_全国.js'

export default {
  components: {
    layout,
    zhishu,
    mapX,
    numberX,
    brokenLine,
    bar,
    pie,
    cunlanInfo
  },
  data () {
    return {
      nationEggIndex: 0,
      nationMarketIndex: 0,
      nationEggTime: 0,
      nationMarketTime: 0,
      areaEggIndex: 0,
      areaMarketIndex: 0,
      areaEggTime: 0,
      areaMarketTime: 0,
      // 蛋指数
      quanGuoDanZhiShu,
      heBeiDanZhiShu,
      // 新版数据
      pinZhong,
      cunLan,
      cunLanInfoChina,
      // 自动播放
      autoPlay: false,
      // 布局尺寸
      offsetSize: {},
      layoutReady: false,
      // 颜色设置
      colorTitle: '#55EDDC',
      // 导航栏
      navActive: 'page3',
      nav: [
        { label: '蛋鸡存栏', value: 'page1' },
        { label: '养殖户分布', value: 'page2' },
        { label: '行情数据', value: 'page3' }
      ],
      // 数据导航栏
      dataNavActive: 'all',
      dataNav: [
        { label: '全部', value: 'all' },
        { label: '红壳蛋鸡', value: 'hong' },
        { label: '白壳蛋鸡', value: 'bai' },
        { label: '粉壳蛋鸡', value: 'fen' }
      ],
      // 数据 地图
      dataMap,
      // 数据 top10 l1
      dataTop10,
      // 全国存栏分布 l2
      cunLanFenBu,
      // 全国品种占比 l3
      pinZhongZhanBi,
      // 右侧有所卡片共享的地区名称
      rName: '',
      // 每个地区的详细数据 r1
      r1Info: {
        cd: 0,
        hl: 0,
        tt: 0,
        ym: 0
      },
      r1Value: 0,
      // 每个地区的存栏区间分布 r2
      r2Data: [
        // {name: 'A', value: '12320'},
        // {name: 'B', value: '34512'},
        // {name: 'C', value: '23482'},
        // {name: 'D', value: '23789'}
      ],
      // 品种占比 r3
      r3Data: [
        // {name: 'A', value: '12320'},
        // {name: 'B', value: '34512'},
        // {name: 'C', value: '23482'},
        // {name: 'D', value: '23789'}
      ]
    }
  },
  created () {
    console.log(this.nationIndexData)
  },
  computed: {
    // 全国指数
    nationIndexData () {
      return this.quanGuoDanZhiShu.map(e => {
        return {
          title: e.title,
          index: e.index,
          indexFloat: e.indexFloat,
          floatFlag: e.floatFlag
        }
      })
    },
    // 全国指数趋势
    nationIndexTendencyData () {
      return this.quanGuoDanZhiShu[this.nationEggIndex].detailData[this.nationEggTime]
    },
    // 全国行情指数趋势
    nationMarketIndexTendencyData () {
      return this.quanGuoDanZhiShu[this.nationEggIndex].detailData[this.nationMarketTime]
    },
    // 地区指数
    areaIndexData () {
      return this.heBeiDanZhiShu.map(e => {
        return {
          title: e.title,
          index: e.index,
          indexFloat: e.indexFloat,
          floatFlag: e.floatFlag
        }
      })
    },
    // 地区指数趋势
    areaIndexTendencyData () {
      return this.heBeiDanZhiShu[this.areaEggIndex].detailData[this.areaEggTime]
    },
    // 地区行情指数趋势
    areaMarketIndexTendencyData () {
      return this.heBeiDanZhiShu[this.areaEggIndex].detailData[this.areaMarketTime]
    },
    dataMapFilted () {
      // 地图数据 这个计算属性会传递给地图
      return this.pinZhong.map(e => {
        return {
          name: e.name,
          value: e.all
        }
      })
    },
    mapInfo () {
      // 产蛋 日耗料 淘汰鸡 疫苗 传递给中间下部分 根据地图右侧的控制器切换
      let data = this.cunLanInfoChina.filter(e => e.name === this.dataNavActive)[0]
      return [
        { label: '产蛋量', value: data.cd },
        { label: '日耗料', value: data.hl },
        { label: '淘汰鸡', value: data.tt },
        { label: '疫苗', value: data.ym }
      ]
    },
    rType () {
      // 右侧有所卡片共享的数据分类 比如'红壳蛋鸡'
      switch (this.dataNavActive) {
        case 'all':
          return '全部品种'
        case 'hong':
          return '红壳蛋鸡'
        case 'bai':
          return '白壳蛋鸡'
        case 'fen':
          return '粉壳蛋鸡'
        default:
          return ''
      }
    }
  },
  watch: {
    navActive (value) {
      // 监视导航的值切换路由
      this.$router.push({
        name: value
      })
    }
  },
  mounted () {
    if (this.$route.params.autoPlay) {
      this.autoPlay = true
    }
  },
  methods: {
    mapClick (params) {
      // 更新地图下面的数据
      if (params.data) {
        let data = params.data
        // r
        this.rName = data.name
        // r1
        this.r1Info = data.r1
        this.r1Value = data.value
        // r2
        this.r2Data = data.r2
        // r3
        this.r3Data = data.r3
      } else {
        // r
        this.rName = ''
        // r1
        this.r1Info = {
          cd: 0,
          hl: 0,
          tt: 0,
          ym: 0
        }
        this.r1Value = 0
        // r2
        this.r2Data = []
        // r3
        this.r3Data = []
      }
    },
    mapPlayRound () {
      // 地图播放了一遍
      console.log('地图播放完了一圈')
      console.log('autoPlay = ' + this.autoPlay)
      if (this.dataNavActive === 'all') {
        this.dataNavActive = 'hong'
        this.autoPlay = true
      } else if (this.dataNavActive === 'hong') {
        this.dataNavActive = 'bai'
        this.autoPlay = true
      } else if (this.dataNavActive === 'bai') {
        this.dataNavActive = 'fen'
        this.autoPlay = true
      } else {
        console.log('跳转页面到page2')
        this.$router.push({
          name: 'page2',
          params: {
            autoPlay: true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.market-index-btn {
  text-align: center;
  background: #32363F;
  margin-left: 10px;
  margin-right: 5px;
  padding: 5px 1px;
  width: 70px;
  color: #fff;
  font-size: 14px;
}
.market-index-btn-active {
  text-align: center;
  background: #117b79;
  margin-left: 10px;
  margin-right: 5px;
  padding: 5px 1px;
  width: 70px;
  color: #fff;
  font-size: 14px;
}
.market-time-btn {
  text-align: center;
  background: #32363F;
  margin-left: 10px;
  padding: 5px 1px;
  width: 25px;
  color: #fff;
  font-size: 14px;
}
.market-time-btn-active {
  text-align: center;
  background: #117b79;
  margin-left: 10px;
  padding: 5px 1px;
  width: 25px;
  color: #fff;
  font-size: 14px;
}
.time-wrapper {
  font-size: 0;
  text-align: center;
}
.time {
  background: #32363F;
  padding: 3px 10px;
  font-size: 16px;
  display: inline-block;
}
.time-active {
  background: #117b79;
  padding: 3px 10px;
  font-size: 16px;
  display: inline-block;
}
</style>

