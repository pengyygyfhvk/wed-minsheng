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
						<view class="h40 lh40 bdb2f flex alcenter" @tap="changeOne"><text class="blue pr10" >{{$t('assets.from')}}</text> <view :class="[{'animateDown':type==1,'animateOff':type==0}]">{{changeName[0]}}</view></view>
						<view class="h40 lh40 flex alcenter" @tap="changeTwo"><text class="blue pr10">{{$t('assets.to')}}</text> <view :class="[{'animateUp':type==1,'animateOff':type==0}]" >{{changeName[1]}}</view></view>
					</view>
				</view>
				<view class="plr15 bggray h80 flex alcenter jscenter" >
					<view class="wt30 h30 radius50p bggray flex alcenter jscenter" @tap="tapChange">
						<image src="../../static/image/transfer1.png" class="wt15 h15"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="bgHeader h10"></view> -->
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
				<text >{{balance}}</text> 
				{{name}}
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
				name:'',
				coinInfo:{},
				changeName:[this.$t('assets.microacc'),this.$t('assets.tradeacc')],
				changeType:['legal','change'],
				type:0,//法币兑币币
				hasChange:0,
				animateTab1:'',
				animateTab2:'',
				currencyLegal:{},
				currencyTrade:{},
				balance:'',
				wallet_id:'',
				tabIndex:'micro',
				tabIndexTwo:'change',
				tabList:[{name:"change",value:this.$t('assets.tradeacc')},{name:"lever",value:this.$t('assets.leveracc')},{name:"micro",value:this.$t('assets.microacc')}]			
			}
		},
		onLoad(e) {
			this.name=e.name;
			uni.setNavigationBarTitle({
				title:this.$t('assets').transfer
			})
			this.getList()
		},
		onPullDownRefresh() {
			this.getList()
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
		},
		methods: {
			changeOne(){
				let that=this;
				uni.showActionSheet({
					itemList:[this.$t('assets.tradeacc'),this.$t('assets.leveracc'),this.$t('assets.microacc')],					
					success:res=>{
						that.changeName[0]=that.tabList[res.tapIndex].value;
						that.tabIndex=that.tabList[res.tapIndex].name;								
						that.$forceUpdate();
						that.getBalance(that.tabIndex);
					}
				})
			},
			changeTwo(){
				let that=this;
				uni.showActionSheet({
					itemList:[this.$t('assets.tradeacc'),this.$t('assets.leveracc'),this.$t('assets.microacc')],
					success:res=>{
						that.changeName[1]=that.tabList[res.tapIndex].value;
						that.tabIndexTwo=that.tabList[res.tapIndex].name;				
						that.$forceUpdate();
						that.getBalance(that.tabIndexTwo);
					}
				})
			},
			getBalance(type){
				this.$utils.initDataToken({url:'wallet/detail',type:'post',data:{
					type,
					currency:this.wallet_id,
				}},res=>{
					if(type=="change"){
						this.balance=res.change_balance
					}
					if(type=="lever"){
						this.balance=res.lever_balance
					}
					if(type=="micro"){
						this.balance=res.micro_balance
					}
					if(type=="legal"){
						this.balance=res.legal_balance
					}
				})
			},
			getList(){
				this.$utils.initDataToken({url:'wallet/list',type:'POST'},res=>{
					uni.stopPullDownRefresh();
					var micro_wallet=res.micro_wallet.balance;
					var selectmicro_wallet=micro_wallet.filter(item=>item.currency_name==this.name)||[];
					if(selectmicro_wallet.length>0){
						this.currencyLegal=selectmicro_wallet[0];
						if(this.type==0){
							this.balance=selectmicro_wallet[0].legal_balance;
						}
						this.wallet_id=selectmicro_wallet[0].currency;
					}
					var change_wallet=res.change_wallet.balance;
					var select_change_wallet=change_wallet.filter(item=>item.currency_name==this.name)||[];
					if(select_change_wallet.length>=0){
						this.currencyTrade=select_change_wallet[0];
						if(this.type==1){
							console.log(222)
							this.balance=select_change_wallet[0].change_balance;
						}
					}
				})
			},
			tapChange(){
				let tabtemp=this.tabIndex;
				let tabtemptwo=this.tabIndexTwo;
				
				this.tabIndex=tabtemptwo;
				this.tabIndexTwo=tabtemp;
				this.getBalance(tabtemptwo);
				this.type=this.type==0?1:0;
				this.changeType=this.changeType.reverse();
		
				
			},
			all(){
				this.number=this.balance
			},
			transfer() {
				if(this.tabIndex==this.tabIndexTwo)return;
				if(!this.number){
					return this.$utils.showLayer(this.$t('assets.p_transfernum'))
				}
				this.$utils.initDataToken({url:'wallet/change',type:'POST',data:{
					currency_id:this.wallet_id,
					number:this.number,
					from_field:this.tabIndex,
					to_field:this.tabIndexTwo,
				}},res=>{
					this.number='';
					this.$utils.showLayer(res);
					setTimeout(()=>{
						this.getBalance(this.tabIndex);
					},1500)
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
