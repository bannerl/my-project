<template>
	<div class="line-title">
		<div class="line"></div>
		<div class="title">{{title}}</div>
		<div class="line"></div>
	</div>	
</template>

<script>
	const len = 5
	export default {
	  name: 'linetitle',
	  props:{
	  	title:{
	  		type:String
	  	}
	  },
	  data () {
	    return {
	    }
	  }
	}
</script>

<style lang="scss" type="text/css" scoped="scoped">
	.line-title{
		display: flex;
		div{
			display: inline-block;
			font-size: 16px;
			font-weight: 700;
			color: #fff;
		}
		.line{
			flex: 1;
			margin-top: 16px;
			border-top: 1px solid #aaa;
			background: none;
		}
		.title{
			padding: 6px 10px;
		}
	}
</style>