<style lang="scss" type="text/css">
	@import "../../common/style/mixin";
	.orderList-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		.orderList{
			position: absolute;
			width: 100%;
			top: 40px;
			bottom: 55px;
			overflow: hidden;
			.item{
				position: relative;
				margin: 14px 0 6px 0;
				background: #fff;
				.food-description{
					display: flex;
					padding-top: 16px;
					padding-right: 70px;
					.orderImage{
						padding:0 8px 0 14px;
					}
					.content{
						.title{
							font-size: 16px;
							line-height: 24px;
							color: #000;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.price{
							margin-top: 3px;
							.count{
								position: relative;
								font-size: 12px;
								color: #444;
								margin-right: 10px;
								&:after{
									position: absolute;
									height: 10px;
									top: 2px;
									right: -8px;
									border-right: 1px solid #888;
									content: '';
								}
							}
							.price-son{
								font-size: 12px;
								color: #444;
							}
						}
						.name{
							font-size: 12px;
							padding: 8px 0;
							color: #444;
						}
						.time{
							font-size: 12px;
							padding: 2px 0 14px;
							color: #444;
						}
					}
					.orderType{
						position: absolute;
						right: 16px;
						top: 20px;
						font-size: 14px;
						color: #aaa;
					}
				}
				.good-opration{
					padding: 6px 10px 8px;
					text-align: right;
					.mint-button.mint-button--small{
						font-size: 12px;
						padding: 0 6px;
						height: 24px;
					}
					.mint-button-text{
						font-size: 12px;
						padding: 2px 0;
					}
				}
			}
		}
	}
	.ordersFade-enter-active,.ordersFade-leave-active{
		transition: all .2s linear;
		transform: translate3d(0,0,0);
	}
	.ordersFade-enter,.ordersFade-leave-to{
		transform: translate3d(-100%,0,0);
	}
	.orderstop-enter-active,.ordersFade-leave-active{
		transition: all .02s linear;
		transform: translate3d(0,0,0);
	}
	.ordersFade-enter,.ordersFade-leave-to{
		transform: translate3d(0,0,0);
	}
</style>
<template>
	<transition :name="ordersFade">
		<div class="orderList-wrapper" v-if="orders">
			<div>
				<mt-header title="订单列表">
				  <router-link to="/" slot="left">
				    <mt-button icon="back">返回</mt-button>
				  </router-link>
				  <mt-button slot="right">筛选</mt-button>
				</mt-header>
				<div class="orderList" ref="orderList">
					<ul>
						<li class="item" v-for="order in orders">
							<div class="food-description">
								<img class="orderImage" :src="order.image" width="66" height="66" />
								<div class="content" @click="intoDescPage(order)">
									<h3 class="title">{{order.seller}}</h3>
									<div class="price">
										<span class="count">数量:{{order.count}}</span>
										<span class="price-son">实付:￥{{order.price+order.deliveryPrice-order.discount}}</span>
									</div>
									<div class="name">{{order.name}}</div>
									<div class="time">下单时间:{{orderTime(order.time)}}</div>
								</div>
								<div class="orderType" v-if="order.type===0">已完成</div>
								<div class="orderType" v-else-if="order.type===1">已取消</div>
								<div class="orderType" v-else-if="order.type===2">已退款</div>
							</div>
							<div class="good-opration border-1px-top"  v-if="order.type===0">
								<mt-button size="small" type="primary">再来一单</mt-button>
							</div>
						</li>
					</ul>
				</div>
				<slot name="fixed-navbar"></slot>
			</div>
			<order-desc v-on:close="closeDesc" :orderInfo="orderInfo" :orderShow="orderDescShow"></order-desc>
		</div>
	</transition>
</template>

<script>
	import data from "../../../data"
	import BScroll from "better-scroll"
	import {formatTime} from "../../common/js/base"
	import orderDesc from "./children/orderDescription"
	
	export default {
		name: "orderList",
		data(){
			return {
				orders: data.user.orders,
				orderInfo: {},
				orderDescShow: false,
				ordersFade: "ordersFade"
			}
		},
		methods: {
			orderTime: function(timer){
				let time = new Date((timer-0))
				return formatTime(time,'yyyy/MM/dd hh:mm')
			},
			intoDescPage: function(data){
				this.orderInfo = data
				this.orderDescShow = !this.orderDescShow
			},
			closeDesc: function(){
				this.orderDescShow = !this.orderDescShow
			},
			closeAnimation: function() {
				this.ordersFade = 'orderstop'
			}
		},
		beforeRouteEnter (to, from, next) {
		  next(vm => {
		    if(from.name === "user" || from.name === "index") {
		    	vm.closeAnimation()
		    }
		    
		  })
		},
		watch:{
			orderInfo: function(){
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.orderList,{
							'click': true
						})
					} else {
						this.scroll.refresh()
					}
				})
			}
		},
		created: function(){
			this.$nextTick(() => {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.orderList,{
						'click': true
					})
				} else {
					this.scroll.refresh()
				}
			})
		},
		components: {
			orderDesc
		}
	}
</script>
