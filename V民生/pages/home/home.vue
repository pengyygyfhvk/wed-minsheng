<template>
	<view :class="{ light: theme == 'light' }" class="content " >
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="ptb10 w100 tc flex alcenter between fixed bgPart head pr10">
			<view class="pl10"><!-- <image class=" headImg" @click="show" src="/static/image/head.png" mode="widthFix"></image> --></view>
			<view class=" posRelt">
				<view class="flex alcenter" @tap="isshowlang = !isshowlang">
					<text>{{ languages[lang].name }}</text>
					<image :src="languages[lang].img" class="wt15 h12 ml5"></image>
				</view>
				<view class="abstrot bggray plr8 wt90 radius4" style="right: 0;top:60upx" v-show="isshowlang">
					<view class="flex alcenter  ptb10 between bdb1f langs" v-for="(item, i) in languages" :key="i" @tap="changeLang(i)">
						<text>{{ item.name }}</text>
						<image :src="item.img" class="wt15 h12 ml5"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="w100 mt30">
		    <video class="w100" id="myVideo" :src="videourl" @error="videoErrorCallback"  controls autoplay></video>
		</view>
		
		<view class="w100 plr10 bgPart">
			<view class=" flex alcenter bdb_blue3">
				<image src="../../static/image/new1.png" class="wt20 h20"></image>
				<swiper class="w100 h40 ml10" :vertical="true" :autoplay="true" :interval="3000" :circular="true">
					<swiper-item class="flex alcenter" v-for="(item, i) in noticeList" :key="i">
						<navigator :url="'/pages/home/newsDetail?id=' + item.id">{{ item.title }}</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<swiper display-multiple-items="3" class="ptb10 h100 w100 bgPart" v-if="totalMax.length">
			<swiper-item  class="flex alcenter around" v-for="(item, i) in totalMax" :key="i">
				<navigator
					:url="'/pages/market/kline?legal_id=' + item.pid + '&currency_id=' + item.currency_id + '&symbol=' + item.Name"
					class="flex column alcenter" 
				>
					<text class="ft12">{{ item.Name }}</text>
					<text class="ft18 bold pt5" :class="{ green: parseFloat(item.Price) < 0, red2: parseFloat(item.Price) >= 0 || item.Price == '' }">{{ item.Price }}</text>
					<text class="ft12" :class="{ green: parseFloat(item.DiffRate) < 0, red2: parseFloat(item.DiffRate) >= 0 || item.DiffRate == '' }">
						{{ item.DiffRate.substr(0, 1) == '-' ? '' : '+' }}{{ (item.DiffRate - 0) | toFixed2 }}%
					</text>
					<!-- <text class="ft12 blue4">≈ {{ ((item.now_price - 0) * (item.rmb_relation - 0)) | toFixed2 }} CNY</text> -->
				</navigator>
			</swiper-item>
		</swiper>
		<view class="flex alcenter plr10 w100 ptb5">
			<navigator url="/pages/assets/bankcharge" class="flex flex2 alcenter between bgPart plr10 radius4" style="height: 85px;">
				<view class="flex column ht100 jscenter">
					<text class="ft16 bold">{{ $t('home.charge') }}</text>
					<!-- <text class="blue4 ft12 mt5">{{ $t('home.zhichi') }}</text> -->
				</view>
				<image class="wt50 h40" src="/static/image/legal_card.png"></image>
			</navigator> 
			<view class="flex column between flex1 ml5">
		
				<navigator url="/pages/mine/kefu" open-type="switchTab"   class="flex alcenter bgPart plr10 radius4 h40 " style="height: 40px;">
					<image class="wt30 h30 mr10" src="/static/footer/index1.png"></image>
					<text class="ft12">{{$t('about.abt')}}</text>
				</navigator>
				<navigator url="/pages/home/news" class="flex alcenter bgPart plr10 radius4 h40 mt5" style="height: 40px;">
					<image class="wt30 h25 mr10" src="/static/footer/index1.png"></image>
					<text class="ft12">{{$t('home.help')}}</text>
				</navigator>
			</view>
		</view>
		<navigator url="/pages/lockming/index" class="w100 plr10 pb5 posRelt">
			<view class="abstrot zdx100 white" style="top:15%; left:10%;">
				<view class="ft16 bold">{{$t('home.licai')}}</view>
				 <!-- <view class="mt5">{{ $t('home.leader') }}</view> -->
			</view>
			<image class="w100 h70" src="/static/image/banner.png"></image>
		</navigator>
		
	
		<view class="w100 bgPart">			
			<view class="between plr15 ptb10 w100 bdb_1e lh40 lf0 bgPart zdx100">
				<view class="flex flexend">
					<view :class="['ft14 gray7 les1',{'ft18 white':current==0}]" v-if="this.forex.length > 0" @click="change(0)">{{ $t('home.forex') }}</view>
					<view :class="['pl10 ft14 gray7 les2',{'ft18 white':current==1}]" v-if="this.blockchain.length > 0" @click="change(1)">{{ $t('home.blockchain') }}</view>
					<view :class="['pl10 ft14 gray7 les3',{'ft18 white':current==2}]" v-if="this.stock.length > 0" @click="change(2)">{{ $t('home.stock') }}</view>
				</view>
			</view>
			
			<view class="flex alcenter lh40 ft12 ptb5 blue4 plr10">
				<text class="flex1 tc">{{$t('home.hotgoods')}}</text>
				<text class="flex1 tc ml20">{{ $t('home.new_price') }}</text>
				<text class="flex1 tc mr10">{{ $t('home.top') }}</text>
				<text class="flex1 tc mr10">{{ $t('home.low') }}</text>
			</view>
		
			<view class="lh40"  v-for="(item, i) in forex"  v-show="current==0">
				<block>
					<navigator :url="'/pages/market/kline?legal_id=' + item.pid + '&currency_id=' + item.currency_id + '&symbol=' + item.Name" class="flex alcenter ft12 ptb10 blue4 plr10 bdb_blue3">
						<view class="" style="flex: 1.5;">
							<view class="">
								<!-- <image :src="item.img" mode="widthFix" class="coinimg fl"></image> -->
								<text class="gray_e ft14 fl bold pl10">{{item.Name }}</text>
								<view class="cl"></view>
							</view>
						</view>
						<text class="flex1 gray_e bold ft14">
							<text class="flex1 gray_e ft12 plr10 dealing">{{item.Price}}</text>
						</text>
						<text class="flex1 gray_e bold ft14 ml10">{{item.High}}</text>
						<text class="flex1 gray_e bold ft14 ml10">{{item.Low}}</text>
					<!-- 	<text class="flex1 tr flex jsend">
							<text class="flex1 gray_e ft12 plr10 dealing">{{$t('home.trading')}}</text>
						</text> -->
					</navigator>
				</block>
			</view>	
			
			
			
			
			
			<view class="lh40"  v-for="(item, i) in blockchain"  v-show="current==1">
				<block>
					<navigator :url="'/pages/market/kline?legal_id=' + item.pid + '&currency_id=' + item.currency_id + '&symbol=' + item.Name" class="flex alcenter ft12 ptb10 blue4 plr10 bdb_blue3">
						<view class="" style="flex: 1.5;">
							<view class="">
								<!-- <image :src="item.img" mode="widthFix" class="coinimg fl"></image> -->
								<text class="gray_e ft14 fl bold pl10">{{item.Name }}</text>
								<view class="cl"></view>
							</view>
						</view>
						<text class="flex1 gray_e bold ft14">
							<text class="flex1 gray_e ft12 plr10 dealing">{{item.Price}}</text>
						</text>
						<text class="flex1 gray_e bold ft14 ml10">{{item.High}}</text>
						<text class="flex1 gray_e bold ft14 ml10">{{item.Low}}</text>
					<!-- 	<text class="flex1 tr flex jsend">
							<text class="flex1 gray_e ft12 plr10 dealing">{{$t('home.trading')}}</text>
						</text> -->
					</navigator>
				</block>
			</view>	
			
			
			<view class="lh40"  v-for="(item, i) in stock"  v-show="current==2">
				<block>
					<navigator :url="'/pages/market/kline?legal_id=' + item.pid + '&currency_id=' + item.currency_id + '&symbol=' + item.Name" class="flex alcenter ft12 ptb10 blue4 plr10 bdb_blue3">
						<view class="" style="flex: 1.5;">
							<view class="">
								<!-- <image :src="item.img" mode="widthFix" class="coinimg fl"></image> -->
								<text class="gray_e ft14 fl bold pl10">{{item.Name }}</text>
								<view class="cl"></view>
							</view>
						</view>
						<text class="flex1 gray_e bold ft14">
							<text class="flex1 gray_e ft12 plr10 dealing">{{item.Price}}</text>
						</text>
						<text class="flex1 gray_e bold ft14 ml10">{{item.High}}</text>
						<text class="flex1 gray_e bold ft14 ml10">{{item.Low}}</text>
					<!-- 	<text class="flex1 tr flex jsend">
							<text class="flex1 gray_e ft12 plr10 dealing">{{$t('home.trading')}}</text>
						</text> -->
					</navigator>
				</block>
			</view>	
			
		</view>
		<view class="fixed w100 ht100 mask" @click.stop="hide" @touchmove.stop = "" :class="{ showMask: showLeft }">
			<view class="fixed bgPart w65 ht100 leftBox flex column" :class="{ isShow: showLeft }" @click.stop="stop">
				<view class="bgBlack pt40 plr20" v-if="token">
					<view>
						<view class="ft14">VIP{{$t('home.level')}}: {{info.otype==0?$t("home.putong"):$t("home.daili")}}</view>
					</view>			
				</view>
				<view class="bgBlack pt10 pb20 plr20" v-if="token">
					<view class="flex alcenter between" >
						<view>
							<view class="ft20 mb5">{{ info.account }}</view>
							<view class="ft14">UID:{{ info.uid }}</view>
						</view>
						
					</view>
					<view class="flex alcenter ptb5" >
						<view>
							<view class="ft14 mb5 pt10">{{$t('home.yue')}}</view>
							<view class="ft14">{{ info.usermoney|filterDecimals(4)}}</view>
						
						</view>
						
					</view>
					<view class="flex alcenter w100 pt10">
						<navigator url="/pages/assets/mention"  class="ft14 mb5 flex1 wt30 lh30 mr10 tc radius4" style="background: linear-gradient(#ed7277, #f2a069);">{{ $t('home.chu') }}</navigator>
						<navigator url="/pages/assets/charge"  class="ft14 mb5 flex1 wt30 lh30 tc radius4" style="background: linear-gradient(#8185f7, #669cf5);" >{{ $t('home.ru') }}</navigator>
					</view>
				</view>
				
				<view class="bgBlack pt60 pb20 plr20" v-if="!token">
					<navigator url="/pages/mine/login" open-type="navigate" class="flex alcenter between">
						<view>
							<view class="ft20 mb5">{{ $t('home.p_login') }}</view>
							<view class="ft14">{{ $t('home.welcome') }}</view>
						</view>
						<view><image src="/static/image/mores.png" class="wt20 h20"></image></view>
					</navigator>	
				</view>
				<scroll-view scroll-y="true" show-scrollbar="true" class="flex1 pb30"  style="min-height: 300px;">
					<view @click="go()" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
						<view class="flex alcenter">
							<image src="/static/image/personal.png" class="wt20 h20"></image>
							<text class="ml10">{{ $t('home.jiaoyilog') }}</text>
						</view>
						<image src="/static/image/mores.png" class="wt15 h15"></image>
					</view>
					<navigator url="/pages/assets/assetsIncome" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
						<view class="flex alcenter">
							<image src="/static/image/personal.png" class="wt20 h20"></image>
							<text class="ml10">{{ $t('home.shoudetail') }}</text>
						</view>
						<image src="/static/image/mores.png" class="wt15 h15"></image>
					</navigator>
					<navigator url="/pages/mine/card" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
						<view class="flex alcenter">
							<image src="/static/image/personal.png" class="wt20 h20"></image>
							<text class="ml10">{{ $t('home.card') }}</text>
						</view>
						<image src="/static/image/mores.png" class="wt15 h15"></image>
					</navigator>
				
					<navigator url="/pages/home/ping" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
						<view class="flex alcenter">
							<image src="/static/image/personal.png" class="wt20 h20"></image>
							<text class="ml10">{{ $t('home.xinping') }}</text>
						</view>
						<image src="/static/image/mores.png" class="wt15 h15"></image>
					</navigator>
					<navigator url="/pages/mine/kefu" open-type="switchTab" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
						<view class="flex alcenter">
							<image src="/static/image/personal.png" class="wt20 h20"></image>
							<text class="ml10">{{$t('about.abt')}}</text>
						</view>
						<image src="/static/image/mores.png" class="wt15 h15"></image>
					</navigator>
			
					 <navigator url="/pages/mine/real_authentication" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
					 	<view class="flex alcenter">
					 		<image src="/static/image/personal.png" class="wt20 h20"></image>
					 		<text class="ml10">{{ $t('authentication.renzheng') }}</text>
					 	</view>
					 	<image src="/static/image/mores.png" class="wt15 h15"></image>
					 </navigator>
					 
					 <navigator url="/pages/mine/resetLegalPwd" class="flex alcenter ptb15 between plr20 ft14 bdb_blue3">
					 	<view class="flex alcenter">
					 		<image src="/static/image/sucerty.png" class="wt20 h20"></image>
					 		<text class="ml10">{{ $t('login.security') }}</text>
					 	</view>
					 	<image src="/static/image/mores.png" class="wt15 h15"></image>
					 </navigator>
					<view class="mt30 plr20" v-if="token">
						<button type="primary" size="default" class="ft14" @click="logout">{{ $t('home.logout') }}</button>
					</view>
				</scroll-view>
			</view>
		</view>
