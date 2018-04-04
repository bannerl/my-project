<template>
	<transition name="sellerFade">
	  <div class="sellerPage">
	  	<goods-header :seller='seller'></goods-header>
	  	<div class="tab">
	  		<div class="tab-item">
	  			<span @click="toGoods" :class="{active:type==='goods'}">商品</span>
	  			<!--<router-link to='/seller/goods' replace>商品</router-link>-->
	  		</div>
	  		<div class="tab-item">
	  			<span @click="toRatings" :class="{active:type==='ratings'}">评价</span>
	  			<!--<router-link to='/seller/ratings' replace>评价</router-link>-->
	  		</div>
	  		<div class="tab-item">
	  			<span @click="toDescription" :class="{active:type==='description'}">商家</span>
	  			<!--<router-link to='/seller/description' replace>商家</router-link>-->
	  		</div>
	  	</div>
	  	<keep-alive>
	    	<router-view :seller='seller' />
	  	</keep-alive>
	  </div>
  </transition>
</template>

<script>
	import { loadUrl } from '@/common/js/unit'
	import goodsHeader from './children/header/header'
	import {getSellerInfo} from '../../service/getData'
	const noError = 0;
	
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		seller:{},
	  		type: '',
	  		arg: ''
	  	}
	  },
	  beforeRouteEnter (to,from,next) {
	  	next(vm => {
	  		let obj = loadUrl(window.location.href)
	  		let arg = obj.id
	  		arg = '?id='+arg
	  		vm.arg = arg
	  	})
	  },
	  methods: {
	  	toGoods: function () {
	  		this.type = 'goods'
	  		this.$router.replace('/seller/goods'+this.arg)
	  	},
	  	toRatings: function () {
	  		this.type = 'ratings'
	  		this.$router.replace('/seller/ratings'+this.arg)
	  	},
	  	toDescription: function () {
	  		this.type = 'description'
	  		this.$router.replace('/seller/description'+this.arg)
	  	},
	  	async getSellerInfo(){
	  		let id = window.location.href
	  		id = id.split('=')[1]
	  		let res = await getSellerInfo(id)
		    res = res.data
		    
		    if(res.status === noError){
		    	this.seller = res.data
		    	this.type = "goods"
		    	this.$router.replace('/seller/goods'+this.arg)
			}
	  	}
	  },
	  created(){
	  	this.getSellerInfo();
	  },
	  components:{
	  	'goods-header':goodsHeader
	  }
	  
	}
	
</script>

<style lang="scss" scoped="" type="text/css">
	@import '../../common/style/mixin';
	.sellerPage{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		bottom: 0;
	}
	.tab{
		position:relative;
		display:flex;
		padding: 14px 12px;
		background: #fff;
		&:after{
			@include border-1px();
		}
		.tab-item{
			flex:1;
			font-size: 16px;
			text-align: center;
			color: #333;
			span.active{
				color:#ff4500;
			}
		}
	}
	.sellerFade-enter-active,.sellerFade-leave-active{
		transition: all .2s;
		opacity: 1;
	}
	.sellerFade-enter,.sellerFade-leave-to {
		opacity: 0;
	}

</style>
