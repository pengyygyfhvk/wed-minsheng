<template>
	<view v-if="show">
		<view class="uni-mask" :style="{ top: offsetTop + 'px' }" @click="hide"></view>
		<!-- <view class="uni-mask" @click="hide"></view> -->
		<view :class="type == 'middle' ? 'flex jscenter alcenter contents' : ''">
			<view :class="['uni-popup', { bgWhite: bgColor, bgBlack: !bgColor }, 'uni-popup-' + type]">
				<view class="title">{{ msg }}</view>
				<slot></slot>
				<view v-if="btnShow" class="mt20 uni-popup-bottoms">
					<view class="uni-popup-bottom1 flex jscenter alcenter">
						<view class="cannel flex1" @tap="hide">{{transwords[lang].cancel}}</view>
						<view class="comfirms flex1" @tap="comfirms">{{transwords[lang].confrim}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			//top - 顶部， middle - 居中, bottom - 底部
			default: 'middle'
		},
		msg: {
			type: String,
			default: ''
		},
		btnShow: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type: Boolean,
			default: true
		},
		lang:{
			type: String,
			default: 'hk'
		}
	},
	data() {
		let offsetTop = 0;
		//#ifdef H5
		offsetTop = 44;
		//#endif
		return {
			offsetTop: offsetTop,
			transwords: {
				zh: {
					cancel: '取消',
					confrim: '确定',
				},
				en: {
					cancel: 'cancel',
					confrim: 'confirm',
				},
				hk: {
					cancel: '取消',
					confrim: '確定',
				},
				jp: {
					cancel: 'キャンセル',
					confrim: 'を選択します',
				}
			},
			translatedInfo: {
				cancel: '取消',
				confrim: '确定',
			},
		};
	},
	created() {
		var that=this;
		//#ifdef APP-PLUS
		that.lang = plus.storage.getItem('lang') ||'en' ;
		//#endif
		// #ifdef H5
		that.lang= uni.getStorageSync('lang')||'en'
		// #endif
		// that.lang = localStorage.getItem('lang') || 'zh';
		console.log(that.lang);
		
	},
	mounted() {
		console.log(uni.getStorageSync('lang'));
		//#ifdef APP-PLUS
		this.lang = plus.storage.getItem('lang') ||'en' ;
		//#endif
		// #ifdef H5
		this.lang= uni.getStorageSync('lang')||'en';
		// #endif
		this.translatedInfo = this.transwords[this.lang];
	},
	methods: {
		hide: function() {
			this.$emit('hidePopup');
		},
		comfirms: function() {
			this.$emit('comfirmPopup');
		},
		moveHandle() {}
	}
};
</script>
<style>
	.contents{
		width: 100.0vw;
		height: 100.0vh;
		overflow: hidden;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 997;
	}
.uni-mask {
	position: fixed;
	z-index: 996;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.6);
	height: 100vh;
	overflow: hidden;
}

.uni-popup {
	position: absolute;
	z-index:997;
	color: #333;
	box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
}

.uni-popup-middle {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 86%;
	border-radius: 10upx;
	/* justify-content: center; */
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
}

.uni-popup-top {
	top: 0;
	left: 0;
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	text-align: center;
}
.uni-popup-bottom {
	left: 0;
	bottom: -50px;
	width: 100%;
	min-height: 100upx;
	line-height: 100upx;
	text-align: center;
}
.uni-popup-bottoms {
	left: 0;
	bottom: 0;
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	
}
.uni-popup-bottom1 {
	left: 0;
	bottom: 0;
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	/* margin-top:30upx; */
	border-top: 1px solid #d0d0d0;
}
.cannel {
	background-color: #f2f2f2;
	font-size: 28upx;
	height: 80upx;
	line-height: 80upx;
	color: #333;
	border-bottom-left-radius: 10upx;
	border-right: 1px solid #d0d0d0;
}
.comfirms {
	background-color: #f2f2f2;
	color: #40affe;
	font-size: 28upx;
	height: 80upx;
	line-height: 80upx;
	border-bottom-right-radius: 10upx;
}
.title {
	color: #333;
	line-height: 100upx;
	font-size: 16px;
}
</style>
