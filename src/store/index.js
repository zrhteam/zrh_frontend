// import axios from 'axios'
//
// export default new Vuex.Store({
//     state: {},
//     actions: {
//         // 获取数据列表
//         getLocation(context) {
//             axios.get('http://localhost:5000/api/overview')
//                 .then(({response}) => {
//                     console.log(response)
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })
//         }
//     }
// })
// import Vue from 'vue'
// import Vuex from 'vuex'
import get_analyze from "@/store/modules/get_analyze";
import get_locations from './modules/get_locations'
import get_headquarter from "./modules/get_headquarter";
import get_project from "@/store/modules/get_project";
import get_region from '@/store/modules/get_region';
import get_login from '@/store/modules/get_login'
import get_check from '@/store/modules/get_check'
import get_comparison from '@/store/modules/get_comparison'
import get_screen from '@/store/modules/get_screen'
import get_insight from '@/store/modules/get_insight'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        get_analyze,
        get_locations,
        get_headquarter,
        get_project,
        get_region,
        get_login,
        get_check,
        // get_comparison,
        get_screen,
        // get_insight
    },
    strict: debug
})
