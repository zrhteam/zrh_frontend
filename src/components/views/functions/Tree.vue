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
            accordion
            default-expand-all
            :expand-on-click-node="true"
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
      map: "",
      treeObj1: this.treeObj,
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
      this.expandedKeys = []
      let arr = []//树形控件
      let pp = []//包含每个检查经纬度坐标的一个数组
      let count = 1;
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
        if (this.user_grant === '总部') {
          this.expandedKeys.push(parent1.id)
        }
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          let parent2 = {
            id: 0,
            label: '',
            pos: [],
            children: []
          };
          parent2['id'] = count++
          parent2['label'] = j
          if (this.user_grant === '区域') {
            this.expandedKeys.push(parent2.id)
          }
          let r_p = [];//每个区域围成一个多边形并存入经纬度数组pp
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            let child1 = {
              id: 0,
              label: '',
              pos: [],
              children: []
            };
            child1['id'] = count++
            child1['label'] = k
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                let child2 = {
                  id: 0,
                  label: ''
                };
                child2['id'] = count++
                child2['label'] = m
                child1['children'].push(child2)
                if (this.user_grant === '项目') {
                  this.expandedKeys.push(child2.id)
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
      this.$store.commit('get_login/changePosition', {params: pp})
      console.log("arr", arr)
      this.data = arr
      // this.$store.state.get_login.tree_data = arr
      // this.p_data = p_arr
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      // console.log("节点", data);
      // console.log(node);
      this.expandedKeys.push(data.id)
      if (this.user_grant === '项目') {
        if ((node.level == 1) || (node.level == 2)) {
          alert("您没有权限")
        } else if (node.level == 3) {
          this.prjNodeClick(data, node)
          document.getElementById('prj_subpart').style.display = 'block'
          document.getElementById('check_part').style.display = 'none'
          document.getElementById('map_1').style.display = 'none'
          document.getElementById('map_2').style.display = 'block'
          document.getElementById('prj_charts').style.display = 'block'
          document.getElementById('check_charts').style.display = 'none'
        } else if (node.level == 4) {
          this.checkNodeClick(data, node)
          //首先要判断当前是在数据大屏页面还是在主页面
          if (document.getElementById("prj_small").style.display === 'none') {//在主页面
            document.getElementById("prj_subpart").style.display = 'none'
            document.getElementById("prj_charts").style.display = 'none'
            document.getElementById("check_charts").style.display = 'block'
            document.getElementById("check_part").style.display = 'block'
          } else {
            document.getElementById("prj_subpart").style.display = 'none'
            document.getElementById("prj_charts").style.display = 'none'
            document.getElementById("check_charts").style.display = 'block'
            document.getElementById("check_part").style.display = 'block'
            // document.getElementById("large1").style.display = 'none'
            // document.getElementById("large2").style.display = 'none'
          }
        }
      } else if (this.user_grant === '区域') {
        if (node.level == 1) {
          alert("您没有权限")
        } else if (node.level == 2) {
          this.regionNodeClick(data, node)
          document.getElementById('region').style.display = 'block'
          document.getElementById('prj_part').style.display = 'none'
        } else if (node.level == 3) {//区域=》项目
          this.prjNodeClick(data, node)
          //首先要判断当前是在数据大屏页面还是在主页面=》不用再判断了，大屏页面没有树形控件
          document.getElementById('region').style.display = 'none'
          document.getElementById('prj_part').style.display = 'block'
          document.getElementById("prj_subpart").style.display = 'block'
          document.getElementById("check_part").style.display = 'none'
        } else if (node.level == 4) {//区域=》检查
          this.checkNodeClick(data, node)
          document.getElementById('region').style.display = 'none'
          document.getElementById('prj_part').style.display = 'block'
          document.getElementById("prj_subpart").style.display = 'none'
          document.getElementById("check_part").style.display = 'block'
        }
      } else if (this.user_grant === '总部') {
        if (node.level == 1) {//总部=》总部
          this.headNodeClick(data, node)
          document.getElementById('head_quarter').style.display = 'block'
          document.getElementById('region_part').style.display = 'none'
        } else if (node.level == 2) {//总部=》区域
          this.regionNodeClick(data, node)
          // console.log("检查", data)
          // console.log(node)
          //首先要判断当前是在数据大屏页面还是在主页面=>不需要再判断了，大屏页面不要树形控件
          document.getElementById('head_quarter').style.display = 'none'
          document.getElementById('region_part').style.display = 'block'
          document.getElementById('region').style.display = 'block'
          document.getElementById('prj_part').style.display = 'none'
          //为了画出多边形，要重新封装该区域的数据
          let r_p = [];
          for(let i in data['children']) {
            // alert(data['children'][i])
            console.log(data['children'][i]['pos'])
          }
          var container = L.DomUtil.get('map_3'); if(container != null){ container._leaflet_id = null; }
          this.map = new L.map("map_3");
          // this.map.setView([30,30], 6)
          // this.map = L.map("map_3", {
          //   center: [34, 107], // 地图中心
          //   zoom: 4, //缩放比列
          //   zoomControl: false, //禁用 + - 按钮
          //   // doubleClickZoom: false, // 禁用双击放大
          //   attributionControl: false // 移除右下角leaflet标识
          // });
          // this.map.panTo(data.pos[0], data.pos[1])
        } else if (node.level == 3) {//总部=》项目
          this.prjNodeClick(data, node)
          document.getElementById("head_quarter").style.display = 'none'
          document.getElementById('region_part').style.display = 'block'
          document.getElementById('region').style.display = 'none'
          document.getElementById('prj_part').style.display = 'block'
          document.getElementById("prj_subpart").style.display = 'block'
          document.getElementById('check_part').style.display = 'none'
        } else if (node.level == 4) {//总部=》检查
          this.checkNodeClick(data, node)
          document.getElementById("head_quarter").style.display = 'none'
          document.getElementById('region_part').style.display = 'block'
          document.getElementById('region').style.display = 'none'
          document.getElementById('prj_part').style.display = 'block'
          document.getElementById("prj_subpart").style.display = 'none'
          document.getElementById('check_part').style.display = 'block'
        }
      }
    },
    headNodeClick(data, node) {
      let param = new URLSearchParams();
      param.append('headquarter_name', data.label);
      this.$store.commit('get_headquarter/changeParams', {params: param})
      this.$store.dispatch('get_headquarter/getInitRectification')
      this.$store.dispatch('get_headquarter/getInitRiskLevelData')
      this.$store.dispatch('get_headquarter/getInitRiskNumberRank')
      this.$store.dispatch('get_headquarter/getInitImage')
      this.$store.dispatch('get_headquarter/getInitNumberTop')
      this.$store.dispatch('get_headquarter/getInitRiskList')
      this.$store.dispatch('get_headquarter/getInitRiskIndexData')
    },
    regionNodeClick(data, node) {
      let param = new URLSearchParams();
      param.append('region_name', data.label);
      this.$store.commit('get_region/changeParams', {params: param})
      this.$store.dispatch('get_region/getInitRegionProjectNumber')
      this.$store.dispatch('get_region/getInitRegionRiskLevel')
      this.$store.dispatch('get_region/getInitRegionHighRisk')
      this.$store.dispatch('get_region/getInitRegionImage')
      this.$store.dispatch('get_region/getInitRegionMajor')
      this.$store.dispatch('get_region/getInitRegionNumberTop')
      // this.$store.dispatch('get_region/getInitRegionSafetyIndex')
      this.$store.dispatch('get_region/getInitRegionRiskRank')
    },
    prjNodeClick(data, node) {
      let param = new URLSearchParams();
      param.append('project_name', data.label);
      this.$store.commit('get_project/changeParams', {params: param})
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
      // this.map.setZoom(4)
      // setTimeout(function () {
      //   this.map.panTo(new L.LatLng(34, 107));
      // }, 100)
    },
    checkNodeClick(data, node) {
      let param1 = new URLSearchParams();
      param1.append('check_code', data.label);
      this.$store.commit('get_check/changeParams', {params: param1})
      this.$store.dispatch('get_check/getCheckRectification')
      this.$store.dispatch('get_check/getCheckRiskLevel')
      this.$store.dispatch('get_check/getCheckRiskRatio')
      this.$store.dispatch('get_check/getCheckHighRisk')
      this.$store.dispatch('get_check/getCheckHighImage')
      this.$store.dispatch('get_check/getCheckMajorSystem')
      this.$store.dispatch('get_check/getCheckMajorArea')
      this.$store.dispatch('get_check/getCheckMajorStage')
      this.$store.dispatch('get_check/getCheckRiskTop')
    }
  },
  created() {
    // console.log("区域", this.$store.state.get_login.grant_data.data)
    this.getTreeData(this.treeObj1)
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