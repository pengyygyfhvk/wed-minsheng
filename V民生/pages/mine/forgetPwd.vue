<template>
	<view class="plr20" :class="{'light':theme=='light'}">
		<view class="mt30 ">
			<view class="flex alcenter">
				<view class="plr15 mr20  ptb10 ft16 posRelt " :class="{'blue2':loginActive==0}" @tap="loginActive=0;">
					{{$t('login').f_mobile}}
					<image src="/static/line_blue.png" class="myline" v-if="loginActive==0"></image>
				</view>
				<view class="plr15 ptb10 ft16 posRelt" :class="{'blue2':loginActive==1}" @tap="loginActive=1;">
					{{$t('login').f_email}}
					<image src="/static/line_blue.png" class="myline" v-if="loginActive==1"></image>
				</view>
			</view>
			<view class="mt40 ">
				<view class="flex alcenter bdb_myblue mb10 ">
					<view class="flex  alcenter between mr10" v-if="loginActive==0">
						<picker :value="index" :range="array" class=" flex1"  @change="bindPickerChange" range-key="name_en">
							<!-- <view class="uni-input">{{array[index].name_cn}}</view> -->
							<view class="ft12">{{array[index].name_en}}{{array[index].area_code}}</view>
						</picker>
						<image src="/static/image/trade_arrow_down.png" class="wt10 h8 ml5"></image>
					</view>
					<view class="flex alcenter flex1">
						<input type="text"  v-model="user_string" class="h40 lh40  flex1" v-if="loginActive==1" :placeholder="$t('login').p_email">
						<input type="number" v-model="user_string" class="h40 lh40  flex1" v-else :placeholder="$t('login').p_mobile">
					</view>
				</view>
				<view class="mt50 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="goNext">{{$t('login').r_next}}</view>
			</view>
		</view>
		<view class="fixed my_layer pos_l0b0 w100 ht100" v-if="isShowCodeLayer" @tap="isShowCodeLayer=false;">
			<view class="fixed pos_l0b0 bgHeader w100 pt20 pb10 plr10" @tap.stop>
				<view class="ptb14 tc blue2 ft14 bold" v-if="loginActive==0">{{$t('login').r_sms}}</view>
				<view class="ptb14 tc blue2 ft14 bold" v-else>{{$t('login').r_smsemail}}</view>
				<view class="flex bgwhite alcenter bdb_blue mb10 mt20" >
					<input type="text" v-if="loginActive==0" v-model="code" class="h40 lh40 flex1" :placeholder="$t('login').r_pmobilecode">
					<input type="text" v-else v-model="code" class="h40 lh40 flex1" :placeholder="$t('login').r_pemailcode">
					<view class="ml10 plr10 white bgBlue ptb5 radius4" @tap="getCode">
						<text v-if="!hasSend">{{$t('login').r_send}}</text>
						<text v-else>{{second}}s</text>
					</view>
				</view>	
				<view class="mt30 bgBlue radius4 ptb10 white ft14 tc mb10" @tap.stop="confirm">{{$t('login').r_next}}</view>
			</view>
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
				isShowCodeLayer:false,
				timeInterval:'',
				lang:'',
				nationality:'China'
			}
		},
		onLoad() {
			this.lang=uni.getStorageSync('lang');
			uni.setNavigationBarTitle({
				title:this.$t('login').forget_pwd
			})
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
		   this.$utils.setThemeTop(this.theme)
		},
		methods:{
			// 区号选择
			bindPickerChange(e){
				this.index=e.target.value;
				let item=this.array[this.index];
				this.area_code=item.area_code;
				this.nationality=item.name_en;
			},
			// 获取验证码
			getCode(){
				if(this.timeInterval) return;
				if(this.loginActive==0){
					if(!this.user_string){
						return this.$utils.showLayer(this.$t('login').p_taccount)
					}
					this.$utils.initData({url:'sms_send',type:'POST',
						data:{
							user_string:this.user_string,
							scene:'reset_password',
							country_code:this.area_code,
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
					if(!this.$utils.checkEmail(this.user_string)){
						return this.$utils.showLayer(this.$t('login').p_temail)
					}
					this.$utils.initData({url:'sms_mail',type:'POST',
						data:{
							user_string:this.user_string,
							scene:'reset_password',
							lang:this.lang,
							country_code:this.area_code,
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
				}
			},
			// 下一步
			goNext(){
				if(this.loginActive==1){
					// 邮箱登录
					if(this.user_string.indexOf("@")==-1){
						return this.$utils.showLayer(this.$t('login').p_temail)
					}
					this.isShowCodeLayer=true;
					this.hasSend=false;
					this.timeInterval='';
					this.code='';
				}else{
					if(!this.user_string){
						return this.$utils.showLayer(this.$t('login').p_taccount)
					}else{
						this.confirm();
					}
				}
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
				if(!this.code && this.loginActive==1){
					return this.$utils.showLayer(this.$t('login').p_vcode)
				}
				var data={
					user_string: this.user_string,
					lang:this.lang
				}
				var url=''
				if(this.loginActive==0){
					// 手机登录
					data.country_code=this.area_code;
					data.mobile_code=this.code;
					url="user/check_mobile";
					data.scene='reset_password';
					data.lang=this.lang;
				}else{
					data.email_code=this.code;
					data.country_code=this.area_code;
					data.scene='reset_password';
					url='user/check_email';
					data.lang=this.lang;
				}
				this.$utils.initData({url,data,type:'POST'},(res,msg)=>{
					this.$utils.showLayer(msg);
					this.isShowCodeLayer=false;
					setTimeout(()=>{
						uni.navigateTo({
							url:'/pages/mine/forgetPwdNext?account='+this.user_string+'&code='+this.code+'&country_code='+this.area_code
						})
					},1500)
				})
			}
		}
	}
</script>

<style>
</style>
