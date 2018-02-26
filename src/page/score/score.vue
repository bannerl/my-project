<style lang="scss" type="text/css">
	.score-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: #f5f5f5;
		height: 600px;
		.score-content{
			.score{
				position: relative;
				padding: 32px 0 50px;
				text-align: center;
				background: -webkit-linear-gradient(top,#ccc,#f5f5f5);
				.iconfont{
					color: #e88418;
					font-weight: 700;
				}
				.count{
					font-size: 46px;
					font-weight: 700;
					color: #e88418;
				}
				.store{
					position: absolute;
					width: 100%;
					bottom: 18px;
					left: 0;
					font-size: 14px;
					text-align: center;
					color: rgb(38,162,255);
				}
			}
		}
		.mint-cell-value{
			position: relative;
			display: block;
			width: 40px;
			text-align: right; 
			&:after{
				content: "\e630";
				position: absolute;
				top: 4px;
				right: 0;
				font-family: iconfont !important;
			    font-size: 10px;
			    font-weight: 700;
			    font-style: normal;
			    -webkit-font-smoothing: antialiased;
			    -moz-osx-font-smoothing: grayscale;
			    vertical-align: -1px;
			    -webkit-text-stroke-width: 0 !important;
			}
			span{
				position: relative;
				display: inline-block;
				margin-right: 12px;
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
		<div class="score-wrapper">
			<mt-header title="我的积分">
			  <div slot="left">
			    <mt-button @click="close" icon=" iconfont icon-guanbi"></mt-button>
			  </div>
			  <div slot="right">
			    <mt-button>积分解读</mt-button>
			  </div>
			</mt-header>
			<div class="score-content">
				<div class="score">
					<i class="iconfont icon-jifen"></i>
					<span class="count">{{userInfo.score}}</span>
					<router-link to="/" class="store">积分商城</router-link>
				</div>
				<div class="panel-wrapper">
					<mt-navbar v-model="selected">
					  <mt-tab-item id="1">全部</mt-tab-item>
					  <mt-tab-item id="2">收入</mt-tab-item>
					  <mt-tab-item id="3">支出</mt-tab-item>
					</mt-navbar>
					
					<mt-tab-container v-model="selected">
					  <mt-tab-container-item id="1">
					  	<mt-cell v-for="(scoreDetail,$i) in userInfo.scoreDetails"
					  		 :title="scoreDetail.description" 
					  		 :label="format(scoreDetail.time)" 
					  		 :value="scoreType(scoreDetail.type)
					  		 +scoreDetail.count" key="$i">
					  	</mt-cell>
					  </mt-tab-container-item>	
					  <mt-tab-container-item id="2">
					    <mt-cell v-show="scoreDetail.type===0" v-for="(scoreDetail,$i) in userInfo.scoreDetails"
					  		 :title="scoreDetail.description" 
					  		 :label="format(scoreDetail.time)" 
					  		 :value="scoreType(scoreDetail.type)+scoreDetail.count" key="$i">
					  	</mt-cell>
					  </mt-tab-container-item>
					   <mt-tab-container-item id="3">
					    <mt-cell v-show="scoreDetail.type===1" v-for="(scoreDetail,$i) in userInfo.scoreDetails"
					  		 :title="scoreDetail.description" 
					  		 :label="format(scoreDetail.time)" 
					  		 :value="scoreType(scoreDetail.type)+scoreDetail.count" key="$i">
					  	</mt-cell>
					  </mt-tab-container-item>
					</mt-tab-container>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import {getStore} from '@/common/js/savaLocal'
	import {formatTime} from '@/common/js/base'
	import {userInfo} from '../../service/getData'
	const noError = 0

	export default {
		data() {
			return {
				userInfo:{},
				selected:'1'
			}
		},
		computed: {
		},
		methods: {
			async _initData(){
				let self = this
				let id = getStore('user_id')
				let res = await userInfo(id);
		  		if(res.data.status === noError){
		  			self.userInfo=res.data.data;
		  		}	
			},
			close: function(){
				this.$router.go(-1)
			},
			format: function(time){
				let times = new Date((time - 0))
				return formatTime(times,'yyyy-MM-dd hh:mm')
			},
			scoreType: function(type){
				if(type === 0){
					return '+'
				}else{
					return '-'
				}
			}
		},
		created: function(){
			this.$nextTick( () => {
				this._initData()
			})
		}
		
	}
</script>
