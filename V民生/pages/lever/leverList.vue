<template>
	<view :class="{'light':theme=='light'}">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="header bgHeader fixed flex alcenter between pr15">
			<view class="flex" @tap="backs"><uni-icons class="white mt5" type="arrowleft" size="30" /></view>
			<view class="tabs flex alcenter between ft13">
				<view :class="status == item.id ? 'blue2' : ''" v-for="item in tabs" :key="item.id" @tap="selectType(item.id)">{{ item.texts }}</view>
			</view>
		</view>
		<view class="list pt60">
			<view v-for="(item, index) in orderList" :key="index" class="plr15 bdb_1e mt10 pb10">
				<view class="flex between mb10">
					<view class="">
						<text :class="item.type == 1 ? 'green ft14' : 'red ft14'">{{ item.type == 1 ? $t('trade.buy') : $t('trade.sell') }}</text>
						<text class="ml5">{{ item.symbol }}</text>
						<text class="ml5">x{{ item.share }}{{ $t('trade.hand') }}</text>
					</view>
					<view :class="item.profits < 0 ? 'red' : 'green'">{{ item.profits || '0.0000' | toFixed4 }}</view>
				</view>
				<view class="flex wraps">
					<!-- <view class=""> -->
						<view class="w33">
							<view class="gray4">{{ status == 0 ? $t('trade.delegate_price') : $t('trade.price_cang') }}</view>
							<view class="mt5  ft14">{{ status == 0 ? item.origin_price : item.price || '0.0000' | toFixed4 }}</view>
						</view>
						<view class=" w33 tc">
							<view class="gray4">{{ $t('trade.price_zhiying') }}</view>
							<view class="mt5  ft14">{{ item.target_profit_price || '0.0000' | toFixed4 }}</view>
						</view>
						<view class=" w33 tr">
							<view class="gray4">{{ $t('trade.num_zhehe') }}</view>
							<view class="mt5  ft14">{{ item.number || '0.0000' | toFixed4 }}</view>
						</view>
					<!-- </view>
					<view class="mr10 flex1 tc"> -->
						<view class="mt10 w33">
							<view class="gray4">{{ $t('trade.price_cur') }}</view>
							<view class="mt5  ft14">{{ item.update_price || '0.0000' | toFixed4 }}</view>
						</view>
						<view class="mt10 w33 tc">
							<view class="gray4">{{ $t('trade.price_lose') }}</view>
							<view class="mt5  ft14">{{ item.stop_loss_price || '0.0000' | toFixed4 }}</view>
						</view>
						<view class="mt10 w33 tr">
							<view class="gray4">{{ $t('trade.can_money') }}</view>
							<view class="mt5  ft14">{{ item.caution_money || '0.0000' | toFixed4 }}</view>
						</view>
				<!-- 	</view>
					<view class="mr10 flex1 tc"> -->
						<view class="mt10 w33">
							<view class="gray4">{{ $t('trade.money') }}</view>
							<view class="mt5  ft14">{{ item.origin_caution_money || '0.0000' | toFixed4 }}</view>
						</view>
						
					<!-- </view>
					<view class="flex1 tr"> -->
						<view class="mt10 w33 tc">
							<view class="gray4">{{ $t('trade.fee') }}</view>
							<view class="mt5  ft14">{{ item.trade_fee || '0.0000' | toFixed4 }}</view>
						</view>
						<view class="mt10 w33 tr">
							<view class="gray4">{{ $t('trade.geye_fee') }}</view>
							<view class="mt5  ft14">{{ item.overnight_money || '0.0000' | toFixed4 }}</view>
						</view>
						<view class="mt10 ">
							<view class="gray4">{{ $t('trade.time_start') }}</view>
							<view class="mt5">{{ item.time }}</view>
						</view>
					</view>
				<!-- </view> -->
				<!-- 按钮 -->
				<view class="flex tr mt15 jsend" v-if="status == 0 || status == 1">
					<view class="bgBlue ptb10 plr15 white radius4 ml10" @tap="closes(item.id, index)">{{ status == 0 ? $t('trade.chedan') : $t('trade.pingcang') }}</view>
				</view>
			</view>
		</view>
		<view class="tc ptb30" v-if="orderList.length == 0">
			<image src="/static/image/nodata.png" class="h50 wt50"></image>
			<view class="gray7">{{ $t('home.norecord') }}</view>
		</view>
		<view class="tc gray7 ptb20" v-show="isBottom">{{ $t('home.loading') }}...</view>
		<view class="tc gray7 ptb20" v-show="!hasMore && orderList.length > 10">{{ $t('home.nomore') }}</view>
		<!-- 平仓弹窗 -->
		<uni-popup :show="closeTrades.closeTradeShow" @hidePopup="hideBtn" @comfirmPopup="comfirmClose" :msg="closeTrades.title" :lang="langs">
			<view class="uni-common-mt flex1 ft16">{{ status == 0 ? $t('trade.confrim_chedan') : $t('trade.confrim_ping') }}</view>
		</uni-popup>
	</view>
