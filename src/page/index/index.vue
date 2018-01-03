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
		#position-wrapper {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,.5);
			#result{
				position: absolute;
				top: 50%;
				left: 50%;
				width: 200px;
				height: 80px;
				padding: 36px 14px;
				background: #fff;
				border-radius: 4px;
				transform: translate3d(-50%,-50%,0);
				.iconfont{
					position: absolute;
					right: 0;
					top: 0;
					padding: 14px;
					font-size: 18px;
					color: #777;
				}
				.text{
					position: relative;
					font-size: 18px;
					padding-bottom: 10px;
					&:after{
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						border-bottom: 1px solid #ddd;
						transform: scaleY(.5);
						content: '';
					}
				}
				.address{
					font-size: 18px;
					padding: 28px 0 0;
					text-align: center;
				}
				.loading{
					color: #333;
					.mint-spinner-snake{
						display: block;
						margin: 28px auto;
						border-top-color: #777 !important;
					    border-left-color: #777 !important;
					    border-bottom-color: #777 !important;
					}
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
			display: block;
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
								<span class="address">{{address}}</span>
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
			<slot value="index" name="fixed-navbar"></slot>
			<div id="position-wrapper"  v-show="positionShow">
			    <span id="result">
			    	<span class="iconfont icon-guanbi" @click="_closePosition"></span>
			    	<p class="text">当前位置</p>
			    	<p class="address" v-if="address">{{address}}</p>
			    	<p class="loading" v-else>
			    		<mt-spinner type="snake"></mt-spinner>
			    	</p>
			    </span>
			</div>
		</div>
		<div :class="{hide:index_firstshow}" class="index-loading" v-else>
			<img src="./loading.svg" width="100%" height="100%" />
		</div>
	</transition>
</template>

<script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
<script>
	import axios from 'axios'
	import { Indicator,Toast } from 'mint-ui'
	import BScroll from 'better-scroll'
	import {mapState,mapMutations} from 'vuex'
	import {setStore, getStore} from '@/common/js/savaLocal'
	import {setDocumentTitle} from '@/common/js/base'
	import sellerPanel from 'components/sellerPanel/sellerPanel'
	import {hotFoods} from '../../service/getData'
	
	const noError = 0
	
	
	export default {
      data: function() {
        return {
        	leftLinear:'noAnimate',
        	data:null,
        	position:'', //经纬度和地址
        	address:'',
        	locationState:true,
        	positionShow:true
        }
      },
      methods: {
      	...mapMutations([
      		'RECORD_ADDRESS','INDEX_FIRSTSHOW'
      	]),
      	async _initPage() {
      		let self = this
			var y = await 20;
			let res = await hotFoods();
			if(res.data.status === noError){
				self.data = res.data.data
				Indicator.close()
				self._initBScroll()
				self.INDEX_FIRSTSHOW()
			}
      	},
      	_initPosition () {
      		let self = this
			let map = new AMap.Map("container", {
			    resizeEnable: true,
				zoom: 18
		    }),lnglatXY = [120.33234,30.299182],geocoder,geolocation;
		    
		    map.plugin('AMap.Geocoder', function() {
		        geocoder = new AMap.Geocoder({
		        	city:"全国",
		           radius: 1000,
		           extensions: "all"
		        })
		    })
    
		    map.plugin('AMap.Geolocation', function() {
		        geolocation = new AMap.Geolocation({
		            enableHighAccuracy: true,//是否使用高精度定位，默认:true
		            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		            zoomToAccuracy: false,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		            buttonPosition:'RB'
		        });
		        map.addControl(geolocation);
		        geolocation.getCurrentPosition();
		        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		    })
		    //解析定位结果
		    function onComplete(data) {
		        lnglatXY = []
		        lnglatXY.push(data.position.getLng())
		        lnglatXY.push(data.position.getLat())
		        self.position = lnglatXY
		        regeocoder()
		        
		        if(data.accuracy){
		             //str.push('精度：' + data.accuracy + ' 米');
		        }
		    }
		    //解析定位错误信息
		    function onError(data) {
		        console.log('由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，该定位失败，请手动搜索地址，或者用手机端或其他浏览器访问')
		        self.position = [120.1824591,30.270627400000002]
		        self.positionShow = false
		        self.locationState = false
		        Toast({
				  message: '定位失败，请手动搜索',
				  position: 'middle',
				  duration: 1300
				});
		        regeocoder()
		    }
    
		    function regeocoder() {  //逆地理编码
		        geocoder.getAddress(lnglatXY, function(status, result) {
		            if (status === 'complete' && result.info === 'OK') {
		                geocoder_CallBack(result);
		            }
		        });   
		        
//		        let marker = new AMap.Marker({  //加点
//		            map: map,
//		            position: lnglatXY
//		        });
//		        map.setFitView();
		    }
	    	let address = ''
	    	function geocoder_CallBack(data) {
		        //let address = data.regeocode.formattedAddress; //返回地址描述
		        if(data.regeocode.addressComponent.building){
		        	address = data.regeocode.addressComponent.building
		        }else if(data.regeocode.aois[0]) {
		       	 	address = data.regeocode.aois[0].name
		        }else if(data.regeocode.crosses[0]) {
		       	 	address = data.regeocode.crosses[0].first_name
		        }
		        if(self.locationState) {
		        	 self.address = address
		        } else {
		        	 self.address = '定位失败'
		        }
		       
		        let obj = {}
		        if(self.position&&self.address) {
		        	obj.position = self.position
		        	obj.address = self.address
		        
		        	 self.RECORD_ADDRESS(obj)
		        }
		    }
      	
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
      	_closePosition () {
      		this.positionShow = false
      		this._initBScroll()
      	},
      	toSearchPage: function (text) {
      		this.$router.push('/searchShop?keyword='+text)
      	},
      	intoShop: function(arg,title) {
      		this.$router.push({path:'/shop',query:{'max_type':arg,'title':title}})
      	}
      },
      computed:{
      	...mapState([
      		'recordAddress','index_firstshow'
      	])
      },
      created: function () {
      	Indicator.open()
		this.leftLinear = ''
      	this._initPage()
      	let self = this
      	
      	if(this.recordAddress.address){
      		this.positionShow = false
      		this.address = this.recordAddress.address
      	} else {
      		this._initPosition()
      	}
      	setTimeout(function(){
      	 	self._initBScroll()
      	},400)
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
		
      },
      components: {
      	sellerPanel
      }
    }
</script>
