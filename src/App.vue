<style lang="scss" scoped="" type="text/css">
	.fixed-icon{
		font-size: 28px;
	}
</style>
<template>
  <div id="app">
  	<div class="main-top">
  	  <router-view>
  	  	<mt-tabbar slot="text" v-model="selected">
			  <mt-tab-item id="food">
			    <span slot="icon" v-if="selected!=='food'" class="fixed-icon iconfont icon-waimai"></span>
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
	  		selected:''
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
	  }
	}
	
</script>
