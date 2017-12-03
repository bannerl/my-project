<style lang="scss" type="text/css">
	.lineInput-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		height: 100%;
		min-height: 600px;
		.input{
			margin: 12px 0;
			.border-t-b{
				position: relative;
				&:before{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					font-size: 0;
					border-top: 1px solid #ddd;
					transform: scaleY(.5);
					content: '.';
				}
				&:after{
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					font-size: 0;
					border-bottom: 1px solid #ddd;
					transform: scaleY(.5);
					content: '.';
				}
			}
			input{
				width: 100%;
				background: #fff;
				padding: 12px 10px 12px 14px;
				font-size: 16px;
				outline: none;
			}
		}
	}
	.fade-enter-active,.fade-leave-active{
		transition: all 4s;
		transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="fade">
		<div v-show="pageShow" class="lineInput-wrapper">
			<mt-header :title="title">
			  <div slot="left">
			    <mt-button @click="close" icon="back">返回</mt-button>
			  </div>
			   <div slot="right">
			    <mt-button @click="savaText">保存</mt-button>
			  </div>
			</mt-header>
			<div class="input">
				<div class="border-t-b">
					<input v-if="inputShow" v-model="inputTexts" :placeholder="placeholder"
						 v-focus />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { Toast } from 'mint-ui'
	
	export default {
		props: {
			show: {
				type: Boolean
			},
			title: {
				type: String,
				default: "请填写"
			},
			inputText: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: "请输入昵称"
			}
		},
		data() {
			return {
				inputShow: false,
				inputTexts: this.inputText
			}
		},
		computed: {
			pageShow: function(){
				if(this.show){
					
					this.inputShow = true
					return true
				}
				this.inputShow = false
				return false
			},
		},
		methods: {
			close: function(){
				this.$emit('close',this.inputText)
			},
			savaText: function () {
				if(!this.inputText) {
					Toast({
					  message: '昵称不能为空',
					  position: 'bottom',
					  duration: 1200
					})
				} else {
					this.$emit('close',this.inputTexts)
				}
			}
		},
		directives: {
		  focus: {
		    inserted: function (el) {
		      el.focus()
		    }
		  }
		}
	}
</script>
