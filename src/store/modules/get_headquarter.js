import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //总部整改率
    rectification: {},
    //隐患高中低风险及其对应的累计隐患数量
    risk_level_data: {},
    //显示根据项目综合&专业风险指数排序的结果
    risk_index_data: {},
    //得到按照高风险数量排名的项目名称
    risk_number_rank: {},
    //未整改高风险图片
    images: {},
    //得到所有项目中出现隐患数量排名前10的隐患
    hidden_danger: {},
    //该总部下当前未整改的高风险隐患列表
    risk_list: {},

    data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的总部整改率
    renderRectification(state) {
        return state.rectification;
    },
    //承载变化的隐患高中低风险及其对应的累计隐患数量
    renderRiskLevelData(state) {
        return state.risk_level_data;
    },
    //显示根据项目综合&专业风险指数排序的结果
    renderRiskIndexData(state) {
        return state.risk_index_data;
    },
    //得到按照高风险数量排名的项目名称
    renderRiskNumberRank(state) {
        return state.risk_number_rank;
    },
    //承载变化的未整改高风险图片
    renderImages(state) {
        return state.images;
    },
    //承载变化的所有项目中出现隐患数量排名前10的隐患
    renderNumberTop(state) {
        return state.hidden_danger;
    },
    //承载变化的总部级级当前所有未整改的高风险隐患列表
    renderRiskList(state) {
        return state.risk_list;
    }

}

//actions
const actions = {
    //得到总部整改率
    getInitRectification(context) {
        dataService.getInitRectification(state.params, function (response) {
            context.commit('changeRectification', response)
        })
    },

    //得到隐患风险等级高、中、低风险及其对应的累计隐患数量
    getInitRiskLevelData(context) {
        dataService.getInitRiskLevelData(state.params, function (response) {
            context.commit('changeRiskLevelData', response)
        })
    },

    //显示根据项目综合&专业风险指数排序的结果
    getInitRiskIndexData(context) {
        dataService.getInitRiskIndexData(state.params, function (response) {
            console.log(response)
            context.commit('changeRiskIndexData', response)
        })
    },

    //得到按照高风险数量排名的项目名称
    getInitRiskNumberRank(context) {
        dataService.getInitRiskNumberRank(state.params, function (response) {
            context.commit('changeRiskNumberRank', response)
        })
    },

    //得到未整改高风险图片
    getInitImage(context) {
        dataService.getInitImage(state.params, function (response) {
            context.commit('changeImage', response)
        })
    },

    //得到所有项目中出现隐患数量排名前10的隐患
    getInitNumberTop(context) {
        dataService.getInitNumberTop(state.params, function (response) {
            context.commit('changeNumberTop', response)
        })
    },

    //得到总部级所有当前未整改的高风险隐患列表
    getInitRiskList(context) {
        dataService.getInitRiskList(state.params, function (response) {
            context.commit('changeRiskLevelList', response)
        })
    },
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //考虑总部整改率变化
    changeRectification(state, data) {
        // console.log("aa", data)
        if (data.code === 10000) {
            state.rectification = data.data.rectification;
        } else {
            alert("出错了")
        }
    },

    // 考虑累计隐患数量变化
    changeRiskLevelData(state, data) {
        if (data.code === 10000) {
            state.risk_level_data = data.data;
        } else {
            alert("出错了")
        }
    },

    //显示根据项目综合&专业风险指数排序的结果
    changeRiskIndexData(state, data) {
        state.risk_index_data = data
    },

    //得到按照高风险数量排名的项目名称
    changeRiskNumberRank(state, data) {
        if (data.code === 10000) {
            state.risk_number_rank = data.data;
        } else {
            alert("出错了")
        }
    },

    //考虑所有项目中出现隐患数量排名前10的隐患变化
    changeNumberTop(state, data) {
        console.log("top", data)
        if (data.code === 10000) {
            state.hidden_danger = data.data;
        } else {
            alert("出错了")
        }
    },

    //考虑
    changeImage(state, data) {
        console.log("image", data)
        if (data.code === 10000) {
            state.images = data.data;
        } else {
            alert("出错了")
        }
    },

    //考虑所有当前未整改的高风险隐患列表
    changeRiskLevelList(state, data) {
        console.log("未整改", data)
        if (data.code === 10000) {
            state.risk_list = data.data.note_list;
        } else {
            alert("出错了")
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}