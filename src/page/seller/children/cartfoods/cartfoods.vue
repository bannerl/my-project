<template>
	<div>
		<div class="cart-container">
			<div class="back_cover"></div>
			<div class="content-left"  @click="toggleList">
				<div class="cart">
					<div class="icon" :class="{highLight:totalCount>0}">
						<span class="iconfont">&#xe60b;</span>
					</div>
					<div class="count" v-show="totalCount>0">
						{{totalCount}}
					</div>
				</div>
				<div class="price" :class="{highLight:totalCount>0}">
					<span>￥{{totalPrice}}</span>
				</div>
				<div class="deliveryPrice">
					<span>另需配送费￥{{deliveryPrice}}元</span>
				</div>
			</div>
			<div class="content-right">
				<div class="text" v-if="deliveryStatus === 0">
					<span>还差￥{{minPrice-totalPrice}}元起送</span>
				</div>
				<div class="text" v-if="deliveryStatus === 1">
					<span>￥{{minPrice}}元起送</span>
				</div>
				<div class="text balance" v-if="deliveryStatus === 2">
					<span>去结算</span>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div v-show="listShow" class="foods-list">
		  		<h3>
		  			<span class="car">购物车</span>
		  			<span class="empty">清空</span>
		  		</h3>
		  		<div class="list-wrapper" ref="listWrapper">
			  		<ul>
			  			<li v-for="food in foods" v-if="food.count">
			  				<h4>{{food.name}}</h4>
			  				<div class="price">￥{{food.price}}</div>
			  				<div class="count-wrapper">
								<count-edit :food="food"></count-edit>
							</div>
			  			</li>
			  		</ul>
		  		</div>	
		  	</div>
	  	</transition>
	</div>	
</template>

<script>
	import countEdit from '../countedit/countedit'
	import BScroll from 'better-scroll'
	
	export default {
		name: 'cartfoods',
		props:{
			deliveryPrice:{
				type:Number,
				default: 0
			},
			minPrice:{
				type: Number,
				default:0
			},
			foods:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		data(){
			return {
				fold:true
			}
		},
		created:function(){
			
		},
		computed:{
			totalPrice:function(){
				let totalPrice = 0;
				for(let i=0;i<this.foods.length;i++){
					if(this.foods[i].count){
						totalPrice += this.foods[i].price*this.foods[i].count;					
					}
				}
				return totalPrice;
			},
			totalCount:function(){
				let count = 0;
				for(let i=0;i<this.foods.length;i++){
					if(this.foods[i].count){
						count += this.foods[i].count;	
					}	
				}
				return count;
			},
			deliveryStatus:function(){
				var price = this.totalPrice;
				if(price<this.minPrice){
					return 0;
				}else if(price === 0){
					return 1;
				}else{
					return 2;
				}
			},
			listShow:function(){
				if(!this.totalCount){
					this.fold = true;
					return false
				}
				let show = !this.fold;
				if(show){
						this.$nextTick( ()=>{
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listWrapper,{
								click:true
							})
						}else{
							this.scroll.refresh()
						}
					})
					
				}
				return show
			}
		},
		methods:{
			toggleList:function(event){
				this.fold = !this.fold
			}
		},
		components:{
			countEdit
		}
	}
	
</script>

<style lang="scss" type="text/css">
	@import '../../../../common/style/mixin';
	.cart-container{
		position: absolute;
		bottom: 0;
		height: 52px;
		display: flex;
		width: 100%;
		z-index:100;
		&:after{
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(0,0,0,.7);
			width: 100%;
			height: 52px;
			content: '';
			z-index: -1;
		}
	}
	.content-left{
		flex: 1;
		font-size: 0;
		.cart{
			position: relative;
			display: inline-block;
			margin: -12px 18px;
			padding:6px;
			width: 56px;
			height: 56px;
			background: #4c4c4c;
			border-radius: 50%;
			box-sizing:border-box;
			.icon{
				width:44px;
				height: 44px;
				background: #333;
				border-radius: 50%;
				text-align: center;
				&.highLight{
					background: rgb(0,160,220);
					.iconfont{
						color: #fff;
					}
				}
			}
			.iconfont{
				color: rgba(255,255,255,.3);
				font-size: 30px;
				line-height: 44px;
			}
			.count{
				position: absolute;
				right: 0;
				top: 0;
				width: 24px;
				padding: 1px 0;
				text-align: center;
				font-size: 12px;
				background: #ff4500;
				border-radius: 6px;				
				color: #fff;
			}
		}
		.price{
			position: relative;
			display: inline-block;
			margin:18px 0;
			padding-right: 12px; 
			&.highLight{
				span{
					color: #fff;
					font-weight: 700;
				}
			}
			&:after{
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				font-size: 0;
				border-right: 1px solid #999;
				transform: scaleX(.5);
				content: '';
			}
			span{
				vertical-align: middle;
				font-size: 16px;
				font-weight: 700;
				color: #999;
				line-height: 16px;
			}
		}
		.deliveryPrice{
			display: inline-block;
			margin-left: 12px;
			span{
				vertical-align: middle;
				font-size: 12px;
				color: #999;
				font-weight: 700;
				line-height: 16px;
			}
		}
	}
	.content-right{
		background: #666;
		text-align: center;
		.text{
			padding: 0 8px;
			line-height: 52px;
			color: rgba(255,255,255,.4);
			font-size: 14px;
		}
		.balance{
			padding: 0 25px;
			background: rgba(29, 220, 100, 0.8);
			color: #fff;
		}
	}
	.foods-list{
		position: absolute;
		left: 0;
		bottom: 52px;
		width: 100%;
		overflow: hidden;
		background: #fff;
		z-index: 1;
		&.fade-enter-active{
			transition:all .9s;
			transform:translate3d(0,0,0)
			
		}
		&.fade-enter{
			transform:translate3d(0,100%,0)
		}
		&.fade-leave{
			transform:translate3d(0,0,0)
		}
		&.fade-leave-active{
			transition:all .9s;
			transform:translate3d(0,100%,0)
			
		}
		h3{
			display: flex;
			justify-content: space-between;
			height: 40px;
			line-height: 40px;
			padding: 0 18px;
			background: #f3f5f7;
			border-bottom: 1px solid rgba(7,17,27,0.1);
		}
		.car{
			font-size: 14px;
		}
		.empty{
			color: rgb(0,160,220);
			font-size: 12px;
		}
		.list-wrapper{
			max-height: 240px;
			overflow: hidden;
		}
		ul{
			padding: 0 18px;
		}
		li{
			position: relative;
			display: flex;
			height: 48px;
			line-height: 48px;
			&:after{
				@include border-1px();
				height: 1px;
			}
			h4{
				flex: 1;
				font-size: 14px;
				color: rgb(7,17,27);
			}
			.price{
				padding-left: 18px;
				font-weight: 700;
				font-size: 14px;
				color: rgb(240,20,20);
			}
			.count-wrapper{
				margin-top: 9px;
			}
		}
	}
</style>