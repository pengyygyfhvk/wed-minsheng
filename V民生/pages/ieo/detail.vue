<template>
	<view >
			<navigator open-type="navigateBack" class="back mt5" ><image src="/static/image/return.png"></image></navigator>			
		<view class="rgcz" v-if="bool">
		          <view class="rgcz-mask" @click="closerg()"></view>
		          <view class="rgcz-content">
		              <view class="rgcz-title">{{$t('zdy.rgcz')}}</view>
		              <view class="rgcz-input">
		                  <input type="number" :placeholder="$t('zdy.srrgsl')" v-model="amount" @input="inputAmount()">
		              </view>
		              <view class="rgcz-currency">
		                  1 {{detail.currency_name}} = {{price}} {{seleCurrency[currencyIndex].name}}
		              </view>
		              <view class="rg-ptb">{{$t('zdy.a2')}}{{seleCurrency[currencyIndex].name}}：{{compute_price | toFixed8}}</view>
					  <view class="rg-ptb">{{$t('zdy.dqyuee')}}：{{balance | toFixed8}}</view>
		              <view class="rg-submit" @click="submitrg()">{{$t('zdy.rg')}}</view>
		          </view>
		      </view>
		        <view class="top-bg">
		            <view class="top-title">
		                <view class="top-title-h1">{{detail.title}}</view>
		                <text>{{detail.summary}}</text>
		            </view>
		           <!-- <view class="top-img">
		                <image :src="detail.logo"></image>
		            </view> -->
		        </view>
		      <view class="white-jje">
		          <view class="white-time">
		              <view class="white-time-h1">{{$t('zdy.jssj')}}</view>
		              <text>{{detail.end_at}}</text>
		          </view>
				  <view class="white-time between">
				      <view class="white-time-h1">{{$t('zdy.a1')}}</view>
				      <picker mode="selector" :range="seleCurrency" range-key="name"  @change="ChangePrice">
						  {{seleCurrency[currencyIndex].name}}
					  </picker>
				  </view>
		          <view class="white-time between">
		              <view class="white-time-h2">{{$t('zdy.fhjg')}}</view>
		              <text> 1 {{detail.currency_name}} = {{price}} {{seleCurrency[currencyIndex].name}}</text>
		          </view>
		           <view class="white-time between">
		              <view class="white-time-h2">{{$t('zdy.fhzl')}}</view>
		              <text> {{detail.amount}} {{detail.currency_name}}</text>
		          </view>
		          <view class="white-link">
		              <navigator :url="'/pages/ieo/link?url='+detail.link" target="_blank">{{$t('zdy.gw')}}</navigator>
		              <navigator :url="'/pages/ieo/link?url='+detail.white_book" target="_blank">{{$t('zdy.bps')}}</navigator>
		          </view>
		      </view>
		      <view class="sgzq">
		          <view class="sgzq-title">{{$t('zdy.sgzq')}}</view>
		          <view class="sc-1hdolm6-1 hFymFN">
		           <view class="item active">
		            <text class="item-circle">1</text>
		            <view class="item-title">
		             {{$t('zdy.yr')}}
		             <view class="time"></view>
		            </view>
		           </view>
		           <view class="item active">
		            <text class="item-circle">2</text>
		            <view class="item-title">
		             {{$t('zdy.sg')}}
		             <view class="time">
		              {{detail.start_at}}
		             </view>
		            </view>
		           </view>
		           <view class="item active">
		            <text class="item-circle">3</text>
		            <view class="item-title">
		             {{$t('zdy.js')}}
		             <view class="time">
		                {{detail.end_at}}
		             </view>
		            </view>
		           </view>
		          </view>
		      </view>
		      <view class="xmxq">
		          <view class="xmxq-title">{{$t('zdy.xmxq')}}</view>
		          <view class="xmxq-content" v-html="detail.content"></view>
		      </view>
		      <view style="height:60px;background:#fff"></view>
		      <view class="submit">
		          <button @tap="login()" v-if="!token">{{$t('login.login')}}</button>
		          <button @tap="submit()" v-if="detail.time_status==2 && token">{{$t('zdy.rg')}}</button>
		          <button  v-if="detail.time_status==1 && token" style="background:#999">{{$t('zdy.wks')}}</button>
		          <button  v-if="detail.time_status==3 && token" style="background:#999">{{$t('zdy.yjs')}}</button>
		      </view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				seleCurrency:[{id:3,name:'USDT'},{id:1,name:'BTC'},{id:2,name:'ETH'}],
				currencyIndex:0,
				bool:false,
				  amount:'',
				  compute_price:0,
				  detail:[],
				  searchBarRightFixed:false,
				  searchBarFixed:false,
				  tabIndex:0,
				  token:"",	
					price:'',
					currency_id:3,
					balance:'',
			}
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
			// this.$utils.setThemeBottom(this.theme)
			setTimeout(()=>{
				uni.setNavigationBarColor({
					'navigationBarBackgroundColor':"#999"
				})
			},1500)
		},
		onLoad(e) {	
			this.token=uni.getStorageSync('token');
			 this.init(e.id);
		},
		filters:{
			toFixed8(val){
				return Number(val).toFixed(8)
			},
		},
		methods:{
			 getQuotantionPrice(){
			  this.$http({
				url:"/api/project/detail?project_id="+this.nextId,
				headers: { Authorization: this.token },        
			  }).then(res => {
				if (res.data.type == "ok") {  
				  if(this.seleCurrencyName=="USDT"){
					this.price=this.detail.price;
				  }else if(this.seleCurrencyName=="BTC"){
					this.price=this.detail.btc_price;
				  }else{
					this.price=this.detail.eth_price;
				  }
				}
			  });
			},
			ChangePrice(e){
				let index=e.detail.value;
				this.currencyIndex=index;
				if(index==0){					
					this.currency_id=this.seleCurrency[index].id
					this.price=this.detail.price;				
					this.getBalance(this.currency_id);
					this.inputAmount();
				}else if(index==1){
					this.currency_id=this.seleCurrency[index].id
					this.price=this.detail.btc_price;			
					this.getBalance(this.currency_id);	
					this.inputAmount();
				}else{
					this.currency_id=this.seleCurrency[index].id								
					this.price=this.detail.eth_price;			
					this.getBalance(this.currency_id);
					this.inputAmount();
				}
			},
			closerg(){
				  this.bool=!this.bool;
			  },
			  inputAmount(){
				if(this.amount*1<=0)return;
				this.compute_price=this.amount*this.price;
			  },
			  submitrg(){
				  let that=this;
				if(this.amount*1<=0){
					that.$utils.showLayer(that.$t('trade.p_num'));
					return
				}
				uni.showLoading();
				this.$utils.initDataToken({
					url:"project/order",
					type:"post",
					data:{
						 price:this.price,
						pay_currency:this.currency_id,
						amount:this.amount,
						project_id:this.detail.id 
					}
				},res=>{
					uni.hideLoading();
					that.$utils.showLayer(res);
					 setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/ieo/index"
						})
					},1000)     
				  if(res.type=="ok"){
						that.amount='';
						that.compute_price='';
						that.bool=false;
				  }
				})
			  },
			  login(){
				  uni.reLaunch({
				  	url:"/pages/mine/login"
				  })
			  },
			  submit(){
				this.bool=!this.bool;
			  },
			 init(id){
			  let that=this;
			  this.$utils.initDataToken({
				  url:"project/detail",
				  data:{
					  project_id:id,
				  }
			  },res=>{
				  // console.log(res.info);
				  that.detail=res.info;
				  that.price=res.info.price;	
				that.getBalance(that.currency_id);
			  })
			},
			getBalance(id){
				this.$utils.initDataToken({
				  url:"wallet/detail",
				  type:"post",
				  data:{
					  type:"change",
					  currency:id
				  }
				},res=>{
					this.balance=res.change_balance;
				})
			},
		}
	}
