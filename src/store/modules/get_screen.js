import axios from 'axios'
import screenDataService from '@/service/screenDataService'

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

    // 总部、区域大屏的地图信息
    province_info: {},

    // 项目专业大屏
    // 向后端发送的参数，
    projectm_params: {},
    // 隐患数量
    projectm_risk_num: {},
    // 不同专业的隐患数量
    projectm_major_ratio: {},
    // 隐患数量排行 前10
    projectm_note_top: {},
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    projectm_info: {},
    // 不同致因阶段的不同系统下的数量
    projectm_stage_system_info: {},
    // 不同风险等级的不同系统下的数量
    projectm_risk_level_system_info: {},
    // 不同分布区域的不同系统下的数量
    projectm_area_system_info: {},
    // 某专业的高风险隐患数量排行
    projectm_high_risk: {},
    // 下方表格
    projectm_table: {},

    // 检查专业大屏
    // 向后端发送的参数，
    checkm_params: {},
    // 隐患数量
    checkm_risk_num: {},
    // 不同专业的隐患数量
    checkm_major_ratio: {},
    // 隐患数量排行 前10
    checkm_note_top: {},
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    checkm_info: {},
    // 不同致因阶段的不同系统下的数量
    checkm_stage_system_info: {},
    // 不同风险等级的不同系统下的数量
    checkm_risk_level_system_info: {},
    // 不同分布区域的不同系统下的数量
    checkm_area_system_info: {},
    // 某专业的高风险隐患数量排行
    checkm_high_risk: {},
    // 下方表格
    checkm_table: {},

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

    renderProvinceInfo(state) {
        return state.province_info
    },

    // 项目专业大屏
    // 向后端发送的参数，
    renderProjectMParams(state) {
        return state.projectm_params
    },
    // 隐患数量
    renderProjectMRiskNum(state) {
        return state.projectm_risk_num
    },
    // 不同专业的隐患数量
    renderProjectMMajorRatio(state) {
        return state.projectm_major_ratio
    },
    // 隐患数量排行 前10
    renderProjectMNoteTop(state) {
        return state.projectm_note_top
    },
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    renderProjectMInfo(state) {
        return state.projectm_info
    },
    // 不同致因阶段的不同系统下的数量
    renderProjectMStageSystemInfo(state) {
        return state.projectm_stage_system_info
    },
    // 不同风险等级的不同系统下的数量
    renderProjectMRiskLevelSystemInfo(state) {
        return state.projectm_risk_level_system_info
    },
    // 不同分布区域的不同系统下的数量
    renderProjectMAreaSystemInfo(state) {
        return state.projectm_area_system_info
    },
    // 某专业的高风险隐患数量排行
    renderProjectMHighRisk(state) {
        return state.projectm_high_risk
    },
    // 下方表格
    renderProjectMTable(state) {
        return state.projectm_table
    },

    // 检查专业大屏
    // 向后端发送的参数，
    renderCheckMParams(state) {
        return state.checkm_params
    },
    // 隐患数量
    renderCheckMRiskNum(state) {
        return state.checkm_risk_num
    },
    // 不同专业的隐患数量
    renderCheckMMajorRatio(state) {
        return state.checkm_major_ratio
    },
    // 隐患数量排行 前10
    renderCheckMNoteTop(state) {
        return state.checkm_note_top
    },
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    renderCheckMInfo(state) {
        return state.checkm_info
    },
    // 不同致因阶段的不同系统下的数量
    renderCheckMStageSystemInfo(state) {
        return state.checkm_stage_system_info
    },
    // 不同风险等级的不同系统下的数量
    renderCheckMRiskLevelSystemInfo(state) {
        return state.checkm_risk_level_system_info
    },
    // 不同分布区域的不同系统下的数量
    renderCheckMAreaSystemInfo(state) {
        return state.checkm_area_system_info
    },
    // 某专业的高风险隐患数量排行
    renderCheckMHighRisk(state) {
        return state.checkm_high_risk
    },
    // 下方表格
    renderCheckMTable(state) {
        return state.checkm_table
    },
}

