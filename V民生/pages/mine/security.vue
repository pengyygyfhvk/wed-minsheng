<template>
	<view :class="{'light':theme=='light'}">
		<!-- <navigator url="/pages/mine/modifyPwd" class="ptb20 ft14 flex alcenter between plr10 bdb_blue3">
			<span>{{$t('login.s_loginpwd')}}</span>
			<span class="flex alcenter">{{$t('login.s_edit')}}<image src="../../static/image/mores.png" class="wt15 h15 ml10"></image></span>
		</navigator> -->
		<navigator url="/pages/mine/resetLegalPwd" class="ptb20 ft14 flex alcenter between plr10 bdb_blue3">
			<span>{{$t('login.s_dealpwd')}}</span>
			<span class="flex alcenter">{{$t('login.s_edit')}}<image src="../../static/image/mores.png" class="wt15 h15 ml10"></image></span>
		</navigator>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('login').security
			})
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
		    this.$utils.setThemeTop(this.theme)
		},
	}
</script>

<style>
</style>
