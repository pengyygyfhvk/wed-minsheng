<template>
	<view class="plr20 ptb10" :class="{'light':theme=='light'}">
		<view class="flex alcenter between ptb10 ft16">
			<text class="ft18 bold">{{$t('authentication.renzheng')}}</text>
			<navigator v-if="msg.idStatus == 1" url="/pages/mine/real_authentication" class="blue2">{{$t('authentication.go')}}</navigator>
			<text v-if="msg.idStatus == 1"  class="blue2">{{$t('authentication.has')}}</text>
		</view>
		<view v-if="msg.idStatus == 0" class="mt10 ft14">·{{$t('authentication.rz_tip')}}</view>
		<view v-if="msg.idStatus == 2" class="ft16">
			<view class="mb5 mt10 ft16">{{$t('authentication.name')}}：{{msg.name}}</view>
			<view class="mb5 ft16">{{$t('authentication.account')}}：{{msg.account}}</view>
			<view class="mb5 ft16">UID：{{msg.id}}</view>
			<view class="ft16">{{$t('authentication.zj')}}：{{msg.card_id}}</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data() {
			return {
				msg:''
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('authentication').renzheng
			})
			this.getInfo();
		},
		methods: {
			getInfo(){
                    this.$utils.initDataToken({url:'member/verified',data:{},type:'get'},(res,msg)=>{
						this.msg = res.data;
					});
			}
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
