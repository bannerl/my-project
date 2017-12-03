<style lang="scss" type="text/css">
	.searchResult-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #fff;
		.header{
			display: flex;
			align-items: center;
			padding: 12px 16px 8px;
			background: #fff;
			.iconfont{
				background: #fff;
				padding: 22px 5px 22px 5px;
				font-size: 18px;
				color: #333;
			}
			input{
				margin: 0 14px 0 8px;
				padding: 10px 0 10px 10px;
				font-size: 13px;
				flex: 1;
				background: #f5f5f5;
				outline: none;
			}
			.search{
				padding: 22px 0;
				font-size: 16px;
				color: #333;
			}
		}
		.historySearch{
			position: relative;
			padding: 0 14px;
			.title{
				color: #000;
				font-size: 14px;
				font-weight: 700;
				padding: 6px 0 8px;
			}
			.iconfont{
				position: absolute;
				right: 0;
				top: 0;
				color: #666;
				padding: 14px 14px 16px;
			}
			ul{
				font-size: 0;
				.item{
					display: inline-block;
					font-size: 13px;
					padding: 8px 16px;
					margin-right: 10px;
					margin-bottom: 10px;
					background: #f5f5f5;
					color: #666;
					border-radius: 2px;
				}
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
		<div class="searchResult-wrapper">
			<div class="header">
				<span @click="$router.go(-1)" class="iconfont icon-xiangzuojiantou1"></span>
				<input v-model="searchText" placeholder="搜索商家、商品名称" />
				<span class="search" @click="search">搜索</span>
			</div>
			<div class="historySearch" v-if="historySearchs.length>0">
				<h3 class="title">历史搜索</h3>
				<span @click="deleteSearch" class="iconfont icon-lajitong1"></span>
				<ul>
					<li class="item" v-for="item in historySearchs">{{item}}</li>
				</ul>
			</div>
			<div class="historySearch" v-if="hotSearchs.length>0">
				<h3 class="title">热门搜索</h3>
				<ul>
					<li class="item" v-for="item in hotSearchs">{{item}}</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
	import { loadUrl } from '@/common/js/unit'  
	import { Toast } from 'mint-ui'
	import { setStore, getStore } from '@/common/js/savaLocal'
	import { MessageBox } from 'mint-ui'
	import {setDocumentTitle} from '@/common/js/base'
	
	const hotSearch = ['米线','面','寿司','炒饭','香锅','炸鸡','满30减15','德克士','麻辣烫']
	
	export default {
		data() {
			return {
				searchText: "",
				historySearchs:[],
				hotSearchs: hotSearch
			}
		},
		computed: {
			acountShow: function(){
				if(this.show){
					return true
				}
				return false
			},
		},
		methods: {
			close: function() {
				this.$emit('close');
			},
			deleteSearch: function () {
				MessageBox.confirm('确定删除所有历史记录吗？').then(action => {
				 	setStore('historySearch',{data:[]})
				 	this.historySearchs = []
				},function(){})
			},
			search: function() {
				if(this.searchText) {
					let arr = []
					if(getStore('historySearch') !== null) {
						let obj = JSON.parse(getStore('historySearch'))
						let _arr = obj.data
						let boo = false
						for(let i=0;i<_arr.length;i++) {
							if(_arr[i] === this.searchText) {
								boo = true
							}
						}
						if(boo) {
							arr = _arr
						} else {
							arr = _arr
							arr.push(this.searchText)
						}
					} else {
						arr.push(this.searchText)
					}
					let data = {}
					data.data = arr
					setStore('historySearch',data)
					this.historySearchs = arr
				}
				Toast({
				  message: '尚在建设中...',
				  position: 'bottom',
				  duration: 1200
				})
				//this.$router.push('/shop?keyword='+this.searchText)
			}
		},
		beforeRouteEnter (to, from, next) {
		  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)
		 
		  next(vm => {
		    if(from.name !== "shop" ) {
		    	let text = loadUrl(window.location.href).keyword
		    	//vm.$router.push('/shop?keyword='+text)
		    }else {
		    	
		    }
		  })
		},
		created: function () {
			if(getStore('historySearch') !== null) {
				let arr = JSON.parse(getStore('historySearch')).data
				this.historySearchs = arr
			}
		}
		
		
	}
</script>
