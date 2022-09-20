<template>
	<view  :class="{'light':theme=='light'}">
		<view class="plr10 ptb15 mt10 bgPart" style="min-height: 80vh;">
			<view class="ft16"></view>
			<view class="mt10 pb100">
				<view class="flex alcenter ptb10 bdb_blue3">
					<view class="flex2 tc">{{$t('legal.num')}}</view>
					<view class="flex2 tc">{{$t('trade.types')}}</view>
					<view class="flex2 tc">{{$t('trade.time')}}</view>
					<view class="flex2 tc">{{$t('store.sd')}}</view>
				</view>
				<view class="mt10 flex bdb_blue3 ptb5" v-for="(item,i) in balance_log" :key="i" v-if="balance_log.length>0" >
					<view class="flex2 tc">{{item.value | toFixed4}} {{item.currency_name}}</view>
					<view class="flex2 tc">{{item.memo}}</view>
					<view class="flex2 tc">{{item.updated_at}}</view>
					<view class="flex2 tc" v-if="item.is_lock==1">{{$t('store.yes')}}</view>
					<view class="flex2 tc" v-else>{{$t('store.no')}}</view>
				</view>
				<view class="mt20 tc" v-if="balance_log.length==0">
					<image src="../../static/image/anonymous.png" class="wt60 h60" ></image>
					<view>{{$t('home.norecord')}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				page:1,
				balance_log:[],
				storeid:'',
			}
		},
		onLoad(e) {
			this.storeid = e.id;
			uni.setNavigationBarTitle({
				title:this.$t('store').journal
			})
			this.getDetail();
		},
		filters:{
			toFixed4: function (value, options) {
				value = Number(value);
				return value.toFixed(4);
			}, 
		},
		onShow() {
			var that = this;
			that.$utils.setThemeTop(this.theme)
		},
		onHide() {},
		computed:{
		   ...mapState(['theme']),
		},
		methods:{
			getDetail(){
				this.$utils.initDataToken({url:'seller/balance_log',type:'get', data:{page:this.page,seller_id:this.storeid}},res=>{
					uni.stopPullDownRefresh()
					this.balance_log=this.balance_log.concat(res.data);
					console.log(res)
				})
			},
		},
		onPullDownRefresh() {
			this.page=1;
			this.balance_log=[];
			this.getDetail();
		},
		onReachBottom() {
			this.page++;
			this.getDetail();
		},
	}
</script>

<style>
</style>
