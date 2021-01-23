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
    grant_data: [],
    //针对树形目录准备的
    tree_data: [],
//    存已解析的经纬度 总部到区域的二维数组
    position: []
//
//    针对项目级的position

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
    renderTreeData(state) {
        return state.tree_data;
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
    changeParams(state, data) {
        state.params = data.params
    },
    changePosition(state, data) {
        state.position = data.params
    },
    //考虑权限对应等级所包含的总部、区域、项目和检查
    changeGrantData(state, data) {
        // debugger
        // console.log("change")
        state.grant_data = data
    },
    changeTreeData(state, data) {
        // debugger
        // console.log("change")
        state.tree_data = data.params
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}