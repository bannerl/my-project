<template>
	<transition name="fadein">
	<div ref="foodPages" class="food-desc-page" v-if="food" v-show="foodShow">
		<div class="container">
			<div @click="returnGoods" class="returnPage">
				<span class="iconfont">&#xe678;</span>
			</div>
			<div class="avatar">
				<img :src="food.image" />
			</div>
			<div class="title">
				<h3>{{food.name}}</h3>
				<div class="description">
					<span class="sellCount">月售{{food.sellCount}}份</span>
					<span class="desc-rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span>￥{{food.price}}</span>
					<span class="oldPrice">{{food.oldPrice}}</span>
				</div>
				<div class="count-wrapper">
					<div v-if="food.count">
						<count-edit :food="food"></count-edit>
					</div>
					<div v-else>
						<span @click="addCount" class="addCart">加入购物车</span>
					</div>
				</div>
			</div>
			<div class="line-wrapper">
				<line-divide></line-divide>
			</div>
			<div class="food-description">
				<h3>商品介绍</h3>
				<p>{{food.info}}</p>
			</div>
			<div class="line-wrapper">
				<line-divide></line-divide>
			</div>
			<div class="ratings">
				<div class="food-filter">
					<h3 class="text">商品评价</h3>
					<div>
						<rating-filter :text="text" :count="count" @ratingStatus="ratingState" @onlyContent="onlyText"></rating-filter>
					</div>
				</div>
				<div class="ratings-content">
					<div v-show="ratingShow(rating)" class="rating-item" v-for="rating in food.ratings">
						<div class="item-title clearfix">
							<div class="left">
								<span>{{format(rating.rateTime)}}</span>
							</div>
							<div class="right">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar"/>
							</div>
						</div>
						<div class="item-desc">
							<span v-if="rating.rateType===0" class="iconfont active">&#xe615;</span>
							<span v-else class="iconfont">&#xe618;</span>
							<p v-if="rating.text">{{rating.text}}</p>
							<p v-else="rating.text">暂无评价</p>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import {formatTime} from '@/common/js/base.js'
	import countEdit from '../countedit/countedit'
	import lineDivide from '../linedivide/linedivide'
	import ratingFilter from '../ratingfilter/ratingfilter'
	const ALL = 2
	const POSITIVE = 1
	const NEGATIVE = 0
	
	export default {
		name:'foodPage',
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				foodShow:false,
				ratingStates:ALL,
				onlyContent:true,
				text:{
					all:'全部',
			      	positive:'推荐',
			      	negative:'吐槽'
				},
				count:{
					all:0,
	      			positive:0,
	      			negative:0
				}
			}
		},
		components:{
			countEdit,
			lineDivide,
			ratingFilter
		},
		computed:{
		},
		watch:{
			
		},
		methods:{
			returnGoods:function(){
				this.foodShow= !this.foodShow
				if(this.foodShow){
					this.$nextTick( ( ) =>{
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.foodPages,{
								click:true
							})
						}else{
							this.scroll.refresh()
						}
						this._allRate()
						this._allPositive()
						this._allNegative()
						
			    	});
				}
			},
			_allRate:function(){
				if(this.food.ratings){
					this.count.all = this.food.ratings.length
				}
			},
			_allPositive:function(){
				if(this.food.ratings){
					let i = 0
	  				this.food.ratings.forEach(function(item){
	  					if(item.rateType === 0){
	  						i++
	  					}
	  				})
	  				this.count.positive = i
	  			}	
			},
			_allNegative:function(){
				if(this.food.ratings){
					let i = 0
	  				this.food.ratings.forEach(function(item){
	  					if(item.rateType === 1){
	  						i++
	  					}
	  				})
	  				this.count.negative = i
	  			}	
			},
			addCount:function(){
				if(!this.food.count){
					Vue.set(this.food,"count",1)
				}
			},
			ratingState:function(state){
				this.ratingStates = state
			},
			format:function(time){
				let date = new Date(time);
				return formatTime(date,'yyyy-MM-dd hh:mm')
			},
			onlyText:function(boo){
				this.onlyContent = boo
			},
			watch:{
			},
			ratingShow:function(rating){
				this.$nextTick( ( ) =>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.foodPages,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
		    	});
				if(!rating.text&&this.onlyContent){
					return false
				}else if(this.ratingStates === ALL){
					return true
				}else{
					return rating.rateType === this.ratingStates
				}
				
			}
		},
		beforeUpdate: function() {
        	this._allRate()
        	this._allPositive()
            this._allNegative()
        }
	}
