<style lang="scss" type="text/css">
	@import "../../common/style/mixin";
	.receiveAddress-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		height: 100%;
		.mint-header{
			z-index: 2;
		}
		.image{
			position: absolute;
			z-index: 0;
			left: 0;
			bottom: 52px;
			width: 100%;
		}
		.addBtn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			.mint-button{
				height: 48px;
				font-size: 16px;
				background: #fff;
				border-radius: 0;
				color: #26a2ff;
			}
			.iconfont{
				font-size: 19px;
				color: #26A2FF;
			}
		}
		.addressList-wrapper{
			position: absolute;
			top: 40px;
			left: 0;
			bottom: 40px;
			width: 100%;
			ul{
				width: 100%;
				padding-left: 14px;
				box-sizing: border-box;
				background: #fff;
			}
			.item{
				position: relative;
				display: flex;
				align-items: center;
				padding: 14px 10px 14px 0;
				box-sizing: border-box; 
				&:after{
					@include border-1px();
				}
				&:last-child:after{
					display: none;
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
				.iconfont{
					position: absolute;
					right: -9px;
					padding: 20px;
					margin-right: 8px;
					font-size: 22px;
					color: #aaa;
				}
			}
		}
	}
	.fade-enter-active,.fade-leave-active{
		transition: all .2s;
		transform: translate3d(0,0,0);
	}
	.fade-enter,.fade-leave-to{
		transform: translate3d(100%,0,0);
	}
</style>
<template>
	<transition name="fade">
		<div v-if="address" class="receiveAddress-wrapper">
			<mt-header title="收货地址">
			  <div slot="left" @click="$router.go(-1)">
			    <mt-button icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="image" v-show="!address">
				<img width="100%" src="../../common/image/bg.jpg" alt="背景图片" />
			</div>
			<div class="addressList-wrapper" ref="scrollContainer">
				<div>	
					<ul>
						<li class="item" v-for="(item,i) in address" v-longtap="{fn:removeAddress,index:i}">
							<div class="content">
								<h3 class="title">
									{{item.position}}<i class="details">{{item.details}}</i>
									<span v-show="item.type===0" class="btn-in"><i class="scale">默认</i></span>
								</h3>
								<p class="user">
									<i>{{item.name}}</i>
									<i class="sexType" v-if="item.sexType===0">先生</i>
									<i class="sexType" v-else-if="item.sexType===1">女士</i>
									<i class="sexType" v-else></i>
									<i class="phone">{{item.phone}}</i>
								</p>
							</div>
							<div @click="editAddress(item,i)" class="iconfont icon-xiugai1"></div>	
							</mt-cell>
						</li>
					</ul>
				</div>
			</div>
			<div class="addBtn" @click="addShow">
				<mt-button type="primary" size="large" class="border-1px-top">
				 	<span class="iconfont icon-jia3"></span>
				 	 新增地址
				</mt-button>
				<div></div>
			</div>
			<add-address :address="addressed" :editIndex="editIndex" v-on:close="addShow" :show="addAddressShow"></add-address>
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import { MessageBox } from 'mint-ui'
	import addAddress from './children/addAddress'
	import { setStore , getStore } from '@/common/js/savaLocal'
	const noError = 0
	
	export default {
		data() {
			return {
				address: [],
				addAddressShow: false,
				addressed: {},
				editIndex: -1
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
		beforeRouteLeave (to,from,next) {
			if(to.name === "user"&&this.addAddressShow) {
				next(false)
				this.addAddressShow = false
			} else {
				next(true)
			}
		},
		methods: {
			addShow:function() {
				let arr = []
				if(getStore('addressArr')){
					arr = JSON.parse(getStore('addressArr'))
				}
				this.address = arr 
				//在新增的时候清除编辑的值
				this.editIndex = -1
				if(!this.addAddressShow) {
					this.addressed = {
						sexType: -1,
					}
				}
				this.addAddressShow = !this.addAddressShow
				let self = this
				setTimeout(function(){
					self._initBScroll()
				},1000)
			},
			editAddress:function (data,i) {
				this.addressed = data
				this.editIndex = i
				this.addAddressShow = true
			},
			removeAddress:function (args) {
				let self =this
				MessageBox.confirm('确定要删除该地址吗?',"删除地址").then(action => {
					let arr = []
					arr = JSON.parse(getStore('addressArr'))
					arr.splice(args.index,1)
					setStore('addressArr',arr)
					self.address = arr
					setTimeout(function(){
						self._initBScroll()
					})
				},cancel=>{
				})
			},
			_initBScroll: function () {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.scrollContainer,{
						'click':true
					})
				} else {
					this.scroll.refresh()
				}
				
			}
		},
		created: function() {
			let result = []
			let self = this
			this.$nextTick( () => {
				let id = getStore('user_id')
				if(id) {
					axios.get('/api/users/address',{
						params: {
							id:id
						}
					}).then(function(res){
						if(res.data.status === noError){
							let arr = []
							if(getStore('addressArr') && getStore('addressArr') !== '[]'){
								arr = JSON.parse(getStore('addressArr'))
							} else {
								arr = res.data.data
								setStore('addressArr',arr)
							}
							self.address = arr
						}	
					})
				}
				this._initBScroll()
			})
			
		},
		components: {
			addAddress
		}
		
		
	}
</script>
