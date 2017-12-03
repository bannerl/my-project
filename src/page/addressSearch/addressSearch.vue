<style lang="scss" type="text/css">
	.map-wrapper{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #fff;
		height: 100%;
		min-height: 600px;
		.searchBox{
			position: relative;
			padding-top: 18px;
			height: 86px;
			background: #26A2FF;
			box-sizing: border-box;
			&.textOn{
		      	.el-vue-search-box-container {
		      		.search-box-wrapper {
				      	.search-btn {
				      		color: #333;
				      	}
				    } 
				    .search-tips {
			      		display: block;
			      	} 	
		      	} 
		    }
			.city{
				position: absolute;
				line-height: 50px;
				width: 70px;
				color: #fff;
				text-align: center;
			}
			.el-vue-search-box-container{
				height: 38px;
				background: #fff;
				box-shadow: 0;
				border-radius: 0;
				.search-tips {
					position: absolute;
					left: -16px;
					padding-right: 32px;
					width: 100%;
					margin-top: 18px;
					border: none;
					box-shadow: 0 0 0;
		      		display: none;
		      		ul {
		      			width: 100%;
		      			li{
		      				position: relative;
			      			width: 100%;
			      			padding: 4px 16px;
			      			box-shadow: 0 0 0;
			      			&:after{
			      				position: absolute;
			      				left: 0;
			      				bottom: 0;
			      				width: 100%;
			      				border-bottom: 1px solid #ddd;
			      				transform: scaleY(.5);
			      				content: "";
			      			}
			      		}
		      		} 
		      	}
			}
			.search-box {
		      position: absolute;
		      top: 30px;
		      left: 16px;
		      right: 16px;
		      width: auto;
		      .search-box-wrapper {
		      	.search-btn {
		      		position: absolute;
		      		left: 0;
		      		margin-right: 6px;
		      		color: #333;
		      		font-size: 0;
		      		&:before{
		      			content: '';
		      			position: absolute;
		      			top: 0;
		      			left: 0;
		      			height: 10px;
		      			width: 10px;
		      			color: #222;
		      			font-size: 15px;
		      			border-radius: 50%;
		      			border: 1px solid #999;
		      			transform: rotate(45deg) translate3d(17px,-2px,0);
		      		}
		      		&:after{
		      			content: '';
		      			position: absolute;
		      			top: 0;
		      			left: 0;
		      			width: 6px;
		      			border-top: 1px solid #999;
		      			transform: rotate(45deg) translate3d(31px,0px,0);
		      		}
		      	}
		      	input {
		      		height: 33px;
		      		padding-left: 30px;
		      		border: none;
		      		background: #fff;
		      	}
		      }
		    }
		}
	}
</style>
<template>
	<div class="map-wrapper" v-on:click="changeInput" ref="mapBox">
		<mt-header title="选择收货的地址">
			 <mt-button icon="back" slot="left">返回</mt-button>
		</mt-header>
		<div class="searchBox" :class="{textOn:inputActive}">
			<!--<div class="city">杭州</div>-->
			<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
		</div>
	</div>
</template>

<script>
	export default {
      data: function() {
        return {
        	inputActive: false,
          markers: [
            [120.36932, 30.27269]
          ],
          searchOption: {
            city: '杭州',
            citylimit: true
          },
          mapCenter: [120.36932, 30.27269]
        };
      },
      methods: {
        addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        },
        changeInput: function (el) {
        	this.$refs.mapBox.getElementsByTagName('input')[0].setAttribute("placeholder","请输入地址")
        	if(el.target.nodeName === "INPUT") {
        		this.inputActive = true
        	} else {
        		this.inputActive = false
        	}
        	if(el.target.nodeName === "LI") {
        		console.log(el.target.innerText)
        	}
        }
      }
    }
</script>
