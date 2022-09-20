<template>
	<view class="" :class="{'light':theme=='light'}">
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
						<text class="white ft24 bold ml5" v-if="data.isSure === 0 && data.type=='1'">{{$t('store.p_pay')}}</text>
						<text class="white ft24 bold ml5" v-if="data.isSure === 0 && data.type=='2'">{{$t('store.p_waitpay')}}</text>
						<text class="white ft24 bold ml5" v-if="data.isSure == 2">{{$t('trade.has_cancel')}}</text>
						<text class="white ft24 bold ml5" v-if="data.isSure == 3">{{$t('trade.has_pay')}}</text>
						<text class="white ft24 bold ml5" v-if="data.isSure === 1">{{$t('trade.has_done')}}</text>
						<!-- <text class="white ft24 bold ml5" v-if="data.is_sure == 4">{{$t('store.protection')}}</text> -->
					</view>
					<view class="pt5">
						<text class="white" v-if="data.isSure === 0 && data.type=='1'">{{$t('legal.t_tip1')}}</text>
						<text class="white" v-if="data.isSure === 0 && data.type=='2'">{{$t('legal.t_tip2')}}</text>
						<text class="white" v-if="data.isSure == 2">{{$t('store.t_paycancel')}}</text>
						<text class="white" v-if="data.isSure == 3">{{$t('store.t_havepay')}}</text>
						<text class="white" v-if="data.isSure === 1">{{$t('store.t_hasdone')}}</text>
					</view>
					<!-- <text class="ft12 white mt5" v-if="data.is_sure === 0 && data.type=='sell'">请在<text class="ft14 red">{{timer}}</text>内付款</text> -->
					<!-- <text class="ft12 white mt5" v-if="data.is_sure === 3 && data.type=='buy'">请在<text class="ft14 red">{{timer}}</text>内收款</text> -->
				</view>
				<navigator url="/pages/mine/kefu" open-type="switchTab" class="flex column alcenter" >
					<image src="../../static/image/lianxi.png" mode="aspectFit" class="wt30 h25"></image>
					<text class="ft12 white mt5">{{$t('store.call')}}</text>
				</navigator>
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
						<text>￥{{data.price}} </text>
						<text class="pt5">{{data.number}} USDT</text>
					</view>
					<view class="flex column alcenter between">
						<image src="../../static/image/account_about_image.png" mode="aspectFit" class="wt20 h20"></image>
						<text class=""> USDT</text>
					</view>
				</view>
			</view>
			<view class="h15 bggray" ></view>
			<view class="info flex column plr15 ft13  pt10 pb150">
				<view class="flex between alcenter ptb10 bdb1f">
					<view class="flex alcenter">
						<image src="../../static/image/zhi.png" mode="aspectFit" v-if="data.method=='ali_pay'" class="wt15 h15 mr5"></image>
						<image src="../../static/image/wechat.png" mode="aspectFit" v-else-if="data.method=='we_chat'" class="wt15 h15 mr5"></image>
						<image src="../../static/image/card.png" mode="aspectFit" v-else class="wt15 h15 mr5"></image>
						<text class="mr5">{{data.method}}</text>
					</view>
					<!-- <image src="../../static/image/mores.png" mode="aspectFit" class="wt15 h15"></image> -->
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{data.type=='1'?$t('store.collectper'):$t('store.payper')}}</text>
					<view class="flex alcenter ht100 w65">
						<text class="tr mr5 flex1">{{data.bankAccount}}</text>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" @click="copy(data.bankAccount)"></image>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{$t('store.collectacc')}}</text>
					<view class="flex alcenter ht100 w65">
						<text class="tr mr5 flex1">{{data.bankNo}}</text>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" @click="copy(data.bankNo)"></image>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{$t('zdy.kaihu')}}</text>
					<view class="flex alcenter ht100 w65">
						<text class="tr mr5 flex1">{{data.bankName}}</text>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" @click="copy(data.bankName)"></image>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f">
					<text class="gray75">{{$t('zdy.kaizhi')}}</text>
					<view class="flex alcenter ht100 w65">
						<text class="tr mr5 flex1">{{data.address}}</text>
						<image src="../../static/image/fuzhi.png" mode="aspectFit" class="wt15 h15" @click="copy(data.address)"></image>
					</view>
				</view>
				<view class="flex between alcenter ptb10 bdb1f" v-if="(data.type=='1')&&(data.method=='ali_pay' || data.method=='we_chat' )">
					<text class="gray75">{{$t('store.collectcode')}}</text>
					<view class="flex alcenter">
						<image src="../../static/image/erweima.png" mode="aspectFit" class="wt20 h20" @click="isshow()"></image>
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
					<text class="mr5">{{data.createTime}}</text>
				</view>
				<view class="flex alcenter ptb10" v-if="data.isSure==0 && data.type==1">
					<text>{{$t('store.t_self')}}{{data.method}}{{$t('store.t_transfer')}}</text>
				</view>
				<view class="zfps gray75 ptb10" v-if="data.isSure==0 && data.type==1">
					<text>{{$t('zdy.zfpz')}}</text>
					<image src="../../static/image/addImg.png" class="pingzhengimg" v-if="!pay_orders_img" mode="widthFix" @tap="uploadImg"></image>
					<image :src="pay_orders_img"  class="pingzhengimg" v-if="pay_orders_img" mode="widthFix" @tap="uploadImg"></image>
				</view>
				<view class="zfps gray75 ptb10" v-if="data.isSure  && data.type==1">
					<text>{{$t('zdy.zfpz')}}</text>
					<image :src="pay_orders_img"  class="pingzhengimg" v-if="pay_orders_img" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="bggray w100 fixed lf0 btm0" v-if="data.isSure==0 && data.type=='1'">
			<view class="ptb10 plr15 gray75">
				{{$t('store.t_tip')}}。
			</view>
			<view class="flex between alcenter white bold plr15 ft14 ptb10 baseBg2">
				<view class="baseBg3 radius2 ptb10 flex1 tc mr10" @click="togglePopup('center', 'ceil'),payType='ceil'">{{$t('store.cancelorder')}}</view>
				<view class="bgBlue2 radius2 ptb10 flex1 tc doit pointer ml5" @click="togglePopup('center', 'ceil'),payType='ipay'">{{$t('store.ipay')}}</view>
			</view>
		</view>
		
		<!-- 付款码弹窗 -->
		<!-- <view class="sx_show flex column alcenter jscenter" v-show="pay_code" @click="isshow()">
			<view class="center-box ptb15 plr15 tc bgWhite" @click.stop>
				<image :src="data.method=='ali_pay' ? cash.to_pay_info.alipay_qr_code : cash.to_pay_info.wechat_qr_code" mode="aspectFit" class="w100"></image>
			</view>
			<view class="xian bgWhite"></view>
			<image src="../../static/image/cuo.png" mode="aspectFit" class="wt30 h30" @click="isshow()" @click.stop></image>
		</view> -->
		<!-- 确认交易弹窗 -->
		<uni-popup ref="ceil" :type="type" :custom="true">
			<view class="uni-tip" v-if="payType=='ceil'">	<!-- 取消交易弹窗 -->
				<view class="uni-tip-title">{{$t('store.cancel_confrim')}}</view>
				<view class="uni-tip-content flex column white ft12">
					<text class="blue21">{{$t('store.t_tip1')}}</text>
					<text class="tl mt5">{{$t('store.t_rule')}}:{{$t('store.t_tip2')}}。</text>
					<view class="mt5 flex alcenter">
						<checkbox value="cb" :checked="is_ok" @tap="tapChecked" style="transform:scale(0.7);color:'#1881d2'" />
						<text>{{$t('legal.t_tip3')}}</text>
					</view>
				</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button white" @click="cancel('ceil')">{{$t('store.ithink')}}</view>
					<view class="uni-tip-button blue21" @click="cancel('ceil'),togglePopup('bottom', 'share')">{{$t('login.e_confrim2')}}</view>
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
					<view class="uni-tip-button blue21" @click="cancel('ceil'),togglePopup('bottom', 'share')">{{$t('login.e_confrim2')}}</view>
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
					<view class="uni-tip-button blue21" @click="cancel('ceil'),togglePopup('bottom', 'share')">{{$t('login.e_confrim2')}}</view>
				</view>
			</view>
		</uni-popup>
		<!-- 底部密码弹窗 -->
		<uni-popup ref="share" :type="type" :custom="true">
			<view class="uni-share bgPart">
				<view class="uni-share-content">
					<view class="uni-share-title tc h40 lh40 bdb_1e ft16">{{$t('login.s_loginpwd')}}</view>
					<view class="flex alcenter ptb20 plr20">
						<text>{{$t('login.s_loginpwd')}}</text>
						<input type="password" class="h40 flex1 plr15 ml10 bd_input radius2" v-model="password" :placeholder="$t('login.e_pdeal')" />
					</view>
					<view class="bgBlue tc h40 lh40 white" @click="submit">{{$t('login.e_confrim')}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {domain} from '@/common/domain.js'
	import uniPopup from '@/components/uni-popup3.vue';
	import {mapState} from 'vuex'
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				pay_orders_img:'',
				id: '',
				password:'',
				show: false,
				type: '',
				pay_code: false,
				is_ok: false,
				data: {},
				cash: {},
				payType:'',
				timer:''
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
				
				if(this.cash.is_sure)return;
				var that=this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: domain+'/api/upload', //仅为示例，非真实的接口地址
							// #ifdef APP-PLUS
							url:domain+'/api/upload',
							// #endif
							filePath: tempFilePaths[0],
							name: 'imgFile',
							formData: {
								'user': 'test'
							},
							header: {
								'token':uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log(typeof uploadFileRes.data);
								var data=JSON.parse(uploadFileRes.data);
								console.log(data)
								console.log(data.code)
								console.log(data.data)
								if(data.code=='200'){
									that.pay_orders_img=data.data;
								}
							}
						});
					}
				});
			},
			checkTime(i){
				if (i<10) {
					i = "0" + i;
				}
				return i;
			},
			downTime(endTime){//倒计时
				let that = this;
				var startTime=(Date.parse(new Date())/1000);//开始时间
				var endTime=endTime; //结束时间
				setInterval(function(){
					var ts =endTime-startTime;//计算剩余的毫秒数
					//var dd = parseInt(ts  / 60 / 60 / 24, 10);//计算剩余的天数
					var hh = parseInt(ts  / 60 / 60 % 24, 10);//计算剩余的小时数
					var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
					var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
					//dd = that.checkTime(dd);
					hh = that.checkTime(hh);
					mm = that.checkTime(mm);
					ss = that.checkTime(ss);
					if(ts>0){
						that.timer =  hh + "时" + mm + "分" + ss + "秒";
						startTime++;
					}else if(ts<0){
						that.timer="00:00:00";
					}
				},1000);
			},
			back() {
				uni.navigateBack();
			},
			getDetail() { //详情
				this.$utils.initDataToken({url: 'wallet/LegalDealOrderDetail',data: {oid: this.id},type:'post'}, res => {
					
					this.data = res.data;
					this.data.deal_money = Number(this.data.number * this.data.price).toFixed(4);
					this.cash = res.data;
					if(res.data.isSure){
						this.pay_orders_img=res.data.payOrdersImg
					}
					console.log(this.data)
					// let data = res;
					// var date;
					// if(data.type=='sell' && data.is_sure==0){
					// 	console.log(data.payment_at)
					// 	let newDate = new Date(data.payment_at.replace(/-/g, '/'));
					// 	date = (newDate.getTime())/1000;
					// 	this.downTime(date);
					// }
					// if(data.type=='buy' && data.is_sure==3){
					// 	console.log(data.comp_at)
					// 	let newDate = new Date(data.comp_at.replace(/-/g, '/'));
					// 	date = (newDate.getTime())/1000;
					// 	this.downTime(date);
					// }
				});
			},
			sendUrl(url){
				let that = this;
				that.$utils.initDataToken({url: url,data: {id: this.id,password:that.password,pay_orders_img:that.pay_orders_img},type: 'post'}, res => {
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
				    that.$utils.initDataToken({url: 'wallet/LegalDealCancel',data: {oid: that.id,password:that.password},type: 'post'					}, res => {
				    	that.password='';
				    	that.cancel('share');
				    	that.$utils.showLayer(res.msg);
				    	setTimeout(() => {
				    		that.getDetail();
				    	}, 3000)
				    });
				}
				if(that.payType=='ipay'){ //付款
					if(that.pay_orders_img==''){
						return that.$utils.showLayer(that.$t('zdy.qrszfpz'));
					}
					that.$utils.initDataToken({url: 'wallet/LegalDealSubmit',data: {oid: that.id,password:that.password,pic:that.pay_orders_img},type: 'post'					}, res => {
						that.password='';
						that.cancel('share');
						that.$utils.showLayer(res.msg);
						setTimeout(() => {
							that.getDetail();
						}, 3000)
					});
				}
				if(that.payType=='fpay'){//收款
					that.sendUrl('legal_deal_user_sure');
				}
			},
			call(num) { //打电话
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
						that.$utils.showLayer('复制成功');
					},
					fail: function() {
						that.$utils.showLayer('复制失败');
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
					   title:'复制成功',
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
	.zfps image{
		margin-top: 20upx;
		display: block;
	}
	page {
		background-color: #131f30;
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
		padding: 20upx;
		width: 600upx;
		background: #131e34;
		box-sizing: border-box;
		border-radius: 20upx;
	}
	.pingzhengimg{width: 100%;}
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