<!-- 		<view class="kefu">
			<kefu></kefu>
		</view> -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	components:{
		// kefu
	},
	data() {
		return {
			forex:[],//外汇
			blockchain:[],//区块链
			stock:[],//股票
			totalMax:[],
			quoListSwier:[],
			timer:"",
			bannerList: [],
			noticeList: [],
			quoList: [],
			title: 'Hello',
			videourl:'',
			showLeft: false,
			showMask: false,
			token: '',
			info: '',
			download:'',
			cny_rate: '',
			current:0,
			languages: {
				en: { name: 'English', img: '/static/image/en.png' },
				jp: { name: '日本語', img: '/static/image/jp.png' },
				kor: { name: '한국어', img: '/static/image/kor.jpg' },
				hk: { name: '繁體中文', img: '/static/image/hk.png' },
				zh: { name: '中文', img: '/static/image/zh.png' },
			},
			lang: '',
			isshowlang: false,
			videoContext:''
		};
	},
	filters: {
		toFixed2: function(value, options) {
			value = Number(value);
			return value.toFixed(2);
		}
	},
	computed: {
		...mapState(['theme'])
	},
	onLoad() {
		var token = uni.getStorageSync('token');
		this.lang = uni.getStorageSync('lang') || 'en';
		
		if(uni.getStorageSync('locale') !=uni.getStorageSync('lang')){
			// this.$utils.initData({ url: 'set/lang', data: {lang:this.lang }, type: 'POST' }, res => {
			
				uni.setStorageSync('lang', this.lang);
				uni.setStorageSync('locale',this.lang);
				this.$i18n.locale = this.lang;
				this.isshowlang = false;
				this.changeFooter();
				this.showLeft = false;
				this.showMask = false;
				this.token = uni.getStorageSync('token');
				this.getBannerImg();
				this.getNoticeList();
			// });
		}
		this.changeFooter();
		// if (token) {
		// 	this.getUserInfo();
		// }else{
		// 	uni.reLaunch({
		// 		url:'../mine/login'
		// 	})
		// }
		
	},
	onShow() {
		this.$utils.setThemeTop(this.theme);
		this.$utils.setThemeBottom(this.theme);
		this.showLeft = false;
		this.showMask = false;
		this.token = uni.getStorageSync('token');
		this.getBannerImg();
		this.getNoticeList();
		this.quotation();
		this.timer=setInterval(()=>{
			this.quotation();
		},3000)
		
		
	},
	methods: {
		play() {
			console.log(this.videoContext)
			this.videoContext.play(); //播放
		},
		go(){
			uni.reLaunch({
				url:'../trade/entrust?current=1'
			})
		},
		videoErrorCallback: function(e) {
			console.log(e)
		},
		change(current){
			if(this.current==current){
				return;
			}
			this.current = current;
			this.page = 1;
			// current==0 ? this.entrustList() : this.hisenList();
			// clearInterval(this.timer)  
		},
		
		
		changeFooter() {
			uni.setTabBarItem({
				index: 0,
				text: this.$t('market.home')
			});
			uni.setTabBarItem({
				index: 1,
				text: this.$t('market.market')
			});
			uni.setTabBarItem({
				index: 2,
				text: this.$t('trade.chicang')
			});
			uni.setTabBarItem({
				index: 3,
				text: this.$t('zdy.zxkf')
			});
			uni.setTabBarItem({
				index: 4,
				text: this.$t('authentication.person')
			});
		},
		

		
		// 切换主题
		switchChange(e){
			var ui  = (this.theme == 'light') ? 'dark' : 'light';
			this.$store.dispatch("changeTheme",ui);
			this.$utils.setThemeTop(this.theme);
			this.$utils.setThemeBottom(this.theme);
		},
		// 语言切换
		changeLang(lang) {
			// this.$utils.initData({ url: 'set/lang', data: { lang }, type: 'POST' }, res => {
				console.log(lang);
				this.lang = lang;
				uni.setStorageSync('lang', lang);
				uni.setStorageSync('locale', lang);
				this.$i18n.locale = lang;
				this.isshowlang = false;
				// console.log(uni.getStorageSync('locale'))
				// console.log(uni.getStorageSync('lang'))
				this.changeFooter();
				this.showLeft = false;
				this.showMask = false;
				this.token = uni.getStorageSync('token');
				this.getBannerImg();
				this.getNoticeList();
			// });
		},
		//轮播图
		getBannerImg() {
			uni.showLoading();
			this.$utils.initData({ url: 'home/banner', data: {}, type: 'POST' }, (res, msg) => {
				
				uni.stopPullDownRefresh();
				this.videourl = res.data;
				
				
				
				uni.hideLoading();
			});
		},
		//公告
		getNoticeList() {
			this.$utils.initData({ url: 'home/news', data: { c_id: 4 }, type: 'POST' }, (res, msg) => {
			
				uni.stopPullDownRefresh();
				this.noticeList = res.data;
			});
		},
		//行情交易对
		quotation() {			
			this.$utils.initData({ url: 'home/currency', data: {}, type: 'get' }, (res, msg) => {			
				uni.stopPullDownRefresh();
				let usdtData = res.data;
				this.forex = usdtData.forex;
				this.blockchain = usdtData.blockchain;
				this.stock = usdtData.stock;
				var arr = [];
				var arr1 = [];
				var arr2 = [];
				var arr3 = [];
				arr1.push.apply(arr1,usdtData.forex)
				arr2.push.apply(arr2,usdtData.blockchain)
				arr3.push.apply(arr3,usdtData.stock)
				
				
				if(this.forex.length > 0){
					this.totalMax.push(this.forex[0])
					//移除第一项
					arr1.shift();
				}else{
					this.current  = 1;
				}
				if(this.blockchain.length > 0){
					this.totalMax.push(this.blockchain[0])
					//移除第一项
					arr2.shift();
				}else{
					if(this.forex.length == 0){
						this.current  = 2;
					}
				}
				
				if(this.stock.length > 0){
					this.totalMax.push(this.stock[0])
					//移除第一项
					arr3.shift();
				}
				
				arr = arr.concat(arr1).concat(arr2).concat(arr3)
				if(this.forex.length == 0){
					this.totalMax.push(arr[0])
				}
				
				if(this.blockchain.length == 0){
					this.totalMax.push(arr[1])
				}
				
				if(this.stock.length == 0){
					this.totalMax.push(arr[2])
				}
				
			});
		},
		show() {
			if (this.token) {
				this.getUserInfo();
			}
			this.showLeft = !this.showLeft;
		},
		hide() {
			this.showLeft = !this.showLeft;
		},
		stop() {},
		//获取用户信息
		getUserInfo() {
			var that = this;
			this.$utils.initDataToken({ url: 'member/getUserInfo', data: {}, type: 'get' }, (res, msg) => {
				uni.stopPullDownRefresh();
				// uni.setStorageSync('uid', res.data.uid);
				
				that.info = res.data;
			});
		},
		//退出登录
		logout() {
			uni.setStorageSync('token','');
			if(this.timer) {
			    clearInterval(this.timer);  
			    this.timer = null;  
			}  
		
			uni.reLaunch({
				url: '/pages/mine/login'
			})
				
		
		}
	},
	onHide() {
		clearInterval(this.timer);
		this.$socket.closeSocket();
	},
	onUnload:function(){  
	    if(this.timer) {  
	        clearInterval(this.timer);  
	        this.timer = null;  
	    }  
	},
	onPullDownRefresh() {
		this.getBannerImg();
		this.getNoticeList();
		this.quotation();
	}
};
</script>

