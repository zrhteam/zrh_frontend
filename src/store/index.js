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
import Vue from 'vue'
import Vuex from 'vuex'
import get_locations from './modules/get_locations'
import get_headquarter from "./modules/get_headquarter";
import get_project from "@/store/modules/get_project";
import get_region from '@/store/modules/get_region';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        get_locations,
        get_headquarter,
        get_project,
        get_region
    },
    strict: debug
})