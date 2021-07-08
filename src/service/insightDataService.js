import Vue from 'vue'
import axios from 'axios'

Vue.prototype.axios = axios

const insightDataServiceUrl
    = "http://localhost:5000/api/analyze/insight_func";

const $http = Vue.http;

//红线问题
/*
 * FunctionName: getAnalyzeRedlineData
 * Purpose:      红线问题
 * Parameter:    check_key, start, end, flag
 * Return:       红线json
 */
function getAnalyzeRedlineData(params,callback) {
    const url = `${insightDataServiceUrl}/red_line`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//总部趋势图
/*
 * FunctionName: getAnalyzeTendencyHeadquarter
 * Purpose:      总部趋势图
 * Parameter:    headquarter_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeTendencyHeadquarter(params,callback) {
    const url = `${insightDataServiceUrl}/tendency_headquarter`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//区域趋势图
/*
 * FunctionName: getAnalyzeTendencyRegion
 * Purpose:      区域趋势图
 * Parameter:    headquarter_name/region_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeTendencyRegion(params,callback) {
    const url = `${insightDataServiceUrl}/tendency_region`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目趋势图
/*
 * FunctionName: getAnalyzeTendencyProject
 * Purpose:      项目趋势图
 * Parameter:    headquarter_name/region_name/project_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeTendencyProject(params,callback) {
    const url = `${insightDataServiceUrl}/tendency_project`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//行业趋势图
/*
 * FunctionName: getAnalyzeTendencyProfession
 * Purpose:      行业趋势图
 * Parameter:    Profession_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeTendencyProfession(params,callback) {
    const url = `${insightDataServiceUrl}/tendency_profession`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//总部隐患各风险等级占比
/*
 * FunctionName: getAnalyzeRatioHeadquarter
 * Purpose:      总部隐患各风险等级占比
 * Parameter:    headquarter_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeRatioHeadquarter(params,callback) {
    const url = `${insightDataServiceUrl}/ratio_headquarter`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//区域隐患各风险等级占比
/*
 * FunctionName: getAnalyzeRatioRegion
 * Purpose:      区域隐患各风险等级占比
 * Parameter:    headquarter_name/region_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeRatioRegion(params,callback) {
    const url = `${insightDataServiceUrl}/ratio_region`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//项目隐患各风险等级占比
/*
 * FunctionName: getAnalyzeRatioProject
 * Purpose:      项目隐患各风险等级占比
 * Parameter:    headquarter_name/region_name/project_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeRatioProject(params,callback) {
    const url = `${insightDataServiceUrl}/ratio_project`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//行业隐患各风险等级占比
/*
 * FunctionName: getAnalyzeRatioProfession
 * Purpose:      行业隐患各风险等级占比
 * Parameter:    Profession_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeRatioProfession(params,callback) {
    const url = `${insightDataServiceUrl}/ratio_profession`;
    axios.post(url, params)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export default {
    getAnalyzeRedlineData,
    getAnalyzeTendencyHeadquarter,
    getAnalyzeTendencyRegion,
    getAnalyzeTendencyProject,
    getAnalyzeTendencyProfession,
    getAnalyzeRatioHeadquarter,
    getAnalyzeRatioRegion,
    getAnalyzeRatioProject,
    getAnalyzeRatioProfession
}