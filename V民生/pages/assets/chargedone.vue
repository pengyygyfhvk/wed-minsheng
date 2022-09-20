<template>
	
	<view class="pt20 plr15" :class="{ light: theme == 'light' }">
		<view class="bgPart flex alcenter between plr15 ptb15 radius4">
			<view class="flex1 lh20">
				<image src="/static/image/true.png" mode="widthFix" class="wt20 mlr10 fl lh30"></image>
				<text>{{$t('assets.xia')}}</text>
			</view>
			<view class="flex1"><view style="height: 1px;width: 100%;background: #666;" height="1px" width="100%"></view></view>
			<view class="flex1 lh20">
				<image src="/static/image/2.png" mode="widthFix" class="wt20 mlr10 fl lh30"></image>
				<text>{{$t('assets.pay')}}</text>
			</view>
			
		</view>
		<!-- <view class="bgPart mt20 ptb10 plr20">
			<view class="regtop ft14 mb20">
				<text>{{$t('assets.fudetail')}}</text>
			</view>
			<view class="list pb20 ">
				<view class="pt20 ">
					<text class="fl inblock wt60">{{$t('assets.kai')}}：</text>
					<text class="fl">{{resinfo.bankname}}</text>
					<text class="fr" @click="copy(resinfo.bankname)">{{$t('assets.copy')}}</text>
					<view class="cl"></view>
				</view>
				<view class="pt20">
					<text class="fl inblock wt60">{{$t('assets.cardno')}}：</text>
					<text class="fl">{{resinfo.bankcard}}</text>
					<text class="fr" @click="copy(resinfo.bankcard)">{{$t('assets.copy')}}</text>
					<view class="cl"></view>
				</view>
				<view class="pt20">
					<text class="fl inblock wt60">{{$t('assets.kaihu')}}：</text>
					<text class="fl">{{resinfo.accountname}}</text>
					<text class="fr" @click="copy(resinfo.accountname)">{{$t('assets.copy')}}</text>
					<view class="cl"></view>
				</view>
			</view>
		</view> -->
		<view class="bgPart mt20 ptb10 plr20">
			 <view class="tc pb10 ft16 bold">{{$t('assets.c_tip6')}}</view>	
			 <view class="tc pt15 gray7">{{$t('assets.c_tip7')}}
				<text class="redColor bold ft16">{{number}}</text>{{$t('assets.sec')}}
			 </view>	
			
			<navigator url="../mine/kefu" open-type="switchTab" class="mtb20 regpay bgred ptb5">
				<view class="tc lh20" >{{$t('assets.surepay')}}</view>
			</navigator>
			<view class="mtb20 regpay bgGray ptb5">
				<view class="tc lh20" >{{$t('assets.cancel')}}</view>
			</view>
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
			resinfo:{},
			id:1,
			number:600
		};
	},
	onLoad(e) {
		this.currency = e.currency;
		this.id = e.id;
		uni.setNavigationBarTitle({
			title: '订单详情'
		});
		// this.getCoinInfo();
		this.getBankCardUser();
		this.countDownTime()
	},
	
	computed: {
		...mapState(['theme'])
	},
	onShow() {
		this.$utils.setThemeTop(this.theme);
	},
	methods: {
		countDownTime(){
			var that = this;
			that.number = 600;
			if(that.number == 600){
				var sid = setInterval(function() {
					that.number--;
					if(that.number == 0){
						that.number=600;
						clearInterval(sid);
						console.log(that.number)
					}
				}, 1000);
			}
		},
		
		getBankCardUser(){
			this.$utils.initDataToken({
				url:"wallet/getRechargeInfo",
				data:{
					id:this.id
				},
				type:"post",
			},res=>{
				this.resinfo = res.data;
			})
		},
		
		// 复制
		copy(content) {
			var that = this;
			
			 const result = h5Copy(content)
			   if (result === false) {
				 uni.showToast({
				   title:'不支持复制',
				 })
			   } else {
				 uni.showToast({
				   title:'复制成功',
				   icon:'none'
				 })
			   }
		}
	}
};
</script>

<style>
	
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
