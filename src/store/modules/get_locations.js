import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //得到一个包含所有经纬度的数组
    data: [],
    //得到所有的项目名、区域名、置地名
    name: {}
    // prj_name: {},
    // region_name: {},
    // head_name: {}
}

//getters
const getters = {
    //承载变化的data
    renderData(state) {
        return state.data;
    },

    renderName(state) {
        return state.name;
    },

    // renderPrjName(State) {
    //     return state.prj_name;
    // },
    //
    // renderRegionName(state) {
    //     return state.region_name;
    // },
    //
    // renderHeadName(state) {
    //     return state.head_name;
    // }
}

//actions
const actions = {
    //得到该地理位置的所有信息，包括地图上显示该位置并显示该位置所对应的风险等级
    getLocation(context) {
        dataService.getLocation(function (response) {
            // console.log(response)
            context.commit('changeData', response)
        })
    },
    getProjectionMap(context) {
        dataService.getProjectionMap(function (response) {
            // console.log(response)
            context.commit('changeName', response)
        })
    },
}

//mutations
const mutations = {
    //考虑data如何变化
    changeData(state, data) {
        state.data = data
        // console.log(state.data)
    },
    getLocation(state, loc){
        return state.map.latLngToLayerPoint(loc)
    },
    changeName(state, data) {
        state.name = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}