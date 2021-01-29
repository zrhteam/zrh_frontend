import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //head_name也需要封装
    head_name: '',
    //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
    risk_index_data: {},
    //展示总部各风险等级及其对应的隐患数量
    risk_level_data: {},
    //根据风险指数对区域进行排序
    rank_by_index: {},
    //显示每个区域的高风险数量
    risk_number_rank: {},

    //筛选
    param3: {},
    //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
    risk_number_top: {},
    //按年份显示总部的高中低风险等级对应的隐患数量
    risk_level_year: {},

    //筛选
    param4: {},
    //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
    other_number_top: {},
    //按照检查次数对区域排名
    rank_by_check: {},
    //各专业隐患数量占比
    head_major_ratio: {},
    // 各致因阶段的隐患数量占比情况
    head_stage_ratio: {},
    // 各分布区域的隐患数量占比情况
    head_area_ratio: {},
    // 展示按照项目数量对区域排名
    rank_by_prj: {},


    // //总部整改率
    // rectification: {},
    //未整改高风险图片
    // images: {},
    // //得到所有项目中出现隐患数量排名前10的隐患
    // hidden_danger: {},
    // //该总部下当前未整改的高风险隐患列表
    // risk_list: {},
    // data: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
    renderIndexData(state) {
        return state.risk_index_data;
    },
    //展示总部各风险等级及其对应的隐患数量
    renderRiskLevelData(state) {
        return state.risk_level_data;
    },
    //根据风险指数对区域进行排序
    renderRiskIndexData(state) {
        return state.rank_by_index;
    },
    //显示每个区域的高风险数量
    renderRiskNumberRank(state) {
        return state.risk_number_rank;
    },
    //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
    renderRiskNumberTop(state) {
        return state.risk_number_top;
    },
    //按年份显示总部的高中低风险等级对应的隐患数量
    renderRiskLevelYear(state) {
        return state.risk_level_year;
    },
    //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
    renderOtherNumberTop(state) {
        return state.other_number_top;
    },
    //按照检查次数对区域排名
    renderHeadCheckRank(state) {
        return state.rank_by_check;
    },
    //各专业隐患数量占比
    renderHeadMajorRatio(state) {
        return state.head_major_ratio;
    },
    // 各致因阶段的隐患数量占比情况
    renderHeadStageRatio(state) {
        return state.head_stage_ratio;
    },
    // 各分布区域的隐患数量占比情况
    renderHeadAreaRatio(state) {
        return state.head_area_ratio;
    },
    // 展示按照项目数量对区域排名
    renderHeadProjectRank(state) {
        return state.rank_by_prj;
    },


    // //承载变化的总部整改率
    // renderRectification(state) {
    //     return state.rectification;
    // },
    // //承载变化的未整改高风险图片
    // renderImages(state) {
    //     return state.images;
    // },
    // //承载变化的所有项目中出现隐患数量排名前10的隐患
    // renderNumberTop(state) {
    //     return state.hidden_danger;
    // },
    // //承载变化的总部级级当前所有未整改的高风险隐患列表
    // renderRiskList(state) {
    //     return state.risk_list;
    // }
}

