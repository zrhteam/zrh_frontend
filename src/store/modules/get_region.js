import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //区域名称也需要封装
    region_name: '',
    //显示该区域整体安全指数以及各专业安全指数
    region_index: {},
    //显示该区域各风险等级对应的隐患数量
    risk_level_data: {},
    //按照年份显示该区域各等级风险对应的隐患数量
    risk_level_year: {},
    //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
    images: {},

    //筛选
    param3: {},
    //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
    risk_number_top: {},

    //筛选
    param4: {},
    //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
    risk_other_top: {},
    //显示按照安全指数排名后的 项目名称
    prjname_by_index: {},
    //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
    high_risk_rank: {},
    //基于该区域每个项目的检查次数对项目排名
    rank_by_check: {},
    //显示该区域各专业隐患占比情况
    region_major_ratio: {},

    //筛选专业
    param2: {},
    //筛选专业,封装所有专业
    all_majors: [],
    //显示该区域不同专业下各系统隐患占比情况
    region_sys_ratio: {},
    //根据隐患数量显示不同致因阶段的占比情况
    region_stage_ratio: {},
    //根据隐患数量显示不同分布区域的占比情况
    region_area_ratio: {},
    //根据隐患数量显示不同风险等级的占比情况
    region_level_ratio: {},

    //按专业分不同风险等级隐患数量
    region_risk_level_ratio: {},

    //红线
    region_danger_problem: {}


    // //已检查项目
    // examine_number: null,
    // //当前未整改隐患列表
    // no_rectification_risk: {},
    // //所有项目发现的隐患在各专业的分布
    // risk_distribution: {},
    // //项目安全指数排名
    // //safety_index: {},
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //显示该区域整体安全指数以及各专业安全指数
    renderRegionIndex(state){
        return state.region_index;
    },
    //显示该区域各风险等级对应的隐患数量
    renderRiskLevelData(state) {
        return state.risk_level_data;
    },
    //按照年份显示该区域各等级风险对应的隐患数量
    renderRiskLevelYear(state) {
        return state.risk_level_year;
    },
    //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
    renderImages(state) {
        return state.images;
    },
    //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
    renderRiskNumberTop(state) {
        return state.risk_number_top;
    },
    //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
    renderRiskOtherTop(state) {
        return state.risk_other_top;
    },
    //显示按照安全指数排名后的 项目名称
    renderRegionSafetyIndex(state) {
        return state.prjname_by_index;
    },
    //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
    renderHighRiskRank(state){
        return state.high_risk_rank;
    },
    //基于该区域每个项目的检查次数对项目排名
    renderRegionCheckRank(state){
        return state.rank_by_check;
    },
    //显示该区域各专业隐患占比情况
    renderRegionMajorRatio(state){
        return state.region_major_ratio;
    },
    //显示该区域不同专业下各系统隐患占比情况
    renderRegionSysRatio(state){
        return state.region_sys_ratio;
    },
    //根据隐患数量显示不同致因阶段的占比情况
    renderRegionStageRatio(state){
        return state.region_stage_ratio;
    },
    //根据隐患数量显示不同分布区域的占比情况
    renderRegionAreaRatio(state){
        return state.region_area_ratio;
    },
    //根据隐患数量显示不同风险等级的占比情况
    renderRegionLevelRatio(state){
        return state.region_level_ratio;
    },

    // //承载变化的总部整改率
    // renderExamineNumber(state) {
    //     return state.examine_number;
    // },
    //
    // //承载当前未整改高风险隐患列表
    // renderNoRectification(state) {
    //     return state.no_rectification_risk;
    // },
    // //承载变化的各隐患在各专业的分布
    // renderRiskDistribution(state) {
    //     return state.risk_distribution;
    // },
}

