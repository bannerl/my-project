<style lang="scss" type="text/css">
	@import "../../common/style/mixin";
	.orderList-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		.mint-navbar{
			position: relative;
			z-index: 10;
			.mint-tab-item-label{
				.on{
					color: #26A2FF;
				}
			}
		}
		.orderList{
			position: fixed;
			width: 100%;
			top: 84px;
			bottom: 55px;
			overflow: hidden;
			.container{
				padding-bottom: 10px;
			}
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
	.lead-wrapper{
		background: #f5f5f5;
		.content{
			img{
				margin-top: 60px;
			}
			.text{
				margin: 20px auto 18px;
				text-align: center;
				font-size: 16px;
				color: #777;
				font-weight: 700;
			}
			.login{
				display: block;
				text-align: center;
				.mint-button{
					font-size: 15px;
					padding: 6px 30px;
					background: rgba(29, 220, 100, 0.8);
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
		<div class="orderList-wrapper" ref="userDom">
			<div v-if="orders&&loginState">
				<mt-header title="订单">
					<mt-button slot="right">
						<div @click="closeFilter">
							筛选
						</div>
					</mt-button>
				</mt-header>
				<mt-navbar class="border-1px" v-model="orderTypes">
					<mt-tab-item id="0">
						<div @click="allType" :class="{on:orderTypes===0}">全部</div >
					</mt-tab-item>
					<mt-tab-item id="1">
						<div @click="cancelType" :class="{on:orderTypes===1}">已取消</div >
					</mt-tab-item>
					<mt-tab-item id="2">
						<div @click="returnPay" :class="{on:orderTypes===2}">退款</div >
					</mt-tab-item>
				</mt-navbar>
				<div class="orderList" ref="orderList">
					<ul class="container">
						<li v-show="fitlerOrder(order)&&timeSelected(order.time)" class="item" v-for="order in orders">
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
				<slot value="orderlist" name="fixed-navbar"></slot>
			</div>
			<div class="lead-wrapper" v-else>
				<mt-header title="订单"></mt-header>
				<div class="content">
					<img width="100%" src="../../common/image/orderList.jpg" alt="背景" />
					<div class="text">登录后查看外卖订单</div>
					<div class="login" @click="logins">
						<mt-button type="primary">立即登录</mt-button>
					</div>
				</div>
			</div>
			<order-desc v-on:close="closeDesc" :orderInfo="orderInfo" :orderShow="orderDescShow"></order-desc>
			<order-filter v-on:selected="timeFilter" v-on:close="closeFilter" :filterArr="filterArr" :show="orderFilterShow"></order-filter>
		</div>
	</transition>
</template>

<script>
	import data from "../../../data"
	import BScroll from "better-scroll"
	import {setStore, getStore} from '@/common/js/savaLocal'
	import orderFilter from "./children/orderFilter"
	import orderDesc from "./children/orderDescription"
	import { Indicator,Toast } from 'mint-ui'
	import {formatTime,setDocumentTitle} from "../../common/js/base"
	
	const ALL = 0 
	const CACEL = 1
	const RETURNPAY = 2
	const filterArr = ['全部','近一个月','近三个月','近半年','近一年']
	
	export default {
		name: "orderList",
		data(){
			return {
				orders: data.user.orders,
				orderInfo: {},
				orderDescShow: false, //详情页
				orderFilterShow: false, //筛选页
				ordersFade: "ordersFade", //动画名称
				orderTypes: ALL+'',//订单的类型
				filterArr: filterArr,
				filterResult: 1, //时间筛选结果
				loginState: false
			}
		},
		computed: {
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
			_initScroll () {
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
			closeDesc: function () {
				this.orderDescShow = !this.orderDescShow
			},
			closeFilter: function () {
				this.orderFilterShow = !this.orderFilterShow
			},
			closeAnimation: function() {
				this.ordersFade = 'orderstop'
			},
			fitlerOrder: function(order) {
				//mint是字符串，这里隐式转换一下
				let type = (this.orderTypes - 0)
				if(type === ALL ) {
					return true
				}else {
					return order.type === type
				}
			},
			allType: function() {
				this.orderTypes = ALL
			},
			cancelType: function() {
				this.orderTypes = CACEL
			},
			returnPay: function() {
				this.orderTypes = RETURNPAY
			},
			timeFilter: function (index) {
				this.filterResult = index
			},
			timeSelected: function (time) {
				let monthTime = 1000*60*60*24*90;
				let threeMTime = monthTime*3
				let sixTime = monthTime*6
				let yearTime = monthTime*12
				let nowTime = new Date().getTime()
				let arr = [nowTime,monthTime,threeMTime,sixTime,yearTime]
				let diff = nowTime - arr[this.filterResult]
				if(time>diff) {
					return true
				} else {
					return false
				}
			},
			logins:function(e){
				this.$router.push({name:'login'})
			}
		},
		beforeRouteEnter (to, from, next) {
			typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)
		  next(vm => {
		    if(from.name === "user" || from.name === "index") {
		    	vm.closeAnimation()
		    }
		    
		  })
		},
		beforeRouteLeave (to, from, next) {
			if(to.name === "user" || to.name === "index") {
				//底部导航切换没有动画
		    	this.$refs.userDom.style.display = "none"
		    	next(true)
		   } else {
		   	next(true)
		   }
		},
		watch:{
			orderInfo: function() {
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
			orderTypes: function() {
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
			filterResult: function() {
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
			//底部导航激活
			let id = getStore('user_id')
			if(!id) {
				this.loginState = false
				//this.$router.push('/login')
			} else {
				this.loginState = true
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
		mounted:function(){
			
		},
		components: {
			orderDesc,
			orderFilter
		}
	}
</script>
