<style lang="scss" type="text/css">
	.receiveAddress-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		height: 100%;
		min-height: 600px;
		
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
		<div v-show="acountShow" class="receiveAddress-wrapper">
			<mt-header title="收货地址">
			  <div slot="left">
			    <mt-button @click="close" icon="back">返回</mt-button>
			  </div>
			   <div slot="right">
			    <mt-button>编辑</mt-button>
			  </div>
			</mt-header>
			<div class="image">
				<img width="100%" src="../../common/image/bg.jpg" alt="背景图片" />
			</div>
			
			
		</div>
	</transition>
</template>

<script>
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
				return true
			},
		},
		methods: {
			close: function(){
				this.$emit('close');
			},
		}
		
		
	}
</script>
