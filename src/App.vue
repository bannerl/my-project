<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
	.static-enter-active,.static-leave-active{
		transition: all .2s linear;
		transform: translate3d(0,0,0);
	}
	.static-enter,.static-leave-to{
		transform: translate3d(0,0,0);
	}
</style>
<template>
  <div id="app">
  	<div class="main-top">
	  	  <router-view>
	  	  	<mt-tabbar slot="fixed-navbar" v-model="selected">
	  	  		<div></div>
				  <mt-tab-item id="food">
				    <span slot="icon" v-if="selected!=='food'" class="fixed-icon iconfont icon-waimai"></span>
				    <span slot="icon" style="font-size: 25px;" v-else class="fixed-icon iconfont icon-waimai1"></span>
				    	外卖
				  </mt-tab-item>
				  <div @click="as">
					  <mt-tab-item id="orderList">
					     <span slot="icon" v-if="selected!=='orderList'" class="fixed-icon iconfont icon-mingxi"></span>
					     <span slot="icon" style="font-size: 26px;" v-else class="fixed-icon iconfont icon-dingdan6"></span>
					    	订单
					  </mt-tab-item>
				</div>	  
				  <mt-tab-item id="user">
				     <span slot="icon" v-if="selected!=='user'" class="fixed-icon iconfont icon-wode2"></span>
				     <span slot="icon" v-else class="fixed-icon iconfont icon-wode11"></span>
				    	我的
				  </mt-tab-item>
				</mt-tabbar>
	  	  </router-view>
  	</div>
  	<div class="main-bottom" v-show="navbarFixedShow">
  	</div>
  </div>
</template>

<script>
	import {getStore} from '@/common/js/savaLocal'
	
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		selected:'',
	  		//transitionName:'static'
	  	}
	  },
	  methods: {
	  	ds: function(){
	  		
	  	}
	  },
	  computed: {
	  	navbarFixedShow: function(){
	  		let str = this.selected
	  		let id = getStore('user_id')
	  		if(!id){
	  			id = 0
	  		}
	  		if(str === "user"){
	  			this.$emit('deleteFade')
	  			this.$router.push({name:this.selected,params:{'userId':id}})
	  		}else{
	  			this.$router.push({name:this.selected})
	  		}

	  		return false
	  	}
	  },
	 watch: {
	    '$route' (to, from) {
	    	//console.log(this.$route)
		  // const toDepth = to.path.split('/').length
		  // const fromDepth = from.path.split('/').length
		   //console.log(to)
		  // console.log(from)
		  // console.log(fromDepth)
		   //this.transitionName = toDepth < fromDepth ? 'static' : 'indexFade'
	    }
	 }
	}
	
</script>
