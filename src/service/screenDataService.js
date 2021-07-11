import Vue from 'vue'
import axios from 'axios'

// Vue.use(axios);
Vue.prototype.axios = axios

const dataServerUrl
    = "http://localhost:5000/api";
    // = "http://10.20.39.102:5000/api";
// const dataServerUrl = "/sv-analysis";
// const dataServerUrl = Config.serverLink == ""? "" : Config.serverLink.substring(0,  Config.serverLink.length - 1);
const $http = Vue.http;

/*
 * FunctionName: getHeadScreenRiskNumber
 * Purpose: 总部数据大屏显示隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenRiskNumber(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_risk_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getHeadScreenRiskNumberRank
 * Purpose: 总部数据大屏显示高风险排名
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenRiskNumberRank(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_risk_num_rank`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getHeadScreenMajorNumber
 * Purpose: 总部数据大屏不同专业的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenMajorNumber(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_major_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getHeadScreenCheckNumberRank
 * Purpose: 总部数据大屏隐患项目数量排行
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenCheckNumberRank(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_check_num_rank`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getHeadScreenMajorStageInfo
 * Purpose: 总部数据大屏不同专业下的不同致因阶段
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenMajorStageInfo(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_major_stage_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getHeadScreenAreaNumber
 * Purpose: 总部数据大屏不同分布区域的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenAreaNumber(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_area_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getHeadScreenAreaNumber
 * Purpose: 总部数据大屏下方表格
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getHeadScreenTable(param, callback) {
    const url = `${dataServerUrl}/headquarter_ls/headquarter_ls_table`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenRiskNumber
 * Purpose: 区域数据大屏显示隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenRiskNumber(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_risk_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenRNRank
 * Purpose: 大区数据大屏显示高风险排名
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenRNRank(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_risk_num_rank`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenMajorNumber
 * Purpose: 大区数据大屏不同专业的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenMajorNumber(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_major_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenCNRank
 * Purpose: 大区数据大屏隐患项目数量排行check number
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenCNRank(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_check_num_rank`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenMajorStageInfo
 * Purpose: 大区数据大屏不同专业下的不同致因阶段
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenMajorStageInfo(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_major_stage_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenAreaNumber
 * Purpose: 大区数据大屏不同分布区域的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenAreaNumber(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_area_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRegionScreenAreaNumber
 * Purpose: 大区数据大屏下方表格
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getRegionScreenTable(param, callback) {
    const url = `${dataServerUrl}/region_ls/region_ls_table`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProvinceInfo
 * Purpose: 每个省当前已检查数量和隐患数量
 * Parameter: null
 * Return: (json)
 */
