import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //展示当前整改率
    check_rectification: {},
    //展示不同风险等级的隐患数量
    check_risk_data: {},
    //基于项目级展示历次检查中不同专业隐患占比情况
    check_risk_ratio: {},
    //展示当前未整改的高风险隐患列表
    check_risk_list: {},
    //基于项目级展示当前未整改高风险隐患图片
    check_image: [],
    //不同专业所有隐患子系统占比情况
    check_system: {},
    //致因阶段占比
    check_reason: {},
    //隐患分布区域占比
    check_region: {},
    //基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    check_risk_top: {},
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的项目级整改率
    renderCheckRectification(state) {
        return state.check_rectification;
    },
    //承载变化的基于项目级展示历次发现的不同风险等级的隐患数量
    renderCheckRiskLevelData(state) {
        return state.check_risk_data;
    },
    //基于一次检查中不同专业隐患占比情况
    renderCheckHistoryPerception(state) {
        return state.check_risk_ratio;
    },
    //承载变化的当前未整改的高风险隐患列表
    renderCheckRiskList(state) {
        return state.check_risk_list;
    },
    //承载基于项目级展示当前未整改高风险隐患图片
    renderCheckImages(state) {
        return state.check_image;
    },
    //基于不同专业所有隐患子系统占比情况
    renderCheckSystem(state) {
        return state.check_system;
    },
    //占比
    renderCheckReason(state) {
        return state.check_reason;
    },
    renderCheckRegion(state) {
        return state.check_region;
    },
    //承载基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    renderCheckRiskTop(state) {
        return state.check_risk_top;
    }

}

//actions
const actions = {
    //得到项目级整改率
    getCheckRectification(context) {
        dataService.getCheckRectification(state.params, function (response) {
            context.commit('changeCheckRectification', response)
        })
    },

    //不同风险等级的隐患数量
    getCheckRiskLevel(context) {
        dataService.getCheckRiskLevel(state.params, function (response) {
            context.commit('changePrjRiskLevel', response)
        })
    },

    //不同专业隐患占比情况
    getCheckRiskRatio(context) {
        dataService.getCheckRiskRatio(state.params, function (response) {
            context.commit('changeCheckRiskRatio', response)
        })
    },

    //得到当前未整改的高风险隐患列表
    getCheckHighRisk(context) {
        dataService.getCheckHighRisk(state.params, function (response) {
            context.commit('changeCheckHighRisk', response)
        })
    },
    //得到当前未整改高风险隐患图片
    getCheckHighImage(context) {
        dataService.getCheckHighImage(state.params, function (response) {
            // console.log(response)
            context.commit('changeCheckHighImage', response)
        })
    },
    //展示本次检查不同隐患子系统下的隐患数量
    getCheckMajorSystem(context) {
        dataService.getCheckMajorSystem(state.params, function (response) {
            // console.log(response)
            context.commit('changeCheckMajorSystem', response)
        })
    },
    //基于在不同专业情况下，隐患区域分布的情况
    getCheckMajorArea(context) {
        dataService.getCheckMajorArea(state.params, function (response) {
            context.commit('changeCheckMajorArea', response)
        })
    },
    //在不同专业时，不同致因阶段的隐患数量
    getCheckMajorStage(context) {
        dataService.getCheckMajorStage(state.params, function (response) {
            context.commit('changeCheckMajorStage', response)
        })
    },
    //得到检查中出现次数排前5的隐患描述及其所属专业和出现次数
    getCheckRiskTop(context) {
        dataService.getCheckRiskTop(state.params, function (response) {
            context.commit('changeCheckRiskTop', response)
        })
    }
}

//mutations
const mutations = {
    //考虑项目级整改率变化
    changeCheckRectification(state, data) {
        if (data.code === 10000) {
            console.log('check_rectification', data.data)
            state.check_rectification = data.data.rectification;
        } else {
            alert("出错了")
        }
    },
    // 考虑发现的不同风险等级的隐患数量
    changePrjRiskLevel(state, data) {
        if (data.code === 10000) {
            console.log('check_level', data.data)
            state.check_risk_data = data.data
        } else {
            alert("出错了")
        }
    },
     //一次检查不同专业隐患占比情况
    changeCheckRiskRatio(state, data) {
        if (data.code === 10000) {
            console.log('check_不同专业隐患占比', data.data)
            state.check_risk_ratio = data.data
        } else {
            alert("出错了")
        }
    },
    //考虑基于项目级展示当前未整改的高风险隐患列表
    changeCheckHighRisk(state, data) {
        if (data.code === 10000) {
            console.log("check_未整改隐患描述", data.data)
            state.check_risk_list = data.data.note_list
        } else {
            alert("出错了")
        }
    },
    // 考虑基于项目级展示当前未整改高风险隐患图片
    changeCheckHighImage(state, data) {
        if (data.code === 10000) {
            console.log("check_未整改高风险隐患图片", data.data)
            state.check_image = data.data.image_list
        } else {
            alert("出错了")
        }
    },

    //展示本次检查不同隐患子系统下的隐患数量
    changeCheckMajorSystem(state, data) {
        if (data.code === 10000) {
            console.log("check_不同隐患子系统下的隐患数量", data.data)
            state.check_system = data.data
        } else {
            alert("出错了")
        }
    },

    //占比
    changeCheckMajorArea(state, data) {
        if (data.code === 10000) {
            console.log("check_隐患区域", data.data)
            state.check_region = data.data
        } else {
            alert("出错了")
        }
    },

    changeCheckMajorReason(state, data) {
        if (data.code === 10000) {
           console.log("check_致因阶段", data.data)
            state.check_reason = data.data
        } else {
            alert("出错了")
        }
    },

    //考虑基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    changeCheckRiskTop(state, data) {
        if (data.code === 10000) {
            console.log("check_top5", data.data)
            state.check_risk_top = data.data
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