<style lang="scss" type="text/css" scoped="scoped">
	.discount-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 600px;
		background: #f5f5f5;
		.panel-wrapper{
			.panel{
				position: relative;
				display: flex;
				margin: 10px 10px;
				align-items: flex-start;
				padding: 18px 0;
				background: #fff;
				box-shadow: 0 2px 3px #aaa;
				overflow:hidden; 
				&:after{
					position: absolute;
					top:-10px;
					left: -25px;
					width: 60px;
					height: 30px;
					font-size: 10px;
					transform: rotate(-45deg);
					content: "新";
					text-align: center;
					line-height: 46px;
					background: #1df16a;
					color: #fff;
				}
				.left{
					width: 100px;
					text-align: center;
					margin-top: 10px;
					.title{
						margin-bottom: 6px;
						font-size: 22px;
						font-weight: 700;
						color: #ff4683;
						.text{
							font-size: 11px;
							color: #ff4683;
						}
					}
					.text{
						font-size: 10px;
						color: #666;
					}
				}
				.middle{
					flex: 1;
					.title{
						font-size: 14px;
						font-weight: 700;
					}
					.time{
						display: block;
						margin-top: 8px;
						font-size: 12px;
					}
					.text{
						font-size: 12px;
					}
				}
				.right{
					width: 78px;
					text-align: center;
					color: #ff4683;
					.limitTime{
						margin: 12px 0 4px;
						font-size: 10px;
					}
					.nowUse{
						font-size: 10px;
						color: #ff4683;
						padding: 2px 4px;
						border: 1px solid #ff4683;
						border-radius: 8px;
					}
				}
			}
		}
		.system-info{
			margin: 26px 0;
			font-size: 13px;
			color: #777;
			text-align: center;
		}
		.history-discount{
			margin: 20px 0;
			text-align: center;
			font-size: 10px;
			color: #888;
			.history{
				position: relative;
				margin-right: 10px;
				&:after{
					position: absolute;
					height: 8px;
					top: 1px;
					right: -7px;
					border-right: 1px solid #ddd;
					content: '';
				}
			}
		}
	}	
	.fade-enter-active,.fade-leave-active{
		transition: all .2s linear;
		transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="fade" v-if="userInfo">
		<div class="discount-wrapper">
			<mt-header title="我的优惠">
			  <div slot="left">
			    <mt-button @click="close" icon=" iconfont icon-guanbi"></mt-button>
			  </div>
			</mt-header>
			<div class="panel-wrapper">
				<div class="panel" v-for="(discount,$i) in userInfo.discounts">
					<div class="left">
						<h3 class="title">
							<span class="text">￥</span>{{discount.price}}
						</h3>
						<div class="text">
							满{{discount.maxPrice}}元可用
						</div>
					</div>
					<div class="middle">
						<h3 v-if="discount.type===0" class="title">拼手气红包</h3>
						<h3 v-if="discount.type===1" class="title">普通红包</h3>
						<span class="time">{{format(discount.limitTime)}}到期</span>
						<span class="text">
							限收货手机号为 {{replaceStr(discount.limitPhone)}}
						</span>
					</div>
					<div class="right">
						<div class="limitTime">剩{{purplusDay(discount.limitTime)}}日</div>
						<router-link class="nowUse" to="/">立即使用</router-link>
					</div>
				</div>
				<div class="system-info">没有更多了~</div>
				<div class="history-discount">
					<span class="history">查看历史红包</span>
					<span class="text">红包说明</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {getStore} from '@/common/js/savaLocal'
	import axios from 'axios'
	import {formatTime} from '@/common/js/base'
	
	const noError = 0
	
	export default {
		data() {
			return {
				userInfo:{},
			}
		},
		computed: {
		},
		methods: {
			_initData: function(){
				let self = this
				let id = getStore('user_id')
				axios.get('/api/user',{id:id}).then(function(res){
			  		if(res.data.status === noError){
			  			self.userInfo=res.data.data;
			  		}	
		  		});
			},
			close: function(){
				this.$router.go(-1)
			},
			format: function(time){
				let times = new Date((time - 0))
				return formatTime(times,'yyyy-MM-dd')
			},
			nowTime: function(i){
				let date = new Date() - 0 + (Math.random()*10)*50000000*(i+1)
				date = new Date(date)
				return formatTime(date,'yyyy-MM-dd')
			},
			purplusDay: function(time){
				let date = time - (new Date())
				return Math.floor(date/(1000*60*60*24))
			},
			replaceStr:function(str){
				return str.replace('\n|\r\n','<br/>')
			}
		},
		created: function(){
			this.$nextTick( () => {
				this._initData()
			})
		}
		
	}
</script>
