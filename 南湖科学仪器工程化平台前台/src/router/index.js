import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: { name: 'HomeIndex' },
    children: [
      { path: '', name: 'HomeIndex', component: Home },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/case',
        name: 'case',
        component: () => import('../views/case/List.vue')
      },
      {
        path: '/case-detail/:id',
        name: 'caseDetail',
        component: () => import('../views/case/Detail.vue')
      },
      {
        path: '/news',
        name: 'newsList',
        component: () => import('../views/news/List.vue')
      },
      {
        path: '/news-detail/:id',
        name: 'newsDetail',
        component: () => import('../views/news/Detail.vue')
      },
      {
        path: '/search-result',
        name: 'SearchResult',
        component: () => import('../views/search/SearchResult.vue')
      },
      {
        path: '/search-detail/:id',
        name: 'SearchDetail',
        component: () => import('../views/search/SearchDetail.vue')
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
  scrollBehavior: () => ({ y: 0 }),
})


export default router

