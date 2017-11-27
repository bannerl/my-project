<template>
	<div class="loginPage">
		<!--验证码登录-->
		<transition name="fadeCode">
			<div v-show="loginWay">
				<mt-header title="登录">
					<router-link to="/" slot="left">
					    <mt-button icon="back">返回</mt-button>
					</router-link>
					<router-link to="/login" slot="right">
					    <mt-button @click="changeLogin">密码登录</mt-button>
					</router-link>
				</mt-header>
				<div class="cc-list-wrapper">
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="phone">
						<mt-button @click="sendCheckCode" :disabled="msgDisabled" size="small" :type="type">{{phoneMsg}}</mt-button>
					</mt-field>
					<mt-field label="验证码" placeholder="请输入验证码" type="passwords" v-model="code"></mt-field>
				</div>
				<div class="login">
					<mt-button @click="loginCode" class="login" type="primary" size="large">登录</mt-button>
				</div>
			</div>	
		</transition>
		<!--密码登录-->
		<transition name="fadePasswords">
			<div v-show="!loginWay" class="loginPassWords">
				<mt-header title="登录">
					<router-link to="/" slot="left">
					    <mt-button icon="back">返回</mt-button>
					</router-link>
					<router-link to="/login" slot="right">
					    <mt-button @click="changeLogin">验证码登录</mt-button>
					</router-link>
				</mt-header>
				<div class="cc-list-wrapper">
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="phone">
					</mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="passwords"></mt-field>
				</div>
				<div class="login">
					<mt-button @click="loginPasswords" class="login" type="primary" size="large">登录</mt-button>
				</div>
			</div>	
		</transition>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import axios from 'axios'
	
	const noError = 0
	
	export default{
		name: 'login',
		data(){
			return{
				phone: '15756765432',
				passwords: '12345678',
				code: '7656',
				phoneMsg: "发送验证码",
				type:'primary', //错误提示
				loginWay: true //登录方式
			}
		},
		computed: {
			msgDisabled: function(){
				if(/\D/g.test(this.phone)){
					this.phoneMsg = "错误手机号",
					this.type = 'danger'
					return false
				}else if(/^1\d{10}$/gi.test(this.phone)){
					this.phoneMsg = "发送验证码"
					this.type = 'primary'
					return false
				}else{
					this.phoneMsg = "发送验证码"
					this.type = 'primary'
					return true
				}
				
			}
		},
		methods: {
			...mapMutations([
                'RECORD_USERINFO'
            ]),
			sendCheckCode: function(){
				if(!this.msgDisabled){
					this.passwords = 1234
				}
			},
			changeLogin: function(){
				if(this.loginWay){
					this.loginWay = false
				}else{
					this.loginWay = true
				}
				
			},
			loadInfo: function(){
				let self = this
				axios.get('/api/user').then(function(res){
			  		if(res.data.status === noError){
			  			self.RECORD_USERINFO(res.data.data);
			  		}	
		  		});
			},
			loginCode: function(){
				let self = this
				axios.get('/api/users', {
			  	})
			  	.then(function (response) {
			  		if(response.data.status === noError){
			  			let id = response.data.data[0].id
			  			self.loadInfo()
			  			self.$router.push({name: 'user',params:{userId:id}})
			  		}
			  		
			 	 })
			  	.catch(function (response) {
			    	console.log(response)
			  	})
			},
			loginPasswords: function(){
				let self = this
				axios.get('/api/users', {
			  })
			  .then(function (response) {
					if(response.data.status === noError){
			  			let id = response.data.data[0].id
			  			self.$router.push({name: 'user',params:{userId:id}});
			  			self.$emit('userInfo');
			  		}
			  })
			  .catch(function (response) {
			        console.log(response);
			  });
			}
		}
	}
</script>

<style lang="scss" type="text/css">
	.login{
		display: block;
		margin-top: 16px;
		padding: 0 12px;
	}
	.fadeCode-enter-active {
	  transition: all .5s;
	  transform: translate3d(0,0,0);
	}
	.fadeCode-enter{
	  transform: translate3d(-100%,0,0);
	}
	.fadeCode-leave-active {
	  transition: all .5s;
	  transform: translate3d(-100%,0,0);
	}
	.fadeCode-leave{
	  transform: translate3d(0,0,0);
	}
	.fadePasswords-enter-active {
	  transition: all .5s;
	  transform: translate3d(0,-100%,0);
	}
	.fadePasswords-enter{
	  transform: translate3d(100%,-100%,0);
	}
	.fadePasswords-leave{
	  transform: translate3d(0%,-100%,0);
	}
	.fadePasswords-leave-active ,.fadePasswords-leave-to{
	  transition: all .5s;
	  transform: translate3d(100%,-100%,0);
	}
</style>