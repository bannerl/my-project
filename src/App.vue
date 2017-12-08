<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
</style>
<template>
  <div>
  	<div class="main-top">
	  	  <router-view :animateName="animation">
	  	  	<mt-tabbar slot="fixed-navbar" v-model="props.value" slot-scope="props">
			  <mt-tab-item id="index" v-if="props.value!=='index'" href="#/index">
			    <span slot="icon"  class="fixed-icon iconfont icon-waimai"></span>
			    	外卖
			  </mt-tab-item>
			   <mt-tab-item id="index" v-else>
			    <span slot="icon" style="font-size: 25px;" class="fixed-icon iconfont icon-waimai1"></span>
			    	外卖
			  </mt-tab-item>
			  <mt-tab-item v-if="props.value!=='orderList'" href="#/orderList" >
			     <span slot="icon" class="fixed-icon iconfont icon-mingxi"></span>
			    	订单
			  </mt-tab-item>
			  <mt-tab-item v-else>
			     <span slot="icon" style="font-size: 26px;" class="fixed-icon iconfont icon-dingdan6"></span>
			    	订单
			  </mt-tab-item>
			  <mt-tab-item id="user" v-if="props.value!=='user'" href="#/user/1234" >
			     <span slot="icon" class="fixed-icon iconfont icon-wode2"></span>
			    	我的
			  </mt-tab-item>
			  <mt-tab-item id="user" v-else >
			     <span slot="icon" class="fixed-icon iconfont icon-wode11"></span>
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
	  		childData:'',
	  		animation: false
	  	}
	  },
	  computed: {
	  	...mapState([
	  		'loginStatus'
	  	])
	  },
	  created () {
	  	console.log(this.childData)
//	  	let url = (window.location.href).split('#')
//		if(url[0].indexOf('index')) {
//			this.selected = 'index'
//		} else if(url[0].indexOf('user')){
//			this.selected = 'user'
//		} else {
//			this.selected = 'orderList'
//		}
	  },
	  watch: {
	 	'selected' () {
//	 		let str = this.selected
//	  		let id = getStore('user_id')
//	  		if(!id && !this.loginStatus){
//	  			id = 0
//	  		}
//	  		if(str === "user"){
//	  			this.$router.push({name:this.selected,params:{'userId':id}})
//	  			return true
//	  		}else if(str === "orderList"){
//	  			this.$router.push({name:this.selected})
//	  			return true
//	  		} else if(str === "index") {
//	  			this.$router.push({name:this.selected})
//	  			return true
//	  		} else {
//	  			return false
//	  		}
//	  		return false
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
