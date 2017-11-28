<template>
	<div class="supports-con">
		<div v-if="support" class="supports-item" :class="sizea">
			<span :class="supportIcon" class="icon"></span>
		</div>
	</div>	
</template>

<script>
	const arr = [
		'decrease','discount','special','invoice','guarantee'
	]
	
	export default {
	  name: 'supportsactivity',
	  props:{
	  	support:{
	  		type:Object
	  	},
	  	size:{
	  		Type:[Number,String]
	  	}
	  },
	  data () {
	    return {
	    }
	  },
	  computed:{
	  	supportIcon:function(){
	  		return arr[this.support.type]
	  	},
	  	sizea:function(){
	  		return 'icon_'+this.size
	  	}
	  }
	}
</script>

<style lang="scss" type="text/css" scoped="scoped">
	@import '../../../../common/style/mixin';
	
	.supports-con{
		.supports-item{
			font-size:0;
			.icon{
				display: inline-block;
				vertical-align: top;
				background-repeat: no-repeat;
			}
		}
		.icon_24{
			.icon{width: 16px;height: 16px;margin: 0 10px;background-size: 16px 16px;}
			.decrease{@include bg-image('decrease_4');}
			.discount{@include bg-image('discount_4');}
			.special{@include bg-image('special_4');}
			.invoice{@include bg-image('invoice_4');}
			.guarantee{@include bg-image('guarantee_4');}
		}
		.icon_32{
			.icon{width: 18px;height: 18px;margin: 0 10px;background-size: 18px 18px;}
			.decrease{@include bg-image('decrease_4');}
			.discount{@include bg-image('discount_4');}
			.special{@include bg-image('special_4');}
			.invoice{@include bg-image('invoice_4');}
			.guarantee{@include bg-image('guarantee_4');}
		}
		.icon_36{
			.icon{width: 22px;height: 22px;margin: 0 10px;background-size: 22px 22px;}
			.decrease{@include bg-image('decrease_4');}
			.discount{@include bg-image('discount_4');}
			.special{@include bg-image('special_4');}
			.invoice{@include bg-image('invoice_4');}
			.guarantee{@include bg-image('guarantee_4');}
		}
		.icon_48{
			.icon{width: 25px;height: 25px;margin: 0 10px;background-size: 25px 25px;}
			.decrease{@include bg-image('decrease_4');}
			.discount{@include bg-image('discount_4');}
			.special{@include bg-image('special_4');}
			.invoice{@include bg-image('invoice_4');}
			.guarantee{@include bg-image('guarantee_4');}
		}
	}
</style>