<template>
	<view class="pt20 plr15 blue" :class="{ light: theme == 'light' }">
		<view class="currency  flex">
			<text :class="changeRechargeIndex==2?'currency-active':'bgPart'" @tap="changeRecharge(2)" >{{$t('zdy.qbdz')}}</text>
			<text class="bgPart" @tap="getBank()">{{$t('store.bank')}}</text>
		</view>
		<view class="bgPart flex alcenter between plr15 ptb15 radius4">
			<text>{{ $t('assets.cur_coin') }}</text>
			<text>USDT</text>
		</view>
		<view class="currency  flex" v-if="changeRechargeIndex==2">
			<text :class="changeIndex==0?'currency-active':'bgPart'" @tap="changeAddress(0)">TRC20</text>
			<text :class="changeIndex==1?'currency-active':'bgPart'" @tap="changeAddress(1)" >ERC20</text>
		</view>
		<view class="mt10" v-if="chargeType.length > 0">
			<view class="">{{$t('bind.liantype')}}</view>
			<view class="flex mt10">
				<view
					v-for="(item, index) in chargeType"
					:key="index"
					class="mr10 ptb5 plr10 bd_input radius4"
					:class="name == item.type ? 'active' : ''"
					@tap="selectCharge(item)"
				>
					{{ item.type }}
				</view>
			</view>
		</view>
		<view class="flex between mt10 alcenter" v-if="labelText">
			<view class="">{{ labelText }}</view>
			<view class="wt80 h30 lh30 radius4 bgBlue white tc" @tap="copyLabel">复制标签</view>
		</view>
		<view class="mt10 bgPart radius4 ptb20 plr15 tc">
			<view v-if="changeRechargeIndex==2">
			<image :src="img" mode="widthFix" :style="{ width: size + 'px', height: size + 'px' }" class="mauto"></image>
			<view class="mt20 ft12 tc">{{ $t('assets.addr_charge') }}</view>
			<view class="tc ft12  mt5">{{ address }}</view>
			<view class="mt20 wt80 h30 lh30 radius4 mauto bgBlue white" @tap="fuzhi_invite">{{ $t('assets.coypaddr') }}</view>
			</view>
<!-- 			<view v-if="changeRechargeIndex==1">
				<view class="mt20 tl">
					<text>{{$t('zdy.a34')}}</text>
					<input type="text" disabled class="mt10 blueinput" v-model="rechargeInfo.bank_name"/>
				</view>
				<view class="mt20 tl">
					<text>{{$t('zdy.a35')}}</text>
					<input type="text" disabled  class="mt10 blueinput" v-model="rechargeInfo.bank_account"/>
				</view>
				<view class="mt20 tl">
					<text>{{$t('zdy.a36')}}</text>
					<input type="text" disabled class="mt10 blueinput" v-model="rechargeInfo.open_bank"/>
				</view>
			</view> -->
			<view class="mt20 tl">
				<text>{{$t('zdy.czsl')}}</text>
				<input type="number"  v-model="amount" @input="inputAmount" class="mt10 blueinput"  :placeholder="$t('trade.p_num')"/>
			</view>
		<!-- 	<view class="mt20 tl" v-if="changeRechargeIndex==1">
				<text>{{$t('zdy.czje')}}￥</text>
				<input type="number"   v-model="amountRmb" disabled class="mt10 blueinput "  />
			</view> -->
			<!-- <view class="mt20 tl" v-if="changeRechargeIndex==0">
				<text>{{$t('zdy.qbdz')}}</text>
				<input type="text" v-model="useraccout" class="mt10 blueinput"  :placeholder="$t('zdy.enterqbdz')"/>
			</view>
			<view class="mt20 tl" v-if="changeRechargeIndex==0">
				<text>Upload screenshot</text><br><br>
				<g-upload ref='gUpload' :model="imgList" @chooseFile='chooseFile' @imgDelete='imgDelete' :control='control' :columnNum="columnNum"></g-upload>
			</view> -->
			<view class="tl mt20 rechargeview" @tap="recharge">{{ $t('zdy.tjsh') }}</view>
		</view>
		
		<view class="mt20 ">
			<view class="mb5">
				<text class="ft12">{{ $t('assets.c_tip1') }}</text>
				<text class="ft12">{{ currencyName || '--' }}</text>
				<text class="ft12">{{ $t('assets.assets') }}，</text>
				<text class="ft12">{{ $t('assets.c_tip2') }}。</text>
			</view>
			<view class="mb5">
				<text class="ft12">{{ currencyName || '--' }}</text>
				<text class="ft12">{{ $t('assets.c_tip3') }}。</text>
			</view>
			<view class="ft12">{{ $t('assets.c_tip4') }}。</view>
			<view class="mb5">
				<text class="ft12">{{ $t('assets.c_tip5') }}：</text>
				<text class="mainnum ft12">{{ coinInfo.min_number || '--' }}</text>
				<text class="ft12">{{ currencyName || '--' }}</text>
				,
			</view>
			<view class="mb5 ft12">{{ $t('assets.c_tip6') }}。</view>
			<view class="mb5 ft12">{{ $t('assets.c_tip7') }}。</view>
			<view class="mb5 ft12">{{ $t('assets.c_tip8') }}。</view>
		</view>
	</view>
