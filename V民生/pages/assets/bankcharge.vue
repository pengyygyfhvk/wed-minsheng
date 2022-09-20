<template>
	<view class="pt20 plr15" :class="{ light: theme == 'light' }">
		<!-- <view class="bgPart flex alcenter between plr15 ptb15 radius4">
			<text>{{$t('assets.curprice')}}</text>
			<text>{{rmb}}(RMB)</text>
		</view> -->
		<view class="bgPart mt20 ptb10 plr20">
			<!-- <view class="regtop ft14 mb20">
				<text>RMB</text>
				<text>{{$t('assets.buy')}}</text>
				<text>USDT</text>
			</view> -->
			<view>
				<view>{{$t('assets.chargeprice')}}</view>
				<view class="mtb20 reginput">
					<input type="number" v-model="num" class="fl regnum" @input="getregnum($event)"/>
					<text class="fr lh30" >RMB</text>
					<view class="cl"></view>
				</view>
				<view class="numlist flex">
					<view class="flex1 mr10 ptb5" :class="{'bggreen': num == 1000  }" @click="nums(1000)">1000</view>
					<view class="flex1 mlr10 ptb5" :class="{'bggreen': num == 5000  }" @click="nums(5000)">5000</view>
					<view class="flex1 mlr10 ptb5" :class="{'bggreen':num == 10000  }" @click="nums(10000)">10000</view>
					<view class="flex1 mlr10 ptb5" :class="{'bggreen':num == 20000  }" @click="nums(20000)">20000</view>
					<view class="flex1 ml10 ptb5" :class="{'bggreen':num == 50000  }" @click="nums(50000)">50000</view>
				</view>
				<!-- <view class="pt20">{{$t('assets.payfor')}}</view>
				<view class="mtb20 reginput">
					<input type="number" v-model="amountRmb" disabled="true" class="fl regnum"/>
					<text class="fr lh30" >RMB</text>
					<view class="cl"></view>
				</view> -->
				<view class="pt20">{{$t('assets.payway')}}</view>
				<view class="mtb20 regpay bgred ptb5">
					<image src="/static/image/bankcard.png" mode="widthFix" class="wt20 mlr10 fl lh30"></image>
					<text class="fl lh20" >{{$t('assets.cardfor')}}</text>
					<view class="cl"></view>
				</view>
			</view>
		</view>
		<view class="bgPart mt20 ptb10 plr20">
			 <view class="tc pb10 ft16 bold">{{$t('assets.c_tip1')}}</view>	
			 <view class="tc pb10 gray7">{{$t('assets.c_tip2')}}</view>	
			 <view class="tc pb10 gray7">{{$t('assets.c_tip3')}}</view>	
			 <view class="tc pb10 gray7">{{$t('assets.c_tip4')}}</view>
			<view class="mtb20 regpay bgred ptb5">
				<view class="tc lh20" @click="buyin">{{$t('assets.c_tip5')}}</view>
			</view>
		</view>
		<view class="mask" v-show="show"></view>
		<view class="pipei" v-show="show">
			<image src="/static/image/pipei.gif" mode="widthFix" class="mlr10 fl lh30" v-show="pipeiing"></image>
			<image src="/static/image/pipei1.gif" mode="widthFix" class="mlr10 fl lh30" v-show="pipeidone"></image>
		</view>
	</view>
</template>

<script>
import QR from '@/common/qrcode.js';
 import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
import { mapState } from 'vuex';
 import gUpload from "@/components/g-upload/g-upload.vue"
 import {domain2} from '@/common/domain.js'
export default {
    components: {
      gUpload
    },
	data() {
		return {
			rmb:1,
			amountRmb:0.00,
			num:0,
			show:false,
			pipeiing:false,
			pipeidone:false
		};
	},
	onLoad(e) {
		this.currency = e.currency;
		this.name = e.name;
		uni.setNavigationBarTitle({
			title: this.$t('assets').charge
		});
		// this.getCoinInfo();
		// this.getBankCard();
		this.getRmbRate();
	},
	onPullDownRefresh() {
		this.getCoinInfo();
	},
	computed: {
		...mapState(['theme'])
	},
	onShow() {
		this.$utils.setThemeTop(this.theme);
	},
	methods: {
		nums(num){
			this.num = num;
			this.amountRmb=Number(num * this.rmb).toFixed(2);
		},
		buyin(){
			var that = this;
			if(that.num <= 0 ){
				that.$utils.showLayer(this.$t('assets').p_transfernum);
				return;
			}
			that.$utils.initDataToken({ 
				url: 'Recharge',
				type:"post", 
				data:{
					money:that.num,
					pay_type:1
				},
			},res=>{
				if(res.code == 200){
					that.show = true;
					that.pipeiing = true;
					setTimeout(()=>{
						that.pipeiing = false;
						setTimeout(()=>{
							that.pipeidone = true;
							setTimeout(()=>{
								that.pipeidone = false;
								that.show = false;
								uni.navigateTo({
									url:'/pages/assets/chargedone?id='+res.data
								})
								
							},1000)
						},1500)
					},3000)
				}
				
					
				
				
				
			})
		},
		
		getregnum(e){
			// console.log(e);
			this.amountRmb=Number(e.detail.value * this.rmb).toFixed(2);
		},
		
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
		}
	}
};
</script>

<style>
.mask{background: rgba(0,0,0,.5);position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.pipei{width: 80%;position: fixed; transform: translate(-50%,-50%);top: 50%;left: 50%;}	
.pipei image{width: 100%;}
.regtop{text-align: center;}
.regtop text{display: inline-block;padding:0 20upx 10upx;}
.numlist view{border:1px solid #999;text-align: center; border-radius: 10upx;}
.regnum{height: 60upx;width: 85%;}
.reginput{border-bottom: 1px solid #999;}
.regpay{border-radius: 10upx;}
.rechargeview{
	color:#fff;
	border-radius: 5px;
	text-align: center;
	width: 150upx;
	height: 60upx;
	line-height: 60upx;
	background-color: #1881d2;
}
.blueinput{
	padding: 0 5%;
	height: 60upx;
	line-height: 60upx;
	border: 1px solid #007AFF;
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
.active {
	color: #007aff;
	border-color: #007aff;
}
</style>
