import Vue from 'vue'
import axios from 'axios'

Vue.use(axios);

const dataServerUrl = "http://localhost:5000/api";
// const dataServerUrl = "/sv-analysis";
// const dataServerUrl = Config.serverLink == ""? "" : Config.serverLink.substring(0,  Config.serverLink.length - 1);
const $http = Vue.http;

//overview页面地图部分
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

//overview页面根据项目名称查询
function getProjectName(params, callback){
  const url = `${dataServerUrl}/overview_prjname`;
  axios.post(url, params).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}

//overview页面右侧初始化数据加载
function getInitData(callback){
  const url = `${dataServerUrl}/overview_right_init`;
  axios.post(url)
       .then(response => {
            callback(response.data)
       })
       .catch(error=> {
            console.log(error)
       })
}

//置地总部EHS数据大屏页面
function getLandHeadquarters(callback){
  const url = `${dataServerUrl}/land_headquarters`
  $http.get(url).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}

function getTestScatterPlot(callback){
  const url = `${dataServerUrl}/testscatterplot`
  $http.get(url).then(response => {

    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}
function getTestData (callback) {
  const url = `${dataServerUrl}/test`
  $http.get(url).then(response => {
    callback(JSON.parse(response.data))
  }, errResponse => {
    console.log(errResponse)
  })
}


function getUnitsStats(mid, callback) {
  const url = `${dataServerUrl}/all_units_stats`;
  $http.post(url, {'mid': mid}).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}

function getFeatureStats(mid, callback) {
  const url = `${dataServerUrl}/all_feature_stats`
  $http.post(url, {'mid': mid}).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}

function getAllStats(mid, nc, callback) {
  const url = `${dataServerUrl}/all_stats`;
  $http.post(url, {'mid': mid, 'nc': nc}).then(response => {
    console.log("response data:",response.data)
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}



function getGradientsAndIO(mid, tid, callback) {
  const url = `${dataServerUrl}/cell_input_output`
  $http.post(url, {'mid': mid, 'tid': tid}).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}


function getFeatureValues(mid, features, callback) {
  const url = `${dataServerUrl}/feature_values`
  $http.post(url, {'mid': mid, 'features': features}).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
  })
}


function getSubgroupStats(mid, selectFeatures, selectUnits, r_len,  dif_type, callback) {
  const url = `${dataServerUrl}/subgroup_stats`
  $http.post(url, {'mid': mid, 'feature_scales': selectFeatures, 'units':'selectUnits',  "r_len": r_len, "dif_type": dif_type}).then(response => {
    callback(response.data)
  }, errResponse => {
    console.log(errResponse)
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
  getProjectName,
  getInitData,
  getLandHeadquarters,
  getFeatureValues,
  getTestData,
  getGradientsAndIO,
  getSubgroupStats,
  getUnitsStats,
  getFeatureStats,
  getAllStats

}