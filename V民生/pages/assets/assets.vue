<template>
	<view class="ht100 " >
		<view class="status_bar">
			<view class="top_view" :class="tabBg"></view>
		</view>
		<view class="header fixed bdb1f flex alcenter jscenter blue " :class="tabBg" id="tab-bar" :scroll-left="scrollLeft">
			<text :class="{'white':i==tabIndex}" class="plr10 ft14 bold" v-for="(tab,i) in tabBars" :key="i" :id="tab.id"  :data-current="i"  @click="tapTab">{{tab.name}}</text>
		</view>
		<!-- <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="tab.id" :data-current="index" @click="tapTab">{{tab.name}}</view>
		</scroll-view> -->
		<view :class="{'light':theme=='light'}">
			<swiper :current="tabIndex" class="swiper-box pt50 myht100 " :duration="300" @change="changeTab">
			<!-- 币币账户 -->
			<swiper-item >
				<scroll-view class="list " scroll-y >
					<view class="bg1 ptb15 plr15" >
						<view class="flex alcenter between">
							<view class="">
								<!-- <text class="ft14 gray9">{{$t('assets.tradeacc')}}</text> -->
								<text class=" gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:total_usdt|filterDecimals(4)}}
						</view>
						<view class="flex alcenter between mt10">
							<view class="">
								<text class="ft14 gray9">{{$t('assets.tradeacc')}}</text>
								<text class="pl10 gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:change_wallet.usdt_totle|filterDecimals(4)}}
						</view>
					</view>
					<view class="plr10 mt10">
						<view class="bgPart ptb10 plr10 radius4 mb10" v-for="(changeItem,index2) in change_wallet.balance" :key="index2">
							<navigator :url="'tradeAccount?currency='+changeItem.currency+'&type=change'">
								<view class="flex alcenter between">
									<view class="ft16 bold blue2">{{changeItem.currency_name}}</view>
									<image src="../../static/image/arrrowr.png" class="wt15 h15"></image>
								</view>
								<view class="mt10 flex alcenter">
									<view class="flex1">
										<view class="blue">{{$t('trade.use')}}</view>
										<view class="mt5">{{isClose?closeAccount:changeItem.change_balance}}</view>
									</view>
									<view class="flex1 tc">
										<view class="blue">{{$t('assets.lock')}}</view>
										<view class="mt5">{{isClose?closeAccount:changeItem.lock_change_balance}}</view>
									</view>
									<!-- <view class="flex1 tr">
										<view class="blue">{{$t('assets.zhehe')}}($)</view>
										<view class="mt5">{{isClose?closeAccount:(changeItem.change_balance-0)*(changeItem.usdt_price-0) |filterDecimals(4)}}</view>
									</view> -->
									<view class="flex1 tr">
										<view class="blue">{{$t('assets.zhehe')}}($)</view>
										<!-- <view class="mt5">{{isClose?closeAccount:Math.floor((changeItem.change_balance-0)*(changeItem.usdt_price-0)*ExRate*100)/100}}</view> -->
										 <view class="mt5">{{isClose?closeAccount:(changeItem.change_balance*changeItem.usdt_price+changeItem.lock_change_balance*changeItem.usdt_price)|filterDecimals(4)}}</view>
									</view>
								</view>	
							</navigator>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			
			<!-- 合约账户 -->
			<swiper-item >
				<scroll-view class="list" scroll-y>
					<view class="bg2 ptb15 plr15">
						<view class="flex alcenter between">
							<view class="">
								<!-- <text class="ft14 gray9">{{$t('assets.tradeacc')}}</text> -->
								<text class=" gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:total_usdt|filterDecimals(4)}}
						</view>
						<view class="mt10 flex alcenter between">
							<view class="">
								<text class="ft16 ft14 gray9">{{$t('assets.leveracc')}}</text>
								<text class="pl10 gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:lever_wallet.usdt_totle|filterDecimals(4)}}
						</view>
					<!-- 	<view class="pt5 white blue">
							≈¥ {{isClose?closeAccount:lever_wallet.usdt_totle*ExRate}}
						</view> -->
					</view>
					<view class="plr10 mt10">
						<view  class="bgPart ptb10 plr10 radius4 mb10" v-for="(leverItem,index3) in lever_wallet.balance" :key="index3">
							<navigator :url="'tradeAccount?currency='+leverItem.currency+'&type=lever'">
								<view class="flex alcenter between">
									<view class="ft16 bold blue2">{{leverItem.currency_name}}</view>
									<image src="../../static/image/arrrowr.png" class="wt15 h15"></image>
								</view>
								<view class="mt10 flex alcenter">
									<view class="flex1">
										<view class="blue">{{$t('trade.use')}}</view>
										<view class="mt5">{{isClose?closeAccount:leverItem.lever_balance}}</view>
									</view>
									<view class="flex1 tc">
										<view class="blue">{{$t('assets.lock')}}</view>
										<view class="mt5">{{isClose?closeAccount:leverItem.lock_lever_balance}}</view>
									</view>
								<!-- 	<view class="flex1 tr">
										<view class="blue">{{$t('assets.zhehe')}}($)</view>
										<view class="mt5">{{isClose?closeAccount:(leverItem.lever_balance-0)*(leverItem.usdt_price-0) |filterDecimals(4)}}</view>
									</view> -->
									<view class="flex1 tr">
										<view class="blue">{{$t('assets.zhehe')}}($)</view>
										<view class="mt5">{{isClose?closeAccount:(leverItem.lever_balance*leverItem.usdt_price+leverItem.lock_lever_balance*leverItem.usdt_price)|filterDecimals(4)}}</view>										
									</view>
								</view>	
							</navigator>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 法币账户 -->
			<swiper-item >
				<scroll-view class="list" scroll-y >
					<view class="bg3 ptb15 plr15" >
						<view class="flex alcenter between">
							<view class="">
								<!-- <text class="ft14 gray9">{{$t('assets.tradeacc')}}</text> -->
								<text class=" gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:total_usdt|filterDecimals(4)}}
						</view>
						<view class="mt10 flex alcenter between">
							<view class="">
								<text class="ft16 ft14 gray9">{{$t('assets.legalacc')}}</text>
								<text class="pl10 gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:legal_wallet.usdt_totle|filterDecimals(4)}}
						</view>
					
					</view>
					<view class="plr10 mt10">
						<view class="bgPart ptb10 plr10 radius4 mb10" v-for="(legalItem,index4) in legal_wallet.balance" :key="index4">
							<navigator :url="'tradeAccount?currency='+legalItem.currency+'&type=legal'">
								<view class="flex alcenter between">
									<view class="ft16 bold blue2">{{legalItem.currency_name}}</view>
									<image src="../../static/image/arrrowr.png" class="wt15 h15"></image>
								</view>
								<view class="mt10 flex alcenter">
									<view class="flex1">
										<view class="blue">{{$t('trade.use')}}</view>
										<view class="mt5">{{isClose?closeAccount:legalItem.legal_balance}}</view>
									</view>
									<view class="flex1 tc">
										<view class="blue">{{$t('assets.lock')}}</view>
										<view class="mt5">{{isClose?closeAccount:legalItem.lock_legal_balance}}</view>
									</view>
								
									<view class="flex1 tr">
										<view class="blue">{{$t('assets.zhehe')}}($)</view>
										<view class="mt5">{{isClose?closeAccount:(legalItem.legal_balance*legalItem.usdt_price+legalItem.lock_legal_balance*legalItem.usdt_price)|filterDecimals(4)}}</view>										
									</view>
								</view>	
							</navigator>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 期权账户 -->
			<swiper-item >
				<scroll-view class="list" scroll-y >
					<view class="bg4 ptb15 plr15" >
						<view class="flex alcenter between">
							<view class="">
								<!-- <text class="ft14 gray9">{{$t('assets.tradeacc')}}</text> -->
								<text class=" gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:total_usdt|filterDecimals(4)}}
						</view>
						<view class="mt10 flex alcenter between">
							<view class="">
								<text class="ft16 ft14 gray9">{{$t('assets.microacc')}}</text>
								<text class="pl10 gray9">{{$t('assets.zhehecny')}}（$）</text>
							</view>
							<image src="../../static/image/shows.png" class="wt15 h15" v-if="!isClose" @tap="isClose=true"></image>
							<image src="../../static/image/hide.png" class="wt15 h15" v-else @tap="isClose=false"></image>
						</view>
						<view class="mt10 white ft16 bold">
							{{isClose?closeAccount:micro_wallet.usdt_totle |filterDecimals(4)}}
						</view>
					<!-- 	<view class="pt5 white blue">
							≈¥ {{isClose?closeAccount:micro_wallet.usdt_totle*ExRate}}
						</view> -->
					</view>
					<view class="plr10 mt10">
						<view class="bgPart ptb10 plr10 radius4 mb10" v-for="(legalItem,index4) in micro_wallet.balance" :key="index4">
							<navigator :url="'tradeAccount?currency='+legalItem.currency+'&type=micro'">
								<view class="flex alcenter between">
									<view class="ft16 bold blue2">{{legalItem.currency_name}}</view>
									<image src="../../static/image/arrrowr.png" class="wt15 h15"></image>
								</view>
								<view class="mt10 flex alcenter">
									<view class="flex1">
										<view class="blue">{{$t('trade.use')}}</view>
										<view class="mt5">{{isClose?closeAccount:legalItem.micro_balance}}</view>
									</view>
									<view class="flex1 tc">
										<view class="blue">{{$t('assets.lock')}}</view>
										<view class="mt5">{{isClose?closeAccount:legalItem.lock_micro_balance}}</view>
									</view>
								
									<view class="flex1 tr">
										<view class="blue">{{$t('assets.zhehe')}}($)</view>
										<view class="mt5">{{isClose?closeAccount:(legalItem.micro_balance*legalItem.usdt_price+legalItem.lock_micro_balance*legalItem.usdt_price)|filterDecimals(4)}}</view>										
									</view>
								</view>	
							</navigator>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		</view>
		
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				legal_wallet:{totle:'',balance:[]},
				change_wallet:{totle:'',balance:[]},
				lever_wallet:{totle:'',balance:[]},
				micro_wallet:{totle:'',balance:[]},
				tabBars: [],
				isClose:false,
				tabBg:'bg1',
				closeAccount:'****',
				ExRate:7,
				total_usdt:0,
			}
		},
		onLoad() {
			
			// this.getAssets();
		},
		onPullDownRefresh() {
			this.getAssets();
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.tabBars= [
				{
					name: this.$t('assets.trade'),
					id: 'change'
				}, {
					name: this.$t('assets.lever'),
					id: 'lever'
				},
				{
					name: this.$t('assets.legal'),
					id: 'legal'
				},
				{
					name: this.$t('assets.micro'),
					id: 'micro'
				}
			];
			this.$utils.setThemeTop(this.theme)
			this.$utils.setThemeBottom(this.theme)
			this.getAssets();
		},
		methods: {
			close(index1, index2) {
				uni.showModal({
					content: 'Whether to delete this message？',
					success: (res) => {
						if (res.confirm) {
							this.newsitems[index1].data.splice(index2, 1);
						}
					}
				})
			},
			async changeTab(e) {
				let index = e.target.current;
				this.tabBg='bg'+(index+1)
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e) { //点击tab-bar
				let tabIndex = e.target.dataset.current;
				if (this.tabIndex === tabIndex) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = tabIndex;
				}
				this.tabBg='bg'+(tabIndex+1)
			},
			getAssets() {
				this.$utils.initDataToken({url:'wallet/list',type:'POST'},res=>{
					uni.stopPullDownRefresh();
					let total_usdt=0;
					this.ExRate=res.ExRate;
					this.legal_wallet=res.legal_wallet;
					this.change_wallet=res.change_wallet;
					this.lever_wallet=res.lever_wallet;
					this.micro_wallet=res.micro_wallet;
					res.legal_wallet.balance.filter(item=>{
						total_usdt+=item.legal_balance*item.usdt_price+item.lock_legal_balance*item.usdt_price
					})
					res.change_wallet.balance.filter(item=>{
						total_usdt+=item.change_balance*item.usdt_price+item.lock_change_balance*item.usdt_price
					})
					res.lever_wallet.balance.filter(item=>{
						total_usdt+=item.lever_balance*item.usdt_price+item.lock_lever_balance*item.usdt_price
					})
					res.micro_wallet.balance.filter(item=>{
						total_usdt+=item.micro_balance*item.usdt_price+item.lock_micro_balance*item.usdt_price
					})
					this.total_usdt=total_usdt;
				})
			}
		}
	}
</script>

<style>
	.bg1{
		background: #0f2441;
	}
	.bg2{
		background: #15376f;
	}
	.bg3{
		background: #37365d;
	}
	.bg4{
		background: #194052;
	}
	.myht100{
		/* height: 100.0vh; */
		overflow-y: scroll;
		min-height: 100.0vh !important;
	}
	/* uni-swiper .uni-swiper-wrapper{
		overflow-y: scroll !important; 
	} */
	swiper-item{
		overflow-y: scroll !important; 
	}
	.swiper-box{
		padding-bottom: 20upx;
	}
</style>