//actions
const actions = {
    //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
    getInitIndexData(context) {
        dataService.getInitIndexData(state.params, function (response) {
            // console.log(response)
            context.commit('changeIndexData', response)
        })
    },
    //展示总部各风险等级及其对应的隐患数量
    getInitRiskLevelData(context) {
        dataService.getInitRiskLevelData(state.params, function (response) {
            context.commit('changeRiskLevelData', response)
        })
    },
    //根据风险指数对区域进行排序
    getInitRiskIndexData(context) {
        dataService.getInitRiskIndexData(state.params, function (response) {
            // console.log(response)
            context.commit('changeRiskIndexData', response)
        })
    },
    //显示每个区域的高风险数量
    getInitRiskNumberRank(context) {
        dataService.getInitRiskNumberRank(state.params, function (response) {
            context.commit('changeRiskNumberRank', response)
        })
    },
    //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
    getInitNumberTop(context) {
        dataService.getInitNumberTop(state.param3, function (response) {
            context.commit('changeNumberTop', response)
        })
    },
    //按年份显示总部的高中低风险等级对应的隐患数量
    getHeadRiskLevelYear(context) {
        dataService.getHeadRiskLevelYear(state.params, function (response) {
            context.commit('changeHeadRiskLevelYear', response)
        })
    },
    //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
    getHeadOtherNumberTop(context) {
        dataService.getHeadOtherNumberTop(state.param4, function (response) {
            context.commit('changeOtherNumberTop', response)
        })
    },
    //按照检查次数对区域排名
    getHeadCheckRank(context) {
        dataService.getHeadCheckRank(state.params, function (response) {
            context.commit('changeHeadCheckRank', response)
        })
    },
    //各专业隐患数量占比
    getHeadMajorRatio(context) {
        dataService.getHeadMajorRatio(state.params, function (response) {
            context.commit('changeHeadMajorRatio', response)
        })
    },
    // 各致因阶段的隐患数量占比情况
    getHeadStageRatio(context) {
        dataService.getHeadStageRatio(state.params, function (response) {
            context.commit('changeHeadStageRatio', response)
        })
    },
    // 各分布区域的隐患数量占比情况
    getHeadAreaRatio(context) {
        dataService.getHeadAreaRatio(state.params, function (response) {
            context.commit('changeHeadAreaRatio', response)
        })
    },
    // 展示按照项目数量对区域排名
    getHeadProjectRank(context) {
        dataService.getHeadProjectRank(state.params, function (response) {
            context.commit('changeHeadProjectRank', response)
        })
    },



    // //得到总部整改率
    // getInitRectification(context) {
    //     dataService.getInitRectification(state.params, function (response) {
    //         context.commit('changeRectification', response)
    //     })
    // },
    // //得到未整改高风险图片
    // getInitImage(context) {
    //     dataService.getInitImage(state.params, function (response) {
    //         context.commit('changeImage', response)
    //     })
    // },
    // //得到总部级所有当前未整改的高风险隐患列表
    // getInitRiskList(context) {
    //     dataService.getInitRiskList(state.params, function (response) {
    //         context.commit('changeRiskLevelList', response)
    //     })
    // },
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //head_name也需要封装
    changeHeadName(state, data) {
        state.head_name = data.head_name
    },
    //显示整个总部检查后的总体危险指数以及各专业对应的危险指数
    changeIndexData(state, data) {
        // console.log("aa", data)
        if (data.code === 10000) {
            state.risk_index_data = data.data;
        } else {
            alert("出错了")
        }
    },
    //展示总部各风险等级及其对应的隐患数量
    changeRiskLevelData(state, data) {
        if (data.code === 10000) {
            state.risk_level_data = data.data;
        } else {
            alert("出错了")
        }
    },
    //根据风险指数对区域进行排序
    changeRiskIndexData(state, data) {
        if (data.code === 10000) {
            state.risk_index_data = data
        } else {
            alert("出错了")
        }
    },
    //显示每个区域的高风险数量
    changeRiskNumberRank(state, data) {
        if (data.code === 10000) {
            state.risk_number_rank = data.data;
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam3(state, data) {
        state.param3 = data.params
    },
    //显示在不同条件(专业/系统)下隐患数量排名前top的隐患
    changeNumberTop(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.risk_number_top = data.data;
        } else {
            alert("出错了")
        }
    },
    //按年份显示总部的高中低风险等级对应的隐患数量
    changeHeadRiskLevelYear(state, data) {
        // console.log("aa", data)
        if (data.code === 10000) {
            state.risk_level_year = data.data;
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam4(state, data) {
        state.param4 = data.params
    },
    //显示在不同条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患
    changeOtherNumberTop(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.other_number_top = data.data;
        } else {
            alert("出错了")
        }
    },
    //按照检查次数对区域排名
    changeHeadCheckRank(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.rank_by_check = data.data;
        } else {
            alert("出错了")
        }
    },
    //各专业隐患数量占比
    changeHeadMajorRatio(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.head_major_ratio = data.data;
        } else {
            alert("出错了")
        }
    },
    // 各致因阶段的隐患数量占比情况
    changeHeadStageRatio(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.head_stage_ratio = data.data;
        } else {
            alert("出错了")
        }
    },
    // 各分布区域的隐患数量占比情况
    changeHeadAreaRatio(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.head_area_ratio = data.data;
        } else {
            alert("出错了")
        }
    },
    // 展示按照项目数量对区域排名
    changeHeadProjectRank(state, data) {
        // console.log("top", data)
        if (data.code === 10000) {
            state.rank_by_prj = data.data;
        } else {
            alert("出错了")
        }
    },

    // //考虑总部整改率变化
    // changeRectification(state, data) {
    //     // console.log("aa", data)
    //     if (data.code === 10000) {
    //         state.rectification = data.data.rectification;
    //     } else {
    //         alert("出错了")
    //     }
    // },
    // //考虑
    // changeImage(state, data) {
    //     console.log("image", data)
    //     if (data.code === 10000) {
    //         state.images = data.data;
    //     } else {
    //         alert("出错了")
    //     }
    // },
    // //考虑所有当前未整改的高风险隐患列表
    // changeRiskLevelList(state, data) {
    //     console.log("未整改", data)
    //     if (data.code === 10000) {
    //         state.risk_list = data.data.note_list;
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