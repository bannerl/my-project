<style lang="scss" type="text/css">
	.order-description{
		position: relative;
		padding-bottom: 50px;
		.sellerImage{
			border-radius: 50%;
		}
		.space{
			margin-top: 14px;
		}
		.address-wrapper{
			font-size: 15px;
			line-height: 18px;
			.username{
				margin-right: 4px;
			}
			.phone{
				margin-right: 4px;
			}
		}
		.noFlex{
			.mint-cell-title{
				flex: inherit;
				width: 96px;
			}
			.mint-cell-value{
				flex: 1;
			}
		}
		.more-opration{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 40px;
			width: 100%;
			display: flex;
			background: #fff;
			.item{
				flex: 1;
				line-height: 40px;
				font-size: 15px;
				text-align: center;
				a.color{
					color: #26a2ff;
				}
			}
		}
		.title{
			color: #555;
			span{
				margin-left: 12px;
			}
		}
		.delivery{
			color: #555;
		}
		.discount{
			color: #555;
			span{
				margin-left: 6px;
			}
		}
		.price-wrapper{
			.text{
				color: #555;
			}
			.mark{
				color: #ff318c;
			}
			.price{
				color: #ff318c;
				font-weight: 700;
				font-size: 20px;
			}
		}
		
	}
</style>
<template>
	<div v-if="food" class="order-description">
		<mt-header title="订单详情">
		  <router-link to="/orderList" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<mt-cell :title="food.seller" class="space">
		  <span>
		  	<i class="iconfont icon-dayuhao3"></i>
		  </span>
		  <img slot="icon" class="sellerImage" :src="food.image"  width="24" height="24">
		</mt-cell>
		<mt-cell :title="food.name">
			 <div class="title">
			  	x{{food.count}}<span>￥{{food.price}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="配送费">
			 <div class="delivery">
			  	<span>￥{{food.deliveryPrice}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="特价优惠">
		  <div class="discount">
		  	<span>-￥{{food.discount}}</span>
		  </div>
		  <img slot="icon" class="sellerImage" :src="food.image"  width="24" height="24">
		</mt-cell>
		<mt-cell title="订单结算">
		  <div class="price-wrapper">
		  	<span class="text">总计</span>
		  	<span class="mark">￥</span>
		  	<span class="price">{{food.price+food.deliveryPrice-food.discount}}</span>
		  </div>
		</mt-cell>
		<mt-cell title="配送方:" class="space noFlex">
			 <div>
			  	<span class="seller">{{food.seller}}</span>
			  	<span class="text">配送</span>
		  	</div>
		</mt-cell>
		<mt-cell title="订单号:" class="noFlex">
			 <div>
			  	<span class="seller">{{food.number}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="配送时间:" class="noFlex">
			 <div>
			  	<span class="seller">{{food.deiveryTime}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="收货地址:" class="noFlex">
			 <div class="address-wrapper">
			  	<span class="username">{{food.receiver}}</span>
			  	<span class="phone">{{food.phone}}</span>
			  	<span class="adress">{{food.address}}</span>
		  	</div>
		</mt-cell>
		<mt-cell title="支付方式:" class="noFlex">
			 <div>
			  	<span class="username">{{food.payMethod}}</span>
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
</template>

<script>
	import data from "../../../../data.json"
	
	export default {
		name: "orderDescription",
		data(){
			return {
				food:data.user.orders[0]
			}
		}
	}
</script>
