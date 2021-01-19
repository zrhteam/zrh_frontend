import dataService from '@/service/dataService'

//initial state
const state = {
    // 向后端发送的参数 ???
    params: {},
    // 主图上每个insight的数据
    insightList: [],
    // 每个参考图的数据列表，包含图表属性(chartKey, pid, type)
    chartDataList: [],
    // 每次点击的key
    chartKey: 0,
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(state) {
        return state.params
    },
    //承载渲染时需要的主图的insight数据，和点击后子图的数据
    renderInsightList(state) {
        return state.insightList
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
}

//mutations
const mutations = {
    // 考虑分析视图中的insight和他的ref图表
    changeInsightList(state, data) {
        // debugger
        console.log("change")
        state.insightList = data
    },
    // 添加新的图表。data包含pid，type
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
