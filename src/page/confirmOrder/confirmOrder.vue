<style lang="scss" type="text/css">
	@import "../../common/style/mixin";
	.confirmOrder-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		.address-container{
			background: #fff;
			.item{
				position: relative;
				display: flex;
				align-items: center;
				padding: 14px 10px 14px 14px;
				box-sizing: border-box; 
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=) 0 100% repeat-x;
			    background-size: 28px 3px;
				&:after{
					@include border-1px();
				}
				&:last-child:after{
					display: none;
				}
				.iconfont:first-child{
					width: 26px;
					font-size: 24px;
					color: #26A2FF;
				}
				.content{
					flex: 1;
					.title{
						font-weight: 700;
						padding: 6px 0;
						font-size: 16px;
						.details{
							margin-left: 6px;
							font-style: normal;
							font-weight: 700;
							font-size: 16px;
						}
						.btn-in{
							display: inline-block;
							margin-left: 2px;
							margin-top: 1px;
							background: #26a2ff;
						    color: #fff;
						    height: 16px;
						    width: 34px;
						    text-align: center;
						    font-size: 10px;
						    overflow: hidden;
						    vertical-align: text-top;
						    border: 1px solid #26a2ff;
						    box-sizing: border-box;
						    .scale{
						    	display: inline-block;
							    font-size: 20px;
							    text-align: center;
							    width: 68px;
							    height: 32px;
							    line-height: 32px;
							    transform: scale(0.5) translate3d(-50%, -50%, 0);
							    margin: -1px -1px 0 0;
							    font-style: normal;
						    }
						}
					}
					.user{
						padding-top: 3px;
						font-size: 13px;
						color: #333;
						i{
							font-style: normal;
							&.phone{
								margin-left: 6px;
							}
						}
					}
				}
				.content+.iconfont{
					position: absolute;
					right: -9px;
					padding: 16px;
					margin-right: 8px;
					font-size: 22px;
					color: #aaa;
				}
			}
		}
		.deliveryTime-container{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 12px;
			padding: 12px 14px;
			border-left: 3px solid #26A2FF;
			background: #fff;
			.title{
				height: 100%;
				font-size: 16px;
				font-weight: 700;
			}
			.deliveryTime{
				text-align: right;
				.need{
					padding: 12px 0;
					.text{
						margin-right: 2px;
						color: #26A2FF;
					}
					.time{
						position: relative;
						color: #26A2FF;
						padding-left: 8px;
						&:before{
							position: absolute;
							left: 0;top: 2px;
							height: 14px;
							border-left: 1px solid #26A2FF;
							content: '';
						}
						i{
							font-style: normal;		
						}
					}
				}
				.label{
					.btn-out{
						display: inline-block;
						font-size: 10px;
						border-radius: 2px;
						vertical-align: middle;
						color: #fff;
						height: 14px;
						width: 44px;
						background: #ddd;
						box-sizing: border-box;
						text-align: left;
					}
					.scale{
						display: block;
						font-size: 20px;
						width: 88px;
						height: 28px;
						line-height: 28px;
						text-align: center;
						font-style: normal;
						padding: 0;
						box-sizing: border-box;
						background:rgba(38,162,255,1);
						border-radius: 4px;
						transform: scale(.5) translate3d(-50%,-50%,0);
					}
				}
			}
		}
	}
	.confirmOrder-enter-active,.confirmOrder-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.confirmOrder-enter,.confirmOrder-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="confirmOrder">
		<div class="confirmOrder-wrapper">
			<mt-header title="确认订单">
			  <div slot="left">
			    <mt-button @click="$router.go(-1)" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="address-container">
				<div class="item" v-if="defaultAddress">
					<div class="iconfont icon-dizhi1"></div>
					<div class="content">
						<h3 class="title">
							{{defaultAddress.position}}<i class="details">{{defaultAddress.details}}</i>
							<span v-show="defaultAddress.type===0" class="btn-in"><i class="scale">默认</i></span>
						</h3>
						<p class="user">
							<i>{{defaultAddress.name}}</i>
							<i class="sexType" v-if="defaultAddress.sexType===0">先生</i>
							<i class="sexType" v-else-if="defaultAddress.sexType===1">女士</i>
							<i class="sexType" v-else></i>
							<i class="phone">{{defaultAddress.phone}}</i>
						</p>
					</div>
					<div class="iconfont icon-dayuhao3"></div>
				</div>
			</div>
			<div class="deliveryTime-container">
				<div class="title">送达时间</div>
				<div class="deliveryTime">
					<div class="need">
						<span class="text">尽快送达</span>
						<span class="time">
							预计：<i class="">18:20</i>
						</span>
					</div>
					<div class="label">
						<span class="btn-out">
							<i class="scale">蜂鸟专送</i>
						</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { getStore } from '@/common/js/savaLocal'
	
	export default {
		data() {
			return {
				defaultAddress: []
			}
		},
		methods: {
			close: function(){
				this.$emit('close');
			},
		},
		created: function () {
			let address = []
			if(getStore("addressArr")){
				let arr = JSON.parse(getStore("addressArr"))
				if (arr.length === 0) {
					address = null
				} else if(arr.length === 1) {
					address = arr
				} else {
					for(let i=0;i<arr.length;i++) {
						if(arr[i].type === 0) {
							address = arr[i]
						}
					}
				}
			} else {
				address = null
			}
			this.defaultAddress = address
		}
		
		
	}
</script>
