<template>
	<view class="blue" :class="{'light':theme=='light'}">
		<view class="plr20 pt20 pb15 bgPart">
			<text class="bold ft18 blue2">{{coinInfo.currency_name}}</text>
			<view class="mt10 flex alcenter mt15" v-if="tradeType=='change'">
				<view class="flex1">
					<view class="blue ft12">{{this.$t('trade.use')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.change_balance}}</view>
				</view>
				<view class="flex1 tc">
					<view class="blue ft12">{{$t('assets.lock')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.lock_change_balance}}</view>
				</view>
				<!-- <view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5 ft12 white">{{(coinInfo.change_balance-0)*(coinInfo.usdt_price-0) |filterDecimals(4)}}</view>
				</view> -->
				<view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5">{{Math.floor((coinInfo.change_balance-0)*(coinInfo.usdt_price-0)*100)/100 || '0.00'}}</view>
				</view>
			</view>
			<view class="mt10 flex alcenter mt15" v-if="tradeType=='lever'">
				<view class="flex1">
					<view class="blue ft12">{{this.$t('trade.use')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.lever_balance|| '0.00'}}</view>
				</view>
				<view class="flex1 tc">
					<view class="blue ft12">{{$t('assets.lock')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.lock_lever_balance|| '0.00'}}</view>
				</view>
				<!-- <view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5 ft12 white">{{(coinInfo.lever_balance-0)*(coinInfo.usdt_price-0) |filterDecimals(4)}}</view>
				</view> -->
				<view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5">{{Math.floor((coinInfo.lever_balance-0)*(coinInfo.usdt_price-0)*100)/100 || '0.00'}}</view>
				</view>
			</view>
			<view class="mt10 flex alcenter mt15" v-if="tradeType=='legal'">
				<view class="flex1">
					<view class="blue ft12">{{this.$t('trade.use')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.legal_balance|| '0.00'}}</view>
				</view>
				<view class="flex1 tc">
					<view class="blue ft12">{{$t('assets.lock')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.lock_legal_balance|| '0.00'}}</view>
				</view>
				<!-- <view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5 ft12">{{(coinInfo.legal_balance-0)*(coinInfo.usdt_price-0) |filterDecimals(4)}}</view>
				</view> -->
				<view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5">{{Math.floor((coinInfo.legal_balance-0)*(coinInfo.usdt_price-0)*100)/100 || '0.00'}}</view>
				</view>
			</view>
			<view class="mt10 flex alcenter mt15" v-if="tradeType=='micro'">
				<view class="flex1">
					<view class="blue ft12">{{this.$t('trade.use')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.micro_balance|| '0.00'}}</view>
				</view>
				<view class="flex1 tc">
					<view class="blue ft12">{{$t('assets.lock')}}</view>
					<view class="mt5 ft12 ">{{coinInfo.lock_micro_balance|| '0.00'}}</view>
				</view>
				<!-- <view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5 ft12">{{(coinInfo.legal_balance-0)*(coinInfo.usdt_price-0) |filterDecimals(4)}}</view>
				</view> -->
				<view class="flex1 tr">
					<view class="blue ft12">{{$t('assets.zhehe')}}($)</view>
					<view class="mt5">{{Math.floor((coinInfo.micro_balance-0)*(coinInfo.usdt_price-0)*100)/100 || '0.00'}}</view>
				</view>
			</view>
		</view>
		<!-- <view class="bgHeader h10"></view> -->
		<view class="plr10 ptb15 mt10 bgPart" style="min-height: 80vh;">
			<view class="ft16">{{$t('assets.records')}}</view>
			<view class="mt10 pb100">
				<view class="flex alcenter ptb10 bdb_blue3 ">
					<view class="flex1">{{$t('trade.num')}}</view>
					<view class="flex1 ">{{$t('assets.record')}}</view>
					<view class="flex1 tr">{{$t('trade.time')}}</view>
				</view>
				<view class="mt10 flex bdb_blue3 ptb5" v-for="(item,i) in logList" :key="i" v-if="logList.length>0">
					<view class="flex1">{{item.value-0}}</view>
					<view class="flex1 wordbreak pr10">{{item.info}}</view>	
					<view class="flex1 tr">{{item.created_time}}</view>
				</view>
				<view class="mt20 tc" v-if="logList.length==0">
					<image src="../../static/image/anonymous.png" class="wt60 h60" ></image>
					<view>{{$t('home.norecord')}}</view>
				</view>
			</view>
		</view>
		<view class="fixed pos_l0b0 w100 bgHeader bdt2f flex alcenter ptb10 zdx100">
			<block v-if="tradeType=='change'">
				<navigator :url="'transfer?name='+coinInfo.currency_name" class="flex1 tc">
					<image src="../../static/image/hz01.png" class="wt30 h30 "></image>
					<view class="">{{$t('assets.transfer')}}</view>
				</navigator>
			<!-- 	<view class="flex1 tc" @tap="goTrade">
					<image src="../../static/image/bibi01.png" class="wt30 h30 "></image>
					<view class="">{{$t('assets.trade')}}</view>
				</view> -->
				<!-- 充币 -->
				<navigator :url="'charge?currency='+currency+'&name='+coinInfo.currency_type" class="flex1 tc" v-if="coinInfo.is_charge">
					<image src="../../static/image/cb01.png" class="wt30 h30 "></image>
					<view class="">{{$t('assets.charge')}}</view>
				</navigator>
				<!-- 提币 -->
				<navigator :url="'mention?currency='+currency+'&name='+coinInfo.currency_name" class="flex1 tc">
					<image src="../../static/image/tb01.png" class="wt30 h30"></image>
					<view class="">{{$t('assets.mention')}}</view>
				</navigator>
			</block>
			<block v-if="tradeType=='lever'">
				<navigator :url="'transfer?name='+coinInfo.currency_name" class="flex1 tc">
					<image src="../../static/image/hz01.png" class="wt30 h30 "></image>
					<view class="">{{$t('assets.transfer')}}</view>
				</navigator>
			</block>
			<block v-if="tradeType=='legal'">
				<navigator :url="'transfer?name='+coinInfo.currency_name" class="flex1 tc">
					<image src="../../static/image/hz01.png" class="wt30 h30 "></image>
					<view class="">{{$t('assets.transfer')}}</view>
				</navigator>
			</block>
			<block v-if="tradeType=='micro'">
				<navigator :url="'transfer?name='+coinInfo.currency_name" class="flex1 tc">
					<image src="../../static/image/hz01.png" class="wt30 h30 "></image>
					<view class="">{{$t('assets.transfer')}}</view>
				</navigator>
			</block>
		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				currency:'',
				tradeType:'',
				page:1,
				coinInfo:{},
				logList:[],
				titles:[this.$t('assets.tradeacc'),this.$t('assets.leveracc'),this.$t('assets.legalacc'),this.$t('assets.microacc')],
				ExRate:6.5,
			}
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
			// this.$utils.setThemeBottom(this.theme)
		},
		onLoad(e) {
			this.currency=e.currency;
			this.tradeType=e.type;
			this.getDetail();
			this.getLog();
			var that=this;
			if(e.type=='change'){
				uni.setNavigationBarTitle({
					title:that.titles[0]
				})
			}else if(e.type=='lever'){
				uni.setNavigationBarTitle({
					title:that.titles[1]
				})
			}else if(e.type=='legal'){
				uni.setNavigationBarTitle({
					title:that.titles[2]
				})
			}else if(e.type=='micro'){
				uni.setNavigationBarTitle({
					title:that.titles[3]
				})
			}
		},
		methods:{
			goExportKey(){
				uni.navigateTo({
					url:"/pages/mine/exportKey?currency="+this.currency+"&name="+this.coinInfo.currency_name
				})
			},
			getDetail(){
				this.$utils.initDataToken({url:'wallet/detail',type:'POST', data:{currency:this.currency,type:this.tradeType}},res=>{				
					this.ExRate=res.ExRate-0;
					uni.stopPullDownRefresh()
					this.coinInfo=res;
				})
			},
			goTrade(){
				let localData=uni.getStorageSync('tradeData')||{};
				let currency_name=this.coinInfo.currency_name;
				console.log(uni.getStorageSync('tradeData'),localData)
				if(localData.legal_name &&localData.legal_name!=currency_name){
					console.log(123);
					localData.currency_name=currency_name;
					localData.currency_id=this.currency;
					uni.setStorageSync('tradeData',localData);
				}
				uni.switchTab({
					url:'/pages/trade/trade'
				})
			},
			getLog(){
				let tradeType=this.tradeType;
				if(tradeType=="micro"){
					tradeType=4;
				}
				if(tradeType=="legal"){
					tradeType=1;
				}
				if(tradeType=="lever"){
					tradeType=3;
				}
				if(tradeType=="change"){
					tradeType=2;
				}
				this.$utils.initDataToken({url:'wallet/legal_log',type:'POST', data:{currency:this.currency,type:tradeType,page:this.page}},res=>{
					uni.stopPullDownRefresh()
					this.logList=this.logList.concat(res.list);
				})
			}
		},
		onPullDownRefresh() {
			this.page=1;
			this.logList=[];
			this.getDetail();
			this.getLog();
		},
		onReachBottom() {
			this.page++;
			this.getLog();
		}
	}
</script>

<style>
</style>
