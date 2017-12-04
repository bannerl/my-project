<template>
  <div>
  	<goods-header :seller='seller'></goods-header>
  	<div class="tab">
  		<div class="tab-item">
  			<router-link to='/goods'>商品</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link to='/ratings'>评价</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link to='/seller'>商家</router-link>
  		</div>
  	</div>
  	<keep-alive>
    	<router-view :seller='seller' />
  	</keep-alive>
  </div>
</template>

<script>
	import goodsHeader from 'components/header/header'
	
	const noError = 0;
	
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		seller:{}
	  	}
	  },
	  created(){
	  	this.$http.get('/api/seller').then(response => {
		    response = response.body;
		    if(response.status === noError){
		    	this.seller = response.data;
			  }
		  });
	  },
	  components:{
	  	'goods-header':goodsHeader
	  }
	  
	}
	
</script>

<style lang="scss" scoped="" type="text/css">
	@import './common/style/mixin';
	.tab{
		position:relative;
		display:flex;
		padding: 14px 12px;
		&:after{
			@include border-1px();
		}
		.tab-item{
			flex:1;
			font-size: 16px;
			text-align: center;
			color: #333;
			a.active{
				color:#ff4500;
			}
		}
	}

</style>
