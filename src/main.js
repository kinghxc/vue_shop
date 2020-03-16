import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入全局样式表
import './assets/css/global.css'
// 引入字体图标文件
import './assets/fonts/iconfont.css'
// 引入 axios 文件
import axios from 'axios'
// 将 axios 挂载到 Vue组件的原型上
Vue.prototype.$http = axios
// axios请求拦截器
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 Token 验证的 Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 设置 axios 默认请求的根路径(基础地址)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
