import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //总部整改率
    rectification: null,
    //隐患高中低风险及其对应的累计隐患数量
    risk_level_data: {},
    //得到所有项目中出现隐患数量排名前10的隐患
    hidden_danger: {},




    data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的总部整改率
    renderRectification(state) {
        return state.rectification;
    },
    //承载变化的隐患高中低风险及其对应的累计隐患数量
    renderRiskLevelData(state) {
        return state.risk_level_data;
    },
    //承载变化的所有项目中出现隐患数量排名前10的隐患
    renderNumberTop(state) {
        return state.hidden_danger;
    }

}

//actions
const actions = {
    //得到总部整改率
    getInitRectification(context) {
        dataService.getInitRectification(state.params, function (response) {
            context.commit('changeRectification', response)
        })
    },

    //得到隐患风险等级高、中、低风险及其对应的累计隐患数量
    getInitRiskLevelData(context) {
        dataService.getInitRiskLevelData(state.params, function (response) {
            console.log(response)
            context.commit('changeRiskLevelData', response)
        })
    },

    //得到所有项目中出现隐患数量排名前10的隐患
    getInitNumberTop(context) {
        dataService.getInitNumberTop(function (response) {
            context.commit('changeNumberTop', response)
        })
    }


}

//mutations
const mutations = {
    //考虑总部整改率变化
    changeRectification(state, data) {
        state.rectification = data.rectification_rate
    },

    // 考虑累计隐患数量变化
    changeRiskLevelData(state, data) {
        state.risk_level_data = data
    },

    //考虑所有项目中出现隐患数量排名前10的隐患变化
    changeNumberTop(state, data) {
        state.hidden_danger = data
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}