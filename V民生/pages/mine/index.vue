<template>
	<view :class="{ light: theme == 'light' }" class="content " >
		<view class="plr20 ptb20"> 
			<view class="pb10">
				<image src="../../static/logo.png" class="wt60 h60 radius50p fl"></image>
				<view class="fl ml10 userdetail">
					<view class="lh25">{{ info.realName }}</view>
					<view class="lh25">UID:{{ info.uid }}</view>
					<view class="lh25">{{$t('home.yue')}}:{{ info.usermoney|filterDecimals(4)}}</view>
				</view>
				<view class="cl"></view>
			</view>
			<view class="posRelt radius6">
				<image src="../../static/image/userbanner.jpg" mode="widthFix" class="w100 userbanner radius6"></image>
				<view class="abstrot btm0 plr20 ptb10 w100 geuser white">
					<view class="lh25">{{$t('authentication.person')}}</view>
					<view class="lh25">{{$t('authentication.welcome')}}</view>
				</view>
			</view>
		</view>	
		<view class="flex alcenter w100 pt10 plr20">
			<navigator url="/pages/assets/mention"  class="ft14 mb5 flex1 wt30 lh30 mr10 tc radius4" style="background: linear-gradient(#ed7277, #f2a069);">{{ $t('home.chu') }}</navigator>
			<navigator url="/pages/assets/bankcharge"  class="ft14 mb5 flex1 wt30 lh30 tc radius4" style="background: linear-gradient(#8185f7, #669cf5);" >{{ $t('home.ru') }}</navigator>
		</view>
		<scroll-view scroll-y="true" show-scrollbar="true" class="flex1 pb30">
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
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		components:{
			// kefu
		},
		data() {
			return {
				token: '',
				info: ''
			};
		},
		
		computed: {
			...mapState(['theme'])
		},
		onLoad() {
			
		},
		onShow() {
			this.$utils.setThemeTop(this.theme);
			this.$utils.setThemeBottom(this.theme);
			
			this.token = uni.getStorageSync('token');
			var token = uni.getStorageSync('token');
			if (token) {
				this.getUserInfo();
			}else{
				uni.navigateTo({
					url:'../mine/login'
				})
			}
			
			uni.setNavigationBarTitle({
				title:this.$t('authentication').person
			})
		},
		methods: {
			go(){
				uni.reLaunch({
					url:'../trade/entrust?current=1'
				})
			},
			//获取用户信息
			getUserInfo() {
				var that = this;
				this.$utils.initDataToken({ url: 'member/getUserInfo', data: {}, type: 'get' }, (res, msg) => {
					uni.stopPullDownRefresh();
					// uni.setStorageSync('uid', msg.id);
					
					that.info = res.data;
				});
			},
			// 切换主题
			switchChange(e){
				var ui  = (this.theme == 'light') ? 'dark' : 'light';
				this.$store.dispatch("changeTheme",ui);
				this.$utils.setThemeTop(this.theme);
				this.$utils.setThemeBottom(this.theme);
			},
			//退出登录
			logout() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/mine/login'
				})
			}
		},
		onHide() {
			clearInterval(this.timer);
			this.$socket.closeSocket();
		},
		onPullDownRefresh() {
			this.getBannerImg();
			this.getNoticeList();
			this.quotation();
		}
	};
</script>

<style>
.geuser{background: rgba(0,0,0,.5);}
</style>
