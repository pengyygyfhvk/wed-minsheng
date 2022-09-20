<template>
	<view>
		<view class="list plr20 pb20 " v-for="(item,index) in list">
			<view class="pt20 mr20">
				<text>时间：</text>
				<text class="pt10">{{item.addTime}}</text>
			</view>
			<view class="pt20">
				<text>配售产品：</text>
				<text class="pt10">{{item.ptitle}}</text>
			</view>
			<view class="pt20">
				<text>配售数量：</text>
				<text class="pt10">{{item.num}}</text>
			</view>
			<view class="pt20">
				<text>配售价格：</text>
				<text class="pt10">{{item.money}}</text>
			</view>
			<view class="pt20">
				<text>状态：</text>
				<text class="pt10 green" v-show="item.isZt == 0">配售中</text>
				<text class="pt10 green" v-show="item.isZt == 1">配售成功</text>
				<text class="pt10 green" v-show="item.isZt == 2">配售失败</text>
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
				  url:"personal/placingLog",
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
