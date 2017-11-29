<style lang="scss" type="text/css">
	.order-description{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background: #f5f5f5;
		padding-bottom: 50px;
	}
	.orderDesc-enter-active,.orderDesc-leave-active{
		transition: all .2s linear;
		transform: translate3d(0,0,0);
	}
	.orderDesc-enter,.orderDesc-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="orderDesc">
		<div v-if="orderInfo" v-show="orderShow" class="order-description">
		<mt-header title="筛选">
		  <router-link to="/orderList" slot="left">
		    <mt-button @click="close" icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<mt-cell :title="orderInfo.seller" class="space">
		  <span>
		  	<i class="iconfont icon-dayuhao3"></i>
		  </span>
		  <img slot="icon" class="sellerImage" :src="orderInfo.image"  width="24" height="24">
		</mt-cell>
		<mt-cell :title="orderInfo.name">
			 <div class="title">
			  	x{{orderInfo.count}}<span>￥{{orderInfo.price}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="配送费">
			 <div class="delivery">
			  	<span>￥{{orderInfo.deliveryPrice}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="特价优惠">
		  <div class="discount">
		  	<span>-￥{{orderInfo.discount}}</span>
		  </div>
		  <img slot="icon" class="sellerImage" :src="orderInfo.image"  width="24" height="24">
		</mt-cell>
		<mt-cell title="订单结算">
		  <div class="price-wrapper">
		  	<span class="text">总计</span>
		  	<span class="mark">￥</span>
		  	<span class="price">{{orderInfo.price+orderInfo.deliveryPrice-orderInfo.discount}}</span>
		  </div>
		</mt-cell>
		<mt-cell title="配送方:" class="space noFlex">
			 <div>
			  	<span class="seller">{{orderInfo.seller}}</span>
			  	<span class="text">配送</span>
		  	</div>
		</mt-cell>
		<mt-cell title="订单号:" class="noFlex">
			 <div>
			  	<span class="seller">{{orderInfo.number}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="配送时间:" class="noFlex">
			 <div>
			  	<span class="seller">{{orderInfo.deiveryTime}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="收货地址:" class="noFlex">
			 <div class="address-wrapper">
			  	<span class="username">{{orderInfo.receiver}}</span>
			  	<span class="phone">{{orderInfo.phone}}</span>
			  	<span class="adress">{{orderInfo.address}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="支付方式:" class="noFlex">
			 <div>
			  	<span class="username">{{orderInfo.payMethod}}</span>
		  	</div>
		</mt-cell>
		<div class="more-opration border-1px-top">
			<div class="item border-1px-right">
				<router-link to="/seller">再来一单</router-link>
			</div>
			<div class="item border-1px-right">
				<router-link to="/seller">投诉</router-link>
			</div>
			<div class="item border-1px-right">
				<router-link to="/seller" class="color">去评价</router-link>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
	import data from "../../../../data.json"
	
	export default {
		name: "orderDescription",
		props: {
			orderShow: {
				type: Boolean
			},
			orderInfo: {
				type: Object
			}
		},
		data(){
			return {
				food:this.orderInfo
			}
		},
		methods: {
			close: function(){
				this.$emit("close")
			}
		}
	}
</script>
