<style scoped="scoped" lang="scss" type="text/css">
	@import '../../common/style/mixin';
	.shops-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		.mint-header{
			z-index: 10;
		}
		.filters-wrapper{
			position: relative;
			width: 100%;
			padding: 0 14px 0 14px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			text-align: center;
			background: #fff;
			z-index: 10;
			.common{
				background: #fff;
				.title{
					position: relative;
					padding: 12px 0 10px;
					font-size: 14px;
					height: 18px;
					&.on{
						color: #000;
						font-weight: 700;
						.select{
							&:after{
								border-top-color: #000;
							}
						}
						.iconfont{
							color: #000;
						}
					}
					&:after{
						position: absolute;
						right: 0;
						top: 0;
						height: 100%;
						border-right: 1px solid #ddd;
						transform: scaleX(.5);
						@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
				            transform: scaleX(.3);
				        }
				        content:'';
					}
					&:last-child{
						&:after{
							display: none;
						}
					}
					.iconfont{
						margin-left: 2px;
						font-size: 12px;
						color: #333;
						vertical-align: top;
					}
					.select{
						position: absolute;
						right: 0px;
						top: 13px; 
						&:after{
						    position: absolute;
						    margin: 4px 0 0 5px;
						    font-size: 0;
						    border: 4px solid;
						    border-color: #666 transparent transparent transparent;
						    content: '';
						}
					}
				}
			}
		}
		.filter-content{
			position: absolute;
			width: 100%;
			z-index: 8;
			.category-container{
				width: 100%;
				background: #fff;
				.item{
					padding: 14px;
					font-size: 13px;
				}
			}
		}
		.seller-wrapper{
			position: relative;
			background: #fff;
			.sellerPanel-container{
				background: #fff;
				padding-top: 10px;
			}
			.nodata{
				display: block;
				width: 100%;
				padding: 16px 0;
				margin-top: 90px;
				text-align: center;
				color: #888;
				background: #f5f5f5;
			}
		}
	}
	.fadeTop-enter-active,.fadeTop-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.fadeTop-leave-to,.fadeTop-enter{
		transform: translate3d(0,-100%,0);
	}
	.fadeShops-enter-active,.fadeShops-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.fadeShops-leave-to,.fadeShops-enter{
		transform: translate3d(100%,0,0);
	}
	.fadeShopLeft-enter-active,.fadeShopLeft-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.fadeShopLeft-leave-to,.fadeShopLeft-enter{
		transform: translate3d(-100%,0,0);
	}
</style>
<template>
	<transition :name="animate">
		<div class="shops-wrapper">
			<mt-header :title="title">
				<div @click="returnBack" slot="left" >
				    <mt-button icon="back">返回</mt-button>
				</div>
			</mt-header>
			<div class="filters-wrapper">
				<div class="common">
					<h3 @click="categoryShow" :class="{on:filterNumber===0}" class="title">{{category[category_id]}}
						<span class="select"></span>
					</h3>
				</div>
				<div class="common">
					<h3 @click="filterType('maxCount')" :class="{on:filterNumber===1}" class="title">{{filterCount.text}}</h3>
				</div>
				<div class="common filter-container">
					<h3 @click="filterType('nearAddress')" :class="{on:filterNumber===2}" class="title">{{filterAddress.text}}</h3>
				</div>
				<div class="common filter-container">
					<h3 @click="filterType('filter')" :class="{on:filterNumber===3}" class="title">筛选<span class="iconfont icon-shaixuan1"></span></h3>
				</div>
			</div>
			<div class="filter-content">
				<transition name="fadeTop">
					<ul v-show="filterShow" class="category-container">
						<li @click="filterType(i)" class="item border-1px" v-for="(item,i) in category">
							<span>{{item}}</span>
						</li>
					</ul>
				</transition>
			</div>
			<div class="seller-wrapper">
				<div v-show="!noDataShow">
					<seller-panel :sellers="shops"></seller-panel>
				</div>
				<div v-show="noDataShow">
					<div class="nodata">暂无数据</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import sellerPanel from 'components/sellerPanel/sellerPanel'
	import { Indicator } from 'mint-ui'
	import { setStore, getstore } from'@/common/js/savaLocal'
	import { loadUrl } from '@/common/js/unit'
	
	const noError = 0
	const category = ["综合排序","速度最快","评分最高","起送价最低","配送费最低","人均高到低","人均低到高"]
	
	export default {
		data() {
			return {
				title: '', //标题
				animate:'fadeShops',
				category: category,
				filterShow: false,
				category_id: 0,
				filterNumber: 0,
				shops: [],
				noDataShow: false,
				filterCount:{
					text: "销售最高",
					type:0
				},
				filterAddress:{
					text: "距离最近",
					address: "33,33"
				}
			}
		},
		methods: {
			_loadData: function (i) {
				if(i === 1 ) {
					this.shops.sort((a,b) => {return b.sellMonthCount - a.sellMonthCount})
				} else if ( i === 2 ) {
					this.shops.sort((a,b) => {return b.sellMonthCount - a.sellMonthCount})
				}
			},
			returnBack () {
				this.animate = 'fadeShops'
				this.$router.go(-1)
			},
			categoryShow: function () {
				this.filterShow = !this.filterShow
			},
			animateChange () {
				this.animate = 'fadeShopLeft'
			},
			filterType: function(i) {
				if(typeof i === 'number') {
					this.category_id = i
					this.filterNumber = 0
					this._loadData(0)
					this.filterShow = false
				} else if(i === "maxCount") {
					this.filterNumber = 1
					this._loadData(1)
				} else if(i === "nearAddress") {
					this.filterNumber = 2
					this._loadData(2)
				} else if(i === "filter") {
					this.filterNumber = 3
				}
			}
		},
		watch:{
			$route: function(to,from) {
//				console.log(to)
//				console.log(from)
			},
			category_id: function () {
				let i = this.category_id
				if(i === 0) {
				} else if( i === 1 ) {
					this.shops.sort((a,b) => {return a.deliveryTime - b.deliveryTime})
				} else if ( i === 2 ) {
					this.shops.sort((a,b) => {return b.foodScore - a.foodScore })
				} else if ( i === 3 ) {
					this.shops.sort((a,b) => {return a.minPrice - b.minPrice })
				} else if ( i === 4 ) {
					this.shops.sort((a,b) => {return a.deliveryPrice - b.deliveryPrice })
				} else if ( i === 6 ) {
					this.shops.sort((a,b) => {return a.perConsume - b.perConsume })
				} else if ( i === 5 ) {
					this.shops.sort((a,b) => {return b.perConsume - a.perConsume })
				}
				
			},
		},
		created: function(){
			let self = this
			let url = window.location.href
			let a = loadUrl(url)
			this.title = decodeURI(a.title)
			axios.get('/api/shops',{
				params:{
					max_type: a.max_type
				}
			}).then(function(res){
				if(res.data.status === noError ) {
					if(res.data.data.foods){
						self.shops = res.data.data.foods
					} else {
						self.noDataShow = true
					}
				}
			}).then(function(error){
				
			})
			axios.get('/api/category')
			.then(function(res){
//				self.category = res.data.data
			}).then(function(error){
				
			})
		},
		components:{
			sellerPanel
		}
	}
</script>