</script>

<style>
	
	page{
		background: #ddd;
	}
	.top-bg{
	        display: flex;
	        flex-direction: row;
	        justify-content: space-between;
	        color:#fff;
	        padding: 40px 5%;
	        color: rgb(255, 255, 255);
			background: #5a96fd;
	        /* background: linear-gradient(90deg, rgb(48, 78, 236) 0%, rgb(90, 150, 253) 100%) */
	    }
	    .top-title-h1{
	        margin: 10px 0 5px;
	        font-size: 16px;
	        font-weight: bold;
	    }
	    .top-title text{
	        font-size: 12px;
	    }
		.back image{
			width: 100%;
			height: 100%;
		}
	    .back{
	        position: absolute;
	        left: 12px;
	        display: block;
	        margin: 0px auto;
	        background-position: center;
	        margin-left: -10px;
	        top: 8px;
	        width: 30px;
	        height: 24px;
	    }
	    .top-img image{
	        width: 100%;
	        height: 100%;
	        border-radius: 50%;
	    }
	    .top-img{
	        width: 50px;
	        height: 50px;
	        border-radius: 50%;
	    }
	    .white-jje{
	        background: #fff;
	        border-radius: 20px 20px 0 0;
	        position: relative;
	        margin-top: -20px;
	        padding: 10px 5%;
	    }
	    .white-time{
	        display: flex;
	        flex-direction: row;
	        margin-top: 20px;
	        padding-bottom: 10px;
	        border-bottom:1px solid #ddd;
	    }
	    .white-time-h1:after{
	        content: "：";
	    }
	    .white-time text{
	        font-size: 13px;
	        color: rgb(33, 40, 51);
	    }
	    .white-time-h1{
			color:#212833;
	        font-size: 13px;
	    font-weight: normal;
	    }
	    .white-time-h2{
			color:#212833;
	        font-size: 13px;
	    font-weight: normal;
	    }
	    .between{
	        justify-content: space-between;
	    }
	    .white-link{
	        display: flex;
	        flex-direction: row;
	        margin-top: 20px;
	        padding-bottom: 10px;
	    }
	    .white-link navigator{
			color:#212833;
	        margin-right: 20px;
	    }
	    .sgzq{
	        padding: 15px 5%;
	        margin-top: 10px;
	        background: #fff;
	    }
	    .sgzq-title{
			color: #212833;
	        font-size: 16px;
	        font-weight: bold;
	    }
	    .hFymFN {
	        margin-left: 6px;
	        margin-top: 15px;
	        color: rgb(132, 142, 156);
	    }
	    .hFymFN .item {
	        position: relative;
	        padding-left: 20px;
	        padding-bottom: 10px;
	        border-left: 1px solid rgb(234, 236, 239);
	    }
	    .hFymFN .item.active .item-circle {
	        background-color: rgb(240, 185, 11);
	        color: rgb(255, 255, 255);
	    }
	    .hFymFN .item-title {
	        top: 3px;
	        position: relative;
	        padding-bottom: 6px;
	        font-size: 12px;
	        line-height: 10px;
	        color: rgb(33, 40, 51);
	    }
	    .hFymFN .item-circle {
	        position: absolute;
	        width: 15px;
	        height: 15px;
	        line-height: 15px;
	        left: -7px;
	        text-align: center;
	        background-color: rgb(234, 236, 239);
	        color: rgb(132, 142, 156);
	        border-radius: 9px;
	    }
	    .hFymFN .time {
	        position: absolute;
	        right: 0px;
	        top: 0px;
	    }
	    .sc-1hdolm6-1 hFymFN .item:last-child{
	        padding-bottom: 0;
	    }
	    .xmxq{
	        margin-top: 10px;
	        padding: 15px 5%;
	        background: #fff;
	    }
	    .xmxq-title{
			color: #212833;
	        font-size: 16px;
	        font-weight: bold;
	    }
	    .xmxq-content img{
	        max-width: 100%;
	    }
	    .xmxq-content{
			color: #212833;	
	        margin-top: 5px;
	        word-break: break-all;
	    }
	    .rg-submit{
	        color: #212833;
	        background: -webkit-gradient(linear, left top, right top, from(#f0b90b), to(#fbda3c));
	        background: -webkit-linear-gradient(left, #f0b90b 0%, #fbda3c 100%);
	        background: -moz-linear-gradient(left, #f0b90b 0%, #fbda3c 100%);
	        background: -o-linear-gradient(left, #f0b90b 0%, #fbda3c 100%);
	        background: linear-gradient(90deg, #f0b90b 0%, #fbda3c 100%);
	        border: 0;
	        -webkit-box-shadow: 0px 10px 30px 0px rgba(240, 185, 10, 0.3);
	        -moz-box-shadow: 0px 10px 30px 0px rgba(240, 185, 10, 0.3);
	        box-shadow: 0px 10px 30px 0px rgba(240, 185, 10, 0.3);
	        display: block;
	        text-align: center;
	        width: 100%;
	        padding: 10px 0;
	        font-size: 14px;
	    }
	    .submit{
	        position: fixed;
	        bottom: 0px;
	        left: 0px;
	        right: 0px;
	        padding: 10px 5%;
	        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1.25rem 0px;
	        z-index: 10;
	        background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%);
	    }
	    .submit button{
	        color: #212833;
	        background: -webkit-gradient(linear, left top, right top, from(#f0b90b), to(#fbda3c));
	        background: -webkit-linear-gradient(left, #f0b90b 0%, #fbda3c 100%);
	        background: -moz-linear-gradient(left, #f0b90b 0%, #fbda3c 100%);
	        background: -o-linear-gradient(left, #f0b90b 0%, #fbda3c 100%);
	        background: linear-gradient(90deg, #f0b90b 0%, #fbda3c 100%);
	        border: 0;
	        -webkit-box-shadow: 0px 10px 30px 0px rgba(240, 185, 10, 0.3);
	        -moz-box-shadow: 0px 10px 30px 0px rgba(240, 185, 10, 0.3);
	        box-shadow: 0px 10px 30px 0px rgba(240, 185, 10, 0.3);
	        display: block;
	        text-align: center;
	        width: 100%;
	        padding: 10px 0;
	        font-size: 14px;
	    }
	    .rgcz{
	        position: fixed;
	        background: rgba(0,0,0,0.5);
	        width: 100%;
	        height: 100%;
	        z-index: 88;
	        margin: auto;
	        left: 0;
	        top: 0;
	        bottom: 0;
	        right: 0;   
	    }
	    .rgcz-mask{
	        position: fixed;
	        background: rgba(0,0,0,0.5);
	        width: 100%;
	        height: 100%;
	        margin: auto;
	        left: 0;
	        top: 0;
	        bottom: 0;
	        right: 0;
	    }
	    .rgcz-content{
			color: #000;
	        width: 60%;
	        margin: auto;
	    }
	    .rgcz-title{
	        font-size: 16px;
	        font-weight: bold;
	    }
	    .rgcz-currency{
	        margin-bottom: 5px;
	        font-size: 13px;
	    }
		.rgcz-input input{
			color: #000;
		}
	    .rgcz-input{
	        border: 1px solid #999;
	        padding: 3px 3%;
	        margin: 10px 0;
	    }
	    .rg-ptb{
	        margin-bottom: 10px;
	    }
	    .rgcz-content {
	        margin: auto;
	        height: 30vh;
	        position: absolute;
	        width: 80%;
	        top: 0;
	        left: 0;
	        right: 0;
	        bottom: 0;
	        background: #fff;
	        border-radius: 5px;
	        padding: 10px 5%;
	    }
		.white-time picker{
			color:#000;
			border:1px solid #ddd;
			padding: 10upx  60upx 10upx 20upx;
			position: relative;			
		}
		.white-time picker:after{
			position: absolute;
			top:20upx;
			right: 10upx;
				content: "";
			    width: 0;
			    height: 0;
			    border: 16upx solid;
			    border-color:#000 transparent  transparent  transparent ;
		}
</style>
