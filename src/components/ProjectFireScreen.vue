<template>
  <div style="height: 100%; background-color: rgb(14, 14, 14)">
    <el-row class="boundary-A" style="height: 10%">
      <div
          style="position: absolute !important; width: 8.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 2px;">
        <div class="title" style="width: 8.75rem;">{{ project_title }}{{major}}</div>
      </div>
      <div
          style="position: absolute !important; width: 3.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.613rem;">
        <div class="date">{{ nowDate }} {{ nowTime }}</div>
      </div>
      <div
          style="position: absolute !important; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; width: 6.8rem; height: 0.7rem; left: 22rem; top: 40%;">
        <div class="zrh">
        </div>
      </div>
      <div style="position: absolute !important; width: 6.8rem; height: 0.3rem; left: 23.1rem; top: 40%;">
        <el-button class="title" v-if="show" round size="mini" @click="quitProjectFireScreen"
                   style="z-index: 999;top: 40%;">退出
        </el-button>
      </div>
      <div style="position: absolute !important; width: 6.8rem; height: 0.3rem; left: 23.15rem; top: 10%;">
        <a class="title" v-if="show" style="font-size: 0.15rem" @click="copyUrl()">复制链接</a>
      </div>
    </el-row>
    <el-row class="boundary-A" style="height: 65%">
      <el-col class="boundary-A" :span="8" style="height: 100%;">
        <el-row class="boundary-A" style="height: 50%;">
          <div class="absolute" style="width: 98%; height: 97%; right: 0.2rem; bottom: 0.2rem;">
            <div class="wrapper" id="risk-wrapper"/>
          </div>
          <MajorRisk majorType="fire-major" :majorRiskData="majorRiskData"></MajorRisk>
        </el-row>
        <el-row class="boundary-A" style="height: 50%;">
          <div class="absolute" style="width: 98%; height: 97%; right: 0.2rem; bottom: 0.2rem;">
            <div class="wrapper" id="risk-rank"/>
          </div>
          <NowRiskRank :nowRiskRankData="nowRiskRankData"></NowRiskRank>

        </el-row>
      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%;">
        <el-row class="boundary-A" style="height: 100%;">
          <div class="absolute" style="width: 100%; height: 99%; left: 0px; bottom: 0.2rem;">
            <div class="wrapper" id="major-risk"/>
          </div>
          <OneMajorRisk :majorName="major" :OneMajorRiskData="OneMajorRiskData"></OneMajorRisk>
        </el-row>


      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%">
        <el-row style="height: 100%">
          <CarouselCard :CarouselCardData="CarouselCardData"></CarouselCard>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="boundary-A" style="height: 25%;">
      <el-col class="boundary-A" :span="19" style="height: 100%">
      <el-col style="height: 17%; width: 100%">
        <div class="wrapper" id="list" style="height: 100%;">
          <RecordList2 :tableHeader="tableHeader" showRank="true"></RecordList2>
        </div>
      </el-col>
      <el-col style="height: 80%; width: 100%">
        <template>
          <vue-seamless-scroll :data="recordList" class="seamless-warp" :class-option="optionSingleHeight">
            <el-table :data="recordList" :show-header="false" stripe>
              <el-table-column type="index"
                               :width="45"
                               align="left" style="overflow: hidden">
              </el-table-column>
              <el-table-column v-for="(th, key) in tableHeader"
                               :key="key"
                               :prop="th.prop"
                               :label="th.label"
                               :width="th.width"
                               :min-width="th.minWidth" align="left" style="overflow: hidden">
              </el-table-column>
            </el-table>
          </vue-seamless-scroll>
        </template>
      </el-col>
      </el-col>
      <el-col class="boundary-A" :span="5" style="height: 100%">
        <el-row style="width: 100%">
          <div
              class="risk-wrapper" style="height: 0.45rem; left: 0px; top: 0px;">
            <div
                style="width: 4.7rem; height: 0.45rem; pointer-events: auto; border: none; border-radius: 10px 10px 0px 0px; background: rgb(255, 255, 255); backdrop-filter: blur(30px);">
            </div>
          </div>
          <div
              class="risk-wrapper" style="height: 0.35rem; left: 0.15rem; top: 0.1rem;">
            <div
                style="width: 0.31rem; height: 0.31rem; pointer-events: auto; background-image: url('//datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/b7df2458e43133e6310d7302df79b2dc.png'); border-radius: 0px; cursor: pointer; background-repeat: no-repeat; background-size: 100% 100%;"></div>
          </div>
          <div
              class="risk-wrapper" style="height: 0.35rem; left: 0.6rem; top: 0.1rem;">
            <div
                style="width: 4.7rem; height: 0.35rem; pointer-events: auto; display: flex; align-items: center; justify-content: flex-start; color: rgb(255, 0, 0); font-weight: bold; font-family: 'Microsoft Yahei'; font-size: 0.2rem; writing-mode: horizontal-tb; letter-spacing: 0px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
              实时高风险隐患警告
            </div>
          </div>
          <div class="box2" style="position: absolute; width: 4.7rem; height: 2.45rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.45rem;">
            <vue-seamless-scroll :data="noteList" class="seamless-warp" :class-option="optionSingleHeight" style="margin-top: 5px; height: 95%;width: 98%;margin-left: 2px">
              <el-table
                :data="noteList"
                :show-header="false"
              >
              <el-table-column type="index"
                     :width="35"
                     align="left" style="overflow: hidden">
              </el-table-column>
              <el-table-column v-for="(th, key) in noteHeader"
                     :key="key"
                     :prop="th.prop"
                     :label="th.label"
                     :fixed="th.fixed"
                     :width="th.width"
                     :min-width="th.minWidth" align="left">
              </el-table-column>
            </el-table>
            </vue-seamless-scroll>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MajorRisk from "@/components/views/BigScreen/MajorRisk.vue";
