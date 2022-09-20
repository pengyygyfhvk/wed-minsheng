<template>
	<view class="plr20 " :class="{'light':theme=='light'}">
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">{{$t('collect.name')}}：</text>
			<input type="text"  v-model="name" class="h40 lh40 flex1 pr10 tr " :placeholder="$t('collect.p_name')">
		</view>
		<!-- <view class="flex bgwhite alcenter radius4 pl10 mt10">
			<text>手机号：</text>
			<input type="text"  v-model="mobile" class="h40 lh40 flex1 pr10 tr flex1" placeholder="请输入手机号">
		</view> -->
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">{{$t('collect.bank')}}：</text>
			<input type="text"  v-model="kaihu" class="h40 lh40 flex1 pr10 tr " :placeholder="$t('collect.p_bank')">
		</view>
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">所属支行：</text>
			<input type="text"  v-model="branch" class="h40 lh40 flex1 pr10 tr " placeholder="请输入所属支行">
		</view>
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">{{$t('collect.no')}}：</text>
			<input type="text"  v-model="card_no" class="h40 lh40 flex1 pr10 tr " :placeholder="$t('collect.p_no')">
		</view>
<!-- 		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">{{$t('collect.alipay')}}：</text>
			<input type="text"  v-model="alipay_account" class="h40 lh40 flex1 pr10 tr " :placeholder="$t('collect.p_alipay')">
		</view>
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">TRC20 Address：</text>
			<input type="text"  v-model="weichat_name" class="h40 lh40 flex1 pr10 tr " placeholder="TRC20 Address">
		</view>
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text class="tr">ERC20 Address：</text>
			<input type="text"  v-model="wechat_account" class="h40 lh40 pr10 tr flex1" placeholder="ERC20 Address">
		</view> -->
<!-- 		<view class="flex mt20">
			<view class="flex1 ">
				<view class="mb10">{{$t('collect.wechatCode')}}</view>
				<image :src="wechat_code" class="wt100 h100" @tap="uploadImg('wechat')" ></image>
			
			</view>
			<view class="flex1">
				<view class="mb10">{{$t('collect.alipayCode')}}</view>
				<image :src="alipay_code" class="wt100 h100" @tap="uploadImg('alipay')" ></image>
		
			</view>
		</view> -->
		<view class="mt30 h40 lh40 tc white bgDark radius28 ft14" @tap="confirm" >{{$t('login.e_confrim')}}</view>
	</view>
</template>

<script>
	import {domain} from '@/common/domain.js'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				name:'',
				mobile:'',
				kaihu:'',
				card_no:'',
				branch:'',
				wechat_account:'',
				alipay_account:'',
				wechat_code:'/static/image/addImg.png',
				alipay_code:'/static/image/addImg.png',
				weichat_name:'',
			
			}
		},
		onLoad() {
			this.getInfo();
			uni.setNavigationBarTitle({
				title:this.$t('collect').method
			})
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
		   this.$utils.setThemeTop(this.theme)
		},
		methods:{
			//获取收款信息
			getInfo(){
				this.$utils.initDataToken({url:'user/cash_info',type:'POST',data:{}},(res,msg)=>{
				
					this.name = res.real_name;
					this.kaihu = res.bank_name;
					this.card_no = res.bank_account;
					this.branch = res.bank_branch;
					// if(res.bank_account != ''){
					// 	this.card_no = res.bank_account.substr(0,3) + '***' + res.bank_account.substr(6)
					// }
					this.wechat_account = res.wechat_account;
					this.weichat_name = res.wechat_nickname;
					this.alipay_account = res.alipay_account;
					if(res.wechat_qr_code){
						this.wechat_code = res.wechat_qr_code;
					}
					if(res.alipay_qr_code){
						this.alipay_code = res.alipay_qr_code;
					}		
				})
			},
			uploadImg(type){
				console.log(domain);
				var that=this;
				uni.chooseImage({
					count: 1,
					// sizeType: ['original', 'compressed'],
					sizeType: [ 'compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: '/api/upload', //仅为示例，非真实的接口地址
							// #ifdef APP-PLUS
							url:domain+'/api/upload',
							// #endif
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								console.log(typeof uploadFileRes.data);
								var data=JSON.parse(uploadFileRes.data);
								if(data.type=='ok'){
									if(type=='wechat'){
										that.wechat_code=data.message
									}else{
										that.alipay_code=data.message
									}
								}
							}
						});
					}
				});
			},
			confirm(){
				if(!this.name){
					return this.$utils.showLayer(this.$t('collect.p_name'))
				}
				// if(!this.mobile){
				// 	return this.$utils.showLayer('请输入手机号')
				// }
				if(!this.branch){
					return this.$utils.showLayer("请输入所属支行")
				}
				if(!this.kaihu){
					return this.$utils.showLayer(this.$t('collect.p_bank'))
				}
				if(!this.card_no){
					return this.$utils.showLayer(this.$t('collect.p_no'))
				}
				
				// if(!this.alipay_account){
				// 	return this.$utils.showLayer(this.$t('collect.p_alipay'))
				// }
				// if(!this.weichat_name){
				// 	return this.$utils.showLayer(this.$t('collect.p_nick'))
				// }
				// if(!this.wechat_account){
				// 	return this.$utils.showLayer(this.$t('collect.p_wechat'))
				// }
				// if(this.wechat_code=='/static/image/addImg.png'){
				// 	return this.$utils.showLayer(this.$t('collect.up_wechatCode'))
				// }
				// if(this.alipay_code=='/static/image/addImg.png'){
				// 	return this.$utils.showLayer(this.$t('collect.up_alipayCode'))
				// }
				this.$utils.initDataToken({url:'user/cash_save',type:'POST',data:{
					real_name:this.name,
					bank_name:this.kaihu,
					bank_account:this.card_no,
					bank_branch:this.branch,
					// alipay_account:this.alipay_account,
					// wechat_nickname:this.weichat_name,
					// wechat_account:this.wechat_account,
					// wechat_qr_code:this.wechat_code,
					// alipay_qr_code:this.alipay_code,
				}},(res,msg)=>{
					this.$utils.showLayer(msg);
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},1500)
				})
			}
		}
	}
</script>

<style>
</style>
