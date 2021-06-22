import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    // 向后端发送的参数
    params: {},
    // 总部
    // 隐患数量
    heads_risk_num: {},
    // 高风险排名
    heads_risk_num_rank: {},
    // 不同专业的隐患数量
    heads_major_num: {},
    // 隐患项目数量排行
    heads_check_num_rank: {},
    // 不同专业下的不同致因阶段
    heads_major_stage_info: {},
    // 不同分布区域的隐患数量
    heads_area_num: {},

    // 区域
    // 隐患数量
    regions_risk_num: {},
    // 高风险排名
    regions_risk_num_rank: {},
    // 不同专业的隐患数量
    regions_major_num: {},
    // 隐患项目数量排行
    regions_check_num_rank: {},
    // 不同专业下的不同致因阶段
    regions_major_stage_info: {},
    // 不同分布区域的隐患数量
    regions_area_num: {},

    // 项目
    // 隐患数量
    projects_risk_num: {},
    // 不同专业的隐患数量
    projects_major_ratio: {},
    // 隐患数量排行
    projects_note_top: {},
    // 消防专业发现的隐患数量 以及消防专业下的风险种类数量
    projects_fire: {},
    // 不同致因阶段的不同系统下的数量
    projects_stage_sys_info: {},
    // 消防专业的高风险隐患数量排行
    projects_high_risk: {},

    // 检查
    // 隐患数量
    checks_risk_num: {},
    // 高风险排名
    checks_risk_num_rank: {},
    // 不同专业的隐患数量
    checks_major_num: {},
    // 隐患项目数量排行
    checks_check_num_rank: {},
    // 不同专业下的不同致因阶段
    checks_major_stage_info: {},
    // 不同分布区域的隐患数量
    checks_area_num: {}
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //总部
    // 显示隐患数量
    renderHeadsRiskNumber(state) {
        return state.heads_risk_num;
    },
    // 高风险排名
    renderHeadsRNRank(state) {
        return state.heads_risk_num_rank;
    },
    // 不同专业的隐患数量
    renderHeadsMajorNumber(state) {
        return state.heads_major_num;
    },
    // 隐患项目数量排行CN-check num
    renderHeadsCNRank(state) {
        return state.heads_check_num_rank;
    },
    // 不同专业下的不同致因阶段
    renderHeadsMajorStageInfo(state) {
        return state.heads_major_stage_info;
    },
    // 不同分布区域的隐患数量
    renderHeadsAreaNumber(state) {
        return state.heads_area_num
    },

    // 区域
    // 显示隐患数量
    renderRegionsRiskNumber(state) {
        return state.regions_risk_num;
    },
    // 高风险排名
    renderRegionsRNRank(state) {
        return state.regions_risk_num_rank;
    },
    // 不同专业的隐患数量
    renderRegionsMajorNumber(state) {
        return state.regions_major_num;
    },
    // 隐患项目数量排行CN-check num
    renderRegionsCNRank(state) {
        return state.regions_check_num_rank;
    },
    // 不同专业下的不同致因阶段
    renderRegionsMajorStageInfo(state) {
        return state.regions_major_stage_info;
    },
    // 不同分布区域的隐患数量
    renderRegionsAreaNumber(state) {
        return state.regions_area_num
    },

    // 项目
    // 隐患数量
    renderProjectsRiskNumber(state) {
        return state.projects_risk_num
    },
    // 不同专业的隐患数量
    renderProjectsMajorRatio(state) {
        return state.projects_major_ratio
    },
    // 隐患数量排行
    renderProjectsNoteTop(state) {
        return state.projects_note_top
    },
    // 消防专业发现的隐患数量 以及消防专业下的风险种类数量
    renderProjectsFire(state) {
        return state.projects_fire
    },
    // 不同致因阶段的不同系统下的数量
    renderProjectsStageSystemInfo(state) {
        return state.projects_stage_sys_info
    },
    // 消防专业的高风险隐患数量排行
    renderProjectsHighRisk(state) {
        return state.projects_high_risk
    },

    // 检查
    // 显示隐患数量
    renderChecksRiskNumber(state) {
        return state.checks_risk_num;
    },
    // 高风险排名
    renderChecksRNRank(state) {
        return state.checks_risk_num_rank;
    },
    // 不同专业的隐患数量
    renderChecksMajorNumber(state) {
        return state.checks_major_num;
    },
    // 隐患项目数量排行CN-check num
    renderChecksCNRank(state) {
        return state.checks_check_num_rank;
    },
    // 不同专业下的不同致因阶段
    renderChecksMSInfo(state) {
        return state.checks_major_stage_info;
    },
}

