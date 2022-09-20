<template>
	<view class="pt30 " :class="{'light':theme=='light'}">
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
		<view class="tc">
			<image src="../../static/logo.png" mode="widthFix" class="wt100"></image>
		</view>
		<view class="mt20 plr10">
			<view class="flex alcenter">
				<view class="plr15 mr20  ptb10 ft16 posRelt " :class="{'blue2':loginActive==0}" @tap="logintype(0)">
					{{$t('login').l_mobile}}
					<image src="/static/line_blue.png" class="myline" v-if="loginActive==0"></image>
				</view>
				<view class="plr15 ptb10 ft16 posRelt" :class="{'blue2':loginActive==1}" @tap="logintype(1)">
					{{$t('login').l_email}}
					<image src="/static/line_blue.png" class="myline" v-if="loginActive==1"></image>
				</view>
			
			</view>
			<view class="mt20 plr10 ptb10 radius4 bgHeader">
				<view class="flex alcenter bdb_myblue mb10 ">
					<view class="flex alcenter flex1">
						
						<input type="text"  v-model="user_string" class="h40 lh40  flex1" v-if="loginActive==1" :placeholder="$t('login').p_email">
						<input type="number" v-model="user_string" class="h40 lh40  flex1" v-else :placeholder="$t('login').p_mobile">
						<image src="/static/image/mobile.png" class="wt15 h15 ml10" v-if="loginActive==0"></image>
						<image src="/static/image/email.png" class="wt15 h15 ml10" v-else></image>
					</view>
				</view>
				<view class="mb10">
					<view class="flex bgwhite alcenter bdb_myblue ">
						
						<input type="text" password="" v-model="password" @input="passwordInput" class="h40 lh40 flex1" :placeholder="$t('login').p_pwd">
						<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
					</view>
					<!-- <view class="ft10 pt5 chengse" v-if="verifyPwd">密码输入不正确</view> -->
				</view>
				<view class="mt15 flex alcenter">
					<checkbox value="cb" :checked="isRemember"  @tap="tapChecked" style="transform:scale(0.7);color:'#1881d2'"/>
					<text>{{$t('login').rem_pwd}}</text>
				</view>
				<view class="mt20 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="login">{{$t('login').login}}</view>
				<!-- <view class="mt20 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="downloadUrl">APP {{$t('home').download}}</view> -->
			</view>
			<view class="mt30 flex alcenter between">
				<view class="flex alcenter plr10">
					<text>{{$t('login').noaccount}}</text>
					<navigator url="register" class="blue2">{{$t('login').register}}</navigator>
				</view>
				<navigator url="kefu"  open-type="switchTab" class="blue2">{{$t('login').forget_pwd}}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import country from '@/common/country.js'
	import {mapState} from 'vuex'
	import {domain2} from '@/common/domain.js'
	export default{
		data(){
			return {
				url:'',
				loginActive:0,
				user_string:'',
				password:'',
				re_password:'',
				code:'',
				array: country,
				index: 0,
				area_code:'+86',
				hasSend:false,
				second:60,
				isRemember:false,
				verifyPwd:false,
				isShowCode:false,
				download:'',
				timeInterval:'',
				lang:'',
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
		computed:{
			...mapState(['theme']),
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('login').login
			})
			if(uni.getStorageSync('isRemember')==0){
				this.isRemember=false;
			}else{
				this.isRemember=true;
				this.user_string= uni.getStorageSync('userString');
				this.password=uni.getStorageSync('userPwd');
			}
			if(!uni.getStorageSync('lang')){
				window.location.reload()
			}else{
				this.lang=uni.getStorageSync('lang');
			}
			
			// this.$utils.getGlobalSettting({url:'env.json'},res=>{
			// 	console.log(res);
			// 	uni.setStorageSync('socketPort',res.socket_io_port)
			// 	uni.setStorageSync('smcode',res.login_need_smscode)
			// 	this.isShowCode=res.login_need_smscode;
			// })
		},
		onShow() {
			this.getDownload();
			this.$utils.setThemeTop(this.theme)
		},
		onUnload:function(){  
		    if(this.timer) {  
		        clearInterval(this.timer);  
		        this.timer = null;  
		    }  
		},
		methods:{
			logintype(num){
				this.loginActive = num;
				this.user_string = '';
				this.password = '';
			},
			jump(){
				window.location.href= this.url
			},
			downloadUrl(){
				window.location.href = this.download
			},
			download(){
				uni.request({
				    url: domain2 + 'api/download', //仅为示例，并非真实接口地址。
				    method : 'GET',
				    success: (res) => {
				        console.log(res);
				        this.url = res.data;
				    }
				});
			},
			// 区号选择
			bindPickerChange(e){
				this.index=e.target.value;
				let item=this.array[this.index];
				this.area_code=item.area_code;
			},
			// 获取验证码
			getCode(){
				if(this.timeInterval) return;
				if(this.loginActive==0){
					if(!this.user_string){
						return this.$utils.showLayer(this.$t('login').p_taccount)
					}
					this.$utils.initData({url:'sms_send',type:'POST',data:{user_string:this.user_string,scene:'login',country_code:this.area_code,lang:this.lang}},(res,msg)=>{
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
					if(!this.$utils.checkEmail(this.user_string)){
						return this.$utils.showLayer(this.$t('login').p_email)
					}
					this.$utils.initData({url:'sms_mail',type:'POST',data:{user_string:this.user_string,scene:'login',lang:this.lang}},(res,msg)=>{
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
				}
			},
			// 是否选中记住密码
			tapChecked(){
				this.isRemember=!this.isRemember;
				if(this.isRemember){
					uni.setStorageSync('isRemember',1)
				}else{
					uni.setStorageSync('isRemember',0)
				}
			},
			getDownload(){
				this.$utils.initDataToken({
					url:"getConfig",
					data:{
						conf:'web_app'
					},
					type:'post'
				},res=>{
					this.download=res.data;
				})
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
					title:this.$t('login').login
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
			login(){
				var area_code=0;
				var area_code_id=0;
				// if(this.loginActive==1){
				// 	// 邮箱登录
				// 	if(!this.$utils.checkEmail(this.user_string)){
				// 		console.log(1)
				// 		return this.$utils.showLayer(this.$t('login').p_temail)
				// 	}
				// }else{
					
				// 	 area_code=this.area_code.substr(this.area_code.indexOf("+")+1);
				// 	 area_code_id=area_code=="86"?1:0;
				// 	if(!this.user_string){
				// 		return this.$utils.showLayer(this.$t('login').p_taccount)
				// 	}
				// }
				if(!this.password){
					return this.$utils.showLayer(this.$t('login').p_pwd)
				}
				if(this.password.length<6){
					return this.$utils.showLayer(this.$t('login').p_pwderr)
				}
				if(this.isShowCode&& !this.code){
					return this.$utils.showLayer(this.$t('login').p_vcode)
				}				
				var data={
					username: this.user_string,
                    pwd: this.password,
				}
				
				this.$utils.initData({url:'user/login',data,type:'POST'},(res,msg)=>{
					// console.log(111);
					uni.setStorageSync('token',res.data.token);
					this.$utils.showLayer(msg);
					if(this.isRemember){
						uni.setStorageSync('userString',this.user_string);
						uni.setStorageSync('userPwd',this.password);
					}
					if(res.code == 200){
						setTimeout(() => {
							uni.reLaunch({
								url:'/pages/home/home'
							})
						}, 1500);
					}
					
				})
			},
			
		}
	}
</script>

<style>

</style>
