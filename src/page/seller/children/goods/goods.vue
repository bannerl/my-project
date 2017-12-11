<template>
	<div class="goods-content">
	  	<div class="goods-container">
			<div class="item-left" ref='itemleft'>
				<ul>
					<li v-if="goods" v-for="(item,$i) in goods" @click="selectPosition($i)" :class="{highLight:highLigh($i)}">
						<div class="cell">
							<span class="icon"></span>
							<h3>{{item.name}}</h3>
						</div>
					</li>
				</ul>
			</div>
			<div class="item-right" ref="itemright">
				<div class="itemright-wrapper">
					<ul v-if="goods" v-for='item in goods' ref="foodsList">
						<h3 class="title border-1px">{{item.name}}</h3>
						<li @click="openFoodPage(food)"  v-for="food in item.foods">
							<div class="avatar">
								<img width="66" height="66" :src="food.image" />
							</div>
							<div class="food-container">
								<h3>{{food.name}}</h3>
								<div class="description">
									<span>{{food.description}}</span>
								</div>
								<div class="description">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="nowPrice">
										￥{{food.price}}
									</span>
									<span v-if="food.oldPrice" class="oldPrice">
										￥{{food.oldPrice}}
									</span>
								</div>
							</div>
							<div class="count-wrapper">
								<count-edit :food="food"></count-edit>
							</div>
						</li>
					</ul>
				</div>
			</div>
	  	</div>
	  	<cart-foods v-if="this.seller&&this.goods" :foods="foods" :sellerName="seller.name" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart-foods>
	  	<div class="food-wrapper">
	  		<food-page ref='foodAll' :food="clickFood"></food-page>
	  	</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import axios from 'axios'
	import {getStore} from '@/common/js/savaLocal'
	import cartFoods from '../cartfoods/cartfoods'
	import countEdit from '../countedit/countedit'
	import foodPage from '../foodpage/foodpage'
	
	const noError = 0;
	
	export default {
	  name: 'goods',
	  props:{
	  	seller:{
	  		type:Object,
	  		default:function(){
	  			return {}
	  		}
	  	}
	  },
	  data () {
	    return {
	    	goods:this.goods,
	    	foodsArr:[],
	    	scrollY:0,
	    	selectFoods:[],
	    	menuSelect:{},
	    	clickFood:{},
	    }
	  },
	  created(){
	  	axios.get('/api/goods').then(response => {
		    response = response.data
		    if(response.status === noError){
		    	let _goods = response.data
		    	let foods = []
		    	_goods.forEach((item)=>{
		  			item.foods.forEach((food)=>{
		  				foods.push(food)
		  			})
		  		})
		    	let _d = []
		    	if(getStore('shopCount')){
		    		let shopCount = JSON.parse(getStore('shopCount'))
		    		let i = 0
		    		if(shopCount.length === foods.length) {
		    			_goods.forEach((item)=>{
				  			item.foods.forEach((food)=>{
				  				food.count = shopCount[i]
				  				i++
				  			})
				  		})
		    		}
		    		this.goods = _goods
		    	} else {
		    		this.goods = _goods
		    	}
		    	this.goods = _goods
		    	this.$nextTick( ( ) =>{
					this._initScroll();
					this._initFoods();
		    	});
		    }
		});
	  },
	  components:{
	  	cartFoods,
	  	countEdit,
	  	foodPage
	  },
	  methods:{
	  	_initScroll:function(){
	  		let height = 0
	  		for(let i=0;i<this.$refs.foodsList.length;i++){
	  			this.selectFoods.push(height)
	  			height = height+this.$refs.foodsList[i].clientHeight
	  		}
	  		
	  		new BScroll(this.$refs.itemleft,{
	  			click:true
	  		});
			this.menuSelect = new BScroll(this.$refs.itemright,{
	  			click:true,
	  			probeType:3
	  		});
	  		var self = this
	  		this.menuSelect.on('scroll',function(pos){
	  			self.scrollY = -Math.round(pos.y);
	  		});
	  	},
	  	_initFoods:function(){
	  		var self = this;
	  		this.goods.forEach((item)=>{
	  			item.foods.forEach((food)=>{
	  				self.foodsArr.push(food)
	  			});
	  		});
	  	},
	  	highLigh:function(i){
	  		let len = this.selectFoods.length
	  		if(i === (len - 1)){
	  			if(this.selectFoods[i]<=this.scrollY){
	  				return true
	  			}else{
	  				return false
	  			}
	  		}else{
	  			if(this.selectFoods[i]<=this.scrollY&&this.scrollY<this.selectFoods[i+1]){
		  			return true
		  		}else if(this.scrollY<0&& i === 0){
		  			return true
		  		}else{
		  			return false
		  		}
	  		}
	  	},
	  	selectPosition:function(i){
	  		this.menuSelect.scrollTo(0,-this.selectFoods[i],200);
	  		this.scrollY = this.selectFoods[i]
	  		this.highLigh(i)
	  	},
	  	openFoodPage:function(food){
	  		this.clickFood = food
	  		this.$refs.foodAll.returnGoods()
	  	}
	  },
	  computed:{
	  	foods:function(){
	  		let arr = []
	  		this.goods.forEach((item)=>{
	  			item.foods.forEach((food)=>{
	  				if(food.count) {
	  					
	  				}
	  				arr.push(food)
	  			});
	  		});
	  		return arr
	  	}
	  }
	}
