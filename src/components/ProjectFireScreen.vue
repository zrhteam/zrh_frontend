<template>
  <div style="height: 100%; background-color: rgb(14, 14, 14)">
    <el-row class="boundary-A" style="height: 10%">
      <div
          style="position: absolute !important; width: 8.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 2px;">
        <div class="title">{{ project_name }}消防专业</div>
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
      <div style="position: absolute !important; width: 6.8rem; height: 0.7rem; left: 23.1rem; top: 40%;">
        <el-button class="date" round size="mini" @click="quitProjectFireScreen" style="z-index: 999;top: 40%">退出
        </el-button>
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
        </el-row>
      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%;">
        <el-row class="boundary-A" style="height: 100%;">
          <div class="absolute" style="width: 100%; height: 99%; left: 0px; bottom: 0.2rem;">
            <div class="wrapper" id="major-risk"/>
          </div>
          <OneMajorRisk majorName="消防专业" :OneMajorRiskData="OneMajorRiskData"></OneMajorRisk>
        </el-row>


      </el-col>
      <el-col class="boundary-A" :span="8" style="height: 100%">
        <el-row style="height: 100%">
          <CarouselCard></CarouselCard>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="boundary-A" style="height: 25%;">
      <el-col class="boundary-A" :span="19" style="height: 100%">
        <div class="wrapper" id="list">
          <RecordList2 :recordList="recordList" :tableHeight="tableHeight"
                       :tableHeader="tableHeader" :cellClassName="cellClassName" :rowClassName="rowClassName"
                       showRank="true"></RecordList2>
        </div>
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
          <div
              style="position: absolute; width: 4.7rem; height: 2.56rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.45rem;">
            <HighRiskNote :noteList="noteList" :tableHeight="tableHeight" :noteHeader="noteHeader">
            </HighRiskNote>
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

export default {
  name: "project_fire_screen",
  components: {HighRiskNote, RecordList2, CarouselCard, OneMajorRisk, MajorRisk},
  data() {
    return {
      project_name: this.$store.state.get_project.prj_name,
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
    majorRiskData() {
      let data = this.$store.state.get_screen.projectm_major_ratio
      return data
    },
    recordList() {
      let data = this.$store.state.get_screen.projectm_table
      return data['record_list']
    },
    noteList() {
      let data = this.$store.state.get_screen.projectm_note_top
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
    }
  },
  methods: {
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
      // this.$router.push({path: '/land_headquarters'});
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
    let param = new URLSearchParams();
    // param.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    param.append('project_name', '合肥欢乐颂');
    this.$store.commit('get_screen/changeParams', {params: param})
    param.append('major_name', '消防专业')
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
  }
}
</script>

<style scoped>
.boundary-A {
  /*border: 1px dashed #fff*/
}

.title {
  width: 8.75rem;
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
  font-size: 12px;
  -webkit-transform-origin-x: 0; /*缩小后文字居左 */
  -webkit-transform: scale(0.80); /* 关键*/
  margin-right: 0;
  padding-right: 0;
}

/deep/ .el-table th .cell {
  overflow: hidden;
  color: #ce5102;
  z-index: 2;
  margin-right: 0;
  padding-right: 0;
}

.risk-wrapper {
  position: absolute;
  width: 4.7rem;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}
</style>