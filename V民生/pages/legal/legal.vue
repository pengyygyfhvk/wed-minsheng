<template>
	<view class="legal" :class="{'light':theme=='light'}">
		<view class="fixed lf0 bgBlack zdx100 w100">
			<view class="flex between alcenter content plr20 w100 h50">
				<view class="content-left flex baseline jscenter bold">
					<view :class="Type=='buy'?' ft24 mr10':'gray75 ft14 mr10'" @click="changetype('buy')">{{$t('legal.ibuy')}}</view>
					<view :class="Type=='sell'?' ft24':'gray75 ft14'" @click="changetype('sell')">{{$t('legal.isell')}}</view>
				</view>
				<navigator :url="'/pages/legal/recordlist'">
					<image src="../../static/image/record1.png" mode="aspectFit" class="wt20 h20 ml10"></image>
				</navigator>
			</view>
			<view class="bdb27 bgPart rat4">
				<scroll-view class="tab-bar nowrap plr10 flex alcenter" scroll-x="true">
					<view class="uni-tab-item">
						<view class="mlr10 h40 lh40 ft13 gray75 blue21 coin">USDT</view>
					</view>
				</scroll-view>
			</view>
			
		</view>
		<view class="currency pt100">
			<view class="gray75 flex column w100 plr20 ptb10 bdb27" v-for="item in orderlist" :key="item.id">
				<view class="flex between mt5">
					<view class=" flex alcenter">
						<view class="logo bgBlue2 ft12 flex alcenter jscenter white" v-if="item.name">{{item.name || '' | chart0}}</view>
						<text class="ml10 ft14">{{item.name}}</text>
					</view>
					<view class="flex alcenter">
						<!-- <text class="">1455</text>
						<text class="mlr10">|</text>
						<text class="">94%</text> -->
					</view>
				</view>
				<view class="flex between mt10">
					<view class="flex alcenter">
						<text class="">{{$t('trade.num')}}</text>
						<text class="mlr5">{{item.num | toFixed4}}</text>
						<text class="">USDT</text>
					</view>
					<view class="flex alcenter">
						<text class="">{{$t('legal.price')}}</text>
					</view>
				</view>
				<view class="flex between mt5">
					<view class="flex alcenter">
						<text class="">{{$t('legal.limit')}}</text>
						<text class="pl5">{{item.minNum | toFixed2}}USDT-{{item.maxNum | toFixed2}}USDT</text>
					</view>
					<view class="flex alcenter">
						<text class="blue21 ft16">{{item.price}}USDT</text>
					</view>
				</view>
				<view class="flex between mt5">
					<view class="flex alcenter">
						<image src="../../static/image/zhi.png" mode="aspectFit" class="wt15 h15 mr5" v-if="item.method=='ali_pay'"></image>
						<image src="../../static/image/wechat.png" mode="aspectFit" class="wt15 h15 mr5" v-if="item.method=='we_chat'"></image>
						<image src="../../static/image/card.png" mode="aspectFit" class="wt15 h15 mr5" v-if="item.method=='bank'"></image>
					</view>
					<view class="flex alcenter jscenter h25 plr20 bgBlue2 radius2" @click="getinfo(item.id)">
						<text class="white ft14">{{Type=='buy'?$t('legal.buy'):$t('legal.sell')}}</text>
					</view>
				</view>
			</view>
			<view :class="['tc pt30 pt100 pb100 hidden',{'block':(orderlist.length===0&&over)}]">
				<image src="/static/image/nodata.png" class="h50 wt50"></image>
				<view class="gray7">{{$t('home.norecord')}}</view>
			</view>
			<view class="tc gray7 ptb20" v-show="!hasMore && orderlist.length>10">{{$t('home.nomore')}}</view>
		</view>
		<view class="layer_box" v-show="box1" @click="isshow">
			<view class="layer_opeation bgHeader" @click.stop>
				<view class="bggray flex between alcenter plr15 ptb10">
					<view class=" flex column">
						<view class="ft20 ft16"><text>{{Type=='buy'?$t('legal.buy'):$t('legal.sell')}}</text><text>{{Data.currency_name}}</text></view>
						<view class="mt5 ft14"><text>{{$t('legal.price')}}</text> <text class="blue21 price pl5" v-if="Data.price"> ￥{{Data.price | toFixed2}} </text> <text class="blue21 price pl5">{{Data.coin_code}}</text></view>
					</view>
					<view class="tc" v-if="Data.currency_logo">
						<image :src="Data.currency_logo" mode="aspectFit" class="wt30 h30 mr5"></image>
					</view>
				</view>
				<view class="mtb10 tab flex column plr15">
					<view class="num_price flex alcenter gray75 ft14">
						<!-- <view @click="msg=0" :class="{'cur':msg==0}">{{$t('legal.anprice')}}{{Type=='sell'?$t('legal.buy'):$t('legal.sell')}}</view> -->
						<view @click="msg=1" :class="{'cur':msg==1}">{{Type=='buy'?$t('legal.buy'):$t('legal.sell')}}{{$t('trade.num')}}</view>
					</view>
					<!-- <view class="flex between alcenter Ipt ft13 pl10 mt10 bd3a" v-if="msg==0">
						<input type="number" class="flex1  h25" :placeholder="Type=='sell'?$t('legal.buy')+$t('legal.num'):$t('legal.sell')+$t('legal.amount')" value="" v-model='money' />
						<view class="ptb10 flex w40 jscenter w40">
							<text class="white coin_code flex1 pr10 tr bdr_input">{{Data.currency_name}}</text>
							<text class="plr10 blue21 tc" @click="all(0)">{{$t('trade.all')}}{{Type=='sell'?$t('trade.buy'):$t('trade.sell')}}</text>
						</view>
					</view> -->
					<view class="flex between alcenter Ipt ft13 pl10 mt10 bd3a" v-if="msg==1">
						<input type="number" class="flex1  h25" :placeholder="Type=='buy'?$t('legal.buy')+$t('legal.num'):$t('legal.sell')+$t('legal.num')" value="" v-model='number' />
						<view class="ptb10 flex w40 jscenter w40">
							<text class="white coin_code flex1 pr10 tr bdr_input">USDT</text>
							<text class="plr10 blue21 tc" @click="all(1)">{{$t('trade.all')}}</text>
						</view>
					</view>
					<view class="gray75 mt5" >
						<text>{{$t('legal.limit')}}</text>
						<text class="limit pl5">{{Data.minNum}}USDT-{{Data.maxNum}}USDT</text>
						</view>
					<view class="ft14 flex alcenter between mt10">
						<text class="gray75">{{$t('legal.allmoney')}}</text>
						<text class="blue21 ft16 total">￥{{totalPrice | toFixed2}}</text>
						<!-- <text class="blue21 ft16 total" v-if="msg==0">￥{{money | toFixed2}}</text>
						<text class="blue21 ft16 total" v-if="msg==1">￥{{(number*Data.price) | toFixed2}}</text> -->
					</view>
				</view>
				<view class="flex between alcenter  plr15 ft14 ptb10">
					<view class="bgGray radius2 ptb10 flex1 tc mr10 gray3" @click="isshow">
						<text class="cutdown">{{time}}</text>
						<text>s{{$t('legal.autocancel')}}</text>
					</view>
					<view class="bgBlue2 radius2 ptb10 flex1 tc doit pointer ml5 white" @click="pay(Data.id)">{{$t('legal.do')}}</view>
				</view>
			</view>
		</view>
		<!-- 底部密码弹窗 -->
		<uni-popup ref="share" :type="type" :custom="true">
			<view class="uni-share bgPart">
				<view class="uni-share-content">
					<view class="uni-share-title tc h40 lh40 bdb_1e ft16">{{$t('login.s_loginpwd')}}</view>
					<view class="flex alcenter ptb20 plr20">
						<text>{{$t('login.s_loginpwd')}}</text>
						<input type="password" class="h40 flex1 plr15 ml10 bd_input radius2" v-model="password" :placeholder="$t('login.e_pdeal')" />
					</view>
					<view class="bgBlue tc h40 lh40 white" @click="submit">{{$t('login.e_confrim')}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup3.vue';
	import {mapState} from 'vuex'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				id:'',
				msg: 0,
				box1: false,
				Type: 'buy',
				coinindex: 0,
				legal_list: [],
				orderlist: [],
				currency_id: '',
				time:59,
				page: 1,
				hasMore: true,
				over: false,
				Data: {price:'',coin_code:'--'},
				money: '',
				number: '',
				password:'',
				type:'',
				types:1,
				interval:function(){}
			};
		},
		filters:{
			chart0:function(value){
				return value.charAt(0);
			},
			toFixed2: function (value) {
				value = Number(value);
				return value.toFixed(2);
			},
			toFixed4: function (value) {
				value = Number(value);
				return value.toFixed(4);
			}
		},
		computed:{
			totalPrice(){
				let total = this.msg==0 ? (this.money || 0.00 ) : ((this.number*this.Data.price) || 0.00);
				return total;
			},
			...mapState(['theme']),
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('legal').legal
			})
			this.getData();
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
		},
		methods: {
			all(msg) {
				var that = this;				
				// if (msg == 0) {
				// 	that.money = Number(that.Data.limitation.max);
				// } else {
					that.number = Number(that.Data.maxNum);
				// }
			},
			isshow() {
				let that = this;
				clearInterval(that.interval);
				this.box1 = !this.box1;
			},
			changetype(type) {
				let that = this;
				that.Type = type;
				console.log(type)
				if(type == 'buy'){
					that.types = 1;
				}else{
					that.types = 2;
				}
				
				that.page = 1;
				that.hasMore = true,
				that.over = false,
				that.getData();
			},
			changeCoin(index, id) {
				let that = this;
				that.coinindex = index;
				that.currency_id = id;
				that.page = 1;
				that.hasMore = true,
				that.over = false,
				that.getData();
			},
			record() {
				uni.navigateTo({
					url: '/pages/legal/recordlist'
				});
			},
			pay(id) {				
				let that = this;
				that.id = id;
				let means= that.msg == 0 ? 'money' : 'number';
				let value = that.msg == 0 ? that.money : that.number;
				if(that.msg==0&&!value){
					return that.$utils.showLayer(that.$t('legal.p_amout'));
				}
				if(that.msg==1&&!value){
					return that.$utils.showLayer(that.$t('trade.p_num'));
				}
				that.box1 = false;
				that.togglePopup('bottom', 'share');
			},
			submit(){
				let that = this;
				let means= that.msg == 0 ? 'money' : 'number';
				let value = that.msg == 0 ? that.money : that.number;
				let password = that.password;
				if(password.length<6){
					return that.$utils.showLayer(that.$t('login.e_pdeal'));
				}
				that.$utils.initDataToken({ url: 'wallet/LegalDealOrder',data:{id:that.id,num:value,password:password},type:'post' }, res => {
					that.$utils.showLayer(res.msg);
					that.cancel('share');
					if(res.code == 200){
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/legal/order?id='+res.data
							});
						},1000)
					}
					
				});
			},
			// legallist() { //币种数据
			// 	let that = this;
			// 	that.$utils.initDataToken({url: 'wallet/LegalDealList',data:{type: types }}, res => {
			// 		that.legal_list = res.legal;
			// 		that.currency_id = that.legal_list[0].id;
			// 		that.getData();
			// 	});
			// },
			getData() {
				let that = this;
				that.$utils.initDataToken({url: 'wallet/LegalDealList',
					data: {
						type: that.types,
						page: that.page,
					},
					type:'post'
				}, res => {
					var data = res.data;
					uni.stopPullDownRefresh();
					that.orderlist = (that.page == 1) ? data : that.orderlist.concat(data);
					that.over = true;
					that.hasMore = (res.page >= res.pages) ? false : true;
					console.log(that.hasMore)
				});
			},
			getinfo(id) {
				let that = this;
				that.box1 = true;
				that.number='';
				that.money ='';
				that.password='';
				this.msg = 1;
				clearInterval(that.interval)
				that.$utils.initDataToken({url: 'wallet/LegalDealDetail',data: {id: id},type:'post'}, res => {
					that.Data = res.data;
					that.time = 59;
					that.interval = setInterval(function () {
					    var text = that.time;
					    if (text == 0) {
					        clearInterval(that.interval);
							that.box1 = false;
					    } else {
					        that.time--;
					    }
					}, 1000)
				});
			},
			onPullDownRefresh() {
				this.page = 1;
				this.getData();
			},
			onReachBottom() {
				if (!this.hasMore) return;
				this.page++;
				this.getData();
			},
			togglePopup(type, open) {//type弹窗位置
				this.type = type;
				if (open === 'tip') {
					this.show = true;
				} else {
					this.$refs[open].open();
				}
			},
			cancel(type) {
				if (type === 'tip') {
					return this.show = false;
				}
				this.$refs[type].close();
			},
		}
	};
</script>

<style>
	page {
		background-color: #102030;
	}
	.uni-tab-item {
		display: inline-block;
	}
	.uni-tab-item .coin {
		border-bottom: 2px solid #217dc1;
	}
	.scroll-v {
		flex: 1;
		flex-direction: column;
		width: 750upx;
	}
	.logo {
		height: 45upx;
		width: 45upx;
		border-radius: 50%;
	}
	.layer_box {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	.layer_box .layer_opeation {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		/* background-color: #131f30; */
		border-radius: 20upx 20upx 0 0;
		z-index: 101;
	}
	.op_header {
		background: #081926;
		border-radius: 20upx 20upx 0 0;
	}

	.tab .num_price {
		height: 54upx;
	}

	.tab .num_price view {
		height: 54upx;
		line-height: 50upx;
	}

	.tab .num_price view:first-child {
		margin-right: 20upx;
	}

	.tab .num_price .cur {
		color: #217dc1;
		border-bottom: 2px solid #217dc1;
	}

	.tab .Ipt {
		height: 100upx;
		width: 100%;
		/* border: 1px solid #485362; */
		border-radius: 4upx;
	}
</style>
