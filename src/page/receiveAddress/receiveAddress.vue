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
				background: #fff;
				border-radius: 0;
				color: #333;
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
		<div v-if="address" class="receiveAddress-wrapper">
			<mt-header title="收货地址">
			  <div slot="left">
			    <mt-button @click="closePage" icon="back">返回</mt-button>
			  </div>
			   <div slot="right">
			    <mt-button>编辑</mt-button>
			  </div>
			</mt-header>
			
			<div class="image">
				<img width="100%" src="../../common/image/bg.jpg" alt="背景图片" />
				{{address[0]}}
			</div>
			<div class="addressList-wrapper">
				<ul>
					<li class="item" v-for="item in address">
							<h3 class="title">{{item.address}}</h3>
							<p>
								<i>{{item.name}}</i>
								<i class="sexType" v-if="item.sexType===0">先生</i>
								<i class="sexType" v-else-if="item.sexType===1">女士</i>
								<i class="sexType" v-else></i>
								<i class="phone">{{item.phone}}</i>
							</p>
						</mt-cell>
					</li>
				</ul>
			</div>
			<div class="addBtn" @click="addShow">
				<mt-button type="primary" size="large" class="border-1px-top">
				 	<span class="iconfont icon-dayuhao3"></span>
				 	 添加
				</mt-button>
				<div></div>
			</div>
			<add-address v-on:close="addShow" :show="addAddressShow"></add-address>
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import addAddress from './children/addAddress'
	import {getStore} from '@/common/js/savaLocal'
	import {getAddress} from '../../service/getData'
	const noError = 0
	
	export default {
		props: {
			show: {
				type: Boolean
			}
		},
		data() {
			return {
				address: [],
				addAddressShow: false
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
			closePage:function(){
				
			},
			addShow:function() {
				this.addAddressShow = !this.addAddressShow
			},
			
		},
		created: function() {
			let result = []
			let self = this
			this.$nextTick( () => {
				let id = getStore('user_id')
				if(typeof id !== undefined) {
					axios.get('/api/users/address',{
						params: {
							id:id
						}
					}).then(function(res){
						if(res.data.status === noError){
							self.address = res.data.data
						}	
					})
				}
			})
			
		},
		components: {
			addAddress
		}
		
		
	}
</script>
