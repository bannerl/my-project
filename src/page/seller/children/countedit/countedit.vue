<template>
	<div class="count-edit-container">
		<div class="decrease" @click.stop.prevent="decreaseCount">
			<span  v-if="this.food.count" class="iconfont" v-show="this.food.count>0">&#xe616;</span>
		</div>
		<div class="count" >
			<span v-if="this.food.count" v-show="this.food.count>0">{{this.food.count}}</span>
		</div>
		<div class="add" @click.stop.prevent="addCount">
			<span class="iconfont">&#xe60d;</span>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	
	export default {
		name: 'countEdit',
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
			}
		},
		methods:{
			addCount:function(e){
				if(!e._constructed){
					return
				}
				if(!this.food.count) {
					Vue.set(this.food,"count",1)
				}else{
					this.food.count+=1
				}
			},
			decreaseCount:function(e){
				if(!e._constructed){
					return
				}
				this.food.count--
			}
		},
		computed:{
			
		}
	}
</script>

<style lang="scss" type="text/css" scoped="scoped">
	.count-edit-container{
		width: 110px;
		font-size: 0;
		text-align: right;
		.count{
			display: inline-block;
			width: 12px;
			vertical-align:top;
			text-align:center;
			line-height:24px;
			height:24px;
			span{
				display: inline-block;
				font-size: 16px;
				vertical-align: middle;
				color: #333;
			}
		}
		.add,.decrease{
			display: inline-block;
			line-height: 24px;
			height: 24px;
			width: 24px;
			padding: 0 6px;
			color: #26a2ff;
			vertical-align: text-bottom;
			.iconfont{
				font-size: 24px;
			}
		}
		.decrease{
			.iconfont{
				font-size: 22px;
			}
		}
	}
</style>