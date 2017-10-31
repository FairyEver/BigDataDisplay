import Vue from 'vue'
import Router from 'vue-router'
import page1 from '@/page/page1'
import page2 from '@/page/page2'
import page3 from '@/page/page3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3
    }
  ]
})
