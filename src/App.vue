<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
	.mint-tabbar .mint-tab-item{
		.iconfont{
			font-size: 23px;
			color: #26A2FF;
		}
	}
	.mint-tabbar .mint-tab-item[href^="#"]{
		.iconfont{
			color: #888;
		}
	}
</style>
<template>
  <div>
  	<div class="main-top">
	  	  <router-view :animateName="animation">
	  	  	<mt-tabbar slot="fixed-navbar" v-model="props.value" slot-scope="props">
			  <mt-tab-item id="index" v-if="props.value!=='index'" href="#/index">
			    <span slot="icon"  class="fixed-icon iconfont icon-eliaomo"></span>
			    	外卖
			  </mt-tab-item>
			   <mt-tab-item id="index" v-else>
			    <span slot="icon" class="fixed-icon iconfont icon-eliaomo"></span>
			    	外卖
			  </mt-tab-item>
			  <mt-tab-item id="orderlist" v-if="props.value!=='orderlist'" href="#/orderList">
			     <span slot="icon" class="fixed-icon iconfont icon-activity" style="font-size: 26px;" ></span>
			    	订单
			  </mt-tab-item>
			  <mt-tab-item id="orderlist" v-else>
			     <span slot="icon" class="fixed-icon iconfont icon-activity_fill" style="font-size: 26px;" ></span>
			    	订单
			  </mt-tab-item>
			  <mt-tab-item id="user" v-if="props.value!=='user'" href="#/user/1234" >
			     <span slot="icon" class="fixed-icon iconfont icon-account"></span>
			    	我的
			  </mt-tab-item>
			  <mt-tab-item id="user" v-else >
			     <span slot="icon" class="fixed-icon iconfont icon-accountfilling"></span>
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

	  },
	  watch: {
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
