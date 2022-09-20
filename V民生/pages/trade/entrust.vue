<template>
	<view class="" :class="{'light':theme=='light'}">
		<view class="flex flexend between plr15 ptb10 w100 bdb_1e fixed lf0 bgPart zdx100">
			<view class="flex flexend">
				<view :class="['ft14 gray7',{'ft18 white':current==0}]" @click="change(0)">{{$t('trade.all_delegate')}}</view>
			    <view :class="['pl10 ft14 gray7',{'ft18 white':current==1}]" @click="change(1)">{{$t('trade.his_delegate')}}</view>
			</view>
			
		</view>
		<uni-popup :show="popType === 'bottom-entrust'" position="bottom" @hidePopup="togglePopup('')">
			<view class="bottom-content">
				<view class="bottom-content-box tc gray7">
					<!-- <text :class="['ft14 redColor',{'greenColor':enType=='in'}]">{{enType=='in'? $t('trade.buy') : $t('trade.sell')}}</text> -->
				    <view :class="['bdb_1e ptb10 ft14 bgPart',{'blueColor':enType=='in'}]" @click="changeEntrustType('in')">{{$t('trade.buy')}}</view>
					<view :class="['ptb10 ft14 bgPart',{'blueColor':enType=='out'}]" @click="changeEntrustType('out')">{{$t('trade.sell')}}</view>
		            <view class="pt5 pb10">
		            	<view class="ptb10 ft14 bgPart" @click="togglePopup('')">{{$t('trade.cancel')}}</view>
		            </view>
				</view>
			</view>
		</uni-popup>
		<view class="en-ul pl15 pt50" v-show="current==0">
			<view class="ptb10 pr15" v-for="(item,index) in enList" :key="item.id" v-show="item.isshow">
				<view class="flex between alcenter">
					<view class="flex flexend w100">
						<text class="flex1 gray_e ft14">{{item.ptitle}}</text>
						<text :class="['flex1 ft14 pl5 redColor',{'greenColor':item.ostyle=='0'}]">{{item.ostyle=='0'? $t('trade.buy') : $t('trade.sell')}}(${{item.fee}})</text>
						<text class="flex1 gray_e tr pl5 ft14">{{item.fee}}</text>
					</view>
				</view>
				<view class="mt15 flex">
					<view class="flex1">
						<view>
							<view class="mt5">{{item.buyprice}}-{{item.newsprice}}</view>
							<view class="gray7 mt5">{{item.buytime}}</view>
						</view>
					</view>
					<view class="flex1 tr">
						<view class="gray7 h10">{{item.endprofit.hour}}{{item.endprofit.min}}{{item.endprofit.sec}}  </view>
						<view class="mt5">
							{{item.end_time1}}
						</view>
					</view>
				</view>
				<view class="mt10">
					<progress :percent="item.widths" activeColor="#333" backgroundColor="#3b7eff" stroke-width="3" />
				</view>
			</view>
			
			<view class="tc ptb30" v-if='nomoreshow'>
				<image src="/static/image/nodata.png" class="h50 wt50"></image>
				<view class="gray7">{{$t('home.norecord')}}</view>
			</view>
			<view class="tc gray7 ptb20" v-show="isBottom">{{$t('home.loading')}}...</view>
			<view class="tc gray7 ptb20" v-show="!hasMore && enList.length>10">{{$t('home.nomore')}}</view>
		</view>
		<view class="en-ul pl15 pt50" v-show="current==1">
			<view class="ptb10 bdb_1e pr15" v-for="item in hisList" :key="item.oid"  @click="godetail(item.oid)">
				<view class="flex between alcenter">
					<view class="flex flex flexend">
						<text class="ft14 greenColor" v-if="item.ostyle=='0'">{{$t('trade.buy')}}</text>
						<text class="ft14 redColor" v-else>{{$t('trade.sell')}}</text>
						<text class="gray_e pl5 ft14">{{item.ptitle}}</text>
						<text class="pl5 gray7">{{item.created_at}}</text>
					</view>
					<view class="gray7 ptb5">{{$t('trade.has_done')}}</view>
				</view>
				<view class="mt15 flex">
					<view class="flex1">
						<view>
							<text class="gray7">{{$t('trade.price')}}</text>
							<view class="mt5">{{item.buyprice}}</view>
						</view>
						<view class="pt10">
							<text class="gray7">{{$t('trade.curprice')}}</text>
							<view class="mt5">{{item.sellprice}}</view>
						</view>
					</view>
					<view class="flex1 tc">
						<view>
							<text class="gray7">{{$t('trade.num')}}</text>
							<view class="mt5">{{item.jyjs}}</view>
						</view>
						<view class="pt10">
							<text class="gray7">{{$t('team.profit')}}</text>
							<view class="mt5":class="{ green: parseFloat(item.ploss) < 0, red2: parseFloat(item.ploss) >= 0 || item.ploss == '' }">{{item.ploss}}</view>
						</view>
					</view>
					<view class="flex1 tr">
						<text class="gray4">{{$t('trade.time')}}</text>
						<view class="mt5">{{item.buytime}}</view>
					</view>
				</view>
			</view>
			<view class="tc ptb30" v-if='hnomore'>
				<image src="/static/image/nodata.png" class="h50 wt50"></image>
				<view class="gray7">{{$t('home.norecord')}}</view>
			</view>
			<view class="tc gray7 ptb20" v-show="isBottom">{{$t('home.loading')}}...</view>
			<view class="tc gray7 ptb20" v-show="!hasMore && hisList.length>10">{{$t('home.nomore')}}</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup2.vue';
	import {mapState} from 'vuex'
	import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue"
	
    export default {
		components: {
			uniPopup,
			uniCountdown
		},
		data() {
			return {
				uid:'',
				current:0,//全部/历史
				popType:'',//底部弹窗
				enType:'in',//全部委托类型
				enList:[],//当前委托
				hisList:[],//历史委托
				page:1,
				isBottom:false,
				hasMore:true,
				nomoreshow:false,
				hnomore:false,
				isshow:true,
				timeData: '',    //存放每条数据的处理好的倒计时
				timer: '',    //用来清除定时器
				message: []   //接口请求返回的数据
			}
		},
		filters:{
			toFixed2: function (value, options) {
				value = Number(value);
				return value.toFixed(2);
			},  
		},
		computed:{
		   ...mapState(['theme']),
		},
		onLoad(e) {
			if(e.current){
				this.current = e.current;
			}
			uni.setNavigationBarTitle({
				title:this.$t('trade').chicang
			})
			console.log(this.current)
		},
		onShow(){
			this.uid = uni.getStorageSync('uid');
			this.$utils.setThemeTop(this.theme);
			if(this.current == 1){
				this.hisenList();
				
			}else{
				this.entrustList();
			}
		},
		onUnload(){   //卸载页面清除定时器
			clearInterval(this.timer)  
		},
		methods: {
			getTimeList(){
			    let that = this
				var timer = setInterval(function () {
					that.enList.forEach((item) =>{
						
					  var totaltime = item.endprofit;     //获取时间差
					  that.totaltime(totaltime)   //这是下面封装的方法，将毫秒数处理成"xx时xx分xx秒"
					  item.widths = 100 - Number(totaltime / item.endtime).toFixed(4)*100;
					  item.end_time1 = that.timeData  //处理好的单个时间安排到item上（重要）
					  if(that.timeData == '00:00:00'){
						  item.isshow = false;
					  }else{
						  item.isshow = true;
					  }
					  item.endprofit --;
					})
					that.enList = that.enList
				}, 1000)
				
				that.timer = timer
			       //全部处理好的数据重新赋值
				
			},
			
			totaltime(a){   //计算单个剩余时间
				let totaltime = parseInt(a);
			    let that = this
			    var h, m, s, d
				  
			    if(totaltime > 0) {
			        d = Math.floor(totaltime / 60 / 60 / 24) * 24
			        h = Math.floor(totaltime / 60 / 60 % 24)
			        m = Math.floor(totaltime / 60 % 60)
			        s = Math.floor(totaltime % 60)
			        //获取时分秒
			        h = d + h
			        h = that.test(h)
			        m = that.test(m)
			        s = that.test(s)
			        that.timeData =h+':'+m+':'+s // 每个时间的显示格式
			    }else{
					that.isshow = false;
			        that.timeData = '00:00:00' 
			    }
			},
			
			test(num) {
				if (num < 10) {
					num = "0" + num    
				}
				return num;
			},
			
			pingcang(oid){
				let that = this;
				let url="position/liquidation";
				that.$utils.initDataToken({ url: url,data:{oid:oid},type:'post' }, res => {
					var data = res.data;
				
					if(res.code == 200){
						
						uni.showToast({
							icon: 'none',
							title: res.msg,
							duration:2000
						});
						
					}
					setTimeout(() => {
						that.entrustList()
					}, 2000)
					
				});
			},
			timeUp(){
				 this.entrustList();
			},
			godetail(oid){//委托
				uni.navigateTo({
					url:'../trade/detail?oid='+oid
				})
			},
			change(current){
				if(this.current==current){
					return;
				}
				this.current = current;
				this.page = 1;
				current==0 ? this.entrustList() : this.hisenList();
				clearInterval(this.timer)  
			},
			togglePopup(popType){//弹窗
				this.popType = popType;
			},
			changeEntrustType(type){//委托类型切换
			    this.enType = type;
				this.togglePopup('');
				this.page=1;
				this.isBottom=false,
				this.hasMore=true,
				this.enList=[];
				this.entrustList();
			},
			entrustList(){//委托
				let that = this;
				let url="position/unorderList";
				let type=1;
				that.enType == 'out' ? 2: 1;
				// console.log(88999)
				that.$utils.initDataToken({ url: url,data:{page:that.page},type:'post' }, res => {
					uni.stopPullDownRefresh();
					console.log(res);
					console.log('res')
					if(res.code == 200){
						var data = res.data;
						that.isBottom=false;
						that.nomoreshow = false;
						that.enList = (that.page == 1) ? data : that.enList.concat(data);
						that.hasMore = (20 == data.length) ? true : false;
						
						//数据返回成功之后再调计时器，防止异步
						
						
						that.getTimeList()
						
						
					}else{
						if(that.page == 1){
							that.enList = {};
							that.hasMore = false;
							that.nomoreshow = true;
						}else{
							that.enList = that.enList;
							that.hasMore = false;
						}
					
					}
					
				});
			},
			hisenList(){//历史委托
				let that = this;
				that.$utils.initDataToken({ url: 'position/orderList',data:{page:that.page},type:'post' }, res => {
					var data = res.data;
					// let arr=[];
					// for(let i=0;i<resdata.length;i++){
					// 	if(res[i].status==3 || resdata[i].status==2){
					// 		arr.push(res[i]);
					// 	}
					// }
					// var data = arr;
					
					// console.log(that.hasMore)
					uni.stopPullDownRefresh();
					if(res.code == 200){
						var data = res.data;
						
						
						that.isBottom=false;
						that.hnomore = false;
						that.hisList = (that.page == 1) ? data : that.hisList.concat(data);
						that.hasMore = (20 == data.length) ? true : false;
					}else{
						
						if(that.page == 1){
							that.hisList = {};
							that.hasMore = false;
							that.hnomore = true;
						}else{
							that.hisList = that.hisList;
							that.hasMore = false;
							
						}
						
					}
				});
			},
			onPullDownRefresh(){
				this.page=1;
				this.isBottom=false,
				this.hasMore=true,
				this.current==0 ? this.entrustList() : this.hisenList();
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
			onReachBottom() {
				if(!this.hasMore) return;
				this.page++;
				this.current==0 ? this.entrustList() : this.hisenList();
			},
			revoke(index,id){//撤单
				let that = this;
				that.$utils.initDataToken({ url: 'coin/trade',data:{type:that.enType,id:id},type:'put' }, res => {
					that.$utils.showLayer(res);
					// that.enList.splice(index, 1);//动态删掉这个订单
					that.enList[index].status=3;
				});
			}
		},
	}
</script>

<style>
	page{
		background: #102030;
	}
	.uni-progress-inner-bar{float:right!important;}
	.pingcang{padding: 5px 10px;
    background: #7d5dd8;
    border-radius: 5px;
    display: inline-block;}
</style>
