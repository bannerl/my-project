<style lang="scss" type="text/css">
	@import "../../common/style/mixin";
	.confirmOrder-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 48px;
		width: 100%;
		overflow: hidden;
		background: #f5f5f5;
		>div.scroll-container{
			padding-bottom: 24px;
		}
		.address-container{
			background: #fff;
			.item{
				position: relative;
				display: flex;
				align-items: center;
				padding: 14px 10px 14px 14px;
				box-sizing: border-box; 
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=) 0 100% repeat-x;
			    background-size: 28px 3px;
				&:after{
					@include border-1px();
				}
				&:last-child:after{
					display: none;
				}
				.iconfont:first-child{
					width: 26px;
					font-size: 24px;
					color: #26A2FF;
				}
				.content{
					flex: 1;
					.title{
						font-weight: 700;
						padding: 6px 0;
						font-size: 16px;
						.details{
							margin-left: 6px;
							font-style: normal;
							font-weight: 700;
							font-size: 16px;
						}
						.btn-in{
							display: inline-block;
							margin-left: 2px;
							margin-top: 1px;
							background: #26a2ff;
						    color: #fff;
						    height: 16px;
						    width: 34px;
						    text-align: center;
						    font-size: 10px;
						    overflow: hidden;
						    vertical-align: text-top;
						    border: 1px solid #26a2ff;
						    box-sizing: border-box;
						    .scale{
						    	display: inline-block;
							    font-size: 20px;
							    text-align: center;
							    width: 68px;
							    height: 32px;
							    line-height: 32px;
							    transform: scale(0.5) translate3d(-50%, -50%, 0);
							    margin: -1px -1px 0 0;
							    font-style: normal;
						    }
						}
					}
					.user{
						padding-top: 3px;
						font-size: 13px;
						color: #333;
						i{
							font-style: normal;
							&.phone{
								margin-left: 6px;
							}
						}
					}
				}
				.content+.iconfont{
					position: absolute;
					right: -9px;
					padding: 16px;
					margin-right: 8px;
					font-size: 22px;
					color: #aaa;
				}
			}
		}
		.deliveryTime-container{
			display: flex;
			align-items: center;
			margin: 12px 10px;
			background: #fff;
			padding: 16px 16px;
			.text{
				margin-right: 4px;
				color: #000;
				font-weight: 700;
				font-size: 15px;
			}
			.time{
				position: relative;
				color: #000;
				font-weight: 700;
				padding:0 8px;
				font-size: 15px;
				&:before{
					content: '[';
					position: absolute;
					display: inline-block;
					margin-top: -1px;
					left: -1px;
				}
				&:after{
					content: ']';
					position: absolute;
					display: inline-block;
					margin-top: -1px;
					right: 0px;
				}
				i{
					font-style: normal;	
					font-weight: 700;
				}
			}
		}
		.food-container{
			padding: 0 14px;
			margin: 10px;
			background: #fff;
			.title{
				display: flex;
				text-align: center;
				padding: 16px 0;
				.text{
					font-weight: 700;
					font-size: 16px;
					padding:0 18px;
				}
				.leftLine,.rightLine{
					flex: 1;
					border-top: 1px solid #ddd;
					margin-top: 5px;
					transform: scaleY(.5);
				}
			}
			.friendTips{
				margin: 4px 0 16px;
				font-size: 14px;
				color: #999;
			}
			.description{
				.mint-cell .mint-cell-wrapper{
					background-origin: border-box;
				}
				.mint-cell-text{
					font-size: 15px;
					color: #000;
				}
				.count{
					margin-right: 16px;
					font-size: 12px;
					color: #000;
				}
				.price{
					display: inline-block;
					text-align: right;
					min-width: 26px;
					font-size: 13px;
					color: #000;
					i{
						color: #000;
						font-style: normal;
						margin-left: -3px;
					}
				}
			}
			.discount{
				.mint-cell-text{
					font-size: 16px;
					font-weight: 700;
					color: #000000;
				}
				.mint-cell-value{
					font-size: 13px;
					color: #888;
				}
				.mint-cell-value.is-link{
					margin-right: 14px;
				}
			}
			.totalPrice{
				.mint-cell {
					background: none;
				}
				.text{
					font-size: 14px;
					font-weight: 700;
					color: #000;
				}
				.price{
					color: #000;
					font-size: 18px;
					font-weight: 700;
					i{
						font-size: 20px;
						font-weight: 700;
						font-style: normal;
						margin-left: -3px;
					}
				}
			}
		}
		.otherNeed{
			margin:0 10px;
			padding: 0 12px;
			background: #fff;
			.mint-cell{
				background: none;
			}
			.mint-cell-text{
				font-weight: 700;
				white-space: nowrap;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    display: inline-block;
			    max-width: 300px;
			}
			.mint-cell-value{
				font-size: 13px;
				color: rgba(29,220,100,.8);
			}
			.iconfont{
				color:rgba(29,220,100,.8);
				font-size: 17px;
			}
		}
		.mint-cell-allow-right::after{
			right: 10px;
			width: 8px;
			height: 8px;
			border: solid 1px #c8c8cd;
		    border-bottom-width: 0;
		    border-left-width: 0;
		}
	}
	.confirmOrder-wrapper-a{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		.fixed-bottom{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 0 0 0 16px;
			height: 48px;
			background: #545454;
			box-sizing: border-box;
			.price{
				font-size: 20px;
				color: #eee;
				i{
					margin-left: -4px;
					font-style: normal;
				}
			}
			.text{
				padding: 0 35px;
				font-size: 17px;
				color: #f5f5f5;
				height: 100%;
				line-height: 48px;
				background: rgba(29,220,100,.9);
				font-weight: 700;
			}
		}
	}
	.confirmOrder-enter-active,.confirmOrder-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.confirmOrder-enter,.confirmOrder-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="confirmOrder">
		<div class="confirmOrder-wrapper-a" v-if="shopCar.foods">
			<div class="confirmOrder-wrapper" ref="confirmOrders">
				<div class="scroll-container">
					<mt-header title="确认订单">
					  <div slot="left">
					    <mt-button @click="$router.go(-1)" icon="back">返回</mt-button>
					  </div>
					</mt-header>
					<div class="address-container">
						<div class="item" v-if="defaultAddress">
							<div class="iconfont icon-dizhi1"></div>
							<div class="content">
								<h3 class="title">
									{{defaultAddress.position}}<i class="details">{{defaultAddress.details}}</i>
									<span v-show="defaultAddress.type===0" class="btn-in"><i class="scale">默认</i></span>
								</h3>
								<p class="user">
									<i>{{defaultAddress.name}}</i>
									<i class="sexType" v-if="defaultAddress.sexType===0">先生</i>
									<i class="sexType" v-else-if="defaultAddress.sexType===1">女士</i>
									<i class="sexType" v-else></i>
									<i class="phone">{{defaultAddress.phone}}</i>
								</p>
							</div>
							<div class="iconfont icon-dayuhao3"></div>
						</div>
					</div>
					<div class="deliveryTime-container">
						<span class="text">尽快送达</span>
						<span class="time">
							预计 <i class="">18:20</i>
						</span>
					</div>
					<div class="food-container">
						<h3 class="title">
							<span class="leftLine"></span>
							<span class="text">{{shopCar.sellerName}}</span>
							<span class="rightLine"></span>
						</h3>
						<div class="friendTips">您的主食点了吗？</div>
						<div class="description">
							<mt-cell v-for="item in shopCar.foods" :title="item.name">
								<div class="">
									<span class="count">x{{item.count}}</span>
									<span class="price">￥<i>{{item.price*item.count}}</i></span>
								</div>
							</mt-cell>
							<mt-cell title="配送费">
								<span class="price">￥<i>{{shopCar.deliveryPrice}}</i></span>
							</mt-cell>
							
						</div>
						<div class="discount">
							<div @click="discountedShow">
								<mt-cell title="红包" v-if="isDiscount===1" :value="discountText" is-link></mt-cell>
							</div>
							<mt-cell title="红包" v-if="isDiscount===0" value="无可用红包" is-link></mt-cell>
							
						</div>
						<div class="totalPrice">
							<mt-cell title="">
								<div>
									<span class="text">小计</span>
									<span class="price">￥<i>{{totalPrice}}</i></span>
								</div>
							</mt-cell>
						</div>
					</div>
					<div class="otherNeed">
						<mt-cell title="在线支付"></mt-cell>
						<div @click="reMarkedShow">
							<mt-cell :title="need.text" is-link>
								<span v-show="need.show" class="iconfont icon-lvye"></span>
								<span v-show="need.show">马上助力环保</span>
							</mt-cell>
						</div>
					</div>
				</div>
			</div>
			<use-discount v-on:close="discountedShow" :show="discountShow" :discounts="discounts"></use-discount>
			<re-marks v-on:close="reMarkedShow" :show="reMarkShow"></re-marks>
			<div class="fixed-bottom">
				<div class="price">
					￥<i>{{totalPrice}}</i>
				</div>
				<div class="text" >去支付</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import useDiscount from './children/usediscount'
	import reMarks from './children/reMarks'
	import { getStore } from '@/common/js/savaLocal'
	
	const noError = 0
	
	export default {
		data() {
			return {
				defaultAddress: [], //默认地址
				shopCar:{}, //购物车
				discounts: [],//优惠券
				discountShow:false,
				discountText: '有红包可用',
				discountPrice: 0,
				need: {
					text:"餐具份数/口味偏好",
					show:true
				},
				reMarkShow: false //控制备注的显示
			}
		},
		methods: {
			_initDiscount: function() {
				let self = this
				let id = getStore('user_id')
				axios.get('/api/user',{
					params: {id: id}
				}).then(function(res){
					if(res.data.status === noError) {
						self.discounts = res.data.data.discounts
						
					}
				}).then(function(error){
					
				})
			},
			discountedShow: function(item){
				if(item.price) {
					this.discountText = "已选择 满"+item.maxPrice+"减"+item.price
					this.discountPrice = item.price
				}
				this.discountShow = !this.discountShow
			},
			reMarkedShow (obj) {
				if(obj.arr || obj.text) {
					let str = ''
					for(let i=0;i<obj.arr.length;i++) {
						if(i === (obj.arr.length-1)){
							str += obj.arr[i].text
						} else {
							str += obj.arr[i].text+','
						}
					}
					this.need.text = str
					this.need.show = false
				}
				this.reMarkShow = ! this.reMarkShow
			}
		},
		computed: {
			totalPrice: function () {
				let price = 0
				if(this.shopCar.foods) {
					let arr = this.shopCar.foods
					for(let i = 0;i<arr.length;i++) {
						price += arr[i].count*arr[i].price
					}
					price += this.shopCar.deliveryPrice
					price = price - this.discountPrice
					return price 
				}
			},
			isDiscount: function() {
				let price = this.totalPrice
				let show = 0
				let arr = []
				let time = new Date().getTime()
				for(let i=0;i<this.discounts.length;i++) {
					if(this.discounts[i].maxPrice<price && time<this.discounts[i].limitTime) {
						arr.push(this.discounts[i])
						show = 1
					}
				}
				this.discounts = arr
				return show
			}
		},
		created: function () {
			let address = []
			if(getStore("addressArr")){
				let arr = JSON.parse(getStore("addressArr"))
				if (arr.length === 0) {
					address = null
				} else if(arr.length === 1) {
					address = arr
				} else {
					for(let i=0;i<arr.length;i++) {
						if(arr[i].type === 0) {
							address = arr[i]
						}
					}
				}
			} else {
				address = null
			}
			this._initDiscount()
			this.defaultAddress = address
			
			if(!getStore('shopCar')){
				console.log('出错了。。。')
			} else {
				this.shopCar = JSON.parse(getStore('shopCar'))
			}
			
			this.$nextTick(() => {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.confirmOrders,{
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			})
		},
		components: {
			useDiscount,
			reMarks
		}
	}
</script>
