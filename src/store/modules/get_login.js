import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //登录时保存用户名
    user_name: '',
    // //密码
    // password: null,
    //权限对应等级所包含的总部、区域、项目和检查
    grant_data: [],
    //针对树形目录准备的
    tree_data: [],
//    存已解析的经纬度 总部到区域的二维数组
    position: [],
//
//    针对项目级的position

    now_node: -1,
    expandedKeys: [],
//    查询该用户下的授权数据
    grant_info: {},
//    查询需发送用户名
    param_name: {}

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
    },
//    查询该用户下的授权数据
    getGrantInfo(context) {
        dataService.getGrantInfo(state.param_name, function (response) {
            context.commit('changeGrantInfo', response)
        })
    }
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //登录时保存用户名
    changeUserName(state, data) {
        state.user_name = data.data
    },
    changePosition(state, data) {
        state.position = data.params
    },
    //考虑权限对应等级所包含的总部、区域、项目和检查
    changeGrantData(state, data) {
        state.grant_data = data
    },
    changeTreeData(state, data) {
        state.tree_data = data.params
    },
    changeNowNode(state, data) {
        // debugger
        // console.log("change")
        state.now_node = data.params
    },
    changeExpandedKeys(state, data) {
        state.expandedKeys = data.params
    },
//    查询该用户下的授权数据
    changeGrantInfo(state, data) {
        state.grant_info = data
    },
//    查询需发送用户名
    changeNameParam(state, data) {
        state.param_name = data.params
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}