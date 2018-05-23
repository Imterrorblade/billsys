import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/page/test'
    },
    {
      path: '/page',
      name: 'page',
      component: require('@/page/container'),
      children: [{
        path: '/test',
        name: 'test',
        component: require('@/page/test')
      }]
    }
  ]
})
