<template>
	<div class="line"></div>
</template>

<script>
	export default {
		name:'lines'
	}
</script>

<style lang="scss" type="text/css">
.line{
	position: relative;
	width: 100%;
	height: 16px;
	background: #f5f5f5;
	&:before{
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #ddd;
		content: '';
		transform: scaleY(.5);
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
            transform: scaleY(.3);
        }
	}
	&:after{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		content: '';
		border-bottom: 1px solid #ddd;
		transform: scaleY(.5);
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
            transform: scaleY(.3);
        }
	}
}
</style>