<template>
	<view class="plr10 ptb10" :class="{'light':theme=='light'}" style="position: relative;">
		<view v-for="(item,i) in list" :key="i" class=" plr8 ptb10" @click="viewdetail(item.comment)">
			<view class="ft12 ellipsis newtitle fl">{{item.title}}</view>
			<view class="ft12 redColor tr fr">{{item.addTime}}</view>
			<view class="cl"></view>
		</view>
		<view class="mask" v-if="news"></view>
		<view class="newscont" v-if="news">
			<view v-html="news" class="news plr8 ptb10"></view>
			<view class="close" @click="close">{{$t('news.close')}}</view>
		</view>
		<view v-if="show" class="tc mtb20 blue4 ft12">{{more}}</view>
		<!-- <uni-load-more :loadingType="status"></uni-load-more> -->
	</view>
</template>

<script>
	import uniLoadMore from "../../components/uni-load-more.vue"
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				list:[],
				page:1,
				more:this.$t('home').up,
				show:true,
				news:''
			}
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('home').news
			})
			this.getList();
		},
		computed:{
		   ...mapState(['theme']),
		},
		onShow() {
		    this.$utils.setThemeTop(this.theme)
		},
		methods: {
			getList() {
				var that = this;
				uni.showLoading();
				this.$utils.initDataToken({url:'personal/stationNews',data:{page:this.page,'c_id':88},type:'post'},(res,msg)=>{
					uni.hideLoading();
					if(that.page == 1){
						if(res.data.length<=res.count){
							that.show = false;
						}
					}
					that.list = that.list.concat(res.data);
					if(res.data.length>0){
						that.more = that.$t('home').up;
						that.show = true;
					}else{
						that.more = that.$t('home').nomore
					}
				})
			},
			viewdetail(comment){
				var that = this;
				// uni.showLoading();
				
				this.news = comment;
				
			},
			close(){
				this.news = '';
			}
		},
		onReachBottom() {
			this.status = 'loading'
			this.page ++;
			this.getList();
		}
	}
</script>

<style>
	.mask{position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);}
	.newscont{position: fixed;border-radius:10upx;top:50%;left:50%;background:#fff; width: 90%;transform: translate(-50%,-50%);}
	.news{min-height: 200upx;max-height: 1000upx;color:#333;line-height: 60upx;overflow-y: auto;padding-bottom: 60upx;}
	.close{color: #000;
    text-align: center;
    background: #ddd;
    height: 60upx;
    line-height: 60upx;position: fixed;bottom: 0;width: 100%;}
	.newtitle{width: 75%;}
</style>
