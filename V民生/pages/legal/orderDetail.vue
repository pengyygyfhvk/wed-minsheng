<template>
	<view class=""  :class="{'light':theme=='light'}">
		<view class="status_bar bgBlue3">
			<view class="top_view bgBlue3"></view>
		</view>
		<view class="header fixed flex alcenter between plr15 bgBlue3">
			<view>
				<image src="../../static/image/forward.png" mode="aspectFit" class="wt20 h20" @click="back()"></image>
			</view>
		</view>
		<view class="">
			<view class="done flex between alcenter pt60 plr15 pb15 bgBlue3">
				<view class="flex column flexstart">
					<view class="flex alcenter">
						<image src="../../static/image/naozhong.png" mode="aspectFit" class="wt20 h20"></image>
						<text class="white ft24 bold ml5" v-if="data.is_sure === 0 && data.type=='buy'">{{$t('store.p_pay')}}</text>
						<text class="white ft24 bold ml5" v-if="data.is_sure === 0 && data.type=='sell'">{{$t('store.p_waitpay')}}</text>
						<text class="white ft24 bold ml5" v-if="data.is_sure == 2">{{$t('trade.has_cancel')}}</text>
						<text class="white ft24 bold ml5" v-if="data.is_sure == 3">{{$t('trade.has_pay')}}</text>
						<text class="white ft24 bold ml5" v-if="data.is_sure === 1">{{$t('trade.has_done')}}</text>
						<!-- <text class="white ft24 bold ml5" v-if="data.is_sure == 4">{{$t('store.protection')}}</text> -->
					</view>
					<view class="pt5">
						<text class="white" v-if="data.is_sure === 0 && data.type=='buy'">{{$t('store.t_pay')}}</text>
						<text class="white" v-if="data.is_sure === 0 && data.type=='sell'">{{$t('store.t_waitpay')}}</text>
						<text class="white" v-if="data.is_sure == 2">{{$t('store.t_paycancel')}}</text>
						<text class="white" v-if="data.is_sure == 3">{{$t('store.t_havepay')}}</text>
						<text class="white" v-if="data.is_sure === 1">{{$t('store.t_hasdone')}}</text>
					</view>
					<!-- <text class="ft12 white mt5">请在<text class="ft14">14:10</text>内付款给商家</text> -->
				</view>
				<view class="flex column alcenter" @click="call">
					<image src="../../static/image/lianxi.png" mode="aspectFit" class="wt30 h25"></image>
					<text class="ft12 white mt5">{{$t('store.call')}}</text>
				</view>
			</view>
			<view class="price flex column plr15 ptb15">
				<view class="flex alcenter">
					<text class="mr5 blue21 ft18 bold">￥{{data.deal_money}}</text>
					<!-- <image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15"></image> -->
				</view>
				<view class="flex between alcenter mt10 ft13 price_b">
					<view class="flex column between gray75" @click="togglePopup('bottom', 'share')">
						<text>{{$t('legal.price')}}</text>
						<text class="pt5">{{$t('legal.num')}}</text>
					</view>
					<view class="flex column between">
						<text>￥{{data.price}}</text>
						<text class="pt5">{{data.number}} {{data.currency_name}}</text>
					</view>
					<view class="flex column alcenter between">
						<image src="../../static/image/account_about_image.png" mode="aspectFit" class="wt20 h20"></image>
						<text class="">{{data.currency_name}}</text>
					</view>
				</view>
			</view>
			<view class="h15 bggray" ></view>
			<view class="info flex column plr15 ft13  pt10">
				<view class="flex between alcenter ptb10 bdb1f">
					<view class="flex alcenter">
						<image src="../../static/image/zhi.png" mode="aspectFit" v-if="data.way_name=='ali_pay'" class="wt15 h15 mr5"></image>
						<image src="../../static/image/chat.png" mode="aspectFit" v-else-if="data.way_name=='we_chat'" class="wt15 h15 mr5"></image>
						<image src="../../static/image/card.png" mode="aspectFit" v-else class="wt15 h15 mr5"></image>
						<text class="mr5">{{data.way_name}}</text>
					</view>
					<!-- <image src="../../static/image/mores.png" mode="aspectFit" class="wt15 h15"></image> -->
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{data.type=='buy'?$t('store.collectper'):$t('store.payper')}}</text>
					<view class="flex alcenter ht100 w65">
						<text class="tr mr5 flex1">{{user_cash.real_name}}</text>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f" v-if="(data.type=='buy')&&(data.way_name=='ali_pay' || data.way_name=='we_chat' )">
					<text class="gray75">{{$t('store.collectcode')}}</text>
					<view class="flex alcenter">
						<image src="../../static/image/erweima.png" mode="aspectFit" class="wt20 h20" @click="isshow()"></image>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f" v-if="(data.type=='buy')">
					<text class="gray75">{{$t('store.collectacc')}}</text>
					<view class="flex alcenter ht100 w65">
						<text class="tr mr5 flex1" v-if="data.way_name=='ali_pay' ">{{user_cash.alipay_account}}</text>
						<text class="tr mr5 flex1" v-else-if="data.way_name=='we_chat' ">{{user_cash.wechat_account}}</text>
						<text class="tr mr5 flex1" v-else>{{user_cash.bank_account}}</text>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" v-if="data.way_name=='ali_pay' " @click="copy(user_cash.alipay_account)"></image>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" v-else-if="data.way_name=='we_chat'" @click="copy(user_cash.wechat_account)"></image>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" v-else @click="copy(user_cash.bank_account)"></image>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{$t('store.paycancode')}}</text>
					<view class="flex alcenter">
						<text class="mr5">{{data.id}}</text>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{$t('store.dotime')}}</text>
					<text class="mr5">{{data.create_time}}</text>
				</view>
				<view class=" between  ptb10 bdb1f" v-if="data.is_sure && data.pay_orders_img">
					<text class="gray75">{{$t('zdy.zfpz')}}</text>
					<image :src="data.pay_orders_img" mode="widthFix" style="display: block;margin-top:20upx;max-width: 100%;"></image>
				</view>
				<view class="zfps gray75" v-if="data.type=='buy' && !data.is_sure">
					<text>{{$t('zdy.zfpz')}}</text>
					<image src="../../static/image/addImg.png" v-if="!pay_orders_img" mode="widthFix" @tap="uploadImg"></image>
					<image :src="pay_orders_img" v-if="pay_orders_img" mode="widthFix" @tap="uploadImg"></image>
				</view>
				<view class="flex alcenter ptb10" v-if="data.is_sure==0 && data.type=='buy'">
					<text >{{$t('store.t_self')}}{{data.way_name}}{{$t('store.t_transfer')}}</text>
				</view>
			</view>
		</view>
		<view class="bggray w100 fixed lf0 btm0" v-if="data.is_sure==0 && data.type=='buy'">
			<view class="ptb10 plr15 gray75">
				{{$t('store.t_tip')}}。
			</view>
			<view class="flex between alcenter white bold plr15 ft14 ptb10 baseBg2">
				<view class="baseBg3 radius2 ptb10 flex1 tc mr10" @click="togglePopup('center', 'ceil'),payType='ceil'">{{$t('store.cancelorder')}}</view>
				<view class="bgBlue2 radius2 ptb10 flex1 tc doit pointer ml5" @click="togglePopup('center', 'ceil'),payType='ipay'">{{$t('store.ipay')}}</view>
			</view>
		</view>
		<view class="bggray w100 fixed lf0 btm0" v-if="data.is_sure==3 && data.type=='sell'">
			<view class="ptb10 plr15 gray75 tc">
				{{$t('store.t_look')}}
			</view>
			<view class="flex between alcenter white bold plr15 ft14 ptb10 baseBg2">
				<view class="bgBlue2 radius2 ptb10 flex1 tc doit pointer ml5" @click="togglePopup('center', 'ceil'),payType='fpay'">{{$t('store.t_con_collect')}}</view>
				<!-- <view class="bgBlue2 radius2 ptb10 flex1 tc doit pointer ml5" @click="apply">{{$t('store.apply')}}</view> -->
			</view>
		</view>
		<!-- 付款码弹窗 -->
		<view class="sx_show flex column alcenter jscenter" v-show="pay_code" @click="isshow()">
			<view class="center-box ptb15 plr15 tc bgWhite" @click.stop>
				<image :src="data.way_name=='ali_pay' ? user_cash.alipay_qr_code : user_cash.wechat_qr_code" mode="aspectFit" class="w100"></image>
			</view>
			<view class="xian bgWhite"></view>
			<image src="../../static/image/cuo.png" mode="aspectFit" class="wt30 h30" @click="isshow()" @click.stop></image>
		</view>
		<!-- 取消交易弹窗 -->
		<uni-popup ref="ceil" :type="type" :custom="true">
			<view class="uni-tip" v-if="payType=='ceil'">	<!-- 取消交易弹窗 -->
				<view class="uni-tip-title">{{$t('store.cancel_confrim')}}</view>
				<view class="uni-tip-content flex column white ft12">
					<text class="blue21">{{$t('store.t_tip1')}}</text>
					<text class="tl mt5">{{$t('store.t_rule')}}:{{$t('store.t_tip2')}}。</text>
					<!-- <view class="mt5 flex alcenter">
						<checkbox value="cb" :checked="is_ok" @tap="tapChecked" style="transform:scale(0.7);color:'#1881d2'" />
						<text>我确认还没有付款给对方</text>
					</view> -->
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button white" @click="cancel('ceil')">{{$t('store.ithink')}}</view>
					<view class="uni-tip-button blue21" @click="iSure()">{{$t('login.e_confrim2')}}</view>
				</view>
			</view>
			<view class="uni-tip" v-if="payType=='ipay'">	<!-- 确认付款弹窗 -->
				<view class="uni-tip-title">{{$t('store.confrim_ipay')}}</view>
				<view class="uni-tip-content white tc ft12">
					<text class="blue21">{{$t('store.donotconfrim')}}。</text>
					<view class="mt5">{{$t('store.lockacc')}}。</view>
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button white" @click="cancel('ceil')">{{$t('trade.cancel')}}</view>
					<view class="uni-tip-button blue21" @click="iSure()">{{$t('login.e_confrim2')}}</view>
				</view>
			</view>
			<view class="uni-tip" v-if="payType=='fpay'">	<!-- 确认收款弹窗 -->
				<view class="uni-tip-title">{{$t('store.t_con_collect')}}</view>
				<view class="uni-tip-content white tc ft12">
					<text class="blue21">{{$t('store.notpayconfrim')}}。</text>
					<view class="mt5">{{$t('store.hedui')}}。</view>
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button white" @click="cancel('ceil')">{{$t('trade.cancel')}}</view>
					<view class="uni-tip-button blue21" @click="iSure()">{{$t('login.e_confrim')}}</view>
				</view>
			</view>
		</uni-popup>
		<!-- 底部密码弹窗 -->
		<uni-popup ref="share" :type="type" :custom="true">
			<view class="uni-share bgPart">
				<view class="uni-share-content">
					<view class="uni-share-title tc h40 lh40 bdb_1e ft16">{{$t('login.s_dealpwd')}}</view>
					<view class="flex alcenter ptb20 plr20">
						<text>{{$t('login.s_dealpwd')}}</text>
						<input type="password" class="h40 flex1 plr15 ml10 bd_input radius2" v-model="password" :placeholder="$t('login.e_pdeal')" />
					</view>
					<view class="bgBlue tc h40 lh40 white" @click="submit">{{$t('login.e_confrim')}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup3.vue';
	import {mapState} from 'vuex'
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				id: '',
				password:'',
				show: false,
				type: '',
				pay_code: false,
				is_ok: false,
				data: {},
				cash: {},
				user_cash:{},
				payType:'',
				pay_orders_img:''
			};
		},
		onLoad(e) {
			this.id = e.id;

		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
			this.getDetail();
		},
		computed:{
		   ...mapState(['theme']),
		  },
		methods: {
			uploadImg(){
				if(this.data.is_sure)return;
				var that=this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
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
								console.log(data)
								if(data.type=='ok'){
									that.pay_orders_img=data.message;
								}
							}
						});
					}
				});
			},
			back() {
				uni.navigateBack();
			},
			iSure(){
				this.cancel('ceil');
				this.togglePopup('bottom', 'share');
			},
			getDetail() { //详情
				this.$utils.initDataToken({url: 'legal_deal',data: {id: this.id}}, res => {
					this.data = res;
					this.cash = res.seller;
					this.user_cash = res.user_cash_info;
				});
			},
			sendUrl(url){
				let that = this;
				that.$utils.initDataToken({url: url,data: {id: this.id,pay_orders_img:that.pay_orders_img,paypassword:that.password},type: 'post'}, res => {
					that.password='';
					that.cancel('share');
					that.$utils.showLayer(res);
					setTimeout(() => {
						that.getDetail();
					}, 1000)
				});
			},
			submit(){
				let that = this;
				if(that.password.length<6){
					return that.$utils.showLayer(that.$t('login.e_pdeal'));
				}
				if(that.payType=='ceil'){//取消
				    that.sendUrl('user_legal_pay_cancel');
				}
				if(that.payType=='ipay'){ //付款
					if(that.pay_orders_img==''){
						return that.$utils.showLayer(that.$t('zdy.qrszfpz'));
					}
					that.sendUrl('user_legal_pay');
				}
				if(that.payType=='fpay'){//收款
					that.sendUrl('legal_deal_sure');
				}
			},
			call() { //打电话
			    let num = this.data.phone;
			    console.log(num)
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			copy(text) { //复制
				var that = this;
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: text,
					success: function() {
						that.$utils.showLayer(that.$t('assets.copy_success'));
					},
					fail: function() {
						that.$utils.showLayer(that.$t('assets.copy_err'));
					}
				});
				// #endif
				 const result = h5Copy(text)
				   if (result === false) {
					 uni.showToast({
					   title:'not support',
					 })
				   } else {
					 uni.showToast({
					   title:'Copy successfully',
					   icon:'none'
					 })
				   }
			},
			isshow() {//二维码弹窗
				this.pay_code = !this.pay_code;
			},
			togglePopup(type, open) {//type弹窗位置
				this.type = type;
				if (open === 'tip') {
					this.show = true;
				} else {
					this.$refs[open].open();
				}
			},
			cancel(type) {
				if (type === 'tip') {
					return this.show = false;
				}
				this.$refs[type].close();
			},
			tapChecked() {
				this.is_ok = !this.is_ok;
			},
			apply(){
				let that = this;
				that.$utils.initDataToken({
					url: 'legal/arbitrate',
					data:{
					  id :that.id
					},
					type: 'post',
				}, res => {
					that.$utils.showLayer(res);
					setTimeout(()=>{
						that.getDetail();
					},1000)
				});
			},
		}
	};
</script>

<style>
	page {
		background-color: #131f30;
	}
	.zfps {
		margin-top: 20upx;
	}
	.zfps image{
		margin-top: 20upx;
		display: block;
	}
	.info .infos {
		border-bottom: 1px solid #263243;
	}
	.pay_order {
		background-color: #152a42;
		z-index: 11;
	}
	/* 付款码弹窗 */
	.sx_show {
		position: fixed;
		top: calc(var(--status-bar-height) + 100upx);
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .7);
		z-index: 102;
	}

	.sx_show .xian {
		height: 40upx;
		width: 4upx;
	}

	/* 取消交易弹窗 */
	.uni-tip {
		padding: 30upx;
		width: 600upx;
		background: #131e34;
		box-sizing: border-box;
		border-radius: 20upx;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 32upx;
		color: #fff;
	}

	.uni-tip-content {
		padding: 30upx;
	}

	.uni-tip-group-button {
		margin-top: 20upx;
		display: flex;
	}

	.uni-tip-button {
		width: 100%;
		text-align: center;
		font-size: 28upx;
	}

	.center-box {
		width: 500upx;
		height: 500upx;
	}

	.center-box .image {
		width: 100%;
		height: 100%;
	}
</style>
