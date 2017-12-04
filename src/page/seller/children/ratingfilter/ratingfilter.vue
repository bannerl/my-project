<template>
	<div class="filter-content">
		<div class="ratings">
			<div @click="select(2,$event)" class="pub positive" :class="{active:status===2}">{{text.all}}<span class="count">{{count.all}}</span></div>
			<div @click="select(0,$event)" class="pub positive" :class="{active:status===0}">{{text.positive}}<span class="count">{{count.positive}}</span></div>
			<div @click="select(1,$event)" class="pub negative" :class="{active:status===1}">{{text.negative}}<span class="count">{{count.negative}}</span></div>
		</div>
		<div @click="onlyContentRatings" class="onlyContent" :class="{active:onlyContent}">
			<span class="iconfont">&#xe612;</span><span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const ALL = 2
	const POSITIVE = 0
	const NEGATIVE = 1
	
	export default {
		name:'ratingfilter',
		props:{
			text:{
				type:Object,
				default:function(){
					return {
						all:"全部",
						positive:"好评",
						negative:"差评"
					}
				}	
			},
			count:{
				type:Object,
				default:function(){
					return {
						all:0,
						positive:0,
						negative:0
					}
				}
			},
		},
		data(){
			return {
				status:ALL,
				onlyContent:true
			}
		},
		computed:{
		},
		methods:{
			select:function (i,e){
				if(!e._constructed){
					return
				}
				this.status = i
				this.$emit('ratingStatus',i)
			},
			onlyContentRatings:function(e){
				if(!e._constructed){
					return
				}
				this.onlyContent = !this.onlyContent
				this.$emit('onlyContent',this.onlyContent)
			}
			
		}
	}
</script>

<style lang="scss" type="text/css" scoped="scoped">
	@import '../../../../common/style/mixin';
	.filter-content{
		width:100%;
		padding:12px 18px;
		box-sizing:border-box;
		.ratings{
			position:relative;
			padding-bottom:18px;
			font-size:0;
			&:after{
				@include border-1px();
			}
			.pub{
				display: inline-block;
				margin-right: 8px;
				padding: 7px 12px;
				font-size: 12px;
				line-height: 16px;
				border-radius: 2px;
				color: rgb(77,85,93);
			}
			.positive{
				background:rgba(0,150,190,.1);
				&.active{
					background:rgba(38,162,255,1);
					color: #fff;
				}
			}
			.negative{
				background:#f5f5f5;
				color: #999;
				&.active{
					background:rgba(77,85,93,.2);
					color: #fff;
				}
			}
		}
		.onlyContent{
			padding: 12px 0 0;
			.iconfont{
				font-size: 24px;
				line-height: 24px;
				vertical-align: top;
				color: #ddd;
			}
			.text{
				margin-left: 4px;
				font-size: 14px;
				line-height: 24px;
				color: rgb(147,153,159);
				vertical-align: top;
			}
			&.active{
				.iconfont{
					color: rgba(38,162,255,1);
				}
			}
		}
	}
</style>