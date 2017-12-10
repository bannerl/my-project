<template>
	<div class="ratings-content" >
		<div class="ratings-containers" ref="ratingContent">
			<div v-if="seller">
				<div class="ratings-title">
					<div class="left">
						<h3 class="title">{{seller.score}}</h3>
						<div class="text">综合评分</div>
						<div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
					</div>
					<div class="right">
						<div class="score">
							<span class="text">服务评分</span>
							<div class="star-wrapper">
								<star :size="24" :score="seller.foodScore"></star>
							</div>
							<span class="score-show">{{seller.foodScore}}</span>
						</div>
						<div class="score">
							<span class="text">速度评分</span>
							<div class="star-wrapper">
								<star :size="24" :score="seller.serviceScore"></star>
							</div>
							<span class="score-show">{{seller.serviceScore}}</span>
						</div>
						<div class="deliveryTime">
							<span class="text">送达时间</span>
							<div>
								{{seller.deliveryTime}}分钟
							</div>
						</div>
					</div>
				</div>
				<div class="line-wrapper">
					<line-divide></line-divide>
				</div>
				<div class="rating-wrapper">
					<rating-filter @onlyContent="onlyContent" @ratingStatus="selectState" :text="text" :count="count"></rating-filter>
				</div>
				<div class="rating-content">
					<div v-if="ratings" v-show="listShow(rating.rateType,rating.text)" class="item" v-for="rating in ratings">
						<div class="left">
							<img :src="rating.avatar" />
						</div>
						<div class="right">
							<div class="top clearfix">
								<span class="username">{{rating.username}}</span>
								<span class="time">{{format(rating.rateTime)}}</span>
							</div>
							<div class="middle" v-if="rating.text">{{rating.text}}</div>
							<div class="middle" v-else>暂未评价</div>
							<div v-show="rating.recommend" class="bottom">
								<span class="iconfont active" v-if="rating.rateType===0">&#xe615;</span>
								<span class="iconfont" v-else>&#xe618;</span>
								<ul class="recommend">
									<li v-for="item in rating.recommend">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
	    </div>
	    <div class="cart-wrapper">
			<cart-foods></cart-foods>
		</div>
	</div>	
</template>

<script>
	import BScroll from 'better-scroll'
	import star from '../star/star'
	import axios from 'axios'
	import {formatTime} from '@/common/js/base.js'
	import cartFoods from '../cartfoods/cartfoods'
	import countEdit from '../countedit/countedit'
	import lineDivide from '../linedivide/linedivide'
	import ratingFilter from '../ratingfilter/ratingfilter'
	
	const noError = 0
	const ALL = 2
	const POSITIVE = 0
	const NEGATIVE = 1
	
	export default {
	  name: 'ratings',
	  props:{
	  	seller:{
	  		type:Object
	  	}
	  },
	  data () {
	    return {
	      text:{
	      	all:'全部',
	      	positive:'满意',
	      	negative:'不满意'
	      },
	      count:{
	      	all:0,positive:0,negative:0
	      },
	      ratings:this.ratings,
	      onlyText:true,
	      selectStates:ALL
	    }
	  },
	  created:function(){
	  	axios.get('/api/ratings').then(response => {
		    response = response.data
		    if(response.status === noError){
		    	this.ratings = response.data
		    	let i = 0
		    	let j = 0
		    	this.count.all = this.ratings.length
		    	this.ratings.forEach(function(item){
		    		if(item.rateType === 0){
		    			i++
		    		}else{
		    			j++
		    		}
		    	})
		    	this.count.positive = i
		    	this.count.negative = j
		    	this.$nextTick( ( ) =>{
		    		this._initScroll()
		    	});
		    }
		});
	  },
	  computed:{
	  },
	  components:{
	  	star,
	  	lineDivide,
	  	ratingFilter,
	  	cartFoods,
	  	countEdit
	  },
	  methods:{
	  	_initScroll:function(){
	  		this.scroll = new BScroll(this.$refs.ratingContent,{
	  			click:true
	  		})
	  	},
	  	format:function(time){
	  		let date = new Date(time)
	  		return formatTime(date,'yyyy-MM-dd hh:mm')
	  	},
	  	listShow:function(type,text){
	  		this.$nextTick( ( ) =>{
	  			if(!this.scroll){
	  				this.scroll = new BScroll(this.$refs.ratingContent,{
			  			click:true
			  		})
	  			}else{
	  				this.scroll.refresh()
	  			}
	    	});
	  		if(!text&&this.onlyText){
	  			return false
	  		}else if(this.selectStates === ALL){
	  			return true
	  		}else{
	  			return this.selectStates === type
	  		}
	  	},
	  	onlyContent:function(bool){
	  		this.onlyText = bool
	  	},
	  	selectState:function(state){
	  		this.selectStates = state
	  	}
	  }
	}