const actions = {
    // 总部
    // 显示隐患数量
    getHeadScreenRiskNumber(context) {
        dataService.getHeadScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeHeadsRiskNumber', response)
        })
    },
    // 高风险排名
    getHeadScreenRiskNumberRank(context) {
        dataService.getHeadScreenRiskNumberRank(context.state.params, function (response) {
            context.commit('changeHeadsRiskNumberRank', response)
        })
    },
    // 不同专业的隐患数量
    getHeadScreenMajorNumber(context) {
        dataService.getHeadScreenMajorNumber(context.state.params, function (response) {
            context.commit('changeHeadsMajorNumber', response)
        })
    },
    // 隐患项目数量排行
    getHeadScreenCheckNumberRank(context) {
        dataService.getHeadScreenCheckNumberRank(context.state.params, function (response) {
            context.commit('changeHeadsCheckNumberRank', response)
        })
    },
    // 不同专业下的不同致因阶段
    getHeadScreenMajorStageInfo(context) {
        dataService.getHeadScreenMajorStageInfo(context.state.params, function (response) {
            context.commit('changeHeadsMajorStageInfo', response)
        })
    },
    // 不同分布区域的隐患数量
    getHeadScreenAreaNumber(context) {
        dataService.getHeadScreenAreaNumber(context.state.params, function (response) {
            context.commit('changeHeadsAreaNumber', response)
        })
    },

    // 区域
    // 显示隐患数量
    getRegionScreenRiskNumber(context) {
        dataService.getRegionScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeRegionsRiskNumber', response)
        })
    },
    // 高风险排名
    getRegionScreenRNRank(context) {
        dataService.getRegionScreenRNRank(context.state.params, function (response) {
            context.commit('changeRegionsRNRank', response)
        })
    },
    // 不同专业的隐患数量
    getRegionScreenMajorNumber(context) {
        dataService.getRegionScreenMajorNumber(context.state.params, function (response) {
            context.commit('changeRegionsMajorNumber', response)
        })
    },
    // 隐患项目数量排行
    getRegionScreenCNRank(context) {
        dataService.getRegionScreenCNRank(context.state.params, function (response) {
            context.commit('changeRegionsCNRank', response)
        })
    },
    // 不同专业下的不同致因阶段
    getRegionScreenMajorStageInfo(context) {
        dataService.getRegionScreenMajorStageInfo(context.state.params, function (response) {
            context.commit('changeRegionsMajorStageInfo', response)
        })
    },
    // 不同分布区域的隐患数量
    getRegionScreenAreaNumber(context) {
        dataService.getRegionScreenAreaNumber(context.state.params, function (response) {
            context.commit('changeRegionsAreaNumber', response)
        })
    },

    // 项目
    // 隐患数量
    getProjectScreenRiskNumber(context) {
        dataService.getProjectScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeProjectsRiskNumber', response)
        })
    },

    // 不同专业的隐患数量
    getProjectScreenMajorRatio(context) {
        dataService.getProjectScreenMajorRatio(context.state.params, function (response) {
            context.commit('changeProjectsMajorRatio', response)
        })
    },

    // 隐患数量排行
    getProjectScreenNoteTop(context) {
        dataService.getProjectScreenNoteTop(context.state.params, function (response) {
            context.commit('changeProjectsNoteTop', response)
        })
    },

    // 消防专业发现的隐患数量 以及消防专业下的风险种类数量
    getProjectScreenFire(context) {
        dataService.getProjectScreenFire(context.state.params, function (response) {
            context.commit('changeProjectsFire', response)
        })
    },

    // 不同致因阶段的不同系统下的数量
    getProjectScreenStageSystemRatio(context) {
        dataService.getProjectScreenStageSystemRatio(context.state.params, function (response) {
            context.commit('changeProjectsStageSystemRatio', response)
        })
    },

    // 消防专业的高风险隐患数量排行
    getProjectScreenHighRisk(context) {
        dataService.getProjectScreenHighRisk(context.state.params, function (response) {
            context.commit('changeProjectsHighRisk', response)
        })
    },

    // 检查
    // 显示隐患数量
    getCheckScreenRiskNumber(context) {
        dataService.getCheckScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeChecksRiskNumber', response)
        })
    },
    // 高风险排名
    getCheckScreenRNRank(context) {
        dataService.getCheckScreenRNRank(context.state.params, function (response) {
            context.commit('changeRegionsRNRank', response)
        })
    },
    // 不同专业的隐患数量
    getCheckScreenMajorNumber(context) {
        dataService.getCheckScreenMajorNumber(context.state.params, function (response) {
            context.commit('changeChecksMajorNumber', response)
        })
    },
    // 隐患项目数量排行
    getCheckScreenCNRank(context) {
        dataService.getCheckScreenCNRank(context.state.params, function (response) {
            context.commit('changeChecksCNRank', response)
        })
    },
    // 不同专业下的不同致因阶段
    getCheckScreenMSInfo(context) {
        dataService.getCheckScreenMSInfo(context.state.params, function (response) {
            context.commit('changeChecksMSInfo', response)
        })
    },
}
//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    // 总部
    // 显示隐患数量
    changeHeadsRiskNumber(state, data) {
        state.heads_risk_num = data.data
    },
    // 高风险排名
    changeHeadsRiskNumberRank(state, data) {
        state.heads_risk_num_rank = data.data
    },
    // 不同专业的隐患数量
    changeHeadsMajorNumber(state, data) {
        state.heads_major_num = data.data
    },
    // 隐患项目数量排行
    changeHeadsCheckNumberRank(state, data) {
        state.heads_risk_num = data.data
    },
    // 不同专业下的不同致因阶段
    changeHeadsMajorStageInfo(state, data) {
        state.heads_major_stage_info = data.data
    },
    // 不同分布区域的隐患数量
    changeHeadsAreaNumber(state, data) {
        state.heads_area_num = data.data
    },

    // 区域
    // 显示隐患数量
    changeRegionsRiskNumber(state, data) {
        state.regions_risk_num = data.data
    },
    // 高风险排名
    changeRegionsRNRank(state, data) {
        state.regions_risk_num_rank = data.data
    },
    // 不同专业的隐患数量
    changeRegionsMajorNumber(state, data) {
        state.regions_major_num = data.data
    },
    // 隐患项目数量排行
    changeRegionsCheckNumberRank(state, data) {
        state.regions_risk_num = data.data
    },
    // 不同专业下的不同致因阶段
    changeRegionsMajorStageInfo(state, data) {
        state.regions_major_stage_info = data.data
    },
    // 不同分布区域的隐患数量
    changeRegionsAreaNumber(state, data) {
        state.regions_area_num = data.data
    },

    // 项目
    // 隐患数量
    changeProjectsRiskNumber(state, data) {
        state.projects_risk_num = data.data
    },
    // 不同专业的隐患数量
    changeProjectsMajorRatio(state, data) {
        state.projects_major_ratio = data.data
    },
    // 隐患数量排行
    changeProjectsNoteTop(state, data) {
        state.projects_note_top = data.data
    },
    // 消防专业发现的隐患数量 以及消防专业下的风险种类数量
    changeProjectsFire(state, data) {
        state.projects_fire = data.data
    },
    // 不同致因阶段的不同系统下的数量
    changeProjectsStageSystemRatio(state, data) {
        state.projects_stage_system_ratio = data.data
    },
    // 消防专业的高风险隐患数量排行
    changeProjectsHighRisk(state, data) {
        state.projects_high_risk = data.data
    },

    // 检查
    // 显示隐患数量
    changeChecksRiskNumber(state, data) {
        state.checks_risk_num = data.data
    },
    // 高风险排名
    changeChecksRNRank(state, data) {
        state.checks_risk_num_rank = data.data
    },
    // 不同专业的隐患数量
    changeChecksMajorNumber(state, data) {
        state.checks_major_num = data.data
    },
    // 隐患项目数量排行
    changeChecksCheckNumberRank(state, data) {
        state.checks_risk_num = data.data
    },
    // 不同专业下的不同致因阶段
    changeChecksMSInfo(state, data) {
        state.checks_major_stage_info = data.data
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}