<style lang="scss" type="text/css">
	.userEdit-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		height: 600px;
		.mint-cell-value{
			color: rgb(38,162,255);
		}
		.active{
			.mint-cell-value{
			color: #888;
		}
		}
		input[type="file"]{
			visibility: hidden;
			display: block;
			height: 0;
			font-size: 0;
		}
		.avatarEdit{
			display: flex;
			margin-top: 8px;
			padding: 0 12px 0 8px;
			justify-content: space-between;
			align-items: center;
			height: 78px;
			background: #fff;
			.text{
				line-height: 100px;
			}
			img{
				border-radius: 50%;
			}
		}
		.bindAcount{
			margin-top: 10px;
			.title{
				color: #888;
				.mint-cell-text{
					font-size: 15px;
				}
			}
			.phone{
				.iconfont{
					padding: 0 6px;
					font-size: 18px;
					color: rgb(38,162,255);
				}
			}
			.wechat{
				.iconfont{
					padding: 0 6px;
					color: #62b900;
					font-size: 18px;
				}
			}
		}
		.safe-setting{
			margin-top: 10px;
			.title{
				color: #888;
				.mint-cell-text{
					font-size: 15px;
				}
			}
			.phone{
				.iconfont{
					padding: 0 6px;
					font-size: 18px;
					color: rgb(38,162,255);
				}
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
		<div v-if="userInfo"  v-show="acountShow" class="userEdit-wrapper">
			<mt-header title="账号与安全">
			  <div slot="left">
			    <mt-button @click="close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<input type="file" id="uploadImg" />
			<label for="uploadImg" class="avatarEdit">
				<span class="text">头像</span>
				<img :src="userInfo.avatar" width="60" height="60" />
			</label>
			<div @click="openInputShow">
				<mt-cell title="用户名" :class="{active:userInfo.nickName}" :value="userInfo.nickName"></mt-cell>
			</div>
			<div class="bindAcount">
				<mt-cell class="title" title="账号绑定"></mt-cell>
				<mt-cell class="phone" title="手机" :class="{active:userInfo.phone}" :value="userInfo.phone">
				  <span slot="icon" class="iconfont icon-shouji"></span>
				</mt-cell>
				<mt-cell class="wechat" title="微信" value="未绑定">
				  <span slot="icon" class="iconfont icon-weixin"></span>
				</mt-cell>
			</div>
			<div class="safe-setting">
				<mt-cell class="title" title="安全设置"></mt-cell>
				<mt-cell  title="登录密码" value="修改"></mt-cell>
				<mt-cell title="支付密码" value="未设置"></mt-cell>
			</div>
			<line-input v-on:close="savaText" :inputText="userInfo.nickName" :show="inputShow" title="修改昵称" placeholder="请输入您的昵称"></line-input>
		</div>
	</transition>
</template>

<script>
	import lineInput from 'components/lineInput/lineInput'
	
	export default {
		props: {
			userInfo: {
				type: Object
			},
			show: {
				type: Boolean
			}
		},
		data() {
			return {
				inputShow:false
			}
		},
		computed: {
			acountShow: function(){
				if(this.show){
					this.inputShow = false
					return true
				}
				return false
			}
		},
		methods: {
			close: function(){
				this.$emit('close');
			},
			openInputShow: function() {
				this.inputShow = !this.inputShow
			},
			savaText: function(text) {
				this.inputShow = false
				this.userInfo.nickName = text
			}
		},
		components: {
			lineInput
		}
		
	}
</script>
