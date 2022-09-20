import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		theme:''
	},
	mutations:{
		addTheme (state,theme) {
		    state.theme = theme;
			uni.setStorageSync('theme',theme)
		},
	},
	actions:{//类似vue的methods
	    changeTheme(context,theme){//接收一个与store实例具有相同方法的属性的context对象
			console.log(theme)
	        context.commit("addTheme",theme);
	    }
	}
})