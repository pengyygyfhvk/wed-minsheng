<template>
	<view class="" :class="{ light: theme == 'light' }">
		<view class="currency  flex mtb20">
			<!-- <text :class="changeRechargeIndex==0?'currency-active':'bgPart'" @tap="changeRecharge(0)" >{{$t('assets.mentionaddr')}}</text> -->
			<!-- <text :class="changeRechargeIndex==1?'currency-active':'bgPart'" @tap="changeRecharge(1)">{{$t('store.tibank')}}</text> -->
		</view>
		<view class="ptb20 bgPart plr20">
			<view class="ft18">RMB {{ $t('assets.mention') }}</view>
			<view class="mt10">{{ $t('trade.use') }} {{ balance }} RMB</view>
		</view>
		<view class="mt10 plr20" v-if="chargeType.length > 0">
			<view class="">{{$t('bind.liantype')}}</view>
			<view class="flex mt10">
				<view
					v-for="(item, index) in chargeType"
					:key="index"
					class="mr10 ptb5 plr10 bd_input radius4"
					:class="name == item.name ? 'active' : ''"
					@tap="selectCharge(item)"
				>
					{{ item.type }}
				</view>
			</view>
		</view>
		<view class="plr20">
			<view class="mb20 mt20" v-if="changeRechargeIndex==0">
				<view class="">{{ $t('assets.mentionaddr') }}</view>
				<input type="text" v-model="address" class="bdb1f h40 w100 " :placeholder="$t('bind.p_addr')" />
			</view>
	<!-- 		<view class="mb20 mt20" v-if="changeRechargeIndex==1">
				<view class="">{{ $t('collect.no') }}</view>
				<input type="text" v-model="cardno" class="bdb1f h40 w100 "  />
			</view> -->
			<view class="mb20 mt20">
				<view class="">{{ $t('assets.txnum') }}</view>
				<view class="flex alcenter between bdb1f">
					<input type="number" class=" h40 flex1" v-model="number" @input="numberChange" :placeholder="$t('assets.minnum') + (coinInfo.min_number || '0.00')" />
					<view class="flex alcenter">
						<text class="blue ft14 pr10 bdr_white50">RMB</text>
						<view class="pl10" @tap="all">{{ $t('zdy.all') }}</view>
					</view>
				</view>
			</view>
			<view class="mb20" v-if="showMemo">
				<view class="">memo</view>
				<input type="text" class="bdb1f h40 w100" v-model="memoText" placeholder="请输入memo" />
			</view>
			<view class="mb20">
				<view class="">{{ $t('login.s_dealpwd') }}</view>
				<input type="text" password="" class="bdb1f h40 w100" v-model="password" :placeholder="$t('login.e_pdeal')" />
			</view>
			<view class="mb20 bdb1f ptb10 flex alcenter between">
				<view class="">{{ changeRechargeIndex==0?$t('assets.recivenum'):$t("zdy.dzje") }}</view>
				<view class="">{{ reciveNumber }} RMB</view>
				<!-- <view class="" v-if="changeRechargeIndex==1">${{ reciveNumber*rmb |toFxied2 }}</view> -->
			</view>
			<!-- <view class="mb20">
				<view class="">{{ $t('login.s_dealpwd') }}</view>
				<view class="flex alcenter between bdb1f">
					<input type="password" class=" h40 flex1" v-model="password" :placeholder="$t('login.e_pdeal')" />
					
				</view>
			</view> -->
			<view class="mb20">{{ $t('trade.fee') }}：{{ this.rate || '--' }}%</view>
			<view class="mb20">{{ $t('zdy.a13') }}：{{ balance  }} RMB</view>
			<!-- <view class="mb20">{{$t('zdy.a0')}}{{ $t('trade.fee') }}：{{number * coinInfo.rate /100 | toFixeds}}RMB</view> -->
			
			<view class="mt40 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="mention">{{ $t('assets.mention') }}</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			password: '',
			currency: '',
			coinInfo: {},
			rate:0,
			address: '',
			name: '',
			number: '',
			reciveNumber: '0.0',
			chargeType: [],
			contractAddress: '',
			userId: '',
			currencyName: '',
			currencyType: '',
			balance: '',
			labelText: '',
			walletData: [],
			showMemo:false,
			memoText:"",
			changeRechargeIndex:1,
			cashInfo:[],
			rmb:1,
		};
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title: this.$t('assets').mention
		});
		this.currency = e.currency;
		this.name = e.name;
		this.getCoinInfo();
		this.getBankCard()
	},
	filters:{
		toFxied2(val){
			return Number(val).toFixed(2);
		}
	},
	computed: {
		...mapState(['theme'])
	},
	onPullDownRefresh() {
		// this.getCoinInfo();
	},
	onShow() {
		this.$utils.setThemeTop(this.theme);
	},
	methods: {
		getRmbRate(){
			this.$utils.initDataToken({
				url:"wallet/getRateCurrency",
				data:{
					id:this.currency
				}
			},res=>{
				this.rmb=res.rmb;
			})
		},
		getBankCard(){
			this.$utils.initDataToken({
				url:"member/bankCard",
				type:"get",
			},res=>{
				if(!res.data.cardno){
				  uni.navigateTo({
				  	url:'/pages/mine/card'
				  })
				}else{
				  this.cashInfo=res.data;
				  this.rate = res.data.rate
				}
			})
		},
		changeRecharge(i){
			this.amount="";
			this.changeRechargeIndex=i;
			if(i==1 && !this.cashInfo.bank_account){
				this.getBankCard();
			}
		},
		getCoinInfo() {
			this.$utils.initDataToken({ url: 'member/getUserInfo', type: 'POST', data: { currency: this.currency } }, res => {
				uni.stopPullDownRefresh();
				this.currencyName = res.name;
				this.balance = res.data.usermoney;
				// this.walletData = res.wallet_data;
				if(res.make_wallet == 2){
					this.showMemo = true;
				}else{
					this.showMemo = false;
				}
				if (res.multi_protocol == 1) {
					this.chargeType = res.type_data;
					this.contractAddress = res.type_data[0].contract_address;
					this.name = res.type_data[0].name;
					this.coinInfo = res.type_data[0];
					this.currencyType = res.type_data[0].type;
					var ids = res.type_data[0].id;
					// if (res.wallet_data && res.wallet_data.length > 0) {
					// 	res.wallet_data.forEach(item => {
					// 		if (ids == item.currency) {
					// 			this.labelText = item.label;
					// 		}
					// 	});
					// }
					
				} else {
					// this.contractAddress = res.contract_address;
					this.name = res.name;
					this.coinInfo = res;
					// if (res.wallet_data && res.wallet_data.length > 0) {
					// 	this.labelText = res.wallet_data[0].label;
					// }
				}
				// this.getUserInfo();
			});
		},
		getUserInfo() {
			this.$utils.initDataToken({ url: 'user/info' }, res => {
				// this.getAddress(res.id);
				this.userId = res.id;
			});
		},
		getAddress(id) {
			this.$utils.getAddressOnline(
				{ url: 'walletMiddle/GetDrawAddress', data: { user_id: id, coin_name: this.name, contract_address: this.coinInfo.contract_address } },
				res => {
					uni.stopPullDownRefresh();
					console.log(res);
					if (res.code == 0) {
						this.address = res.data.address;
					} else {
						this.$utils.showLayer(res.errorinfo);
					}
				}
			);
		},
		all() {
			this.number = this.balance;
			this.reciveNumber = this.balance - this.coinInfo.rate<0?0:this.balance - this.coinInfo.rate;
		},
		numberChange(e) {
			// 到账数量
			this.reciveNumber = e.target.value*(100-this.rate)/100;
		},
		// 选择充币类型
		selectCharge(options) {
			var that = this;
			that.contractAddress = options.contract_address;
			that.name = options.name;
			that.coinInfo = options;
			that.currencyType = options.type;
			that.address = "";
			that.memoText = "";
			var ids = options.id;
			if (that.walletData.length > 0) {
				that.walletData.forEach(item => {
					if (ids == item.currency) {
						that.labelText = item.label;
					}
				});
			}
			// that.getAddress(that.userId);
		},
		// 复制标签地址
		copyLabel() {
			var that = this;
			// #ifdef APP-PLUS
			uni.setClipboardData({
				data: that.labelText,
				success: function() {
					that.$utils.showLayer(that.$t('assets.copy_success'));
				},
				fail: function() {
					that.$utils.showLayer(that.$t('assets.copy_err'));
				}
			});
			// #endif
		},
		mention() {
			let address=this.address;
			this.changeRechargeIndex==1?address=this.cardno:"";
			if(this.changeRechargeIndex==0){
				if (!address) {
					return this.$utils.showLayer(this.$t('assets.p_addr'));
				}
				// if (this.address !== this.cashInfo.walletAddress) {
				// 	return this.$utils.showLayer(this.$t('zdy.nosame'));
				// }
			}else{
				// if (!this.cardno) {
				// 	return this.$utils.showLayer(this.$t('collect.p_no'));
				// }
				// if (this.cardno !== this.cashInfo.cardno) {
				// 	return this.$utils.showLayer(this.$t('zdy.nosame'));
				// }
			}
			
			
			if (!this.number) {
				return this.$utils.showLayer(this.$t('assets.p_minnum'));
			}
			if (!this.password) {
				return this.$utils.showLayer(this.$t('login.e_pdeal'));
			}
			if (this.password.length < 6) {
				return this.$utils.showLayer(this.$t('login.e_pdealerr'));
			}
			
			
			this.$utils.initDataToken(
				{
					url:"subWithdraw",
					type: 'POST',
					data: {money: this.number,cardno: address, paypwd: this.password, type: this.changeRechargeIndex}
				},
				(res, msg) => {
					console.log(res);
					this.$utils.showLayer(msg);
					if(res.code == 200){
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					}else if(res.code == 211){
						this.$utils.showLayer(this.$t('zdy.nosame'));
					}
					
				}
			);
		}
	}
};
</script>

<style>
.active {
	color: #007aff;
	border-color: #007aff;
}
.currency{
	margin:10px auto;
	
	justify-content: space-between;
}
.currency-active{
	color:#fff;
	background-color: #007aff;
}
.currency text{
	width: 48%;
	padding: 10px 0;
	text-align: center;
	display: inline-block;
}
</style>
