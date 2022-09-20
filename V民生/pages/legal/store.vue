<template>
	<view class="" :class="{'light':theme=='light'}">
		<view class="gray75 flex column w100 plr20 ptb10 bdb27" v-for="(item,index) in storelist" :key="index">
			<view class="flex between alcenter mt5">
				<view class="flex alcenter">
					<view class="logo bgBlue2 ft12 flex alcenter jscenter white">{{item.name.substring(0,1)}}</view>
					<text class="ml10 ft14">{{item.name}}</text>
				</view>
			</view>
			<view class="flex mt10">
				<text class="mr5">{{$t('store.regtime')}}</text>
				<text>{{item.create_time}}</text>
			</view>
			<view class="flex between mt5">
				<view class="flex alcenter">
					<text class="mr5">{{$t('store.belongcoin')}}</text>
					<text class="">{{item.currency_name}}</text>
				</view>
				<view class="flex alcenter">
					<text class="ft16 blue21">{{(item.legal_balance-0) | toFixed4}}</text>
				</view>
			</view>
			<view class="flex between mt5">
				<view class="flex alcenter">
					<image src="../../static/image/zhi.png" mode="aspectFit" class="wt15 h15 mr5"></image>
					<image src="../../static/image/wechat.png" mode="aspectFit" class="wt15 h15 mr5"></image>
					<image src="../../static/image/card.png" mode="aspectFit" class="wt15 h15 mr5"></image>
				</view>
				<view class="flex alcenter jscenter h25 plr20 bgBlue2 radius4" @click="gostore(item.id)">
					<text class="white ft14">{{$t('store.entershop')}}</text>
				</view>
			</view>
		</view>
        <view :class="['tc pt30 pt100 pb100 hidden',{'block':storelist.length==0&&over}]">
        	<image src="/static/image/nodata.png" class="h50 wt50"></image>
        	<view class="gray7">{{$t('home.norecord')}}</view>
        </view>
        <view class="tc gray7 ptb20" v-show="!hasMore && storelist.length>10">{{$t('home.nomore')}}</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {			
	            storelist:[],
				hasMore: true,
				over: false,
				page:1,
			};
		},
		filters:{
			toFixed4: function (value, options) {
				value = Number(value);
				return value.toFixed(4);
			},  
		},
		computed:{
		   ...mapState(['theme']),
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('store').myshop
			})
		},
		onShow() {
			var that = this;
			that.$utils.setThemeTop(this.theme)
			that.page=1;
			that.storelist=[];
			that.hasMore=true;
			that.getlist();
		},
		onHide() {},
		methods: {
			gostore(id){
				uni.navigateTo({
				    url: '/pages/legal/storeDetail?id='+id,
					"animationType": "pop-in",
					"animationDuration": 300
				});
			},
			getlist(){ 
				let that = this;
				that.$utils.initDataToken({ url: 'my_seller' }, res => {
					var data = res.data;
					uni.stopPullDownRefresh();
					that.storelist = (that.page == 1) ? data : that.storelist.concat(data);
					that.over = true;
					that.hasMore = (res.page >= res.pages) ? false : true;
					console.log(that.hasMore)
				});
			},
			onPullDownRefresh() {
				this.page = 1;
				this.getlist();
			},
			onReachBottom() {
				if (!this.hasMore) return;
				this.page++;
				this.getlist();
			},
		}
	};
</script>

<style>
	.logo{
		height: 45upx;
		width: 45upx;
		border-radius: 50%;
	}
</style>
