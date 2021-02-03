import dataService from '@/service/dataService'

//initial state
const state = {
    // 向后端发送的默认参数 level, object1, object2
    params: {},
    object1: '',
    object2: '',
    // 两个对象之间检查次数的对比
    by_check: {},
    // 两个对象之间项目数量的对比
    by_prj: {},
    // 两个对象之间不同专业隐患数量的对比
    by_major: {},

    //参数 level, object1, object2， major
    param2: {},
    // 两个对象之间在同一专业下不同系统的隐患数量的对比
    by_sys: {},

    //参数 level, object1, object2， system
    param3: {},
    // 两个对象之间不同设备隐患数量的对比
    by_device: {},

    //参数 level, object1, object2, device
    param4: {},
    // 两个对象之间不同组件隐患数量的对比
    by_unit: {},
    // 两个对象之间各风险等级隐患数量的对比
    by_risk_level: {},
    // 两个对象之间不同分布区域隐患数量的对比
    by_area: [],
    // 两个对象之间不同致因阶段隐患数量的对比
    by_stage: {},
    // 两个对象之间出现次数前top的隐患的对比
    by_risk_top: {},
    // 两个对象之间违反次数最多的法规标准的对比
    by_law: {},
    // 两个对象之间出现隐患次数前top的组件的对比
    by_unit_top: {},
    // 两个对象之间出现隐患次数前top的设备的对比
    by_device_top: {},
    // 两个对象之间出现隐患次数前top的系统的对比
    by_sys_top: {}
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    // 两个对象之间检查次数的对比
    renderCheckNumber(state) {
        return state.by_check
    },
    // 两个对象之间项目数量的对比
    renderProjectNumber(state) {
        return state.by_prj
    },
    // 两个对象之间不同专业隐患数量的对比
    renderMajorRiskNumber(state) {
        return state.by_major
    },
    // 两个对象之间在同一专业下不同系统的隐患数量的对比
    renderSystemRiskNumber(state) {
        return state.by_sys
    },
    // 两个对象之间不同设备隐患数量的对比
    renderDeviceRiskNumber(state) {
        return state.by_device
    },
    // 两个对象之间不同组件隐患数量的对比
    renderUnitRiskNumber(state) {
        return state.by_unit
    },
    // 两个对象之间各风险等级隐患数量的对比
    renderRiskLevel(state) {
        return state.by_risk_level
    },
    // 两个对象之间不同分布区域隐患数量的对比
    renderAreaRisk(state) {
        return state.by_area
    },
    // 两个对象之间不同致因阶段隐患数量的对比
    renderStageRisk(state) {
        return state.by_stage
    },
    // 两个对象之间出现次数前top的隐患的对比
    renderTopNumber(state) {
        return state.by_risk_top
    },
    // 两个对象之间违反次数最多的法规标准的对比
    renderLawTop(state) {
        return state.by_law
    },
    // 两个对象之间出现隐患次数前top的组件的对比
    renderUnitNumberTop(state) {
        return state.by_unit_top
    },
    // 两个对象之间出现隐患次数前top的设备的对比
    renderDeviceNumberTop(state) {
        return state.by_device_top
    },
    // 两个对象之间出现隐患次数前top的系统的对比
    renderSystemNumberTop(state) {
        return state.by_sys_top
    },
}

