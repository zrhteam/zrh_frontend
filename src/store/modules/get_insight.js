import axios from 'axios'
import insightDataService from "@/service/insightDataService";

const state = {
    // 向后端发送的数据
    params: {},
    // 15组红线数据
    red_line_data: {},
    // 总部趋势
    tendency_head: {},
    // 区域趋势
    tendency_region: {},
    // 项目趋势
    tendency_project: {},
    // 行业趋势
    tendency_profession: {},
    // 总部 隐患各风险等级占比
    ratio_head: {},
    // 区域 隐患各风险等级占比
    ratio_region: {},
    // 项目 隐患各风险等级占比
    ratio_project: {},
    // 行业 隐患各风险等级占比
    ratio_profession: {}
}

const getters = {
    // 向后端发送的数据
    renderParams(state) {
        return state.params
    },
    // 15组红线数据
    renderRedLineData(state) {
        return state.red_line_data
    },
    // 总部趋势
    renderTendencyHead(state) {
        return state.tendency_head
    },
    // 区域趋势
    renderTendencyRegion(state) {
        return state.tendency_region
    },
    // 项目趋势
    renderTendencyProject(state) {
        return state.tendency_project
    },
    // 行业趋势
    renderTendencyProfession(state) {
        return state.tendency_profession
    },
    // 总部 隐患各风险等级占比
    renderRatioHead(state) {
        return state.ratio_head
    },
    // 区域 隐患各风险等级占比
    renderRatioRegion(state) {
        return state.ratio_region
    },
    // 项目 隐患各风险等级占比
    renderRatioProject(state) {
        return state.ratio_project
    },
    // 行业 隐患各风险等级占比
    renderRatioProfession(state) {
        return state.ratio_profession
    }
}

const actions = {
    // 15组红线数据
    getAnalyzeRedlineData(context) {
        insightDataService.getAnalyzeRedlineData(context.state.params, function (response) {
            context.commit('changeAnalyzeRedlineData', response)
        })
    },
    // 总部趋势
    getAnalyzeTendencyHeadquarter(context) {
        insightDataService.getAnalyzeTendencyHeadquarter(context.state.params, function (response) {
            context.commit('changeAnalyzeTendencyHeadquarter', response)
        })
    },
    // 区域趋势
    getAnalyzeTendencyRegion(context) {
        insightDataService.getAnalyzeTendencyRegion(context.state.params, function (response) {
            context.commit('changeAnalyzeTendencyRegion', response)
        })
    },
    // 项目趋势
    getAnalyzeTendencyProject(context) {
        insightDataService.getAnalyzeTendencyProject(context.state.params, function (response) {
            context.commit('changeAnalyzeTendencyProject', response)
        })
    },
    // 行业趋势
    getAnalyzeTendencyProfession(context) {
        insightDataService.getAnalyzeTendencyProfession(context.state.params, function (response) {
            context.commit('changeAnalyzeTendencyProfession', response)
        })
    },
    // 总部 隐患各风险等级占比
    getAnalyzeRatioHeadquarter(context) {
        insightDataService.getAnalyzeRatioHeadquarter(context.state.params, function (response) {
            context.commit('changeAnalyzeRatioHeadquarter', response)
        })
    },
    // 区域 隐患各风险等级占比
    getAnalyzeRatioRegion(context) {
        insightDataService.getAnalyzeRatioRegion(context.state.params, function (response) {
            context.commit('changeAnalyzeRatioRegion', response)
        })
    },
    // 项目 隐患各风险等级占比
    getAnalyzeRatioProject(context) {
        insightDataService.getAnalyzeRatioProject(context.state.params, function (response) {
            context.commit('changeAnalyzeRatioProject', response)
        })
    },
    // 行业 隐患各风险等级占比
    getAnalyzeRatioProfession(context) {
        insightDataService.getAnalyzeRatioProfession(context.state.params, function (response) {
            context.commit('changeAnalyzeRatioProfession', response)
        })
    }
}

const mutations = {
    // 向后端发送的数据
    changeParams(state, data) {
        state.params = data.params
    },
    // 15组红线数据
    changeAnalyzeRedlineData(state, data) {
        state.red_line_data = data.data
    },
    // 总部趋势
    changeAnalyzeTendencyHeadquarter(state, data) {
        state.tendency_head = data.data
    },
    // 区域趋势
    changeAnalyzeTendencyRegion(state, data) {
        state.tendency_region = data.data
    },
    // 项目趋势
    changeAnalyzeTendencyProject(state, data) {
        state.tendency_project = data.data
    },
    // 行业趋势
    changeAnalyzeTendencyProfession(state, data) {
        state.tendency_profession = data.data
    },
    // 总部 隐患各风险等级占比
    changeAnalyzeRatioHeadquarter(state, data) {
        state.ratio_head = data.data
    },
    // 区域 隐患各风险等级占比
    changeAnalyzeRatioRegion(state, data) {
        state.ratio_region = data.data
    },
    // 项目 隐患各风险等级占比
    changeAnalyzeRatioProject(state, data) {
        state.ratio_project = data.data
    },
    // 行业 隐患各风险等级占比
    changeAnalyzeRatioProfession(state, data) {
        state.ratio_profession = data.data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}