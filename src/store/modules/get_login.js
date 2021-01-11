import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    // //用户名
    // username: '',
    // //密码
    // password: null,
    //权限对应等级所包含的总部、区域、项目和检查
    grant_data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的权限对应等级所包含的总部、区域、项目和检查
    renderGrantData(state) {
        return state.grant_data;
    },
}

//actions
const actions = {
    //得到权限对应等级所包含的总部、区域、项目和检查
    getLoginGrant(context) {
        dataService.getLoginGrant(state.params, function (response) {
            context.commit('changeGrantData', response)
        })
    }
}

//mutations
const mutations = {
    //考虑权限对应等级所包含的总部、区域、项目和检查
    changeGrantData(state, data) {
        // debugger
        console.log("change")
        state.grant_data = data
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}