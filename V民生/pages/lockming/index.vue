<template>
	<view>
		<navigator  open-type="navigateBack" class="back">
			<image src="../../static/image/return.png"></image>
		</navigator>
			<image src="../../static/image/record.png" class="topimg" @click="jumpList()">
			<view class="bg">
			    <view class="bgImg">
					<image src="../../static/image/lockbg.jpg"></view>
			    <view class="boxtitle">
	                <view>
						<text>{{$t("zdy.a27")}}</text>
					</view>
	                <view class="h2">{{$t("zdy.a28")}}</view>
	                <view  class="h2">{{$t("zdy.a37")}}</view>
			    </view>
			</view>
			<view class="mineCardList">
			     <view class="mineCard" v-for="(item,index) in list" :key="index">
					<view class="topName">
						<view class="topNamePay ft18">{{item.title}}</view>						
					</view>
					<view class="acbuyBtmL  mt10 flex between" style="background: #f5f5f5;padding: 10px 15px;margin:10px 15px 0">
						<input type="number" v-model="item.number"  @input="listenAmount(index)" :placeholder="$t('zdy.zxscsl')+item.minPrice"  style="background: transparent; width:80%;max-width:80%;color:#000">
					</view>
					<view class="acbuyBtmL  mt5 flex between" style="margin:10px 15px 0">
						<label>{{$t('zdy.a29')}}</label>
					</view>
					 <view class="acbuyBtmL  mt5 flex between" style="margin:10px 15px 0">
						<label style='font-weight:bold'>{{item.yj_count  | toFixed8}}</label>
					</view>
					<view class="bottomCard flex between alcenter">
						<view class="midType ">
							<view class="price">
								{{item.lilv | toFixed2}}% 
							</view>
							<view class="midTypetTitle mt5 gray9">
								{{$t("zdy.a24")}}
							</view>
						</view>
						<view class="midDay">
							<view style="color: #999;">{{item.time}}  <label>{{$t("zdy.a25")}}</label></view>
							<text class="gray9">{{$t("zdy.a26")}}</text>
						</view>
					</view>

					<view class="minerBtn flex between alcenter">
						<view class="btn" @click="jumpBuy(index)">
							{{$t("legal.buy")}}
						</view>
					</view>
	        </view>
	       
			</view>
			 <view class="buyMask" v-show="maskBool">
	      <view class="buyContent">
	        <view class="buyTitle">{{order.currency_name}}{{$t('zdy.a27')}}</view>
	        <view class="buyBox">
	          <view class="buyItem">
	            <text>{{$t('zdy.a24')}}</text>
	            <view class="h1">{{order.lilv|toFixed2}} % </view>
	          </view>
	          <view class="buyItem">
	            <text>{{$t('zdy.a31')}}</text>
	            <view class="h1">{{order.number}} {{order.currency_name}}</view>
	          </view>
	           <view class="buyItem">
	            <text>{{$t('zdy.a29')}}</text>
	            <view class="h1">{{order.yj_count | toFixed8}} {{order.currency_name}}</view>
	          </view>
	           <view class="buyItem">
	            <text>{{$t('zdy.a13')}}</text>
	            <view class="h1">{{balance | toFixed8}} {{order.currency_name}}</view>
	          </view>
	          <view class="buyBtn">
	            <button class="cencelBuy" @click="tabMask()">{{$t('trade.cancel')}}</button>
	            <button class="sureBuy" @click="postBuyMiner">{{$t('legal.buy')}}</button>
	          </view>
	        </view>
	      </view>
	    </view>
		</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
			 order:[],
			  list:[],
			  maskBool:false,
			  yj_count:0,
			  balance:0,
			  listIndex:0,
			}
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
			// this.$utils.setThemeBottom(this.theme)
		},
		onLoad(e) {		
			this.getData();
			uni.setNavigationBarTitle({
				title:this.$t('zdy.a27')
			})
		},
		filters:{
			toFixed2(val){
				return Number(val).toFixed(2);
			},
			toFixed8(val){
				return Number(val).toFixed(8);
			},
			toFixeds: function (value) {
				value = Number(value);
				return value.toFixed(2);
			},
			toFixeds3: function (value) {
				value = Number(value);
				return value.toFixed(3);
			},
			toFixed4: function (value, options) {
				value = Number(value);
				return value.toFixed(4);
			},
			toFixedNum: function (value, options) {
				value = Number(value);
				return value.toFixed(0);
			},
			toFixed1: function (value, options) {
				value = Number(value);
				return value.toFixed(1);
			},
		},
		methods:{
			jumpList(){
				uni.navigateTo({
					url:"/pages/lockming/list"
				})
			},
			tabMask(){
			this.maskBool=!this.maskBool;  
		  },
		   postBuyMiner(){      
			  if(this.balance<this.order.number*1){
				return this.$utils.showLayer(this.$t('zdy.a13')+this.$t('zdy.a14'));
			  } 
			  this.$utils.initDataToken({
				url:"yuebao/buy",
				type:"post",
				data:{
					id:this.list[this.listIndex].id,
					amount:this.list[this.listIndex].number
				},
			  },res=>{
				this.$utils.showLayer(res.msg);        
				this.maskBool=false;
				this.list[this.listIndex].number='';
				this.list[this.listIndex].yj_count=0;
				this.$forceUpdate();
			  })
			},
		  jumpBuy(i){
			  if(this.list[i].save_min*1>this.list[i].number*1){
				return  this.$utils.showLayer(this.$t('zdy.a31')+this.list[i].save_min);
			}
			this.getBalance();
		//   this.$router.push("/lockDetail")
			this.listIndex=i;
			this.order=this.list[i];
			this.maskBool=true;
		},
		  getData(){
			  this.$utils.initDataToken({
					url:"yuebao/lists",
					
			  },res=>{
				  let list=res.data;
					if(list.length){
						this.list=list.filter(item=>{
							item['yj_count']=0;
							item['number']='';
							return item;
						})
					}			
			  })
		},
		listenAmount(i){
			this.list[i]['yj_count']=this.list[i]['number']*this.list[i].lilv/100*this.list[i].time;
			this.$forceUpdate();
		 },
		 getBalance(){
			 this.$utils.initDataToken({ url: 'member/getUserInfo', data: {}, type: 'get' }, (res, msg) => {
				 console.log(res)
				 this.balance=res.data.usermoney;
			 })
		},
		}
	}
