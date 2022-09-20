<template>
	<view class="" :class="{'light':theme=='light'}">
		<!-- <view class="bgHeader pb10 pb5 plr20 flex alcenter bdb1f">
			<view class="pt10 pb5 ft16 bold mr20 posRelt" :class="{'blue2':isActive==i}" v-for="(item,i) in marketLists" :key="i" @click="changeTab(i,item.Name)">
				<image src="/static/line_blue.png" class="myline" v-if="isActive==i"></image>
				{{item.Name}}
			</view>
		</view> -->
		<view class="plr10 ">
			<view class="flex alcenter ft12 blue3 ptb10">
				<view class="flex alcenter" style="flex: 1.5;">
					<view class="flex alcenter"  @tap="tapFilters(1,'Name')">
						<text class="pr5">{{$t('home.name')}}</text>
						<view class="">
							<image src="../../static/image/updown0.png" class="wt8 h10" v-if="isfilter1==0"></image>
							<image src="../../static/image/updown1.png" class="wt8 h10" v-else-if="isfilter1==1"></image>
							<image src="../../static/image/updown2.png" class="wt8 h10" v-else></image>
						</view>
					</view>
				</view>
				<view class="flex1 flex alcenter">
					<view class="flex alcenter" @tap="tapFilters(2,'Price')">
						<text class="pr5">{{$t('home.new_price')}}</text>
						<view class="" >
							<image src="../../static/image/updown0.png" class="wt8 h10" v-if="isfilter2==0"></image>
							<image src="../../static/image/updown1.png" class="wt8 h10" v-else-if="isfilter2==1"></image>
							<image src="../../static/image/updown2.png" class="wt8 h10" v-else></image>
						</view>
					</view>
				</view>
				<view class="wt70 flex alcenter jsend">
					<view class="flex alcenter" @tap="tapFilters(3,'DiffRate')">
						<text class="pr5">{{$t('home.fu')}}</text>
						<view class="" >
							<image src="../../static/image/updown0.png" class="wt8 h10" v-if="isfilter3==0"></image>
							<image src="../../static/image/updown1.png" class="wt8 h10" v-else-if="isfilter3==1"></image>
							<image src="../../static/image/updown2.png" class="wt8 h10" v-else></image>
						</view>
					</view>
				</view>
			</view>	
			<navigator :url="'/pages/market/kline?legal_id='+item.pid+'&symbol='+item.Name" class="mb10 flex alcenter bdb1f ptb10" v-for="(item,i) in marketLists" :key="i" v-show="marketLists">
				<view class="" style="flex: 1.5;">
					<view><text class="ft14 bold">{{item.Name}}</text><text class="ft12 blue pl5"></text></view>
					<!-- <view class="gray9 blue pt5 ft12">{{$t('market.volume')}} {{item.volume | toFixed4}}</view> -->
				</view>
				<view class="flex1">
					<view class=""> 
						<text class="ft14 bold">{{item.Price|toFixed2}}</text>
						<!-- <view class="pt5 ft12 blue">￥{{Math.floor(item.rmb_relation*item.now_price*100)/100}}</view> -->
					</view>
					<!-- <view class="gray9 ft10">24H额:￥{{item.volume}}</view> -->
				</view>
				<view class="wt70">
					<view class="tc h30 lh30 white wt70 radius2" :class="[(item.DiffRate.substr(0,1))=='-'?'bgRed':'bgGreen']">{{(item.DiffRate.substr(0,1))=='-' ? '' : '+'}}{{(item.DiffRate) | toFixed2}}%</view>
				</view>					
			</navigator>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				isActive:0,
				marketLists:[],
				// fiat_convert_cny:6.8,
				legal_name:'',
				isfilter1:0,
				isfilter2:0,
				isfilter3:0,
				timer:''
			}
		},
		computed:{
		   ...mapState(['theme']),
		},
		filters:{
			toFixed2: function (value) {
				value = Number(value);
				return value.toFixed(2);
			},  
			toFixed3: function (value) {
				value = Number(value);
				return value.toFixed(3);
			},  
			toFixed4: function (value) {
				value = Number(value);
				return value.toFixed(4);
			},  
		},
		onLoad() {
		},
		onShow() {
			
			uni.setNavigationBarTitle({
				title:this.$t('market').market
			})
			this.$utils.setThemeTop(this.theme);
			this.$utils.setThemeBottom(this.theme);
			this.getList();
			this.timer=setInterval(()=>{
				this.getList();
			},3000)
		},
		
		onHide() {
			clearInterval(this.timer);
			this.$socket.closeSocket();
		},
		onUnload:function(){  
		    if(this.timer) {  
		        clearInterval(this.timer);  
		        this.timer = null;  
		    }  
		},
		onPullDownRefresh() {
			this.getList();
		},
		methods:{
			// 过滤
			filterList(name,isflag){
				this.marketLists[this.isActive].quotation.sort(function(i,j){
					if(name=='currency_name'){
						if(isflag==1){
							return i[name].charCodeAt(0) - j[name].charCodeAt(0);
						}else{
							return j[name].charCodeAt(0) - i[name].charCodeAt(0);
						}
					}else{
						if(isflag==1){
							return i[name]-j[name];
						}else{
							return j[name]-i[name];
						}
					}
					
				})
			},
			// 点击切换
			tapFilters(e,name){
				console.log(e,name);
				if(e==1){
					this.isfilter2=0;
					this.isfilter3=0;
					this.isfilter1=this.isfilter1==1?2:1;
					this.filterList(name,this.isfilter1);
				}
				if(e==2){
					this.isfilter1=0;
					this.isfilter3=0;
					this.isfilter2=this.isfilter2==1?2:1;
					this.filterList(name,this.isfilter2);
				}
				if(e==3){
					this.isfilter2=0;
					this.isfilter1=0;
					this.isfilter3=this.isfilter3==1?2:1;
					this.filterList(name,this.isfilter3);
				}
				
			},
			getList(){
				this.$utils.initData({url:'home/quotes'},res=>{
					uni.stopPullDownRefresh()
					this.marketLists=res.data;
					if(res.data.length>0){
						this.legal_name=res.data[0].Name;
						// this.fiat_convert_cny=res[0].fiat_convert_cny;
						// this.legal_price=res[0].legal_price;
					}
				})
			},
			changeTab(e,name){
				this.isfilter3=0;
				this.isfilter2=0;
				this.isfilter1=0;
				// this.fiat_convert_cny=this.marketLists[e].fiat_convert_cny-0;
				// this.legal_price=this.marketLists[e].legal_price-0;
				this.isActive=e;
				this.legal_name = name;
			}
		}
	}
</script>

<style>
	page{
		background: #102030;
	}
</style>
