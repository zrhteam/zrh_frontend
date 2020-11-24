import Vue from 'vue'
import axios from 'axios'

// Vue.use(axios);
Vue.prototype.axios = axios

const dataServerUrl = "http://localhost:5000/api";
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

//overview页面地图部分
/*
    在得到每个项目的经纬度后
    发送所有项目code
    请求每个项目的各风险等级对应的数量
 */
/*
function getPrjPie(params, callback){
  const url = `${dataServerUrl}/overview_pie`;
  axios.post(url, params)
       .then(response => {
            callback(response.data)
       })
       .catch(error=> {
            console.log(error)
       })
}
*/


// //overview页面右侧初始化数据加载
//
// function getInitData(callback){
//   const url = `${dataServerUrl}/overview_right_init`;
//   axios.post(url)
//        .then(response => {
//             callback(response.data)
//        })
//        .catch(error=> {
//             console.log(error)
//        })
// }


//置地总部EHS数据大屏页面
/*
*FunctionName: getInitIndexData
* Purpose: 初始化页面显示不同专业（消防、电梯、电气、燃气）的危险指数
* Parameter: cust_name
* Return: 包含消防、电梯、电气、燃气危险指数的json文件
 */
//初始化页面需要数据：消防危险指数、电梯危险指数、电气危险指数、燃气危险指数
function getInitIndexData(param,callback){
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
*FunctionName: getInitRectification
* Purpose: 初始化页面显示总部整改率
* Parameter: cust_name
* Return: 包含总部整改率数据的json文件
 */
function getInitRectification(param, callback){
  const url = `${dataServerUrl}/land_ehs_screen_rectification`;
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
* Parameter: cust_name
* Return: 风险等级及对应的累计隐患数量的json文件
 */
function getInitRiskLevelData(param, callback){
  const url = `${dataServerUrl}/land_ehs_screen_top_right`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
          })
      .catch( error => {
            console.log(error)
          }
      )

}

//置地总部EHS数据大屏页面
/*
*FunctionName: getInitRiskIndexData
* Purpose: 初始化页面显示根据项目综合&专业风险指数排序的结果
* Parameter: cust_name
* Return: 根据项目综合&专业风险指数排序后的项目名称的json文件
 */
