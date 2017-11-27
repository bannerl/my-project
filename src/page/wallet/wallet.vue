<style lang="scss" type="text/css">
	.wallet-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		height: 600px;
		.my-money{
			margin-top: 8px;
			padding: 14px 8px 14px 16px;
			background: #fff;
			.title{
				font-size: 14px;
				padding: 6px 0;
			}
			.count-wrapper{
				display: flex;
				align-items: center;
				.icon-2{
					display: inline-block;
					width: 36px;
					height: 36px;
					line-height: 36px;
					font-size: 22px;
					background: #e88418;
					color: #fff;
					text-align: center;
					border-radius: 50%;
				}
				.count{
					flex: 1;
					margin-left: 6px;
					font-size: 22px;
					font-weight: 700;
				}
				.right{
					.text{
						font-size: 12px;
						color: #888;
					}
					.icon-self{
						position: relative; 
						display: inline-block;
						width: 26px; 
						height: 5px; 
						&:after{
						    border: solid 2px #c8c8cd;
						    border-bottom-width: 0;
						    border-left-width: 0;
						    content: " ";
						    top: 0;
						    right: 12px;
						    position: absolute;
						    width: 5px;
						    height: 5px;
						    -webkit-transform: translateY(-50%) rotate(45deg);
						    transform: translateY(-50%) rotate(45deg);
						}
					}
				}
			}
		}
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
	}
	.fade-enter-active,.fade-leave-active{
		transition: all .2s linear;
		transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="fade">
		<div class="wallet-wrapper" v-if="userInfo" >
			<mt-header title="我的钱包">
			  <div slot="left">
			    <mt-button @click="close" icon=" iconfont icon-guanbi"></mt-button>
			  </div>
			</mt-header>
			<div class="my-money">
				<h3 class="title">我的余额</h3>
				<div class="count-wrapper">
					<span class="iconfont icon-2"></span>
					<span v-if="userInfo.money" class="count">￥{{(userInfo.money-0).toFixed(2)}}</span>
					<span v-else="userInfo.money" class="count">￥0</span>
					<div class="right">
						<span class="text">不可提现</span>
						<i class="iconfont icon-self"></i>
					</div>
				</div>
			</div>
			<div class="trade-details">
				<mt-cell class="wechat" title="交易明细" is-link>
				  <span slot="icon" class="iconfont icon-dingdan1"></span>
				</mt-cell>
			</div>
			<div class="payment-setting">
				<mt-cell title="支付设置" is-link>
					<span slot="icon" class="iconfont icon-shezhi" ></span>
				</mt-cell>
			</div>
		</div>
	</transition>
</template>

<script>
	import {getStore} from '@/common/js/savaLocal'
	import axios from 'axios'
	
	const noError = 0
	
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		computed: {
			
		},
		methods: {
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
			}
		},
		created: function(){
			this.$nextTick( () => {
				this._initData()
			})
		}
		
	}
</script>
