import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //check_code也需要封装
    check_code: '',
    // //展示当前整改率
    // check_rectification: {},
    //展示不同风险等级的隐患数量
    check_risk_data: {},
    //按年份展示不同风险等级的隐患数量
    check_level_year: {},
    //该检查中不同专业隐患占比情况
    check_risk_ratio: {},
    //该检查中当前未整改高风险隐患图片
    check_image: [],

    //筛选专业
    param2: {},
    //筛选专业,封装所有专业
    all_majors: [],
    //封装查询的专业，是初始的全部专业还是某专业
    filter_major: '',
    //该检查中在不同专业下属于不同隐患子系统的隐患数量
    check_system: {},
    //该检查中在不同专业情况下在不同致因阶段的隐患数量
    check_reason: {},
    //该检查中在不同专业情况下，隐患区域分布的情况
    check_region: {},

    //筛选
    param3: {},
    //在当前检查中，不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述及其出现次数
    check_risk_top: {},

    //筛选
    param4: {},
    // 在当前检查中，不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述及其出现次数
    check_other_top: {},
    // 在当前检查中,显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    check_rule: {},
    //显示在当前检查中隐患次数排名前10的系统名称
    check_sys_name: {},
    //显示在当前检查中隐患次数排名前10的设备名称
    check_device_name: {},
    //显示在当前检查中隐患次数排名前10的组件名称
    check_unit_name: {},

    //按专业分不同风险等级隐患数量
    check_risk_level_ratio: {},

    //红线
    check_danger_problem: {}

    // //展示当前未整改的高风险隐患列表
    // check_risk_list: {},
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    // //承载变化的项目级整改率
    // renderCheckRectification(state) {
    //     return state.check_rectification;
    // },
    //承载变化的一次检查中的不同风险等级的隐患数量
    renderCheckRiskLevelData(state) {
        return state.check_risk_data;
    },
    //承载变化的一次检查中的不同风险等级的隐患数量按年份显示
    renderCheckLevelYear(state) {
        return state.check_level_year;
    },
    //基于一次检查中不同专业隐患占比情况
    renderCheckHistoryPerception(state) {
        return state.check_risk_ratio;
    },
    //承载基于项目级展示当前未整改高风险隐患图片
    renderCheckImages(state) {
        return state.check_image;
    },
    //基于一次检查中不同专业下属于不同隐患子系统的隐患数量
    renderCheckSystem(state) {
        return state.check_system;
    },
    //基于一次检查中不同专业下在不同致因阶段的隐患数量
    renderCheckReason(state) {
        return state.check_reason;
    },
    //基于一次检查中不同专业下隐患区域分布的隐患数量
    renderCheckRegion(state) {
        return state.check_region;
    },
    //在当前检查中，不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述及其出现次数
    renderCheckRiskTop(state) {
        return state.check_risk_top;
    },
    //在当前检查中，不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述及其出现次数
    renderCheckOtherTop(state) {
        return state.check_other_top;
    },
    //在当前检查中，显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    renderCheckRule(state) {
        return state.check_rule;
    },
    //在当前检查中，显示隐患次数排名前10的系统名称
    renderCheckSysName(state) {
        return state.check_sys_name
    },
    //在当前检查中，显示隐患次数排名前10的设备名称
    renderCheckDeviceName(state) {
        return state.check_device_name
    },
    //在当前检查中，显示隐患次数排名前10的组件名称
    renderCheckUnitName(state) {
        return state.check_unit_name
    }

    // //承载变化的当前未整改的高风险隐患列表
    // renderCheckRiskList(state) {
    //     return state.check_risk_list;
    // },
}

