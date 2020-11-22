import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //向后端发送的粒度
    g_params: {},
    //基于项目级展示当前整改率
    prj_rectification: {},
    //基于项目级展示历次发现的不同风险等级的隐患数量
    prj_risk_data: {},
    //基于项目级展示历次检查隐患数量变化的情况
    prj_number_change: {},
    //基于项目级展示最近一次检查不同专业隐患占比情况
    prj_nearest_perception: {},
    //基于项目级展示当前未整改的高风险隐患列表
    prj_risk_list: {},
    //基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    prj_risk_top: {},
    //基于项目级展示当前未整改高风险隐患图片
    prj_image: [],
    //基于项目级展示不同专业所有隐患子系统占比情况
    prj_system: {},
    //致因阶段占比
    prj_reason: {},
    //隐患分布区域占比
    prj_region: {},
    data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //向后端发送的粒度参数
    renderGParams(params) {
        return state.g_params;
    },
    //承载变化的项目级整改率
    renderPrjRectification(state) {
        return state.prj_rectification;
    },
    //承载变化的基于项目级展示历次发现的不同风险等级的隐患数量
    renderPrjRiskLevelData(state) {
        return state.prj_risk_data;
    },
    //承载变化的基于项目级展示最近一次检查不同专业隐患占比情况
    renderPrjNearestPerception(state) {
        return state.prj_nearest_perception;
    },
    //承载变化的基于项目级展示历次检查隐患数量变化的情况
    renderPrjNumberChange(state) {
        return state.prj_number_change;
    },
    //承载变化的基于项目级展示当前未整改的高风险隐患列表
    renderProjectRiskList(state) {
        return state.prj_risk_list;
    },
    //承载基于项目级展示当前未整改高风险隐患图片
    renderPrjImages(state) {
        return state.images;
    },
    //基于项目级展示不同专业所有隐患子系统占比情况
    renderPrjSystem(state) {
        return state.prj_system;
    },
    //占比
    renderPrjReason(state) {
        return state.prj_reason;
    },
    renderPrjRegion(state) {
        return state.prj_region;
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

    //得到基于项目级展示最近一次检查不同专业隐患占比情况
    getInitProjectNearestPerception(context) {
        dataService.getInitProjectNearestPerception(state.params, function (response) {
            context.commit('changePrjNearestPerception', response)
        })
    },

    //得到基于项目级展示历次检查隐患数量变化的情况
    getInitProjectNumberChange(context) {
        dataService.getInitProjectNumberChange(state.g_params, function (response) {
            context.commit('changePrjNumberChange', response)
        })
    },

    //得到基于项目级展示当前未整改的高风险隐患列表
    getInitPrjRisk(context) {
        dataService.getInitProjectRisk(state.params, function (response) {
            context.commit('changePrjRiskLevelList', response)
        })
    },

    //得到基于项目级展示当前未整改高风险隐患图片
    getInitProjectImage(context) {
        dataService.getInitProjectImage(state.params, function (response) {
            // console.log(response)
            context.commit('changePrjImage', response)
        })
    },

    //基于项目级展示不同专业所有隐患子系统占比情况
    getInitProjectSystem(context) {
        dataService.getInitProjectSystem(state.params, function (response) {
            // console.log(response)
// <<<<<<< HEAD
//
// =======
// >>>>>>> f6f7baff9ca7b442fa9930f2a1e2f2fd5c38eeef
            context.commit('changePrjSystem', response)
        })
    },

        //占比
    getInitProjectReason(context) {
        dataService.getInitProjectReason(state.params, function (response) {
            context.commit('changePrjReason', response)
        })
    },
    getInitProjectRegionDistribution(context) {
        dataService.getInitProjectRegionDistribution(state.params, function (response) {
            context.commit('changePrjRegion', response)
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
    changePrjNearestPerception(state, data) {
        console.log(data)
        state.prj_nearest_perception = data
    },

    //基于项目级展示最近一次检查不同专业隐患占比情况
    changePrjRiskLevelData(state, data) {
        console.log(data)
        state.prj_risk_data = data
    },

    //基于项目级展示历次检查隐患数量变化的情况
    changePrjNumberChange(state, data) {debugger
        console.log(data)
        state.prj_number_change = data
    },

    //考虑基于项目级展示当前未整改的高风险隐患列表
    changePrjRiskLevelList(state, data) {
        state.prj_risk_list = data.note_list
        console.log(data.note_list)
    },

    // 考虑基于项目级展示当前未整改高风险隐患图片
    changePrjImage(state, data) {
        state.prj_image = data.image_list
        // console.log(state.prj_image)
    },

    //基于项目级展示不同专业所有隐患子系统占比情况
    changePrjSystem(state, data) {
        state.prj_system = data
        console.log(state.prj_system)
// <<<<<<< HEAD
//
// =======
// >>>>>>> f6f7baff9ca7b442fa9930f2a1e2f2fd5c38eeef
    },

    //占比
    changePrjReason(state, data) {
        state.prj_reason = data
        console.log(state.prj_reason)
    },

    changePrjRegion(state, data) {
        state.prj_region = data
        console.log(state.prj_region)
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