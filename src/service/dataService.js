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

//overview页面地图部分
/*
 * FunctionName: getLocation
 * Purpose:      初始化时得到每个项目的经纬度
 * Parameter:    null
 * Return:       包含经纬度的json
 */
function getLocation(callback) {
    const url = `${dataServerUrl}/overview`;
    axios.post(url)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//login页面查询部分
function getLoginGrant(params, callback) {
    const url = `${dataServerUrl}/login/get_grant`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//总部数据大屏页面
/*
*FunctionName: getHeadDangerIndex
* Purpose: 总部页面显示不同专业（消防、电梯、电气、燃气）的危险指数
* Parameter: head_name
* Return: 包含消防、电梯、电气、燃气危险指数的json文件
 */

//初始化页面需要数据：消防危险指数、电梯危险指数、电气危险指数、燃气危险指数
function getInitIndexData(param, callback) {
    const url = `${dataServerUrl}/land_ehs_screen_top_left`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getInitRiskLevelData
* Purpose: 初始化页面显示隐患风险等级高、中、低风险及其对应的累计隐患数量
* Parameter: head_name
* Return: 风险等级及对应的累计隐患数量的json文件
 */
function getInitRiskLevelData(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_risk_level`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
                console.log(error)
            }
        )

}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadRiskLevelYear
* Purpose: 初始化页面按年份显示高、中、低风险及其对应的累计隐患数量
* Parameter: head_name
* Return: 每年风险等级对应的累计隐患数量的json文件
 */
function getHeadRiskLevelYear(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_risk_level_year`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
                console.log(error)
            }
        )

}

//置地总部EHS数据大屏页面
/*
*FunctionName: getInitRiskIndexData
* Purpose: 初始化页面显示根据项目综合&专业风险指数排序的结果
* Parameter: head_name
* Return: 根据项目综合&专业风险指数排序后的项目名称的json文件
 */
function getInitRiskIndexData(param, callback) {
    const url = `${dataServerUrl}/land_ehs_screen_index_rank`;
    axios.post(url, param)
        .then(response => {
                callback(response.data)
            }
        )
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getInitRiskNumberRank
* Purpose: 初始化页面显示每个区域的高风险数量，并基于此进行排序
* Parameter: head_name
* Return: 属于同一总部每个区域对应的高风险数量json文件
 */
function getInitRiskNumberRank(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_risk_rank`;
    axios.post(url, param)
        .then(response => {
                callback(response.data)
            }
        )
        .catch(error => {
            console.log(error)
        })
}


//置地总部EHS数据大屏页面
/*
*FunctionName: getInitNumberTop
* Purpose: 初始化页面显示在不同条件(专业/系统)下隐患数量排名前top的隐患
* Parameter: head_name, condition， top
* Return: 返回在不同条件(专业/系统)下隐患数量排名前top的隐患描述的json文件
 */
function getInitNumberTop(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_rank_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadOtherNumberTop
* Purpose: 初始化页面显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
* Parameter: head_name, condition， top
* Return: 返回在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述的json文件
 */
function getHeadOtherNumberTop(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_risk_other_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadCheckRank
* Purpose: 初始化页面显示按照检查次数对区域的排名
* Parameter: head_name
* Return: 返回返回每个区域的检查次数的json文件
 */
function getHeadCheckRank(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_check_rank`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadMajorRatio
* Purpose: 初始化页面显示各专业隐患数量占比
* Parameter: head_name
* Return: 返回该总部各专业的隐患数量的json文件
 */
function getHeadMajorRatio(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_major_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadStageRatio
* Purpose: 初始化页面显示各致因阶段的隐患数量占比情况
* Parameter: head_name
* Return: 返回该总部不同致因阶段的隐患数量的json文件
 */
function getHeadStageRatio(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_stage_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadAreaRatio
* Purpose: 初始化页面显示各分布区域的隐患数量占比情况
* Parameter: head_name
* Return: 返回该总部不同分布区域的隐患数量的json文件
 */
function getHeadAreaRatio(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_area_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getHeadProjectRank
* Purpose: 初始化页面显示展示按照项目数量对区域排名
* Parameter: head_name
* Return: 返回该总部每个区域的项目数量的json文件
 */
function getHeadProjectRank(param, callback) {
    const url = `${dataServerUrl}/headquarter/head_region_rank`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionInitIndex
* Purpose: 初始化页面显示总的安全指数以及不同专业的安全指数
* Parameter: ctr_name
* Return: 包含总体安全指数、消防指数、电梯指数、燃气指数、电气指数的json文件
 */
function getRegionInitIndex(param, callback) {
    const url = `${dataServerUrl}/region_index`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionRiskLevelYear
* Purpose: 初始化页面展示按照年份显示该区域各等级风险对应的隐患数量
* Parameter: region_name
* Return: 返回该区域每年各风险等级对应的隐患数量的json文件
 */
function getRegionRiskLevelYear(param, callback) {
    const url = `${dataServerUrl}/region/region_risk_level_year`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//地产事业部页面
/*
*FunctionName: getInitRegionRiskLevel
* Purpose: 初始化页面展示不同风险等级及其对应的累计发现隐患数量
* Parameter: ctr_name
* Return: 包含高、中、低风险对应的累计发现隐患数量的json文件
 */
function getInitRegionRiskLevel(param, callback) {
    const url = `${dataServerUrl}/region/region_risk_level`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//地产事业部页面
/*
*FunctionName: getInitRegionImage
* Purpose: 初始化页面展示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
* Parameter: region_name
* Return: 返回属于同一总部该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述的json文件
 */
function getInitRegionImage(param, callback) {
    const url = `${dataServerUrl}/region/region_high_image`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getInitRegionNumberTop
* Purpose: 初始化页面显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
* Parameter: region_name，condition， top
* Return: 返回在不同筛选条件下（专业/系统）隐患数量排名前top的隐患描述及其出现次数的json文件
 */
function getInitRegionNumberTop(param, callback) {
    const url = `${dataServerUrl}/region/region_rank_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionOtherTop
* Purpose: 初始化页面显示在不同筛选条件（风险等级(1, 2,3, all)/致因阶段/分布区域）下隐患数量排名前top的隐患描述
* Parameter: region_name，condition， top
* Return: 返回在不同筛选条件下（风险等级/致因阶段/分布区域）隐患数量排名前top的隐患描述及其出现次数的json文件
 */
function getRegionOtherTop(param, callback) {
    const url = `${dataServerUrl}/region/region_other_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getInitRegionSafetyIndex
* Purpose: 初始化页面展示按照项目安全指数排名的情况
* Parameter: ctr_name
* Return: 包含按照项目安全指数排序后的项目名称的json文件
 */
function getInitRegionSafetyIndex(param, callback) {
    const url = `${dataServerUrl}/region_project_safety_index`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getInitRegionRiskRank
* Purpose: 初始化页面展示按照累计出现高风险数量排名的项目名称
* Parameter: region_name
* Return: 返回属于同一总部该区域内每个项目的高风险隐患数量的json文件
 */
function getInitRegionRiskRank(param, callback) {
    const url = `${dataServerUrl}/region/region_index_rank`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionCheckRank
* Purpose: 初始化页面展示基于该区域每个项目的检查次数对项目排名
* Parameter: region_name
* Return: 返回该区域每个项目的检查次数的json文件
 */
function getRegionCheckRank(param, callback) {
    const url = `${dataServerUrl}/region/region_check_rank`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionMajorRatio
* Purpose: 初始化页面显示该区域各专业隐患占比情况
* Parameter: region_name
* Return: 返回该区域各专业的隐患数量的json文件
 */
function getRegionMajorRatio(param, callback) {
    const url = `${dataServerUrl}/region/region_major_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionSystemRatio
* Purpose: 初始化页面显示该区域不同专业下各系统隐患占比情况
* Parameter: region_name, major
* Return: 返回该区域不同专业下各系统隐患数量的json文件
 */
function getRegionSystemRatio(param, callback) {
    const url = `${dataServerUrl}/region/region_system_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionStageRatio
* Purpose: 初始化页面显示根据隐患数量显示不同致因阶段的占比情况
* Parameter: region_name
* Return: 返回不同致因阶段的隐患数量的json文件
 */
function getRegionStageRatio(param, callback) {
    const url = `${dataServerUrl}/region/region_stage_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//地产事业部页面
/*
*FunctionName: getRegionAreaRatio
* Purpose: 初始化页面显示根据隐患数量显示不同分布区域的占比情况
* Parameter: region_name
* Return: 返回不同分布区域的隐患数量的json文件
 */
function getRegionAreaRatio(param, callback) {
    const url = `${dataServerUrl}/region/region_area_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//项目级页面
/*
*FunctionName: getInitProjectIndex
* Purpose: 初始化页面展示项目危险指数和不同专业的指数
* Parameter: project_name
* Return: 包含项目危险指数、消防指数、电梯指数、燃气指数、电气指数的json文件
 */
function getInitProjectIndex(param, callback) {
    const url = `${dataServerUrl}/project/project_index`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//项目级页面
/*
*FunctionName: getInitProjectRiskNumber
* Purpose: 初始化页面展示历次发现的不同风险等级的隐患数量
* Parameter: project_name
* Return: 包含不同风险等级及其对应的历次发现的隐患数量的json文件
 */
function getInitProjectRiskLevel(param, callback) {
    const url = `${dataServerUrl}/project/project_risk_level`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getProjectRiskLevelYear
* Purpose: 初始化页面按照年份显示不同风险等级对应的隐患数量
* Parameter: project_name
* Return: 返回不同年份的高中低风险等级对应的隐患数量的json文件
 */
function getProjectRiskLevelYear(param, callback) {
    const url = `${dataServerUrl}/project/project_level_year`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//项目级页面
/*
*FunctionName: getInitProjectHistoryPerception
* Purpose: 初始化页面饼图展示历次检查中不同专业隐患占比情况
* Parameter: project_name
* Return: 包含消防、电梯、电气、燃气4个专业在历次检查中发现的隐患数量的json文件
 */
function getInitProjectHistoryPerception(param, callback) {
    const url = `${dataServerUrl}/project/project_risk_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getInitProjectImage
* Purpose: 初始化页面显示当前项目中最近一次检查top张高风险隐患图片
* Parameter: project_name,top
* Return: 返回当前项目最近一次检查top张高风险隐患图片的json文件
 */
function getInitProjectImage(param, callback) {
    const url = `${dataServerUrl}/project/project_high_image`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getInitProjectSystem
* Purpose: 初始化页面显示在不同专业下属于不同隐患子系统的隐患数量
* Parameter: project_name,major（all， 或者专业名）
* Return: 返回不同专业情况下，属于不同隐患子系统的隐患数量的json文件
 */
function getInitProjectSystem(param, callback) {
    const url = `${dataServerUrl}/project/project_major_system`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        }, errResponse => {
            console.log(errResponse)
        })
}

//项目级页面
/*
*FunctionName: getInitProjectReason
* Purpose: 初始化页面展示所有隐患在不同专业情况下不同致因阶段的数量
* Parameter: project_name, major（all， 或者专业名）
* Return: 包含在不同专业情况下的隐患在不同致因（运营、施工等）阶段的数量的json文件
 */
function getInitProjectReason(param, callback) {
    const url = `${dataServerUrl}/project/project_major_stage`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        }, errResponse => {
            console.log(errResponse)
        })
}

//项目级页面
/*
*FunctionName: getInitProjectRegionDistribution
* Purpose: 初始化页面展示在不同专业情况下隐患区域分布情况
* Parameter: project_name，major（all， 或者专业名）
* Return: 返回在不同专业情况下，隐患区域分布的情况的json文件
 */
function getInitProjectRegionDistribution(param, callback) {
    const url = `${dataServerUrl}/project/project_major_area`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        }, errResponse => {
            console.log(errResponse)
        })
}

//项目级页面
/*
*FunctionName: getInitProjectRiskTop
* Purpose: 初始化页面显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
* Parameter: project_name，condition, top
* Return: 不同筛选条件下，出现次数排名前top的隐患描述及其出现次数的json文件
 */
function getInitProjectRiskTop(param, callback) {
    const url = `${dataServerUrl}/project/project_risk_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getProjectOtherTop
* Purpose: 初始化页面显示在不同筛选条件（风险等级(1, 2,3, all)/致因阶段/分布区域）下，出现次数排名前top的隐患描述
* Parameter: project_name，condition, top
* Return: 返回不同筛选条件下，出现次数排名前top的隐患描述及其出现次数的json文件
 */
function getProjectOtherTop(param, callback) {
    const url = `${dataServerUrl}/project/project_other_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getProjectSystemNumber
* Purpose: 初始化页面显示出现隐患次数排名前10的系统
* Parameter: project_name
* Return: 返回出现隐患次数排名前10的系统名称及出现隐患的次数的json文件
 */
function getProjectSystemNumber(param, callback) {
    const url = `${dataServerUrl}/project/project_system_number`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getProjectDeviceNumber
* Purpose: 初始化页面显示出现隐患次数排名前10的设备
* Parameter: project_name
* Return: 返回出现隐患次数排名前10的设备名称及出现隐患的次数的json文件
 */
function getProjectDeviceNumber(param, callback) {
    // const url = `${dataServerUrl}/project/project_device_number`;
    const url = `${dataServerUrl}/project/project_equipment_number`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getProjectUnitNumber
* Purpose: 初始化页面显示出现隐患次数排名前10的组件
* Parameter: project_name
* Return: 返回出现隐患次数排名前10的组件名称及出现隐患的次数的json文件
 */
function getProjectUnitNumber(param, callback) {
    // const url = `${dataServerUrl}/project/project_unit_number`;
    const url = `${dataServerUrl}/project/project_module_number`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目级页面
/*
*FunctionName: getProjectRules
* Purpose: 初始化页面显示违反次数排名前10的法规及相关条款号和内容
* Parameter: project_name
* Return: 返回违反次数排名前10的法规、违反次数及相关条款号和内容的json文件
 */
function getProjectRules(param, callback) {
    const url = `${dataServerUrl}/project/project_rules`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//以下的对象是每一次检查***************************************

//检查记录
/*
*FunctionName: getCheckRiskLevel
* Purpose: 展示本次检查记录各风险等级的隐患数量
* Parameter: check_name
* Return: 本次检查各等级风险对应的隐患数量的json文件
 */
function getCheckRiskLevel(param, callback) {
    const url = `${dataServerUrl}/check/check_risk_level`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckLevelYear
* Purpose: 按年份显示各风险等级对应的隐患数量
* Parameter: check_name
* Return: 返回每年各风险等级对应的隐患数量的json文件
 */
function getCheckLevelYear(param, callback) {
    const url = `${dataServerUrl}/check/check_level_year`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckRiskRatio
* Purpose: 展示本次检查不同专业的隐患占比情况
* Parameter: check_name
* Return: 本次检查不同专业隐患占比情况的json文件
 */
function getCheckRiskRatio(param, callback) {
    const url = `${dataServerUrl}/check/check_risk_ratio`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//检查记录
/*
*FunctionName: getCheckHighImage
* Purpose: 展示本次检查未整改高风险隐患图片
* Parameter: check_name
* Return: 本次检查未整改高风险隐患图片的json文件
 */
function getCheckHighImage(param, callback) {
    const url = `${dataServerUrl}/check/check_high_image`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
    /*
    *FunctionName: getCheckMajorSystem
    * Purpose: 展示本次检查不同隐患子系统下的隐患数量
    * Parameter: check_name
    * Return: 本次检查不同隐患子系统下的隐患数量的json文件
     */
    function getCheckMajorSystem(param, callback) {
        const url = `${dataServerUrl}/check/check_major_system`;
        axios.post(url, param)
            .then(response => {
                callback(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

//检查记录
/*
*FunctionName: getCheckMajorStage
* Purpose: 展示本次检查不同致因阶段下的隐患数量
* Parameter: check_name
* Return: 本次检查不同致因阶段下的隐患数量的json文件
 */
function getCheckMajorStage(param, callback) {
    const url = `${dataServerUrl}/check/check_major_stage`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckMajorArea
* Purpose: 展示本次检查不同区域下的隐患数量
* Parameter: check_name
* Return: 本次检查不同区域下的隐患数量的json文件
 */
function getCheckMajorArea(param, callback) {
    const url = `${dataServerUrl}/check/check_major_area`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckRiskTop
* Purpose: 显示在当前检查中，不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述及其出现次数
* Parameter: check_name，condition， top
* Return: 返回在不同筛选条件（专业/系统/设备/组件）下，当前检查出现次数排名前top的隐患描述、所属专业和专业次数的json文件
 */
function getCheckRiskTop(param, callback) {
    const url = `${dataServerUrl}/check/check_risk_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//检查记录
/*
*FunctionName: getCheckOtherTop
* Purpose: 显示在当前检查中，不同筛选条件（风险等级(1, 2,3, all)/致因阶段/分布区域）下，出现次数排名前top的隐患描述及其出现次数
* Parameter: check_name，condition， top
* Return: 返回在不同筛选条件（风险等级(1, 2,3, all)/致因阶段/分布区域）下，当前检查出现次数排名前top的隐患描述、所属专业和专业次数的json文件
 */
function getCheckOtherTop(param, callback) {
    const url = `${dataServerUrl}/check/check_other_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckRule
* Purpose: 显示违反次数排名前10的法规、违反次数及其相关条款号和内容
* Parameter: check_name
* Return: 返回违反次数排名前10的法规、违反次数及相关条款号和内容的json文件
 */
function getCheckRule(param, callback) {
    const url = `${dataServerUrl}/check/check_rule`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//检查记录
/*
*FunctionName: getCheckSystem
* Purpose: 显示隐患次数排名前10的系统名称
* Parameter: check_name
* Return: 返回出现隐患次数排名前10的系统名称的json文件
 */
function getCheckSystem(param, callback) {
    const url = `${dataServerUrl}/check/check_system`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckDevice
* Purpose: 显示隐患次数排名前10的设备名称
* Parameter: check_name
* Return: 返回出现隐患次数排名前10的设备名称的json文件
 */
function getCheckDevice(param, callback) {
    // const url = `${dataServerUrl}/check/check_device`;
    const url = `${dataServerUrl}/check/check_equipment`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//检查记录
/*
*FunctionName: getCheckUnit
* Purpose: 显示隐患次数排名前10的组件名称
* Parameter: check_name
* Return: 返回出现隐患次数排名前10的组件名称的json文件
 */
function getCheckUnit(param, callback) {
    // const url = `${dataServerUrl}/check/check_unit`;
    const url = `${dataServerUrl}/check/check_module`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//data analysis
/*
 * FunctionName: getCheckNumber
 * Purpose: 两个对象之间检查次数的对比
 * Parameter: object1, object2
 * Return: 返回两个对象的检查次数
 */
function getCheckNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_check_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getProjectNumber
 * Purpose: 两个对象之间项目数量的对比
 * Parameter: object1, object2
 * Return: 返回两个对象的项目数量
 */
function getProjectNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_project_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getMajorRiskNumber
 * Purpose: 两个对象之间不同专业隐患数量的对比
 * Parameter: object1, object2
 * Return: 返回两个对象不同专业的隐患数量
 */
function getMajorRiskNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_major_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getSystemRiskNumber
 * Purpose: 两个对象之间在同一专业下不同系统的隐患数量的对比
 * Parameter: object1, object2, major
 * Return: 返回两个对象在同一专业下不同系统的隐患数量的对比
 */
function getSystemRiskNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_system_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


/*
 * FunctionName: getDeviceRiskNumber
 * Purpose: 两个对象之间不同设备隐患数量的对比
 * Parameter: object1, object2, system
 * Return: 返回两个对象在同一系统中不同设备对应的隐患数量
 */
function getDeviceRiskNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_equipment_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getUnitRiskNumber
 * Purpose: 两个对象之间不同组件隐患数量的对比
 * Parameter: object1, object2, device
 * Return: 返回两个对象在同一设备下不同组件对应的隐患数量
 */
function getUnitRiskNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_module_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getRiskLevel
 * Purpose: 两个对象之间各风险等级隐患数量的对比
 * Parameter: object1, object2
 * Return: 返回两个对象不同风险等级对应的隐患数量
 */
function getRiskLevel(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_risk_level`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getAreaRisk
 * Purpose: 两个对象之间不同分布区域隐患数量的对比
 * Parameter: object1, object2
 * Return: 返回两个对象在不同分布区域的隐患数量
 */
function getAreaRisk(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_area_risk`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getStageRisk
 * Purpose: 两个对象之间不同致因阶段隐患数量的对比
 * Parameter: object1, object2
 * Return: 返回两个对象在不同致因阶段的隐患数量
 */
function getStageRisk(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_stage_risk`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getTopNumber
 * Purpose: 两个对象之间出现次数前top的隐患的对比
 * Parameter: object1, object2, top
 * Return: 返回两个对象出现次数前top的隐患描述及其出现次数
 */
function getTopNumber(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_top_number`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getLawTop
 * Purpose: 两个对象之间违反次数最多的法规标准的对比
 * Parameter: object1, object2, top
 * Return: 返回两个对象违反次数最多的法规
 */
function getLawTop(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_law_top`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getUnitNumberTop
 * Purpose: 两个对象之间出现隐患次数前top的组件的对比
 * Parameter: object1, object2, top
 * Return: 返回两个对象出现隐患次数前top的组件名
 */
function getUnitNumberTop(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_module_top`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getDeviceNumberTop
 * Purpose: 两个对象之间出现隐患次数前top的设备的对比
 * Parameter: object1, object2, top
 * Return: 返回两个对象出现隐患次数前top的设备名
 */
function getDeviceNumberTop(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_equipment_top`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getSystemNumberTop
 * Purpose: 两个对象之间出现隐患次数前top的系统的对比
 * Parameter: object1, object2, top
 * Return: 返回两个对象出现隐患次数前top的系统名
 */
function getSystemNumberTop(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_system_top`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//得到所有可被授权的对象
function getAllUserName(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_all_user_name`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//    发送授权信息
function postGrantInfo(param, callback) {
    const url = `${dataServerUrl}/analyze/analysis_grant_info`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}



// Analyze Part
/*
 * FunctionName: getAnalyzeInsightList
 * Purpose: 获取所有insight
 * Parameter: None
 * Return: insight list
 */
function getAnalyzeInsightList(param, callback) {
    const url = `${dataServerUrl}/analyze/insight/main`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

/*
 * FunctionName: getAnalyzeRefChartData
 * Purpose: 获取特定的insight的图表所需要的信息
 * Parameter: pid, type
 * Return: 几种图表数据中的一种 (json)
 */
function getAnalyzeRefChartMeta(param, callback) {
    const url = `${dataServerUrl}/analyze/insight/ref`
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}




export default {
    getLoginGrant,
    getLocation,
    getInitIndexData,
    getInitRiskLevelData,
    getInitRiskIndexData,
    getInitRiskNumberRank,
    getInitNumberTop,
    getHeadOtherNumberTop,
    getHeadCheckRank,
    getHeadRiskLevelYear,
    getHeadMajorRatio,
    getHeadStageRatio,
    getHeadAreaRatio,
    getHeadProjectRank,
    getRegionInitIndex,
    getInitRegionRiskLevel,
    getRegionRiskLevelYear,
    getInitRegionImage,
    getInitRegionNumberTop,
    getRegionOtherTop,
    getInitRegionSafetyIndex,
    getInitRegionRiskRank,
    getRegionCheckRank,
    getRegionMajorRatio,
    getRegionSystemRatio,
    getRegionStageRatio,
    getRegionAreaRatio,
    getInitProjectIndex,
    getInitProjectRiskLevel,
    getProjectRiskLevelYear,
    getInitProjectHistoryPerception,
    getInitProjectImage,
    getInitProjectSystem,
    getInitProjectReason,
    getInitProjectRegionDistribution,
    getInitProjectRiskTop,
    getProjectSystemNumber,
    getProjectOtherTop,
    getProjectDeviceNumber,
    getProjectUnitNumber,
    getProjectRules,
    getCheckRiskLevel,
    getCheckLevelYear,
    getCheckRiskRatio,
    getCheckHighImage,
    getCheckMajorSystem,
    getCheckMajorStage,
    getCheckMajorArea,
    getCheckRiskTop,
    getCheckOtherTop,
    getCheckRule,
    getCheckSystem,
    getCheckDevice,
    getCheckUnit,
    getCheckNumber,
    getProjectNumber,
    getMajorRiskNumber,
    getSystemRiskNumber,
    getDeviceRiskNumber,
    getUnitRiskNumber,
    getRiskLevel,
    getAreaRisk,
    getStageRisk,
    getTopNumber,
    getLawTop,
    getUnitNumberTop,
    getDeviceNumberTop,
    getSystemNumberTop,
    getAllUserName,
    postGrantInfo,
    getAnalyzeInsightList,
    getAnalyzeRefChartMeta,
}
