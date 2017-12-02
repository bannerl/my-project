<style lang="scss" type="text/css">
	.addAddress-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		height: 100%;
		min-height: 600px;
		z-index: 10;
		.add-wrapper{
			margin-top: 12px;
			.sexType{
				padding-left: 105px;
				.mint-field-core{
					display: none;
				}
				.mint-button{
					background: #fff;
					height: 26px;
					padding: 0 16px;
					box-shadow: 0 0 0;
					&:not(.is-disabled):active::after {
						display: none;
					}
					&:before{
						border-radius: 8px;
					}
					&.on{
						color: #26A2FF;
						&:before{
							border-color: #26A2FF;
						}
					}
				}
			}
		}
		.confirm-wrapper{
			padding: 16px 10px;
			background: #f5f5f5;
			.mint-button{
				background: rgba(29,220,100,.8);
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
		<div v-show="pageShow" class="addAddress-wrapper">
			<mt-header title="新增地址">
			  <div slot="left">
			    <mt-button @click="close" icon="back">返回</mt-button>
			  </div>
			</mt-header>
			<div class="add-wrapper">
				<mt-field v-model="Info.name" label="联系人" placeholder="姓名"></mt-field>
				<mt-field label="" class="sexType">
					<mt-button @click="selectSex(0)" :class="{on:Info.sexType===0}" size="small" class="block-line">先生</mt-button>
					<mt-button @click="selectSex(1)" :class="{on:Info.sexType===1}" size="small" class="block-line">女士</mt-button>
				</mt-field>
				<mt-field type="number" v-model="Info.phone" label="电话" placeholder="手机号码"></mt-field>
				<mt-field v-model="Info.position" label="地址" placeholder="填写收货地址"></mt-field>
				<mt-field v-model="Info.details" label="门牌号" placeholder="例: 8号楼304室"></mt-field>
				<mt-cell title="是否设置为默认收货地址">
				  <mt-switch v-model="defaultAddress"></mt-switch>
				</mt-cell>
			</div>
			<div @click="savaAddress" class="confirm-wrapper">
				<mt-button type="primary" size="large">确定</mt-button>	
			</div>
		</div>
	</transition>
</template>

<script>
	import axios from 'axios'
	import {setStore ,getStore} from '../../../common/js/savaLocal'
	import { Toast } from 'mint-ui'
	
	export default {
		props: {
			show: {
				type: Boolean
			},
			address: {
				type: Object,
				default: function() {
					return {
						name: ' ',
						phone: ' ',
						sexType: -1,
						position: ' ',
						details: ' '
					}
				}
			},
			editIndex: {
				type:Number
			}
		},
		data() {
			return {
				Info: {
					sexType: -1,
				},
				defaultAddress:false
			}
		},
		beforeUpdate: function() {
		},	
		watch: {
			address: function(){
				this.Info = this.address
			},
			Info: {
				handler: function(val,oldval) {
					if(val.phone !== undefined && val.phone.length>11){
						Toast({
						  message: '手机号输入不正确',
						  position: 'bottom',
						  duration: 1200
						})
					}
				},
				deep: true
			}
		},
		computed: {
			pageShow: function(){
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
			selectSex: function(number) {
				this.Info.sexType = number
			},
			savaAddress: function() {
				if(this.Info.name&&this.Info.phone.length===11&&this.Info.position
					&&this.Info.details) {
					if(this.defaultAddress) {
						this.Info.type = 0
					} 
					let info = {
						name: this.Info.name, phone: this.Info.phone,
						position: this.Info.position, details: this.Info.details,
						sexType: this.Info.sexType, type: this.Info.type
					}
					let _addressArr = []
					if(getStore('addressArr')) {
						_addressArr = getStore('addressArr')
						_addressArr = JSON.parse(_addressArr)
						
						if(this.editIndex>=0) {
							_addressArr.splice(this.editIndex,1,info)
						} else {
							_addressArr.push(info)
						}
					} else {
						_addressArr.push(info)
					}
					setStore('addressArr',_addressArr)
					let id = getStore('user_id')
					//地址存到数据库
//					axios.post('/api/users', {
//					    userId: id,
//					    address: _addressArr
//				  	})
//				  	.then(function (response) {
//				    	console.log(response);
//				  	})
//				  	.catch(function (error) {
//				    	console.log(error);
//				  	})
					this.$emit('close')
				}
			}
		}
		
		
	}
</script>
