<template>
	<view class="" :class="{'light':theme=='light'}">
		<view class="plr15 ptb30 bgPart">
			<view class=" flex alcenter between bd2f" >
				<view class="flex alcenter pl15 flex1">
					<view class="flex column alcenter ">
						<text class="wt5 h5 radius50p bgBlue"></text>
						<view class="h20 mt5 mb5 bdl2f" ></view>
						<text class="wt5 h5 radius50p bgred"></text>
					</view>
					<view class="ml10 flex1" >
						<view class="h40 lh40 bdb2f flex alcenter"><text class="blue pr10" >{{$t('assets.from')}}</text> <view :class="[{'animateDown':type==2,'animateOff':type==1}]">{{changeName[0]}}</view></view>
						<view class="h40 lh40 flex alcenter"><text class="blue pr10">{{$t('assets.to')}}</text> <view :class="[{'animateUp':type==2,'animateOff':type==1}]">{{changeName[1]}}</view></view>
					</view>
				</view>
				<view class="plr15 bggray h80 flex alcenter jscenter" >
					<view class="wt30 h30 radius50p bggray flex alcenter jscenter" @tap="tapChange">
						<image src="../../static/image/transfer1.png" class="wt15 h15"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="mt10 plr15 bgPart pt20" style="min-height: 75.0vh;">
			<view class="">{{$t('assets.transfernum')}}</view>
			<view class="flex alcenter between bdb1f mt10">
				<input type="number" class="h40 flex1" v-model="number"  :placeholder="$t('assets.p_transfernum')">
				<view class="flex alcenter">
					<text class="blue ft14 pr10 bdr_white50">{{name||'--'}}</text>
					<view class="pl10" @tap="all">{{$t('trade.all')}}</view>
				</view>
			</view>
			<view class="mt10 blue ft12">
				{{$t('trade.use')}} 
				<text v-if="type==1">{{seller_balance}}</text> 
				<text v-else>{{user_balance}}</text> 
			</view>
			<view class="mt50 bgBlue radius4 ptb10 white ft14 tc mb10" @tap="transfer">{{$t('assets.transfer')}}</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				number:'',
				changeName:[this.$t('store.business'),this.$t('store.user')],
				type:1,
				seller_balance:'',
				user_balance:'',
				storeid:'',
				name:''
			}
		},
		onLoad(e) {
			this.storeid = e.id;
			uni.setNavigationBarTitle({
				title:this.$t('assets').transfer
			})
			this.getinfo()
		},
		onPullDownRefresh() {
			this.getinfo()
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
		},
		methods: {
			tapChange(){
				this.type=this.type==1?2:1;
				console.log(this.type)
			},
			
			all(){
				if(this.type==1){
					this.number=this.seller_balance
				}else{
					this.number=this.user_balance
				}
			},
			getinfo(){
				let that = this;
				that.$utils.initDataToken({ url: 'seller_info',data:{id:that.storeid}}, res => {
					this.seller_balance = res.seller_balance;
					this.user_balance = res.user_legal_balance;
					this.name = res.currency_name;
				});
			},
			transfer() {
				if(!this.number){
					return this.$utils.showLayer(this.$t('assets.p_transfernum'))
				}
				this.$utils.initDataToken({url:'seller/transfer',type:'POST',data:{
					seller_id:this.storeid,
					number:this.number,
					type:this.type
				}},res=>{
					this.number='';
					this.$utils.showLayer(res);
					setTimeout(()=>{
						this.getinfo();
					},1000)
				})
			}
		},
	}
</script>

<style>
	.animateUp{
		transform: translateY(-80upx);
		transition: all .5s;
	}
	.animateDown{
		transform: translateY(80upx);
		transition: all .5s;
	}
	.animateOff{
		transform: translateY(0);
		transition: all .5s;
	}
</style>
