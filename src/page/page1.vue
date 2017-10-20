<template>
  <layout :offset-size.sync="offsetSize">



    <template slot="l1">
      <l1
        name="全国排名"
        :ready="layoutReady"
        :size="offsetSize.l1"
        :data="l1Data">
      </l1>
    </template>

    <template slot="l2">
      <pie
        name="全国存栏区间分布"
        :ready="layoutReady"
        :size="offsetSize.l2">
      </pie>
    </template>

    <template slot="l3">
      <pie
        name="全国品种占比"
        :ready="layoutReady"
        :size="offsetSize.l2">
      </pie>
    </template>



    <template slot="c1">
      <p class="title-main">行情大数据展示</p>
    </template>

    <template slot="c2">
      <c2
        :active.sync="c2Active"
        :option="c2Option">
      </c2>
    </template>

    <template slot="c3">
      <transition name="scale">
        <map-yzhfb
          v-show="c2Active === 2"
          name="全国养殖户分布"
          :ready="layoutReady"
          :size="offsetSize.c3"
          :data="c3Data"
          @check="mapFenbu">
        </map-yzhfb>
      </transition>
    </template>

    <template slot="c4">
      <map-data-number :data="c4Data"></map-data-number>
    </template>



    <template slot="r1">
      <l1
        name="全国排名1"
        :ready="layoutReady"
        :size="offsetSize.l1"
        :data="l1Data">
      </l1>
    </template>

    <template slot="r2">
      <pie
        name="全国存栏区间分布"
        :ready="layoutReady"
        :size="offsetSize.l2">
      </pie>
    </template>

    <template slot="r3">
      <pie
        name="全国存栏区间分布"
        :ready="layoutReady"
        :size="offsetSize.l2">
      </pie>
    </template>



  </layout>
</template>

<script>
// [组件] 主布局
import layout from '@/components/layout/1/index.vue'
// [组件] 地图切换控制器
import c2 from '@/components/btnGroup/MapRow.vue'
// [组件] 全国前十 条形图
import l1 from '@/components/charts/bar/row.vue'
// [组件] 饼图
import pie from '@/components/charts/pie/type1.vue'
// [组件] 地图信息 c4区域
import mapDataNumber from '@/components/charts/map/data/number/index.vue'
// [组件] 全国地图 养殖户分布
import mapYzhfb from '@/components/charts/map/china/simple.vue'
// 数据
import c3Data from '@/data/yang-zhi-hu-fen-bu.js'
import l1Data from '@/data/top10-cunLan.js'
export default {
  components: {
    layout,
    l1,
    c2,
    pie,
    mapDataNumber,
    mapYzhfb
  },
  data () {
    return {
      // 这个数据存有所有的板块尺寸 并且根据窗口大小保持更新
      offsetSize: false,
      // 数据
      l1Data,
      c3Data,
      c4Data: [
        { label: '产蛋量', value: '1234' },
        { label: '日耗料', value: '5671' },
        { label: '淘汰鸡', value: '5489' },
        { label: '疫苗', value: '125' }
      ],
      // c2 切换蛋鸡存栏和养殖户分布的按钮组
      c2Active: 2,
      c2Option: [
        { label: '蛋鸡存栏', value: 1 },
        { label: '养殖户分布', value: 2 }
      ]
    }
  },
  computed: {
    layoutReady () {
      return this.offsetSize !== false
    }
  },
  methods: {
    // 养殖户分布地图点击后的事件
    mapFenbu (params) {
      alert(params.name)
    }
  }
}
</script>

<style lang="scss">
// 中间的主标题 [c1位置]
.title-main{
  color: #E0FFFF;
  font-size: 36px;
}
</style>

