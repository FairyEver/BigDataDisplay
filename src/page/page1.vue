<template>
  <layout
    :nav="nav"
    :nav-active.sync="navActive"
    :data-nav="dataNav"
    :data-nav-active.sync="dataNavActive"
    :offset-size.sync="offsetSize"
    :layout-ready.sync="layoutReady">

    <template slot="title">行情大数据展示</template>

    <template slot="l1">{{offsetSize.l1}}</template>
    <template slot="l2">{{offsetSize.l2}}</template>
    <template slot="l3">{{offsetSize.l3}}</template>

    <template slot="c1">
      <map-x
        name="全国养殖户分布"
        :ready="layoutReady"
        :size="offsetSize.c1"
        :data="dataMap"
        @check="mapFenbu">
      </map-x>
    </template>
    <template slot="c2">
      <number-x :data="mapInfo"></number-x>
    </template>

    <template slot="r1">{{offsetSize.r1}}</template>
    <template slot="r2">{{offsetSize.r2}}</template>
    <template slot="r3">{{offsetSize.r3}}</template>

  </layout>
</template>

<script>
// [组件] 主布局
import layout from '@/components/layout/2/index.vue'
import mapX from '@/components/charts/map/china/simple.vue'
import numberX from '@/components/number/index.vue'

// 数据
import dataMap from '@/data/page1/map.js'

export default {
  components: {
    layout,
    mapX,
    numberX
  },
  data () {
    return {
      // 布局尺寸
      offsetSize: {},
      layoutReady: false,
      // 导航栏
      navActive: 'page1',
      nav: [
        { label: '蛋鸡存栏', value: 'page1' },
        { label: '养殖户分布', value: 'page2' }
      ],
      // 数据导航栏
      dataNavActive: 1,
      dataNav: [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 },
        { label: 'label3', value: 3 },
        { label: 'label4', value: 4 }
      ],
      // 数据
      dataMap,
      mapInfo: [
        { label: '产蛋量', value: 0 },
        { label: '日耗料', value: 0 },
        { label: '淘汰鸡', value: 0 },
        { label: '疫苗', value: 0 }
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
    mapFenbu (params) {
      if (params.data) {
        let info = params.data.info
        this.mapInfo[0].value = info.cd
        this.mapInfo[1].value = info.hl
        this.mapInfo[2].value = info.tt
        this.mapInfo[3].value = info.ym
      }
    }
  }
}
</script>
