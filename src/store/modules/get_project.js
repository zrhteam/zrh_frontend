import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //基于项目级展示当前整改率
    prj_rectification: {},
    //基于项目级展示历次发现的不同风险等级的隐患数量
    prj_risk_data: {},
    //基于项目级展示当前未整改的高风险隐患列表
    prj_risk_list: {},


    data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的项目级整改率
    renderPrjRectification(state) {
        return state.prj_rectification;
    },
    //承载变化的基于项目级展示历次发现的不同风险等级的隐患数量
    renderPrjRiskLevelData(state) {
        return state.prj_risk_data;
    },
    //承载变化的基于项目级展示当前未整改的高风险隐患列表
    renderProjectRiskList(state) {
        return state.prj_risk_list;
    },
    // //承载变化的未整改高风险图片
    // renderImages(state) {
    //     return state.images;
    // },
    // //承载变化的所有项目中出现隐患数量排名前10的隐患
    // renderNumberTop(state) {
    //     return state.hidden_danger;
    // }

}

//actions
const actions = {
    //得到项目级整改率
    getInitProjectRectification(context) {
        dataService.getInitProjectRectification(state.params, function (response) {
            context.commit('changePrjRectification', response)
        })
    },

    //得到基于项目级展示历次发现的不同风险等级的隐患数量
    getInitProjectRiskNumber(context) {
        dataService.getInitProjectRiskNumber(state.params, function (response) {
            context.commit('changePrjRiskLevelData', response)
        })
    },

    //得到基于项目级展示当前未整改的高风险隐患列表
    // getInitPrjRisk(context) {
    //     dataService.getInitProjectRisk(state.params, function (response) {
    //         context.commit('changePrjRiskLevelList', response)
    //     })
    // },
    //
    //
    // //得到未整改高风险图片
    // getInitImage(context) {
    //     dataService.getInitImage(state.params, function (response) {
    //         console.log(response)
    //         context.commit('changeImage', response)
    //     })
    // },
    //
    // //得到所有项目中出现隐患数量排名前10的隐患
    // getInitNumberTop(context) {
    //     dataService.getInitNumberTop(state.params, function (response) {
    //         context.commit('changeNumberTop', response)
    //     })
    // }


}

//mutations
const mutations = {
    //考虑项目级整改率变化
    changePrjRectification(state, data) {
        state.prj_rectification = data.project_rectification
    },

    // 考虑基于项目级展示历次发现的不同风险等级的隐患数量
    changePrjRiskLevelData(state, data) {
        debugger
        console.log(data)
        state.prj_risk_data = data
    },
    //
    // //考虑所有项目中出现隐患数量排名前10的隐患变化
    // changeNumberTop(state, data) {
    //     state.hidden_danger = data
    // },
    //
    // //考虑所有项目中出现隐患数量排名前10的隐患变化
    // changeImage(state, data) {
    //     state.images = data
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}