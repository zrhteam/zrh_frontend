<template>
  <div>
    <el-input
        prefix-icon="el-icon-search"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
    </el-input>
    <el-card class="box-card-list" shadow="never"
             style="background-color: transparent; height: 96%">

      <div style="height: 80%; margin-top: 0.15rem">
        <el-scrollbar v-if="show" style="height: 100%">
          <el-tree
              class="filter-tree"
              node-key="id"
              ref="modelTree"
              accordion
              :data="data"
              :props="defaultProps"
              :default-expanded-keys="expandedKeys"
              :show-checkbox="showCheckbox"
              highlight-current
              :expand-on-click-node="false"
              :current-node-key="currentNodeKey"
              :filter-node-method="filterNode"
              @node-click="nodeClick"
              @check="handleCheck"

          >
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                  <span :title="node.label">{{ node.label }}</span>
                                </span>
          </el-tree>
        </el-scrollbar>
        <el-scrollbar v-if="!show" style="height: 100%">
          <el-tree
              class="filter-tree"
              node-key="id"
              ref="modelTree"
              accordion
              :data="data"
              :props="defaultProps"
              :default-expanded-keys="expandedKeys"
              :show-checkbox="showCheckbox"
              highlight-current
              :expand-on-click-node="false"
              :current-node-key="currentNodeKey"
              :filter-node-method="filterNode"
              @node-click="nodeClick"
              @check="handleCheck"

          >
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                  <span :title="node.label">{{ node.label }}</span>
                                </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Tree",
  props: {
    treeObj: {
      type: Object
    },
    showCheckbox: {
      type: Boolean
    },
    highlightCurrent: {
      type: Boolean
    },
    expandOnClickNode: {
      type: Boolean
    },
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [],
      map: "",
      treeObj1: this.treeObj,
      user_grant: this.$store.state.get_login.grant_data.data.user_grant,//当前用户的权限
      expandedKeys: this.$store.state.get_login.expandedKeys,
      keys: this.$store.state.get_login.expandedKeys,
      currentNodeKey: '',
      show: true, // true表示未脱敏，false表示已脱敏
      count: 0,
      first_id: 1
    };
  },
  watch: {
    filterText(val) {
      this.$refs.modelTree.filter(val);
    },
    currentNodeKey(id) {
      this.$refs.modelTree.setCurrentKey(id);
    },
    data: {
      handler() {
        if (this.$store.state.get_login.grant_data.data.user_grant == "超级用户") {
          if (this.$store.state.get_login.expandedKeys.length == 0) {
            if (this.count == 0) {
              if (this.$store.state.get_login.masking == false) {
                this.expandedKeys.push(34)
                this.$refs.modelTree.setCurrentKey(34);
              } else if (this.$store.state.get_login.masking == true) {
                this.expandedKeys.push(708)
                this.$refs.modelTree.setCurrentKey(708);
              }
              this.count = 1
            }
          }
        } else if (this.$store.state.get_login.grant_data.data.user_grant == "总部") {
          if (this.$store.state.get_login.expandedKeys == undefined || this.$store.state.get_login.expandedKeys.length == 0) {
            if (this.count == 0) {
              this.expandedKeys.push(this.first_id)
              this.$refs.modelTree.setCurrentKey(this.first_id);
              this.count = 1
            }
          }
        } else if (this.$store.state.get_login.grant_data.data.user_grant == "区域") {
          if (this.$store.state.get_login.expandedKeys == undefined || this.$store.state.get_login.expandedKeys.length == 0) {
            if (this.count == 0) {
              this.expandedKeys.push(this.first_id)
              this.$refs.modelTree.setCurrentKey(this.first_id);
              this.count = 1
            }
          }
        } else if (this.$store.state.get_login.grant_data.data.user_grant == "项目") {
          if (this.$store.state.get_login.expandedKeys == undefined || this.$store.state.get_login.expandedKeys.length == 0) {
            if (this.count == 0) {
              this.expandedKeys.push(this.first_id)
              this.$refs.modelTree.setCurrentKey(this.first_id);
              this.count = 1
            }
          }
        }
        // this.$store.commit('get_login/changeExpandedKeys', {param: this.expandedKeys})
      }
    }
  },
  methods: {
    getTreeData(tree_data) {
      // this.expandedKeys = this.keys
      if ((this.user_grant != "超级用户") || (this.$store.state.get_login.masking == false)) {
        let arr = []//树形控件
        let count = 1;
        for (let i in tree_data['headquarter_tag']) {
          let parent1 = {
            id: 0,
            label: '',
            level: 1,
            children: [],
            value: ''
          };
          parent1['id'] = count++
          parent1['label'] = i
          parent1['value'] = i
          arr.push(parent1)
          if (this.user_grant === '总部') {
            this.first_id = parent1.id
          }
          for (var j in tree_data['headquarter_tag'][i]['region_tag']) {
            let parent2 = {
              id: 0,
              label: '',
              level: 2,
              children: [],
              value: ''
            };
            parent2['id'] = count++
            parent2['label'] = j
            parent2['value'] = j
            if (this.user_grant === '区域') {
              this.first_id = parent2.id
            }
            for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
              let child1 = {
                id: 0,
                label: '',
                level: 3,
                children: [],
                value: ''
              };
              child1['id'] = count++
              child1['label'] = k
              child1['value'] = k
              if (this.user_grant === '项目') {
                this.first_id = child1.id
              }
              for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
                for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                  let child2 = {
                    id: 0,
                    label: '',
                    level: 4,
                    value: ''
                  };
                  child2['id'] = count++
                  child2['label'] = m
                  child2['value'] = m
                  child1['children'].push(child2)
                }
              }
              parent2['children'].push(child1)
            }
            parent1['children'].push(parent2)
          }
          for (var j in tree_data['headquarter_tag'][i]['project_tag']) {
            var parent2 = {
              id: 0,
              label: '',
              level: 3,
              children: [],
              value: ''
            };
            parent2['id'] = count++
            parent2['label'] = j
            parent2['value'] = j
            if (this.user_grant === '项目') {
              this.first_id = parent2.id
            }
            for (var k in tree_data['headquarter_tag'][i]['project_tag'][j]) {
              for (var l in tree_data['headquarter_tag'][i]['project_tag'][j][k]) {
                var child2 = {
                  id: 0,
                  label: '',
                  level: 4,
                  value: ''
                };
                child2['id'] = count++
                child2['label'] = l
                child2['value'] = l
                parent2['children'].push(child2)
              }
            }
            parent1['children'].push(parent2)
          }
        }
        this.data = arr
      } else if (this.$store.state.get_login.masking == true) {
        // 需要脱敏的情况
        this.data = this.$store.state.get_login.hide_tag
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nodeClick(data, node) {
      this.$store.commit('get_login/changeNowNode', {params: data.id})
      // this.expandedKeys.push(data.id)
      // this.getTreeData(this.treeObj1)
      // 点击了一个节点，
      // var temp_arr = this.keys
      var temp_arr = this.expandedKeys
      let last_node = 0
      // 第一次点击节点
      if (temp_arr.length == 0) {
        temp_arr.push(data.id)
        // this.$store.commit('get_login/changeExpandedKeys', {param: temp_arr})
        this.$refs.modelTree.store.nodesMap[data.id].expanded = true;
      } else {
        // 如果是重复点击了自身、或是上一节点的父亲/祖父，这些节点已经存在于this.expandedKeys，将数组中该点之后的点全部删除
        let t = temp_arr.length
        last_node = temp_arr[t - 1]
        for (let i = 0; i < temp_arr.length; i++) {
          if (temp_arr[i] == data.id) {
            t = i
          }
        }
        if (t < temp_arr.length) {
          this.$refs.modelTree.store.nodesMap[data.id].expanded = false;
        }
        for (let i = t + 1; i < temp_arr.length; i++) {
          // this.$refs.modelTree.store.nodesMap[t-1-i].expanded = false;
          temp_arr.pop()
        }
        // 上一节点父亲的兄弟，则他们有相同的父节点

        // 如果是上一点击节点的兄弟，则他们有相同的父节点
        if (t == temp_arr.length && temp_arr[temp_arr.length - 2] == node.parent.data.id) {
          temp_arr.pop()
          temp_arr.push(data.id)
          // this.$store.commit('get_login/changeExpandedKeys', {param: temp_arr})
          this.$refs.modelTree.store.nodesMap[last_node].expanded = false;
        } else if (t == temp_arr.length && temp_arr[temp_arr.length - 2] != node.parent.data.id) {// 如果是上一点击节点的孩子，就在[]加入该节点
          temp_arr.push(data.id)
          // this.$store.commit('get_login/changeExpandedKeys', {param: temp_arr})
          // this.$refs.modelTree.store.nodesMap[node.parent.data.id].expanded = true;
          this.$refs.modelTree.store.nodesMap[data.id].expanded = true;
        }
      }
      //如果用户权限是超级用户，点击的level是1，把数组清空重新赋
      if(this.$store.state.get_login.grant_data.data.user_grant == "超级用户" && data.level==1) {
        for (var i = 0; i < temp_arr.length; i++) {
          this.$refs.modelTree.store.nodesMap[temp_arr[i]].expanded = false
        }
        temp_arr = []
        temp_arr.push(data.id)
        this.$refs.modelTree.store.nodesMap[data.id].expanded = true;
      }
      // for (let i in temp_arr) {
      //   this.$refs.modelTree.store.nodesMap[temp_arr[i]].expanded = true;
      // }
      // 找到点击节点的所有孩子节点
      // let child_node = []
      // for (let i in data['children']) {
      //   child_node.push(data['children'][i].id)
      // }
      // for (let i in child_node) {
      //   this.$refs.modelTree.store.nodesMap[child_node[i]].expanded = false;
      // }
      // this.keys = temp_arr
      this.expandedKeys = temp_arr
      this.$store.commit('get_login/changeExpandedKeys', {param: temp_arr})

      this.$nextTick(function () {
        if (this.$refs.modelTree != undefined) {
          this.$refs.modelTree.setCurrentKey(null);
          this.$refs.modelTree.setCurrentKey(data.id);
        }
      })
      this.$emit('handleNodeClick', data, node)
    },
    handleCheck(a, b) {
      this.$emit('handleCheck', a, b, this.$refs.modelTree.getNode(a.id).level)
    },
  },
  updated() {
    this.currentNodeKey = this.$store.state.get_login.now_node
  },
  created() {
    this.getTreeData(this.treeObj1)
    this.currentNodeKey = this.$store.state.get_login.now_node
    // 检查脱敏状态
    if (this.$store.state.get_login.masking == true) {
      this.show = false
    } else if (this.$store.state.get_login.masking == false) {
      this.show = true
    }
  },
}
</script>

