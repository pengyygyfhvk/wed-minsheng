<template>
	<view class="" :class="{ light: theme == 'light' }">
		
		<view class="plr20">
			<view class="mb20 mt20">
				<view class="">{{$t('assets.yu')}}（USDT）</view>
				<input type="text" :value="balance" class="bdb1f h40 w100 " disabled="true" />
			</view>
			<view class="mb20 mt20 bdb1f">
				<view class="">{{$t('assets.tinum')}}（USDT）</view>
				<input type="text" v-model="tinum" class="h40 w60 fl" @input="numberChange($event)"  :placeholder="$t('assets.enterti')"/>
				<text class="fr lh40">￥{{rmbnum}}</text>
				<view class="cl"></view>
			</view>
			<view class="mb20 mt20">
				<view class="">{{$t('assets.bankno')}}</view>
				<input type="text" v-model="cardno" class="bdb1f h40 w100 " />
			</view>		
			<view class="mt40 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="mention">{{ $t('assets.mention') }}</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			
			balance: 0,
			phone: '',
			cardno: '',
			tinum:0,
			rmbnum:0.00,
			rmb:1,
		};
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
			title: this.$t('home.mention')
		});
		this.currency = e.currency;
		this.name = e.name;
		this.getBankCardUser();
		this.getRmbRate()
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
				url:"getConfig",
				data:{
					conf:'ustd_to_cny'
				},
				type:'post'
			},res=>{
				this.rmb=res.data;
			})
		},
		getBankCardUser(){
			this.$utils.initDataToken({
				url:"Withdraw",
			},res=>{
				console.log(res)
				if(res.code == 300){
					setTimeout(() => {
						uni.navigateTo({
							url:'../mine/card'
						})
					}, 2000)
				}
				this.balance = res.data.userMoney;
				this.phone = res.data.phone;
			})
		},
		
		numberChange(e) {
			// 到账数量
			this.rmbnum = Number(e.detail.value * this.rmb).toFixed(2);
		},
		
		mention() {
			
			if (this.tinum <= 0) {
				return this.$utils.showLayer('请输入提现数量');
			}
			
			this.$utils.initDataToken(
				{
					url: 'subWithdraw',
					type: 'POST',
					data: { money: this.tinum,cardno:this.cardno}
				},
				(res, msg) => {
					console.log(res);
					if(res.code == 200){
						
						uni.showToast({
							icon: 'none',
							title: res.msg,
							duration:2000
						});
						
						setTimeout(() => {
							uni.reLaunch({
								url:'../home/home'
							})
						}, 2000)
						
						
					}
					setTimeout(() => {
						this.getBankCardUser();
					}, 2000)
					
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