//actions
const actions = {
    //显示该区域整体安全指数以及各专业安全指数
    getRegionInitIndex(context) {
        dataService.getRegionInitIndex(context.state.params, function (response) {
            context.commit('changeRegionIndex', response)
        })
    },
    //显示该区域各风险等级对应的隐患数量
    getInitRegionRiskLevel(context) {
        dataService.getInitRegionRiskLevel(context.state.params, function (response) {
            context.commit('changeRiskLevelData', response)
        })
    },
    //按照年份显示该区域各等级风险对应的隐患数量
    getRegionRiskLevelYear(context) {
        dataService.getRegionRiskLevelYear(context.state.params, function (response) {
            context.commit('changeRiskLevelYear', response)
        })
    },
    //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
    getInitRegionImage(context) {
        dataService.getInitRegionImage(context.state.params, function (response) {
            context.commit('changeImage', response)
        })
    },
    //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
    getInitRegionNumberTop(context) {
        dataService.getInitRegionNumberTop(context.state.param3, function (response) {
            //console.log(response)
            context.commit('changeNumberTop', response)
        })
    },
    //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
    getRegionOtherTop(context) {
        dataService.getRegionOtherTop(context.state.param4, function (response) {
            //console.log(response)
            context.commit('changeOtherTop', response)
        })
    },
    //显示按照安全指数排名后的 项目名称
    getInitRegionSafetyIndex(context) {
        dataService.getInitRegionSafetyIndex(context.state.params, function (response) {
            //console.log(response)
            context.commit('changeRegionSafetyIndex', response)
        })
    },
    //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
    getInitRegionRiskRank(context) {
        dataService.getInitRegionRiskRank(context.state.params, function (response) {
            //console.log(response)
            context.commit('changeHighRiskRank', response)
        })
    },
    //基于该区域每个项目的检查次数对项目排名
    getRegionCheckRank(context) {
        dataService.getRegionCheckRank(context.state.params, function (response) {
            //console.log(response)
            context.commit('changeRegionCheckRank', response)
        })
    },
    //显示该区域各专业隐患占比情况
    getRegionMajorRatio(context) {
        dataService.getRegionMajorRatio(context.state.params, function (response) {
            //console.log(response)
            context.commit('changeRegionMajorRatio', response)
        })
    },
    //显示该区域不同专业下各系统隐患占比情况
    getRegionSystemRatio(context) {
        dataService.getRegionSystemRatio(context.state.param2, function (response) {
            //console.log(response)
            context.commit('changeRegionSysRatio', response)
        })
    },
    //根据隐患数量显示不同致因阶段的占比情况
    getRegionStageRatio(context) {
        dataService.getRegionStageRatio(context.state.params, function (response) {
            //console.log(response)
            context.commit('changeRegionStageRatio', response)
        })
    },
    //根据隐患数量显示不同分布区域的占比情况
    getRegionAreaRatio(context) {
        dataService.getRegionAreaRatio(context.state.params, function (response) {
            //console.log(response)
            context.commit('changeRegionAreaRatio', response)
        })
    },

    //按专业分不同风险等级隐患数量
    getRegionRiskLevelRatio(context) {
        dataService.getRegionRiskLevelRatio(context.state.params, function (response) {
            context.commit('changeRegionRiskLevelRatio', response)
        })
    },

    //红线
    getRegionDangerProblem(context) {
        dataService.getRegionDangerProblem(context.state.params, function (response) {
            context.commit('changeRegionDangerProblem', response)
        })
    },
    // //根据隐患数量显示不同风险等级的占比情况
    // getRegionLevelRatio(context) {
    //     dataService.getRegionLevelRatio(state.params, function (response) {
    //         //console.log(response)
    //         context.commit('changeRegionLevelRatio', response)
    //     })
    // },

    // //得到已检查项目的数量
    // getInitRegionProjectNumber(context) {
    //     dataService.getInitRegionProjectNumber(state.params, function (response) {
    //         console.log(response)
    //         context.commit('changeExamineNumber', response)
    //     })
    // },
    // //得到当前未整改高风险隐患列表
    // getInitRegionHighRisk(context) {
    //     dataService.getInitRegionHighRisk(state.params, function (response){
    //         context.commit('changeNoRectificationRisk', response)
    //     })
    // },
    // //得到所有项目在各专业的隐患分布情况
    // getInitRegionMajor(context) {
    //     dataService.getInitRegionMajor(state.params, function (response) {
    //         //console.log('distribution', response)
    //         context.commit('changeRiskDistribution', response)
    //     })
    // },

}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //区域名称也需要封装
    changeRegionName(state, data) {
        state.region_name = data.region_name
    },
    //显示该区域整体安全指数以及各专业安全指数
    changeRegionIndex(state, data) {
        if (data.code === 10000) {
            state.region_index = data.data;
        } else {
            alert("出错了")
        }
    },
    //显示该区域各风险等级对应的隐患数量
    changeRiskLevelData(state, data) {
        if (data.code === 10000) {
            state.risk_level_data = data.data.risk_level;
        } else {
            alert("出错了")
        }
    },
    //按照年份显示该区域各等级风险对应的隐患数量
    changeRiskLevelYear(state, data) {
        if (data.code === 10000) {
            state.risk_level_year = data.data;
        } else {
            alert("出错了")
        }
    },
    //显示该区域最新出现的10张未整改高风险隐患图片及该图片对应的检查名称和隐患描述
    changeImage(state, data) {
        if (data.code === 10000) {
            console.log('image', data.data)
            state.images = data.data;
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam3(state, data) {
        state.param3 = data.params
    },
    //显示在不同筛选条件（专业/系统）下隐患数量排名前top的隐患描述
    changeNumberTop(state, data) {
        if (data.code === 10000) {
            state.risk_number_top = data.data;
        } else {
            alert("出错了")
        }
    },

    //筛选
    changeParam4(state, data) {
        state.param4 = data.params
    },
    //显示在不同筛选条件（风险等级/致因阶段/分布区域）下隐患数量排名前top的隐患描述
    changeOtherTop(state, data) {
        if (data.code === 10000) {
            state.risk_other_top = data.data;
        } else {
            alert("出错了")
        }
    },
    //显示按照安全指数排名后的 项目名称
    changeRegionSafetyIndex(state, data) {
        if (data.code === 10000) {
            state.prjname_by_index = data.data;
        } else {
            alert("出错了")
        }
    },
    //显示按照隐累计高风险患数量排名后的项目名称 (原来的项目累计高风险数量排名)
    changeHighRiskRank(state, data) {
        if (data.code === 10000) {
            console.log('high', data.data)
            state.high_risk_rank = data.data;
        } else {
            alert("出错了")
        }
    },
    //基于该区域每个项目的检查次数对项目排名
    changeRegionCheckRank(state, data) {
        if (data.code === 10000) {
            // console.log('high', data.data)
            state.rank_by_check = data.data;
        } else {
            alert("出错了")
        }
    },
    //显示该区域各专业隐患占比情况
    changeRegionMajorRatio(state, data) {
        if (data.code === 10000) {
            // console.log('high', data.data)
            state.region_major_ratio = data.data;
        } else {
            alert("出错了")
        }
    },

    //筛选专业
    changeParam2(state, data) {
        state.param2 = data.params
    },
    //筛选专业，封装所有专业
    changeAllMajors(state, data) {
        state.all_majors = data.all_majors
    },
    //显示该区域不同专业下各系统隐患占比情况
    changeRegionSysRatio(state, data) {
        if (data.code === 10000) {
            // console.log('high', data.data)
            state.region_sys_ratio = data.data;
        } else {
            alert("出错了")
        }
    },
    //根据隐患数量显示不同致因阶段的占比情况
    changeRegionStageRatio(state, data) {
        if (data.code === 10000) {
            // console.log('high', data.data)
            state.region_stage_ratio = data.data;
        } else {
            alert("出错了")
        }
    },
    //根据隐患数量显示不同分布区域的占比情况
    changeRegionAreaRatio(state, data) {
        if (data.code === 10000) {
            // console.log('high', data.data)
            state.region_area_ratio = data.data;
        } else {
            alert("出错了")
        }
    },
    // //根据隐患数量显示不同风险等级的占比情况
    // changeRegionLevelRatio(state, data) {
    //     if (data.code === 10000) {
    //         // console.log('high', data.data)
    //         state.region_level_ratio = data.data;
    //     } else {
    //         alert("出错了")
    //     }
    // },

    //按专业分不同风险等级隐患数量
    changeRegionRiskLevelRatio(state, data) {
        if (data.code === 10000) {
            state.region_risk_level_ratio = data.data;
        } else {
            alert("出错了")
        }
    },

    //红线
    changeRegionDangerProblem(state, data) {
        if (data.code === 10000) {
            state.region_danger_problem = data.data;
            console.log('region_hongxian', data.data)
        } else {
            alert("出错了")
        }
    },

    // //考虑已检查项目数量
    // changeExamineNumber(state, data) {
    //     if (data.code === 10000) {
    //         state.examine_number = data.data.rectification_number;
    //     } else {
    //         alert("出错了")
    //     }
    // },
    // //考虑当前未整改高风险隐患列表
    // changeNoRectificationRisk(state, data){
    //     if (data.code === 10000) {
    //         state.no_rectification_risk = data.data;
    //     } else {
    //         alert("出错了")
    //     }
    // },
    // //考虑所有项目中各隐患在各专业上的分布情况
    // changeRiskDistribution(state, data) {
    //     if (data.code === 10000) {
    //         console.log('major', data.data)
    //         state.risk_distribution = data.data.project_distribution;
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