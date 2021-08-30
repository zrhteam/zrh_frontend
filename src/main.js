// import Vue from 'vue'
// import echarts from 'echarts'
// import echartsGL from 'echarts-gl'
// import 'es6-promise/auto'
// import Vuex from 'vuex'
// import promise from 'es6-promise';
// promise.polyfill();
// import 'babel-polyfill';
import 'default-passive-events'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueCookies from 'vue-cookies'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import Navigation from 'vue-navigation' 看到一个前进刷新，后退不刷新依赖可以考虑
import base from './base'//引用

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
// Vue.L = Vue.prototype.$L = L;
Vue.prototype.$echarts = echarts;
// Vue.prototype.$echartsGL = echartsGL;
Vue.use(base);//将全局函数当做插件来进行注册

// Vue.use(VueCookies)
// Vue.use(ElementUI)
// Vue.use(echarts)
// Vue.use(echartsGL)
Vue.use(Vuex)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
