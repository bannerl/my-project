<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
</style>
<template>
  <div>
  	<div class="main-top">
	  	  <router-view :animateName="animation">
	  	  	<mt-tabbar slot="fixed-navbar" v-model="selected">
			  <mt-tab-item id="index">
			    <span slot="icon" v-if="selected!=='index'" class="fixed-icon iconfont icon-waimai"></span>
			    <span slot="icon" style="font-size: 25px;" v-else class="fixed-icon iconfont icon-waimai1"></span>
			    	外卖
			  </mt-tab-item>
			  <mt-tab-item id="orderList">
			     <span slot="icon" v-if="selected!=='orderList'" class="fixed-icon iconfont icon-mingxi"></span>
			     <span slot="icon" style="font-size: 26px;" v-else class="fixed-icon iconfont icon-dingdan6"></span>
			    	订单
			  </mt-tab-item>
			  <mt-tab-item id="user">
			     <span slot="icon" v-if="selected!=='user'" class="fixed-icon iconfont icon-wode2"></span>
			     <span slot="icon" v-else class="fixed-icon iconfont icon-wode11"></span>
			    	我的
			  </mt-tab-item>
			</mt-tabbar>
	  	  </router-view>
	  	  	
  	</div>
  	
  </div>
</template>

<script>
	import {loadUrl} from '@/common/js/unit'
	import {setStore, getStore} from '@/common/js/savaLocal'
	import {mapState,mapMutations} from 'vuex'
	
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		selected:'',
	  		animation: false
	  	}
	  },
	  computed: {
	  	...mapState([
	  		'loginStatus'
	  	])
	  },
	  created () {
	  	let url = (window.location.href).split('#')
  		if(url[0].indexOf('index')) {
  			this.selected = 'index'
  		} else if(url[0].indexOf('user')){
  			this.selected = 'user'
  		} else {
  			this.selected = 'orderList'
  		}
	  },
	  watch: {
	 	'selected' () {
	 		let str = this.selected
	  		let id = getStore('user_id')
	  		if(!id && !this.loginStatus){
	  			id = 0
	  		}
	  		if(str === "user"){
	  			this.$router.push({name:this.selected,params:{'userId':id}})
	  			return true
	  		}else if(str === "orderList"){
	  			this.$router.push({name:this.selected})
	  			return true
	  		} else if(str === "index") {
	  			this.$router.push({name:this.selected})
	  			return true
	  		} else {
	  			return false
	  		}
	  		return true
	 	},
	    '$route' (to, from) {
		   if(to.name !== "index" && to.name !== "orderList" && to.name !== "user") {
		   	this.selected = ''
		   } else {
		   	this.selected = to.name
		   }
		   
		   if(from.name === "index" || from.name === "orderList") {
		   	 if(to.name === "user") {
		   	 	this.animation = true
		   	 }
		   }
		  // console.log(fromDepth)
		   //this.transitionName = toDepth < fromDepth ? 'static' : 'indexFade'
	    }
	 }
	}
	
</script>
