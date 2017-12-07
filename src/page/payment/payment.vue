<style lang="scss" type="text/css">
	.payment-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		.method-container{
			margin: 10px 0 0;
			.mint-cell-title{
				.iconfont{
					font-size: 24px;
					color: #26A2FF;
					margin-right: 12px;
					vertical-align: middle;
					&.icon-weixinzhifu {
						color: #1DF16A;
					}
				}
				.mint-cell-text{
					font-size: 16px;
					vertical-align: middle;
				}
			}
			.mint-cell-value{
				margin-right: 12px;
				.iconfont{
					font-size: 22px;
					color: #ddd;
					&.on{
						color: #26A2FF;
					}
				}
			}
		}
		.confirm-container{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			.mint-button{
				border-radius: 0;
			}
		}
	}
	.fade-enter-active,.fade-leave-active{
		transition: all .3s;
		transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="fade">
		<div class="payment-wrapper">
			<mt-header title="选择付款方式">
			  <div slot="left">
			    <mt-button @click="$router.go(-1)" icon=" iconfont icon-guanbi"></mt-button>
			  </div>
			</mt-header>
			<div class="method-container">
				<div @click="selected(0)">
					<mt-cell title="支付宝" icon=" iconfont icon-iconfonticonfontzhifubao">
						<span :class="{on:method===0}" class="iconfont icon-duihao2"></span>
					</mt-cell>
				</div>
				<div  @click="selected(1)">
					<mt-cell title="微信支付" icon=" iconfont icon-weixinzhifu">
						<span :class="{on:method===1}" class="iconfont icon-duihao2"></span>
					</mt-cell>
				</div>
			</div>
			<div class="confirm-container">
			    <mt-button @click="tips" size="large" type="primary">确定</mt-button>
			</div>
			
		</div>
	</transition>
</template>

<script>
	import { Toast } from 'mint-ui'
	
	export default {
		data() {
			return {
				method:0
			}
		},
		computed: {
			acountShow: function(){
				if(this.show){
					return true
				}
				return false
			},
		},
		methods: {
			selected (i) {
				console.log(i)
				this.method = i
			},
			tips () {
				Toast({
				  message: '功能未做，无法支付',
				  duration: 1200
				})
			}
		}
		
		
	}
</script>
