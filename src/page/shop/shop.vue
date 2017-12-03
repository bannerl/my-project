<style scoped="scoped" lang="scss" type="text/css">
	@import '../../common/style/mixin';
	.sellerPanel-container{
		width: 100%;
	}
</style>
<template>
	<ul class="sellerPanel-container">
		<div>
			<ul>
				<li v-for="item in category">
					<span>{{item.name}}</span>
					<div class="sub">
						<ul>
							<li v-for="sub_item in item.sub_categories">
								{{sub_item.name}}
							</li>
						</ul>
					</div>
				</li>
			</ul>
			
		</div>
	</ul>
</template>

<script>
	import axios from 'axios'
	import { Indicator } from 'mint-ui'
	import { setStore, getstore } from'@/common/js/savaLocal'
	import { loadUrl } from '@/common/js/unit'
	
	const noError = 0
	
	export default {
		data() {
			return {
				category: {}
			}
		},
		methods: {
		},
		watch:{
			$route: function(to,from) {
//				console.log(to)
//				console.log(from)
			}
		},
		created: function(){
			let self = this
			let url = window.location.href
			let a = loadUrl(url)
			axios.get('/api/shops',{
				params:{
					max_type: 0
				}
			}).then(function(res){
				
			}).then(function(error){
				
			})
			axios.get('/api/category')
			.then(function(res){
				self.category = res.data.data
			}).then(function(error){
				
			})
		},
		components:{
		}
	}
</script>
