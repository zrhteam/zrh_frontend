import Vue from 'vue'
import axios from 'axios'

// Vue.use(axios);
Vue.prototype.axios = axios

const dataServerUrl = "http://10.20.39.102:5000/api";//http://10.20.39.102:5000/api
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
function getLocation(callback){
  const url = `${dataServerUrl}/overview`;
  axios.post(url)
       .then(response => {
            callback(response.data)
       })
       .catch(error=> {
            console.log(error)
       })
}

//login页面查询部分
function getLoginGrant(params, callback){
    const url = `${dataServerUrl}/login_grant`;
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
* Purpose: 总部页面显示总的，以及不同专业（消防、电梯、电气、燃气）的危险指数
* Parameter: head_name
* Return: 包含总的，消防、电梯、电气、燃气危险指数的json文件
 */
//总部页面需要数据：消防危险指数、电梯危险指数、电气危险指数、燃气危险指数
function getHeadDangerIndex(param,callback){
  const url = `${dataServerUrl}/head_index`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//总部数据大屏页面
/*
*FunctionName: getRectification
* Purpose: 显示总部整改率
* Parameter: head_name
* Return: 包含总部整改率数据的json文件
 */
function getRectification(param, callback){
  const url = `${dataServerUrl}/head_rectification`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//总部数据大屏页面
/*
*FunctionName: getHeadRiskLevel
* Purpose: 初始化页面显示隐患风险等级高、中、低风险及其对应的累计隐患数量
* Parameter: head_name
* Return: 风险等级及对应的累计隐患数量的json文件
 */
function getHeadRiskLevel(param, callback){
  const url = `${dataServerUrl}/head_risk_level`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
          })
      .catch( error => {
            console.log(error)
          }
      )

}

//总部数据大屏页面
/*
*FunctionName: getHeadIndexRank
* Purpose: 显示根据项目综合&专业风险指数排序的结果
* Parameter: head_name
* Return: 根据项目综合&专业风险指数排序后的项目名称的json文件
 */
function getHeadIndexRank(param, callback){
    const url = `${dataServerUrl}/head_index_rank`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
            }
        )
        .catch( error =>{
            console.log(error)
        })
}

//总部数据大屏页面
/*
*FunctionName: getHeadRiskRank
* Purpose: 初始化页面得到按照高风险数量排名的项目名称
* Parameter: head_name
* Return: 对高风险数量排序后的项目名称json文件
 */
function getHeadRiskRank(param, callback){
    const url = `${dataServerUrl}/head_risk_rank`;
    axios.post(url, param)
        .then(response => {
              callback(response.data)
            }
        )
        .catch( error => {
            console.log(error)
        })
}

//总部数据大屏页面
/*
*FunctionName: getHeadHighImage
* Purpose: 得到当前总部所有项目未整改高风险隐患图片
* Parameter: head_name
* Return: 返回包含未整改高风险图片的json文件
 */