//actions
const actions = {
    //得到项目级整改率
    // getCheckRectification(context) {
    //     dataService.getCheckRectification(state.params, function (response) {
    //         context.commit('changeCheckRectification', response)
    //     })
    // },

    //在当前检查中，不同风险等级的隐患数量
    getCheckRiskLevel(context) {
        dataService.getCheckRiskLevel(context.state.params, function (response) {
            context.commit('changeCheckRiskLevel', response)
        })
    },
    //在当前检查中，不同风险等级的隐患数量 按年份
    getCheckLevelYear(context) {
        dataService.getCheckLevelYear(context.state.params, function (response) {
            context.commit('changeCheckLevelYear', response)
        })
    },
    //在当前检查中，不同专业隐患占比情况
    getCheckRiskRatio(context) {
        dataService.getCheckRiskRatio(context.state.params, function (response) {
            context.commit('changeCheckRiskRatio', response)
        })
    },
    //在当前检查中，得到当前未整改高风险隐患图片
    getCheckHighImage(context) {
        dataService.getCheckHighImage(context.state.params, function (response) {
            // console.log(response)
            context.commit('changeCheckHighImage', response)
        })
    },
    //展示在当前检查中，不同隐患子系统下的隐患数量
    getCheckMajorSystem(context) {
        dataService.getCheckMajorSystem(context.state.param2, function (response) {
            // console.log(response)
            context.commit('changeCheckMajorSystem', response)
        })
    },
    //在当前检查中，在不同专业情况下，隐患区域分布的情况
    getCheckMajorArea(context) {
        dataService.getCheckMajorArea(context.state.param2, function (response) {
            context.commit('changeCheckMajorArea', response)
        })
    },
    //在当前检查中，在不同专业时，不同致因阶段的隐患数量
    getCheckMajorStage(context) {
        dataService.getCheckMajorStage(context.state.param2, function (response) {
            context.commit('changeCheckMajorStage', response)
        })
    },
    //得到检查中不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述及其出现次数
    getCheckRiskTop(context) {
        dataService.getCheckRiskTop(context.state.param3, function (response) {
            context.commit('changeCheckRiskTop', response)
        })
    },
    //得到检查中不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述及其出现次数
    getCheckOtherTop(context) {
        dataService.getCheckOtherTop(context.state.param4, function (response) {
            context.commit('changeCheckOtherTop', response)
        })
    },
    //在当前检查中，显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    getCheckRule(context) {
        dataService.getCheckRule(context.state.params, function (response) {
            context.commit('changeCheckRule', response)
        })
    },
    //在当前检查中，显示隐患次数排名前10的系统名称
    getCheckSystem(context) {
        dataService.getCheckSystem(context.state.params, function (response) {
            context.commit('changeCheckSystem', response)
        })
    },
    //在当前检查中，显示隐患次数排名前10的设备名称
    getCheckDevice(context) {
        dataService.getCheckDevice(context.state.params, function (response) {
            context.commit('changeCheckDevice', response)
        })
    },
    //在当前检查中，显示隐患次数排名前10的组件名称
    getCheckUnit(context) {
        dataService.getCheckUnit(context.state.params, function (response) {
            context.commit('changeCheckUnit', response)
        })
    },

    //按专业分不同风险等级隐患数量
    getCheckRiskLevelRatio(context) {
        dataService.getCheckRiskLevelRatio(context.state.params, function (response) {
            context.commit('changeCheckRiskLevelRatio', response)
        })
    },

    //红线
    getCheckDangerProblem(context) {
        dataService.getCheckDangerProblem(context.state.params, function (response) {
            context.commit('changeCheckDangerProblem', response)
        })
    },

    //得到当前未整改的高风险隐患列表
    // getCheckHighRisk(context) {
    //     dataService.getCheckHighRisk(state.params, function (response) {
    //         context.commit('changeCheckHighRisk', response)
    //     })
    // },
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //check_code也需要封装
    changeCheckCode(state, data) {
        state.check_code = data.check_code
    },
    // //考虑项目级整改率变化
    // changeCheckRectification(state, data) {
    //     if (data.code === 10000) {
    //         console.log('check_rectification', data.data)
    //         state.check_rectification = data.data.rectification;
    //     } else {
    //         alert("出错了")
    //     }
    // },
    //在当前检查中，不同风险等级的隐患数量
    changeCheckRiskLevel(state, data) {
        if (data.code === 10000) {
            state.check_risk_data = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，不同风险等级的隐患数量 按年份
    changeCheckLevelYear(state, data) {
        if (data.code === 10000) {
            // console.log('check_level', data.data)
            state.check_level_year = data.data
        } else {
            alert("出错了")
        }
    },
     //一次检查不同专业隐患占比情况
    changeCheckRiskRatio(state, data) {
        // if (data.code === 10000) {
            // console.log('check_不同专业隐患占比', data.data)
            state.check_risk_ratio = data.data
        // } else {
        //     alert("出错了")
        // }
    },
    // 考虑基于项目级展示当前未整改高风险隐患图片
    changeCheckHighImage(state, data) {
        if (data.code === 10000) {
            // console.log("check_未整改高风险隐患图片", data.data)
            state.check_image = data.data.image_list
        } else {
            alert("出错了")
        }
    },

    //筛选专业
    changeParam2(state, data) {
        state.param2 = data.params
    },
    //筛选专业,封装所有专业
    changeAllMajors(state, data) {
        state.all_majors = data.all_majors
    },
     //封装查询的专业，是初始的全部专业还是某专业
    changeFilterMajor(state, data) {
        state.filter_major = data.data
    },
    //展示本次检查不同隐患子系统下的隐患数量
    changeCheckMajorSystem(state, data) {
        if (data.code === 10000) {
            // console.log("check_不同隐患子系统下的隐患数量", data.data)
            state.check_system = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，在不同专业情况下，隐患区域分布的情况
    changeCheckMajorArea(state, data) {
        if (data.code === 10000) {
            // console.log("check_隐患区域", data.data)
            state.check_region = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，在不同专业时，不同致因阶段的隐患数量
    changeCheckMajorStage(state, data) {
        if (data.code === 10000) {
           // console.log("check_致因阶段", data.data)
            state.check_reason = data.data
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam3(state, data) {
        state.param3 = data.params
    },
    //不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述及其出现次数
    changeCheckRiskTop(state, data) {
        if (data.code === 10000) {
            // console.log("check_top5", data.data)
            state.check_risk_top = data.data
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam4(state, data) {
        state.param4 = data.params
    },
    //得到检查中不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述及其出现次数
    changeCheckOtherTop(state, data) {
        if (data.code === 10000) {
            state.check_other_top = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    changeCheckRule(state, data) {
        if (data.code === 10000) {
            // console.log("check_top5", data.data)
            state.check_rule = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，显示隐患次数排名前10的系统名称
    changeCheckSystem(state, data) {
        if (data.code === 10000) {
            // console.log("check_top5", data.data)
            state.check_sys_name = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，显示隐患次数排名前10的设备名称
    changeCheckDevice(state, data) {
        if (data.code === 10000) {
            // console.log("check_top5", data.data)
            state.check_device_name = data.data
        } else {
            alert("出错了")
        }
    },
    //在当前检查中，显示隐患次数排名前10的组件名称
    changeCheckUnit(state, data) {
        if (data.code === 10000) {
            // console.log("check_top5", data.data)
            state.check_unit_name = data.data
        } else {
            alert("出错了")
        }
    },

    //按专业分不同风险等级隐患数量
    changeCheckRiskLevelRatio(state, data) {
        if (data.code === 10000) {
            state.check_risk_level_ratio = data.data;
        } else {
            alert("出错了")
        }
    },

    //红线
    changeCheckDangerProblem(state, data) {
        if (data.code === 10000) {
            state.check_danger_problem = data.data;
            // console.log('check_hongxian', data.data)
        } else {
            alert("出错了")
        }
    },

    //考虑基于项目级展示当前未整改的高风险隐患列表
    // changeCheckHighRisk(state, data) {
    //     if (data.code === 10000) {
    //         console.log("check_未整改隐患描述", data.data)
    //         state.check_risk_list = data.data.note_list
    //     } else {
    //         alert("出错了")
    //     }
    // },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
