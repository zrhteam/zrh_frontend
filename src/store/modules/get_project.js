import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //项目名称也需要封装
    prj_name: '',
    //向后端发送的粒度
    // g_params: {},
    //基于项目级展示当前整改率
    // prj_rectification: {},
    //显示项目的整体危险指数以及各专业的危险指数
    prj_index: {},
    //显示项目中各风险等级及其对应的隐患数量
    prj_risk_data: {},
    //显示项目中各风险等级及其对应的隐患数量,按年份
    prj_level_year: {},
    //基于项目级展示不同专业隐患占比情况
    prj_history_prec: {},

    //筛选前top
    param5: {},
    //基于项目级展示当前项目中最近一次检查top张高风险隐患图片
    prj_image: [],

    //筛选专业
    param2: {},
    //筛选专业,封装所有专业
    all_majors: [],
    //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
    prj_system: {},
    //基于项目级显示在不同专业情况下在不同致因阶段的隐患数量
    prj_reason: {},
    //基于项目级显示在不同专业情况下，隐患区域分布的情况
    prj_region: {},

    //筛选
    param3: {},
    //基于项目级显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
    prj_risk_top: {},

    //筛选
    param4: {},
    //基于项目级显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述
    prj_other_top: {},
    //基于项目级隐患次数排名前10的系统名称
    prj_sys_name: {},
    //基于项目级隐患次数排名前10的设备名称
    prj_device_name: {},
    //基于项目级隐患次数排名前10的组件名称
    prj_unit_name: {},
    // 基于项目级显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    prj_rule: {},

    //按专业分不同风险等级隐患数量
    prj_risk_level_ratio: {},

    //红线
    prj_danger_problem: {}

    // //基于项目级展示历次检查隐患数量变化的情况
    // prj_number_change: {},
    //
    // //基于项目级展示最近一次检查不同专业隐患占比情况
    // prj_nearest_perception: {},
    // //基于项目级展示当前未整改的高风险隐患列表
    // prj_risk_list: {},
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //向后端发送的粒度参数
    // renderGParams(params) {
    //     return state.params;
    // },
    // //承载变化的项目级整改率
    // renderPrjRectification(state) {
    //     return state.prj_rectification;
    // },
    //显示项目的整体危险指数以及各专业的危险指数
    renderPrjIndex(state) {
        return state.prj_index;
    },
    //显示项目中各风险等级及其对应的隐患数量
    renderPrjRiskLevelData(state) {
        return state.prj_risk_data;
    },
    //显示项目中各风险等级及其对应的隐患数量,按年份
    renderPrjRiskLevelYear(state) {
        return state.prj_level_year;
    },
    //基于项目级展示不同专业隐患占比情况
    renderPrjHistoryPerception(state) {
        return state.prj_history_prec;
    },
    //基于项目级展示当前项目中最近一次检查top张高风险隐患图片
    renderPrjImages(state) {
        return state.images;
    },
    //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
    renderPrjSystem(state) {
        return state.prj_system;
    },
    //基于项目级显示在不同专业情况下在不同致因阶段的隐患数量
    renderPrjReason(state) {
        return state.prj_reason;
    },
    //基于项目级显示在不同专业情况下，隐患区域分布的情况
    renderPrjRegion(state) {
        return state.prj_region;
    },
    //基于项目级显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
    renderPrjRiskTop(state) {
        return state.prj_risk_top;
    },
    //基于项目级显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述
    renderPrjOtherTop(state) {
        return state.prj_other_top;
    },
    //基于项目级隐患次数排名前10的系统名称
    renderPrjSysName(state) {
        return state.prj_sys_name;
    },
    //基于项目级隐患次数排名前10的设备名称
    renderPrjDeviceName(state) {
        return state.prj_device_name;
    },
    //基于项目级隐患次数排名前10的组件名称
    renderPrjUnitName(state) {
        return state.prj_unit_name;
    },
    // 基于项目级显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    renderPrjRules(state) {
        return state.prj_rule;
    },


    // //承载变化的基于项目级展示最近一次检查不同专业隐患占比情况
    // renderPrjNearestPerception(state) {
    //     return state.prj_nearest_perception;
    // },
    // //承载变化的基于项目级展示历次检查隐患数量变化的情况
    // renderPrjNumberChange(state) {
    //     return state.prj_number_change;
    // },
    // //承载变化的基于项目级展示当前未整改的高风险隐患列表
    // renderProjectRiskList(state) {
    //     return state.prj_risk_list;
    // },
    // renderMap(state) {
    //     return state.map
    // }
}

