import axios from 'axios'
import dataService from '@/service/dataService'

//initial state
const state = {
    //向后端发送的参数
    params: {},
    //登录时保存用户名
    user_name: '',
    // //密码
    // password: null,
    //权限对应等级所包含的总部、区域、项目和检查
    grant_data: [],
    //针对树形目录准备的
    tree_data: [],
//    存已解析的经纬度 总部到区域的二维数组
    position: [],

    now_node: -1,
    //默认展开的数组
    expandedKeys: [],
    //查询该用户下的授权数据
    grant_info: {},
    //查询需发送用户名
    param_name: {},

    //四个层级都有的隐患描述的查询条件
    danger_selection: [],
    masking: false, // 脱敏标记，脱敏表示true
    hide_tag: []
}

//getters
const getters = {
    //向后端发送的参数
    renderParams(params) {
        return state.params;
    },
    //承载变化的权限对应等级所包含的总部、区域、项目和检查
    renderGrantData(state) {
        return state.grant_data;
    },
    renderTreeData(state) {
        return state.tree_data;
    },
}

//actions
const actions = {
    //得到权限对应等级所包含的总部、区域、项目和检查
    getLoginGrant(context) {
        dataService.getLoginGrant(state.params, function (response) {
            context.commit('changeGrantData', response)
        })
    },
//    查询该用户下的授权数据
    getGrantInfo(context) {
        dataService.getGrantInfo(state.param_name, function (response) {
            context.commit('changeGrantInfo', response)
        })
    },
    //得到四个层级的隐患描述需要的筛选条件
    getDangerSelection(context) {
        dataService.getDangerSelection(state.param_name, function (response) {
            context.commit('changeDangerSelection', response)
        })
    },
    // 得到脱敏数据
    getHideTag(context) {
        dataService.getHideTag(state.param_name, function (response) {
            context.commit('changeHideTag', response)
        })
    },
}

//mutations
const mutations = {
    changeParams(state, data) {
        state.params = data.params
    },
    //登录时保存用户名
    changeUserName(state, data) {
        state.user_name = data.data
    },
    changePosition(state, data) {
        state.position = data.params
    },
    //考虑权限对应等级所包含的总部、区域、项目和检查
    changeGrantData(state, data) {
        state.grant_data = data
    },
    changeTreeData(state, data) {
        state.tree_data = data.params
    },
    changeNowNode(state, data) {
        // debugger
        // console.log("change")
        state.now_node = data.params
    },
    changeExpandedKeys(state, data) {
        state.expandedKeys = data.param
    },
//    查询该用户下的授权数据
    changeGrantInfo(state, data) {
        state.grant_info = data
    },
//    查询需发送用户名
    changeNameParam(state, data) {
        state.param_name = data.params
    },
    //得到四个层级的隐患描述需要的筛选条件
    changeDangerSelection(state, data) {
        let arr = []
        let count = 1
        for (let i in data.data) {
            if (i == 'major_name') {
                for (let j in data.data[i]) {
                    let obj = {
                        value: '',
                        label: '',
                        belong: '',
                        children: []
                    }
                    obj['value'] = count++
                    obj['label'] = j
                    obj['belong'] = i
                    for (let k in data.data[i][j]) {
                        for (let l in data.data[i][j][k]) {
                            let child_obj = {
                                value: '',
                                label: '',
                                belong: '',
                                children2: []
                            }
                            child_obj['value'] = count++
                            child_obj['label'] = data.data[i][j][k][l]
                            child_obj["belong"] = k
                            obj['children'].push(child_obj)
                        }
                    }
                    arr.push(obj)
                }
            } else if (i == 'risk_level') {
                for (let j in data.data[i]) {
                    let obj = {
                        value: '',
                        label: '',
                        belong: '',
                        children1: []
                    }
                    if (data.data[i][j] == 1) {
                        obj['value'] = count++
                        obj['label'] = '低风险'
                    }else if (data.data[i][j] == 2) {
                        obj['value'] = count++
                        obj['label'] = '中风险'
                    }else if (data.data[i][j] == 3) {
                        obj['value'] = count++
                        obj['label'] = '高风险'
                    }
                    obj["belong"] = i
                    arr.push(obj)
                }
            } else if (i == 'stage') {
                for (let j in data.data[i]) {
                    let obj = {
                        value: '',
                        label: '',
                        belong: '',
                        children1: []
                    }
                    obj['value'] = count++
                    obj['label'] = data.data[i][j]
                    obj["belong"] = i
                    arr.push(obj)
                }
            }
        }
        state.danger_selection = arr
    },
    // 更改脱敏状态
    changeMasking(state, data) {
        state.masking = data.param
    },
    // 脱敏数据
    changeHideTag(state, data) {
        state.hide_tag = data
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