import OneMajorRisk from "@/components/views/BigScreen/OneMajorRisk.vue";
import CarouselCard from "@/components/views/BigScreen/CarouselCard.vue";
import RecordList2 from "@/components/views/BigScreen/RecordList2.vue";
import HighRiskNote from "@/components/views/BigScreen/HighRiskNote.vue";
import NowRiskRank from "@/components/views/BigScreen/NowRiskRank.vue";

export default {
  name: "project_fire_screen",
  components: {NowRiskRank, HighRiskNote, RecordList2, CarouselCard, OneMajorRisk, MajorRisk},
  data() {
    return {
      show: true,
      project_title: '',
      project_name: '',
      major: '',
      timer: null,
      nowDate: "",
      nowTime: "",
      tableHeight: '100%',
      tableHeader: [
        {prop: 'create_time', label: '录入时间', width: "130"},
        // {prop: 'recorder', label: '录入人员', width: "80"},
        // {prop: 'position', label: '隐患位置', width: "90"},
        {prop: 'note', label: '问题描述', width: "160"},
        {prop: 'major_name', label: '专业', width: "90"},
        {prop: 'risk_level', label: '风险等级', width: "80"},
        {prop: 'stage', label: '致因阶段', width: "80"},
        {prop: 'area', label: '分布区域', width: "80"},
        {prop: 'rule_name', label: '法规名称', width: "160"},
        {prop: 'clause', label: '相关条款', width: "80"},
        {prop: 'clause_contact', label: '条款内容'},
      ],
      noteHeader: [
        // {prop: 'position', label: '隐患位置', width: "80"},
        {prop: 'note', label: '隐患描述'}
      ],
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes();
    }, 1000);
    $(document).ready(function () {
      var whei = $(window).width()
      $("html").css({fontSize: whei / 24});
      $(window).resize(function () {
        var whei = $(window).width();
        $("html").css({fontSize: whei / 24})
      });
    });
  },
  computed: {
    optionSingleHeight () {
        return {
          step:0.5,
        }
    },
    majorRiskData() {
      let data = this.$store.state.get_screen.projectm_major_ratio
      return data
    },
    recordList() {
      let data = this.$store.state.get_screen.projectm_table
      return data['record_list']
    },
    noteList() {
      let data = this.$store.state.get_screen.projectm_high_risk
      let arr = []
      for (let i in data) {
        let obj = {
          note: ''
        }
        obj.note = i
        arr.push(obj)
      }
      return arr
    },
    OneMajorRiskData() {
      let data = this.$store.state.get_screen.projectm_info
      return data
    },
    nowRiskRankData() {
      let data = this.$store.state.get_screen.projectm_note_top
      let arr = []
      for (let i in data) {
        let obj = {
          note: i,
          appear_time: data[i].appear_time
        }
        arr.push(obj)
      }
      return arr
    },
    CarouselCardData() {
      let arr = []
      let data = this.$store.state.get_screen.projectm_risk_level_system_info
      //  对于bar_data，先把所有的系统过滤出来
      let system = []
      system.push('risk_level')
      let obj = {
        bar_data: [],
        pie_data: [],
        title: '实时风险严重程度分析'
      }
      let sub_obj = {
        name: '高风险',
        value: 0
      }
      for (let i in data['3']) {
        sub_obj.value += data['3'][i]
        system.push(i)
      }
      obj.pie_data.push(sub_obj)
      sub_obj = {
        name: '中风险',
        value: 0
      }
      for (let j in data['2']) {
        sub_obj.value += data['2'][j]
        if (typeof (data['3'][j]) == "undefined") {
          system.push(j)
        }
      }
      obj.pie_data.push(sub_obj)
      sub_obj = {
        name: '低风险',
        value: 0
      }
      for (let i in data['1']) {
        sub_obj.value += data['1'][i]
        if ((typeof (data['3'][i]) == "undefined") && (typeof (data['2'][i]) == "undefined")) {
          system.push(i)
        }
      }
      obj.pie_data.push(sub_obj)
      obj.bar_data.push(system)
      let sub_arr = []
      sub_arr.push('高风险')
      for (let i = 1; i < system.length; i++) {
        if (typeof (data['3'][system[i]]) == "undefined") {
          // debugger
          sub_arr.push(0)
        } else {
          sub_arr.push(data['3'][system[i]])
        }
      }
      obj.bar_data.push(sub_arr)
      sub_arr = []
      sub_arr.push('中风险')
      for (let i = 1; i < system.length; i++) {
        if (typeof (data['2'][system[i]]) == "undefined") {
          sub_arr.push(0)
        } else {
          sub_arr.push(data['2'][system[i]])
        }
      }
      obj.bar_data.push(sub_arr)
      sub_arr = []
      sub_arr.push('低风险')
      for (let i = 1; i < system.length; i++) {
        if (typeof (data['1'][system[i]]) == "undefined") {
          sub_arr.push(0)
        } else {
          sub_arr.push(data['1'][system[i]])
        }
      }
      obj.bar_data.push(sub_arr)
      arr.push(obj)

      data = this.$store.state.get_screen.projectm_area_system_info
      //  对于bar_data，先把所有的系统过滤出来
      system = []
      sub_arr = []
      system.push('area')
      obj = {
        bar_data: [],
        pie_data: [],
        title: '实时风险所处区域分析'
      }
      for (var i in data) {
        sub_obj = {
          name: '',
          value: 0
        }
        sub_obj.name = i
        for (var j in data[i]) {
          sub_obj.value += data[i][j]
          let res = system.findIndex(ele => ele == j)
          if (res <= -1) {
            system.push(j)
          }
        }
        sub_arr.push(i)
        obj.pie_data.push(sub_obj)
      }
      obj.bar_data.push(system)
      for (var i in data) {
        sub_arr = []
        sub_arr.push(i)
        for (var j = 0; j < system.length; j++) {
          if (typeof (data[i][system[j]]) == "undefined") {
            sub_arr.push(0)
          } else {
            sub_arr.push(data[i][system[j]])
          }
        }
        obj.bar_data.push(sub_arr)
      }
      arr.push(obj)

      data = this.$store.state.get_screen.projectm_stage_system_info
      //  对于bar_data，先把所有的系统过滤出来
      system = []
      sub_arr = []
      system.push('stage')
      obj = {
        bar_data: [],
        pie_data: [],
        title: '实时风险致因阶段分析'
      }
      for (var i in data) {
        sub_obj = {
          name: '',
          value: 0
        }
        sub_obj.name = i
        for (var j in data[i]) {
          sub_obj.value += data[i][j]
          let res = system.findIndex(ele => ele == j)
          if (res <= -1) {
            system.push(j)
          }
        }
        sub_arr.push(i)
        obj.pie_data.push(sub_obj)
      }
      obj.bar_data.push(system)
      for (var i in data) {
        sub_arr = []
        sub_arr.push(i)
        for (var j = 0; j < system.length; j++) {
          if (typeof (data[i][system[j]]) == "undefined") {
            sub_arr.push(0)
          } else {
            sub_arr.push(data[i][system[j]])
          }
        }
        obj.bar_data.push(sub_arr)
      }
      arr.push(obj)
      return arr
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        if(route.query.id != undefined & route.query.id == 1) {
          this.show = false
        }
        let queryJson = JSON.parse(route.query.queryJson)
        this.project_title = queryJson.project_name.label
        this.project_name = queryJson.project_name.value
        this.major = queryJson.major
        // let param = new URLSearchParams();
        // param.append('project_name', route.params.id);
        // this.$store.commit('get_screen/changeParams', {params: param})
        // this.$store.dispatch('get_screen/getProjectScreenRiskNumber')
        // this.$store.dispatch('get_screen/getProjectScreenRNRank')
        // this.$store.dispatch('get_screen/getProjectScreenRiskLevel')
        // this.$store.dispatch('get_screen/getProjectScreenStageRatio')
        // this.$store.dispatch('get_screen/getProjectScreenHighRiskNote')
        // this.$store.dispatch('get_screen/getProjectScreenPictureNote')
        // this.$store.dispatch('get_screen/getProjectScreenTable')


        let param = new URLSearchParams();
        // param.append('project_name', '合肥欢乐颂');
        // param.append('project_name', '哈尔滨万象汇');
        param.append('project_name', this.project_name);
        this.$store.commit('get_screen/changeParams', {params: param})
        // param.append('major_name', '消防专业')
        param.append('major_name', this.major)
        this.$store.commit('get_screen/changeProjectMajorParams', {projectm_params: param})
        this.$store.dispatch('get_screen/getProjectMajorRiskNum')
        this.$store.dispatch('get_screen/getProjectMajorMajorRatio')
        this.$store.dispatch('get_screen/getProjectMajorNoteTop')
        this.$store.dispatch('get_screen/getProjectMajorInfo')
        this.$store.dispatch('get_screen/getProjectMajorStageSystemInfo')
        this.$store.dispatch('get_screen/getProjectMajorRiskLevelSystemInfo')
        this.$store.dispatch('get_screen/getProjectMajorAreaSystemInfo')
        this.$store.dispatch('get_screen/getProjectMajorHighRisk')
        this.$store.dispatch('get_screen/getProjectMajorTable')
      },
      immediate: true
    }
  },
  methods: {
    copyUrl() {
      var url = window.location.href + `&id=1`
      // 创建一个 Input标签
      const cInput = document.createElement('input')
      cInput.value = url
      document.body.appendChild(cInput)
      cInput.select() // 选取文本域内容;
      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效
      document.execCommand('Copy')
      this.$notify({
          title: '成功',
          message: '复制成功',
          type: 'success',
          duration: 1000
        });
      /// 复制成功后再将构造的标签 移除
      cInput.remove()
    },
    setNowTimes() {
      let myDate = new Date();
      // console.log(myDate)
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
      this.nowDate = yy + "-" + mm + "-" + dd
      this.nowTime = hou + ":" + min + ":" + sec;
    },
    quitProjectFireScreen() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isIE = userAgent.indexOf("compatible") > -1
          && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
      var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
      var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
      var isSafari = userAgent.indexOf("Safari") > -1
          && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
      var isChrome = userAgent.indexOf("Chrome") > -1
          && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
      if(isIE) {
        window.history.back(-1);
      }else if(isEdge) {
        window.history.back(-1);
      }else if(isFF) {
        history.back()
        return false
      }else if(isChrome) {
        window.history.back(-1);
      }else if(isSafari) {
        window.history.back(-1);
      }
    },
    rowClassName(row) {
      if (row.rowIndex % 2 == 0) {
        return "even-stripe"
      } else {
        return "odd-stripe"
      }
    },
    cellClassName({row, column, rowIndex, columnIndex}) {
      // if (column.property == 'note')
      //   return "CellNote"
      // else if (column.property == 'rule_name')
      //   return "CellRule"
      // else if (column.property == 'clause_contact')
      //   return "CellClauseContact"
    },
  },
  destroyed() {
    clearInterval(this.timer)
  },
  created() {
    // let param = new URLSearchParams();
    // // param.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    // // param.append('project_name', '合肥欢乐颂');
    // param.append('project_name', '哈尔滨万象汇');
    // this.$store.commit('get_screen/changeParams', {params: param})
    // param.append('major_name', '消防专业')
    // this.$store.commit('get_screen/changeProjectMajorParams', {projectm_params: param})
    // this.$store.dispatch('get_screen/getProjectMajorRiskNum')
    // this.$store.dispatch('get_screen/getProjectMajorMajorRatio')
    // this.$store.dispatch('get_screen/getProjectMajorNoteTop')
    // this.$store.dispatch('get_screen/getProjectMajorInfo')
    // this.$store.dispatch('get_screen/getProjectMajorStageSystemInfo')
    // this.$store.dispatch('get_screen/getProjectMajorRiskLevelSystemInfo')
    // this.$store.dispatch('get_screen/getProjectMajorAreaSystemInfo')
    // this.$store.dispatch('get_screen/getProjectMajorHighRisk')
    // this.$store.dispatch('get_screen/getProjectMajorTable')
  }
}
</script>

