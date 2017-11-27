<template>
	<div v-if="seller" class="header">
		<div class="container">
			<div class="seller-wrapper">
				<div class="avatar">
					<img :src="seller.avatar" />
				</div>
				<div class="seller-details">
					<h3 class="title">
						<span class="icon"></span>
						{{seller.name}}
					</h3>
					<div class="description">
						<div>{{seller.description}}</div>/
						<div>{{seller.deliveryTime}}</div>分钟送达
					</div>
					<div class="supports" @click="open">
						<div class="icon"></div>
						<div v-if="seller.supports">{{seller.supports[0].description}}</div>
					</div>
				</div>	
			</div>
			<div class="notice-wrapper">
				
			</div>
			<div class="bg-image">
				<img :src="seller.avatar" />
			</div>
		</div>
		<div class="mask-wrapper" v-show="mask">
			<div class="title">
				<h3>{{seller.name}}</h3>
			</div>
			<div class="star-wrapper">
				<star :score="seller.serviceScore-0" size="48"></star>
			</div>
			<div class="line-wrapper">
				<line-title title="优惠信息"></line-title>
			</div>
			<div class="supports-wrapper">
				<supports-menu :seller="seller"></supports-menu>
			</div>
			<div class="line-wrapper">
				<line-title title="商家公告"></line-title>
			</div>
			<div class="bulletin-wrapper">
				<div>{{seller.bulletin}}</div>
			</div>
			<div class="close-wrapper">
				<span class="iconfont" @click="close">&#xe60e;</span>
			</div>
		</div>
	</div>	
</template>

<script>
	import star from 'components/star/star'
	import lineTitle from 'components/linetitle/linetitle'
	import supportsMenu from 'components/supports/supports'
	
	export default {
	  	name: 'goodsHeader',
	  	props:['seller'],
	  	data () {
		    return {
		    	mask:false
		    }
	  	},
	  	methods:{
	  		close:function(){
	  			this.mask = false
	  		},
	  		open:function(){
	  			this.mask = true
	  		}
	  	},
	  	components:{
	  		'star': star,
	  		'line-title':lineTitle,
	  		'supports-menu': supportsMenu
	  	}
	}
</script>

<style lang="scss" scoped="scoped" type="text/css">
	@import '../../common/style/icon.scss';
	.header{
		.container{
			position: relative;
			overflow: hidden;
		}
		.seller-wrapper{
			padding:22px 12px 0 22px;
			font-size:0;
			background:rgba(0,0,0,.7);
			overflow:hidden;
			.avatar{
				display:inline-block;
				margin:0 14px 20px 0;
				vertical-align: top;
				img{
					width:80px;
				}
			}
			.seller-details{
				display:inline-block;
				.title{
					padding:0 0 10px;
					font-size:16px;
					font-weight:700;
					color:#fff;
				}
				.description{
					padding:8px 0;
					font-size:12px;
					color:#fff;
					div{
						display:inline-block;
					}
				}
				.supports{
					padding:8px 0;
					font-size:12px;
					color:#fff;
				}
			}
		}
		.bg-image{
			position: absolute;
			top:-40px;left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			img{
				width: 100%;
			}
		}
		.mask-wrapper{
			position: absolute;
			top: 0;left: 0;
			width: 100%;
			height: 100%;
			padding-bottom: 60px;
			box-sizing: border-box;
			z-index: 106;
			background: rgba(0,0,0,.7);
			.title{
				padding: 60px 0 15px;
				h3{
					font-size: 18px;
					font-weight: 700;
					color: #fff;
					text-align: center;
				}
			}
		}
		.star-wrapper{
			padding: 5px;
			text-align: center;
		}
		.line-wrapper{
			padding: 20px 20px;
		}
		.supports-wrapper{
			padding: 10px 20px;
		}
		.bulletin-wrapper{
			padding: 2px 20px;
			>div{
				color: #fff;
				font-size: 14px;
				line-height: 20px;
			}
		}
		.close-wrapper{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
			.iconfont{
				display: inline-block;
				padding: 20px 20px;
				margin: auto;
				font-size: 20px;
				color: #ddd;
			}
		}
	}
</style>