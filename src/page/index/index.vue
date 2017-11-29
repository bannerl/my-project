<style lang="scss" type="text/css">
	.genesssral-wrapper{
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
	.indexFades-enter-active,.indexFades-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.indexFades-enter,.indexFades-leave-to{
		transform: translate3d(-100%,0,0);
	}
	.indexstop-enter-active,.indexstop-leave-active{
		transition: all .2s linear;
		transform: translate3d(0,0,0);
	}
	.indexstop-enter,.indexstop-leave-to{
		transform: translate3d(0,0,0);
	}
</style>
<template>
	<transition :name="indexFades">
		<div class="genesssral-wrapper" v-show="indexShow" ref="indexDom">
			<slot name="fixed-navbar"></slot>
		</div>
	</transition>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import {setDocumentTitle} from "../../common/js/base"
	
	export default {
		data() {
			return {
				indexShow: false,
				indexFades: 'indexFades'
			}
		},
		computed: {

		},
		beforeRouteEnter (to, from, next) {
		  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)
		  next(vm => {
		    if(from.name === "orderList" || from.name === "user") {
		    	vm.closeAnimations()
		    }
		    
		  })
		},
		beforeRouteLeave (to, from, next) {
			if(to.name === "orderList" || to.name === "user") {
				//底部导航切换没有动画
		    	this.$refs.indexDom.style.display = "none"
		    }else{
		    	this.indexFades = 'indexFades'
		    }
			next(true)
		},
		methods: {
			closeAnimations: function() {
				this.indexFades = 'indexstop'
				//动画名称修改后才允许渲染页面
				this.indexShow = true
				
			}
		},
		created: function(){
			let self = this
			setTimeout(function(){
				console.log(2)
				self.indexShow = true
			},300)
		}
	}
</script>
