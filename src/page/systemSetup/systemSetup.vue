<style lang="scss" type="text/css">
	.systemSetup-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		height: 100%;
		.trade-details{
			margin-top: 10px;
			.iconfont{
				font-size: 18px;
				padding: 0 6px;
				color: rgba(38,235,255,.6);
			}
		}	
		.payment-setting{
			margin-top: 10px;
			.iconfont{
				padding: 0 6px;
				font-size: 18px;
				color: rgb(38,162,255);
			}
		}
		.mint-cell-value{
			span{
				font-size: 13px;
			}
		}
		.signOut{
			border: none;
			background: #fff;
			box-shadow: 0 0 0;
			border-radius: 0;
			.mint-button-text{
				color: #cc3719;
				font-weight: 600;
				font-size: 19px;
			}
		}
	}
	.fade-enter-active,.fade-leave-active{
		transition: all .3s linear;
		transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(100%,0,0);
	}
	.fades-enter-active,.fades-leave-active{
		transition: all .3s linear;
		transform: translate3d(-100%,0,0);
	}
	.fades-enter,.fades-leave-to{
		transform: translate3d(0,0,0);
	}
</style>
<template>
	<transition :name="fade()">
		<div class="systemSetup-wrapper" v-if="userInfo" >
			<mt-header title="设置">
			  <div slot="left">
			    <mt-button @click="close" icon="back"></mt-button>
			  </div>
			</mt-header>
			<div class="trade-details">
				<div @click="toggleAcount">
					<mt-cell class="wechat" title="账户与安全" value="开启小额免密支付" ></mt-cell>
				</div>
				<div @click="toggleGeneral">
					<mt-cell class="wechat" title="通用"></mt-cell>
				</div>
			</div>
			<div class="trade-details" @click="toggleAboutUs">
				<mt-cell class="wechat" title="关于饿了么"></mt-cell>
			</div>
			<div class="payment-setting">
				<mt-button @click="signOut" class="signOut" size="large">退出登录</mt-button>
			</div>
			<user-edit v-on:close="toggleAcount" :show="acountShow" :userInfo="userInfo"></user-edit>
			<general-setting v-on:close="toggleGeneral" :show="generalShow"></general-setting>
			<about-us v-on:close="toggleAboutUs" :show="aboutUsShow"></about-us>
		</div>
	</transition>
</template>

<script>
	import { setStore, getStore} from '@/common/js/savaLocal'
	import axios from 'axios'
	import {mapState,mapMutations} from 'vuex'
	import userEdit from 'page/user/children/userEdit'
	import generalSetting from './children/generalSetting'
	import aboutUs from './children/aboutUs'
	
	const noError = 0
	
	export default {
		data() {
			return {
				userInfo:{},
				systemFade:'fade',
				acountShow:false, //个人账户与安全页面
				generalShow:false, //通用设置页面
				aboutUsShow:false //关于页面
			}
		},
		computed: {
			
		},
		methods: {
			...mapMutations([
				'OUT_LOGIN'
			]),
			_initData: function(){
				let self = this
				let id = getStore('user_id').id
				axios.get('/api/user',{id:id}).then(function(res){
			  		if(res.data.status === noError){
			  			self.userInfo=res.data.data;
			  		}	
		  		});
			},
			close: function(){
				this.$router.go(-1)
			},
			fade: function(){
				return this.systemFade
			},
			toggleAcount: function(){
				this.acountShow = !this.acountShow
			},
			toggleGeneral:function(){
				this.generalShow = !this.generalShow
			},
			toggleAboutUs:function(){
				this.aboutUsShow = !this.aboutUsShow
			},
			signOut: function() {
				setStore('user_id','')
				this.$router.go(-1)
				this.OUT_LOGIN()
			}
		},
		created: function(){
			this.$nextTick( () => {
				this._initData()
			})
		},
		components:{
			userEdit,
			generalSetting,
			aboutUs
		}
		
	}
</script>
