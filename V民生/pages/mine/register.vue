<template>
	<view class="plr20" :class="{'light':theme=='light'}">
		<view class="ptb10 flex alcenter between fixed bgPart head pr10" style="right: 0;top: 16rpx;z-index: 6666;">
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
		<view class="mt30 ">
			<view class="flex alcenter">
				<view class="plr15 mr20  ptb10 ft16 posRelt " :class="{'blue2':loginActive==0}" @tap="logintype(0)">
					{{$t('login').r_mobile}}
					<image src="/static/line_blue.png" class="myline" v-if="loginActive==0"></image>
				</view>
				<view class="plr15 ptb10 ft16 posRelt" :class="{'blue2':loginActive==1}" @tap="logintype(1)">
					{{$t('login').r_email}}
					<image src="/static/line_blue.png" class="myline" v-if="loginActive==1"></image>
				</view>
			
			</view>
			<view class="mt20 plr10 ptb10 radius4 bgHeader">
				<view class="flex alcenter bdb_myblue mb10 ">
					<view class="flex alcenter flex1">
						
						<input type="text" v-model="nickname" class="h40 lh40  flex1"  :placeholder="$t('login').p_name">
						<image src="/static/image/nickname.png" class="wt15 h15 ml10"></image>
					</view>
				</view>
				<view class="mb10">
					<view class="flex bgwhite alcenter bdb_myblue ">
						<input type="text"  v-model="username" class="h40 lh40  flex1" v-if="loginActive==1" :placeholder="$t('login').p_email">
						<input type="number" v-model="username" class="h40 lh40  flex1" v-else :placeholder="$t('login').p_mobile">
						<image src="/static/image/mobile.png" class="wt15 h15 ml10" v-if="loginActive==0"></image>
						<image src="/static/image/email.png" class="wt15 h15 ml10" v-else></image>
					</view>
				</view>
				
	<!-- 			<view class="mb10">
					<view class="flex bgwhite alcenter bdb_myblue">
					
						<input type="text" v-model="smscode" class="h40 lh40 flex1"  :placeholder="$t('login').p_vcode">
						<view class="ml10 plr10 white bgBlue ptb5 radius4" @tap="getCode">
							<text v-if="!hasSend">{{$t('login').r_send}}</text>
							<text v-else>{{second}}s</text>
						</view>
					</view>
				</view> -->
				
				<view class="mb10">
					<view class="flex bgwhite alcenter bdb_myblue ">
						
						<input type="text" password="" v-model="upwd" @input="passwordInput" class="h40 lh40 flex1"  :placeholder="$t('login').p_pwd">
						<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
					</view>
				</view>
				<view class="mb10">
					<view class="flex bgwhite alcenter bdb_myblue ">
						
						<input type="text" password="" v-model="upwd2" @input="passwordInput" class="h40 lh40 flex1"  :placeholder="$t('login').p_confirmPwd">
						<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
					</view>
				</view>
				
				<view class="flex alcenter bdb_myblue mb10 " v-if="is_invite==1">
					<view class="flex alcenter flex1">
						
						<input type="text" v-model="invitecode" class="h40 lh40  flex1"  :placeholder="$t('login').p_invitecode">
						<image src="/static/image/nickname.png" class="wt15 h15 ml10"></image>
					</view>
				</view>
				<view class="mt20 bgBlue radius4 ptb10 white ft14 tc mb10" @click="confirm">{{$t('login').e_confrim2}}</view>
			</view>
			
			<!-- #ifdef APP-PLUS -->
			<view class="mt45">
				<view class="flex alcenter">
					<text>{{$t('login').r_hasaccount}}?</text>
					<navigator url="login" class="blue2">{{$t('login').login}}</navigator>
				</view>
			</view>
			<!-- #endif -->
			
		</view>
		
	</view>
</template>

