<template>
	<view class="plr20 " :class="{'light':theme=='light'}">
	<!-- 	<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text>{{$t('assets.phone')}}：</text>
			
			<input type="text"  v-model="phone" :value="phone" class="h40 lh40 pr10 tr flex1" :placeholder="$t('login.p_mobile')">
		</view> -->
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text>{{$t('authentication.name')}}：</text>
			
			<input type="text"  v-model="name" :value="name" class="h40 lh40 pr10 tr flex1" :placeholder="$t('collect.p_name')" :disabled="!isbank">
		</view>
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text>{{$t('collect.no')}}：</text>
			
			<input type="text"  v-model="card_id" :value="card_id" class="h40 lh40 pr10 tr flex1" :placeholder="$t('zdy.entercard')" :disabled="!isbank">
		</view>
		
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text>{{$t('zdy.kaihu')}}：</text>
			
			<input type="text"  v-model="content" :value="content" class="h40 lh40 pr10 tr flex1" :placeholder="$t('zdy.enterkaihu')" :disabled="!isbank">
		</view>
		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text>{{$t('zdy.kaizhi')}}：</text>
			
			<input type="text"  v-model="address" :value="address" class="h40 lh40 pr10 tr flex1" :placeholder="$t('zdy.enterkaizhi')" :disabled="!isbank">
		</view>
<!-- 		<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
			<text>{{$t('zdy.numbank')}}：</text>
			
			<input type="text"  v-model="walletAddress" :value="walletAddress" class="h40 lh40 pr10 tr flex1" :placeholder="$t('zdy.enternumbank')" :disabled="!isbank">
		</view> -->
		
		<view class="mt30 h40 lh40 tc white bgBlue radius28 ft14" @tap="confirm" v-show="isbank">{{$t('login.e_confrim')}}</view>
	</view>
</template>

<script>
	import {domain} from '@/common/domain.js'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				name:'',
				card_id:'',
				content:'',
				address:'',
				walletAddress:'',
				phone:'',
				msg:'',
				code:0,
				isbank:0
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('authentication').card
			})
			this.getInfo();
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
		    this.$utils.setThemeTop(this.theme)
		},
		methods:{
			getInfo(){
				this.$utils.initDataToken({url:'member/bankCard',data:{},type:'get'},(res,msg)=>{
					this.msg =res.data;
					
					if(res.code == 200){
						this.code = res.code;
						this.name = res.data.name;
						this.card_id = res.data.cardno;
						this.content = res.data.content;
						this.address = res.data.address;
						// this.walletAddress = res.data.walletAddress;
						this.isbank = 0
						// this.phone = res.data.phone;
					}else if(res.code == 204){
						this.isbank = 1
					}
					
				});
			},
			uploadImg(i){
				console.log(domain);
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
								if(data.code==200){
									var img='img'+i;
									var hsup='hasUp'+i;
									console.log(i,img)
									that[img]=data.data;
									that[hsup]=true;
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
				if(!this.card_id){
					return this.$utils.showLayer(this.$t('collect.p_cardno'))
				}
				if(!this.content){
				
					return this.$utils.showLayer(this.$t('zdy.enterkaihu'))
				}
				// if(!this.address){
				
				// 	return this.$utils.showLayer(this.$t('zdy.enterkaizhi'))
				// }
				// if(!this.walletAddress){
					
				// 	return this.$utils.showLayer(this.$t('zdy.enternumbank'))
				// }
				// if(!this.phone){
					
				
				// 	return this.$utils.showLayer(this.$t('login.p_mobile'))
				// }
				
				// if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				
				//    return this.$utils.showLayer(this.$t('login.p_mobile'))
				//  }
				
				
				this.$utils.initDataToken({url:'member/addBankCard',type:'POST',data:{
					name:this.name,
					cardno:this.card_id,
					content:this.content,
					address:this.address,
					// walletAddress:this.walletAddress,
					// phone:this.phone,
				}},(res,msg)=>{
					this.$utils.showLayer(msg);
					setTimeout(()=>{
						this.getInfo();
					},1500)
				})
			}
		}
	}
</script>

<style>
</style>
