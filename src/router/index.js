import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入 Login 组件
import Login from '../components/Login.vue'
// 引入 Home 组件
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

export default router
