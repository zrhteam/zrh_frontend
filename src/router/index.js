import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Home from '../components/Home.vue'
import SearchModule from '../components/SearchModule.vue'
import PieChart from '../components/PieChart.vue'
import Overview from '../components/Overview.vue'
import LandHeadquartersEHSDataScreen from "../components/LandHeadquartersEHSDataScreen.vue";
import NotFound from '../components/NotFound.vue'
//
// const routerOptions = [
//   {
//     path: '/',
//     name: 'home',
//     component: 'Home'
//   },
//   {
//     path: '/about',
//     name: 'about',
//     //component: () => import(/* webpackChunkName: "about" */ '@/views/About')
//     component: 'About'
//    }//,
//   // {
//   //   path: '/home',
//   //   //component: () => import(/* webpackChunkName: "about" */ '../views/About')
//   //   component: HelloWorld
//   // }
// ]
// const router = createRouter({
//   history: createWebHashHistory(),
//   base: process.env.BASE_URL,
//   routes
// })
const routerOptions = [
    {path: '/', component: 'HelloWorld'},
    {path: '/home', component: 'Home'},
    {path: '/search_module', component: 'SearchModule', meta:{requireAuth:true }},
    {path: '/login', component: 'Login'},
    {path: '/particles', component: 'Particles'},
    {path: '/register', component: 'Register'},
    {path: '/pie_chart', component: 'PieChart'},
    {path: '/overview', component: 'Overview'},
    {path: '/land_headquarters', component: 'LandHeadquartersEHSDataScreen'},
    {path: '*', component: 'NotFound'}
]
const routes = routerOptions.map(route => {
    return {
        ...route,
        component: () => import(`@/components/${route.component}.vue`)
    }
})
const router = new Router({
    rous: [
        {path: '/', component: 'HelloWorld'},
        {path: '/home', component: 'Home'},
        {path: '/search_module', component: 'SearchModule', meta:{requireAuth:true }},//true为这个页面需要登录权限
        {path: '/login', component: 'Login'},
        {path: '/particles', component: 'Particles'},
        {path: '/register', component: 'Register'},
        {path: '/pie_chart', component: 'PieChart'},
        {path: '/overview', component: 'Overview'},
        {path: '/land_headquarters', component: 'LandHeadquartersEHSDataScreen'},
        {path: '*', component: 'NotFound'}
    ]
})
Vue.use(Router)
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (router.app.$cookies.get("username") === "") {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 把要跳转的地址作为参数传到下一步
            })
        } else {
            next()
        }
    } else {
        if (to.query && to.query.redirect) {
            if (router.app.$cookies.get("username") !== "") {
                next({path: to.query.redirect})
            } else {
                next()
            }
        } else {
            next() // 确保一定要调用 next()
        }
    }
})
export default new Router({
    routes,//: [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import(/* webpackChunkName: "about" */ '@/views/SearchModule.vue')
//     //component: About
//    }//,
// ],
    mode: 'history',
    base: process.env.BASE_URL
})
