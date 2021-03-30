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
        <el-scrollbar style="height: 100%">
          <el-tree
              class="filter-tree"
              :data="data"
              node-key="id"
              :props="defaultProps"
              @node-click="handleNodeClick"
              @check="handleCheck"
              :default-expanded-keys="expandedKeys"
              :filter-node-method="filterNode"
              accordion
              :show-checkbox="showCheckbox"
              highlight-current
              @node-expand="treeExpand"
              :expand-on-click-node="true"
              ref="modelTree">
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
    }
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
    };
  },
  watch: {
    filterText(val) {
      this.$refs.modelTree.filter(val);
    }
  },
  methods: {
    getTreeData(tree_data) {
      this.expandedKeys = this.$store.state.get_login.expandedKeys
      if (this.$store.state.get_login.now_node != -1) {
        let arr = this.expandedKeys
        arr.push(this.$store.state.get_login.now_node)
        this.$store.commit('get_login/changeExpandedKeys', {params: arr})
        this.expandedKeys = this.$store.state.get_login.expandedKeys
      }
      let arr = []//树形控件
      let pp = []//包含每个检查经纬度坐标的一个数组
      let count = 1;
      for (let i in tree_data['headquarter_tag']) {
        // let parent1 = [];
        let parent1 = {
          id: 0,
          label: '',
          level: 1,
          children: []
        };
        parent1['id'] = count++
        parent1['label'] = i
        arr.push(parent1)
        if (this.user_grant === '总部') {
          let arr = this.expandedKeys
          arr.push(parent1.id)
          this.$store.commit('get_login/changeExpandedKeys', {params: arr})
          this.expandedKeys = this.$store.state.get_login.expandedKeys
        }
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          let parent2 = {
            id: 0,
            label: '',
            level: 2,
            pos: [],
            children: []
          };
          parent2['id'] = count++
          parent2['label'] = j
          if (this.user_grant === '区域') {
            let arr = this.expandedKeys
            arr.push(parent2.id)
            this.$store.commit('get_login/changeExpandedKeys', {params: arr})
            this.expandedKeys = this.$store.state.get_login.expandedKeys
          }
          let r_p = [];//每个区域围成一个多边形并存入经纬度数组pp
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            let child1 = {
              id: 0,
              label: '',
              level: 3,
              pos: [],
              children: []
            };
            child1['id'] = count++
            child1['label'] = k
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                let child2 = {
                  id: 0,
                  label: '',
                  level: 4
                };
                child2['id'] = count++
                child2['label'] = m
                child1['children'].push(child2)
                if (this.user_grant === '项目') {
                  let arr = this.expandedKeys
                  arr.push(child2.id)
                  this.$store.commit('get_login/changeExpandedKeys', {params: arr})
                  this.expandedKeys = this.$store.state.get_login.expandedKeys
                }
                //一个项目是不是只有一个坐标
                let sub_p = []
                sub_p.push(tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lat)
                sub_p.push(tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lng)
                if (r_p.indexOf(sub_p) == -1) {
                  r_p.push(sub_p)
                  child1['pos'].push(sub_p[0])
                  child1['pos'].push(sub_p[1])
                }
                // obj['lat'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lat
                // obj['lng'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lng
                // p_arr.push(obj)
              }
            }
            parent2['children'].push(child1)
          }
          let area = 0;
          let x = 0;
          let y = 0;
          for (let i = 1; i <= r_p.length; i++) {
            let lat = r_p[i % r_p.length][0];
            let lng = r_p[i % r_p.length][1];
            let nextLat = r_p[i - 1][0];
            let nextLng = r_p[i - 1][1];
            let temp = (lat * nextLng - lng * nextLat) / 2;
            area += temp;
            x += (temp * (lat + nextLat)) / 3;
            y += (temp * (lng + nextLng)) / 3;
          }
          x = x / area;
          y = y / area;
          parent2['pos'].push(x)
          parent2['pos'].push(y)
          parent1['children'].push(parent2)
          pp.push(r_p)
        }
      }
      this.$store.commit('get_login/changeExpandedKeys', {params: this.expandedKeys})
      this.$store.commit('get_login/changePosition', {params: pp})
      this.data = arr
      // this.$store.state.get_login.tree_data = arr
      // this.p_data = p_arr
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      this.$store.commit('get_login/changeNowNode', {params: data.id})
      // this.expandedKeys.push(data.id)
      this.getTreeData(this.treeObj1)
      this.$emit('handleNodeClick', data, node)
    },
    handleCheck(a, b) {
      this.$emit('handleCheck', a, b, this.$refs.modelTree.getNode(a.id).level)
    },
    treeExpand(data, node, self) {
      // console.log("add",this.expandedKeys)
      let arr = this.expandedKeys
      arr.push(data.id)
      this.$store.commit('get_login/changeExpandedKeys', {params: arr})
      this.expandedKeys = this.$store.state.get_login.expandedKeys
    }
  },
  created() {
    // console.log("区域", this.$store.state.get_login.grant_data.data)
    this.getTreeData(this.treeObj1)
  },
  // mounted() {
  //   console.log("区域", this.$store.state.get_login.grant_data.data)
  //   this.getTreeData(this.treeObj1)
  // },
}
</script>

<style scoped>
.filter-tree {
  max-width: 500px;
  max-height: 2000px;
  overflow: scroll;
  background-color: transparent;
}

.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

.span-ellipsis {
  font-size: 0.1em;
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
}

el-input::-webkit-input-placeholder {
  color: #1bcff2 !important;
}

/deep/ input::-webkit-input-placeholder {
  color: #1bcff2 !important;
  -webkit-text-fill-color: #1bcff2 !important;
}

.el-input .el-input--prefix {
  height: 0.5rem !important;
  color: #1bcff2;
}

/*i .el-input__icon >>> .el-icon-search::before {*/
/*  color: #1bcff2 !important;*/
/*}*/


.el-icon-search:before {
  content: "\e608";
  color: #1bcff2 !important;
}

</style>