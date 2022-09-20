<template>
	<view>
		<view class="list plr20 pb20 " v-for="(item,index) in list">
			<view class="pt20 mr20">
				<text>时间：</text>
				<text class="pt10">{{item.addTime}}</text>
			</view>
			<view class="pt20">
				<text>申购产品：</text>
				<text class="pt10">{{item.ptitle}}</text>
			</view>
			<view class="pt20" v-show="item.isZt == 1">
				<text>中签数量：</text>
				<text class="pt10">{{item.zqNum}}</text>
			</view>
			<view class="pt20">
				<text>状态：</text>
				<text class="pt10 green" v-show="item.isZt == 0">认购中</text>
				<text class="pt10 green" v-show="item.isZt == 1">认购成功</text>
				<text class="pt10 green" v-show="item.isZt == 2">认购失败</text>
				<text class="pt10 green" v-show="item.isZt == 3">购买成功</text>
				<text class="buysure fr" v-show="item.isZt == 1" @click="buy(item.id)">确认购买</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				list:[],
				isAchiveBottom:true,
				listBool:true,
			}
		},
		onLoad(e) {
			
			this.init();
		},
		methods: {
			buy(id){
				console.log(id+'id')
				this.$utils.initDataToken({
					  url:"personal/subscribePay",
					  data:{
						id:id,
					  },
					  type:'post'
				},(res, msg)=>{
					  uni.showToast({
					  	icon: 'none',
					  	title: msg,
					  });
					  this.init();
					
				})
			},
			init(){
			  let that=this;
			  uni.showLoading();
			  if(that.listBool){
				  that.listBool=false;
			  this.$utils.initDataToken({
				  url:"personal/subscribeLog",
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
	.list{border-bottom: 0.026666rem solid #000;}
	.buysure{padding: 10upx 20upx;
    background: #9d75fd;
    border-radius: 10upx;margin-top:-10upx;}
</style>
