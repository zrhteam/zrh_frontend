<template>
  <div class="DataInsight">
    {{getRedLine}}
    {{getTendencyHead}}
    {{getTendencyRegion}}
    {{getTendencyProject}}
    {{getTendencyProfession}}
    {{getRatioHead}}
    {{getRatioRegion}}
    {{getRatioProject}}
    {{getRatioProfession}}

    <el-row :gutter="20">
      <el-row><span class="level4" style="display:inline-block;height: 50px; width:1500px;font-size:35px;">红线问题</span></el-row>
      <el-col :span="4" style="height: 1.25rem; position: relative; float:right">
              <el-col :span="12" :offset="3" style="height: 100%; ">
                <div style="height: 100%;">
                  <span style="font-size: 2rem; color: #18bff0; bottom:0.35rem; position: relative;">
                    {{ nowTime }}
                  </span>
                </div>
              </el-col>
              <el-col :span="9" style="height: 100%; color: #1072b5; font-size: 0.12rem;">
                <el-row style="top: 35%; position: relative;">
                  <span>{{ nowWeek }}</span>
                </el-row>
                <el-row style="top: 35%; position: relative;">
                  <span>{{ nowDate }}</span>
                </el-row>
              </el-col>
            </el-col>
      <el-col :span="2"><div class="grid-content bg-purple">
        <el-input :value="selected_filter_level" :disabled="true" placeholder="--" style="width: 80px ;min-height: 35px; font-size: 20px; color: #eeeeee" />
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple"><el-cascader
          :props="optionProps"
          :options="cascade_level_data"
          placeholder="试试搜索：华润置地"
          @change="handleCascadeChange"
          style="width:400px"
          clearable
          filterable
      ></el-cascader></div></el-col>
      <el-col :span="5" :loading="true"><div>
        <el-button type="primary" icon="el-icon-search" round @click="filterRedLine" >搜索</el-button>
      </div></el-col>
    </el-row>
<!--    红线问题1-->
    <el-col>
      <el-row :span="4" style="height: 100%">
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                  :context="{
             title:red_line_data[0].label,
             id: 'id_red_line_1',
           }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                  :context="{
             title:red_line_data[1].label,
             id: 'id_red_line_2',
           }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                  :context="{
             title:red_line_data[2].label,
             id: 'id_red_line_3',
           }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                  :context="{
             title:red_line_data[3].label,
             id: 'id_red_line_4',
           }">
        </PieChart>
<!--      </el-row>-->
<!--      <el-row>-->
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[4].label,
              id: 'id_red_line_5',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[5].label,
              id: 'id_red_line_6',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[6].label,
              id: 'id_red_line_7',
            }">
        </PieChart>
<!--      </el-row>-->
<!--      <el-row>-->
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[7].label,
              id: 'id_red_line_8',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[8].label,
              id: 'id_red_line_9',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[9].label,
              id: 'id_red_line_10',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[10].label,
              id: 'id_red_line_11',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[11].label,
              id: 'id_red_line_12',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[12].label,
              id: 'id_red_line_13',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[13].label,
              id: 'id_red_line_14',
            }">
        </PieChart>
        <PieChart style="display:inline-block;width:375px;font-size:20px;"
                    :context="{
              title:red_line_data[14].label,
              id: 'id_red_line_15',
            }">
        </PieChart>
    </el-row>
    </el-col>
  </div>
</template>

