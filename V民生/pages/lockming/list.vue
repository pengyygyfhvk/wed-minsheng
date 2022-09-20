<template>
	<view class="blue" :class="{'light':theme=='light'}">
		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="listitem">
			   <text>{{$t('zdy.a17')}}</text>
			   <label>{{item.id}}</label>
			</view>

			<view class="listitem">
			   <text>{{$t('zdy.a31')}}</text>
			   <label>{{item.money}}</label>
			</view>
			<view class="listitem">
			   <text>{{$t('zdy.a32')}}</text>
			   <label>{{item.lilv * item.money * item.daynum}}</label>
			</view>
			<view class="listitem">
			   <text>{{$t('zdy.scsj')}}</text>
			   <label>{{item.startTime}}</label>
			</view>
			<view class="listitem">
			   <text>{{$t('zdy.a20')}}</text>
			   <label>{{item.endTime}}</label>
			</view>
			<view class="listitem">
			   <text>{{$t('zdy.zt')}}</text>
			   <label style="color:#4caf50" v-if="item.status==1">{{$t('zdy.jxz')}}</label>
			   <label style="color:#f44336" v-if="item.status==2">{{$t('zdy.ydq')}}</label>
			   <label style="color:#f44336" v-if="item.status==3">{{$t('zdy.sqsh')}}</label>
			   <label style="color:#f44336" v-if="item.status==4">{{$t('zdy.ysh')}}</label>
			</view>
			<view class="listitembtn" v-if="item.status==1">
			   <label v-if="item.status==1" style="background: rgb(255, 0, 0);color: rgb(255, 255, 255);width: 100%;display: block;text-align: center;padding: 7px 0;cursor: pointer;" @click="cancelOrder(item,index)">{{$t('zdy.a21')}}</label>
			</view>
		</view>
		<view class="loadingdata" @click="init()">{{listMore}}</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				list:[],
				listIndex:0,
				limit:10,
				page:1,
				  more:"",
				  bool:false,
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
			uni.setNavigationBarTitle({
				title:this.$t('zdy.sclb')
			})
		},
		filters:{
			toFixeds: function (value) {
				value = Number(value);
				return value.toFixed(2);
			},
			toFixeds1: function (value) {
				value = Number(value);
				return value.toFixed(8);
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
			 init(){
			  let that=this;
			  uni.showLoading();
				this.$utils.initDataToken({
					url:"yuebao/yuebaobuylist"
				},function(res){
					uni.hideLoading();
					let list=res.data;
					if(list.length){
						that.list = that.list.concat(list);
					}else{
						that.bool=false;
						that.more =$t('zdy.nomore'); 
					}
				})
			},
			 cancelOrder(item,index){
				   this.listIndex=index;
				   let that = this;
				   uni.showModal({
				       // title:that.$t('zdy.tips'),
				       content: that.$t('zdy.qdqx'),
					   cancelText: that.$t("trade.cancel"), // 取消按钮的文字  
					   confirmText: that.$t("login.e_confrim"), // 确认按钮文字  
				       success: res=> {
				           if (res.confirm) {
				               that.$utils.initDataToken({
				               	 url: "yuebao/cancel",
				               	type: "post",
				               	data:{
				               		id: item.id
				               	}
				               },res=>{				                  
								    that.$utils.showLayer(res);
									that.list[that.listIndex]['status']=3;
				               })
				           }
				       }
				   });
				 
				},
			loadingmore(){
				if(this.bool){
					this.init();
				}
			}
		},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>

<style>
	.more{
	      margin-top: 10px;
	      text-align: center;
	  }
	.list{
	      background: #fff;
	      color:#000;
	      margin-bottom: 40upx;
	      padding:40upx;
	  }
	  .listitem{
	      display: flex;
	      flex-direction: row;
	      justify-content: space-between;
	      margin-bottom: 20upx;
	  }
	  .listitem text{
	      color:#999;
	  }
	  .confirmCancel{
	      color:#000;
	  }
	  .loadingdata{
	      margin:40upx 0;
	      text-align: center;
	  }

</style>