function getHeadHighImage(param, callback){
    const url = `${dataServerUrl}/head_high_image`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//总部数据大屏页面
/*
*FunctionName: getHeadRankTop
* Purpose: 得到所有项目中出现隐患数量排名前10的隐患
* Parameter: head_name
* Return: 包含在置地总部所有项目中隐患数量排名前10的隐患描述的json文件
 */
function getHeadRankTop(param, callback){
    const url = `${dataServerUrl}/head_rank_top`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//总部数据大屏页面
/*
*FunctionName: getHeadRiskList
* Purpose: 得到当前总部所有项目中未整改高风险隐患
* Parameter: head_name
* Return: 当前总部所有项目中未整改高风险隐患列表的json文件
 */
function getHeadRiskList(param, callback){
    const url = `${dataServerUrl}/head_risk_list`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}


//区域级页面
/*
*FunctionName: getRegionInitIndex
* Purpose: 区域级页面显示总的安全指数以及不同专业的安全指数
* Parameter: region_name
* Return: 包含总体安全指数、消防指数、电梯指数、燃气指数、电气指数的json文件
 */
function getRegionIndex(param, callback){
    const url = `${dataServerUrl}/region_index`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//区域级页面
/*
*FunctionName: getRectificationNumber
* Purpose: 区域级页面展示目前已检查的项目数量
* Parameter: region_name
* Return: 包含当前已检查项目数量的json文件
 */
function getRectificationNumber(param, callback){
  const url = `${dataServerUrl}/region_rectification_number`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}


//区域级页面
/*
*FunctionName: getRegionRiskLevel
* Purpose: 区域级页面展示不同风险等级及其对应的累计发现隐患数量
* Parameter: region_name
* Return: 包含高、中、低风险对应的累计发现隐患数量的json文件
 */
function getRegionRiskLevel(param, callback){
  const url = `${dataServerUrl}/region_risk_level`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//区域级页面
/*
*FunctionName: getRegionRiskList
* Purpose: 区域级页面展示当前未整改高风险隐患描述列表
* Parameter:region_name
* Return: 包含当前未整改的高风险隐患描述的json文件
 */
function getRegionRiskList(param, callback){
  const url = `${dataServerUrl}/region_risk_list`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//区域级页面
/*
*FunctionName: getRegionHighImage
* Purpose: 初始化页面展示当前未整改高风险隐患图片
* Parameter: region_name
* Return: 包含未整改高风险隐患图片的json文件
 */
function getRegionHighImage(param, callback){
  const url = `${dataServerUrl}/region_high_image`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//区域级页面
/*
*FunctionName: getRegionDistribution
* Purpose: 初始化页面展示各个项目发现的不同风险等级隐患在不同专业上的分布
* Parameter: region_name
* Return: 包含按照项目+专业+风险等级聚类结果的json文件
 */
function getRegionDistribution(param, callback){
  const url=`${dataServerUrl}/region_distribution`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse =>{
          console.log(errResponse)
          }
      )
}

//区域级页面
/*
*FunctionName: getRegionRankTop
* Purpose: 初始化页面展示在所有项目中数量排名前10的隐患
* Parameter: region_name
* Return: 包含隐患数量在当前所有项目中排名前10的隐患描述的json文件
 */
function getRegionRankTop(param, callback){
  const url = `${dataServerUrl}/region_rank_top`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//区域级页面
/*
*FunctionName: getRegionIndexRank
* Purpose: 区域级页面展示按照项目安全指数排名的情况
* Parameter: region_name
* Return: 包含按照项目安全指数排序后的项目名称
 */
function getRegionIndexRank(param, callback){
  const url = `${dataServerUrl}/region_index_rank`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

//区域级页面
/*
*FunctionName: getRegionRiskNumber
* Purpose: 区域级页面展示按照累计出现高风险数量排名的项目名称
* Parameter: region_name
* Return: 包含按照累计出现高风险数量排序后的项目名称
 */
function getRegionRiskNumber(param, callback){
  const url = `${dataServerUrl}/region_risk_number`;
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
*FunctionName: getProjectIndex
* Purpose: 项目级页面展示项目危险指数和不同专业的指数
* Parameter: project_name
* Return: 包含项目危险指数、消防指数、电梯指数、燃气指数、电气指数的json文件
 */
function getProjectIndex(param, callback){
  const url = `${dataServerUrl}/project_index`;
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
*FunctionName: getProjectRectification
* Purpose: 项目级页面展示当前整改率
* Parameter: project_name
* Return: 包含当前项目整改率的json文件
 */
function getProjectRectification(param, callback){
  const url = `${dataServerUrl}/project_rectification`;
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
*FunctionName: getProjectRiskLevel
* Purpose: 初始化页面展示历次发现的不同风险等级的隐患数量
* Parameter: project_name
* Return: 包含不同风险等级及其对应的历次发现的隐患数量的json文件
 */
function getProjectRiskLevel(param, callback){
  const url = `${dataServerUrl}/project_risk_level`;
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
*FunctionName: getProjectRiskChange
* Purpose: 初始化页面展示历次检查隐患数量变化的情况
* Parameter: project_name
* Return: 包含历次检查的隐患数量的json文件
 */
function getProjectRiskChange(param, callback){
  const url = `${dataServerUrl}/project_risk_change`;
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
*FunctionName: getProjectRiskRatio
* Purpose: 项目级页面饼图展示历次检查中不同专业隐患占比情况
* Parameter: project_name
* Return: 包含不同专业在历次检查中发现的隐患数量的占比的json文件
 */
function getProjectRiskRatio(param, callback){
  const url = `${dataServerUrl}/project_risk_ratio`;
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
*FunctionName: getProjectHighRisk
* Purpose: 初始化页面展示当前未整改的高风险隐患列表
* Parameter: project_name
* Return: 包含当前未整改的高风险隐患描述的json文件
 */
function getProjectHighRisk(param, callback){
  const url = `${dataServerUrl}/project_high_risk`;
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
*FunctionName: getProjectHighImage
* Purpose: 初始化页面展示当前未整改高风险隐患图片
* Parameter: project_name
* Return: 包含当前未整改高风险隐患图片的json文件
 */
function getProjectHighImage(param, callback){
  const url = `${dataServerUrl}/project_high_image`;
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
*FunctionName: getProjectMajorSystem
* Purpose: 项目级页面展示不同专业所有隐患子系统占比情况
* Parameter: project_name
* Return: 包含在不同专业情况下属于不同隐患子系统的隐患数量的json文件
 */
function getProjectMajorSystem(param, callback){
  const url=`${dataServerUrl}/project_major_system`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse => {
          console.log(errResponse)
      })
}

//项目级页面
/*
*FunctionName: getProjectMajorStage
* Purpose: 项目级页面展示所有隐患在不同专业情况下不同致因阶段的数量
* Parameter: project_name
* Return: 包含在不同专业情况下的隐患在不同致因（运营、施工等）阶段的数量的json文件
 */
function getProjectMajorStage(param, callback){
  const url=`${dataServerUrl}/project_major_stage`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse => {
          console.log(errResponse)
      })
}

//项目级页面
/*
*FunctionName: getProjectMajorArea
* Purpose: 项目级页面展示在不同专业情况下隐患区域分布情况
* Parameter: project_name
* Return: 包含在不同专业情况下不同区域的隐患数量的json文件
 */
function getProjectMajorArea(param, callback){
  const url=`${dataServerUrl}/project_major_area`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse => {
          console.log(errResponse)
      })
}

//项目级页面
/*
*FunctionName: getProjectRiskTop
* Purpose: 初始化页面展示出现次数排前5的隐患以及所属专业和出现频率
* Parameter: project_name
* Return: 包含route的json文件
 */
function getProjectRiskTop(param, callback){
  const url = `${dataServerUrl}/project_risk_top`;
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
*FunctionName: getCheckRectification
* Purpose: 展示本次检查记录隐患整改率
* Parameter: check_name
* Return: 本次检查隐患整改率的json文件
 */
function getCheckRectification(param, callback){
  const url = `${dataServerUrl}/check_rectification`;
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
*FunctionName: getCheckRiskLevel
* Purpose: 展示本次检查记录各风险等级的隐患数量
* Parameter: check_name
* Return: 本次检查各等级风险对应的隐患数量的json文件
 */
function getCheckRiskLevel(param, callback){
  const url = `${dataServerUrl}/check_risk_level`;
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
function getCheckRiskRatio(param, callback){
  const url = `${dataServerUrl}/check_risk_ratio`;
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
*FunctionName: getCheckHighRisk
* Purpose: 展示本次检查未整改高风险隐患描述
* Parameter: check_name
* Return: 本次检查未整改高风险隐患描述的json文件
 */
function getCheckHighRisk(param, callback){
  const url = `${dataServerUrl}/check_high_risk`;
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
function getCheckHighImage(param, callback){
  const url = `${dataServerUrl}/check_high_image`;
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
function getCheckMajorSystem(param, callback){
  const url = `${dataServerUrl}/check_major_system`;
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
function getCheckMajorStage(param, callback){
  const url = `${dataServerUrl}/check_major_stage`;
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
function getCheckMajorArea(param, callback){
  const url = `${dataServerUrl}/check_major_area`;
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
* Purpose: 展示本次检查出现次数排名前5的隐患描述及其所属专业和出现次数
* Parameter: check_name
* Return: 本次检查出现次数排名前5的隐患描述及其所属专业和出现次数的json文件
 */
function getCheckRiskTop(param, callback){
  const url = `${dataServerUrl}/check_risk_top`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}

export default{
    getLocation,
    getLoginGrant,
    //getPrjPie,
    //getInitData,
    getHeadDangerIndex,
    getRectification,
    getHeadRiskLevel,
    getHeadIndexRank,
    getHeadRiskRank,
    getHeadHighImage,
    getHeadRankTop,
    getHeadRiskList,
    getRegionIndex,
    getRegionRiskLevel,
    getRectificationNumber,
    getRegionRiskList,
    getRegionHighImage,
    getRegionDistribution,
    getRegionRankTop,
    getRegionIndexRank,
    getRegionRiskNumber,
    getProjectIndex,
    getProjectRectification,
    getProjectRiskLevel,
    getProjectRiskRatio,
    getProjectHighRisk,
    getProjectHighImage,
    getProjectMajorSystem,
    getProjectMajorStage,
    getProjectMajorArea,
    getProjectRiskTop,
    getProjectRiskChange,
    getCheckRectification,
    getCheckRiskLevel,
    getCheckRiskRatio,
    getCheckHighRisk,
    getCheckHighImage,
    getCheckMajorSystem,
    getCheckMajorStage,
    getCheckMajorArea,
    getCheckRiskTop


}