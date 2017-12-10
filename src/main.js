import Vue from 'vue'
import Router from 'vue-router'
//import Resource from 'vue-resource'

import routes from '@/router/router'
import store from '@/store/index'

import MintUI from 'mint-ui'
//import 'mint-ui/lib/style.min.css' 
import '@/common/style/_mixin.scss'
import '@/common/style/mintReset.scss'

import '@/common/js/vue-touch.js'
import '@/common/js/directive.js'

import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
import VueAMap from 'vue-amap';
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'f2a958cc4b3a27356374ac1f9ca229f4',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
 
})
Vue.use(Router)
//Vue.use(Resource)
Vue.use(MintUI)

const router = new Router({
 	routes,
  'linkActiveClass':'active'
})

new Vue({
  router,
  store,
  created:function(){
  	
  },
}).$mount('#app')

