<template>
	<div class="star-container" :class="starType">
		<span v-for="star in count" :class="star"></span>
	</div>	
</template>

<script>
	const len = 5
	
	export default {
	  name: 'star',
	  props:{
	  	score:{
	  		type:Number
	  	},
	  	size:{
	  		type:[Number,String]
	  	}
	  },
	  data () {
	    return {
	    }
	  },
	  computed: {
	  	starType:function(){
	  		return 'star-'+this.size
	  	},
	  	count:function(){
	  		let i = 0
	  		let arr = []
	  		let num = Math.floor(this.score*2)
	  		if(num%2===0){
	  			for(;i<(num/2);i++){
	  				arr.push('on')
	  			}
	  		}else{
	  			let i = 0
	  			let _num = (num-1)/2
	  			for(;i<_num;i++){
	  				arr.push('on')
	  				
	  			}
	  			
	  			arr.push('half')
	  		}
	  		let lens = arr.length
	  		for(;lens<len;lens++){
	  			arr.push('off')
	  		}
	  		return arr
	  	}
	  }
	}
</script>

<style lang="scss" type="text/css" scoped="scoped">
	@import '../../../../common/style/mixin';
	.star-container{
		font-size: 0;
		span{
			display: inline-block;
			background-repeat: no-repeat;
		}
	}
	.star-24{
		span{
			margin: 0 6px 0 0;
			width: 16px;
			height: 16px;
			background-size: 16px 16px;
		}
		.on{
			@include bg-image('star24_on');
		}
		.half{
			@include bg-image('star24_half');
		}
		.off{
			@include bg-image('star24_off');
		}
		
	}
	.star-36{
		span{
			margin: 0 8px 0 0;
			width: 24px;
			height: 24px;
			background-size: 24px 24px;
		}
		.on{
			@include bg-image('star24_on');
		}
		.half{
			@include bg-image('star24_half');
		}
		.off{
			@include bg-image('star24_off');
		}
	}
	.star-48{
		span{
			margin: 0 24px 0 0;
			width: 28px;
			height: 28px;
			background-size: 28px 28px;
		}
		.on{
			@include bg-image('star24_on');
		}
		.half{
			@include bg-image('star24_half');
		}
		.off{
			@include bg-image('star24_off');
		}
	}
</style>