<style scoped>
.filter-tree {
  max-width: 500px;
  max-height: 2000px;
  overflow: scroll;
  background-color: transparent;
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* firefox */
}


/deep/ .el-scrollbar__wrap {
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* firefox */
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.span-ellipsis {
  font-size: 0.15rem;
  text-align: left;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.el-input {
  display: block !important;
  width: 2.25rem !important;
  /*height: 0.5rem !important;*/
  border-color: #1bcff2 !important;
}

.el-card__body {
  padding: 0px !important;
}

.el-input >>> .el-input__inner {
  /*height: 0.75rem !important;*/
  color: #1bcff2 !important;
  border-color: #1bcff2 !important;
  border: 2px solid;
  font-size: 0.15rem !important;
}

/*google*/
el-input::-webkit-input-placeholder {
  font-size: 0.15rem;
  color: #1bcff2 !important;
}

/*firefox*/
el-input::-moz-placeholder {
  font-size: 0.15rem;
  color: #1bcff2 !important;
}

/*IE*/
el-input::-ms-input-placeholder {
  font-size: 0.15rem;
  color: #1bcff2 !important;
}

/*google*/
/deep/ input::-webkit-input-placeholder {
  color: #1bcff2 !important;
  -webkit-text-fill-color: #1bcff2 !important;
}

/*firebox*/
/deep/ input::-moz-placeholder {
  color: #1bcff2 !important;
  -webkit-text-fill-color: #1bcff2 !important;
}

/*IE*/
/deep/ input::-ms-input-placeholder {
  color: #1bcff2 !important;
  -webkit-text-fill-color: #1bcff2 !important;
}

/deep/ input::-webkit-input-placeholder {
  color: #1bcff2 !important;
  -webkit-text-fill-color: #1bcff2 !important;
}

.el-input .el-input--prefix {
  height: 0.5rem !important;
  color: #1bcff2;
}

/deep/ .el-input--prefix .el-input__inner {
  padding-left: 30px !important;
}

/*i .el-input__icon >>> .el-icon-search::before {*/
/*  color: #1bcff2 !important;*/
/*}*/

.el-icon-search:before {
  content: "\e608";
  color: #1bcff2 !important;
}

/deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  /*color: #000;*/
  background-color: #969696 !important;
}

/deep/ .el-tree--highlight-current
.el-tree-node.is-current
> .el-tree-node__content {
  background-color: #409eff;
  color: white;
}

</style>