function getProvinceInfo(param, callback) {
    const url = `${dataServerUrl}/province_info/province_check_and_record_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenRiskNumber
 * Purpose: 项目数据大屏不同分布区域的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenRiskNumber(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_risk_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenRNRank(RN risk number)
 * Purpose: 项目数据大屏不同专业的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenRNRank(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_major_ratio`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenRiskLevel
 * Purpose: 项目数据大屏高中低风险的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenRiskLevel(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_risk_level`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenStageRatio
 * Purpose: 项目数据大屏stage（致因阶段）的占比
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenStageRatio(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_stage_ratio`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenHighRiskNote
 * Purpose: 项目数据大屏高风险的隐患描述 前20
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenHighRiskNote(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_high_risk_note`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenPictureNote
 * Purpose: 项目数据大屏四大专业的隐患图片（各3张）
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenPictureNote(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_picture_note`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectScreenTable
 * Purpose: 项目数据大屏下方表格
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectScreenTable(param, callback) {
    const url = `${dataServerUrl}/project_ls/project_ls_table`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckScreenRiskNumber
 * Purpose: 检查数据大屏隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenRiskNumber(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_risk_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckScreenRNRank RiskNumber
 * Purpose: 检查数据大屏不同专业的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenRNRank(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_major_ratio`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


/*
 * FunctionName: getCheckScreenRiskLevel
 * Purpose: 检查数据大屏高中低风险的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenRiskLevel(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_risk_level`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckScreenStageRatio
 * Purpose: 检查数据大屏stage（致因阶段）的占比
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenStageRatio(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_stage_ratio`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckScreenHighRiskNote
 * Purpose: 检查数据大屏高风险的隐患描述 前20
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenHighRiskNote(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_high_risk_note`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckScreenPictureNote
 * Purpose: 检查数据大屏四大专业的隐患图片（各3张）
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenPictureNote(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_picture_note`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckScreenTable
 * Purpose: 检查数据大屏下方表格
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckScreenTable(param, callback) {
    const url = `${dataServerUrl}/check_ls/check_ls_table`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorRiskNum
 * Purpose: 项目专业大屏隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorRiskNum(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_risk_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorMajorRatio
 * Purpose: 项目专业大屏不同专业的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorMajorRatio(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_major_ratio`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorNoteTop
 * Purpose: 项目专业大屏隐患数量排行前10
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorNoteTop(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_note_top_10`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorInfo
 * Purpose: 项目专业大屏某专业发现的隐患数量 以及消防专业下的风险种类数量 以及高风险图片
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorInfo(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorStageSystemInfo
 * Purpose: 项目专业大屏不同致因阶段的不同系统下的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorStageSystemInfo(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_stage_system_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorRiskLevelSystemInfo
 * Purpose: 项目专业大屏不同风险等级的不同系统下的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorRiskLevelSystemInfo(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_stage_system_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorAreaSystemInfo
 * Purpose: 项目专业大屏不同分布区域的不同系统下的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorAreaSystemInfo(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_area_system_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorHighRisk
 * Purpose: 项目专业大屏消防专业的高风险隐患数量排行
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorHighRisk(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_high_risk`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectMajorTable
 * Purpose: 项目专业大屏下方表格
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getProjectMajorTable(param, callback) {
    const url = `${dataServerUrl}/project_major_ls/project_major_ls_table`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorRiskNum
 * Purpose: 检查专业大屏隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorRiskNum(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_risk_num`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorMajorRatio
 * Purpose: 检查专业大屏不同专业的隐患数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorMajorRatio(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_major_ratio`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorNoteTop
 * Purpose: 检查专业大屏隐患数量排行前10
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorNoteTop(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_note_top_10`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorInfo
 * Purpose: 检查专业大屏某专业发现的隐患数量 以及消防专业下的风险种类数量 以及高风险图片
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorInfo(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorStageSystemInfo
 * Purpose: 检查专业大屏不同致因阶段的不同系统下的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorStageSystemInfo(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_stage_system_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorRiskLevelSystemInfo
 * Purpose: 检查专业大屏不同风险等级的不同系统下的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorRiskLevelSystemInfo(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_risk_level_system_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorAreaSystemInfo
 * Purpose: 检查专业大屏不同分布区域的不同系统下的数量
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorAreaSystemInfo(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_area_system_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorHighRisk
 * Purpose: 检查专业大屏消防专业的高风险隐患数量排行
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorHighRisk(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_high_risk`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getCheckMajorTable
 * Purpose: 检查专业大屏下方表格
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getCheckMajorTable(param, callback) {
    const url = `${dataServerUrl}/check_major_ls/check_major_ls_table`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export default {
    getHeadScreenRiskNumber,
    getHeadScreenRiskNumberRank,
    getHeadScreenMajorNumber,
    getHeadScreenCheckNumberRank,
    getHeadScreenMajorStageInfo,
    getHeadScreenAreaNumber,
    getHeadScreenTable,
    getRegionScreenRiskNumber,
    getRegionScreenRNRank,
    getRegionScreenMajorNumber,
    getRegionScreenCNRank,
    getRegionScreenMajorStageInfo,
    getRegionScreenAreaNumber,
    getRegionScreenTable,
    getProvinceInfo,

    getProjectScreenRiskNumber,
    getProjectScreenRNRank,
    getProjectScreenRiskLevel,
    getProjectScreenStageRatio,
    getProjectScreenHighRiskNote,
    getProjectScreenPictureNote,
    getProjectScreenTable,
    getCheckScreenRiskNumber,
    getCheckScreenRNRank,
    getCheckScreenRiskLevel,
    getCheckScreenStageRatio,
    getCheckScreenHighRiskNote,
    getCheckScreenPictureNote,
    getCheckScreenTable,

    getProjectMajorRiskNum,
    getProjectMajorMajorRatio,
    getProjectMajorNoteTop,
    getProjectMajorInfo,
    getProjectMajorStageSystemInfo,
    getProjectMajorRiskLevelSystemInfo,
    getProjectMajorAreaSystemInfo,
    getProjectMajorHighRisk,
    getProjectMajorTable,

    getCheckMajorRiskNum,
    getCheckMajorMajorRatio,
    getCheckMajorNoteTop,
    getCheckMajorInfo,
    getCheckMajorStageSystemInfo,
    getCheckMajorRiskLevelSystemInfo,
    getCheckMajorAreaSystemInfo,
    getCheckMajorHighRisk,
    getCheckMajorTable,

}