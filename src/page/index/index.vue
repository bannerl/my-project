<style lang="scss" type="text/css">
	.index-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		background: #f5f5f5;
		.scrollWrapper{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			bottom: 46px;
			overflow: hidden;
		}
		.indexTop-wrapper{
			padding: 32px 16px 10px;
			background: #26A2FF;
		}
		.selectAddress-wrapper{
			.iconfont{
				font-size: 18px;
				font-weight: 700;
				color: #fff;
			}
			.address{
				position: relative;
				font-size: 18px;
				font-weight: 700;
				color: #fff;
				&:after{
					position: absolute;
					margin:5px 0 0 8px;
					font-size: 0;
					border: 4px solid;
					border-color:  #fff transparent  transparent transparent;
					content: '';
				}
			}
		}
		.searchFood-wrapper {
			.modal-input {
				width: 100%;
				margin: 16px 0 0;
				padding: 10px 0;
				background: #fff;
				text-align: center;
				border-radius: 1px;
				.iconfont {
					font-size: 14px;
					vertical-align: top;
					color: #aaa;
				}
				.text {
					font-size: 14px;
					color: #999;
					
				}
			}
			.hot-search {
				ul{
					padding: 14px 0 0;
					display: flex;
					justify-content: space-between;
					font-size: 0;
					.item{
						display: inline-block;
						
						font-size: 12px;
						color: #fff;
					}
				}
			}
		}
		.navbar-wrapper{
			background: #fff;
			padding:0 16px 16px;
			ul{
				width: 100%;
				font-size: 0;
				.item{
					display: inline-block;
					width: 25%;
					text-align: center;
					img{
						display: block;
						padding: 16px 0 10px;
						margin: 0 auto;
						width: 38px;
					}
					.text{
						font-size: 13px;
						color: #333;
					}
				}
			}	
		}		
		.recommendSeller-wrapper{
			margin-top: 14px;
			background: #fff;
			.titles{
				display: flex;
				padding: 16px 0;
				justify-content: center;
				.line{
					display: inline-block;
					width: 40px;
					margin-top: 7px;
					border-top: 1px solid #ddd;
				}
				.text{
					margin: 0 8px;
					font-size: 16px;
					color: #333;
				}
			}
		}
	}
	.index-loading{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		bottom: 0;
		img{
			margin-top: -10px;
		}
	}
</style> 
<template>
	<transition :name="leftLinear">
		<div class="index-wrapper" v-if="data">
			<div class="scrollWrapper" ref="scrollWrapper">
				<div>
					<div class="indexTop-wrapper">
						<div class="selectAddress-wrapper">
							<router-link to="/addressSearch">
								<span class="iconfont icon-dizhi1"></span>
								<span class="address">下沙江滨</span>
							</router-link>
						</div>
						<div class="searchFood-wrapper">
							<div @click="toSearchPage(0)" class="modal-input">
								<span class="iconfont icon-sousuo"></span>
								<span class="text">搜索商家、商品名称</span>
							</div>
							<div class="hot-search">
								<ul>
									<li @click="toSearchPage(item)" class="item" v-for="(item,i) in data.hotSearch" :key="i">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="navbar-wrapper">
						<ul>
							<li class="item" v-for="item in data.foodEntry">
								<!--<router-link :to="{path:'/shop',query:{max_type:item.maxType}}">-->
									<div @click="intoShop(item.maxType,item.name)">
								<div  :key="item.maxType" class="item-content">
									<img :src="item.image" />
									<span class="text">{{item.name}}</span>
								</div>
								<!--</router-link>-->
								</div>
							</li>
						</ul>
					</div>
					<div class="recommendSeller-wrapper">
						<h3 class="titles">
							<span class="line"></span>
							<span class="text">推荐商家</span>
							<span class="line"></span>
						</h3>
						<div>
							<seller-panel :sellers="data.recomSeller"></seller-panel>
						</div>
					</div>
				</div>	
			</div>	
			<slot name="fixed-navbar"></slot>
		</div>
		<div class="index-loading" v-else>
			<!--<img  src="../../common/image/index-loading.svg" />-->
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import { Indicator } from 'mint-ui'
	import BScroll from 'better-scroll'
	import {setStore} from '@/common/js/savaLocal'
	import {setDocumentTitle} from '@/common/js/base'
	import sellerPanel from 'components/sellerPanel/sellerPanel'
	
	const noError = 0
	
	export default {
      data: function() {
        return {
        	leftLinear:'leftLinear',
        	data:null
        }
      },
      methods: {
      	_initPage: function () {
      		let self = this
      		axios.get('/api/index').then(function(res){
				if(res.data.status === noError){
					self.data = res.data.data
					setTimeout(function(){
      					Indicator.close()
					},1)	
				}
      		}).then(function(error){
      			
      		})
      	},
      	_initBScroll: function () {
      		if(!this.scroll) {
      	 		this.scroll = new BScroll(this.$refs.scrollWrapper,{
      	 			click:true
      	 		})
      	 	} else {
      	 		this.scroll.refresh()
      	 	}
      	},
      	toSearchPage: function (text) {
      		this.$router.push('/searchShop?keyword='+text)
      	},
      	intoShop: function(arg,title) {
      		this.$router.push({path:'shop',query:{'max_type':arg,'title':title}})
      	}
      },
      created: function () {
      	Indicator.open()
      	 this._initPage()
      	 let self = this
      	 setTimeout(function(){
      	 	self._initBScroll()
      	 },200)
      },
      components: {
      	sellerPanel
      }
    }
</script>