</template>
<script>
import uniIcons from '../../components/uni-icon.vue';
import uniPopup from '@/components/uni-popup.vue';
import {mapState} from 'vuex'
export default {
	components: {
		uniIcons,
		uniPopup
	},
	data() {
		return {
			uid: '',
			current: 0, //全部/历史
			popType: '', //底部弹窗
			enType: 'in', //全部委托类型
			orderList: [], //当前委托
			hisList: [], //历史委托
			page: 1,
			status: 0,
			legalId: '',
			currencyId: '',
			isBottom: false,
			hasMore: true,
			tabs: [
				{
					id: 0,
					texts: this.$t('lever.delegating')
				},
				{
					id: 1,
					texts: this.$t('lever.dealing')
				},
				// {
				// 	id:2,
				// 	texts:this.$t('lever.pingcanging')
				// },
				{
					id: 3,
					texts: this.$t('lever.hasping')
				},
				{
					id: 4,
					texts: this.$t('lever.hasback')
				}
			],
			// 平仓弹窗
			closeTrades: {
				closeTradeShow: false,
				title: '',
				orderId: '',
				indexs: ''
			},
			colors: '#ffffff',
			langs: ''
		};
	},
	filters: {
		toFixed2: function(value, options) {
			value = Number(value);
			return value.toFixed(2);
		},
		toFixed4: function(value) {
			value = Number(value);
			return value.toFixed(4);
		}
	},
	computed:{
	   ...mapState(['theme']),
	},
	onLoad() {},
	onShow() {
		this.$utils.setThemeTop(this.theme)
		this.$utils.setThemeBottom(this.theme)
		this.uid = uni.getStorageSync('uid');
		this.init();
		this.langs = uni.getStorageSync('lang') || 'en';
	},
	methods: {
		init() {
			//委托
			let that = this;
			that.$utils.initDataToken(
				{
					url: 'lever/my_trade',
					data: {
						page: that.page,
						status: that.status,
						currency_id: that.currencyId,
						legal_id: that.legalId
					},
					type: 'POST'
				},
				res => {
					var data = res.message.data;
					that.risk = res.rate_profits_total.hazard_rate;
					that.totalRisk = res.rate_profits_total.profits_total;
					console.log(data);
					uni.stopPullDownRefresh();
					that.isBottom = false;
					if (that.page == 1) {
						that.orderList = data;
					} else {
						that.orderList = that.orderList.concat(data);
					}
					if (that.status == 0 || that.status == 1) {
						that.orderTrade();
					}
					if (res.message.per_page == data.length) {
						that.hasMore = true;
					} else {
						that.hasMore = false;
					}
					console.log(that.hasMore);
				}
			);
		},
		selectType(types) {
			var that = this;
			that.status = types;
			that.orderList = [];
			that.page = 1;
			that.$socket.closeSocket();
			that.init();
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
		},
		comfirmClose() {
			var that = this;
			var urls = '';
			that.closeTrades.closeTradeShow = false;
			if (that.status == 0) {
				urls = 'lever/cancel';
			} else if (that.status == 1) {
				urls = 'lever/close';
			}
			that.$utils.initDataToken(
				{
					url: urls,
					type: 'POST',
					data: {
						id: that.closeTrades.orderId
					}
				},
				res => {
					that.$utils.showLayer(res);
					that.$socket.closeSocket();
					setTimeout(function() {
						that.closeTrades.orderId = '';
						that.orderList.splice(that.closeTrades.indexs, 1);
					}, 1000);
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
		backs() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 订单socket
		orderTrade() {
			var that = this;
			var tokens = uni.getStorageSync('token');
			var  socket=this.$socketio(this.$socket_api);
			socket.emit('login',tokens);
			socket.on('lever_trade', msg=>{
				var data1 = msg.trades_all;
				if (that.legalId == msg.legal_id) {
					that.risk = msg.hazard_rate;
					that.totalRisk = msg.profits_all;
				}
				data1.forEach((item, index) => {
					datas.forEach((itm, inx) => {
						if (itm.currency == item.currency && itm.legal == item.legal && item.id == itm.id) {
							that.orderList.splice(inx, 1, item);
						}
					});
				});
			});
		}
	}
};
</script>

<style>
.tabs {
	width: calc(100vw - 90upx);
}
</style>