</template>

<script>
import QR from '@/common/qrcode.js';
 import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
import { mapState } from 'vuex';
 import gUpload from "@/components/g-upload/g-upload.vue"
 import {domain2} from '@/common/domain.js'
export default {
    components: {
      gUpload
    },
	data() {
		return {
			amount:"",
			useraccout:"",
			changeIndex:0,
			address3:'ghfghfghfgh',
			address2:'fghfghfghfhfghfghfghgfhgfh',
			title: '',
			currency: '',
			coinInfo: {},
			img: '',
			size: 160,
			address: 'fghfghgfhfghfgh',
			name: '',
			chargeType: [],
			contractAddress: '',
			userId: '',
			currencyName: '',
			labelText: '',
			walletData: [],
			changeRechargeIndex:2,
			rechargeInfo:[],
			rmb:1,
			amountRmb:0.00,
			bank_account:"",
			control: true,
			columnNum: 1,
			imgList: '',
		};
	},
	onLoad(e) {
		this.currency = e.currency;
		this.name = e.name;
		uni.setNavigationBarTitle({
			title: this.$t('assets').charge
		});
		this.getAddress();
		// this.getBankCard();
		// this.getRmbRate();
	},
	onPullDownRefresh() {
		this.getCoinInfo();
	},
	computed: {
		...mapState(['theme'])
	},
	onShow() {
		this.$utils.setThemeTop(this.theme);
	},
	methods: {
		//点击上传控件上传
		uploadImg() {
			this.$refs.gUpload.uploadImg()
		},
		/*
		上传后返回的值：
		list：上传后图片数组
		v：返回当前上传图片的临时路径
		*/
		chooseFile(list, v) {
		  console.log("上传图片_list：", list)
		  console.log("上传图片_v：", v);
		  this.uploadFileToServe(v)
		},
      /*
      删除图片：
      list：删除返回删除后剩余的图片数组
      eq：返回删除的数组
      */
      imgDelete(list, eq) {
        console.log("删除图片_list：", list)
        console.log("删除图片_eq：", eq)
		this.imgList = ''
      },

      //控件内外部切换
      switch1Change(e) {
        this.control = !this.control
      },

      //图片行个数切换
      switch2Change(e) {
        this.columnNum = this.columnNum == 3 ? '4' : '3'
      },

      /*
      执行上传服务：
      urlList：要上传的图片：数组类型
      */
      uploadFileToServe(urlList) {
        if (!urlList || urlList.length <= 0) {
          return
        };
        for (let i = 0; i < urlList.length; i++) {
          uni.uploadFile({
            url: domain2 + '/api/upload', //仅为示例，非真实的接口地址
            filePath: urlList[i],
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: (uploadFileRes) => {
				var data = JSON.parse(uploadFileRes.data)
				this.imgList = data.message
              console.log(this.imgList);
            }
          });
        }
      },		  
		  
		inputAmount(){
			this.amountRmb=Number(this.amount*this.rmb).toFixed(2);
		},
		getRmbRate(){
			this.$utils.initDataToken({
				url:"wallet/getRateCurrency",
				data:{
					id:this.currency
				}
			},res=>{
				this.rmb=res.rmb;
			})
		},
		getBankCardUser(){
			this.$utils.initDataToken({
				url:"user/cash_info",
				type:"post",
			},res=>{
				if(!res.bank_account){
				  uni.navigateTo({
				  	url:'/pages/mine/collect_money'
				  })
				}else{
					this.bank_account=res.bank_account;
				}
			})
		},
		getBank(){
			uni.navigateTo({
				url:'/pages/assets/bankcharge'
			})
		},
		getBankCard(){
			this.$utils.initDataToken({
				url:"wallet/getRechargeSetting"				
			},res=>{
				this.rechargeInfo=res;
			})
		},			
		changeRecharge(i){
			if(i==1){
				this.getBankCardUser();
			}
			this.amount="";
			this.changeRechargeIndex=i;
		},
		recharge(){
			// let useraccout=this.useraccout;
			// this.changeRechargeIndex==1?useraccout="Bank card channel":"";
			// if(!useraccout){				
			// 	this.$utils.showLayer(this.$t('zdy.enterqbdz'));
			// 	return;
			// }
			if(!this.amount){				
				this.$utils.showLayer(this.$t('trade.p_num'));
				return;
			}
			uni.showLoading();
			this.$utils.initDataToken({ url: 'Recharge',type:"post", data:{
				money:this.amount,
				pay_type:this.changeRechargeIndex,
				}},res=>{
				
				// 发起成功，请联系客服确认
				
				if(res.code == 200){
					this.$utils.showLayer(this.$t('zdy.fasuccess'));
					this.amount='';
					setTimeout(() => {
						uni.reLaunch({
							url:'../mine/kefu'
						})
					}, 1500);
				}else{
					this.$utils.showLayer(res.msg);
				}
					
			})
		},
		changeAddress(i){
			this.changeIndex=i;
			if(i==0){
				this.address = this.address3;
				this.creatQrcode();
			}else{
				this.address = this.address2;
				this.creatQrcode();
			}
		},
		getCoinInfo() {
			this.$utils.initDataToken({ url: 'wallet/get_info', type: 'POST', data: { currency: this.currency } }, res => {
				this.currencyName = res.name;
				this.walletData = res.wallet_data;
				if (res.multi_protocol == 1) {
					this.chargeType = res.type_data;
					this.contractAddress = res.type_data[0].contract_address;
					this.name = res.type_data[0].type;
					this.coinInfo = res.type_data[0];
					var ids = res.type_data[0].id;
					if (res.wallet_data && res.wallet_data.length > 0) {
						res.wallet_data.forEach(item => {
							if (ids == item.currency) {
								this.labelText = item.label;
							}
						});
					}
				} else {
					this.contractAddress = res.contract_address;
					this.name = res.type;
					this.coinInfo = res;
					if (res.wallet_data && res.wallet_data.length > 0) {
						this.labelText = res.wallet_data[0].label;
					}
				}
				this.getUserInfo();
			});
		},
		getUserInfo() {
			this.$utils.initDataToken({ url: 'user/info' }, res => {
				this.userId = res.id;
				this.getAddress(res.id);
			});
		},
		// 选择充币类型
		selectCharge(options) {
			var that = this;
			that.contractAddress = options.contract_address;
			that.name = options.type;
			that.coinInfo = options;
			var ids = options.id;
			if (that.walletData.length > 0) {
				that.walletData.forEach(item => {
					if (ids == item.currency) {
						that.labelText = item.label;
					}
				});
			}
			that.getAddress(that.userId);
		},
		getAddress(id) {
			this.$utils.initDataToken({url: 'getAddress' }, res => {
				uni.stopPullDownRefresh();
					if(res.data.trc20 || res.data.erc20){
						this.address2=res.data.erc20;
						this.address3=res.data.trc20;
						this.address = res.data.trc20;
						this.creatQrcode();
					}else if(res.data.erc20){
						this.address = res.data.erc20;
						this.creatQrcode();
					}else if(res.data.trc20){
						this.address = res.data.trc20;
						this.creatQrcode();
					}else{
						this.address = res;
						this.creatQrcode();
					}
			});
		},
		// 复制
		fuzhi_invite() {
			var that = this;
			// #ifdef APP-PLUS
			uni.setClipboardData({
				data: that.address,
				success: function() {
					that.$utils.showLayer(that.$t('assets.copy_success'));
				},
				fail: function() {
					that.$utils.showLayer(that.$t('assets.copy_err'));
				}
			});
			// #endif
			 const result = h5Copy(that.address)
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
		copyLabel() {
			var that = this;
			// #ifdef APP-PLUS
			uni.setClipboardData({
				data: that.labelText,
				success: function() {
					that.$utils.showLayer(that.$t('assets.copy_success'));
				},
				fail: function() {
					that.$utils.showLayer(that.$t('assets.copy_err'));
				}
			});
			// #endif
		},
		creatQrcode() {
			if (this.address == '') {
				return false;
			}
			let img = QR.createQrCodeImg(this.address);
			this.img = img;
		},
		  afterRead(e) {
		      // afterRead传过来的是一个中间文件对象
		        const file = e
		
		      uni.showLoading({
		        title: 'Uploading...',
		        mask: true
		      });
		      file.map(item => {
		        uploadFile(item.path).then(res => {
		            uni.hideLoading();
		                // 上传完毕后按照后端服务器返回的数据来操作fileList
		            //
		            this.fileList.push(res)
		        });
		      })
		  },
		  // 上传到你的服务器
		  uploadFile(path) {
		    return new Promise(resolve => {
		        uni.uploadFile({
		          url: '', //你服务器上的url
		          filePath: path,
		          name: 'file',
		          fileType: 'image',
		          cloudPath: '',
		          success: res => {
		            console.log('uploadFile res ==> ', res)
		            let data = JSON.parse(res.data);
		
		            if (data.code == 1) {
		              resolve(data.data);
		            }
		          },
		          fail: (err) => {
		               console.log('error ==>', err)
		          }
		        });
		      });
		  },
		  handleImage(index) {
		     this.fileList.splice(index)
		  }
	}
};
</script>

<style>
.rechargeview{
	color:#fff;
	border-radius: 5px;
	text-align: center;
	width: 150upx;
	height: 60upx;
	line-height: 60upx;
	background-color: #1881d2;
}
.blueinput{
	padding: 0 5%;
	height: 60upx;
	line-height: 60upx;
	border: 1px solid #007AFF;
}
.currency{
	margin:10px auto;
	
	justify-content: space-between;
}
.currency-active{
	color:#fff;
	background-color: #007aff;
}
.currency text{
	width: 48%;
	padding: 10px 0;
	text-align: center;
	display: inline-block;
}
.active {
	color: #007aff;
	border-color: #007aff;
}
</style>