<style scoped>
.box2 {
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../assets/screen_card.png");
}
.seamless-warp {
  height: 100%;
  overflow: hidden;
}

.boundary-A {
  /*border: 1px dashed #fff*/
}

.title {
  height: 100%;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: "Microsoft Yahei";
  font-size: 0.35rem;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.date {
  font-family: "Microsoft Yahei";
  font-size: 0.2rem;
  color: #ffffff;
  display: flex;
}

.zrh {
  width: 1.029rem;
  height: 0.3rem;
  pointer-events: auto;
  background-image: url("../assets/zrh.png");
  border-radius: 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/deep/ .el-button {
  background: transparent !important;
  color: #ffffff;
}

.absolute {
  position: absolute !important;
  margin: 0 !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.wrapper {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#risk-wrapper {
  background-image: url("../assets/major_card1.png");
}

#risk-rank {
  background-image: url('../assets/major_card2.png');
}

#major-risk {
  background-image: url('../assets/major_card4.png');
}

#list {
  background-image: url("../assets/major_card6.png");
}

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {

  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th {
  background-color: transparent;
  border-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
  color: #ffffff;
}

/deep/ .el-table--striped .el-table__body tr.el-table__row.even-stripe td {
  background-color: rgba(255, 255, 255, 0.1);
}

/deep/ .el-table--striped .el-table__body tr.el-table__row--striped.odd-stripe td {
  background-color: rgba(0, 0, 0, 0.1);
}

/deep/ .el-table td .cell {
  overflow: hidden;
  z-index: 2;
  font-size: 0.15rem;
  -webkit-transform-origin-x: 0; /*缩小后文字居左 */
  -webkit-transform: scale(0.80); /* 关键*/
  -moz-transform-origin-x: 0;
  -moz-transform: scale(1.0);
  margin-right: 0;
  padding-right: 0;
}

/deep/ .el-table th .cell {
  overflow: hidden;
  color: #ce5102;
  z-index: 2;
  margin-right: 0;
  padding-right: 0;
  font-size: 0.15rem;
}

.risk-wrapper {
  position: absolute;
  width: 4.7rem;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

/deep/ .el-button {
  background: transparent !important;
  color: #ffffff;
  height: 0.3rem;
}

/deep/ .el-button span {
  font-size: 12px;
  text-align: center;
}
</style>
