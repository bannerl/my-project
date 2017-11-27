<style lang="scss" type="text/css">
	.orderList-wrapper{
		.orderList{
			.item{
				.food-description{
					display: flex;
				}
				.good-opration{
					
				}
			}
		}
	}
</style>
<template>
	<div class="orderList-wrapper" v-if="orders">
		<div>
			<mt-header title="订单列表">
			  <router-link to="/" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			  <mt-button slot="right">筛选</mt-button>
			</mt-header>
			<div class="orderList">
				<ul>
					<li class="item" v-for="order in orders">
						<div class="food-description">
							<img class="" :src="order.image" width="100" height="72" />
							<div class="content">
								<h3>{{order.seller}}</h3>
								<div class="price">
									<span>数量:{{order.count}}</span>
									<span>实价:￥{{order.price+order.deliveryPrice-order.discount}}</span>
								</div>
								<div class="name"></div>
								<div class="time">下单时间:{{orderTime(order.time)}}</div>
							</div>
						</div>
						<div class="good-opration">
							
						</div>
					</li>
				</ul>
			</div>
		</div>	
	</div>
</template>

<script>
	import data from "../../../data"
	import {formatTime} from "../../common/js/base"
	
	export default {
		name: "orderList",
		data(){
			return {
				orders:data.user.orders
			}
		},
		methods: {
			orderTime: function(timer){
				let time = new Date(timer)
				return formatTime(time,'yyyy/MM/dd hh:mm')
			}
		}
	}
</script>
