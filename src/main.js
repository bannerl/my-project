import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

import routes from '@/router/router'
import store from '@/store/index'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css' 
import '@/common/style/_mixin.scss'
import '@/common/style/mintReset.scss'

import '@/common/js/vue-touch.js'

import App from './App'
//console.log(store)
//import seller from 'components/seller/seller'
//import goods from 'components/goods/goods'
//import ratings from 'components/ratings/ratings'


Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(Router)
Vue.use(Resource)
Vue.use(MintUI)

const router = new Router({
 	routes,
  'linkActiveClass':'active'
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  created:function(){
  	console.log(this.$options)
  },
  components: { App }
})