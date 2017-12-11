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
		<div class="user-wrapper" ref="userDom" >
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
					<img v-else  width="72" height="72" alt="头像" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsASsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorn77xXY2NyYMSTsv3zFjCn05PNMXxppZGSlyp9DGP8aAOjornD410sfwXJ/7Zj/GmHxrp3aC5P/AV/wAaAOmorlz44se1rcn/AL5/xqN/HNuB8llMT7sBQB1lFcRL44uT/qrKJP8Afct/LFdDouuQaxb5XCToP3kWenuPUUAa1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRSE4GTWHqPinTrAlEc3Mo/hiPA+p6UAbTusaM7sFVRksTgAVxGu+KXud9rYMUh6NKOC/09BWbquv3mrDy5CIoAciJOh+p71k0AFFFFABRRRQAUUUUAFSW9xNazrNBI0ci9GU81HRQB2eleMUfbFqQ2N085BwfqO34V1cciTRrJG6ujDKspyCK8hrsfBuqZD6bK3TLw59O4/r+dAHY0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABTWYIpZjhQMk06sXxRe/Y9Dm2nDzful/Hr+maAOL1TXr3U5HDzMtuWO2JeBjtn1/GsuiigAooooAKKKKACiiigAooooAKKKKACpbe4ktbmO4hOJI2DKaiooA9YsLuO+sYbqP7si5x6HuPzq1XG+CtQ/1unuf+mkf/sw/kfzrsqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiio3kWKNpHOFUEk+gFADbm5itLd553CRoMsxrzfW9al1i53HKW6H93H6e596k17XZNWuNqZS0Q/In97/aP+eKx6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigCxY3clhew3UX3o2zj1HcfiK9QsryG+tI7iA5Rxn3B7g+9eT1u+GtZ/s288iZv9FmPzZ/gbs3+NAHotFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFZ2uOYtDvWHXyWH5jFaNZPiQ48PXv/XPH6igDzOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKD0NFPiXfNGh/icD8zQB6tYRmLT7aM9ViUHP0FWaQDAwOlLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABWR4mOPDl5/ugf+PCtesbxUceHLr32j/x4UAebUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUtt/x9Q/9dF/mKiooA9iorC8Map/aOmBJGzPBhH9x2P+fSt2gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsfxMnmeHrv1VQ35EGtiqWrRedpN5GBktC4H1xQB5VRR1FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAa3hu7mtdctxECwlby3X1B/wAOv4V6ZXA+DbPzdWe5I+WBOP8Aebgfpmu+oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8w17TjpurSxhcQud8R7YPb8DxWZXput6Umr2DRcCZPmic9j/ga80kjeGV4pFKuhKsp6gigBtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRUkEL3E8cCDLyMEH1JxQB33hG0+zaKspHz3DF/w6D+X610FRQQrb28cKDCRqFH0AxUtABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXI+LtF82I6jbr86D98o7r/e/D+X0rrqaQGBBAIPUGgDx+itHXbJNP1m4t4hiMEMg9ARnFZ1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXQ+ELE3WrfaGH7u2G7/gR4H9TXPV6T4ZsPsGjRBlxJL+8f8eg/LFAGzRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAcJ41tXTUYboIfLkjCFu24E8flXMV6vfWUN/ZyW065Rx17g9iPevNdT0y40u7ME4yDyjgcOPUf4UAUqKKKACiiigAooooAKKKKACiiigAooooA0dDsP7S1eCAjMYO+T/dH+PA/GvUa5bwZYeTYyXrr885wmf7o/wAT/KupoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqnqWm2+qWjW9wuQeVYdVPqKuUUAeVanptxpd2YJxkHlHHRx6j/CqVei+LLUXGhSuBloWEg+nQ/oa86oAKKKKACiiigAooooAKKKKACuw0LwopCXWoANkBkgB4+rf4Vx56H6V65bjbbRD0QD9KAJAAqhQAAOABTqKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIbmFbi1lgb7siFD+IxXkjo0bsjDDKSp+or0/W9QGmaXLcceZjbGPVj0/x/CvMGYsxZiSxOST3NACUUUUAFFFFABRRRQAUUUUAAGSB617Agwij0FeQKcMD1wc16tY3sN/Zx3MDZRx07g9wfegC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRWVr2pDS9LlmBHmt8kQ/2j/h1oA5HxZqf23Uvs8bZhtsrx3fuf6fnWBQSSSSSSepPeigAooooAKKKKACiiigAooooAK2vDmtnSrzZKT9llOHH90/3v8axaKAPYFYMoZSCCMgjvTq43wlrmdum3Lf8AXBj/AOg/4V2VABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUx3WNGd2CqoySTgAUANnnitoHmmcJGgyzHsK821zWJNXu92CsEeREh/mfc1Y8Q662qz+TCStpGflH98/wB4/wBKw6ACiiigAooooAKKKKACiiigAooooAKKKKAFVijBlJDA5BHUGut03xoyhY9Ri3Dp5sY5/Ef4VyNFAHrFnfW19F5ltOkq99p5H1HarVeQwTzW0olgleOQdGQ4NdNp3jKaMiPUI/NX/nrGMN+I6GgDuKKqWWo2uoxeZazpIO4B5H1HUVboAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACisXUfEun6dlPM8+Yf8s4ucfU9BXI6l4n1C/yiv9nhP8ER5P1br/KgDs9S1/T9MBWWXfKP+WUfLfj6fjXGav4kutVQwBRDbE5KKclvqf6Vi0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAPilkgkEkUjRyL0ZTgiuk03xlcwYjv4/PT/novDj+h/SuYooA9Ptde0u7A8u8iDH+FztP5GtFWV1DKQwPcHNeP1JDcTW7boZpIz6oxH8qAPXqK80g8Tavb8C7Mg9JVDfr1rTt/G9yuBcWcTj1jYqf1zQB3FFc3b+M9OlwJUmhPuu4fpV3/hJtG/5/o/yP+FAGvRRRQAUUVQ1HVrPS4w11KFJ+6gGWb6CgC/UU9xDbRmSeVI0HVnbArjL/AMaXEpKWMIhX++/zN+XQfrXN3N1cXkvmXMzyv6uc4/woA7S/8Z2kJKWcbXD/AN4/Kn+JrmL/AF/UdRystwUjP/LOP5V/xP41mUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAexUhIAyelLXH+NLy4ie3to5WWKQHeo/i+tAE2s+LY7fdb6eVll6GU8qv09T+lcXPPLczNNPI0kjdWY5JqOigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k="/>
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
				<mt-cell class="address" v-else title="收货地址" to="/login" is-link>
				  <span slot="icon" class="iconfont icon-dizhi1"></span>
				</mt-cell>
				<mt-cell class="collection" v-if="userInfos" title="我的收藏" to="/collection" is-link>
				  <span slot="icon" class="iconfont icon-xin"></span>
				</mt-cell>
				<mt-cell class="collection" v-else title="我的收藏" to="/login" is-link>
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
			<slot value="user" id='1234' name="fixed-navbar"></slot>
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
		props:{
			animateName:{
				type:Boolean
			}
		},
		data(){
			return {
				userInfos: {},
				acountShow: false, //控制账号安全的打开
				fadeuser: 'fadeuser'
			}
		},
		computed: {
			...mapState([
				'loginStatus'
			])
		},
		beforeRouteEnter (to, from, next) {
		  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)
		  next( vm => {
		  	setTimeout(function(){
		  		vm._initPage()
		  	},200)

		  })
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
				let id = getStore('user_id')
				
				if(!self.loginStatus&&!id){
					self.$router.push({name:'login'})
				}
				if(id){
					let self = this
					axios.get('/api/user').then(function(res){
				  		if(res.data.status === noError){
				  			self.userInfos=res.data.data
				  		}	
			  		})
				} else {
					this.userInfos = this.UserInfo
				}
			},
			toggleAcount: function(){
				let id = getStore('user_id')
				if(!this.loginStatus && !id) {
					this.userInfo = {}
					this.$router.push({name:'login'})
				} else {
					this.acountShow = !this.acountShow
				}
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
			let id = getStore('user_id')
			if(!id) {
				this.userInfos = {}
			}
		},
		created: function(){
			if(this.animateName) {
				this.fadeuser = ""
			}
			let self = this
			setTimeout(function(){
				self._initPage()
			},20)
		},
		updated () {
			if(this.animateName) {
				this.fadeuser = "fadeuser"
			} else {
				this.fadeuser = ""
			}
		},
		components:{
			userEdit
		}
	}
</script>
