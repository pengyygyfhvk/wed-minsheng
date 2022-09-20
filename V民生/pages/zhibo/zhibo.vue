<template>
	<view>
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
			this.$utils.initDataToken({ url: 'getConfig', data: { conf: 'web_zhibo' }, type: 'POST' }, (res, msg) => {
				uni.stopPullDownRefresh();
				this.url = res.data;
			});
		}
	}
</script>

<style>

</style>