</script>

<style lang="scss" type="text/css">
	@import '../../../../common/style/mixin';
	
	.goods-container{
		position: absolute;
		display:flex;
		top: 186px;
		left: 0;
		bottom: 0;
		padding-bottom: 52px;
		width: 100%;
		overflow:hidden;
		.item-left{
			width:80px;
			overflow:hidden;
			ul{
			}
			li{
				display: table;
				width: 56px;
				height:12px;
				padding: 0 14px;
				background:#f3f5f7;
				&.highLight{
					position: relative;
					margin-top: -1px;
					background: #fff;
					.cell{
						&:after{
							border: 0;
						}
					}
				}
				h3{
					font-size: 12px;
					line-height: 14px;
					color: #333;
				}
			}
			.cell{
				position: relative;
				display: table-cell;
				padding: 16px 0;
				&:after{
					@include border-1px();
				}
			}
		}
		.item-right{
			flex: 1;
			overflow: hidden;
			ul{
				padding-bottom: 1px;
				background: #fff;
				&:first-child{
					.title{
						&:before{
							display: none;
						}
					}
				}
			}
			.title{
				position: relative;
				padding: 10px 16px 10px 0;
				margin-left: 12px;
				background: #fff;
				color: #888;
				&:before{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					border-bottom: 1px solid #ddd;
					transform: scaleY(.5);
					 @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
			            transform: scaleY(.3);
			        }
					content: '';
				}
			}
			li{
				position: relative;
				display: flex;
				margin: 18px 18px 18px 12px;
				padding-bottom:18px; 
				&:after{
					@include border-1px();
				}
				&:last-child:after{
					display: none;
				}
			}
			.avatar{
				margin-right: 8px;
			}
			.food-container{
				h3{
					font-size: 15px;
					margin: 4px 0;
					color: #333;
					font-weight: 700;
				}
				.description{
					max-width: 156px;
					span{
						font-size: 10px;
						color: #888;
					}
				}
			}
			.count-wrapper{
				position: absolute;
				right: -36px;
				bottom: 18px;
				.count-edit-container{
					text-align: left;
				}
			}
			.price{
				margin: 14px 0;
				font-size: 14px;
				.nowPrice{
					color: #FF0000;
				}
				.oldPrice{
					text-decoration: line-through;
					color: #888;
				}
			}
		}
	}
</style>
