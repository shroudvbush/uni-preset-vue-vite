import {
	createSSRApp
} from "vue";
import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);
	
	// 全局配置
	uni.setNavigationBarColor({
		frontColor: '#000000',
		backgroundColor: '#FFFFFF'
	});
	
	return {
		app,
	};
}
