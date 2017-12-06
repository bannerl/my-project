<style lang="scss" type="text/css">
	.order-discounts-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		z-index: 3;
		.mint-cell {
			margin-top: 12px;
			padding: 12px 0;
			.mint-cell-wrapper{
				background: none;
				.iconfont{
					font-size: 20px;
					margin-right: 10px;
					color: #aaa;
				}
			}
		}
		.active{
			.iconfont {
				color: #26A2FF !important;
			}
		}
	}
</style>
<template>
	<transition name="fadeRight">
		<div v-show="pageShow" class="order-discounts-wrapper">
			<mt-header title="选择优惠券">
			  <div slot="left">
			    <mt-button @click="_close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div :class="{active:selected===i}" v-for="(item,i) in discounts" @click="sendDiscount(item,i)">
				<mt-cell :title="title(item)" :label="text(item)">
					<span class="iconfont icon-duihao2"></span>
				</mt-cell>
			</div>
		</div>
	</transition>	
</template>

<script>
	export default {
		props: {
			discounts: {
				type: Array,
				default: function () {
					return []
				}
			},
			show: {
				type:Boolean
			}
		},
		data() {
			return {
				selected: -1
			}
		},
		computed: {
			pageShow: function() {
				return this.show
			}
		},
		methods: {
			_close () {
				this.$emit("close")
			},
			title(item) {
				if(item.type === 0) {
					return "拼手气红包"
				} else{
					return "普通红包"
				}
			},
			text(item) {
				return `满${item.maxPrice}减${item.price} 限定手机号为${item.limitPhone}`
			},
			sendDiscount (item,i) {
				this.selected = i
				let self = this
				setTimeout(function(){
					self.$emit('close',item)
				},200)
			}
		} 
	}
</script>
