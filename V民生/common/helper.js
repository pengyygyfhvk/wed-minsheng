import {domain} from './domain.js'
var mainName=domain;
var laravel_api='/api/';
// #ifdef APP-PLUS
laravel_api=domain+'/api/';
// #endif

// console.log(mainName+'aaa');
function checkMobile(phone){
	var reg=/^[1][0-9]{10}$/;
	return reg.test(phone);
}
function checkEmail(emial){
	var reg= /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(emial);
}
function showLayer(con,icon){
	uni.showToast({
		icon: icon ||'none',
		title: con,
		// duration:10000
	});
}
function initHttp(params,callback){
	var url=laravel_api+params.url;
	var mytype=params.type||'GET';
	var data=params.data || {};
	// uni.showLoading({
	// 	title: '加载中',
	// 	mask: true
	// });
	uni.request({
		url,
		method: mytype,
		data,
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
		success: res => {
			// uni.hideLoading();
			var resdata=res.data;
			// console.log(resdata);
			if(resdata.type=='ok'){
			    callback&&callback(resdata,resdata);
			}else if(resdata.type=='999'){
			    uni.navigateTo({
			    	url:'/pages/mine/login'
			    })
			}else{
				// uni.hideLoading();
				showLayer(resdata.message);
				
			}
		},
		fail: (err) => {
			console.log(err)
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
		}
	});
}
function initData(params,callback){
	// var url=laravel_api+params.url;
	var lang=uni.getStorageSync('lang');
	var url = mainName+laravel_api+params.url;
	var mytype=params.type||'GET';
	var data=params.data || {};
	// uni.showLoading({
	// 	title: '加载中',
	// 	mask: true
	// });
	uni.request({
		url,
		method: mytype,
		data,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			'lang':lang
		},
		success: res => {
			// uni.hideLoading();
			var resdata=res.data;
		
			if(resdata.code=='200'){
			
			    callback&&callback(resdata,resdata.msg);
			}else if(resdata.code=='500'){
			    uni.navigateTo({
			    	url:'/pages/mine/login'
			    })
			}else{
				// uni.hideLoading();
			
				showLayer(resdata.msg);
				callback&&callback(resdata,resdata.msg);
			}
		},
		fail: (err) => {
			console.log(err)
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
		}
	});
}

