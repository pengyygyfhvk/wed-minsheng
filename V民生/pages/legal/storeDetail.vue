<template>
	<view class="" :class="{'light':theme=='light'}">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="header fixed flex alcenter between plr15">
			<view @tap="back()">
				<image src="../../static/image/forward.png" mode="aspectFit" class="wt20 h20" v-if="theme=='light'"></image>
				<image src="../../static/image/arrows.png" mode="aspectFit" class="wt20 h20" v-else></image>
			</view>
			<view class=" ft16 bold">
				{{Data.name}}
			</view>
			<view>
				<navigator :url="'storeUser?id='+currency_id">
					<image src="../../static/image/account_order_manager_image.png" style="width:50upx;height:50upx"></image>
				</navigator>
			</view>
		</view>
		<view class="pt50 bgHeader fixed w100 lf0 zdx100">
			<view class="flex between alcenter plr15 ptb10">
				<view class="flex alcenter">
					<view class=" flex alcenter">
						<view class="logo bgBlue2 ft12 flex alcenter jscenter white" v-if="Data.name">{{Data.name | chart0}}</view>
						<text class="ml10 ft14 ellipsis" style="max-width: 110upx;">{{Data.name}}</text>
					</view>
					<view class="gray75 ml10 flex column">
						<view class="flex alcenter">
							<text class="mr5">{{$t('store.rzshop')}}</text>
							<image src="../../static/image/VIP.png" mode="aspectFit" class="wt15 h15"></image>
						</view>
						<view class="flex alcenter">
							<text class="mr5">{{$t('store.regtime')}}</text>
							<text v-if="Data.create_time">{{Data.create_time.substring(0,10)}}</text>
						</view>
					</view>
				</view>
				<view class="flex alcenter jscenter h25 plr20 bgBlue2 radius4">
					<!-- <text class="white ft14"  @tap="togglePopup('bottom-entrust')">发布</text> -->
					<text class="white ft14"  @click="fabu0()">{{$t('store.fabu')}}</text>
				</view>
			</view>
			<view class="flex between bdb27 plr15 gray75 ptb10">
				<view class="flex column alcenter">
					<text>{{Data.total}}</text>
					<text class="mt5">{{$t('store.allorder')}}</text>
				</view>
				<view class="flex column alcenter">
					<text>{{Data.thirtyDays}}</text>
					<text class="mt5">{{$t('store.thirtyorder')}}</text>
				</view>
				<view class="flex column alcenter">
					<text>{{Data.done}}</text>
					<text class="mt5">{{$t('store.doneorder')}}</text>
				</view>
				<view class="flex column alcenter">
					<text>{{(Data.done/Data.total*100) || 0 | toFixed2}}%</text>
					<text class="mt5">{{$t('store.donelv')}}</text>
				</view>
			</view>
			<view class="flex between plr15 gray75 ptb10">
				<view class="flex alcenter">
					<text class="mr5">{{$t('store.renzhengmobile')}}</text>
					<image src="../../static/image/VIP.png" mode="aspectFit" class="wt15 h15" v-if="Data.prove_mobile==1"></image>
					<image src="../../static/image/regi.png" mode="aspectFit" class="wt15 h15" v-else></image>
				</view>
				<view class="flex alcenter">
					<text class="mr5">{{$t('store.renzhengauth')}}</text>
					<image src="../../static/image/VIP.png" mode="aspectFit" class="wt15 h15" v-if="Data.prove_real==1"></image>
					<image src="../../static/image/regi.png" mode="aspectFit" class="wt15 h15" v-else></image>
				</view>
				<view class="flex alcenter">
					<text class="mr5">{{$t('store.renzhenghigh')}}</text>
					<image src="../../static/image/VIP.png" mode="aspectFit" class="wt15 h15" v-if="Data.prove_level==1"></image>
					<image src="../../static/image/regi.png" mode="aspectFit" class="wt15 h15" v-else></image>
				</view>
			</view>
			<view class="ptb15 ptb10 flex alcenter jscenter ">
				<view :class="type=='sell'?'flex alcenter jscenter ptb10 plr10 bgBlue2 white':'flex alcenter jscenter ptb10 plr10 bgGray gray3'" @tap="changetype('sell')">
					<text>{{$t('store.mysell')}}</text>
				</view>
				<view :class="type=='buy'?'flex alcenter jscenter ptb10 plr10 bgBlue2 white':'flex alcenter jscenter ptb10 plr10 bgGray gray3'" @tap="changetype('buy')">
					<text>{{$t('store.mybuy')}}</text>
				</view>
			</view>
			<view class="bdb27 h40 flex alcenter around">
				<view :class="['h40 flex jscenter alcenter',{'cur':done==false}]" @tap="changedone(false)">
					<text>{{$t('store.notdone')}}</text>
				</view>
				<view :class="['h40 flex jscenter alcenter',{'cur':done==true}]" @tap="changedone(true)">
					<text>{{$t('store.done')}}</text>
				</view>
			<!-- 	<view :class="['h40 flex jscenter alcenter',{'cur':done==2}]" @tap="changedone(2)">
					<text>{{$t('store.backdone')}}</text>
				</view> -->
			</view>
		</view>
		<view class="list">
			<view class="gray75 flex column w100 plr20 ptb10 bdb27" v-for="(item,index) in orderlist" :key="index">
				<view class="flex mt5">
					<view class=" flex alcenter">
						<view class="logo bgBlue2 ft12 flex alcenter jscenter white">{{item.seller_name | chart0}}</view>
						<text class="ml10 ft14">{{item.seller_name}}</text>
					</view>
				</view>
				<view class="flex between mt10">
					<view class="flex alcenter">
						<text class="">{{$t('legal.num')}}</text>
						<text class="mlr5">{{(item.surplus_number-0) | toFixed3}}</text>
						<text class="">{{item.currency_name}}</text>
					</view>
					<view class="flex alcenter">
						<text class="">{{$t('legal.price')}}</text>
					</view>
				</view>
				<view class="flex between mt5">
					<view class="flex alcenter">
						<text class="">{{$t('legal.limit')}}</text>
						<!-- <text class="">￥{{(item.limitation.min-0) | toFixed3}}-￥{{(item.limitation.max-0) | toFixed3}}</text> -->
						<text class="mlr5">{{(item.min_number) | toFixed3}}{{item.currency_name}}-{{(item.max_number-0) | toFixed3}}{{item.currency_name}}</text>
					</view>
					<view class="flex alcenter">
						<text class="blue21 ft16">￥{{(item.price-0) | toFixed4}}</text>
					</view>
				</view>
				<view class="flex between mt5">
					<view class="flex alcenter">
						<image src="../../static/image/zhi.png" mode="aspectFit" class="wt15 h15 mr5" v-if="item.way=='ali_pay'"></image>
						<image src="../../static/image/wechat.png" mode="aspectFit" class="wt15 h15 mr5" v-if="item.way=='we_chat'"></image>
						<image src="../../static/image/card.png" mode="aspectFit" class="wt15 h15 mr5" v-if="item.way=='bank'"></image>
					</view>
					<view class="flex">
						<view class="flex alcenter jscenter h25 plr10 bgBlue2 radius4 mr10" v-if="item.is_done==0&&item.is_shelves==1" @tap="lowershelf(item.id)">
							<text class="white ft13">{{$t('store.lowershelf')}}</text>
						</view>
						<!-- <view class="flex alcenter jscenter h25 plr10 bgBlue2 radius4 mr10" @tap="togglePopup('center', 'tip' ,item.id)">
							<text class="white ft13">{{$t('store.yichang')}}</text>
						</view> -->
						<view class="flex alcenter jscenter h25 plr10 bgBlue2 radius4 mr10" v-if="item.is_done==0" @tap="withdraw(index,item.id)">
							<text class="white ft13">{{$t('store.back')}}</text>
						</view>
						<view class="flex alcenter jscenter h25 plr10 bgBlue2 radius4" @tap="goorderlist(item.id)">
							<text class="white ft13">{{$t('store.lookorder')}}</text>
						</view>
					</view>
				</view>
			</view>
			<view :class="['tc pt30 pt100 pb100 hidden',{'block':orderlist.length==0&&over}]">
				<image src="/static/image/nodata.png" class="h50 wt50"></image>
				<view class="gray7">{{$t('home.norecord')}}</view>
			</view>
			<view class="tc gray7 ptb20" v-show="!hasMore && orderlist.length>10">{{$t('home.nomore')}}</view>
		</view>
		<uni-popup ref="popup" :type="popType">
			<view class="bottom-content bgPart flex column plr10 gray75">
				<view class="bdb27 h40 flex alcenter around">
					<view :class="['h40 flex jscenter alcenter plr10',{'cur':fabuType=='sell'}]" @tap="changeFtype('sell')">
						<text>{{$t('legal.sell')}}</text>
					</view>
					<view :class="['h40 flex jscenter alcenter plr10',{'cur':fabuType=='buy'}]" @tap="changeFtype('buy')">
						<text>{{$t('legal.buy')}}</text>
					</view>
				</view>
				<view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('legal.coin')}}:</text>
					<text class="flex2">{{Data.currency_name}}</text>
				</view>
				<view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('store.p_payment')}}:</text>
					<view class="flex2 flex alcenter between">
						<view class="flex alcenter" v-for='(item,index) in payList' :key="index" @tap="choosePay(index)">
							<image :src="(payway===index) ? '/static/image/select1.png' : '/static/image/select0.png'" class="h20 wt20"></image>
							<text class="pl5">{{item.name}}</text>
						</view>
						<!-- <radio-group name=" flex2" @change="radioChange">
							<label class="" v-for="item in items" :key="item.value">
								<radio :value="item.value" :checked="item.checked" />{{item.name}}
							</label>
						</radio-group> -->
						
					</view>
				</view>
				<!-- <view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('store.p_coin')}}:</text>
					<view class="flex2 flex alcenter between">
						<view class="flex alcenter" v-for='(item,index) in coinList' :key="index" @tap="chooseCoin(index)">
							<image :src="(paycoin==index) ? '/static/image/select1.png' : '/static/image/select0.png'" class="h20 wt20"></image>
							<text class="pl5">{{item.value}}</text>
						</view>
						<radio-group name=" flex2"  @change="radioChange2">
							<label class="" v-for="item in items2" :key="item.value">
								<radio :value="item.value" :checked="item.checked" />{{item.name}}
							</label>
						</radio-group>
					</view>
				</view> -->
				<!-- <view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('legal.price')}}:</text>
					<input type="number" value="" :placeholder="$t('store.p_price')" class="flex2" v-model="price"/>
				</view> -->
				<view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('trade.num')}}:</text>
					<input type="number" value="" :placeholder="$t('trade.p_num')" class="flex2" v-model="total_number"/>
				</view>
				 <view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('store.minnum')}}:</text>
					<input type="number" value="" :placeholder="$t('store.p_min')" class="flex2" v-model="min_number"/>
				</view>
				<view class="flex alcenter bdb27 ptb10">
					<text class="flex1">{{$t('store.maxnum')}}:</text>
					<input type="number" value="" :placeholder="$t('store.p_max')" class="flex2" v-model="max_number"/>
				</view> 
				<view class="flex between alcenter mtb10  plr10">  
					<view class="bgBlue2 white ptb10 flex1 tc radius4" @tap="fabu()">{{$t('store.fabu')}}</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" :type="popType2">
			<view class="bottom-content bgPart flex column plr10 gray75">
				<view class="flex alcenter bdb27 ptb10 plr10">
					<text class="ft18 white bold tc">{{$t('login.e_pdeal')}}</text>
				</view>
				<view class="flex alcenter bdb27 ptb10 plr10">
					<text class="flex1">{{$t('login.s_dealpwd')}}</text>
					<input type="password" value="" :placeholder="$t('login.e_pdeal')" class="flex2 bd_input h30 pl10 radius4" v-model="password"/>
				</view>
				<view class="flex between alcenter mtb10  plr10">  
					<view class="bgBlue2 white ptb10 flex1 tc radius4" @tap="fabu2()">{{$t('store.fabu')}}</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup3" :type="popType3">
			<view class="bottom-content bgPart flex column plr10 gray75">
				<view class="flex alcenter bdb27 ptb10 plr10">
					<text class="ft18 white bold tc">{{$t('login.e_pdeal')}}</text>
				</view>
				<view class="flex alcenter bdb27 ptb10 plr10">
					<text class="flex1">{{$t('login.s_dealpwd')}}</text>
					<input type="password" value="" :placeholder="$t('login.e_pdeal')" class="flex2 bd_input h30 pl10 radius4" v-model="ceil_password"/>
				</view>
				<view class="flex between alcenter mtb10  plr10">  
					<view class="bgBlue2 white ptb10 flex1 tc radius4" @tap="fabu3()">{{$t('login.e_confrim')}}</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup :show="show" :type="popType" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">{{$t('store.makeyichang')}}？</view>
				<input type="password" value="" :placeholder="$t('login.e_pdeal')" class="flex2 bd_input h30 pl10 radius4 mt10" v-model="error_password"/>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button white" @tap="cancel('tip1')">{{$t('store.ithink')}}</view>
					<view class="uni-tip-button gray75" @tap="cancel('tip2')">{{$t('login.e_confrim')}}</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup4" :type="popType4">
			<view class="bottom-content bgPart flex column plr10 gray75">
				<view class="flex alcenter bdb27 ptb10 plr10">
					<text class="ft18 white bold tc">{{$t('login.e_pdeal')}}</text>
				</view>
				<view class="flex alcenter bdb27 ptb10 plr10">
					<text class="flex1">{{$t('login.s_dealpwd')}}</text>
					<input type="password" value="" :placeholder="$t('login.e_pdeal')" class="flex2 bd_input h30 pl10 radius4" v-model="ceil_password"/>
				</view>
				<view class="flex between alcenter mtb10  plr10">  
					<view class="bgBlue2 white ptb10 flex1 tc radius4" @tap="fabu4()">{{$t('login.e_confrim')}}</view>
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
				storeid:'',
				Data:{},
				type: 'sell',
				done: false,
				page:1,
				orderlist:[],
				hasMore: true,
				over: false,
				popType:'',
				popType2:'',
				popType3:'',
				popType4:'',
				fabuType:'sell',
				way:0,
				payway:0,
				paycoin:0,
				price:'',
				total_number:'',
				min_number:1,
				max_number:'',
				password:'',
				ceil_password:'',
				error_password:'',
				ceil_id:'',
				ceil_index:'',
				currency_id:'',
				show: false,
				id:'',
				payList: [{value: 'ali_pay',name: this.$t('store.alipay')},{value: 'we_chat',name: this.$t('store.wechat'),},{value: 'bank',name: this.$t('store.bank')}
				],
				legal_list:[],
				coinList: [{value:'CNY'},{value:'USD'},{value:'JPY'}],
			};
		},
		onLoad: function (option) {
			this.storeid = option.id;
			this.legalList();
		},
		filters:{
			chart0:function(value){
				return value.charAt(0);
			},
			toFixed2: function (value, options) {
				value = Number(value);
				return value.toFixed(2);
			},  
			toFixed3: function (value, options) {
				value = Number(value);
				return value.toFixed(3);
			}, 
			toFixed4: function (value, options) {
				value = Number(value);
				return value.toFixed(4);
			}, 
		},
		onShow() {
			var that = this;
			that.$utils.setThemeTop(this.theme)
			that.getinfo();
		},
		onHide() {},
		computed:{
		   ...mapState(['theme']),
		},
		methods: {
			legalList(){
				let that=this;
				that.$utils.initData({url: 'currency/list'}, res => {
					that.legal_list = res.legal;
					that.legal_list.filter((item)=>{
						item.id==3?item.price=1:item.price;
						return item;
					})
				});
			},
			choosePay(index){//选择支付方式
				this.payway =index;
			},
			chooseCoin(index){//选择支付方式
				this.paycoin =index;
			},
			changeFtype(type){
				this.fabuType = type;
			},
			togglePopup(type, open, id) {
				this.error_password='',
				this.id = id;
				this.popType = type;
				this.popType2 = type;
				this.popType3 = type;
				this.popType4 = type;
				if (open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},
			fabu0(){
				this.clear();
				this.togglePopup('bottom', 'popup');
			},
			
			cancel(type) {
				if (type === 'tip1') {
					this.show = false
					return
				}else if(type === 'tip2'){
					this.show = false
					this.abnormal()
					return
				}
				this.$refs[type].close()
			},
			clear(){
				var that = this;
				that.fabuType = 'sell',
				// that.payway = 0,
				// that.paycoin ='',
				that.price = '',
				that.total_number = '',
				that.min_number = '',
				that.max_number = '',
				that.password = ''
			},
			back(){
				uni.navigateBack();
			},
			goorderlist(id){
				uni.navigateTo({
				    url: '/pages/legal/storeOrder?id='+id,
					"animationType": "pop-in",
					"animationDuration": 300
				});
			},
			changetype(type){
				let that = this;
				that.page = 1;
				that.hasMore = true;
				that.over = false;
				that.type = type;
				that.getlist();
			},
			changedone(done){
				let that = this;
				that.page = 1;
				that.hasMore = true;
				that.over = false;
				that.done = done;
				that.getlist();
			},
			getinfo(){
				let that = this;
				that.$utils.initDataToken({ url: 'seller_info',data:{id:that.storeid}}, res => {
					console.log(res)
					that.Data = res;
					that.currency_id = that.Data.currency_id;
				});
				that.getlist();
			},
			getlist(){
				let that = this;
				that.$utils.initDataToken({ url: 'seller_trade',data:{id:that.storeid,page:that.page,type:that.type,was_done:that.done}}, res => {
					var data = res.data;
					uni.stopPullDownRefresh();
					that.orderlist = (that.page == 1) ? data : that.orderlist.concat(data);
					that.over = true;
					that.hasMore = (res.page >= res.pages) ? false : true;
					console.log(that.hasMore)
				});
			},
			// 发布
			fabu(){
				let that = this;
				let way = that.payList[that.payway].value;
				let paycoin = that.coinList[that.paycoin].value;
				for(let i in that.legal_list){
					if(that.legal_list[i].id==that.currency_id){
						that.price=that.legal_list[i].price*that.legal_list[i].rmb_relation;
						break;
					}
				}
				if(!way){
					return that.$utils.showLayer(that.$t('store.p_payment'));
				}
				if(!paycoin){
					return that.$utils.showLayer(that.$t('store.p_coin'));
				}
				if(!that.price || (that.price-0)<=0){
					return that.$utils.showLayer(that.$t('store.p_price'));
				}
				if(!that.total_number || (that.total_number-0)<=0){
					return that.$utils.showLayer(that.$t('trade.p_num'));
				}
				if(!that.min_number || (that.min_number-0)<=0){
					return that.$utils.showLayer(that.$t('store.p_min'));
				}
				if(!that.max_number || (that.max_number-0)<=0){
					return that.$utils.showLayer(that.$t('store.p_max'));
				}
				if((that.max_number-0) < (that.min_number-0)){
					return that.$utils.showLayer(that.$t('store.t_minmax'));
				}
				// that.togglePopup('')
				that.togglePopup('bottom', 'popup2')
			},
			// 输入密码
			fabu2(){
				let that = this;
				if(!that.password){
					return that.$utils.showLayer(that.$t('login.e_pdeal'));
				}
				let way = that.payList[that.payway].value;
				let paycoin = that.coinList[that.paycoin].value;
				that.$utils.initDataToken({
					url: 'legal_send',
					data:{
						  type:that.fabuType,
						  way: way,
						  coin_code:paycoin,
						  price :that.price,
						  total_number:that.total_number,
						  min_number:that.min_number,
						  max_number:that.max_number,
						  currency_id :that.currency_id,
						  password: that.password,
					},
					type: 'post',
				}, res => {
					that.cancel('popup3');
					that.cancel('popup2');
					that.cancel('popup');
					that.password='';
					that.ceil_password='';
					that.$utils.showLayer(res);
					// that.togglePopup('')
					setTimeout(()=>{
						that.getlist()
					},1000)
				});
			},
			fabu3(){
				let that = this;
				if(!that.ceil_password){
					return that.$utils.showLayer(that.$t('login.e_pdeal'));
				}
				that.$utils.initDataToken({
					url: 'back_send',
					data:{
					  id :that.ceil_id,
					  password: that.ceil_password
					},
					type: 'post',
				}, res => {
					that.cancel('popup3');
					that.cancel('popup2');
					that.cancel('popup');
					that.ceil_id='';
					that.ceil_index='';
					that.ceil_password='';
					that.$utils.showLayer(res);
					setTimeout(()=>{
						that.orderlist.splice(that.ceil_index, 1);
					},1000)
				});
			},
			withdraw(index,id){
				this.ceil_id=id;
				this.ceil_index=index;
				this.togglePopup('bottom', 'popup3');
			},
			fabu4(){
				let that = this;
				if(!that.ceil_password){
					return that.$utils.showLayer(that.$t('login.e_pdeal'));
				}
				that.$utils.initDataToken({
					url: 'down_send',
					data:{
					  id :that.ceil_id,
					  password: that.ceil_password
					},
					type: 'post',
				}, res => {
					that.cancel('popup4');
					that.cancel('popup3');
					that.cancel('popup2');
					that.cancel('popup');
					that.ceil_id='';
					that.ceil_password='';
					that.$utils.showLayer(res);
					setTimeout(()=>{
						that.getlist()
					},1000)
				});
			},
			lowershelf(id){
				this.ceil_id=id;
				this.togglePopup('bottom', 'popup4');
			},
			abnormal(){
				let that = this;
				that.$utils.initDataToken({
					url: 'error_send',
					data:{
						  id :this.id,
						  password: this.error_password,
					},
					type: 'post',
				}, res => {
					that.error_password='';
					that.$utils.showLayer(res);
					setTimeout(()=>{
						that.getlist()
					},1000)
				});
			},
			onPullDownRefresh() {
				this.page = 1;
				this.getlist();
			},
			onReachBottom() {
				if (!this.hasMore) return;
				this.page++;
				this.getlist();
			},
			// togglePopup(popType){//弹窗
			// 	this.popType = popType;
			// },
		}
	};
</script>

<style>
	/* uni-checkbox-group {
	    flex: 2 !important;
	} */
	uni-checkbox .uni-checkbox-input{
		background: #007aff !important;
	}
	.uni-popup__wrapper .uni-popup__wrapper-box{
	    padding: 10px;
	    background: #141e34;
	}
	.logo{
		height: 45upx;
		width: 45upx;
		border-radius: 50%;
	}
	.cur{
		color: #217dc1;
		border-bottom: 4upx solid #217dc1;
	}
	.list{
       padding-top: 720upx;
	}
	/* 撤回弹窗 */
	.uni-tip {
		padding: 30upx;
		width: 600upx;
		background: #131e34;
		box-sizing: border-box;
		border-radius: 20upx;
	}
	
	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 32upx;
		color: #fff;
	}

	.uni-tip-group-button {
		margin-top: 60upx;
		display: flex;
	}
	
	.uni-tip-button {
		width: 100%;
		text-align: center;
		font-size: 28upx;
	}
</style>
