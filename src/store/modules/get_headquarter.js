import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //总部页面初始化时得到一个总部整改率
    rectification: null,
    //隐患高中低风险及其对应的累计隐患数量
    risk_level_data: {},
    data: []
}

//getters
const getters = {
    //承载变化的data
    renderRectification(state) {
        return state.rectification;
    }
}

//actions
const actions = {
    //得到该地理位置的所有信息，包括地图上显示该位置并显示该位置所对应的风险等级
    getInitRectification(context) {
        // dataService.getInitRectification(function (response) {
        //     context.commit('changeRectification', response)
        // })
    },
    getInitRiskLevelData(context) {
        dataService.getInitRiskLevelData(function (response) {
            console.log(response)
            context.commit('', response)
        })
    }
}

//mutations
const mutations = {
    //考虑data如何变化
    changeRectification(state, data) {
        state.rectification = data.rectification_rate
    },
    changeRiskLevelData(state, data) {
        state.rectification = data.rectification_rate
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}