//actions
const actions = {

    // 两个对象之间检查次数的对比
    getCheckNumber(context) {
        dataService.getCheckNumber(state.params, function (response) {
            context.commit('changeCheckNumber', response)
        })
    },
    // 两个对象之间项目数量的对比
    getProjectNumber(context) {
        dataService.getProjectNumber(state.params, function (response) {
            context.commit('changeProjectNumber', response)
        })
    },
    // 两个对象之间不同专业隐患数量的对比
    getMajorRiskNumber(context) {
        dataService.getMajorRiskNumber(state.params, function (response) {
            context.commit('changeMajorRiskNumber', response)
        })
    },
    // 两个对象之间在同一专业下不同系统的隐患数量的对比
    getSystemRiskNumber(context) {
        dataService.getMajorRiskNumber(state.param2, function (response) {
            context.commit('changeSystemRiskNumber', response)
        })
    },
    // 两个对象之间不同设备隐患数量的对比
    getDeviceRiskNumber(context) {
        dataService.getDeviceRiskNumber(state.param3, function (response) {
            context.commit('changeDeviceRiskNumber', response)
        })
    },
    // 两个对象之间不同组件隐患数量的对比
    getUnitRiskNumber(context) {
        dataService.getUnitRiskNumber(state.param4, function (response) {
            context.commit('changeUnitRiskNumber', response)
        })
    },
    // 两个对象之间各风险等级隐患数量的对比
    getRiskLevel(context) {
        dataService.getRiskLevel(state.params, function (response) {
            context.commit('changeRiskLevel', response)
        })
    },
    // 两个对象之间不同分布区域隐患数量的对比
    getAreaRisk(context) {
        dataService.getAreaRisk(state.params, function (response) {
            context.commit('changeAreaRisk', response)
        })
    },
    // 两个对象之间不同致因阶段隐患数量的对比
    getStageRisk(context) {
        dataService.getStageRisk(state.params, function (response) {
            context.commit('changeStageRisk', response)
        })
    },
    // 两个对象之间出现次数前top的隐患的对比
    getTopNumber(context) {
        dataService.getTopNumber(state.params, function (response) {
            context.commit('changeTopNumber', response)
        })
    },
    // 两个对象之间违反次数最多的法规标准的对比
    getLawTop(context) {
        dataService.getLawTop(state.params, function (response) {
            context.commit('changeLawTop', response)
        })
    },
    // 两个对象之间出现隐患次数前top的组件的对比
    getUnitNumberTop(context) {
        dataService.getUnitNumberTop(state.params, function (response) {
            context.commit('changeUnitNumberTop', response)
        })
    },
    // 两个对象之间出现隐患次数前top的设备的对比
    getDeviceNumberTop(context) {
        dataService.getDeviceNumberTop(state.params, function (response) {
            context.commit('changeDeviceNumberTop', response)
        })
    },
    // 两个对象之间出现隐患次数前top的系统的对比
    getSystemNumberTop(context) {
        dataService.getSystemNumberTop(state.params, function (response) {
            context.commit('changeSystemNumberTop', response)
        })
    },
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    changeObject1(state, data) {
        state.object1 = data.object1
    },
    changeObject2(state, data) {
        state.object2 = data.object2
    },

    // 两个对象之间检查次数的对比
    changeCheckNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_check = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间项目数量的对比
    changeProjectNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_prj = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间不同专业隐患数量的对比
    changeMajorRiskNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_major = data.data
        } else {
            alert("出错了")
        }
    },

    //参数 level, object1, object2， major
    changeParam2(state, data) {
        state.param2 = data.param2
    },
    // 两个对象之间在同一专业下不同系统的隐患数量的对比
    changeSystemRiskNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_sys = data.data
        } else {
            alert("出错了")
        }
    },

    //参数 level, object1, object2， system
    changeParam3(state, data) {
        state.param3 = data.param3
    },
    // 两个对象之间不同设备隐患数量的对比
    changeDeviceRiskNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_device = data.data
        } else {
            alert("出错了")
        }
    },

    //参数 level, object1, object2， device
    changeParam4(state, data) {
        state.param4 = data.param4
    },
    // 两个对象之间不同组件隐患数量的对比
    changeUnitRiskNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_unit = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间各风险等级隐患数量的对比
    changeRiskLevel(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_risk_level = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间不同分布区域隐患数量的对比
    changeAreaRisk(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_area = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间不同致因阶段隐患数量的对比
    changeStageRisk(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_stage = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间出现次数前top的隐患的对比
    changeTopNumber(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_risk_top = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间违反次数最多的法规标准的对比
    changeLawTop(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_law = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间出现隐患次数前top的组件的对比
    changeUnitNumberTop(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_unit_top = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间出现隐患次数前top的设备的对比
    changeDeviceNumberTop(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_device_top = data.data
        } else {
            alert("出错了")
        }
    },
    // 两个对象之间出现隐患次数前top的系统的对比
    changeSystemNumberTop(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.by_sys_top = data.data
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