import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Home from './component/home.vue'

Vue.use(VueRouter);// 使用路由
Vue.use(VueResource);// 使用vue封装的ajax

const routes = [
	{ 
		path: '/home', 
		component: Home
	}
]

const router = new VueRouter({

  routes // （缩写）相当于 routes: routes
})

new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})
