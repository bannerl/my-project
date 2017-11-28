<style lang="scss" type="text/css" scoped="scoped">
	@import '../../../../common/style/mixin';
	.seller-content{
		position:absolute;
		top:166px;
		left:0;
		bottom:0;
		width:100%;
		overflow:hidden;
		.seller-top{
			position:absolute;
			top:0;
			left:0;
			bottom:52px;
			width:100%;
			overflow:hidden;
			.seller-description{
				padding:18px;
				.seller-name{
					position:relative;
					display:flex;
    				justify-content: around-between;
    				padding-bottom:18px;
    				&:after{
    					@include border-1px();
    				}
					.left{
						flex:2;
						font-size:0;
						.title{
							font-size:14px;
							line-height:14px;
							font-weight:700;
							color:rgb(7,17,27);
							margin-bottom:8px;
						}
						.star{
							display:inline-block;
						}
						.text{
							display:inline-block;
							font-size:10px;
							line-height:10px;
							color:rgb(77,85,93);
							margin-left:12px;
						}
					}
					.right{
						flex:1;
						text-align:right;
						&.active{
							.iconfont{
								color:rgb(220,20,20);
							}
							.text{
								color:rgb(220,20,20);
							}
						}
						.iconfont{
							font-size:24px;
							color:rgba(7,17,27,.2);
						}
						.text{
							margin-top:4px;
							font-size:10px;
							line-height:10px;
							color:rgb(77,85,93);
						}
					}
				}
				.seller-service{
					margin-top:18px;
					width:100%;
					ul{
						font-size:0;
					}
					li{
						position:relative;
						display:inline-block;
						width:33.33%;
						text-align:center;
						box-sizing:border-box;
						&:after{
							position:absolute;
							height:100%;
							right:0;
							top:0;
							border-right:1px solid #ddd;
							tranform:scaleX(.5);
							content:'';
						}
						&:last-child:after{
							border:0;
						}
						.name{
							display:block;
							margin-bottom:4px;
							font-size:10px;
							line-height:10px;
							color:rgb(147,153,157);
						}
						.description{
							font-size:24px;
							font-weight:600;
							line-height:28px;
							color:rgba(7,17,27,1);
							span{
								font-size:14px;
							}
						}
					}
				}
			}
			.bullentin{
				position: relative;
				margin: 18px 18px 0;
				padding-bottom:16px; 
				&:after{
					@include border-1px();
				}
				.title{
					font-size: 14px;
					line-height: 14px;
					font-weight: 700;
					margin-bottom: 8px;
					color:rgba(7,17,27,1);
				}
				.description{
					padding: 0 6px;
					line-height: 24px;
					font-size: 12px;
					color: rgb(240,20,20);
				}
			}
			.activity-list{
				margin: 0 18px 0;
				padding-bottom:16px; 
				li{
					position: relative;
					padding: 16px 12px;
					font-size:0; 
					&:after{
						@include border-1px();
					}
					.support-wrapper{
						display: inline-block;
						vertical-align: top;
					}
					.text{
						display: inline-block;
						font-size: 12px;
						line-height: 22px;
						color: rgb(7,17,27);
						vertical-align: top;
					}
				}
			}
			.seller-infos{
				margin: 0 18px;
				li{
					position: relative;
					padding: 16px 12px;
					&:after{
						@include border-1px();
					}
					.text{
						display: inline-block;
						font-size: 12px;
						line-height: 16px;
						font-weight: 200;
						color: rgb(7,17,27);
						vertical-align: middle;
					}
				}
			}
			.pics{
				width: 100%;
				padding: 0 0 18px 18px;
				.title{
					padding: 18px 0 12px;
				}
				ul{
					width: 3000px;
				}
				.pic-wrapper{
					width: 100%;
					overflow: hidden;
					font-size: 0;
				}
				li{
					display: inline-block;
					margin-right: 6px;
					width: 120px;
					height: 90px;
					font-size: 0;
					img{
						width: 100%;
					}
				}
			}
		}
		.seller-bottom{
			
		}
	}