</script>

<style lang="scss" type="text/css">
	@import '../../../../common/style/mixin';
	
	.ratings-content{
		width: 100%;
		.ratings-containers{
			position: absolute;
			top: 186px;
			left: 0;
			bottom: 0;
			padding-bottom: 52px;
			width: 100%;
			overflow: hidden;
			background: #fff;
		}
		.ratings-title{
			display: flex;
			padding: 18px;
			font-size:0;
			.left{
				position:relative;
				flex: 0 0 134px;
				text-align: center;
				&:after{
					content: '';
					position: absolute;
					right: 0;
					top: 0;
					height: 100%;
					border-right: 1px solid #ddd;
					transform: scaleX(.5);
				}	
				.title{
					font-size: 24px;
					color: rgb(255,153,0);
					line-height: 28px;
					margin-bottom: 6px;
				}
				.text{
					font-size: 12px;
					color: rgb(7,17,27);
					margin-bottom: 8px;
				}	
				.rankRate{
					font-size: 10px;
					color: rgba(7,17,27,.4);
					line-height: 10px;
					padding-bottom: 6px;
				}		
			}
			.right{
				flex: 1;
				margin-left: 24px;
				span.text{
					position: absolute;
					left: 0;
					font-size: 12px;
					line-height: 18px;
					color: rgb(7,17,27);
				}
				.score{
					position: relative;
					margin-bottom: 8px;
					.score-show{
						font-size: 12px;
						color: rgb(255,153,0);
					}
				}
				.deliveryTime{
					position: relative;
					div{
						margin-left: 56px;
						font-size: 12px;
						color: rgb(147,153,159);
						line-height: 18px;
					}
				}
				.star-wrapper{
					display: inline-block;
					margin-left: 50px;
					margin-top: 2px;
				}
			}
		}
		.rating-content{
			position: relative;
			padding: 0 18px 18px 0;
			.item{
				position: relative;
				padding:18px 0 18px 0;
				margin-left: 56px;
				padding-bottom: 18px;
				&:after{
					@include border-1px();
				}
			}
			&:after{
				@include border-1px-top();
			}
			.left{
				position:absolute;
				left:-40px;
				top:18px;
				img{
					width: 28px;
				}
			}
			.right{
				width: 100%;
				.top{
					margin-bottom:4px;
					.username{
						float: left;
						font-size: 10px;
						line-height: 10px;
						color: rgb(7,17,27);
					}
					.time{
						float: right;
						font-size: 10px;
						line-height: 10px;
						color: rgba(7,17,27,.3);
					}
				}
				.middle{
					font-size: 12px;
					line-height: 18px;
					color: rgb(7,17,27);
					margin-bottom: 6px;
				}
				.bottom{
					.iconfont{
						position: absolute;
						font-size: 12px;
						line-height: 16px;
						color: rgba(7,17,27,.2);
						&.active{
							color: rgba(38,162,255,1);
						}
					}
					.recommend{
						font-size: 0;
						margin-left: 20px;
						li{
							display: inline-block;
							font-size: 9px;
							line-height: 14px;
							width: 90px;
							margin: 0 8px 6px 0;
							border: 1px solid #ddd;
							text-align: center;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>