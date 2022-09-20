<template>
	<view class="pt20 plr20" :class="{'light':theme=='light'}">
		<view class="flex alcenter pb10">
			<view class="flex1 tc plr15 mr20  ptb10 ft16 posRelt " :class="{'blue2':loginActive==0}" @tap="logintype(0)">
				{{$t('login').e_pwd}}
				<image src="/static/line_blue.png" class="myline" v-if="loginActive==0"></image>
			</view>
			<view class="flex1 tc plr15 ptb10 ft16 posRelt" :class="{'blue2':loginActive==1}" @tap="logintype(1)">
				{{$t('login').e_dealPwd}}
				<image src="/static/line_blue.png" class="myline" v-if="loginActive==1"></image>
			</view>
		
		</view>
		<view class="bgHeader plr10 ptb10 radius4" v-if="loginActive==0">
			<view class="mb10">
				<view class="flex bgwhite alcenter bdb_myblue ">
					<input type="password" password="" v-model="oldpwd" @input="oldpwd1" class="h40 lh40 flex1" :placeholder="$t('zdy').oldpwd">
					<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
				</view>
				<view class="ft10 pt5 chengse" v-if="verifyPwd1">{{$t('login').p_len}}</view>
			</view>
			<view class="mb10">
				<view class="flex bgwhite alcenter bdb_myblue ">
					<input type="password" password="" v-model="newpwd" @input="newpwd1" class="h40 lh40 flex1" :placeholder="$t('login').p_pwd">
					<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
				</view>
				<view class="ft10 pt5 chengse" v-if="verifyPwd2">{{$t('login').p_len}}</view>
			</view>
			<view class="mb10">
				<view class="flex bgwhite alcenter bdb_myblue ">
					<input type="password" password="" v-model="newpwd2" @input="newpwd21" class="h40 lh40 flex1" :placeholder="$t('login').p_confirmPwd">
					<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
				</view>
				<view class="ft10 pt5 chengse" v-if="verifyPwd3">两次密码不一致</view>
			</view>
		</view>
		<view class="bgHeader plr10 ptb10 radius4" v-if="loginActive==1">
			<view class="mb10">
				<view class="flex bgwhite alcenter bdb_myblue ">
					<input type="password" password="" v-model="oldpwd" @input="oldpwd1" class="h40 lh40 flex1" :placeholder="$t('login').e_ppwd">
					<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
				</view>
				<view class="ft10 pt5 chengse" v-if="verifyPwd1">{{$t('login').p_len}}</view>
			</view>
			<view class="mb10">
				<view class="flex bgwhite alcenter bdb_myblue ">
					<input type="password" password="" v-model="newpwd" @input="newpwd1" class="h40 lh40 flex1" :placeholder="$t('login').e_pdeal">
					<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
				</view>
				<view class="ft10 pt5 chengse" v-if="verifyPwd2">{{$t('login').p_len}}</view>
			</view>
			<view class="mb10">
				<view class="flex bgwhite alcenter bdb_myblue ">
					<input type="password" password="" v-model="newpwd2" @input="newpwd21" class="h40 lh40 flex1" :placeholder="$t('login').e_pdealConfrim">
					<image src="/static/image/password.png" class="wt15 h15 ml10"></image>
				</view>
				<view class="ft10 pt5 chengse" v-if="verifyPwd3">两次密码不一致</view>
			</view>
		</view>
		<!-- <view class="flex bgwhite alcenter bdb_myblue ">
			<input type="text" v-model="code"  class="h40 lh40 flex1" :placeholder="$t('login').p_vcode">
			<view><button size="mini" type="primary" :disabled="disable" :loading="load" @click="send">{{codeText}}</button></view>
		</view> -->
		<!-- <view class="mt20 flex alcenter">
			<view class=" flex alcenter">
				<checkbox value="cb" :checked="isAgree"  @tap="tapChecked" style="transform:scale(0.7);color:'#1881d2'"/>
				<text>我同意</text>
			</view>
			<view class="ml10 blue2">《用户协议及隐私政策》</view>
		</view> -->
		<view class="mt45 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="register">{{$t('login').e_confrim}}</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				loginActive:0,
				user_string:'',
				nickname:'',
				oldpwd:'',
				newpwd:'',
				newpwd2:'',
				code:'',
				area_code:'',
				isAgree:false,
				invite_code:'',
				verifyPwd1:false,
				verifyPwd2:false,
				verifyPwd3:false,
				lang:'',
				disable:false,
				load:false,
				codeText:this.$t('login').r_send,
				accountNumber:''
			}
		},
		onLoad(e) {
			// this.getUserInfo();
			this.user_string=e.user_string;
			this.code=e.code;
			this.is_mobile=this.is_mobile;
			this.area_code=this.areaCode;
			this.lang=uni.getStorageSync('lang');
			uni.setNavigationBarTitle({
				title:this.$t('login').security,
			})
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
		    this.$utils.setThemeTop(this.theme)
		},
		methods:{
			logintype(num){
				this.loginActive = num;
			},
			//获取用户信息
			getUserInfo(){
				var that = this;
				this.$utils.initDataToken({url:'member/getUserInfo',data:{},type:'get'},(res,msg)=>{
					that.accountNumber = res.account_number;
					that.area_code=res.area_code;
					that.area_code_id=res.area_code_id;
					});
				},
			//发送验证码
			send(){
				var reg = /^1[345678]\d{9}$/;
                var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				var url= 'sms_send';
				if (emreg.test(this.accountNumber)){
					url= 'sms_mail';
				}
				this.$utils.initDataToken({url:url,data:{
							user_string:this.accountNumber,
							type: "forget",
							lang:this.lang,
							area_code_id: this.area_code_id,
							area_code:  this.area_code,
						},type:'post'},(res,msg)=>{
					   this.disable = true;
					   // this.load = true;
					   var times = 10;
					   var timer = setInterval(()=>{
					   	times--;
					   	if(times<10){
					   		times = '0'+times;
					   	}
					   	this.codeText = times + 's'
					   	if(times<=0){
					   		clearInterval(timer);
					   		this.disable = false;
					   		this.load = false;
					   		this.codeText = this.$t('login').r_send;
					   	}
					   },1000)
					});
			},
			
			oldpwd1(e){
				if(e.target.value.length<6){
					this.verifyPwd1=true;
				}else{
					this.verifyPwd1=false;
				}
			},
			newpwd1(e){
				if(e.target.value.length<6){
					this.verifyPwd2=true;
				}else{
					this.verifyPwd2=false;
				}
			},
			newpwd21(e){
				if(e.target.value!=this.newpwd){
					this.verifyPwd3=true;
				}else{
					this.verifyPwd3=false;
				}
			},
			tapChecked(){
				this.isAgree=!this.isAgree;
			},
			register(){
				var that = this;
	
				if(!this.newpwd){
					return this.$utils.showLayer(this.$t('login').e_pdeal)
				}
				if(this.newpwd.length<6){
					return this.$utils.showLayer(this.$t('login').p_simple)
				}
				if(this.newpwd!=this.newpwd2){
					return this.$utils.showLayer(this.$t('login').p_inputagain)
				}
				
				if(that.loginActive == 1){
					var data={
						oldpwd: this.oldpwd,
						paypwd:this.newpwd						
					}
				}else{
					var data={
						oldpwd: this.oldpwd,
						newpwd:this.newpwd,
						newpwd2:this.newpwd2,
						
					}
				}
				
				this.$utils.initDataToken({url:'member/editUserPwd',data,type:'POST'},(res,msg)=>{
					this.nickname = '';
					this.oldpwd = '';
					this.newpwd = '';
					this.newpwd2 = '';
					
					that.$utils.showLayer(res.msg);
					if(res.code == 200){
						if(that.loginActive == 0){
							setTimeout(()=>{
								uni.navigateTo({
									url:'../mine/login'
								})
							},1500)
						}
					}
					
					
					
				})
			}
		}
	}
</script>

<style>
</style>
