import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import cookies from 'vue-cookies'
import 'leaflet/dist/leaflet.css'
// import './js/leaflet/dist/leaflet.css'
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet/dist/leaflet'
// import * as L from './js/leaflet/dist/leaflet'
import './js/leaflet.pm/dist/leaflet.pm.min.js'
import './js/leaflet.pm/dist/leaflet.pm.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import http from 'vuetest/api'

Vue.config.productionTip = false
Vue.L = Vue.prototype.$L = L;

/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

//Vue.use(VueAxios, axios)
//Vue.prototype.$http = http;   // 添加原型方法，这样创建的对象就自带该方法了。
//vue.prototype.$cookies = cookies;
Vue.use(cookies)
Vue.use(ElementUI)
Vue.use(Vuex)
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount("#app");

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
    // components: {
    //     App
    // }
})
