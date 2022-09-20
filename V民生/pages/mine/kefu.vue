<template>
	<view :class="{ light: theme == 'light' }">
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
		computed: {
			...mapState(['theme'])
		},
		onLoad(e) {
			this.$utils.initDataToken({ url: 'getKefu',  }, (res, msg) => {
				uni.stopPullDownRefresh();
				this.url = res.data;
			});
			uni.setNavigationBarTitle({
				title:this.$t('zdy').zxkf
			})
			this.$utils.setThemeTop(this.theme);
			this.$utils.setThemeBottom(this.theme);
		}
	}
</script>

<style>

</style>
