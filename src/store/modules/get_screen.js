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
    // 下方表格
    heads_table: {},

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
    // 下方表格
    regions_table: {},

    // 项目
    // 隐患数量
    projects_risk_num: {},
    // 不同专业的隐患数量
    projects_risk_num_rank: {},
    // 高中低风险的数量
    projects_risk_level: {},
    // stage（致因阶段）的占比
    projects_stage_ratio: {},
    // 高风险的隐患描述 前20
    projects_high_risk_note: {},
    // 四大专业的隐患图片（各3张）
    projects_picture_note: {},
    // 下方表格
    projects_table: {},

    // 检查
    // 隐患数量
    checks_risk_num: {},
    // 不同专业的隐患数量
    checks_risk_num_rank: {},
    // 高中低风险的数量
    checks_risk_level: {},
    // stage（致因阶段）的占比
    checks_stage_ratio: {},
    // 高风险的隐患描述 前20
    checks_high_risk_note: {},
    // 四大专业的隐患图片（各3张）
    checks_picture_note: {},
    // 下方表格
    checks_table: {},
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
    // 下方表格
    renderHeadsTable(state) {
        return state.heads_table
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
    // 下方表格
    renderRegionsTable(state) {
        return state.regions_table
    },

    // 项目
    // 隐患数量
    renderProjectsRiskNumber(state) {
        return state.projects_risk_num
    },
    // 不同专业的隐患数量
    renderProjectsRNRanK(state) {
        return state.projects_risk_num_rank
    },

    // 高中低风险的数量
    renderProjectsRiskLevel(state) {
        return state.projects_risk_level
    },

    // stage（致因阶段）的占比
    renderProjectsStageRatio(state) {
        return state.projects_stage_ratio
    },

    // 高风险的隐患描述 前20
    renderProjectsHighRiskNote(state) {
        return state.projects_high_risk_note
    },

    // 四大专业的隐患图片（各3张）
    renderProjectsPictureNote(state) {
        return state.projects_picture_note
    },

    // 下方表格
    renderProjectsTable(state) {
        return state.projects_table
    },


    // 检查
    // 显示隐患数量
    renderChecksRiskNumber(state) {
        return state.checks_risk_num;
    },
    // 不同专业的隐患数量
    renderChecksRNRank(state) {
        return state.checks_risk_num_rank;
    },

    // 高中低风险的数量
    renderChecksRiskLevel(state) {
        return state.projects_risk_level
    },

    // stage（致因阶段）的占比
    renderChecksStageRatio(state) {
        return state.projects_stage_ratio
    },

    // 高风险的隐患描述 前20
    renderChecksHighRiskNote(state) {
        return state.projects_high_risk_note
    },

    // 四大专业的隐患图片（各3张）
    renderChecksPictureNote(state) {
        return state.projects_picture_note
    },

    // 下方表格
    renderChecksTable(state) {
        return state.projects_table
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
    // 下方表格
    getHeadScreenTable(context) {
        dataService.getHeadScreenTable(context.state.params, function (response) {
            context.commit('changeHeadsTable', response)
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
            context.commit('changeRegionsCheckNumberRank', response)
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
    // 下方表格
    getRegionScreenTable(context) {
        dataService.getRegionScreenTable(context.state.params, function (response) {
            context.commit('changeRegionsTable', response)
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
    getProjectScreenRNRank(context) {
        dataService.getProjectScreenRNRank(context.state.params, function (response) {
            context.commit('changeProjectsRNRank', response)
        })
    },

    // 高中低风险的数量
    getProjectScreenRiskLevel(context) {
        dataService.getProjectScreenRiskLevel(context.state.params, function (response) {
            context.commit('changeProjectsRiskLevel', response)
        })
    },

    // stage（致因阶段）的占比
    getProjectScreenStageRatio(context) {
        dataService.getProjectScreenStageRatio(context.state.params, function (response) {
            context.commit('changeProjectsStageRatio', response)
        })
    },

    // 高风险的隐患描述 前20
    getProjectScreenHighRiskNote(context) {
        dataService.getProjectScreenHighRiskNote(context.state.params, function (response) {
            context.commit('changeProjectsHighRiskNote', response)
        })
    },

    // 四大专业的隐患图片（各3张）
    getProjectScreenPictureNote(context) {
        dataService.getProjectScreenPictureNote(context.state.params, function (response) {
            context.commit('changeProjectsPictureNote', response)
        })
    },
    // 下方表格
    getProjectScreenTable(context) {
        dataService.getProjectScreenTable(context.state.params, function (response) {
            context.commit('changeProjectsTable', response)
        })
    },

    // 检查
    // 显示隐患数量
    getCheckScreenRiskNumber(context) {
        dataService.getCheckScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeChecksRiskNumber', response)
        })
    },
    // 不同专业的隐患数量
    getCheckScreenRNRank(context) {
        dataService.getCheckScreenRNRank(context.state.params, function (response) {
            context.commit('changeChecksMajorNumber', response)
        })
    },
    // 高中低风险的数量
    getCheckScreenRiskLevel(context) {
        dataService.getCheckScreenRiskLevel(context.state.params, function (response) {
            context.commit('changeChecksRiskLevel', response)
        })
    },
    // stage（致因阶段）的占比
    getCheckScreenStageRatio(context) {
        dataService.getCheckScreenStageRatio(context.state.params, function (response) {
            context.commit('changeChecksStageRatio', response)
        })
    },
    // 高风险的隐患描述 前20
    getCheckScreenHighRiskNote(context) {
        dataService.getCheckScreenHighRiskNote(context.state.params, function (response) {
            context.commit('changeChecksHighRiskNote', response)
        })
    },
    // 四大专业的隐患图片（各3张）
    getCheckScreenPictureNote(context) {
        dataService.getCheckScreenPictureNote(context.state.params, function (response) {
            context.commit('changeChecksPictureNote', response)
        })
    },
    // 下方表格
    getCheckScreenTable(context) {
        dataService.getCheckScreenTable(context.state.params, function (response) {
            context.commit('changeChecksTable', response)
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
        state.heads_check_num_rank = data.data
    },
    // 不同专业下的不同致因阶段
    changeHeadsMajorStageInfo(state, data) {
        state.heads_major_stage_info = data.data
    },
    // 不同分布区域的隐患数量
    changeHeadsAreaNumber(state, data) {
        state.heads_area_num = data.data
    },
    // 下方表格
    changeHeadsTable(state, data) {
        state.heads_table = data.data
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
        state.regions_check_num_rank = data.data
    },
    // 不同专业下的不同致因阶段
    changeRegionsMajorStageInfo(state, data) {
        state.regions_major_stage_info = data.data
    },
    // 不同分布区域的隐患数量
    changeRegionsAreaNumber(state, data) {
        state.regions_area_num = data.data
    },
    // 下方表格
    changeRegionsTable(state, data) {
        state.regions_table = data.data
    },

    // 项目
    // 隐患数量
    changeProjectsRiskNumber(state, data) {
        state.projects_risk_num = data.data
    },
    // 不同专业的隐患数量
    changeProjectsRNRank(state, data) {
        state.projects_risk_num_rank = data.data
    },
    // 高中低风险的数量
    changeProjectsRiskLevel(state, data) {
        state.projects_risk_level = data.data
    },
    // stage（致因阶段）的占比
    changeProjectsStageRatio(state, data) {
        state.projects_stage_ratio = data.data
    },
    // 高风险的隐患描述 前20
    changeProjectsHighRiskNote(state, data) {
        state.projects_high_risk_note = data.data
    },
    // 四大专业的隐患图片（各3张）
    changeProjectsPictureNote(state, data) {
        state.projects_picture_note = data.data
    },
    // 下方表格
    changeProjectsTable(state, data) {
        state.projects_table = data.data
    },

    // 检查
    // 显示隐患数量
    changeChecksRiskNumber(state, data) {
        state.checks_risk_num = data.data
    },
    // 不同专业的隐患数量
    changeChecksMajorNumber(state, data) {
        state.checks_risk_num_rank = data.data
    },
    // 高中低风险的数量
    changeChecksRiskLevel(state, data) {
        state.checks_risk_level = data.data
    },
    // stage（致因阶段）的占比
    changeChecksStageRatio(state, data) {
        state.checks_stage_ratio = data.data
    },
    // 高风险的隐患描述 前20
    changeChecksHighRiskNote(state, data) {
        state.checks_high_risk_note = data.data
    },
    // 四大专业的隐患图片（各3张）
    changeChecksPictureNote(state, data) {
        state.checks_picture_note = data.data
    },
    // 下方表格
    changeChecksTable(state, data) {
        state.checks_table = data.data
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}