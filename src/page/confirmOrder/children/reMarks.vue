<style lang="scss" type="text/css">
	.reMarks-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		z-index: 5;
		.tableware{
			margin: 12px 0 0;
			padding: 14px;
			background: #fff;
			.title{
				font-size: 16px;
				font-weight: 700;
			}
			.count-container{
				display: flex;
				padding: 10px 0;
				justify-content: space-between;
				.mint-button:not(.is-disabled):active::after{
					opacity: 0;
				}
				.mint-button--small{
					height: 24px;
					padding: 0 7px;
					background: #fff;
					color: #333;
					font-size: 12px;
					.iconfont{
						font-size: 13px;	
						color: rgba(29,220,100,.8);
					}
					&.active{
						background: #26A2FF;
						color: #fff;
						.iconfont{
							color: #fff;
						}
					}
				}
				.count{
					font-size: 0;
					li{
						display: inline-block;
						height: 24px;
						background: #fff;
						color: #333;
						font-size: 13px;
						.mint-button--small{
							padding: 0 13px;
							border-radius: 0;
						}
						.mint-button:not(.is-disabled):active::after{
							opacity: 0;
						}
						&.active{
							background: #26A2FF;
							color: #fff;
							.mint-button--small{
								background: #26A2FF;
								color: #fff;
							}
						}
					}
				}
			}
		}
		.need{
			margin: 14px 0 0;
			padding: 0 14px;
			background: #fff;
			.title{
				padding: 13px 0;
				font-size: 16px;
				font-weight: 700;
			}
			ul{
				font-size: 0;
			}
			.mint-button:not(.is-disabled):active::after{
				opacity: 0;
			}
			.item{
				display: inline-block;
				.mint-button--small{
					height: 28px;
					margin: 6px 12px 6px 0;
					background: #fff;
				}
				&.active{
					.mint-button--small{
						background: #26A2FF;
						color: #fff;
					}
				}
			}
			.selfWrite{
				padding-bottom: 4px;
				.title{
					padding: 12px 0;
					font-size: 16px;
					font-weight: 700;
				}
				textarea{
					width: 100%;
					padding: 12px;
					font-size: 15px;
					outline: none;
					border: none;
					background: #f5f5f5;
					box-sizing: border-box;
				}
			}
		}
		.confirm-container{
			padding: 16px 14px;
			.mint-button{
				color: #fff;
				background: rgba(29,220,100,.8);
			}
		}
	}
</style>
<template>
	<transition name="fadeRight">
		<div v-show="pageShow" class="reMarks-wrapper" ref="reMarks">
			<mt-header title="备注">
			  <div slot="left">
			    <mt-button @click="_close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="tableware">
				<h3 class="title">餐具份数</h3>
				<div class="count-container">
					<mt-button size="small" @click="counted(0)" :class="{active:count===0}">
						<span class="iconfont icon-lvye"></span>无需餐具
					</mt-button>
					<div class="count">
						<ul>
							<li v-for="n in 6" @click="counted(n)" :class="{active:count===n}">
								<mt-button size="small">{{n}}</mt-button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="need">
				<h3 class="title">口味偏好</h3>
				<ul>
					<li class="item" v-for="(item,i) in needArr" @click="taste(i)" :class="{active:item.active}">
						<mt-button size="small">{{item.text}}</mt-button>
					</li>
				</ul>
				<div class="selfWrite">
					<h3 class="title">备注</h3>
					<textarea v-model="text" rows="2" placeholder="请输入备注内容（可不填）"></textarea>
				</div>
			</div>
			<div class="confirm-container" @click="_confirm">
				<mt-button size="large">确定</mt-button>
			</div>			
		</div>
	</transition>	
</template>

<script>
	
	const needArr = [{text:"多点辣"},{text:"少点辣"},
	{text:"不要辣"},{text:"不要香菜"},{text:"不要洋葱"},{text:"多点葱"},{text:"多点醋"}]
	
	needArr.map(item => item.active = false)
	
	export default {
		props: {
			show: {
				type:Boolean
			}
		},
		data() {
			return {
				needArr: needArr,
				count: 0,
				text: ''
			}
		},
		computed: {
			pageShow () {
				return this.show
			}
		},
		methods: {
			_close () {
				this.$emit("close")
			},
			_confirm () {
				let obj = {}
				obj.count = this.count
				obj.text = this.text
				obj.arr = []
				for(let i=0;i<this.needArr.length;i++) {
					if(this.needArr[i].active) {
						obj.arr.push(this.needArr[i])
					}
				}
				this.$emit('close',obj)
			},
			counted (i) {
				this.count = i
			},
			taste (i) {
				
				if (this.needArr[i].active) {
					this.needArr[i].active = false
				} else {
					this.needArr[i].active = true
				}
			}
		},
		watch: {
		},
		mounted () {
			const that = this
	        window.onresize = () => {
	            return (() => {
	                window.screenWidth = document.body.clientWidth
	                that.screenWidth = window.screenWidth
	            })()
	        }
		}
	}
</script>
