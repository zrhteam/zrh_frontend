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
    {{ratio_head}}
    <el-col :span="10" style="height: 100%;">
            <PieChart
                :context="{
          title:red_line_data[0].label,
          id: 'id_red_line',
        }"></PieChart>
          </el-col>
  </div>
</template>

<script>
import PieChart from "@/components/views/functions/PieChartForDataInsight.vue";

export default {
  name: "DataInsight",
  props: ["userJson"],
  components: {
    PieChart
  },
  data() {
    return {
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
        ratio: {level_1: 0.0, level_2: 0.0, level_3: 0.0, major_level_1: 0.0, major_level_2: 0.0, major_level_3: 0.0}}
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
  created() {
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