<template>
	<view class="">
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view> -->
		<web-view :src="url"></web-view>
	</view>
</template>
<script>
	export default{
		data(){
			return {
				url:''
			}
		},
		onLoad(e) {
			this.url=e.url
		}
	}
</script>

<style>
</style>