</script>

<style lang="scss"  type="text/css">
@import '../../../../common/style/mixin';
.food-desc-page{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 52px;
	width: 100%;
	overflow: hidden;
	background: #fff;
	&.fadein-enter-active{
		transition:all .2s linear;
		transform:translate3d(0,0,0)
		
	}
	&.fadein-enter{
		transform:translate3d(100%,0,0)
	}
	&.fadein-leave{
		transform:translate3d(0,0,0)
	}
	&.fadein-leave-active{
		transition:all .2s linear;
		transform:translate3d(100%,0,0)
		
	}
	.container{
		position: absolute;
		left: 0;top: 0;
		width: 100%;
		box-sizing: border-box;
	}
	.returnPage{
		position: absolute;
		left: 0;
		top: 0;
		padding: 10px 10px;
		z-index: 2;
		.iconfont{
			font-size: 26px;
			color: #888;
		}
	}
	.avatar{
		position: relative;
		padding: 100% 0 0;
		height: 0;
		img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	.description{
		span{
			font-size: 10px;
			line-height: 10px;
			color: rgb(147,153,159);
		}
		.desc-rating{
			margin-left: 6px;
		}
	}
	.title{
		position: relative;
		padding: 18px;
		h3{
			margin-bottom: 8px;
			font-size: 16px;
			line-height: 16px;
			font-weight: 700;
			color: rgb(7,17,27);
		}
		.price{
			margin: 18px 0 0;
			span{
				font-size: 16px;
				line-height: 20px;
				color: rgb(240,20,20);				
			}
			.oldPrice{
				margin-left: 6px;
				color: #7E8C8D;
				text-decoration: line-through;
			}
		}
		.count-wrapper{
			position: absolute;
			right: 18px;
			bottom: 36px;
			.addCart{
				height: 28px;
				padding: 5px 10px;
				text-align: center;
				font-size: 12px;
				line-height: 28px;
				color: #fff;
				background: rgb(0,160,220);
				border-radius: 12px;
			}
		}
	}
	.food-description{
		padding: 18px;
		h3{
			margin-bottom: 6px;
			font-size: 16px;
			font-weight: 400;
			line-height: 22px;
			color: #000;
		}
		p{
			margin-left: 6px;
			line-height: 24px;
			font-size: 12px;
			font-weight: 200;
			color: rgb(77,85,93);
		}
	}
	.ratings{
		.food-filter{
			.text{
				margin: 18px 0 6px 18px;
				font-size: 14px;
				color: #000;
				font-weight: 700;
			}
		}
	}
	.ratings-content{
		width: 100%;
		padding: 0 18px;
		border-top: 1px solid rgba(147,157,159,.2);
		box-sizing: border-box;
		.rating-item{
			position: relative;
			padding:16px 0;
			&:after{
				@include border-1px();
			}
			&.hide{
				display: none;
			}
			.item-title{
				margin-bottom: 6px;
				.left{
					float: left;
					font-size: 10px;
					line-height: 12px;
					color:rgba(147,157,159,1);
				}
				.right{
					float: right;
					.name{
						font-size: 10px;
						line-height: 12px;
						color:rgba(147,157,159,1);
						vertical-align: top;
						margin-right: 6px;
					}
					img{
						width: 12px;
						vertical-align: top;
					}
				}
			}
			.item-desc{
				font-size: 0;
				.iconfont{
					margin-right: 4px;
					font-size: 12px;
					line-height: 24px;
					vertical-align: top;
					color: rgb(147,156,169);
					&.active{
						color: rgb(0,160,220);
					}
				}
				p{
					display: inline-block;
					font-size: 14px;
					line-height: 24px;
					vertical-align: top;
					color: rgb(7,17,27);
				}
			}
		}
	}
}
</style>