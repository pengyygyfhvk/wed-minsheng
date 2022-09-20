import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import jp from './jp'
import hk from './hk'
import kor from './kor'
let locale=uni.getStorageSync('lang') || '';
if(locale==''){
	locale='zh';
	uni.setStorageSync('lang',locale)
	uni.setStorageSync('locale',locale)
}
const i18n=new VueI18n({
	locale:locale,
	messages:{
		zh: zh,
		en: en,
		jp:jp,
		hk:hk,
		kor:kor
	}
})
export default i18n