<style lang="scss" type="text/css">
	.filter-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #fff;
		height: 100%;
		z-index: 11;
		.divide{
			height: 10px;
			background: #f5f5f5;
		}
		.filter-content{
			padding-top: 12px;
			padding: 0 10px;
			background: #fff;
			.title{
				margin-top: 10px;
				line-height: 20px;
				font-size: 15px;
				background: #fff;
			}
			.content{
				width: 100%;
				font-size: 0;
				background: #fff;
			}
			.item{
				display: inline-block;
				width: 33.3333%;
				margin: 12px 0 ;
				.text{
					display: block;
					font-size: 16px;
					background: #fff;
					text-align: center;
					margin: 0 10px 0 0;
					padding: 6px 0;
					box-sizing: border-box;
					border: 1px solid #f5f5f5;
					&.on{
						background: #26a2ff;
						color: #fff;
						border: 1px solid #26a2ff;
					}
				}
			}
		}
		.confirm{
			position: fixed;
			bottom: 0;
			left: 0;
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
		<div v-show="acountShow" class="filter-wrapper">
			<mt-header title="筛选">
			  <div slot="left">
			    <mt-button @click="close" icon=" iconfont icon-guanbi"></mt-button>
			  </div>
			</mt-header>
			<div class="divide"></div>
			<div class="filter-content" v-show="filterArr">
				<h3 class="title">下单时间：</h3>
				<ul class="content">
					<li class="item" v-for="(filter,i) in filterArr" >
						<span @click="changeSelect(i)" class="text" :class="{on:i===count}">{{filter}}</span>
					</li>
				</ul>
			</div>
			<div class="confirm" @click="sendSelected">
				<mt-button type="primary" size="large">确定</mt-button>
			</div>
		</div>
	</transition>
</template>

<script>
	
	const filterArr = ['全部','近一个月','近三个月','近半年','近一年']
	
	export default {
		props: {
			show: {
				type: Boolean
			},
			filterArr: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data() {
			return {
				count: 0
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
				this.$emit('close')
			},
			changeSelect: function (i) {
				this.count = i
			},
			sendSelected: function(){
				this.$emit('close')
				this.$emit('selected',this.count)
			}
		}
		
		
	}
</script>