function getInitRiskIndexData(param, callback){
    const url = `${dataServerUrl}/land_ehs_screen_index_rank`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
            }
        )
        .catch( error =>{
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getInitRiskNumberRank
* Purpose: 初始化页面得到按照高风险数量排名的项目名称
* Parameter: cust_name
* Return: 对高风险数量排序后的项目名称json文件
 */
function getInitRiskNumberRank(param, callback){
    const url = `${dataServerUrl}/land_ehs_screen_risk_number`;
    axios.post(url, param)
        .then(response => {
              callback(response.data)
            }
        )
        .catch( error => {
            console.log(error)
        })
}

//置地总部EHS数据大屏页面
/*
*FunctionName: getInitImage
* Purpose: 初始化时得到所有项目未整改高风险隐患图片
* Parameter: cust_name
* Return: 返回包含未整改高风险图片的json文件
 */
function getInitImage(param, callback){
    const url = `${dataServerUrl}/land_ehs_screen_image`;
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
*FunctionName: getInitNumberTop
* Purpose: 初始化页面得到所有项目中出现隐患数量排名前10的隐患
* Parameter: cust_name
* Return: 包含在置地总部所有项目中隐患数量排名前10的隐患描述的json文件
 */
function getInitNumberTop(param, callback){
    const url = `${dataServerUrl}/data_ehs_screen_top10`;
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
function getRegionInitIndex(param, callback){
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
*FunctionName: getInitRegionProjectNumber
* Purpose: 初始化页面展示目前已检查的项目数量
* Parameter: ctr_name
* Return: 包含当前已检查项目数量的json文件
 */
function getInitRegionProjectNumber(param, callback){
  const url = `${dataServerUrl}/region_project_number`;
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
function getInitRegionRiskLevel(param, callback){
  const url = `${dataServerUrl}/region_project_risk_level`;
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
*FunctionName: getInitRegionHighRisk
* Purpose: 初始化页面展示当前未整改高风险隐患描述列表
* Parameter:ctr_name
* Return: 包含当前未整改的高风险隐患描述的json文件
 */
function getInitRegionHighRisk(param, callback){
  const url = `${dataServerUrl}/region_project_high_risk`;
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
* Purpose: 初始化页面展示当前未整改高风险隐患图片
* Parameter: ctr_name
* Return: 包含未整改高风险隐患图片的json文件
 */
function getInitRegionImage(param, callback){
  const url = `${dataServerUrl}/region_project_Image`;
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
*FunctionName: getInitRegionMajor
* Purpose: 初始化页面展示各个项目发现的不同风险等级隐患在不同专业上的分布
* Parameter: ctr_name
* Return: 包含按照项目+专业+风险等级聚类结果的json文件
 */
function getInitRegionMajor(param, callback){
  const url=`${dataServerUrl}/region_major`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse =>{
          console.log(errResponse)
          }
      )
}

//地产事业部页面
/*
*FunctionName: getInitRegionNumberTop
* Purpose: 初始化页面展示在所有项目中数量排名前10的隐患
* Parameter: ctr_name
* Return: 包含隐患数量在当前所有项目中排名前10的隐患描述的json文件
 */
function getInitRegionNumberTop(param, callback){
  const url = `${dataServerUrl}/region_project_number_top`;
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
* Return: 包含按照项目安全指数排序后的项目名称
 */
function getInitRegionSafetyIndex(param, callback){
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
* Parameter: ctr_name
* Return: 包含按照累计出现高风险数量排序后的项目名称
 */
function getInitRegionRiskRank(param, callback){
  const url = `${dataServerUrl}/region_project_risk_rank`;
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
function getInitProjectIndex(param, callback){
  const url = `${dataServerUrl}/region_project_index`;
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
*FunctionName: getInitProjectRectification
* Purpose: 初始化页面展示当前整改率
* Parameter: project_name
* Return: 包含当前项目整改率的json文件
 */
function getInitProjectRectification(param, callback){
  const url = `${dataServerUrl}/region_project_rectification`;
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
function getInitProjectRiskNumber(param, callback){
  const url = `${dataServerUrl}/region_project_risk_number`;
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
*FunctionName: getInitProjectNumberChange
* Purpose: 初始化页面展示历次检查隐患数量变化的情况
* Parameter: project_name
* Return: 包含历次检查的隐患数量的json文件
 */
function getInitProjectNumberChange(param, callback){
  const url = `${dataServerUrl}/region_project_number_change`;
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
*FunctionName: getInitProjectNearestPerception
* Purpose: 初始化页面饼图展示最近一次检查不同专业隐患占比情况
* Parameter: project_name
* Return: 包含消防、电梯、电气、燃气4个专业在最近一次检查中发现隐患数量的json文件
 */
function getInitProjectNearestPerception(param, callback){
  const url = `${dataServerUrl}/region_project_Nearest`;
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
function getInitProjectHistoryPerception(param, callback){
  const url = `${dataServerUrl}/region_project_perception`;
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
*FunctionName: getInitProjectRisk
* Purpose: 初始化页面展示当前未整改的高风险隐患列表
* Parameter: project_name
* Return: 包含当前未整改的高风险隐患描述的json文件
 */
function getInitProjectRisk(param, callback){
  const url = `${dataServerUrl}/region_project_risk`;
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
* Purpose: 初始化页面展示当前未整改高风险隐患图片
* Parameter: project_name
* Return: 包含当前未整改高风险隐患图片的json文件
 */
function getInitProjectImage(param, callback){
  const url = `${dataServerUrl}/region_project_image`;
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
* Purpose: 初始化页面展示不同专业所有隐患子系统占比情况
* Parameter: project_name
* Return: 包含在不同专业情况下属于不同隐患子系统的隐患数量的json文件
 */
function getInitProjectSystem(param, callback){
  const url=`${dataServerUrl}/project_system`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse => {
          console.log(errResponse)
      })
}

//项目级页面
/*
*FunctionName: getInitProjectReason
* Purpose: 初始化页面展示所有隐患在不同专业情况下不同致因阶段的数量
* Parameter: project_name
* Return: 包含在不同专业情况下的隐患在不同致因（运营、施工等）阶段的数量的json文件
 */
function getInitProjectReason(param, callback){
  const url=`${dataServerUrl}/project_reason`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse => {
          console.log(errResponse)
      })
}

//项目级页面
/*
*FunctionName: getInitProjectRegionDistribution
* Purpose: 初始化页面展示在不同专业情况下隐患区域分布情况
* Parameter: project_name
* Return: 包含在不同专业情况下不同区域的隐患数量的json文件
 */
function getInitProjectRegionDistribution(param, callback){
  const url=`${dataServerUrl}/project_distribution`;
  axios.post(url, param)
      .then(response =>{
          callback(response.data)
      }, errResponse => {
          console.log(errResponse)
      })
}

//项目级页面
/*
*FunctionName: getInitProjectRiskTop
* Purpose: 初始化页面展示出现次数排前5的隐患以及所属专业和出现频率
* Parameter: project_name
* Return: 包含route的json文件
 */
function getInitProjectRiskTop(param, callback){
  const url = `${dataServerUrl}/region_project_risk_top`;
  axios.post(url, param)
      .then(response => {
          callback(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}


//get_subgroup_stats

// function getAllRecordsForOneCity(cityId, callback) {
//   const url = `${dataServerUrl}/getallrecords`
//   $http.post(url, {'cityId': cityId}).then(response => {
//     callback(JSON.parse(response.data))
//   }, errResponse => {
//     console.log(errResponse)
//   })
// }
//
// function queryRegionFromBackground(cityId, positions, callback) {
//   const url = `${dataServerUrl}/regionquery`
//   $http.post(url, {'cityId': cityId, 'positions': positions}).then(response => {
//     callback(JSON.parse(response.data))
//   }, errResponse => {
//     console.log(errResponse)
//   })
// }
//
// function queryStreetCollections(cityId, startIndex, number, condition, callback){
//   const url = `${dataServerUrl}/streetsetquery`
//   $http.post(url, {'cityId': cityId, 'startIndex': startIndex, 'number': number, 'condition': condition}).then(response => {
//     callback(JSON.parse(response.data))
//   }, errResponse => {
//     console.log(errResponse)
//   })
// }
//
// function queryRegionCollections(cityId, startIndex, number, condition, callback){
//   const url = `${dataServerUrl}/adregionsetquery`
//   $http.post(url, {'cityId': cityId, 'startIndex': startIndex, 'number': number, 'condition': condition}).then(response => {
//     callback(JSON.parse(response.data))
//   }, errResponse => {
//     console.log(errResponse)
//   })
// }
//
// function queryStatistics(cityId, type, callback){
//   const url = `${dataServerUrl}/statisticsquery`
//   $http.post(url, {'cityId': cityId, 'type': type}).then(response => {
//     callback(JSON.parse(response.data))
//   }, errResponse => {
//     console.log(errResponse)
//   })
// }
//
// function queryAllCityStatics(cityIds, callback){
//   const url = `${dataServerUrl}/allstatisticsquery`
//   $http.post(url, {}).then(response => {
//     callback(JSON.parse(response.data))
//   }, errResponse => {
//     console.log(errResponse)
//   })
// }

export default{
    getLocation,
    //getPrjPie,
    //getInitData,
    getInitIndexData,
    getInitRectification,
    getInitRiskLevelData,
    getInitRiskIndexData,
    getInitRiskNumberRank,
    getInitImage,
    getInitNumberTop,
    getRegionInitIndex,
    getInitRegionProjectNumber,
    getInitRegionRiskLevel,
    getInitRegionHighRisk,
    getInitRegionImage,
    getInitRegionMajor,
    getInitRegionNumberTop,
    getInitRegionSafetyIndex,
    getInitRegionRiskRank,
    getInitProjectIndex,
    getInitProjectRectification,
    getInitProjectRiskNumber,
    getInitProjectNumberChange,
    getInitProjectNearestPerception,
    getInitProjectHistoryPerception,
    getInitProjectRisk,
    getInitProjectImage,
    getInitProjectSystem,
    getInitProjectReason,
    getInitProjectRegionDistribution,
    getInitProjectRiskTop


}