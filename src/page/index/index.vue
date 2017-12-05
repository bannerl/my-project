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
				.lines{
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
		&.hide{
			display: none;
		}
		img{
			margin-top: -10px;
		}
	}
	/*.index-enter-active,.index-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.index-enter,.index-leave-to{
		transform: translate3d(-100%,0,0);
	}*/
</style> 
<template>
	<transition :name="leftLinear">
		<div class="index-wrapper" v-if="data" ref='indexDom'>
			<div class="scrollWrapper" ref="scrollWrapper">
				<div>
					<div class="indexTop-wrapper">
						<div class="selectAddress-wrapper">
							<router-link to="/addressSearch">
								<span class="iconfont icon-dizhi1"></span>
								<span class="address">{{positionText}}</span>
							</router-link>
						</div>
						<div class="searchFood-wrapper">
							<div @click="toSearchPage()" class="modal-input">
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
							<span class="lines"></span>
							<span class="text">推荐商家</span>
							<span class="lines"></span>
						</h3>
						<div>
							<seller-panel :sellers="data.recomSeller"></seller-panel>
						</div>
					</div>
				</div>	
			</div>	
			<slot name="fixed-navbar"></slot>
		</div>
		<!--<div :class="{hide:elseShow}" class="index-loading" v-else>
			<img src="../../common/image/index-loading.svg" />
		</div>-->
	</transition>
</template>

<script>
	import axios from 'axios'
	import { Indicator } from 'mint-ui'
	import BScroll from 'better-scroll'
	import {setStore, getStore} from '@/common/js/savaLocal'
	import {setDocumentTitle} from '@/common/js/base'
	import sellerPanel from 'components/sellerPanel/sellerPanel'
	
	const noError = 0
	
	export default {
      data: function() {
        return {
        	leftLinear:'index',
        	data:null,
        	elseShow: false,
        	position:[120.36932, 30.27269], //默认经纬度
        	positionText: "下沙江滨"        //默认地址
        }
      },
      methods: {
      	_initPage: function () {
      		let self = this
      		axios.get('/api/index').then(function(res){
				if(res.data.status === noError){
					self.data = res.data.data
					Indicator.close()
				}
      		}).then(function(error){
      			
      		})
      	},
      	_initBScroll: function () {
      		if(!this.scroll&&this.$refs.scrollWrapper) {
      	 		this.scroll = new BScroll(this.$refs.scrollWrapper,{
      	 			click:true
      	 		})
      	 	} else if(this.$refs.scrollWrapper) {
      	 		this.scroll.refresh()
      	 	} else {
      	 		
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
		this.leftLinear = ''
      	this._initPage()
      	let self = this
      	setTimeout(function(){
      	 	self._initBScroll()
      	},1200)
      },
      beforeRouteLeave (to, from, next) {
		if(to.name === "orderList" || to.name === "user") {
			//底部导航切换没有动画
	    	this.$refs.indexDom.style.display = "none"
	    }
	    if(this.acountShow) {
	    	this.acountShow = false
	    	next(false)
	    } else {
	    	next(true)
	    }
	  },
      mounted () {
      	let userposition = getStore('userposition')
      	if(!userposition) {
      		let obj = {}
      		obj.text = this.positionText
      		obj.position = this.position
      		setStore('userposition',obj)
      	} else {
      		userposition = JSON.parse(userposition)
      		this.positionText =  userposition.text
      		this.position =  userposition.position
      	}
      },
      components: {
      	sellerPanel
      }
    }
</script>
