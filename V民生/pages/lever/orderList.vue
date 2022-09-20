<template>
	<view class="" :class="{'light':theme=='light'}">
		<view class="flex between alcenter pt10 plr15 bdb_1e pb10 fixed bgBlack w100">
			<view class="">
				<view class="">{{$t('lever.risk')}}：{{ risk || '0.00' |toFixed2 }}%</view>
				<view class="pt5">
					{{$t('lever.totalyk')}}：
					<text :class="totalRisk < 0?'red':'green'">{{ totalRisk || '0.0000' |toFixed4 }}</text>
				</view>
			</view>
			<view class="bgBlue white ptb10 tc radius6" style="width: 120px;" @tap="allClose.shows=true">{{$t('lever.yijian')}}</view>
		</view>
		<view class="list pt60 ft13">
			 <!-- #ifdef APP-PLUS -->
			<view class="h20">
			</view>
			<!-- #endif -->
				<view v-for="(item, index) in orderList" :key="index" class="plr15 bdb_1e mt10 pb10">
					<view class="flex between mb10">
						<view class="">
							<text :class="item.type == 1 ? 'green ft14' : 'red ft14'">{{ item.type == 1 ? $t('trade.buy') : $t('trade.sell') }}</text>
							<text class="ml5">{{ item.symbol }}</text>
							<text class="ml5">x{{ item.share }}{{$t('trade.hand')}}</text>
						</view>
						<view :class="item.profits < 0 ? 'red' : 'green'">{{ item.profits || '0.0000' | toFixed4 }}</view>
					</view>
					<view class="flex wraps">
						<!-- <view class="flex1"> -->
							<view class="w33">
								<view class="gray4">{{$t('trade.price_cang')}}</view>
								<view class="mt5 ft14">{{ item.price || '0.0000' | toFixed4 }}</view>
							</view>
							<view class="w33 tc">
								<view class="gray4">{{$t('trade.price_zhiying')}}</view>
								<view class="mt5 ft14">{{ item.target_profit_price || '0.0000' | toFixed4 }}</view>
							</view>
						<!-- </view>
						<view class="mr10 flex1 tc"> -->
							<view class="w33 tr">
								<view class="gray4">{{$t('trade.price_cur')}}</view>
								<view class="mt5 ft14">{{ item.update_price || '0.0000' | toFixed4 }}</view>
							</view>
							<view class="w33 mt10">
								<view class="gray4">{{$t('trade.price_lose')}}</view>
								<view class="mt5 ft14">{{ item.stop_loss_price || '0.0000' | toFixed4 }}</view>
							</view>
						<!-- </view>
						<view class="mr10 flex1 tc"> -->
							<view class="w33 tc mt10">
								<view class="gray4">{{$t('trade.money')}}</view>
								<view class="mt5 ft14">{{ item.caution_money || '0.0000' | toFixed4 }}</view>
							</view>
							<view class="w33 tr mt10">
								<view class="gray4">{{$t('trade.geye_fee')}}</view>
								<view class="mt5 ft14">{{ item.overnight_money || '0.0000' | toFixed4 }}</view>
							</view>
						<!-- </view>
						<view class="flex1 tr"> -->
							<view class="w33 mt10">
								<view class="gray4">{{$t('trade.fee')}}</view>
								<view class="mt5 ft14">{{ item.trade_fee || '0.0000' | toFixed4 }}</view>
							</view>
							
							<view class="w33 tc mt10">
								<view class="gray4">{{$t('trade.time_start')}}</view>
								<view class="mt5">{{ item.time }}</view>
							</view>
						<!-- </view> -->
					</view>
					<!-- 按钮 -->
					<view class="flex tr mt15 jsend">
						<view class="bgBlue ptb10 plr15 white radius4" @tap="loss(item,index)">{{$t('lever.setys')}}</view>
						<view class="bgBlue ptb10 plr15 white radius4 ml10" @tap="closes(item.id,index)">{{$t('trade.pingcang')}}</view>
					</view>
				</view>
			
		</view>
		<view class="tc ptb30" v-if="orderList.length == 0">
			<image src="/static/image/nodata.png" class="h50 wt50"></image>
			<view class="gray7">{{$t('home.norecord')}}</view>
		</view>
		<view class="tc gray7 ptb20" v-show="isBottom">{{$t('home.loading')}}...</view>
		<view class="tc gray7 ptb20" v-show="!hasMore && orderList.length > 10">{{$t('home.nomore')}}</view>
		<!-- 平仓弹窗 -->
		<uni-popup :show="closeTrades.closeTradeShow" @hidePopup="hideBtn" @comfirmPopup="comfirmClose" :msg="closeTrades.title" :lang="langs">
			<view class="uni-common-mt flex1 ft16">{{$t('trade.confrim_ping')}}</view>
		</uni-popup>
		<!-- 设置止盈止损 -->
		<uni-popup :show="lossData.shows" @hidePopup="hideBtn" @comfirmPopup="lossClose" :msg="lossData.title" :lang="langs">
			<view class="uni-common-mt flex1 ft16">
				<view class="flex alcenter">
					<view class="ft13">
						{{$t('lever.price_zhiying')}}：
					</view>
					<view class="gray3">
						<uni-number-box class="gray3" :value="lossData.profitPrice" :max="100000000000000" @change="profitChange" />
					</view>
				</view>
				<view class="ft13 mt20 tc">
					{{$t('lever.profit')}}：{{lossData.expectedProfit || '0.00' | toFixed2}}
				</view>
				<view class="flex alcenter mt10">
					<view class="ft13">
						{{$t('lever.price_lose')}}：
					</view>
					<view class="gray3">
						<uni-number-box class="gray3" :value="lossData.lossPrice" :max="100000000000000" @change="lossChange" />
					</view>
				</view>
				<view class="ft13 mt20 tc">
					{{$t('lever.lose')}}：{{lossData.expectedLoss || '0.00'|toFixed2}}
				</view>
			</view>
		</uni-popup>
		<!-- 一键平仓 -->
		<uni-popup :show="allClose.shows" @hidePopup="hideBtn" @comfirmPopup="totalCloses" :msg="allClose.title" :lang="langs">
			<view class="uni-common-mt flex1 ft16 flex ">
				<view class="ptb5 plr10 radius6 ft13" :class="closeType==0?'bgBlue white':'bor2 blue2'" @tap="closeType=0">{{$t('lever.all_ping')}}</view>
				<view class="ml10 ptb5 plr10 radius6 ft13" :class="closeType==1?'bgGreen white':'green bor3'" @tap="closeType=1">{{$t('lever.duo_ping')}}</view>
				<view class="ml10 ptb5 plr10 radius6 ft13" :class="closeType==2?'bgRed white':'red bor4'" @tap="closeType=2">{{$t('lever.kong_ping')}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniIcon from '../../components/uni-icon.vue';
import uniPopup from '@/components/uni-popup.vue';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
import {mapState} from 'vuex'
export default {
	components: {
		uniIcon,
		uniPopup,
		uniNumberBox
	},
	data() {
		return {
			risk: '0.00',
			totalRisk: '0.00',
			legalId: '',
			currencyId: '',
			orderList: [],
			page: 1,
			// 平仓弹窗
			closeTrades: {
				closeTradeShow: false,
				title: '',
				orderId: '',
				indexs: ''
			},
			isBottom:false,
			hasMore:true,
			lossData:{
				shows:false,
				title:this.$t('lever.setys'),
				datas:{},
				expectedProfit:'0.00',
				expectedLoss:"0.00",
				lossPrice:'',
				profitPrice:'',
				indexs:""
			},
			allClose:{
				shows:false,
				title:this.$t('trade.confrim_ping'),
			},
			closeType:0,
			langs:''
		};
	},
	filters: {
		toFixed2: function(value) {
			value = Number(value);
			return value.toFixed(2);
		},
		toFixed4: function(value) {
			value = Number(value);
			return value.toFixed(4);
		}
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title:this.$t('trade').all_delegate
		})
		var that = this;
		if (e.legalId) {
			that.legalId = e.legalId;
			that.currencyId = e.currencyId;
		}
	},
	onShow() {
		var that = this;
		that.orderList = [];
		that.$utils.setThemeTop(that.theme);
		that.init();
		that.langs = uni.getStorageSync('lang') || 'en';
	},
	onHide() {},
	computed:{
	   ...mapState(['theme']),
	},
	methods: {
		init() {
			var that = this;
			that.$utils.initDataToken(
				{
					url: 'lever/dealall',
					type: 'POST',
					data: {
						legal_id: that.legalId,
						currency_id: that.currencyId,
						page: that.page
					}
				},
				res => {
					console.log(res);
					if (res.order.data.length > 0) {
						that.orderList = that.orderList.concat(res.order.data);
						if(that.page == 1){
							that.orderTrade();
						}
					}
				}
			);
		},
		// 平仓
		closes(ids, indexs) {
			var that = this;
			that.closeTrades.orderId = ids;
			that.closeTrades.indexs = indexs;
			that.closeTrades.closeTradeShow = true;
		},
		hideBtn() {
			var that = this;
			that.closeTrades.closeTradeShow = false;
			that.lossData.shows = false;
			that.allClose.shows = false;
		},
		comfirmClose() {
			var that = this;
			that.closeTrades.closeTradeShow = false;
			that.$utils.initDataToken(
				{
					url: 'lever/close',
					type: 'POST',
					data: {
						id: that.closeTrades.orderId
					}
				},
				res => {
					that.$utils.showLayer(res);
					that.$socket.closeSocket();
					that.orderTrade();
					setTimeout(function() {
						that.closeTrades.orderId = '';
						that.orderList.splice(that.closeTrades.indexs, 1);
					}, 1000);
				}
			);
		},
		// 设置止盈止损
		loss(options,indexs){
			var that = this;
			that.lossData.datas = options;
			that.lossData.shows = true;
			that.lossData.indexs = indexs;
			if(options.target_profit_price > 0){
				that.lossData.profitPrice = Number(options.target_profit_price);
				if(options.type == 1){
					if(that.lossData.profitPrice > options.price){
						that.lossData.expectedProfit = (that.lossData.profitPrice - options.price) * options.share;
					}else {
						that.lossData.expectedProfit = '0.00';
					}
					
				}else{
					if(options.price > that.lossData.profitPrice){
						that.lossData.expectedProfit = (options.price -that.lossData.profitPrice) * options.share;
					}else{
						that.lossData.expectedProfit = '0.00'
					}
					
				}
			}else{
				that.lossData.profitPrice = Number(options.update_price);
			}
			if(options.stop_loss_price > 0){
				that.lossData.lossPrice = Number(options.stop_loss_price);
				if(options.type == 1){
					if(options.price > that.lossData.lossPrice){
						that.lossData.expectedLoss = (options.price -that.lossData.lossPrice) * options.share;
					}else{
						that.lossData.expectedLoss = '0.00'
					}
					
				}else{
					if(that.lossData.lossPrice > options.price){
						that.lossData.expectedLoss = (that.lossData.lossPrice -options.price) * options.share;
					}
					
				}
				 
			}else{
				that.lossData.lossPrice =Number(options.update_price);
			}
			console.log(options,that.lossData);
			
		},
		profitChange(value){
			var that = this;
			that.lossData.profitPrice = value;
			if(that.lossData.datas.type == 1){
				if(that.lossData.profitPrice > that.lossData.datas.price){
					that.lossData.expectedProfit = (that.lossData.profitPrice - that.lossData.datas.price) * that.lossData.datas.share;
				}else{
					that.lossData.expectedProfit = '0.00';
				}
				
			}else{
				if(that.lossData.datas.price > that.lossData.profitPrice){
					that.lossData.expectedProfit = (that.lossData.datas.price -that.lossData.profitPrice) * that.lossData.datas.share;
				}else{
					that.lossData.expectedProfit ='0.00';
				}
				
			}
			
		},
		lossChange(value){
			var that = this;
			that.lossData.lossPrice = value;
			if(that.lossData.datas.type == 1){
				if(that.lossData.datas.price > that.lossData.lossPrice){
					that.lossData.expectedLoss = (that.lossData.datas.price -that.lossData.lossPrice) * that.lossData.datas.share;
				}else{
					that.lossData.expectedLoss = '0.00';
				}
				
			}else{
				if(that.lossData.lossPrice > that.lossData.datas.price){
					that.lossData.expectedLoss = (that.lossData.lossPrice - that.lossData.datas.price) * that.lossData.datas.share;
				}else{
					that.lossData.expectedLoss = '0.00';
				}
				
			}
		},
		lossClose(){
			var that = this;
			// if(that.lossData.datas.type == 1){
			// 	if(that.lossData.expectedProfit == 0){
			// 		that.$utils.showLayer('设置的止盈价需要高于开仓价');
			// 		return false;
			// 	}
			// 	if(that.lossData.expectedLoss == 0){
			// 		that.$utils.showLayer('设置的止损价不能高于开仓价');
			// 		return false;
			// 	}
			// }else{
			// 	
			// }
			that.$utils.initDataToken(
				{
					url: 'lever/setstop',
					type: 'POST',
					data: {
						id: that.lossData.datas.id,
						target_profit_price: that.lossData.profitPrice,
						stop_loss_price: that.lossData.lossPrice
					}
				},
				res => {
					that.lossData.shows = false;
					that.$utils.showLayer(res);
					that.orderList[that.lossData.indexs].target_profit_price = that.lossData.profitPrice;
					that.orderList[that.lossData.indexs].stop_loss_price = that.lossData.lossPrice;
				}
			);
			
			
		},
		
		//一键平仓
		totalCloses(){
			var that = this;
			that.$utils.initDataToken(
				{
					url: 'lever/batch_close',
					type: 'POST',
					data: {
						type: that.closeType
					}
				},
				res => {
					that.allClose.shows = false;
					that.$utils.showLayer(res);
					that.page=1;
					that.orderList = [];
					that.that.init();
					
				}
			);
		},
		onPullDownRefresh() {
			this.page = 1;
			this.init();
		},
		onReachBottom() {
			if (!this.hasMore) return;
			this.page++;
			this.init();
		},
		// 订单socket
		orderTrade(){
			var that = this;
			var tokens = uni.getStorageSync('token')
			that.$socket.listenFun([{event: "login", params: tokens},{event: "sub",params: "lever_trade"},{event: "sub",params: "lever_closed"}],(res)=>{
				// that.$socket.listenFun([{event: "login", params: tokens}],(res)=>{
				let msg = JSON.parse(res);
				var datas = that.orderList;
				if (msg.type == "lever_trade") {
					var data1= msg.trades_all;
					if(that.legalId == msg.legal_id){
						that.risk= msg.hazard_rate;
						that.totalRisk=msg.profits_all;
					}
					data1.forEach((item,index)=>{
						datas.forEach((itm,inx)=>{
							if(itm.currency == item.currency && itm.legal == item.legal &&item.id == itm.id){
								that.orderList.splice(inx, 1, item);
							}
						})
					})
				}
				if(msg.type == "lever_closed"){
					var data2 = msg.id;
					data2.forEach((item,index)=>{
						datas.forEach((itm,inx)=>{
							if(item == itm.id){
								that.orderList.splice(inx, 1);
							}
						})
					})
				}
				
			})
		}
	}
};
</script>

<style>
	.uni-input-input{
		color: #333;
	}
</style>
