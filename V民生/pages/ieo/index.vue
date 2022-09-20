<template>
	<view :class="{'light':theme=='light'}">
		<view class="list-box">
		   <view class="list" v-for="(item,index) in list" @tap="jumpDetail(item.id)">
				<view class="list-content">
					<view class="list-title">
						<view>{{item.name}}</view>
						<text>{{$t('zdy.sellprice')}} {{item.price}} usdt</text>
					</view>
					<view class="list-btm">
					   <article>
						   <text class="buybutton" v-show="item.is_zt == 1">{{$t('zdy.buyseccess')}}</text>
						   <text class="buybutton" @click="buyieo(item.pid)" v-show="item.is_zt == 200">{{$t('zdy.buyconfirm')}}</text>
						   <text class="buybutton grayback" v-show="item.is_zt == 0">{{$t('zdy.buying')}}</text>
					   </article>
					   <article v-show="item.is_zt == 1">
						   <text class="redColor pt10">尊敬的用户恭喜你中签{{item.name}}新币{{item.zq_num}}枚</text>
					   </article>
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
				 page:1,
				  list:[],
				  isAchiveBottom:true,
				  listBool:true,
			}
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
			this.$utils.setThemeTop(this.theme)
			// this.$utils.setThemeBottom(this.theme)
		},
		onLoad(e) {	
			uni.setNavigationBarTitle({
				title:this.$t('zdy.ieo')
			})
			this.init();
		},
		onPullDownRefresh(){
			this.page=1;
			this.list=[];
			this.init();
		},
		onReachBottom(){
			if(!this.isAchiveBottom)return;
			this.init();
		},
		filters:{
			
		},		
		methods:{
			buyieo(id){
				this.$utils.initDataToken({
					  url:"personal/subscribe",
					  data:{
						proId:id,
					  },
					  type:'post'
				},(res, msg)=>{
					  uni.showToast({
					  	icon: 'none',
					  	title: msg,
					  });
					
				})
			},
			// jumpDetail(id){
			// 	uni.navigateTo({
			// 		url:"/pages/ieo/detail?id="+id
			// 	})
			// },
			init(){
			  let that=this;
			  uni.showLoading();
			  if(that.listBool){
				  that.listBool=false;
			  this.$utils.initDataToken({
				  url:"personal/subscribeList",
				  data:{
					limit:30,
					page:that.page
				  },
				
			  },res=>{
				  console.log(res.data)
				  uni.hideLoading();
				  that.listBool=false;
				  that.page+=1;
				  if(res.data.length){
					that.list=that.list.concat(res.data);
				  }else{
					  that.isAchiveBottom=false;
				  }
			  })
			  }
			  uni.hideLoading();
			},
		}
	}
</script>

<style>
	.list-btm article{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.buybutton{
		display: block;
		color:#fff;
		line-height: 30px;
		background: #9d75fd;
		text-align: center;
		border-radius: 5px;
		padding: 0 10px;
	}
	.list-title text{
		line-height: 60upx;
		word-break:break-all;
		    	display:-webkit-box;
		    	-webkit-line-clamp:2;
		    	-webkit-box-orient:vertical;
		    	overflow:hidden;
	}
	.list-box{
	      margin:  10px 5%;
	      display: flex;
	      flex-direction: row;
	      flex-wrap: wrap;
	      position: relative;
	  }
	  .list-content{
	      padding: 10px 2%;
	  }
	  .list{
	      width: 100%;
		  margin-bottom: 20px;
		  border: 1px solid #8a8989;
		  border-radius: 10px;
		  padding: 10px;
	  }
	 
	  .list-img{
	      width: 100%;
	      height:130px;
	  }
	  .list-img text{
	      position: absolute;
	      top: 5px;
	      right: 0;
	      padding: 5px 10px ;
	      color:#fff;
		  z-index: 5;
	  }
	  .list-img image{
	      width: 100%;
	      height: 100%;
	  }
	  .list-title text{
	      font-size: 12px;
	      color:#999;
	  }
	  .list-title view{
	      font-size: 16px;
	      font-weight: bold;
	  }
	  .list-btm view{
	        display: flex;
	        flex-direction: row;
	        justify-content: space-between;
	        font-size: 12px;
	        color: #333;
	  }
	  .grayback{background: #7a7a7a;color: #bdbbbb;}
</style>
