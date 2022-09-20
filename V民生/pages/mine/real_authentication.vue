<template>
	<view class="plr10 " :class="{'light':theme=='light'}">
		
			<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3 ">
				<text>{{$t('authentication.name')}}：</text>
				
				<input type="text"  v-model="name" :value="name" class="h40 lh40 pr10 tr flex1" disabled="true" v-if="hasname">
				<input type="text"  v-model="name" :value="name" class="h40 lh40 pr10 tr flex1" v-else :placeholder="$t('collect.p_name')">
			</view>
			<view class="flex bgwhite alcenter radius4 pl10 mt10 bdb_blue3">
				<text>{{$t('collect.cardno')}}：</text>
				<input type="text"  v-model="card_id" :value="card_id" class="h40 lh40 pr10 tr flex1" disabled="true" v-if="hascard_id">
				<input type="text"  v-model="card_id" :value="card_id" class="h40 lh40 pr10 tr flex1" v-else :placeholder="$t('collect.p_cardno')">
			</view>
			<view class="mt10 pl10" v-if="idStatus == 0">{{$t('collect.up_card')}}</view>
			<view class="flex mt10 mywrap between" v-if="idStatus == 0">
				<view class="w48 ptb5 plr5 bd_dashed radius4 tc mb10">
					<view class="" v-if="!hasUp1"  @tap="uploadImg(1)">
						<image :src="img" class="wt80 h80" ></image>
						<view class="mt10 tc">{{$t('collect.up_cardz')}}</view>
					</view>
					<image :src="img1" class="w95" mode="widthFix" v-else-if="idStatus == 1" style="max-height: 100px;"></image>
					<image :src="img1" class="w95" mode="widthFix" v-else  @tap="uploadImg(1)" style="max-height: 100px;"></image>
				</view>
				<view class="w48 ptb5 plr5 bd_dashed radius4 tc mb10">
					<view class="" v-if="!hasUp2" @tap="uploadImg(2)">
						<image :src="img" class="wt80 h80" ></image>
						<view class="mt10 tc">{{$t('collect.up_cardf')}}</view>
					</view>
					<image :src="img2" class="w95" mode="widthFix" v-else-if="idStatus == 1" style="max-height: 100px;"></image>
					<image :src="img2" class="w95 " mode="widthFix" v-else  @tap="uploadImg(2)" style="max-height: 100px;"></image>
				</view>
				
			</view>
<!-- 			<view class="flex mt10 mywrap between">
				<view class="w48 ptb5 plr5 bd_dashed radius4 tc mb10">
					<view class="" v-if="!hasUp3"  @tap="uploadImg(3)">
						<image :src="img" class="wt80 h80" ></image>
						<view class="mt10 tc">{{$t('collect.up_cardhand')}}</view>
					</view>
					<image :src="img3" class="w95" mode="widthFix"  v-else-if="idStatus == 1"  style="max-height: 100px;"></image>
					<image :src="img3" class="w95 " mode="widthFix" v-else  @tap="uploadImg(3)" style="max-height: 100px;"></image>
				</view>
				
			</view> -->
			<view class="mt30 h40 lh40 tc white radius28 bgBlue ft14" @tap="confirm"  v-if="msg.idStatus == 0 || msg.idStatus == 2">提交</view>
			<!-- <view class="mt30 h40 lh40 tc white bgBlue radius28 ft14" @tap="confirm" v-else-if="msg.idStatus == 2 || msg.idStatus == 0">提交</view> -->
			
		
	</view>
</template>

<script>
	import {domain} from '@/common/domain.js'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				loginActive:0,
				name:'',
				card_id:'',
				hasname:'',
				hascard_id:'',
				img:'/static/image/addImg.png',
				hasUp1:false,
				hasUp2:false,
				hasUp3:false,
				img1:'',
				img2:'',
				img3:'',
				idStatus:0,
				msg:''
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('authentication').renzheng
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
			logintype(num){
				this.loginActive = num;
			},
			getInfo(){
				this.$utils.initDataToken({url:'member/verified',data:{},type:'get'},(res,msg)=>{
					this.msg =res.data;
					this.name = res.data.realName;
					this.hasname = res.data.realName;
					this.card_id = res.data.idCardNum;
					this.hascard_id = res.data.idCardNum;
					this.img1 = res.data.topPic;
					this.img2 = res.data.botPic;
					this.img3 = res.data.headPic;
					this.idStatus = res.data.idStatus;
					if(!res.data.topPic){
						this.hasUp1 = false;
						
					}else{
						this.hasUp1 = true;
					}
					if(!res.data.botPic){
						this.hasUp2 = false;
					}else{
						this.hasUp2 = true;
					}
					if(!res.data.headPic){
						this.hasUp3 = false;
					}else{
						this.hasUp3 = true;
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
				if(!this.img1){
					return this.$utils.showLayer(this.$t('collect.up_cardz'))
				}
				if(!this.img2){
					return this.$utils.showLayer(this.$t('collect.up_cardf'))
				}
				// if(!this.img3){
				// 	return this.$utils.showLayer(this.$t('collect.up_cardhand'))
				// }
				this.$utils.initDataToken({url:'member/submitVerified',type:'POST',data:{
					name:this.name,
					IdCard:this.card_id,
					top_pic:this.img1,
					bot_pic:this.img2,
					// head_pic:this.img3,
				}},(res,msg)=>{
					this.$utils.showLayer(msg);
					if(res.code == 200){
						setTimeout(()=>{
							this.getInfo();
						},1500)
					}
					
				})
			}
		}
	}
</script>

<style>
</style>
