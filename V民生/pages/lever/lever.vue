<template>
	<view class="" :class="{'light':theme=='light'}">
		<!-- 头部状态栏 -->
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="header bgHeader fixed flex alcenter between plr15">
			<view class="flex alcenter" @tap="leftStatus = true">
				<image src="../../static/image/list.png" mode="aspectFit" class="wt20 h20"></image>
				<view class="ml10 ft14">{{ currencyName }}/{{ legalName }}</view>
			</view>
			<view>
				<image src="../../static/image/datamap.png" mode="aspectFit" class="wt20 h20" @tap="linkKline"></image>
				<image src="../../static/image/record1.png" mode="aspectFit" class="wt20 h20 ml10" @tap="linkLever"></image>
			</view>
		</view>
		<view class="pt50">
			<view class="flex between plr15 pb10 mt10 bgPart pt10">
				<view class="content-left">
					<view class="content-left-header posRelt flex between bggray overxy">
						<view class="bggray h35 lh35 flex1 tc" :class="leverTradeType == 'buy' ? 'bgGreen white' : ''" @tap="tradeType('buy')">{{$t('trade.buy')}}</view>
						<view class="bor  abstrot mt5 bgPart"></view>
						<view class="bggray h35 lh35 flex1 tc" :class="leverTradeType == 'sell' ? 'bgRed white' : ''" @tap="tradeType('sell')">{{$t('trade.sell')}}</view>
					</view>
					<view class="flex alcenter between mt10">
						<view class="flex alcenter between bor1 flex2 h30  pr5" @tap="tradeTypes.shows = true">
							<view class="flex1 tc">{{ priceStatus == 1 ? $t('trade.shi') : $t('trade.limit') }}</view>
							<image src="../../static/image/pull.png" mode="aspectFit" class="wt15 h15 "></image>
						</view>
						<view class="flex1 h30 ml5">
							<view class="bor1 h30 flex alcenter between pr5" @tap="mults.shows = true">
								<text class="flex1 tc">{{ leverOrder.mult }}X</text>
								<image src="../../static/image/pull.png" mode="aspectFit" class="wt15 h15  "></image>
							</view>
						</view>
					</view>
					<view class="bor1 h35 flex alcenter mt15 radius6 pl10">
						<input type="text" :class="priceStatus == 1 ? 'color1' : ''" v-model="priceValue" :disabled="priceStatus == 1 ? true : false" />
					</view>
					<view class="mt10">{{ leverOrder.shareNUm | toFixed2 }}{{ currencyName }}</view>
					<view class="mt10 ft14">
						<view class="">{{$t('trade.handnum')}}</view>
						<view class="flex between alcenter mt10">
							<view class="bor1 h30 flex alcenter pl10">
								<!-- <input type="number" v-model="leverOrder.share" :placeholder="$t('trade.p_handnum')" /> -->
								<input type="number" v-model="leverOrder.share" />
							</view>
							<view class="" v-if="multShare.share&&multShare.share.length > 0" @tap="shares.shows=true">
								<view class="bor1 h30 flex alcenter between plr8 ml5">
									<text>{{ leverOrder.share }}</text>
									<image src="../../static/image/pull.png" mode="aspectFit" class="wt15 h15  ml10"></image>
								</view>
							</view>
							
						</view>
					</view>
					<view class="mt20 ft14">{{$t('trade.balance')}}：{{ leverBalance | toFixed4 }}{{ legalName }}</view>
					<view class="btns h35 flex jscenter alcenter mt15" :class="leverTradeType == 'buy' ? 'bgGreen' : 'bgRed'" @tap="submits">
						<view class="flex1 tc white">{{ leverTradeType == 'buy' ? $t('trade.buy_duo') : $t('trade.sell_kong') }}</view>
					</view>
				</view>
				<view class="content-right flex column ml10">
					<view class="flex between">
						<!-- <view class="">{{$t('trade.pankou')}}</view> -->
						<view class="">{{$t('trade.price')}}</view>
						<view class="">{{$t('trade.num')}}</view>
					</view>
					<view class="flex1 flex column">
						<view v-for="(item, index) in sellList" :key="index" class="flex between flex1 alcenter" v-if="index < 5">
							<!-- <view class="">{{ 5 - index }}</view> -->
							<view class="red" v-if="item[0] >=0">{{item[0] | toFixed4}}</view>
							<view class="red" v-else>{{item[0]}}</view>
							<view v-if="item[1] >=0">{{item[1] | toFixed2}}</view>
							<view v-else>{{item[1]}}</view>
							<!-- <view class="">{{ item[1] |toFixed2 }}</view> -->
						</view>
					</view>
					<view class="">
						<view class="red2 ft18">{{ newPrice | toFixed4 }}</view>
						<!-- <view class="mt5">≈{{ (newPrice * cny) | toFixed4 }}CNY</view> -->
					</view>
					<view class="flex1 flex column">
						<view v-for="(item, index) in buyList" :key="index" class="flex between flex1 alcenter" v-if="index < 5">
							<!-- <view class="">{{ index + 1 }}</view> -->
							<view class="green" v-if="item[0] >=0">{{item[0] | toFixed4}}</view>
							<view class="green" v-else>{{item[0]}}</view>
							<view v-if="item[1] >=0">{{item[1] | toFixed2}}</view>
							<view v-else>{{item[1]}}</view>
							<!-- <view class="green">{{ item[0] | toFixed4}}</view>
							<view class="">{{ item[1] |toFixed2 }}</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bggray h10"></view>
		<!-- 当前委托列表 -->
		<view class="lever-order pt10 pb15 bgPart">
			<view class="flex between plr15">
				<view class="ft16">{{$t('trade.delegate')}}</view>
				<view class="flex" @tap="totalOrder">
					<image src="../../static/image/record1.png" mode="aspectFit" class="wt20 h20"></image>
					<view class="ml10 ft14">{{$t('trade.chicang')}}</view>
				</view>
			</view>
			<view class="mt10">
				<view class="flex between">
					<view class="flex1 tc ml5">{{$t('trade.types')}}</view>
					<view class="flex2 tc">{{$t('trade.time')}}</view>
					<view class="flex2 tc">{{$t('trade.price')}}</view>
					<view class="flex1 tc">{{$t('trade.amout')}}</view>
					<view class="flex1 tc mr10 ml10">{{$t('trade.operate')}}</view>
				</view>
				<view class="" v-if="orderList.length > 0">
					<view v-for="(item, index) in orderList" :key="index" class="flex between alcenter mt10">
						<view class="flex1 tc ml5">{{ item.type==1?$t('trade.buy'):$t('trade.sell') }}</view>
						<view class="flex2 tc">{{ item.time }}</view>
						<view class="flex2 tc">{{ item.price || '0.0000' | toFixed4 }}</view>
						<view class="flex1 tc">{{ item.number || '0.00' | toFixed2 }}</view>
						<view class="flex1 tc bgBlue mr10 pt5 pb5 radius4 ml10 white" @tap="closeTrade(item.id)">{{$t('trade.pingcang')}}</view>
					</view>
				</view>
				<view class="tc mt40 pb20" v-if="orderList.length == 0">
					<image src="../../static/image/anonymous.png" mode="aspectFit" class="wt80 h80"></image>
					<view class="tc">{{$t('home.norecord')}}</view>
				</view>
			</view>
		</view>
		<view class="bottom-space"></view>

		<!-- 头部左边币种列表内容 -->
		<view class="header-left">
			<uni-drawer :visible="leftStatus" @close="leftStatus = false" v-if="quotationList.length > 0">
				<view class="flex column ht100">
					<view class="tr mt10 mr10"><uni-icon size="30" type="arrowthinright" @tap="leftStatus = false"></uni-icon></view>
					<view class="flex plr10 mt10">
						<view class="flex1 tc pb10" :class="legalIds == item.id ? 'bdb_blue' : ''" v-for="(item, index) in quotationList" :key="index" @tap="selectedLegal(item.id)">
							{{ item.name }}
						</view>
					</view>
					<view v-if="quotationList.length > 0" class="pb50 flex1" style="overflow-y: scroll; ">
						<view class="bor5" v-for="(item, index) in quotationList[legalIndex].quotation" :key="index">
							<view
								class="flex between plr10 ptb20"
								v-if="item.is_display == 1"
								:class="legalId == item.legal_id && currencyId == item.currency_id ? 'bggray' : ''"
								@tap="selectCurrency(item)"
							>
								<view class="color1">{{ item.currency_name }}</view>
								<view :class="item.change < 0 ? 'red' : 'green'">{{ item.now_price || '0.00' }}</view>
								<view :class="item.change < 0 ? 'red' : 'green'">{{ item.change || '0.00' }}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-drawer>
		</view>
		<!-- 下单弹窗 -->
		<uni-popup :show="showModal" @hidePopup="hideBtn" @comfirmPopup="confirmBtn" :msg="title" :btnShow="tipbtnShow" :key="timer" :lang="langs">
			<view class="uni-common-mt show-content flex1">
				<view class="container ft14">
					<view class="">{{ currencyName }}/{{ legalName }}</view>
					<view class="flex between mt10">
						<view class="ft14">{{$t('trade.types')}}</view>
						<view class="ft14">{{ leverTradeType == 'buy' ? $t('trade.duo') :$t('trade.kong') }}</view>
					</view>
					<view class="flex between mt10">
						<view class="ft14">{{$t('trade.hands')}}</view>
						<view class="ft14">{{ leverOrder.share }}</view>
					</view>
					<view class="flex between mt10">
						<view class="ft14">{{$t('trade.times')}}</view>
						<view class="ft14">{{ leverOrder.mult }}</view>
					</view>
					<view class="flex between mt10">
						<view class="ft14">{{$t('trade.fee')}}</view>
						<view class="ft14">{{ leverOrder.fees }}</view>
					</view>
					<view class="flex between mt10">
						<view class="ft14">{{$t('trade.money')}}</view>
						<view class="ft14">{{ leverOrder.bonds }}</view>
					</view>
					<!-- <view class="mt10 lever-password bor6 ptb10 pl10">
						<input type="text" class="gray3" password v-model="leverOrder.passwords" :placeholder="$t('login.e_pdeal')" />
					</view> -->
				</view>
			</view>
		</uni-popup>
		<!-- 平仓弹窗 -->
		<uni-popup :show="closeTrades.closeTradeShow" @hidePopup="hideBtn" @comfirmPopup="comfirmClose" :msg="closeTrades.title" :key="timers" :lang="langs">
			<view class="uni-common-mt flex1 ft16">{{$t('trade.confrim_ping')}}？</view>
		</uni-popup>
		<!-- 交易类型 -->
		<uni-popup :show="tradeTypes.shows" @hidePopup="hideBtn" :type="tradeTypes.types" :btnShow="false" :bgColor="false" :lang="langs">
			<view class="uni-common-mt w100 gray7">
				<view class="flex1 ft14 w100  flex alcenter jscenter bdb_1e ptb15 bgPart" @tap="priceTab(1)">{{$t('trade.shi')}}</view>
				<view class="flex1 ft14 w100  flex alcenter jscenter ptb15 bgPart" @tap="priceTab(0)">{{$t('trade.limit')}}</view>
				<view class="flex1 ft14 w100  flex alcenter jscenter ptb15 mt10 bgPart" @tap.stop="hideBtn">{{$t('trade.cancel')}}</view>
			</view>
		</uni-popup>
		<!-- 倍数弹窗 -->
		<uni-popup :show="mults.shows" @hidePopup="hideBtn" :type="mults.types" :btnShow="false" :bgColor="false" :lang="langs">
			<view class="uni-common-mt w100 gray7">
				<view class="flex1 ft14 w100  flex alcenter jscenter bdb_1e ptb15 bgPart" v-for="(item, index) in multShare.muit" :key="index" @tap="selectmult(item.value)">
					{{ item.value }}X
				</view>
				<view class="flex1 ft14 w100  flex alcenter jscenter ptb15 mt10 bgPart" @tap.stop="hideBtn">{{$t('trade.cancel')}}</view>
			</view>
		</uni-popup>
		<!-- 手数弹窗 -->
		<uni-popup :show="shares.shows" @hidePopup="hideBtn" :type="shares.types" :btnShow="false" :bgColor="false" :lang="langs">
			<view class="uni-common-mt w100 gray7">
				<view class="flex1 ft14 w100  flex alcenter jscenter bdb_1e ptb15 bgPart" v-for="(item, index) in multShare.share" :key="index" @tap="selectShare(item.value)">
					{{ item.value }}
				</view>
				<view class="flex1 ft14 w100  flex alcenter jscenter ptb15 mt10 bgPart" @tap.stop="hideBtn">{{$t('trade.cancel')}}</view>
			</view>
		</uni-popup>
		<view class="h50">
			
		</view>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer.vue';
