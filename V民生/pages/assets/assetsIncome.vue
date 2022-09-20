<template>
	<view class="" :class="{'light':theme=='light'}">
	
			<view class="ptb10 bdb_1e pr15 plr20" v-for="(item,index) in enList" :key="item.id">
				<view class="flex between alcenter">
					<view class="flex flex flexend">
						<text>{{item.typedesc}}</text>
					</view>
					<view class="blueColor" >{{item.is_verify}}</view> 
					
				</view>
				<view class="mt15 flex">
					<view class="flex1">
						<view>
							<text class="gray4">{{$t('legal.amount')}}</text>
							<view class="mt5">{{item.money}}</view>
						</view>
						
					</view>
					<view class="flex1 tc">
						<text class="gray4">{{$t('legal.remark')}}</text>
						<view class="mt5">{{item.remarks}}</view>
					</view>
					<view class="flex1 tr">
						<text class="gray4">{{$t('trade.time')}}</text>
						<view class="mt5" >{{item.utime}}</view>
					</view>
				</view>
				
			</view>
			
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup2.vue';
	import {mapState} from 'vuex'
    export default {
		components: {
			uniPopup
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
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('home').shoudetail
			})
		},
		onShow(){
			this.uid = uni.getStorageSync('uid');
			this.$utils.setThemeTop(this.theme);
			this.getdata();
		},
		
		methods: {
			
			getdata(){//委托
				let that = this;
				let url="personal/accountLog";
				
				that.$utils.initDataToken({ url: url,data:{page:that.page,limit:30},type:'post' }, res => {
					var data = res.data;
					console.log(data);
					uni.stopPullDownRefresh();
					that.isBottom=false;
					that.enList = (that.page == 1) ? data : that.enList.concat(data);
					that.hasMore = (res.limit == data.length) ? true : false;
					console.log(that.hasMore)
				});
			},
			
			onPullDownRefresh(){
				this.page=1;
				this.isBottom=false,
				this.hasMore=true,
				this.getdata();
			},
			onReachBottom() {
				if(!this.hasMore) return;
				this.page++;
				this.getdata();
			}
		},
	}
</script>

<style>
	page{
		background: #102030;
	}
	.pingcang{padding: 5px 10px;
    background: #7d5dd8;
    border-radius: 5px;
    display: inline-block;}
</style>
