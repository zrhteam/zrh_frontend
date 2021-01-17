<template>
  <el-card class="box-card " shadow="never"
           style="background-color: transparent; height:74%; margin: 0px 5px 5px 5px">
    <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        size="mini">
    </el-input>
    <div style="height: 80%">
      <el-scrollbar style="height: 100%">
        <el-tree
            class="filter-tree"
            :data="data"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :default-expanded-keys="expandedKeys"
            :filter-node-method="filterNode"
            ref="tree">
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                  <span :title="node.label">{{ node.label }}</span>
                                </span>
        </el-tree>
      </el-scrollbar>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Tree",
  props: {
    treeObj: {
      type: Object
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
      treeObj: this.treeObj,
      user_grant: this.$store.state.get_login.grant_data.data.user_grant,//当前用户的权限
      expandedKeys: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    getTreeData(tree_data) {
      let arr = []//树形控件
      let p_arr = []//包含每个检查经纬度坐标的一个数组
      let count = 1;
      let obj = {
        lat: 0,
        lng: 0
      }
      for (let i in tree_data['headquarter_tag']) {
        // let parent1 = [];
        let parent1 = {
          id: 0,
          label: '',
          children: []
        };
        parent1['id'] = count++
        parent1['label'] = i
        arr.push(parent1)
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          let parent2 = {
            id: 0,
            label: '',
            children: []
          };
          parent2['id'] = count++
          parent2['label'] = j
          parent1['children'].push(parent2)
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            let child1 = {
              id: 0,
              label: '',
              children: []
            };
            child1['id'] = count++
            child1['label'] = k
            parent2['children'].push(child1)
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                let child2 = {
                  id: 0,
                  label: ''
                };
                child2['id'] = count++
                child2['label'] = m
                if(this.user_grant === '项目') {
                  child1['children'].push(child2)
                  this.expandedKeys.push(child2.id)
                }
                obj['lat'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lat
                obj['lng'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].lng
                p_arr.push(obj)
              }
            }
          }
        }
      }
      console.log("arr", arr)
      this.data = arr
      // this.$store.state.get_login.tree_data = arr
      this.p_data = p_arr
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      // console.log(data);
      // console.log(node);
      if(this.user_grant === '项目') {
        this.prjNodeClick(data, node)
      }
      else if (node.level == 3) {
        let param = new URLSearchParams();
        param.append('project_name', data.label);
        this.$store.state.get_project.params = param

        this.$store.dispatch('get_project/getInitProjectRectification')
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')
        this.$store.dispatch('get_project/getInitProjectNumberChange')
        // // 当前未整改高风险隐患列表
        this.$store.dispatch('get_project/getInitPrjRisk')
        // // 当前未整改高风险隐患图片
        this.$store.dispatch('get_project/getInitProjectImage')
        //
        // //占比
        this.$store.dispatch('get_project/getInitProjectSystem')
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        this.$store.dispatch('get_project/getInitProjectReason')

        //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
        this.$store.dispatch('get_project/getInitProjectRiskTop')
        var prj = document.getElementById('prj_subpart');
        prj.style.display = 'block'
        var check = document.getElementById('check_part');
        check.style.display = 'none'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'block'
        document.getElementById('check_charts').style.display = 'none'
        this.map.setZoom(4)
        setTimeout(function () {
          this.map.panTo(new L.LatLng(34, 107));
        }, 100)
      }
      else if (node.level == 4) {
        let param1 = new URLSearchParams();
        param1.append('check_code', data.label);
        this.$store.state.get_check.params = param1
        this.$store.dispatch('get_check/getCheckRectification')
        this.$store.dispatch('get_check/getCheckRiskLevel')
        this.$store.dispatch('get_check/getCheckRiskRatio')
        this.$store.dispatch('get_check/getCheckHighRisk')
        this.$store.dispatch('get_check/getCheckHighImage')
        this.$store.dispatch('get_check/getCheckMajorSystem')
        this.$store.dispatch('get_check/getCheckMajorArea')
        this.$store.dispatch('get_check/getCheckMajorStage')
        this.$store.dispatch('get_check/getCheckRiskTop')
        var prj = document.getElementById('prj_subpart');
        // debugger
        // if( document.getElementById("check_part").style.display==='none') {
        //   alert(1)
        // }
        prj.style.display = 'none'
        var check = document.getElementById('check_part');
        check.style.display = 'block'
        // document.getElementById('check_part').style.display = 'none'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'none'
        document.getElementById('check_charts').style.display = 'block'
        var large1 = document.getElementById('large1');
        large1.style.display = 'block'
        var large2 = document.getElementById('large2');
        large2.style.display = 'block'
        var prj_small = document.getElementById('prj_small');
        prj_small.style.display = 'none'
        this.map.setZoom(12)
        let _this = this
        setTimeout(function () {
          _this.map.panTo(new L.LatLng(31.8604, 117.3254));
        }, 100)
      } else if (node.level == 2) {
        // alert(this.$store.state.get_login.grant_data.data.user_grant)
        document.getElementById('region_part').style.display = 'block'
        var large1 = document.getElementById('large1');
        large1.style.display = 'none'
        var large2 = document.getElementById('large2');
        large2.style.display = 'none'
        var prj_small = document.getElementById('prj_small');
        prj_small.style.display = 'none'
        let region_large1 = document.getElementById('region_large1');
        region_large1.style.display = 'block'
        let region_large2 = document.getElementById('region_large2');
        region_large2.style.display = 'block'
        document.getElementById('prj_part').style.display = 'none'
        // let region_small = document.getElementById('region_small');
        // region_small.style.display = 'block'
      }
    },
    prjNodeClick(data, node) {
      if((node.level == 1) || (node.level == 2)) {
        alert("您没有权限")
      }
      else if (node.level == 3) {
        let param = new URLSearchParams();
        param.append('project_name', data.label);
        this.$store.state.get_project.params = param

        this.$store.dispatch('get_project/getInitProjectRectification')
        this.$store.dispatch('get_project/getInitProjectRiskLevel')
        this.$store.dispatch('get_project/getInitProjectHistoryPerception')
        this.$store.dispatch('get_project/getInitProjectNumberChange')
        // // 当前未整改高风险隐患列表
        this.$store.dispatch('get_project/getInitPrjRisk')
        // // 当前未整改高风险隐患图片
        this.$store.dispatch('get_project/getInitProjectImage')
        //
        // //占比
        this.$store.dispatch('get_project/getInitProjectSystem')
        this.$store.dispatch('get_project/getInitProjectRegionDistribution')
        this.$store.dispatch('get_project/getInitProjectReason')

        //  历次检查中出现次数排前5的隐患描述及其所属专业和出现次数
        this.$store.dispatch('get_project/getInitProjectRiskTop')
        var prj = document.getElementById('prj_subpart');
        prj.style.display = 'block'
        var check = document.getElementById('check_part');
        check.style.display = 'none'
        document.getElementById('map_1').style.display = 'none'
        document.getElementById('map_2').style.display = 'block'
        document.getElementById('prj_charts').style.display = 'block'
        document.getElementById('check_charts').style.display = 'none'
        this.map.setZoom(4)
        setTimeout(function () {
          this.map.panTo(new L.LatLng(34, 107));
        }, 100)
      }
      if (node.level == 4) {
        let param1 = new URLSearchParams();
        param1.append('check_code', data.label);
        this.$store.state.get_check.params = param1
        this.$store.dispatch('get_check/getCheckRectification')
        this.$store.dispatch('get_check/getCheckRiskLevel')
        this.$store.dispatch('get_check/getCheckRiskRatio')
        this.$store.dispatch('get_check/getCheckHighRisk')
        this.$store.dispatch('get_check/getCheckHighImage')
        this.$store.dispatch('get_check/getCheckMajorSystem')
        this.$store.dispatch('get_check/getCheckMajorArea')
        this.$store.dispatch('get_check/getCheckMajorStage')
        this.$store.dispatch('get_check/getCheckRiskTop')
        //首先要判断当前是在数据大屏页面还是在主页面
        if(document.getElementById("prj_small").style.display==='none') {//在主页面
          document.getElementById("prj_subpart").style.display = 'none'
          document.getElementById("prj_charts").style.display = 'none'
          document.getElementById("check_charts").style.display = 'block'
          document.getElementById("check_part").style.display = 'block'
        }
        else{alert(1)
          document.getElementById("prj_subpart").style.display = 'none'
          document.getElementById("prj_charts").style.display = 'none'
          document.getElementById("check_charts").style.display = 'block'
          document.getElementById("check_part").style.display = 'block'
          document.getElementById("large1").style.display = 'none'
          document.getElementById("large2").style.display = 'none'
        }
        // var prj = document.getElementById('prj_subpart');
        // // debugger
        // // if( document.getElementById("check_part").style.display==='none') {
        // //   alert(1)
        // // }
        // prj.style.display = 'none'
        // var check = document.getElementById('check_part');
        // check.style.display = 'block'
        // // document.getElementById('check_part').style.display = 'none'
        // document.getElementById('map_1').style.display = 'none'
        // document.getElementById('map_2').style.display = 'block'
        // document.getElementById('prj_charts').style.display = 'none'
        // document.getElementById('check_charts').style.display = 'block'
        // var large1 = document.getElementById('large1');
        // large1.style.display = 'block'
        // var large2 = document.getElementById('large2');
        // large2.style.display = 'block'
        // var prj_small = document.getElementById('prj_small');
        // prj_small.style.display = 'none'
        // this.map.setZoom(12)
        // let _this = this
        // setTimeout(function () {
        //   _this.map.panTo(new L.LatLng(31.8604, 117.3254));
        // }, 100)
      }
    }
  },
  created() {
    this.getTreeData(this.treeObj)
  }
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
</style>