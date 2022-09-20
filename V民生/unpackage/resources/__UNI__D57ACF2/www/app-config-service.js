
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/mine/login","pages/trade/trade","pages/trade/entrust","pages/lever/lever","pages/lever/leverList","pages/lever/orderList","pages/legal/legal","pages/legal/store","pages/legal/storeDetail","pages/legal/transactionRecord","pages/legal/transfer","pages/legal/storeOrder","pages/legal/orderDetail","pages/legal/order","pages/legal/recordlist","pages/legal/finished","pages/mine/register","pages/mine/setPwd","pages/mine/modifyPwd","pages/market/market","pages/market/kline","pages/market/second","pages/home/news","pages/home/newsDetail","pages/home/agreement","pages/mine/forgetPwd","pages/mine/forgetPwdNext","pages/assets/assets","pages/mine/userCenter","pages/mine/authentication","pages/assets/tradeAccount","pages/assets/charge","pages/assets/mention","pages/mine/collect_money","pages/assets/bindMentionAddress","pages/mine/invite","pages/mine/security","pages/mine/resetLegalPwd","pages/mine/modifyPwdNext","pages/mine/real_authentication","pages/mine/about","pages/mine/policy","pages/assets/transfer","pages/assets/transferTolever","pages/assets/transferTomicro","pages/mine/authorization_code","pages/coin/index","pages/coin/coinlog","pages/mine/group","pages/mine/group_log","pages/mine/kefu"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"比特星","navigationBarBackgroundColor":"#102030","backgroundColorTop":"#102030","backgroundTextStyle":"dark"},"tabBar":{"color":"#a2a6a5","selectedColor":"#1881d2","backgroundColor":"#16263E","list":[{"pagePath":"pages/home/home","iconPath":"static/footer/index0.png","selectedIconPath":"static/footer/index1.png","text":"首页"},{"pagePath":"pages/market/market","iconPath":"static/footer/hang0.png","selectedIconPath":"static/footer/hang1.png","text":"行情"},{"pagePath":"pages/trade/trade","iconPath":"static/footer/trade0.png","selectedIconPath":"static/footer/trade1.png","text":"币币"},{"pagePath":"pages/lever/lever","iconPath":"static/footer/gang0.png","selectedIconPath":"static/footer/gang1.png","text":"合约"},{"pagePath":"pages/assets/assets","iconPath":"static/footer/mine0.png","selectedIconPath":"static/footer/mine1.png","text":"资产"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"事在人为","compilerVersion":"2.6.11","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true,"titleNView":false,"bounce":"none","pullToRefresh":{"offset":"75px","style":"circle"}}},{"path":"/pages/mine/login","meta":{},"window":{"navigationBarTitleText":"登录","backgroundColor":"#102030"}},{"path":"/pages/trade/trade","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#102030","enablePullDownRefresh":true,"titleNView":false,"bounce":"none","pullToRefresh":{"offset":"55px","style":"circle"}}},{"path":"/pages/trade/entrust","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/pages/lever/lever","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#102030","enablePullDownRefresh":true,"titleNView":false,"bounce":"none","pullToRefresh":{"offset":"55px","style":"circle"}}},{"path":"/pages/lever/leverList","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#102030","titleNView":false}},{"path":"/pages/lever/orderList","meta":{},"window":{"navigationBarTitleText":"全部委托","backgroundColor":"#102030"}},{"path":"/pages/legal/legal","meta":{},"window":{"navigationBarTitleText":"法币"}},{"path":"/pages/legal/store","meta":{},"window":{"navigationBarTitleText":"我的店铺"}},{"path":"/pages/legal/storeDetail","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#0b53bd"}},{"path":"/pages/legal/transactionRecord","meta":{},"window":{"navigationBarTitleText":"余额日志"}},{"path":"/pages/legal/transfer","meta":{},"window":{"navigationBarTitleText":"划转"}},{"path":"/pages/legal/storeOrder","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#0b53bd","titleNView":false}},{"path":"/pages/legal/orderDetail","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#0b53bd","titleNView":false}},{"path":"/pages/legal/order","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#0b53bd","titleNView":false}},{"path":"/pages/legal/recordlist","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#0b53bd","titleNView":false}},{"path":"/pages/legal/finished","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","backgroundColor":"#0b53bd","titleNView":false}},{"path":"/pages/mine/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/mine/setPwd","meta":{},"window":{"navigationBarTitleText":"设置密码"}},{"path":"/pages/mine/modifyPwd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/market/market","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"行情","enablePullDownRefresh":true}},{"path":"/pages/market/kline","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#102030","navigationBarTextStyle":"black","navigationStyle":"custom","titleNView":false}},{"path":"/pages/market/second","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#102030","navigationBarTextStyle":"black","navigationStyle":"custom","titleNView":false}},{"path":"/pages/home/news","meta":{},"window":{"navigationBarTitleText":"新闻中心"}},{"path":"/pages/home/newsDetail","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/home/agreement","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/mine/forgetPwd","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/mine/forgetPwdNext","meta":{},"window":{"navigationBarTitleText":"重置密码"}},{"path":"/pages/assets/assets","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"资产","titleNView":false}},{"path":"/pages/mine/userCenter","meta":{},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/mine/authentication","meta":{},"window":{"navigationBarTitleText":"身份认证"}},{"path":"/pages/assets/tradeAccount","meta":{},"window":{"navigationBarTitleText":"交易账户","enablePullDownRefresh":true}},{"path":"/pages/assets/charge","meta":{},"window":{"navigationBarTitleText":"充币","enablePullDownRefresh":true}},{"path":"/pages/assets/mention","meta":{},"window":{"navigationBarTitleText":"提币","enablePullDownRefresh":true}},{"path":"/pages/mine/collect_money","meta":{},"window":{"navigationBarTitleText":"收款信息"}},{"path":"/pages/assets/bindMentionAddress","meta":{},"window":{"navigationBarTitleText":"绑定提币地址"}},{"path":"/pages/mine/invite","meta":{},"window":{"navigationBarTitleText":"我的推广码"}},{"path":"/pages/mine/security","meta":{},"window":{"navigationBarTitleText":"安全中心"}},{"path":"/pages/mine/resetLegalPwd","meta":{},"window":{"navigationBarTitleText":"修改交易密码"}},{"path":"/pages/mine/modifyPwdNext","meta":{},"window":{"navigationBarTitleText":"重置密码"}},{"path":"/pages/mine/real_authentication","meta":{},"window":{"navigationBarTitleText":"身份认证"}},{"path":"/pages/mine/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/policy","meta":{},"window":{"navigationBarTitleText":"隐私政策"}},{"path":"/pages/assets/transfer","meta":{},"window":{"navigationBarTitleText":"划转","enablePullDownRefresh":true}},{"path":"/pages/assets/transferTolever","meta":{},"window":{"navigationBarTitleText":"划转","enablePullDownRefresh":true}},{"path":"/pages/assets/transferTomicro","meta":{},"window":{"navigationBarTitleText":"划转","enablePullDownRefresh":true}},{"path":"/pages/mine/authorization_code","meta":{},"window":{"navigationBarTitleText":"授权码","enablePullDownRefresh":true}},{"path":"/pages/coin/index","meta":{},"window":{"navigationBarTitleText":"存币宝","bounce":"vertical","titleNView":{"buttons":[{"text":"历史","fontSize":"12px","color":"#ffffff","width":"auto"}]}}},{"path":"/pages/coin/coinlog","meta":{},"window":{"navigationBarTitleText":"我的存币","enablePullDownRefresh":true}},{"path":"/pages/mine/group","meta":{},"window":{"navigationBarTitleText":"我的团队","enablePullDownRefresh":true}},{"path":"/pages/mine/group_log","meta":{},"window":{"navigationBarTitleText":"资金明细","enablePullDownRefresh":true}},{"path":"/pages/mine/kefu","meta":{},"window":{"navigationBarTitleText":"在线客服","enablePullDownRefresh":true}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