function initDataToken(params,callback){
	var token=uni.getStorageSync('token');
	var lang=uni.getStorageSync('lang');
	var url=mainName+laravel_api+params.url;
	// console.log(token);
	var mytype=params.type||'GET';
	var data=params.data || {};
	uni.showLoading({
		// title: '请求中...'
	});
	uni.request({
		url,
		method: mytype,
		data,
		header: {
			'token':token,
			'lang':lang
		},
		success: res => {
			uni.hideLoading();
			var resdata=res.data;
			
			if(resdata.code==500){
				showLayer(resdata.msg);
				uni.navigateTo({
					url:'/pages/mine/login'
				})
			}else if(resdata.code=='998'){
			    uni.navigateTo({
			    	url:'/pages/mine/real_authentication'
			    })
			}else if(resdata.code=='997'){
			    uni.navigateTo({
			    	url:'/pages/mine/collect_money'
			    })
			}else if(resdata.code=='200'){
			    callback&&callback(resdata,resdata.msg)
			}
			else{
				showLayer(resdata.msg);
				callback&&callback(resdata,resdata.msg);
			}
		},
		fail: () => {
		},
		complete: (err) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
			if(err.statusCode == 500){
				showLayer('服务器出问题了，正在修复，请耐心等待');
			}
			if(err.statusCode == 401){
				uni.showModal({
					title: '',
					content: '暂无交易密码，是否立即设置',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						console.log(res)
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/mine/resetLegalPwd'
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
				
				
			}
			
		}
	});
}
function noshowToken(params,callback){
	var token=uni.getStorageSync('token');
	var url=laravel_api+params.url;
	var mytype=params.type||'GET';
	var data=params.data || {};
	uni.request({
		url,
		method: mytype,
		data,
		header: {
			'Authorization':token
		},
		
		success: res => {
			var resdata=res.data;
			if(resdata.type==999){
				uni.navigateTo({
					url:'/pages/mine/login'
				})
			}else if(resdata.type=='998'){
			    uni.navigateTo({
			    	url:'/pages/mine/real_authentication'
			    })
			}else if(resdata.type=='997'){
			    uni.navigateTo({
			    	url:'/pages/mine/collect_money'
			    })
			}else if(resdata.type=='ok'){
			    callback&&callback(resdata.message,resdata.message)
			}
			else{
				showLayer(resdata.message);
			}
		},
		fail: () => {
		},
		complete: (err) => {
			if(err.statusCode == 500){
				showLayer('服务器出问题了，正在修复，请耐心等待');
			}
		}
	});
}

function getGlobalSettting(params,callback){
	var url=laravel_api+params.url;
	var mytype=params.type||'GET';
	var data=params.data || {};
	
	uni.request({
		url,
		method: mytype,
		data,
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
		success: res => {
			// uni.hideLoading();
			var resdata=res.data;
			console.log(res);
			callback&&callback(resdata);
		},
		fail: (err) => {
			console.log(err)
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 1000);
		}
	});
}
function getAddressOnline(params,callback){
	var token=uni.getStorageSync('token');
	// var lang=uni.getStorageSync('lang');
	var url=domain+'/'+params.url;
	var mytype=params.type||'GET';
	var data=params.data || {};
	console.log(url)
	console.log(data);
	uni.request({
		url,
		method: mytype,
		data,
		header: {
			'content-type':'application/x-www-form-urlencoded'
		},
		success: res => {
			// uni.hideLoading();
			var resdata=res.data;
			// console.log(JSON.stringify(res));
			callback&&callback(resdata);
		},
		fail: (err) => {
			console.log(err)
		},
		complete: () => {
			
		}
	});
}
const addNewAddr=(data)=>{
	var addrList=JSON.parse(uni.getStorageSync('address_list'));
	addrList.push(data);
	uni.setStorageSync('address_list',JSON.stringify(addrList))
}
const getLocalAddrs=(filterName,flag=true)=>{
	var addrList=JSON.parse(uni.getStorageSync('address_list')) ;
	return addrList.filter(item=>{
		return item[filterName]==flag;
	});
}
const accMul=(arg1, arg2) =>{
     var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
     try {
         m += s1.split(".")[1].length;
     }
     catch (e) {
     }
     try {
         m += s2.split(".")[1].length;
     }
     catch (e) {
     }
     return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
 }
 const filterDecimals=(value,number=2)=>{
 	let val=value-0;
 	let num=number-0;
 	let base='1';
 	let decimal=base.padEnd(num+1,0)-0;
	let result=accMul(val,decimal);
 	return (Math.floor(result)/decimal).toFixed(num);
}
 const setThemeTop=(theme)=>{
	 if(theme=='dark'){
	 	uni.setNavigationBarColor({
	 		frontColor:"#ffffff",
	 		backgroundColor:"#102030"
	 	})
	 }else{
	 	uni.setNavigationBarColor({
	 		frontColor:"#000000",
	 		backgroundColor:"#ffffff"
	 	})
	 }
 }
const setThemeBottom=(theme)=>{
 	 if(theme=='dark'){
 	 	uni.setTabBarStyle({
 	 		color: '#a2a6a5',
 	 		selectedColor: '#1881d2',
 	 		backgroundColor: '#16263e',
 	 		borderStyle: 'black'
 	 	})
 	 }else{
 	 	uni.setTabBarStyle({
 	 		color: '#8b97a0',
 	 		selectedColor: '#238ee1',
 	 		backgroundColor: '#ffffff',
 	 		borderStyle: 'black'
 	 	})
 	 }
 }
export default{
	checkMobile,
	checkEmail,
	showLayer,
	initHttp,
	initData,
	initDataToken,
	addNewAddr,
	getLocalAddrs,
	filterDecimals,
	mainName,
	noshowToken,
	getGlobalSettting,
	getAddressOnline,
	accMul,
	setThemeTop,
	setThemeBottom,
}