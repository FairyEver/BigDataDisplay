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
      navActive: 'page2',
      nav: [
        { label: '蛋鸡存栏', value: 'page1' },
        { label: '养殖户分布', value: 'page2' }
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
  }
}
</script>
