<template>
	<view class="page-wrap">
		<view class="header">
			<view class="header-bg" style="position: relative;">
				<!-- #ifdef APP-PLUS || H5 -->
				<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
				<view class="uni-flex rank uni-row" style="justify-content: center; flex: 1;">
					<view class="rank-btn pingfangmedium">
						rating
					</view>
				</view>
				<!-- <view class="uni-flex" style="position: relative; top: -132rpx;  flex: 1; justify-content: center;">
					<view class="uni-flex" style="width: 350rpx; height: 28rpx; background: #2C73F6;position: relative;z-index: 2;"></view>
				</view>
				<view class="uni-flex" style="position: relative; top: -132rpx;  flex: 1; justify-content: center;">
					<view class="uni-flex" style="width: 350rpx; height: 28rpx; background: #3077FF;"></view>
				</view> -->
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	var axisLineColor = [
		[1, '#80B8FF ']
	]
	export default {
		data() {
			return {
				fenshus: 100,
				option: {
					series: [{
							title: {
								offsetCenter: ['0', '-60%'],
								fontSize: 18,
								color: "#1881d2",
								show: true
							},

							name: '信用评分',
							type: 'gauge',
							startAngle: 210,
							endAngle: -30,
							splitNumber: 10, //刻度数量
							min: 0,
							max: 1000,
							radius: '70%', //图表尺寸
							center: ['50%', '50%'],
							z: 3,
							axisLine: {
								show: true,
								lineStyle: {
									width: 0,
									shadowBlur: 0,
									color: axisLineColor
								}
							},
							axisTick: {
								show: true,
								lineStyle: {
									color: 'auto',
									width: 2
								},
								length: 6,
								splitNumber: 5
							},
							splitLine: {
								show: true,
								length: 0,
								lineStyle: {
									color: 'auto',
								}
							},
							axisLabel: {
								show: false
							},
							pointer: { //仪表盘指针
								//show: 0,
								length: '70%',
								width: 0
							},
							detail: {
								// borderColor: '#fff',
								// shadowColor: '#fff', //默认透明
								shadowBlur: 0,
								// #ifdef APP-PLUS
								offsetCenter: [0, '-5%'], // x, y，单位px
								// #endif 
								// #ifndef APP-PLUS
								offsetCenter: [0, '0%'], // x, y，单位px
								// #endif 
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE 
									color: '#1881d2',
									fontSize: 60,
								},
								formatter: '{value}'
								// formatter: function(value) {
								// 	return "AAA"
								// },
							},
							data: [{
								value: this.fenshus ? this.fenshus : 100,
								name: this.$t('home.xinping')
							}]
						},
						{ // 外圆
							type: 'pie',
							radius: '88%',
							center: ['50%', '50%'],
							z: 1,
							itemStyle: {
								normal: {
									color: '#1881d2',
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
							},
							hoverAnimation: false,
							label: {
								show: false,
							},
							tooltip: {
								show: false
							},
							data: [{
								value: 100,
								itemStyle: {
									normal: {
										color: '#0b1622'
									},
									emphasis: {
										color: '#0b1622'
									}
								}
							}],
						},
						{ //内圆
							type: 'pie',
							radius: '80%',
							center: ['50%', '50%'],
							z: 2,
							itemStyle: {
								normal: {
									color: '#0b1622',
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
							},
							hoverAnimation: false,
							label: {
								show: false,
							},
							tooltip: {
								show: false
							},
							data: [{
								value: 100,
								itemStyle: {
									normal: {
										color: '#0b1622'
									},
									emphasis: {
										color: '#0b1622'
									}
								}
							}]
						}
					]
				},
			}
		},

		components: {},

		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('home').xinping
			})
			this.getUserInfo();
			
		},
		methods: {
			getUserInfo() {
				var that = this;
				this.$utils.initDataToken({ url: 'member/getUserInfo', data: {}, type: 'get' }, (res, msg) => {
					uni.stopPullDownRefresh();
					
					that.fenshus = res.data.score;
					that.init();
				});
			},
			init() {
				let percentage = 0;
				console.log(this.fenshus)
				this.option.series[0].data[0].value = this.fenshus ? Number(this.fenshus) : 0;
				percentage = (this.fenshus / 100).toFixed(2);
				this.option.series[0].axisLine.lineStyle.color = [
					[percentage, '#1881d2'],
					[1, '#0b1622']
				]
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				if (document.getElementById('echarts')) {
					myChart = echarts.init(document.getElementById('echarts'))
				}
				// 观测更新的数据在 view 层可以直接访问到
				if (myChart) {
					myChart.setOption(this.option)
				}
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				if (myChart) {
					myChart.setOption(newValue)
				}
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				// ownerInstance.callMethod('onViewClick', {
				// 	test: 'test'
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>

	.page-wrap {
		padding-bottom: 1rpx;
		
		.header {
			position: relative;

			.header-bg {
				/* #ifdef APP-PLUS */
				padding-top: var(--status-bar-height);
				/* #endif */
				height: 642rpx;
				// background: url(../../static/header.png) left top no-repeat;
				background-size: 100% 100%;
			}
		}
	}

	.btn-margin-top {
		/* #ifdef APP-PLUS */
		margin-top: - 176rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		margin-top: calc(var(--status-bar-height) - 176rpx);
		/* #endif */
	}

	.rank {
		position: absolute;

		width: 100%;
		/* #ifdef APP-PLUS */
		bottom: calc(278rpx - var(--status-bar-height));
		/* #endif */
		/* #ifndef APP-PLUS */
		bottom: 280rpx;
		/* #endif */
		line-height: 1;
		z-index: 2;
	}

	.rank-btn {
		padding: 8rpx 16rpx;
		font-size: 24rpx;
		color: #C9DBFF;
		border-top-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		background: #0b1622;
	}

	/**
	 * 仪表盘样式
	 * ======================================
	 */

	.btn {
		position: relative;
		width: 300rpx;
		height: 72rpx;
		color: #0b1622;
		font-size: 28rpx;
		border-radius: 10rpx;
		line-height: 72rpx;
		text-align: center;
		border: #0b1622 2rpx solid;
		background: #FFFFFF;
		z-index: 10;
	}

	.btn-margin-top {
		/* #ifdef APP-PLUS */
		margin-top: - 176rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		margin-top: calc(var(--status-bar-height) - 176rpx);
		/* #endif */
	}

	.charts {
		width: 702rpx;
		height: 300rpx;
	}

	.echarts {
		width: 100%;
		height: 520rpx;
		position: relative;
		z-index: 1;
	}

	.uni-flex {
		display: flex;
		flex-direction: row;
	}

	.uni-flex-item {
		flex: 1;
	}

	.uni-row {
		flex-direction: row;
	}

	.uni-column {
		flex-direction: column;
	}

	.leo-align-items-center {
		align-items: center;
	}

	.leo-space-between {
		justify-content: space-between;
	}
</style>
