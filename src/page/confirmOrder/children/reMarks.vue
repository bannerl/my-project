<style lang="scss" type="text/css">
	.reMarks-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		z-index: 3;
		.tableware{
			margin: 12px 0;
			background: #fff;
			.title{
				font-size: 16px;
				font-weight: 700;
			}
			.count-container{
				.first{
					.iconfont{
						
					}
				}
			}
			.need{
				margin: 10px 0;
				padding: 14px;
				background: #fff;
				.item{
					
				}
				.selfWrite{
					textarea{
						
					}
				}
			}
		}
	}
</style>
<template>
	<transition name="fadeRight">
		<div v-show="pageShow" class="reMarks-wrapper">
			<mt-header title="备注">
			  <div slot="left">
			    <mt-button @click="_close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="tableware">
				<h3 class="title">餐具份数</h3>
				<div class="count-container">
					<div class="first">
						<span class="iconfont"></span>
						无需餐具
					</div>
					<div class="count">
						<ul>
							<li v-for="n in 6">{{n}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="need">
				<h3 class="title">口味偏好:</h3>
				<ul>
					<li class="item" v-for="item in needArr">{{item}}</li>
				</ul>
				<div class="selfWrite">
					<textarea rows="2"></textarea>
				</div>
			</div>
		</div>
	</transition>	
</template>

<script>
	
	const needArr = ["多点辣","少点辣","不要辣","不要香菜","不要洋葱","多点葱","多点醋"]
	
	export default {
		props: {
			show: {
				type:Boolean
			}
		},
		data() {
			return {
				needArr: needArr
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
			}
		} 
	}
</script>
