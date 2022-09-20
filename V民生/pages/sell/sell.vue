<template>
	<view :class="{'light':theme=='light'}">
		<view class="list-box">
		   <view class="list" v-for="(item,index) in list" @tap="jumpDetail(item.id)">
				<view class="list-content" v-if="item.is_rg == 1">
					<view class="list-title">
						<view>{{item.name}}</view>
					</view>
					<view class="list-btm pt10">
						<view>
							<text>配售数量：</text>
							<input type="number" class="numinput" v-model="num" @input="buynum($event,item.price)"/>
						</view>
						<view>
							<text>配售价格 {{item.price}} usdt</text>
						</view>
						<view>
							<text>配售价格：{{amount}}</text>
							<input type="number" />
						</view>
					   <view class="pt10">
						   <text class="buybutton" @click="buyieo(item.pid)">确认配售</text>
					   </view>
					  
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
				  amount:0,
				  num:0
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
			buynum: function (event,price) {
				console.log(event)
				
				this.num = event.detail.value;
				this.amount = this.num * price;
					console.log(this.num)
				
				
			},
			buyieo(id){
				if(!this.num){
					return uni.showToast({
						icon: 'none',
						title: '请输入配售数量',
					});
				}
				this.$utils.initDataToken({
					  url:"personal/placing",
					  data:{
						proId:id,
						num:this.num
					  },
					  type:'post'
				},(res, msg)=>{
					  uni.showToast({
					  	icon: 'none',
					  	title: msg,
					  });
					  this.num = 0;
					  this.amount = 0;
					
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
				  url:"personal/placingList",
				 
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
	        font-size: 14px;
	        color: #fff;
			line-height: 60upx;
	  }
	  .grayback{background: #7a7a7a;color: #bdbbbb;}
	  .numinput{border: 1px solid #15bbb9;padding: 10upx;border-radius: 10upx;height: 60upx;}
</style>