const actions = {
    // 总部
    // 显示隐患数量
    getHeadScreenRiskNumber(context) {
        screenDataService.getHeadScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeHeadsRiskNumber', response)
        })
    },
    // 高风险排名
    getHeadScreenRiskNumberRank(context) {
        screenDataService.getHeadScreenRiskNumberRank(context.state.params, function (response) {
            context.commit('changeHeadsRiskNumberRank', response)
        })
    },
    // 不同专业的隐患数量
    getHeadScreenMajorNumber(context) {
        screenDataService.getHeadScreenMajorNumber(context.state.params, function (response) {
            context.commit('changeHeadsMajorNumber', response)
        })
    },
    // 隐患项目数量排行
    getHeadScreenCheckNumberRank(context) {
        screenDataService.getHeadScreenCheckNumberRank(context.state.params, function (response) {
            context.commit('changeHeadsCheckNumberRank', response)
        })
    },
    // 不同专业下的不同致因阶段
    getHeadScreenMajorStageInfo(context) {
        screenDataService.getHeadScreenMajorStageInfo(context.state.params, function (response) {
            context.commit('changeHeadsMajorStageInfo', response)
        })
    },
    // 不同分布区域的隐患数量
    getHeadScreenAreaNumber(context) {
        screenDataService.getHeadScreenAreaNumber(context.state.params, function (response) {
            context.commit('changeHeadsAreaNumber', response)
        })
    },
    // 下方表格
    getHeadScreenTable(context) {
        screenDataService.getHeadScreenTable(context.state.params, function (response) {
            context.commit('changeHeadsTable', response)
        })
    },

    // 区域
    // 显示隐患数量
    getRegionScreenRiskNumber(context) {
        screenDataService.getRegionScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeRegionsRiskNumber', response)
        })
    },
    // 高风险排名
    getRegionScreenRNRank(context) {
        screenDataService.getRegionScreenRNRank(context.state.params, function (response) {
            context.commit('changeRegionsRNRank', response)
        })
    },
    // 不同专业的隐患数量
    getRegionScreenMajorNumber(context) {
        screenDataService.getRegionScreenMajorNumber(context.state.params, function (response) {
            context.commit('changeRegionsMajorNumber', response)
        })
    },
    // 隐患项目数量排行
    getRegionScreenCNRank(context) {
        screenDataService.getRegionScreenCNRank(context.state.params, function (response) {
            context.commit('changeRegionsCheckNumberRank', response)
        })
    },
    // 不同专业下的不同致因阶段
    getRegionScreenMajorStageInfo(context) {
        screenDataService.getRegionScreenMajorStageInfo(context.state.params, function (response) {
            context.commit('changeRegionsMajorStageInfo', response)
        })
    },
    // 不同分布区域的隐患数量
    getRegionScreenAreaNumber(context) {
        screenDataService.getRegionScreenAreaNumber(context.state.params, function (response) {
            context.commit('changeRegionsAreaNumber', response)
        })
    },
    // 下方表格
    getRegionScreenTable(context) {
        screenDataService.getRegionScreenTable(context.state.params, function (response) {
            context.commit('changeRegionsTable', response)
        })
    },

    // 项目
    // 隐患数量
    getProjectScreenRiskNumber(context) {
        screenDataService.getProjectScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeProjectsRiskNumber', response)
        })
    },

    // 不同专业的隐患数量
    getProjectScreenRNRank(context) {
        screenDataService.getProjectScreenRNRank(context.state.params, function (response) {
            context.commit('changeProjectsRNRank', response)
        })
    },

    // 高中低风险的数量
    getProjectScreenRiskLevel(context) {
        screenDataService.getProjectScreenRiskLevel(context.state.params, function (response) {
            context.commit('changeProjectsRiskLevel', response)
        })
    },

    // stage（致因阶段）的占比
    getProjectScreenStageRatio(context) {
        screenDataService.getProjectScreenStageRatio(context.state.params, function (response) {
            context.commit('changeProjectsStageRatio', response)
        })
    },

    // 高风险的隐患描述 前20
    getProjectScreenHighRiskNote(context) {
        screenDataService.getProjectScreenHighRiskNote(context.state.params, function (response) {
            context.commit('changeProjectsHighRiskNote', response)
        })
    },

    // 四大专业的隐患图片（各3张）
    getProjectScreenPictureNote(context) {
        screenDataService.getProjectScreenPictureNote(context.state.params, function (response) {
            context.commit('changeProjectsPictureNote', response)
        })
    },
    // 下方表格
    getProjectScreenTable(context) {
        screenDataService.getProjectScreenTable(context.state.params, function (response) {
            context.commit('changeProjectsTable', response)
        })
    },

    // 检查
    // 显示隐患数量
    getCheckScreenRiskNumber(context) {
        screenDataService.getCheckScreenRiskNumber(context.state.params, function (response) {
            context.commit('changeChecksRiskNumber', response)
        })
    },
    // 不同专业的隐患数量
    getCheckScreenRNRank(context) {
        screenDataService.getCheckScreenRNRank(context.state.params, function (response) {
            context.commit('changeChecksMajorNumber', response)
        })
    },
    // 高中低风险的数量
    getCheckScreenRiskLevel(context) {
        screenDataService.getCheckScreenRiskLevel(context.state.params, function (response) {
            context.commit('changeChecksRiskLevel', response)
        })
    },
    // stage（致因阶段）的占比
    getCheckScreenStageRatio(context) {
        screenDataService.getCheckScreenStageRatio(context.state.params, function (response) {
            context.commit('changeChecksStageRatio', response)
        })
    },
    // 高风险的隐患描述 前20
    getCheckScreenHighRiskNote(context) {
        screenDataService.getCheckScreenHighRiskNote(context.state.params, function (response) {
            context.commit('changeChecksHighRiskNote', response)
        })
    },
    // 四大专业的隐患图片（各3张）
    getCheckScreenPictureNote(context) {
        screenDataService.getCheckScreenPictureNote(context.state.params, function (response) {
            context.commit('changeChecksPictureNote', response)
        })
    },
    // 下方表格
    getCheckScreenTable(context) {
        screenDataService.getCheckScreenTable(context.state.params, function (response) {
            context.commit('changeChecksTable', response)
        })
    },

    getProvinceInfo(context) {
        screenDataService.getProvinceInfo(context.state.params, function (response) {
            context.commit('changeProvinceInfo', response)
        })
    },

    // 项目专业大屏
    // 隐患数量
    getProjectMajorRiskNum(context) {
        screenDataService.getProjectMajorRiskNum(context.state.params, function (response) {
            context.commit('changeProjectMajorRiskNum', response)
        })
    },
    // 不同专业的隐患数量
    getProjectMajorMajorRatio(context) {
        screenDataService.getProjectMajorMajorRatio(context.state.params, function (response) {
            context.commit('changeProjectMajorMajorRatio', response)
        })
    },
    // 隐患数量排行 前10
    getProjectMajorNoteTop(context) {
        screenDataService.getProjectMajorNoteTop(context.state.params, function (response) {
            context.commit('changeProjectMajorNoteTop', response)
        })
    },
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    getProjectMajorInfo(context) {
        screenDataService.getProjectMajorInfo(context.state.projectm_params, function (response) {
            context.commit('changeProjectMajorInfo', response)
        })
    },
    // 不同致因阶段的不同系统下的数量
    getProjectMajorStageSystemInfo(context) {
        screenDataService.getProjectMajorStageSystemInfo(context.state.projectm_params, function (response) {
            context.commit('changeProjectMajorStageSystemInfo', response)
        })
    },
    // 不同风险等级的不同系统下的数量
    getProjectMajorRiskLevelSystemInfo(context) {
        screenDataService.getProjectMajorRiskLevelSystemInfo(context.state.projectm_params, function (response) {
            context.commit('changeProjectMajorRiskLevelSystemInfo', response)
        })
    },
    // 不同分布区域的不同系统下的数量
    getProjectMajorAreaSystemInfo(context) {
        screenDataService.getProjectMajorAreaSystemInfo(context.state.projectm_params, function (response) {
            context.commit('changeProjectMajorAreaSystemInfo', response)
        })
    },
    // 某专业的高风险隐患数量排行
    getProjectMajorHighRisk(context) {
        screenDataService.getProjectMajorHighRisk(context.state.projectm_params, function (response) {
            context.commit('changeProjectMajorHighRisk', response)
        })
    },
    // 下方表格
    getProjectMajorTable(context) {
        screenDataService.getProjectMajorTable(context.state.params, function (response) {
            context.commit('changeProjectMajorTable', response)
        })
    },

    // 检查专业大屏
    // 隐患数量
    getCheckMajorRiskNum(context) {
        screenDataService.getCheckMajorRiskNum(context.state.params, function (response) {
            context.commit('changeCheckMajorRiskNum', response)
        })
    },
    // 不同专业的隐患数量
    getCheckMajorMajorRatio(context) {
        screenDataService.getCheckMajorMajorRatio(context.state.params, function (response) {
            context.commit('changeCheckMajorMajorRatio', response)
        })
    },
    // 隐患数量排行 前10
    getCheckMajorNoteTop(context) {
        screenDataService.getCheckMajorNoteTop(context.state.params, function (response) {
            context.commit('changeCheckMajorNoteTop', response)
        })
    },
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    getCheckMajorInfo(context) {
        screenDataService.getCheckMajorInfo(context.state.checkm_params, function (response) {
            context.commit('changeCheckMajorInfo', response)
        })
    },
    // 不同致因阶段的不同系统下的数量
    getCheckMajorStageSystemInfo(context) {
        screenDataService.getCheckMajorStageSystemInfo(context.state.checkm_params, function (response) {
            context.commit('changeCheckMajorStageSystemInfo', response)
        })
    },
    // 不同风险等级的不同系统下的数量
    getCheckMajorRiskLevelSystemInfo(context) {
        screenDataService.getCheckMajorRiskLevelSystemInfo(context.state.checkm_params, function (response) {
            context.commit('changeCheckMajorRiskLevelSystemInfo', response)
        })
    },
    // 不同分布区域的不同系统下的数量
    getCheckMajorAreaSystemInfo(context) {
        screenDataService.getCheckMajorAreaSystemInfo(context.state.checkm_params, function (response) {
            context.commit('changeCheckMajorAreaSystemInfo', response)
        })
    },
    // 某专业的高风险隐患数量排行
    getCheckMajorHighRisk(context) {
        screenDataService.getCheckMajorHighRisk(context.state.checkm_params, function (response) {
            context.commit('changeCheckMajorHighRisk', response)
        })
    },
    // 下方表格
    getCheckMajorTable(context) {
        screenDataService.getCheckMajorTable(context.state.params, function (response) {
            context.commit('changeCheckMajorTable', response)
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

    changeProvinceInfo(state, data) {
        state.province_info = data.data
    },

    // 项目专业大屏
    // 向后端发送的参数，
    changeProjectMajorParams(state, data) {
        state.projectm_params = data.projectm_params
    },
    // 隐患数量
    changeProjectMajorRiskNum(state, data) {
        state.projectm_risk_num = data.data
    },
    // 不同专业的隐患数量
    changeProjectMajorMajorRatio(state, data) {
        state.projectm_major_ratio = data.data
    },
    // 隐患数量排行 前10
    changeProjectMajorNoteTop(state, data) {
        state.projectm_note_top = data.data
    },
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    changeProjectMajorInfo(state, data) {
        state.projectm_info = data.data
    },
    // 不同致因阶段的不同系统下的数量
    changeProjectMajorStageSystemInfo(state, data) {
        state.projectm_stage_system_info = data.data
    },
    // 不同风险等级的不同系统下的数量
    changeProjectMajorRiskLevelSystemInfo(state, data) {
        state.projectm_risk_level_system_info = data.data
    },
    // 不同分布区域的不同系统下的数量
    changeProjectMajorAreaSystemInfo(state, data) {
        state.projectm_area_system_info = data.data
    },
    // 某专业的高风险隐患数量排行
    changeProjectMajorHighRisk(state, data) {
        state.projectm_high_risk = data.data
    },
    // 下方表格
    changeProjectMajorTable(state, data) {
        state.projectm_table = data.data
    },

    // 检查专业大屏
    // 向后端发送的参数，
    changeCheckMajorParams(state, data) {
        state.checkm_params = data.checkm_params
    },
    // 隐患数量
    changeCheckMajorRiskNum(state, data) {
        state.checkm_risk_num = data.data
    },
    // 不同专业的隐患数量
    changeCheckMajorMajorRatio(state, data) {
        state.checkm_major_ratio = data.data
    },
    // 隐患数量排行 前10
    changeCheckMajorNoteTop(state, data) {
        state.checkm_note_top = data.data
    },
    // 某专业发现的隐患数量 以及某专业下的风险种类数量 以及高风险图片
    changeCheckMajorInfo(state, data) {
        state.checkm_info = data.data
    },
    // 不同致因阶段的不同系统下的数量
    changeCheckMajorStageSystemInfo(state, data) {
        state.checkm_stage_system_info = data.data
    },
    // 不同风险等级的不同系统下的数量
    changeCheckMajorRiskLevelSystemInfo(state, data) {
        state.checkm_risk_level_system_info = data.data
    },
    // 不同分布区域的不同系统下的数量
    changeCheckMajorAreaSystemInfo(state, data) {
        state.checkm_area_system_info = data.data
    },
    // 某专业的高风险隐患数量排行
    changeCheckMajorHighRisk(state, data) {
        state.checkm_high_risk = data.data
    },
    // 下方表格
    changeCheckMajorTable(state, data) {
        state.checkm_table = data.data
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}