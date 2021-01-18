import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //向后端发送的粒度
    g_params: {},
    //基于项目级展示当前整改率
    prj_rectification: {},
    //基于项目级展示历次发现的不同风险等级的隐患数量
    prj_risk_data: {},
    //基于项目级展示历次检查隐患数量变化的情况
    prj_number_change: {},
    //基于项目级展示历次检查中不同专业隐患占比情况
    prj_history_prec: {},
    //基于项目级展示最近一次检查不同专业隐患占比情况
    prj_nearest_perception: {},
    //基于项目级展示当前未整改的高风险隐患列表
    prj_risk_list: {},
    //基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    prj_risk_top: {},
    //基于项目级展示当前未整改高风险隐患图片
    prj_image: [],
    //基于项目级展示不同专业所有隐患子系统占比情况
    prj_system: {},
    //致因阶段占比
    prj_reason: {},
    //隐患分布区域占比
    prj_region: {},
    //历次检查危险指数
    prj_index: {},
//    标记展开和返回 已展开: true
    flag: false,
//    从project到check，存储map，方便调用
    map: ''
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //向后端发送的粒度参数
    renderGParams(params) {
        return state.params;
    },
    //承载变化的项目级整改率
    renderPrjRectification(state) {
        return state.prj_rectification;
    },
    //承载变化的基于项目级展示历次发现的不同风险等级的隐患数量
    renderPrjRiskLevelData(state) {
        return state.prj_risk_data;
    },
    //基于项目级展示历次检查中不同专业隐患占比情况
    renderPrjHistoryPerception(state) {
        return state.prj_history_prec;
    },
    //承载变化的基于项目级展示最近一次检查不同专业隐患占比情况
    renderPrjNearestPerception(state) {
        return state.prj_nearest_perception;
    },
    //承载变化的基于项目级展示历次检查隐患数量变化的情况
    renderPrjNumberChange(state) {
        return state.prj_number_change;
    },
    //承载变化的基于项目级展示当前未整改的高风险隐患列表
    renderProjectRiskList(state) {
        return state.prj_risk_list;
    },
    //承载基于项目级展示当前未整改高风险隐患图片
    renderPrjImages(state) {
        return state.images;
    },
    //基于项目级展示不同专业所有隐患子系统占比情况
    renderPrjSystem(state) {
        return state.prj_system;
    },
    //占比
    renderPrjReason(state) {
        return state.prj_reason;
    },
    renderPrjRegion(state) {
        return state.prj_region;
    },
    //承载基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    renderPrjRiskTop(state) {
        return state.prj_risk_top;
    },
    //历次检查危险指数
    renderPrjIndex(state) {
        return state.prj_index;
    },
    renderMap(state) {
        return state.map
    }

}

