<style lang="scss" type="text/css">
	.user-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		.userInfo-wrapper{
			display: flex;
			align-items: center;
			padding: 20px 16px;
			background: rgba(38,162,255,.97);
			.image{
				margin-right: 18px;
				img{
					border-radius: 50%;
				}
			}
			.userInfo{
				flex: 1;
				margin-top: -9px;
				.nickName{
					font-size: 18px;
					line-height: 36px;
					color: #fff;
				}
				.phone{
					font-size: 0;
					color: #fff;
					.iconfont{
						margin-right: 8px;
						font-size: 15px;
					}
					.mobilePhone{
						font-size: 13px;
						line-height: 20px;
						vertical-align: -1px;
					}
				}
			}
			.right{
				font-size: 20px;
				color: #fff;
			}
		}
		.navbar-wrapper{
			display: flex;
			background: #fff;
			.common{
				flex: 1;
				padding: 18px 0;
				text-align: center;
			}
			.text{
				font-size: 12px;
				color: #333;
			}
			.count{
				font-size: 18px;
				font-weight: 700;
				line-height: 28px;
			}
			.wallet{
				.count{
					color: rgb(38,162,255);
					.text{
						font-size: 12px;
						margin-left: -4px;
						color: rgb(38,162,255);
					}
				}
			}
			.discounts{
				.count{
					color: #ff4683;
					.text{
						font-size: 12px;
						margin-left: -4px;
						color: #ff4683;
					}
				}
			}
			.score{
				.count{
					color: #e88418;
					.text{
						font-size: 12px;
						margin-left: -4px;
						color: #e88418;
					}
				}
			}
		}
		.list-wrapper{
			margin-top: 10px;
			.address{
				.iconfont{
					color: rgb(38,162,255);
				}
			}
			.collection{
				.iconfont{
					color: #e83718;
				}
			}
			.helping{
				.iconfont{
					color: rgb(38,162,255);
				}
			}
			.advise{
				.iconfont{
					color: #e88418;
				}
			}
		}
	}
	.fadeuser-enter-active,.fadeuser-leave-active{
		transition: all .3s;
		transform: translate3d(0,0,0);
	}
	.fadeuser-enter,.fadeuser-leave-to{
		transform: translate3d(-100%,0,0);
	}