</style>
<template>
	<div class="seller-content">
		<div class="seller-top" ref="container">
			<div>
				<div class="seller-description">
					<div class="seller-name">
						<div class="left">
							<div class="title">{{seller.name}}</div>
							<div class="star">
								<star :size="24" :score="seller.foodScore"></star>
							</div>
							<div class="text">月售{{seller.sellCount}}单</div>
						</div>
						<div class="right" :class="{active:collectState}" @click="collect">
							<div class="iconfont">&#xe62b;</div>
							<div class="text">收藏</div>
						</div>
					</div>
					<div class="seller-service">
						<ul>
							<li>
								<span class="name">起送价</span>
								<div class="description">{{seller.minPrice}}
									<span>元</span>
								</div>
							</li>
							<li>
								<span class="name">商家配送</span>
								<div class="description">{{seller.deliveryPrice}}
									<span>元</span>
								</div>
							</li>
							<li>
								<span class="name">平均配送时间</span>
								<div class="description">{{seller.deliveryTime}}
									<span>分钟</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<line-divide></line-divide>
				<div class="bullentin">
					<h3 class="title">公告与活动</h3>
					<div class="description">
						{{seller.bulletin}}
					</div>
				</div>
				<ul class="activity-list">
					<li v-for="support in seller.supports">
						<div class="support-wrapper">
							<supports-activity :size="36" :support="support"></supports-activity>
						</div>
						<div class="text">{{support.description}}</div>
					</li>
				</ul>
				<line-divide></line-divide>
				<div class="pics">
					<h3 class="title">商家实景</h3>
					<div class="pic-wrapper" ref="picWrapper">
						<ul ref="picWrapperUl">
							<li v-for="imgUrl in seller.pics">
								<img :src="imgUrl" />
							</li>
						</ul>
					</div>
				</div>
				<line-divide></line-divide>
				<div class="seller-infos">
					<ul>
						<li v-for="(info,i) in seller.infos" class="text">
							<span v-if="i===2">地址:</span>
							{{info}}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="seller-bottom">
			<cart-foods></cart-foods>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import star from '../star/star'
	import {savaLocal,loadLocal} from '@/common/js/savaLocal'
	import cartFoods from '../cartfoods/cartfoods'
	import countEdit from '../countedit/countedit'
	import supportsActivity from '../supports/supports'
	import lineDivide from '../linedivide/linedivide'
	
	
	export default {
	  name: 'seller',
	  props:{
	  	seller:{
	  		type:Object,
	  		default:function(){
	  			return {}
	  		}
	  	}
	  },
	  watch:{
	  	seller:function(){
	  		this.$nextTick(()=>{
	  			if(!this.scroll){
	  				this.scroll = new BScroll(this.$refs.container,{
		  				'click':true
		  			})
	  			}else{
	  				this.scroll.refresh()
	  			}
	  			if(this.seller.pics){
	  				let width = this.seller.pics.length*126+20+'px'
					this.$refs.picWrapperUl.style.width = width
	  			}
	  			if(!this.scrollPic){
	  				this.$refs.picWrapperUl.style.width = 2
	  				this.scrollPic = new BScroll(this.$refs.picWrapper,{
		  				scrollX:true
		  				
		  			})
	  			}else{
	  				this.scrollPic.refresh()
	  			}
	  		})
	  	}
	  },
	  mounted(){
	  	this.$nextTick(()=>{
	  			if(!this.scroll){
	  				this.scroll = new BScroll(this.$refs.container,{
		  				'click':true
		  			})
	  			}else{
	  				this.scroll.refresh()
	  			}
	  			if(this.seller.pics){
	  				let width = this.seller.pics.length*126+20+'px'
					this.$refs.picWrapperUl.style.width = width
	  			}
	  			if(!this.scrollPic){
	  				this.scrollPic = new BScroll(this.$refs.picWrapper,{
		  				scrollX:true
		  				
		  			})
	  			}else{
	  				this.scrollPic.refresh()
	  			}
	  		})
	  },
	  data(){
	  	return {
	  		collectState:(() => {
	  			return loadLocal(this.seller.id,'collectState',false)
	  		})()
	  	}
	  },
	  components:{
	  	cartFoods,
	  	lineDivide,
	  	star,
	  	supportsActivity
	  },
	  methods:{
	  	collect:function(){
	  		console.log(this.collectState)
	  		this.collectState = !this.collectState
	  		savaLocal(this.seller.id,'collectState',this.collectState)
	  	}
	  }	
	}
</script>
