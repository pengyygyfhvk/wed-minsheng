<template>
	<view class="">
		<!-- <view class="status_bar">
			<view class="top_view"></view>
		</view> -->
		<web-view :src="url"></web-view>
	</view>
</template>
<script>
	import { mapState } from 'vuex';
	export default{
		data(){
			return {
				url:''
			}
		},
		onLoad(e) {
			console.log(JSON.stringify(e))
			if(JSON.stringify(e) == '{}'){
				e.item = 0
			}
			this.url=`/hybrid/html/second.html?item=${e.item}`
		},
		computed: {
			...mapState(['theme'])
		},
		onShow() {
			this.$utils.setThemeTop(this.theme);
		},
	}
</script>

<style>
</style>
