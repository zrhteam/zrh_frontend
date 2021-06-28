import Vue from 'vue'
import axios from 'axios'

Vue.prototype.axios = axios

const dataServerUrl
    = "http://localhost:5000/api/analyze/insight_func";

const $http = Vue.http;

//红线问题
/*
 * FunctionName: getAnalyzeRedlineData
 * Purpose:      红线问题
 * Parameter:    check_key, start, end, flag
 * Return:       红线json
 */
function getAnalyzeRedlineData(callback) {
    const url = `${dataServerUrl}/red_line`;
    axios.post(url)
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
function getAnalyzeTendencyHeadquarter(callback) {
    const url = `${dataServerUrl}/tendency_headquarter`;
    axios.post(url)
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
function getAnalyzeTendencyRegion(callback) {
    const url = `${dataServerUrl}/tendency_region`;
    axios.post(url)
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
function getAnalyzeTendencyProject(callback) {
    const url = `${dataServerUrl}/tendency_project`;
    axios.post(url)
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
function getAnalyzeTendencyProfession(callback) {
    const url = `${dataServerUrl}/tendency_profession`;
    axios.post(url)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

//总部趋势图
/*
 * FunctionName: getAnalyzeRatioHeadquarter
 * Purpose:      总部趋势图
 * Parameter:    headquarter_name, major_name, start, end
 * Return:       json
 */
function getAnalyzeRatioHeadquarter(callback) {
    const url = `${dataServerUrl}/ratio_headquarter`;
    axios.post(url)
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
function getAnalyzeTendencyRegion(callback) {
    const url = `${dataServerUrl}/tendency_region`;
    axios.post(url)
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
function getAnalyzeTendencyProject(callback) {
    const url = `${dataServerUrl}/tendency_project`;
    axios.post(url)
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
function getAnalyzeTendencyProfession(callback) {
    const url = `${dataServerUrl}/tendency_profession`;
    axios.post(url)
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}