</script>

<style>
	.bgImg{
	      width: 100%;
	      height: 420upx;
	  }
	  .bgImg image{
	      width: 100%;
	      height: 100%;
	  }
	  .boxtitle{
	      position: absolute;
	      z-index: 2;
	      top: 0;
	      width: 100%;
		  padding-top: 80upx;
	  }
	  .boxtitle view{
	    margin-left:40upx;
	    margin-bottom: 40upx;
	  /* padding-top: 80upx; */
	  position: relative;
	  display: flex;
	    flex-direction: row;
	    justify-content: center;
	}
	.boxtitle text:after{
	  content: "";
	   position: absolute;
	    bottom:-16upx;
	    left: 36upx;
	    border-width: 0 20upx 20upx;
	    border-style: solid;
	    border-color: transparent transparent transparent #ffd12d;
	}
	.boxtitle text{
	  position: relative;
	  background: #ffd12d;
	  color:#000;
	  font-weight: bold;
	  padding: 10upx 30upx;
	  border-radius: 30upx;
	  font-size: 28upx;
	
	}
	.boxtitle .h2{
	  font-weight: bold;
	  text-align: center;
	  font-size: 40upx;
	  color:#fff;
	  margin-top: 30upx;
	  margin-left: 40upx;
	}
	.mineCard{			
			position: relative;
			width: 90%;
			margin: 40upx auto 0;
			border-radius: 30upx;
			background-color: #fff;
			padding-top: 40upx;
			padding-bottom: 40upx;
		}
	  .topNameCard{
			position: absolute;
			right: 0;
			top:0;
			border-radius: 0 10upx 0 20upx;
			padding: 20upx 60upx;
			text-align: center;
			color: #fff;
			background: #00b796;
		}
	  .topName{
			font-size: 56upx;
			display: flex;
			flex-direction: column;
			padding-left: 30upx;
		}
		.topName text::after{
			content: ",";
		}
		.topName text:last-child::after{
			content: "";
		}
		.topNamePay{
			color: #000000;
			margin-top: 20upx;
			font-weight: bold;
		}
		.topNameCard{
			position: absolute;
			right: 0;
			top:0;
			border-radius: 0 10upx 0 20upx;
			padding: 20upx 60upx;
			text-align: center;
			color: #fff;
			background: #00b796;
		}
	  .bottomCard{
			padding: 0 40upx;
		}
	  .midType{
			margin-top: 40upx;
		}
		.midTypetTitle text:after{
			content: "}";
		}
		.midTypetTitle text:before{
			content: "{";
		}
		.midTypetTitle{
			font-size:30upx;
			margin-bottom: 40upx;
		}
		.price span{
			font-size: 32upx;
		}
		.price{
			letter-spacing: 6upx;
			font-size: 50upx;
			font-weight: bold;
			color:#00B796;
		}
	  .midDay{
			display: flex;
			flex-direction: column;
		}
		.midDay div label{
			font-size: 52upx;
		}
		.midDay div{
			margin-bottom:10upx;
			font-size: 50upx;
			font-weight: bold;
			color: #000;
		}
		.minerBtn{
				margin: 0 40upx;
			}
			.gray9{
			 color:#999;   
			}
			 .btn{
	      width: 100%;
			padding: 24upx 80upx;
			text-align: center;
			font-size: 28upx;
			color: #fff;
			background-color: #2c63e4;
			border-radius: 30upx;
			box-sizing: border-box;
	    cursor: pointer;
		}
		.buyMask{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  left: 0;
	  top:0;
	  z-index: 3;
	  background: rgba(0,0,0,0.5);
	}
	.buyTitle{
	  color:#000;
	  text-align: center;
	  font-size: 40upx;
	  padding: 20upx;
	  border-bottom: 1px solid #ddd;
	}
	.buyBox{
	  display: flex;
	  flex-direction: column;
	}
	.buyItem{		
	  padding: 40upx;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	}
	.buyItem text{
	  color:#999;
	  font-size:28upx;
	}
	.buyItem .h1{
	  font-weight: bold;
	  font-size: 28upx;
	  color:#000;
	}
	.buyBtn{
	  margin-top: 20upx;
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
	  margin-top: 60upx;
	}
	.buyBtn button{
	  cursor: pointer;
	  width: 45%;
	  height: 100upx;
	  text-align: center;
	  line-height: 100upx;
	  border-radius: 10upx;
	  font-size: 32upx;
	  
	}
	.buyBtn .cencelBuy{
	    border: 0;
	  background-color: #EEEEEE;
	  color: #999999;
	  
	}
	.buyBtn .sureBuy{
	    border: 0;
	  background-color: #0066ED;
	  color: #fff;
	  
	}
	.acstorm{
	  margin: 40upx 0 20upx;
	  color:#999;
	  text-align: center;
	}
	.acboxTime{
	  justify-content: center;
	}
	.acboxTimeView{
	  font-size: 32upx;
	  font-weight: bold;
	}
	.acBoxBtn{
	  display: flex;
	  justify-content: center;
	  margin-top: 30upx;
	  padding-bottom: 40upx;
	}
	.acBoxBtn button{
	  cursor: pointer;
	  padding: 14upx 40upx;
	  border-radius: 5px;
	  background: #0066ED;
	  color:#fff;
	
	}
	.mt5{
	  margin-top:10upx
	}
	.acbuyInput{
	  margin-top: 10upx;
	}
	.acbuyBtmL select{
	    background: none;
	    border: 0;
	    cursor: pointer;
	}
	.mt50{
	    margin-top: 100upx;
	}
	.buyMask{
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  left: 0;
	  top:0;
	  z-index: 3;
	  background: rgba(0,0,0,0.5);
	}
	.buyContent{
	  position: fixed;
	  top: 0;
	  left: 0;
	  bottom: 0;
	  right: 0;
	  margin: auto;
	  width: 90%;
	  height:720upx;
	  background: #fff;
	  border-radius: 5px;
	}
	.buyTitle{
	  color:#000;
	  text-align: center;
	  font-size: 40upx;
	  padding: 20upx;
	  border-bottom: 1px solid #ddd;
	}
	.buyBox{
	  display: flex;
	  flex-direction: column;
	}
	.buyItem{
	  padding: 40upx;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	}
	.buyItem span{
	  color:#999;
	  font-size:28upx;
	}
	.buyItem h1{
	  font-weight: bold;
	  font-size: 28upx;
	  color:#000;
	}
	.buyBtn{
	  margin-top: 20upx;
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
	  margin-top: 60upx;
	}
	.buyBtn button{
	  cursor: pointer;
	  width: 45%;
	  height: 100upx;
	  text-align: center;
	  line-height: 100upx;
	  border-radius: 10upx;
	  font-size: 32upx;
	  
	}
	.buyBtn .cencelBuy{
	  background-color: #EEEEEE;
	  color: #999999;
	  
	}
	.hdimg{
	width: 50upx;
	    height: 50upx;
	    position: absolute;
	    right: 10upx;
	    top: 10upx;
	}
	.acbuyBtmL{
	    color:#000;
	}
	.mineCardList{
	    margin-bottom: 80upx;
	}
	.topimg{
	width: 50upx;
	    height: 50upx;
	    position: absolute;
	    z-index: 5;
	    right: 2%;
	    top: 20upx;
	}
	.back {
		z-index: 5;
	    position: absolute;
	    left: 12upx;
	    display: block;	    
	    margin: 0px auto;	    
	    top: 16upx;
	    width: 60upx;
	    height: 48upx;
	}
	.back image{
		width: 100%;
		height: 100%;
	}
</style>
