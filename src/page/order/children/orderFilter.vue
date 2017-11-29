<style lang="scss" type="text/css">
	.helping-wrapper{
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
		<div v-show="acountShow" class="helping-wrapper">
			<mt-header title="我的客服">
			  <div slot="left">
			    <mt-button @click="close" icon=" iconfont icon-guanbi"></mt-button>
			  </div>
			</mt-header>
			
			
			
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
