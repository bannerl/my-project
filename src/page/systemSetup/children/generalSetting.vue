<style lang="scss" type="text/css">
	.general-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		min-height: 600px;
		.mint-cell-value span{
			font-size: 15px;
		}
		.checkList{
			display: none;
			position: absolute;
			top: 50%;left: 50%;
			width: 86%;
			background: #fff;
			transform: translate3d(-50%,-50%,0);
			.mint-checklist-title{
				font-size: 20px;
				font-weight: 700;
				margin: 14px 18px;
				color: #333;
			}
		}
		.mask-wrapper{
			display: none;
			position: fixed;
			top: 0;left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			height: 130%;
			width: 100%;
			background: rgba(0,0,0,.6);
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
		<div v-show="acountShow" class="general-wrapper">
			<mt-header title="通用">
			  <div slot="left">
			    <mt-button @click="close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="safe-setting">
				<div @click="imageQuality">
					<mt-cell title="非WIFI下图片质量" v-if="value[0]" :value="value[0].substring(0,2)"></mt-cell>
					<mt-cell title="非WIFI下图片质量" v-else :value="defaultValue"></mt-cell>
				</div>
				<div @click="download">
					<mt-cell title="自动下载最新安装包" v-if="value1[0]" :value="value1[0]"></mt-cell>
					<mt-cell title="自动下载最新安装包" v-else :value="defaultDownValue"></mt-cell>
				</div>
				<mt-cell title="推送通知" label="包含订单状态、优惠促销等重要信息的推送">
					<mt-switch v-model="pushInfo"></mt-switch>
				</mt-cell>
			</div>
			<div class="mask-wrapper" ref="mask" v-show="selectImageQuality"></div>
			<div class="checkList" ref="checklist">
				<mt-checklist title="非WIFI下图片质量"
				  	v-model="value" :max="1"
				  :options="['普通(节省流量)', '高清(最佳效果)']">
				</mt-checklist>
			</div>
			<div class="checkList" ref="checklist1" v-show="selectDownload">
				<mt-checklist title="自动下载最新安装包"
				  	v-model="value1" :max="1"
				  :options="['仅WI-FI网络', '从不']">
				</mt-checklist>
			</div>
		</div>
	</transition>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	export default {
		props: {
			show: {
				type: Boolean
			}
		},
		data() {
			return {
				pushInfo: true,
				value: [],
				value1: [],
				defaultValue: '普通',
				defaultDownValue: '仅WI-FI网络'
			}
		},
		computed: {
			acountShow: function(){
				if(this.show){
					return true
				}
				return false
			},
			selectImageQuality: function(){
				if(this.value[0]){
					this.$refs.mask.style.display = 'none'
					this.$refs.checklist.style.display = 'none'
				}
				return true
			},
			selectDownload: function(){
				if(this.value1[0]){
					this.$refs.mask.style.display = 'none'
					this.$refs.checklist1.style.display = 'none'
				}
				return true
			}
		},
		methods: {
			close: function(){
				this.$emit('close');
			},
			imageQuality: function(){
				this.$refs.mask.style.display = 'block'
				this.$refs.checklist.style.display = 'block'
			},
			download: function(){
				this.$refs.mask.style.display = 'block'
				this.$refs.checklist1.style.display = 'block'
			}
		}
		
		
	}
</script>
