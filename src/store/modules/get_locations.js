import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //得到一个包含所有经纬度的数组
    data: []
}

//getters
const getters = {
    //承载变化的data
    renderData(state) {
        return state.data;
    }
}

//actions
const actions = {
    //得到该地理位置的所有信息，包括地图上显示该位置并显示该位置所对应的风险等级
    getLocation(context) {
        dataService.getLocation(function (response) {
            // console.log(response)
            context.commit('changeData', response)
        })
    }
}

//mutations
const mutations = {
    //考虑data如何变化
    changeData(state, data) {
        state.data = data
        // console.log(state.data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}