import uniIcon from '../../components/uni-icon.vue';
import uniPopup from '@/components/uni-popup.vue';
import {mapState} from 'vuex'
export default {
	components: {
		uniDrawer,
		uniIcon,
		uniPopup
	},
	data() {
		return {
			leftStatus: false,
			legalId: '',
			legalIds: '',
			legalName: '',
			currencyId: '',
			currencyName: '',
			leverTradeType: 'buy',
			priceValue: this.$t('trade.best'),
			priceStatus: 1,
			quotationList: [],
			legalIndex: 0,
			currencyIndex: 0,
			linkStatus: false,
			minShare:0,
			maxShare:0,
			leverOrder: {
				shareNUm: 0,
				mult: 0,
				share: '',
				fee: '',
				spread: '',
				fees: '',
				bonds: '',
				passwords: '',
				marketPrice: ''
			},
			multShare: {},
			leverBalance: '0',
			sellList: [
				['--', '--'], ['--', '--'], ['--', '--'], ['--', '--'],['--', '--']
			],
			buyList: [
				['--', '--'], ['--', '--'], ['--', '--'], ['--', '--'],['--', '--']
			],
			newPrice: 0,
			cny: 1,
			orderList: [],
			showModal: false,
			tipbtnShow: true,
			title: this.$t('trade.confrim_order'),
			// 平仓弹窗
			closeTrades: {
				closeTradeShow: false,
				title: '',
				orderId: ''
			},
			tradeTypes: {
				shows: false,
				types: 'bottom'
			},
			mults: {
				shows: false,
				types: 'bottom'
			},
			shares: {
				shows: false,
				types: 'bottom'
			},
			timer:'',
			timers:'',
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
		var that = this;
		if (e.legalId) {
			that.legalId = e.legalId;
			that.currencyId = e.currencyId;
			that.linkStatus = true;
			
			// uni.getStorageSync('token', 'bc3aac867b2a3e239d9639bf6a687071');
		}
	},
	onPullDownRefresh() {
		this.init(); 
	},
	onShow() {
		var that = this;
		that.init();
		that.getTime();
		that.priceValue=this.$t('trade.best');
		that.langs = uni.getStorageSync('lang') || 'en';
		that.$utils.setThemeTop(that.theme);
		that.$utils.setThemeBottom(that.theme);
	},
	onHide() {
		this.$socket.closeSocket();
	},
	computed:{
	   ...mapState(['theme']),
	},
	methods: {
		getTime(){
			var that = this;
			that.timer = new Date().getTime();
			that.timers = new Date().getTime()+1000;
			// that.langs = uni.getStorageSync('lang') || 'hk';
		},
		shows() {
			return;
		},
		init() {
			var that = this;
			if (!that.linkStatus) {
				if (uni.getStorageSync('leverOrder')) {
					var leverOrderData = JSON.parse(uni.getStorageSync('leverOrder'));
					that.legalId = leverOrderData.legalId;
					that.currencyId = leverOrderData.currencyId;
				}
			}
			that.$utils.initDataToken({ url: 'currency/quotation_new' }, res => {
				uni.stopPullDownRefresh();
				if (res.length > 0) {
					var datas = res.filter(function(item, index) {
						return item.is_display == 1&&item.is_lever == 1;
					});

					that.quotationList = datas;
					console.log(that.quotationList);
					if (that.legalId) {
						that.legalIds = that.legalId;
						datas.forEach(function(item, index) {
							if (that.legalId == item.id) {
								that.legalName = item.name;
								that.legalIndex = index;
								console.log(item);
								var data1 = item.quotation;
								console.log(data1);
								var lists = data1.filter(function(items, index) {
									return items.is_display == 1;
								});
								if (lists.length > 0) {
									lists.forEach(function(itm, inx) {
										if (that.currencyId == itm.currency_id) {
											that.currencyIndex = inx;
											that.currencyName = itm.currency_name;
											that.leverOrder.shareNUm = itm.lever_share_num;
											that.leverOrder.spread = itm.spread;
											that.leverOrder.fee = itm.lever_trade_fee;
											that.handicap();
											that.deals();
											return false;
										}
									});
								}
							}
						});
					} else {
						var list = datas[0].quotation.filter(function(item, index) {
							return item.is_display == 1;
						});
						that.legalName = datas[0].name;
						that.legalId = datas[0].id;
						that.currencyId = list[0].currency_id;
						that.currencyName = list[0].currency_name;
						that.leverOrder.shareNUm = list[0].lever_share_num;
						that.leverOrder.spread = list[0].spread;
						that.leverOrder.fee = list[0].lever_trade_fee;
						that.legalIds = datas[0].id;
						that.handicap();
						that.deals();
					}
				}
			});
		},
		deals() {
			var that = this;
			that.$utils.initDataToken({ url: 'lever/deal', type: 'POST', data: { legal_id: that.legalId, currency_id: that.currencyId } }, res => {
				
				that.multShare = res.multiple;
				that.buyList = [['--', '--'], ['--', '--'], ['--', '--'], ['--', '--'],['--', '--']];
				that.sellList = [['--', '--'], ['--', '--'], ['--', '--'], ['--', '--'],['--', '--']];
				that.minShare = res.lever_share_limit.min;
				that.maxShare = res.lever_share_limit.max;
				that.cny = res.ExRAte;
				that.newPrice = res.last_price;
				if (res.multiple.muit.length > 0) {
					that.leverOrder.mult = res.multiple.muit[0].value;
				}
				if(res.multiple.share.length > 0){
					that.leverOrder.share = res.multiple.share[0].value;
				}
				that.orderList = res.my_transaction;
				that.leverBalance = res.user_lever;
			});
		},
		// 交易类型切换
		tradeType(vals) {
			var that = this;
			that.leverTradeType = vals;
			that.leverOrder.share = '';
		},
		// 价格类型切换
		priceTab(vals) {
			var that = this;
			that.priceStatus = vals;
			that.tradeTypes.shows = false;
			if (vals == 1) {
				that.priceValue = this.$t('trade.best');
			} else {
				that.priceValue = (that.newPrice - 0).toFixed(4);
			}
		},
		selectmult(vals) {
			var that = this;
			that.leverOrder.mult = vals;
			that.mults.shows = false;
		},
		// 选择手数
		selectShare(vals) {
			var that = this;
			that.leverOrder.share = vals;
			that.shares.shows = false;
		},
		// 下单计算
		calculation(prices) {
			// 价格+或者-点差  * 手数 * 每手数量  /倍数
			var that = this;
			var spreadPrices = parseFloat((prices * that.leverOrder.spread) / 100);
			var pricesTotal = 0;
			if (that.leverTradeType == 'sell') {
				pricesTotal = parseFloat(prices - spreadPrices);
			} else {
				pricesTotal = parseFloat(prices + spreadPrices);
			}
			var shareNum = parseFloat(that.leverOrder.shareNUm);//每手数量
			var totalPrice = parseFloat(pricesTotal * that.leverOrder.share * shareNum);//保证金
			that.leverOrder.bonds = parseFloat((totalPrice - 0) / (that.leverOrder.mult - 0)).toFixed(4);
			that.leverOrder.fees = parseFloat((totalPrice * that.leverOrder.fee) / 100).toFixed(4);//合约市值
			that.leverOrder.marketPrice = parseFloat(pricesTotal * that.leverOrder.share * shareNum).toFixed(4);
		},
		// 下单
		submits() {
			var that = this;
			if (!that.leverOrder.mult) {
				that.$utils.showLayer(this.$t('trade.p_times'));
				return false;
			}
			if (!that.leverOrder.share) {
				that.$utils.showLayer(this.$t('trade.p_hands'));
				return false;
			}
			if (that.priceStatus == 0) {
				console.log(that.priceValue,123)
				if (!that.priceValue) {
					that.$utils.showLayer(this.$t('trade.p_delprice'));
					return false;
				} else {
					that.calculation(that.priceValue);
				}
			} else {
				that.calculation(that.newPrice);
			}
			if(that.leverOrder.share < that.minShare){
				that.$utils.showLayer(this.$t('trade.p_notless')+that.minShare);
				return false;
			}
			if(that.leverOrder.share > that.maxShare){
				that.$utils.showLayer(this.$t('trade.p_notmore')+that.maxShare);
				return false;
			}

			that.showModal = true;
			that.shows = false;
			that.title = that.$t('trade.confrim_order');
			that.getTime();
			that.leverOrder.passwords = '';
		},
		// 取消弹窗
		hideBtn() {
			var that = this;
			that.showModal = false;
			that.closeTrades.closeTradeShow = false;
			that.shows = true;
			that.tradeTypes.shows = false;
			that.mults.shows = false;
		},
		// 确定下单
		confirmBtn() {
			var that = this;
			// if (!that.leverOrder.passwords) {
			// 	that.$utils.showLayer(this.$t('login.e_pdeal'));
			// 	return false;
			// }
			that.showModal = false;
			that.$utils.initDataToken(
				{
					url: 'lever/submit',
					type: 'POST',
					data: {
						share: that.leverOrder.share,
						multiple: that.leverOrder.mult,
						legal_id: that.legalId,
						currency_id: that.currencyId,
						type: that.leverTradeType == 'buy' ? 1 : 2,
						status: that.priceStatus,
						target_price: that.priceValue,
						password: that.leverOrder.passwords
					}
				},
				res => {
					that.$utils.showLayer(res);
					setTimeout(function() {
						if(that.priceStatus == 0){
							uni.navigateTo({
								url: 'leverList'
							});
						}else{
							uni.navigateTo({
								url: 'orderList?legalId='+that.legalId+'&currencyId='+that.currencyId
							});
						}
						
					}, 1000);
				}
			);
		},
		// 选择法币
		selectedLegal(ids) {
			var that = this;
			that.legalIds = ids;
			for (var i = 0; i < that.quotationList.length; i++) {
				if (that.quotationList[i].id == ids) {
					that.legalIndex = i;
				}
			}
		},
		// 选择交易对
		selectCurrency(options) {
			var that = this;
			that.$socket.closeSocket();
			that.legalName = options.legal_name;
			that.legalId = options.legal_id;
			that.currencyId = options.currency_id;
			that.currencyName = options.currency_name;
			that.leverOrder.shareNUm = options.lever_share_num;
			that.leverOrder.spread = options.spread;
			that.leverOrder.fee = options.lever_trade_fee;
			that.legalIds = options.legal_id;
			that.leftStatus = false;
			var data = {
				legalId: that.legalId,
				currencyId: that.currencyId
			};
			uni.setStorageSync('leverOrder', JSON.stringify(data));
			that.handicap();
			that.deals();
		},
		// 平仓弹窗
		closeTrade(ids) {
			var that = this;
			that.closeTrades.orderId = ids;
			that.closeTrades.closeTradeShow = true;
			that.getTime();
			that.shows = false;
		},
		// 确定平仓
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
					setTimeout(function() {
						that.closeTrades.orderId = '';
						that.deals();
					}, 1000);
				}
			);
		},
		// 跳转k线
		linkKline() {
			var that = this;
			var symbols = that.currencyName + '/' + that.legalName;
			uni.navigateTo({
				url: '/pages/market/kline?legal_id=' + that.legalId + '&currency_id=' + that.currencyId + '&symbol=' + symbols
			});
		},
		// 跳转合约订单记录
		linkLever() {
			var that = this;
			uni.navigateTo({
				url: 'leverList'
			});
		},
		// 跳转全部委托
		totalOrder() {
			var that = this;
			uni.navigateTo({
				url: 'orderList?legalId='+that.legalId+'&currencyId='+that.currencyId
			});
		},
		bindChange() {},
		// 盘口socket
		handicap(){
			var that = this;
			 var tokens = uni.getStorageSync('token')
			var symbols = that.currencyName + '/' + that.legalName;
			var str = 'market_depth.'+symbols;
			
			var datas = {}
			// that.$socket.listenFun([{event: "login", params: tokens},{event: "sub",params: str},{event: "sub",params: "lever_trade"}],(res)=>{
			//     console.log(res);
			// })
			var  socket=this.$socketio(this.$socket_api);
			socket.emit('login',tokens);
			socket.on('market_depth', msg=>{	
				console.log("执行");
				if(msg.currency_id==that.currencyId&& msg.legal_id==that.legalId){					
					that.buyList = msg.bids.slice(0,5);
					that.sellList = msg.asks.slice(-5);
				}
			});
			socket.on('daymarket',msg=>{
				console.log("执行2");
				if(that.currencyId==msg.currency_id&&that.legalId == msg.legal_id){
					that.newPrice = msg.now_price;
				}
				that.quotationList.forEach((item,index)=>{
					var datas = item.quotation;
					datas.forEach((itm,inx)=>{
						if(itm.currency_id == msg.currency_id && itm.legal_id == msg.legal_id){
							return that.quotationList[index].quotation[inx].now_price = msg.now_price;
						}
					})
				})
			})
			
			  
			
			
		}
	}
};
</script>

<style>
page {
	background-color: #102030;
	width: 100.0vw;
	height: 100.0vh;
	overflow-y: scroll;
}
.content-left{
	width: 60%;
}
.content-right{
	width: 40%;
}
.content-left-header {
	height: 70upx;
	overflow: hidden;
}
.content-left-text {
	height: 70upx;
	line-height: 70upx;
	/* color: #828181; */
	/* background: #0b1823; */
	text-align: center;
}

.bor {
	width: 36upx;
	height: 140upx;
	left: calc(50% - 18upx);
	top:-50upx;
	transform: rotate(25deg);
	-ms-transform: rotate(25deg);
	-moz-transform: rotate(25deg);
	-webkit-transform: rotate(25deg);
	-o-transform: rotate(25deg);
}
.content-left-price {
	height: 72upx;
	line-height: 72upx;
	text-align: center;
}
.show-content {
	width: 88%;
}

</style>
