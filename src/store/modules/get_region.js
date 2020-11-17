import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //已检查项目
    examine_number: null,
    //隐患高中低风险及其对应的累计隐患数量
    risk_level_data: {},
    //当前未整改隐患列表
    no_rectification_risk: {},
    //未整改高风险图片
    images: {},
    //得到所有项目中出现隐患数量排名前10的隐患
    risk_number_top: {},




    data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的总部整改率
    renderExamineNumber(state) {
        return state.examine_number;
    },
    //承载变化的隐患高中低风险及其对应的累计隐患数量
    renderRiskLevelData(state) {
        return state.risk_level_data;
    },
    //承载当前未整改高风险隐患列表
    renderNoRectification(state) {
        return state.no_rectification_risk;
    },
    //承载变化的未整改高风险图片
    renderImages(state) {
        return state.images;
    },
    //承载变化的所有项目中出现隐患数量排名前10的隐患
    renderRiskNumberTop(state) {
        return state.risk_number_top;
    }

}

//actions
const actions = {
    //得到已检查项目的数量
    getInitRegionProjectNumber(context) {
        dataService.getInitRegionProjectNumber(state.params, function (response) {
            console.log(response)
            context.commit('changeExamineNumber', response)
        })
    },

    //得到隐患风险等级高、中、低风险及其对应的累计隐患数量
    getInitRegionRiskLevel(context) {
        dataService.getInitRegionRiskLevel(state.params, function (response) {
            console.log(response)
            context.commit('changeRiskLevelData', response)
        })
    },

    //得到当前未整改高风险隐患列表
    getInitRegionHighRisk(context) {
        dataService.getInitRegionHighRisk(state.params, function (response){
            console.log(response)
            context.commit('changeNoRectificationRisk', response)
        })
    },

    //得到未整改高风险图片
    getInitRegionImage(context) {
        dataService.getInitRegionImage(state.params, function (response) {
            console.log(response)
            context.commit('changeImage', response)
        })
    },

    //得到所有项目中出现隐患数量排名前10的隐患
    getInitRegionNumberTop(context) {
        dataService.getInitRegionNumberTop(state.params, function (response) {
            context.commit('changeNumberTop', response)
        })
    }


}

//mutations
const mutations = {
    //考虑已检查项目数量
    changeExamineNumber(state, data) {
        state.examine_number = data.project_num
    },

    // 考虑累计隐患数量变化
    changeRiskLevelData(state, data) {
        state.risk_level_data = data.risk_level
    },

    //考虑当前未整改高风险隐患列表
    changeNoRectificationRisk(state, data){
        state.no_rectification_risk = data
    },

    //考虑所有项目中出现隐患数量排名前10的隐患变化
    changeNumberTop(state, data) {
        state.risk_number_top = data
    },

    //考虑未整改隐患图片
    changeImage(state, data) {
        state.images = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}