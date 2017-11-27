<style lang="scss" type="text/css">
	.general-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		height: 100%;
		min-height: 600px;
		.image{
			position: absolute;
			top: 40%;
			width: 80%;
			left: 50%;
			transform: translate3d(-50%,-50%,0);
			text-align: center;
			img{
				display: block;
				margin:18px auto;
			}
			span{
				color: rgb(38,162,255);
				font-weight: 700;
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
		<div v-show="acountShow" class="general-wrapper">
			<mt-header title="关于饿了么">
			  <div slot="left">
			    <mt-button @click="close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="image">
				<img width="80" src="data:image/jpeg;base64,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"/>
				<span>美好生活，触手可得</span>
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
			close: function(){
				this.$emit('close');
			},
		}
		
		
	}
</script>
