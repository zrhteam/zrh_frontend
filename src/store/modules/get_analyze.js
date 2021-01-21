import dataService from '@/service/dataService'

//initial state
const state = {
    // 向后端发送的参数 ???
    params: {},
    // 主图上每种insight的类型。
    seriesTypeList: [],
    // Key:     主图上每种insight的类型。
    // Value:   主图上每个insight的数据，每一项是一种insight的list。
    //          每个insight是 {value: [x, y], pid: PID, type: TYPE}
    insightMap: new Map(),
    // 每个参考图的数据列表，包含图表属性(chartKey, pid, type) + 图表元数据(chartMeta)
    chartDataList: [],
    // 每次点击的key
    chartKey: 0,
}

//getters
const getters = {
    // 向后端发送的参数
    renderParams(state) {
        return state.params
    },
    renderSeriesTypeList(state) {
        return state.seriesTypeList
    },
    // 渲染时需要的主图的insight数据
    renderInsightMap(state) {
        return state.insightMap
    },
    renderChartDataList(state) {
        return state.chartDataList
    },
    renderChartDataByKey(state) {
        return key => {
            return state.chartDataList.find(item => item.chartKey === key)
        }
    },
}

//actions
const actions = {
    // 从后台获取 insight list
    getInsightList(context) {
        dataService.getAnalyzeInsightList(state.params, function (response) {
            context.commit('changeInsightList', response)
        })
    },
    // 添加新的图表
    addNewRefChart(context, {pid, type}) {
        let param = new URLSearchParams({pid, type})
        dataService.getAnalyzeRefChartMeta(param, function (response) {
            context.commit('addChartData', {
                pid, type, chartMeta: response
            })
        })
    }
}

//mutations
const mutations = {
    // 更新分析视图中的insight数据
    changeInsightList(state, data) {
        // debugger
        console.log("change")
        // 得到两个list
        // 类型有top1, trend, ...
        let insightMap = new Map()
        for (let i = 0; i < data.length; i++) {
            let insight = data[i]
            let newItem = {
                pid: insight[0],
                value: [insight[1], insight[2]],
                type: insight[3],
            }
            if (insightMap.has(insight[3])) {
                insightMap.get(insight[3]).push(newItem)
            } else {
                insightMap.set(insight[3], [newItem])
            }
        }
        state.seriesTypeList = Array.from(insightMap.keys())
        state.insightMap = insightMap
    },
    // 添加新的图表。data包含pid, type, chartMeta
    addChartData(state, data) {
        // debugger
        console.log("change")
        let chartKey = state.chartKey
        state.chartDataList.push({...data, chartKey})
        state.chartKey += 1
    },
    removeChartData(state, { chartKey }) {
        // debugger
        console.log("change")
        state.chartDataList = state.chartDataList.filter((item) => {
            return item.chartKey !== chartKey
        })
    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
