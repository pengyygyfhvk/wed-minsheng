<template>
	<view class="plr15">
		<view class="detaillist pt10">
		<view class="detailname fl">
				{{$t('trade.goods')}}
			</view>
			<view class="detailcont fr">
				{{res.ptitle}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.done')}}
			</view>
			<view class="detailcont fr">
				{{res.buyprice}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.jiesuan')}}
			</view>
			<view class="detailcont fr">
				{{res.sellprice}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.shouxu')}}
			</view>
			<view class="detailcont fr">
				{{res.sxFee}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.yingkui')}}
			</view>
			<view class="detailcont fr redColor">
				{{res.ploss}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.donetime')}}
			</view>
			<view class="detailcont fr">
				{{res.buytime}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.jietime')}}
			</view>
			<view class="detailcont fr">
				{{res.selltime}}
			</view>
			<view class="cl"></view>
		</view>
		<view class="detaillist pt10">
			<view class="detailname fl">
				{{$t('trade.ping')}}
			</view>
			<view class="detailcont fr">
				{{$t('trade.zi')}}
		 	</view>
			<view class="cl"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res:{}
			};
		},
		onLoad(e) {
			console.log(e)
			this.getdata(e.oid);
			uni.setNavigationBarTitle({
				title: this.$t('trade').tradehistory
			});
		},
		methods:{
			getdata(oid){
				// let that = this;
				this.$utils.initDataToken({ url: 'position/detail',data:{oid:oid},type:'post' }, res => {
					this.res = res.data;
					console.log(this.res);
					// this.entrustList()
				});
			}
		}
	}
</script>

<style>
	.detaillist{border: none;
    
    padding: 0px;
    height: 100upx;
    line-height: 100upx;
    margin-bottom: 1px;
    color: rgb(200, 200, 200);
    border-bottom: 1px solid rgb(38, 40, 52) !important;}
	.detailname{line-height: 100upx;font-size: 14px!important;}
	.detailcont{line-height: 100upx;font-size: 14px!important;}
</style>