//actions
const actions = {
    //得到项目级整改率
    // getInitProjectRectification(context) {
    //     dataService.getInitProjectRectification(state.params, function (response) {
    //         context.commit('changePrjRectification', response)
    //     })
    // },
    //显示项目的整体危险指数以及各专业的危险指数
    // getInitProjectIndex(context) {
    //     dataService.getInitProjectIndex(state.params, function (response) {
    //         context.commit('changePrjIndex', response)
    //     })
    // },
    //显示项目中各风险等级及其对应的隐患数量
    getInitProjectRiskLevel(context) {
        dataService.getInitProjectRiskLevel(context.state.params, function (response) {
            context.commit('changePrjRiskLevel', response)
        })
    },
    //显示项目中各风险等级及其对应的隐患数量,按年份
    getProjectRiskLevelYear(context) {
        dataService.getProjectRiskLevelYear(context.state.params, function (response) {
            context.commit('changePrjLevelYear', response)
        })
    },
    //基于项目级展示不同专业隐患占比情况
    getInitProjectHistoryPerception(context) {
        dataService.getInitProjectHistoryPerception(context.state.params, function (response) {
            context.commit('changePrjHistoryPerception', response)
        })
    },
    //基于项目级展示当前项目中最近一次检查top张高风险隐患图片
    getInitProjectImage(context) {
        dataService.getInitProjectImage(context.state.param5, function (response) {
            // console.log(response)
            context.commit('changePrjImage', response)
        })
    },
    //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
    getInitProjectSystem(context) {
        dataService.getInitProjectSystem(context.state.param2, function (response) {
            context.commit('changePrjSystem', response)
        })
    },
    //基于项目级显示在不同专业情况下在不同致因阶段的隐患数量
    getInitProjectReason(context) {
        dataService.getInitProjectReason(context.state.param2, function (response) {
            context.commit('changePrjReason', response)
        })
    },
    //基于项目级显示在不同专业情况下，隐患区域分布的情况
    getInitProjectRegionDistribution(context) {
        dataService.getInitProjectRegionDistribution(context.state.param2, function (response) {
            context.commit('changePrjRegion', response)
        })
    },
    //基于项目级显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
    getInitProjectRiskTop(context) {
        dataService.getInitProjectRiskTop(context.state.param3, function (response) {
            context.commit('changePrjRiskTop', response)
        })
    },
    //基于项目级显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述
    getProjectOtherTop(context) {
        dataService.getProjectOtherTop(context.state.param4, function (response) {
            context.commit('changePrjOtherTop', response)
        })
    },
    //基于项目级隐患次数排名前10的系统名称
    getProjectSystemNumber(context) {
        dataService.getProjectSystemNumber(context.state.params, function (response) {
            context.commit('changePrjSystemNumber', response)
        })
    },
    //基于项目级隐患次数排名前10的设备名称
    getProjectDeviceNumber(context) {
        dataService.getProjectDeviceNumber(context.state.params, function (response) {
            context.commit('changePrjDeviceNumber', response)
        })
    },
    //基于项目级隐患次数排名前10的组件名称
    getProjectUnitNumber(context) {
        dataService.getProjectUnitNumber(context.state.params, function (response) {
            context.commit('changePrjUnitNumber', response)
        })
    },
    // 基于项目级显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    getProjectRules(context) {
        dataService.getProjectRules(context.state.params, function (response) {
            context.commit('changePrjRules', response)
        })
    },

    //按专业分不同风险等级隐患数量
    getProjectRiskLevelRatio(context) {
        dataService.getProjectRiskLevelRatio(context.state.params, function (response) {
            context.commit('changeProjectRiskLevelRatio', response)
        })
    },

    //红线
    getProjectDangerProblem(context) {
        dataService.getProjectDangerProblem(context.state.params, function (response) {
            context.commit('changeProjectDangerProblem', response)
        })
    },



    // //得到基于项目级展示历次检查隐患数量变化的情况
    // getInitProjectNumberChange(context) {
    //     dataService.getInitProjectNumberChange(state.params, function (response) {
    //         context.commit('changePrjNumberChange', response)
    //     })
    // },
    // //得到基于项目级展示当前未整改的高风险隐患列表
    // getInitPrjRisk(context) {
    //     dataService.getInitProjectRisk(state.params, function (response) {
    //         context.commit('changePrjRiskLevelList', response)
    //     })
    // },

}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //项目名称也需要封装
    changePrjName(state, data) {
        state.prj_name = data.prj_name
    },
    // //考虑项目级整改率变化
    // changePrjRectification(state, data) {
    //     if (data.code === 10000) {
    //         // console.log('project_high', data.data)
    //         state.prj_rectification = data.data.rectification;
    //     } else {
    //         alert("出错了")
    //     }
    // },
    // 考虑基于项目级展示历次发现的不同风险等级的隐患数量
    // changePrjRiskNumber(state, data) {
    //     if (data.code === 10000) {
    //         state.prj_risk_data = data.data
    //     } else {
    //         alert("出错了")
    //     }
    // },

    //显示项目的整体危险指数以及各专业的危险指数
    changePrjIndex(state, data) {
        if (data.code === 10000) {
            // console.log("project_index", data.data)
            state.prj_index = data.data
        } else {
            alert("出错了")
        }
    },
    //显示项目中各风险等级及其对应的隐患数量
    changePrjRiskLevel(state, data) {
        if (data.code === 10000) {
            // console.log('level', data.data)
            state.prj_risk_data = data.data
        } else {
            alert("出错了")
        }
    },
    //显示项目中各风险等级及其对应的隐患数量,按年份
    changePrjLevelYear(state, data) {
        if (data.code === 10000) {
            // console.log('level', data.data)
            state.prj_level_year = data.data
        } else {
            alert("出错了")
        }
    },
    //基于项目级展示不同专业隐患占比情况
    changePrjHistoryPerception(state, data) {
        if (data.code === 10000) {
            state.prj_history_prec = data.data
        } else {
            alert("出错了")
        }
    },

    //筛选前top
    changeParam5(state, data) {
        state.param5 = data.params
    },
    //基于项目级展示当前项目中最近一次检查top张高风险隐患图片
    changePrjImage(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_image = data.data.image_list
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

    //基于项目级展示在不同专业下属于不同隐患子系统的隐患数量
    changePrjSystem(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_system = data.data
        } else {
            alert("出错了")
        }
    },
    //基于项目级显示在不同专业情况下在不同致因阶段的隐患数量
    changePrjReason(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_reason = data.data
        } else {
            alert("出错了")
        }
    },
    //基于项目级显示在不同专业情况下，隐患区域分布的情况
    changePrjRegion(state, data) {
        if (data.code === 10000) {
            // console.log("list", data.data)
            state.prj_region = data.data
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam3(state, data) {
        state.param3 = data.params
    },
    //基于项目级显示在不同筛选条件（专业/系统/设备/组件）下，出现次数排名前top的隐患描述
    changePrjRiskTop(state, data) {
        if (data.code === 10000) {
            // console.log("top5", data.data)
            state.prj_risk_top = data.data
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam4(state, data) {
        state.param4 = data.params
    },
    //基于项目级显示在不同筛选条件（风险等级/致因阶段/分布区域）下，出现次数排名前top的隐患描述
    changePrjOtherTop(state, data) {
        if (data.code === 10000) {
            // console.log("top5", data.data)
            state.prj_other_top = data.data
        } else {
            alert("出错了")
        }
    },
    //基于项目级隐患次数排名前10的系统名称
    changePrjSystemNumber(state, data) {
        if (data.code === 10000) {
            // console.log("top5", data.data)
            state.prj_sys_name = data.data
        } else {
            alert("出错了")
        }
    },
    //基于项目级隐患次数排名前10的设备名称
    changePrjDeviceNumber(state, data) {
        if (data.code === 10000) {
            // console.log("top5", data.data)
            state.prj_device_name = data.data
        } else {
            alert("出错了")
        }
    },
    //基于项目级隐患次数排名前10的组件名称
    changePrjUnitNumber(state, data) {
        if (data.code === 10000) {
            // console.log("top5", data.data)
            state.prj_unit_name = data.data
        } else {
            alert("出错了")
        }
    },
    // 基于项目级显示违反次数排名前10的法规、违反次数及其相关条款号和内容
    changePrjRules(state, data) {
        if (data.code === 10000) {
            // console.log("top5", data.data)
            state.prj_rule = data.data
        } else {
            alert("出错了")
        }
    },

    //按专业分不同风险等级隐患数量
    changeProjectRiskLevelRatio(state, data) {
        if (data.code === 10000) {
            console.log("top5", data.data)
            state.prj_risk_level_ratio = data.data;
        } else {
            alert("出错了")
        }
    },

    //红线
    changeProjectDangerProblem(state, data) {
        if (data.code === 10000) {
            state.project_danger_problem = data.data;
            console.log('project_hongxian', data.data)
        } else {
            alert("出错了")
        }
    },


    // //基于项目级展示历次检查隐患数量变化的情况
    // changePrjNumberChange(state, data) {
    //     if (data.code === 10000) {
    //         state.prj_number_change = data.data
    //     } else {
    //         alert("出错了")
    //     }
    // },
    //
    // //考虑基于项目级展示当前未整改的高风险隐患列表
    // changePrjRiskLevelList(state, data) {
    //     if (data.code === 10000) {
    //         console.log("list", data.data)
    //         state.prj_risk_list = data.data.note_list
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