<script>
	import country from '@/common/country.js'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				loginActive:0,
				nickname:'',
				username:'',
				upwd:'',
				upwd2:'',
				smscode:'',
				oid: '',
				is_invite:0,
				index: 0,
				area_code:'+86',
				hasSend:false,
				second:60,
				isRemember:false,
				verifyPwd:false,
				isShowCodeLayer:false,
				timeInterval:'',
				lang:'',
				nationality:'China',
				invitecode:'',
				languages: {
					en: { name: 'English', img: '/static/image/en.png' },
					jp: { name: '日本語', img: '/static/image/jp.png' },
					kor: { name: '한국어', img: '/static/image/kor.jpg' },
					hk: { name: '繁體中文', img: '/static/image/hk.png' },
					zh: { name: '中文', img: '/static/image/zh.png' },
				},
				isshowlang: false,
			}
		},
		onLoad(e) {
			this.invitecode=e.invite_code;
			this.lang=uni.getStorageSync('lang');
			uni.setNavigationBarTitle({
				title:this.$t('login').register
			})
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.getInvite()
		    this.$utils.setThemeTop(this.theme)
		},
		methods:{
			
			logintype(num){
				this.loginActive = num;
				this.username = '';
				this.upwd = '';
			},
			// 区号选择
			bindPickerChange(e){
				this.index=e.target.value;				
				let item=this.array[this.index];				
				this.area_code=item.area_code;
				this.nationality=item.name_en;
			},
			getInvite(){
				this.$utils.initDataToken({
					url:"getConfig",
					data:{
						conf:'is_invite'
					},
					type:'post'
				},res=>{
					this.is_invite=res.data;
				})
			},
			// 获取验证码
			getCode(){
				if(this.hasSend) return;
				let area_code=this.area_code.substr(this.area_code.indexOf('+')+1);
				let area_code_id=1;
				area_code=="86"?area_code_id=1:area_code_id=0;
				if(this.loginActive==0){
					if(!this.user_string){
						return this.$utils.showLayer(this.$t('login').p_taccount)
					}
					
						
					this.$utils.initData({url:'sms_send',type:'POST',
						data:{
							user_string:this.user_string,							
							scene: 'register',
							area_code_id:area_code_id,
							area_code:area_code,
							lang:this.lang
						}},(res,msg)=>{
						this.$utils.showLayer(msg);
						this.hasSend=true;
						this.timeInterval=setInterval(()=>{
							if(this.second>=1){
								this.second--;
							}else{
								this.hasSend=false
								clearInterval(this.timeInterval);
							}
						},1000)
					})
				}else{
					if(!this.$utils.checkEmail(this.username)){
						return this.$utils.showLayer(this.$t('login').p_temail)
					}
					this.$utils.initData({url:'user/sendEmail',type:'POST',data:{email:this.username}},(res,msg)=>{
						this.$utils.showLayer(msg);
						
						if(res.code == 200){
							this.hasSend=true;
							this.timeInterval=setInterval(()=>{
								if(this.second>=1){
									this.second--;
								}else{
									this.hasSend=false
									clearInterval(this.timeInterval);
								}
							},1000)							
						}

					})
				}
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
					this.changeHeader();
					this.showLeft = false;
					this.showMask = false;
					this.token = uni.getStorageSync('token');
				// });
			},
			changeHeader(){
				uni.setNavigationBarTitle({
					title:this.$t('login').register
				})
			},
			// 密码框输入判断提示
			passwordInput(e){
				this.hasSend=false;
				if(e.target.value.length<6){
					this.verifyPwd=true;
				}else{
					this.verifyPwd=false;
				}
			},
			// 确定
			confirm(){
				// if(this.loginActive==1){
				// 	// 邮箱登录
				// 	if(!this.$utils.checkEmail(this.username)){
				// 		console.log(1)
				// 		return this.$utils.showLayer(this.$t('login').p_temail)
				// 	}
				// }else{
				
				// 	if(!this.$utils.checkMobile(this.username)){
				// 		console.log(1)
				// 		return this.$utils.showLayer(this.$t('login').p_taccount)
				// 	}
				// }
				var data={
					nickname: this.nickname,
					username: this.username,
					upwd: this.upwd,
					upwd2: this.upwd2,
					// smscode: this.smscode,
					lang:this.lang,
					oid:this.invitecode
				}
				var url=''
				
				// 手机注册
			
				url="user/register";
			
				this.$utils.initData({url,data,type:'POST'},(res,msg)=>{
					console.log(res)
					this.$utils.showLayer(msg);
					if(res.code == 200){
						setTimeout(()=>{
							uni.navigateTo({
								url:`../mine/login`
							})
						},1500)
					}
					
				})
			}
		}
	}
</script>

<style>
</style>
