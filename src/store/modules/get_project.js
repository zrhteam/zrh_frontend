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
    //基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    prj_risk_top: {},
    //基于项目级展示当前未整改高风险隐患图片
    prj_image: [],

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
    //承载基于项目级展示当前未整改高风险隐患图片
    renderPrjImages(state) {
        return state.images;
    },
    //承载基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    renderPrjRiskTop(state) {
        return state.prj_risk_top;
    }

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

    // 得到基于项目级展示当前未整改的高风险隐患列表
    getInitPrjRisk(context) {
        dataService.getInitProjectRisk(state.params, function (response) {
            context.commit('changePrjRiskLevelList', response)
        })
    },

    //得到基于项目级展示当前未整改高风险隐患图片
    getInitProjectImage(context) {
        dataService.getInitProjectImage(state.params, function (response) {
            console.log(response)
            context.commit('changePrjImage', response)
        })
    },

    //得到基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    getInitProjectRiskTop(context) {
        dataService.getInitProjectRiskTop(state.params, function (response) {
            context.commit('changePrjRiskTop', response)
        })
    }


}

//mutations
const mutations = {
    //考虑项目级整改率变化
    changePrjRectification(state, data) {
        state.prj_rectification = data.project_rectification
    },

    // 考虑基于项目级展示历次发现的不同风险等级的隐患数量
    changePrjRiskLevelData(state, data) {
        console.log(data)
        state.prj_risk_data = data
    },

    //考虑基于项目级展示当前未整改的高风险隐患列表
    changePrjRiskLevelList(state, data) {
        state.prj_risk_list = data.note_list
        console.log(data.note_list)
    },

    // 考虑基于项目级展示当前未整改高风险隐患图片
    changePrjImage(state, data) {
        state.images = data.image_list
        console.log(state.images)
        alert("12")
    },

    //考虑基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    changePrjRiskTop(state, data) {
        console.log(data)
        state.prj_risk_top = data
    },


}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}