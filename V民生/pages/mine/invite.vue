<template>
	<!-- <view class="contents" :style="{backgroundImage:`url(${bgImg})`,backgroundSize: '100% 100%'}"> -->
		<!-- <image src="/static/image/invite_bg.png" mode="" class="contents-img"></image> -->
	<view class="contents">
<!-- 		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="header fixed flex alcenter between plr15 pb10">
			<view class="flex alcenter flex1 colorw">
				<image src="../../static/image/back.png" mode="" class="wt20 h20" @tap="backs"></image>
				<view class="flex2 tc mr20 ft16 bold"></view>
			</view>
		</view> -->
		<view class="flex column alcenter jscenter invite" style="margin-top: 350upx;">
			<view>
				<!-- <image :src="codeImg" class="wt160 h160"></image> -->
				<view class="qrimg">
				    <tki-qrcode
				    ref="qrcode"
				    :val="val"
					:size="size"
					:unit="unit"
					:background="background"
					:foreground="foreground"
					:pdground="pdground"
					:icon="icon"
					:iconSize="iconsize"
					:lv="lv" 
					:onval="onval"
					:loadMake="loadMake"
				    @result="qrR" />
				</view>
			</view>
			<view class="mt20 tc ft16" style="color: #ffffff;">{{$t('bind.codes')}}：{{code}}</view>
			<!-- <view class="tc gray75">{{$t('bind.tip')}}</view> -->
			<!-- <view class="mt10 radius20 ptb5 plr20" @tap="copys" style="border: 2px solid #1675ff;background: #000e45;margin-top: 160upx;">
				<text class="white">{{$t('wallet.copy_promotionLink')}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon.vue';
	import QR from '../../common/wxqrcode.js'
	import {domain} from '@/common/domain.js'
	import tkiQrcode from "@/components/tki-qrcode.vue"
	import {mapState} from 'vuex'
	import bgImg from "@/static/image/invite_bg.png"
	export default{
		components: {tkiQrcode,uniIcon},
		data() {
			return {
				code:'',
				codeImg:'',
				val:'',
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				background: '#000000', // 背景色
				foreground: '#ffffff', // 前景色
				pdground: '#ffffff', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				bgImg:bgImg
			}
		},
		onLoad(option) {
			this.code = option.code;
			uni.setNavigationBarTitle({
				title:this.$t('bind').tuiguang
			})
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
			// this.code = option.code;
			// var url=domain+'/mobile/register.html?code=' + this.code;
			// this.codeImg = QR.createQrCodeImg(url)
			// console.log(domain);
			var url=domain+'h5/#/pages/mine/register?invite_code=' + this.code;
			// var url='https://www.bte.cash?invite_code=' + this.code;
		
			this.val = url;
		},
		methods: {
			// 返回上一页
			backs(){
				uni.navigateBack({
					delta: 1
				});
			},
			qrR(res) {
				// console.log(res)
			},
		},
	}
</script>

<style scoped>
	/* .status_bar {
		background-color: #108eef!important;  
	} 
	.top_view {  
		background-color: #108eef!important;
	} */
	.contents{
		/* width: 100vw;
		height: 100vh; */
		background-repeat: no-repeat;
		position: fixed;
		width: 100%;
		height: 100%;
		/* background: linear-gradient(to bottom right, #108eef, #416fdc); */
	/* 	background: url(../../static/image/invite_bg.png) no-repeat;
		background-size: 100% 100%; */
	}
	.contents-img{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.invite{
	/* 	position: absolute;
		bottom: 11.0vw;
		width: 100%;
		height: 300upx;
		left: 0; */
		
	}
    .qrimg{
		z-index: 999;
		background: #fff;
		padding: 10upx;
		border-radius: 6upx;
	}
	.wt160{
		width: 320upx;
	}
	.qring{
		 border: 4px solid #313131;
	}
	.bgliner1{
		background: -webkit-gradient(linear, left top, right top, from(#ac57ff), to(#9586f9));
		background: -o-linear-gradient(left, #ac57ff, #9586f9);
		background: linear-gradient(to right, #ac57ff, #9586f9);
	}
</style>