<style>
	
.coinimg{width: 40upx;max-height: 40upx;}	
.redb{background: #d73741;color:#fff;text-align: center;border-radius:10upx; padding: 6upx 0;}
.greenb{background: #02c289;color:#fff;text-align: center;border-radius:10upx; padding: 6upx 0;}
.dealing{background: #00aaff;padding: 20upx 20upx;color: #fff;}	
.xiushi{background: rgb(58, 142, 230);padding: 5upx 10upx;border-radius: 10upx;}		
.les1{color: #fb9924;},
.les2{color: #e27046;},
.les3{color: #02c289;},
.head {
	top: var(--status-bar-height);
	left: 0;
	z-index: 999;
}
.content {
	/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	/* padding-bottom: 20px; */
}
.headImg {
	width: 50upx;
	height: 50upx;
	/* left: 10px; */
}
.swiper {
	height: 300upx;
}
.bgIndex {
	background: #0a1b2b;
}
.bgParts {
	background: #061623;
}
.leftBox {
	left: -100%;
	top: 0;
	z-index: 9999;
	transition: all 0.5s ease-out;
	opacity: 0.5;
}
.isShow {
	left: 0;
	top: 0;
	z-index: 9999;
	transition: all 0.5s ease-out;
	opacity: 1;
}
.mask {
	top: 0;
	left: -100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 999;
}
.showMask {
	left: 0;
	top: 0;
	z-index: 999;
	opacity: 1;
}
.langs:last-child {
	border-bottom: none;
}
.kefu{
	/* position: fixed; */
	bottom: 50upx;
	/* right: 0; */
}
.menus{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 20upx 0;
}
.menusitem{
	width: 25%;
	text-align: center;
	margin-bottom: 20upx;
	padding: 20upx 0 0;
}
.menusitem image{
	width: 60upx;
	display: block;
	height: 60upx;
	margin: 0 auto 20upx;
}

.pei{padding:6upx 20upx!important;}
</style>
