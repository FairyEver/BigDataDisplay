<template>
  <layout
    :nav="nav"
    :nav-active.sync="navActive">
    <template slot="title">行情大数据展示</template>
  </layout>
</template>

<script>
// [组件] 主布局
import layout from '@/components/layout/2/index.vue'

export default {
  components: {
    layout
  },
  data () {
    return {
      // 导航栏
      navActive: 1,
      nav: [
        { label: '蛋鸡存栏', value: 1 },
        { label: '养殖户分布', value: 2 }
      ]
    }
  }
}
</script>