</style>
<template>
	<transition :name="fadeuser">
		<div class="user-wrapper" ref="userDom">
			<mt-header title="">
			  <div slot="left">
			    <mt-button>我的</mt-button>
			  </div>
			  <router-link v-if="userInfos" to="/systemSetup" slot="right">
			  	<mt-button icon=" iconfont icon-shezhi"></mt-button>
			  </router-link>
			  <router-link v-else to="/login" slot="right">
			  	<mt-button icon=" iconfont icon-shezhi"></mt-button>
			  </router-link>
			</mt-header>
			<div class="userInfo-wrapper" @click="toggleAcount">
				<div class="image" >
					<img v-if="userInfos" width="72" height="72" :src="userInfos.avatar" />
					<img v-else  width="72" height="72" alt="头像" />
				</div>
				<div class="userInfo">
					<div class="nickName" v-if="userInfos">{{userInfos.nickName}}</div>
					<div class="nickName" v-else>立即登陆</div>
					<div class="phone" v-if="userInfos">
						<span class="iconfont icon-shouji"></span>
						<span class="mobilePhone">{{userInfos.phone}}</span>
					</div>
					<div v-else class="phone text"><p class="mobilePhone">登陆后可享受更多特权</p></div>
				</div>
				<div class="right iconfont icon-dayuhao3"></div>
			</div>
			<div class="navbar-wrapper border-1px">
				<div class="common wallet border-1px-right">
					<router-link to="/wallet" v-if="userInfos">
						<div class="count" v-if="userInfos.money">
							{{(userInfos.money-0).toFixed(2)}}
							<span class="text">元</span>
						</div>
						<div class="count" v-else>
							0.00
							<span class="text">元</span>
						</div>
						<div class="text">钱包</div>
					</router-link>
					<router-link to="/login" v-else>
						<div class="count">
							0.00
							<span class="text">元</span>
						</div>
						<div class="text">钱包</div>
					</router-link>
				</div>
				<div class="common discounts border-1px-right">
					<router-link to="/discount" v-if="userInfos">
						<div class="count" v-if="userInfos.discounts">
							{{userInfos.discounts.length}}
							<span class="text">个</span>
						</div>
						<div class="count" v-else>
							0
							<span class="text">个</span>
						</div>
						<div class="text">优惠</div>
					</router-link>
					<router-link to="/login" v-else>
						<div class="count">
							0
							<span class="text">个</span>
						</div>
						<div class="text">优惠</div>
					</router-link>	
				</div>
				<div class="common score">
					<router-link to="/score" v-if="userInfos">
						<div class="count" v-if="userInfos.score">
							{{userInfos.score}}
							<span class="text">个</span>
						</div>
						<div class="count" v-else>
							0
							<span class="text">个</span>
						</div>
						<div class="text">积分</div>
					</router-link>
					<router-link to="/login" v-else>
						<div class="count">
							0
							<span class="text">个</span>
						</div>
						<div class="text">积分</div>
					</router-link>	
				</div>
			</div>
			<div class="list-wrapper">
				<mt-cell class="address" v-if="userInfos" title="收货地址" to="/address" is-link>
				  <span slot="icon" class="iconfont icon-dizhi1"></span>
				</mt-cell>
				<mt-cell class="address" v-else title="收货地址" to="/address" is-link>
				  <span slot="icon" class="iconfont icon-dizhi1"></span>
				</mt-cell>
				<mt-cell class="collection" v-if="userInfos" title="我的收藏" to="/collection" is-link>
				  <span slot="icon" class="iconfont icon-xin"></span>
				</mt-cell>
				<mt-cell class="collection" v-else title="我的收藏" to="/collection" is-link>
				  <span slot="icon" class="iconfont icon-xin"></span>
				</mt-cell>
				<div @click="helpingMessage">
					<mt-cell class="helping" title="我的客服" is-link>
					  <span slot="icon" class="iconfont icon-kefu"></span>
					</mt-cell>
				</div>
				<div  @click="adviseMessage">
					<mt-cell class="advise" title="意见反馈" is-link>
					  <span slot="icon" class="iconfont icon-fankui1"></span>
					</mt-cell>
				</div>
			</div>
			<slot name="fixed-navbar"></slot>
			<user-edit v-on:close="toggleAcount" :show="acountShow" :userInfo="userInfos"></user-edit>
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import {mapState,mapMutations} from 'vuex'
	import {getStore} from '@/common/js/savaLocal'
	import {setDocumentTitle} from '@/common/js/base'
	import userEdit from './children/userEdit'
	import { Toast } from 'mint-ui'
	
	const noError = 0
	
	export default {
		name:"user",
		data(){
			return {
				userInfos: {},
				acountShow: false, //控制账号安全的打开
				fadeuser: 'fadeuser',
				animationShow:false,
			}
		},
		computed: {
			...mapState([
				'loginStatus',
				'systemFade'
			])
		},
		beforeRouteEnter (to, from, next) {
		  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)
		  next( vm => {})
		},
		beforeRouteLeave (to, from, next) {
			if(to.name === "orderList" || to.name === "index") {
				//底部导航切换没有动画
		    	this.$refs.userDom.style.display = "none"
		    }
		    if(this.acountShow) {
		    	this.acountShow = false
		    	next(false)
		    } else {
		    	next(true)
		    }
		},
		methods: {
			_initPage: function(){
				let self = this
				//底部导航激活
				self.$parent.selected = "user"
				let id = getStore('user_id')
				if(!self.loginStatus&&!id){
//					self.$router.push({name:'login'})
				}
				if(id){
					let self = this
					axios.get('/api/user').then(function(res){
				  		if(res.data.status === noError){
				  			self.userInfos=res.data.data;
				  		}	
			  		})
				} else {
					this.userInfos = this.UserInfo
				}
				if(this.systemFade){
					this.acountShow = true
				}
				
				
			},
			toggleAcount: function(){
				let id = getStore('user_id')
				if(!id) {
					this.$router.push('/login')
				}
				this.acountShow = !this.acountShow
			},
			helpingMessage: function(){
				Toast({
				  message: '尚在建设中...',
				  position: 'bottom',
				  duration: 1200
				})
			},
			adviseMessage: function(){
				Toast({
				  message: '尚在建设中...',
				  position: 'bottom',
				  duration: 1200
				})
			}
		},
		mounted: function(){
			console.log(3)
			let id = getStore('user_id')
			if(!id) {
				this.userInfos = {}
			}
		},
		created: function(){
			console.log(1)
			let self = this
			setTimeout(function(){
				self._initPage()
			},20)
		},
		components:{
			userEdit,
		}
	}
</script>