//actions
const actions = {
    //得到项目级整改率
    getInitProjectRectification(context) {
        dataService.getInitProjectRectification(state.params, function (response) {
            context.commit('changePrjRectification', response)
        })
    },

    //得到基于项目级展示历次发现的不同风险等级的隐患数量
    getInitProjectRiskLevel(context) {
        dataService.getInitProjectRiskLevel(state.params, function (response) {
            context.commit('changePrjRiskLevel', response)
        })
    },

    //基于项目级展示历次检查中不同专业隐患占比情况
    getInitProjectHistoryPerception(context) {
        dataService.getInitProjectHistoryPerception(state.params, function (response) {
            context.commit('changePrjHistoryPerception', response)
        })
    },

    //得到基于项目级展示最近一次检查不同专业隐患占比情况
    getInitProjectNearestPerception(context) {
        dataService.getInitProjectNearestPerception(state.params, function (response) {
            context.commit('changePrjNearestPerception', response)
        })
    },

    //得到基于项目级展示历次检查隐患数量变化的情况
    getInitProjectNumberChange(context) {
        dataService.getInitProjectNumberChange(state.params, function (response) {
            context.commit('changePrjNumberChange', response)
        })
    },

    //得到基于项目级展示当前未整改的高风险隐患列表
    getInitPrjRisk(context) {
        dataService.getInitProjectRisk(state.params, function (response) {
            context.commit('changePrjRiskLevelList', response)
        })
    },

    //得到基于项目级展示当前未整改高风险隐患图片
    getInitProjectImage(context) {
        dataService.getInitProjectImage(state.params, function (response) {
            // console.log(response)
            context.commit('changePrjImage', response)
        })
    },

    //基于项目级展示不同专业所有隐患子系统占比情况
    getInitProjectSystem(context) {
        dataService.getInitProjectSystem(state.params, function (response) {
            context.commit('changePrjSystem', response)
        })
    },

        //占比
    getInitProjectReason(context) {
        dataService.getInitProjectReason(state.params, function (response) {
            context.commit('changePrjReason', response)
        })
    },
    getInitProjectRegionDistribution(context) {
        dataService.getInitProjectRegionDistribution(state.params, function (response) {
            context.commit('changePrjRegion', response)
        })
    },

    //得到基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    getInitProjectRiskTop(context) {
        dataService.getInitProjectRiskTop(state.params, function (response) {
            context.commit('changePrjRiskTop', response)
        })
    },

    //历次检查危险指数
    getInitProjectIndex(context) {
        dataService.getInitProjectIndex(state.params, function (response) {
            context.commit('changePrjIndex', response)
        })
    }
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //考虑项目级整改率变化
    changePrjRectification(state, data) {
        if (data.code === 10000) {
            // console.log('project_high', data.data)
            state.prj_rectification = data.data.rectification;
        } else {
            alert("出错了")
        }
    },
    // 考虑基于项目级展示历次发现的不同风险等级的隐患数量
    // changePrjRiskNumber(state, data) {
    //     if (data.code === 10000) {
    //         state.prj_risk_data = data.data
    //     } else {
    //         alert("出错了")
    //     }
    // },
    //
    changePrjRiskLevel(state, data) {
        if (data.code === 10000) {
            console.log('level', data.data)
            state.prj_risk_data = data.data
        } else {
            alert("出错了")
        }
    },
     //基于项目级展示最近一次检查不同专业隐患占比情况
    changePrjNearestPerception(state, data) {
        console.log(data)
        state.prj_nearest_perception = data
    },
    //基于项目级展示历次检查中不同专业隐患占比情况
    changePrjHistoryPerception(state, data) {
        if (data.code === 10000) {
            state.prj_history_prec = data.data
        } else {
            alert("出错了")
        }
    },

    //基于项目级展示历次检查隐患数量变化的情况
    changePrjNumberChange(state, data) {
        if (data.code === 10000) {
            state.prj_number_change = data.data
        } else {
            alert("出错了")
        }
    },

    //考虑基于项目级展示当前未整改的高风险隐患列表
    changePrjRiskLevelList(state, data) {
        if (data.code === 10000) {
            console.log("list", data.data)
            state.prj_risk_list = data.data.note_list
        } else {
            alert("出错了")
        }
    },

    // 考虑基于项目级展示当前未整改高风险隐患图片
    changePrjImage(state, data) {
        if (data.code === 10000) {
            console.log("list", data.data)
            state.prj_image = data.data.image_list
        } else {
            alert("出错了")
        }
    },

    //基于项目级展示不同专业所有隐患子系统占比情况
    changePrjSystem(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_system = data.data
        } else {
            alert("出错了")
        }
    },

    //占比
    changePrjReason(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_reason = data.data
        } else {
            alert("出错了")
        }
    },

    changePrjRegion(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_region = data.data
        } else {
            alert("出错了")
        }
    },

    //考虑基于项目级在历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
    changePrjRiskTop(state, data) {
        if (data.code === 10000) {
            console.log("top5", data.data)
            state.prj_risk_top = data.data
        } else {
            alert("出错了")
        }
    },

    //历次检查危险指数
    changePrjIndex(state, data) {
        if (data.code === 10000) {
            console.log("project_index", data.data)
            state.prj_index = data.data
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