<script>
import PieChart from "@/components/views/functions/PieChartForDataInsight.vue";
import axios from "axios";
export default {
  name: "DataInsight",
  props: ["userJson"],
  components: {
    PieChart
  },
  data() {
    return {
      optionProps: {
        value: 'value',
        label: 'label',
        children: 'children',
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      check_key: "",
      flag: "0",
      selected_filter_level: "",
      cascade_level_data: [],
      // 15组红线数据
      // red_line_data: [
      //   {label:"消防管网末端无水比例达到百分之十及以上", total: 0.0, ratio: {}},
      //   {label:"中庭区域疏散指示或应急照明故障",total: 0.0, ratio: {}},
      //   {label:"消防风机不能远程多线启动", total: 0.0, ratio: {}},
      //   {label:"出现280度排烟防火阀关闭后不能连锁排烟风机停止", total: 0.0, ratio: {}},
      //   {label:"点位、回路故障率达百分之十及以上", total: 0.0, ratio: {}},
      //   {label:"报警主机存在死机、延迟等情况", total: 0.0, ratio: {}},
      //   {label:"物理地址描述不详或错误、未定义达百分之十及以上", total: 0.0, ratio: {}},
      //   {label:"消防联动逻辑关系错误率达百分之十及以上", total: 0.0, ratio: {}},
      //   {label:"流量开关、低压压力开关不能连锁启泵", total: 0.0, ratio: {}},
      //   {label:"消防水泵不能远程多线启动", total: 0.0, ratio: {}},
      //   {label:"排烟阀不能联动相应排烟风机自动启动", total: 0.0, ratio: {}},
      //   {label:"气体模拟测试时防护区内风机、风阀等设备未联动关闭", total: 0.0, ratio: {}},
      //   {label:"任一组水泵不能正常运行", total: 0.0, ratio: {}},
      //   {label:"中庭区域消防广播故障", total: 0.0, ratio: {}},
      //   {label:"防火门监控系统故障较多", total: 0.0, ratio: {}}
      // ]
      red_line_data: [],
      // 总部趋势
      // tendency_head: [{headquarter_name:"华润置地", month:[{time:"2000-1",risk: 0, risk_high: 0, major_risk: 0, major_risk_high: 0},...]}
      //                 {headquarter_name:"菜鸟物流", month:[{time:"2000-1",risk: 0, risk_high: 0, major_risk: 0, major_risk_high: 0},...]}]
      tendency_head: [],
      // 区域趋势
      tendency_region: [],
      // 项目趋势
      tendency_project: [],
      // 行业趋势
      tendency_profession: [],


      // 总部 隐患各风险等级占比
      ratio_head: {headquarter_name: '', major_name: '',
        ratio: {level_1: 0.0, level_2: 0.0, level_3: 0.0, major_level_1: 0.0, major_level_2: 0.0, major_level_3: 0.0}},
      // 区域 隐患各风险等级占比
      ratio_region: {region_name: '', major_name: '',
        ratio: {level_1: 0.0, level_2: 0.0, level_3: 0.0, major_level_1: 0.0, major_level_2: 0.0, major_level_3: 0.0}},
      // 项目 隐患各风险等级占比
      ratio_project: {project_name: '', major_name: '',
        ratio: {level_1: 0.0, level_2: 0.0, level_3: 0.0, major_level_1: 0.0, major_level_2: 0.0, major_level_3: 0.0}},
      // 行业 隐患各风险等级占比
      ratio_profession: {profession_name: '', major_name: '',
        ratio: {level_1: 0.0, level_2: 0.0, level_3: 0.0, major_level_1: 0.0, major_level_2: 0.0, major_level_3: 0.0}},
      timer: null,
      nowWeek: "",
      nowDate: "",
      nowTime: ""
    };
  },
  computed: {
    getRedLine() {
      let data = this.$store.state.get_insight.red_line_data
      // console.log(data)
      for (let i in data) {
        let obj = {
          label: i,
          total: data[i].total,
          ratio: data[i].ratio
        }
        this.red_line_data.push(obj)
      }
    },
    getTendencyHead() {
      let data = this.$store.state.get_insight.tendency_head
      // console.log(data)
      for (let i in data) {
        let obj = {
          headquarter_name: i,
          month: [],
        }
        for (let j in data[i]){
          let obj2 = {
            time: j,
            risk: data[i][j].risk,
            risk_high: data[i][j].risk_high,
            major_risk: data[i][j].major_risk,
            major_risk_high: data[i][j].major_risk_high,
          }
          obj.month.push(obj2)
        }
        this.tendency_head.push(obj)
      }
    },
    getTendencyRegion() {
      let data = this.$store.state.get_insight.tendency_region
      // console.log(data)
      for (let i in data) {
        let obj = {
          headquarter_region_name: i,
          month: [],
        }
        for (let j in data[i]){
          let obj2 = {
            time: j,
            risk: data[i][j].risk,
            risk_high: data[i][j].risk_high,
            major_risk: data[i][j].major_risk,
            major_risk_high: data[i][j].major_risk_high,
          }
          obj.month.push(obj2)
        }
        this.tendency_region.push(obj)
      }
    },
    getTendencyProject() {
      let data = this.$store.state.get_insight.tendency_project
      // console.log(data)
      for (let i in data) {
        let obj = {
          headquarter_region_project_name: i,
          month: [],
        }
        for (let j in data[i]){
          let obj2 = {
            time: j,
            risk: data[i][j].risk,
            risk_high: data[i][j].risk_high,
            major_risk: data[i][j].major_risk,
            major_risk_high: data[i][j].major_risk_high,
          }
          obj.month.push(obj2)
        }
        this.tendency_project.push(obj)
      }
    },
    getTendencyProfession() {
      let data = this.$store.state.get_insight.tendency_profession
      // console.log(data)
      for (let i in data) {
        let obj = {
          profession_name: i,
          month: [],
        }
        for (let j in data[i]){
          let obj2 = {
            time: j,
            risk: data[i][j].risk,
            risk_high: data[i][j].risk_high,
            major_risk: data[i][j].major_risk,
            major_risk_high: data[i][j].major_risk_high,
          }
          obj.month.push(obj2)
        }
        this.tendency_profession.push(obj)
      }
    },
    getRatioHead() {
      let data = this.$store.state.get_insight.ratio_head
      // console.log(data)
      this.ratio_head.headquarter_name = data.headquarter_name
      this.ratio_head.major_name = data.major_name
      this.ratio_head.ratio = data.ratio
    },
    getRatioRegion() {
      let data = this.$store.state.get_insight.ratio_region
      // console.log(data)
      this.ratio_region.region_name = data.region_name
      this.ratio_region.major_name = data.major_name
      this.ratio_region.ratio = data.ratio
    },
    getRatioProject() {
      let data = this.$store.state.get_insight.ratio_project
      // console.log(data)
      this.ratio_project.project_name = data.project_name
      this.ratio_project.major_name = data.major_name
      this.ratio_project.ratio = data.ratio
    },
    getRatioProfession() {
      let data = this.$store.state.get_insight.ratio_profession
      // console.log(data)
      this.ratio_profession.profession_name = data.profession_name
      this.ratio_profession.major_name = data.major_name
      this.ratio_profession.ratio = data.ratio
    }
  },
  methods: {
    filterRedLine() {
      let param_red_line = new URLSearchParams();
      console.log(this.check_key)
      console.log(this.flag)
      param_red_line.append('check_key', this.check_key);
      param_red_line.append('flag', this.flag);
      param_red_line.append('start', '2020-3-1 00:00:00');
      param_red_line.append('end', '2022-1-3 00:00:00');
      this.$store.commit('get_insight/changeParams', {params: param_red_line});
      this.$store.dispatch('get_insight/getAnalyzeRedlineData');
    },
    handleCascadeChange(value) {
      console.log(value);
        if (value.length === 1) {
          this.selected_filter_level = "总部";
        } else if (value.length === 2) {
          this.selected_filter_level = "区域";
        } else if (value.length === 3) {
          this.selected_filter_level = "项目";
        } else if (value.length === 4) {
          this.selected_filter_level = "检查";
        } else {
          this.selected_filter_level = "--";
        }
        if(value.length !== 4){
          this.check_key = value[0];
          let cnt = 0;
          for (let ele in value){
            if(cnt !== 0){
              this.check_key += "/" + value[ele];
            }
            cnt++;
          }
        }else {
          this.check_key = value[3];
        }

        this.flag = value.length - 1;
      },
    setNowTimes() {
      let myDate = new Date();
      // console.log(myDate)
      let wk = myDate.getDay();
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;
      let dd = String(
          myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
      );
      let hou = String(
          myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
          myDate.getMinutes() < 10
              ? "0" + myDate.getMinutes()
              : myDate.getMinutes()
      );
      let sec = String(
          myDate.getSeconds() < 10
              ? "0" + myDate.getSeconds()
              : myDate.getSeconds()
      );
      let weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let week = weeks[wk];
      this.nowDate = yy + "." + mm + "." + dd
      this.nowTime = hou + ":" + min + ":" + sec;
      this.nowWeek = week;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  created() {
    const _this = this;
    axios.get('http://localhost:8081/new_zrh_data/get_level_data').then(function (resp) {
        //回调函数中的this指的是回调
        //把data数据赋给_this，即vue对象
        var rec_data = resp.data;
        console.log(rec_data);
        var head_region = rec_data[0];
        var region_project = rec_data[1];
        var project_check = rec_data[2];
        for (let ele in head_region) { // head
          console.log(ele);
          var head_child = [];
          console.log(head_region[ele])
          // for (let item in head_region[ele]){ // region
          for (var item = 0; item < head_region[ele].length; item++) {
            var cor_project = region_project[head_region[ele][item]];
            console.log(cor_project)
            var region_child = [];
            // for (let ele_project in cor_project){ // project
            for (var ele_project = 0; ele_project < cor_project.length; ele_project++) {
              var cor_check = project_check[cor_project[ele_project]];
              var project_child = [];
              // for (let ele_check in cor_check){ // check
              for (var ele_check = 0; ele_check < cor_check.length; ele_check++) {
                project_child.push({
                  value: cor_check[ele_check],
                  label: cor_check[ele_check]
                  }
                )
              }
              region_child.push({
                value: cor_project[ele_project],
                label: cor_project[ele_project],
                children: project_child,
              })
            }
            head_child.push({
              value: head_region[ele][item],
              label: head_region[ele][item],
              children: region_child,
            })
          }
          _this.cascade_level_data.push({
            value: ele,
            label: ele,
            children: head_child,
          });
        }
      });
    let param_red_line = new URLSearchParams();
    let param_tendency = new URLSearchParams();
    let param_ratio = new URLSearchParams();
    param_red_line.append('check_key', '华润置地/华东大区');
    param_red_line.append('flag', '1');
    param_red_line.append('start', '2020-3-1 00:00:00');
    param_red_line.append('end', '2022-1-3 00:00:00');

    param_tendency.append('headquarter_name', '华润置地%菜鸟物流');
    param_tendency.append('region_name', '华润置地/华东大区%菜鸟物流/华东区域');
    param_tendency.append('project_name', '华润置地/华东大区/上海万象城%菜鸟物流/东北区域/菜鸟大件沈阳安得仓&菜鸟大件标品沈阳安得仓');
    param_tendency.append('profession_name', '华润置地%菜鸟物流');
    param_tendency.append('major_name', '消防专业');
    param_tendency.append('start', '2020-3-1 00:00:00');
    param_tendency.append('end', '2022-1-3 00:00:00');

    param_ratio.append('headquarter_name', '华润置地');
    param_ratio.append('region_name', '华润置地');
    param_ratio.append('project_name', '华润置地');
    param_ratio.append('profession_name', '华润置地');
    param_ratio.append('major_name', '消防专业');
    param_ratio.append('start', '2020-3-1 00:00:00');
    param_ratio.append('end', '2022-1-3 00:00:00');

    this.$store.commit('get_insight/changeParams', {params: param_red_line})
    this.$store.commit('get_insight/changeParams1', {params1: param_tendency})
    this.$store.commit('get_insight/changeParams2', {params2: param_ratio})

    this.$store.dispatch('get_insight/getAnalyzeRedlineData')
    this.$store.dispatch('get_insight/getAnalyzeTendencyHeadquarter')
    this.$store.dispatch('get_insight/getAnalyzeTendencyRegion')
    this.$store.dispatch('get_insight/getAnalyzeTendencyProject')
    this.$store.dispatch('get_insight/getAnalyzeTendencyProfession')
    this.$store.dispatch('get_insight/getAnalyzeRatioHeadquarter')
    this.$store.dispatch('get_insight/getAnalyzeRatioRegion')
    this.$store.dispatch('get_insight/getAnalyzeRatioProject')
    this.$store.dispatch('get_insight/getAnalyzeRatioProfession')
  }
}
</script>

<style scoped>

</style>