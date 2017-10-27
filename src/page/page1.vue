<template>
  <layout
    :nav="nav"
    :nav-active.sync="navActive"
    :data-nav="dataNav"
    :data-nav-active.sync="dataNavActive"
    :offset-size.sync="offsetSize"
    :layout-ready.sync="layoutReady"
    :h-item-l1="240"
    :h-item-r1="240">

    <template slot="title">行情大数据展示</template>

    <template slot="l1">
      <bar
        name="全国存栏量"
        :ready="layoutReady"
        :size="offsetSize.l1"
        :data="dataTop10"
        :color-title="colorTitle">
      </bar>
    </template>
    <template slot="l2">
      <pie
        name="全国存栏区间分布"
        :ready="layoutReady"
        :size="offsetSize.l2"
        :data="cunLanFenBu"
        :color-title="colorTitle">
      </pie>
    </template>
    <template slot="l3">
      <pie
        name="全国品种占比"
        :ready="layoutReady"
        :size="offsetSize.l3"
        :data="pinZhongZhanBi"
        :color-title="colorTitle">
      </pie>
    </template>

    <template slot="c1">
      <map-x
        name="全国养殖户分布"
        :ready="layoutReady"
        :size="offsetSize.c1"
        :data="dataMapFilted"
        @check="mapClick">
      </map-x>
    </template>
    <template slot="c2">
      <number-x :data="mapInfo"></number-x>
    </template>

    <template slot="r1">
      <cunlan-info
        :ready="layoutReady"
        :size="offsetSize.r1">
      </cunlan-info>
    </template>
    <template slot="r2">{{offsetSize.r2}}</template>
    <template slot="r3">{{offsetSize.r3}}</template>

  </layout>
</template>

<script>
// [组件] 主布局
import layout from '@/components/layout/2/index.vue'
import mapX from '@/components/charts/map/china/simple.vue'
import numberX from '@/components/number/index.vue'
import bar from '@/components/charts/bar/row.vue'
import pie from '@/components/charts/pie/type1.vue'
import cunlanInfo from '@/components/component/cunlan/cunlan.vue'

// 数据
import dataMap from '@/data/page1/map.js'
import dataTop10 from '@/data/page1/top10.js'
import cunLanFenBu from '@/data/page1/cun-lan-fen-bu.js'
import pinZhongZhanBi from '@/data/page1/pin-zhong-zhan-bi.js'

export default {
  components: {
    layout,
    mapX,
    numberX,
    bar,
    pie,
    cunlanInfo
  },
  data () {
    return {
      // 布局尺寸
      offsetSize: {},
      layoutReady: false,
      // 颜色设置
      colorTitle: '#55EDDC',
      // 导航栏
      navActive: 'page1',
      nav: [
        { label: '蛋鸡存栏', value: 'page1' },
        { label: '养殖户分布', value: 'page2' }
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
      // 数据 top10
      dataTop10,
      // 全国存栏分布
      cunLanFenBu,
      // 全国品种占比
      pinZhongZhanBi,
      // r1区域 每个地区的详细数据
      cunlanSitao: 0
    }
  },
  computed: {
    dataMapFilted () {
      // 地图数据
      return this.dataMap[this.dataNavActive].mapData
    },
    mapInfo () {
      // 中间下部分地图信息 根据地图右侧的控制器切换
      let mapInfo = this.dataMap[this.dataNavActive].mapInfo
      return [
        { label: '产蛋量', value: mapInfo.cd },
        { label: '日耗料', value: mapInfo.hl },
        { label: '淘汰鸡', value: mapInfo.tt },
        { label: '疫苗', value: mapInfo.tm }
      ]
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
  methods: {
    mapClick (params) {
      console.log(params)
      // 更新地图下面的数据
      // if (params.data && params.data.info) {
      //   let info = params.data.info
      //   this.mapInfo[0].value = info.cd
      //   this.mapInfo[1].value = info.hl
      //   this.mapInfo[2].value = info.tt
      //   this.mapInfo[3].value = info.ym
      // } else {
      //   this.mapInfo[0].value = 0
      //   this.mapInfo[1].value = 0
      //   this.mapInfo[2].value = 0
      //   this.mapInfo[3].value = 0
      // }
    }
  }
}
</script>
