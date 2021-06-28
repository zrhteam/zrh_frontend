import Vue from 'vue'
import Router from 'vue-router'
import Overview from '../components/Overview.vue'
import LandHeadquartersEHSDataScreen from "../components/LandHeadquartersEHSDataScreen.vue";
import RegionDepartment from "@/components/RegionDepartment.vue";
import PrjEHSDataAnalysis from "@/components/PrjEHSDataAnalysis.vue";
import Analyze from "@/components/Analyze.vue"//对应数据洞察
import NotFound from '../components/NotFound.vue'
import SuperOverview from "@/components/SuperOverview.vue";//对应超级用户登录系统后都独有的首页
import DataCompare from "@/components/DataCompare.vue";//对应数据分析那一块
//由于数据大屏拷贝链接直接展示的功能，为每个数据大屏各开一个链接
import NewHeadScreen from "@/components/NewHeadScreen.vue";
import NewRegionScreen from "@/components/NewRegionScreen.vue";
import NewProjectScreen from "@/components/NewProjectScreen.vue";
import NewCheckScreen from "@/components/NewCheckScreen.vue";
const routerOptions = [
    {path: '/', component: 'Login', meta: {keepAlive: false}},
    {path: '/login', component: 'Login'},
    {path: '/register', component: 'Register'},
    {path: '/overview', component: 'Overview'},
    // {path: '/land_headquarters', component: 'LandHeadquartersEHSDataScreen', meta: {keepAlive: false}},
    {path: '/land_headquarters', component: 'LandHeadquartersEHSDataScreen'},
    {path: '/region_department', component: 'RegionDepartment', meta: {keepAlive: false}},
    {path: '/prj_data_analysis', component: 'PrjEHSDataAnalysis', meta: {keepAlive: false}},
    {path: '/analyze', component: 'Analyze', meta: {keepAlive:false}},
    {path: '/super_overview', component: 'SuperOverview', meta: {keepAlive:false}},
    {path: '/data_compare', component: 'DataCompare', meta: {keepAlive:false}},
    {path: '/new_head_screen/:id', component: 'NewHeadScreen'},
    {path: '/new_region_screen/:id', component: 'NewRegionScreen'},
    {path: '/new_project_screen/:id', component: 'NewProjectScreen'},
    {path: '/new_check_screen/:id', component: 'NewCheckScreen'},
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
        {path: '/', component: 'Login'},
        {path: '/login', component: 'Login'},
        {path: '/particles', component: 'Particles'},
        {path: '/register', component: 'Register'},
        {path: '/overview', component: 'Overview'},
        {path: '/land_headquarters', component: 'LandHeadquartersEHSDataScreen'},
        {path: '/region_department', component: 'RegionDepartment'},
        {path: '/prj_data_analysis', component: 'PrjEHSDataAnalysis'},
        {path: '/analyze', component: 'Analyze'},
        {path: '/super_overview', component: 'SuperOverview'},
        {path: '/data_compare', component: 'DataCompare'},
        {path: '/new_head_screen', component: 'NewHeadScreen'},
        {path: '/new_region_screen', component: 'NewRegionScreen'},
        {path: '/new_project_screen', component: 'NewProjectScreen'},
        {path: '/new_check_screen', component: 'NewCheckScreen'},
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
