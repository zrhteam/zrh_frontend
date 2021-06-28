<template>
  <div class="check_screen" style="height: 100%">
    <el-row style="height: 10%" class="boundary-A">
      <!--      <el-col :span="24">-->
      <div
          style="position: absolute !important; width: 700px; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 2px;">
        <div class="title">检查实时隐患监控大屏</div>
      </div>
      <div
          style="position: absolute !important; width: 8.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.613rem">
        <div class="date">{{ nowDate }} {{ nowTime }}</div>
      </div>
      <!--      </el-col>-->
    </el-row>
    <el-col :span="19" class="boundary-A" style="height: 90%">
      <el-col :span="6" class="boundary-A" style="height: 75%">
        <el-row style="height: 32%" class="boundary-A">
          <div
              style="width: 4.75rem; height: 60%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.375rem; top: 1.75rem;">
            <div class="level2">截止目前已发现隐患</div>
            <div class="counter-container">
              <span class="prefix" style="font-size: 0.32rem">累计</span>
              <!--            写一个循环的number-->
              <div id="check-real-number" style="font-size: 0.45rem">
              </div>
              <span class="suffix" style="font-size: 0.32rem">例</span>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 1.15rem; height: 40%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px;">
            <div class="risk-title">
              高风险
            </div>
            <div class="counter-container">
              <span class="numbers" style="color:rgb(255, 10, 10); font-size: 0.32rem">
                <NumCounter :value=this.high_risk class="text-color-blue nums">{{ getRisk }}</NumCounter>
              </span>
              <span class="suffix" style="font-size: 0.2rem">例</span>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 1.15rem; height: 40%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 1.875rem;">
            <div class="risk-title">
              中风险
            </div>
            <div class="counter-container">
              <span class="numbers" style="color:rgb(255, 139, 0); font-size: 0.32rem">
                <NumCounter :value=this.mid_risk class="text-color-blue nums"
                            style="color: rgb(255, 139, 0)"></NumCounter>
              </span>
              <span class="suffix" style="font-size: 0.2rem">例</span>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 1.15rem; height: 40%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 3.8625rem;">
            <div class="risk-title">
              低风险
            </div>
            <div class="counter-container">
              <span class="numbers" style="color: rgb(10, 166, 255); font-size: 0.32rem">
                <NumCounter :value=this.low_risk class="text-color-blue nums"></NumCounter>
              </span>
              <span class="suffix" style="font-size: 0.2rem">例</span>
            </div>
          </div>
        </el-row>
        <el-row style="height: 32%" class="boundary-A">
          <div
              style="position: absolute !important; width: 90%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.1rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  消防
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.4rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 1.15rem; height: 0.54rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.9375rem; top: 0.325rem;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 43px; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">
                    <NumCounter :value=this.fire_num class="text-color-blue nums">{{ getMajor }}</NumCounter>
                  </span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 90%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 52%; top: 0px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.1rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  电梯
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.4rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 1.15rem; height: 0.54rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.9375rem; top: 0.325rem;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">
                    <NumCounter :value=this.lift_num class="text-color-blue nums"></NumCounter>
                  </span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 100%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 106px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.1rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  电气
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.4rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 1.15rem; height: 0.54rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.9375rem; top: 0.325rem;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">
                    <NumCounter :value=this.electric_num class="text-color-blue nums"></NumCounter>
                  </span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 100%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 52%; top: 106px;">
            <div class="major-card">
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.1rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  燃气
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 0.9rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.4rem;">
                <div class="risk-title"
                     style="width: 0.9rem; height: 100%; pointer-events: auto; align-items: center; justify-content: center; color: rgb(255, 255, 255); writing-mode: horizontal-tb; letter-spacing: 0px;">
                  专业
                </div>
              </div>
              <div
                  style="position: absolute !important; width: 1.15rem; height: 0.54rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.9375rem; top: 0.325rem;">
                <div
                    style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem">
                    <NumCounter :value=this.fuel_num class="text-color-blue nums"></NumCounter>
                  </span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
        </el-row>
        <el-row style="height: 36%" class="boundary-A">
          <StageRatio
              :context="{
              sign: 'check-stage',
            }"></StageRatio>
        </el-row>
      </el-col>
      <el-col :span="6" class="boundary-A" :offset="12" style="height: 75%">
        <el-row style="height: 32%" class="boundary-A">
          <div
              class="risk-wrapper" style="height: 0.45rem; left: 0px; top: 0px;">
            <div
                style="width: 4.7rem; height: 0.45rem; pointer-events: auto; border: none; border-radius: 10px 10px 0px 0px; background: rgb(255, 255, 255); backdrop-filter: blur(30px);">
            </div>
          </div>
          <div
              class="risk-wrapper" style="height: 0.35rem; left: 12px; top: 0.1rem;">
            <div
                style="width: 0.31rem; height: 0.31rem; pointer-events: auto; background-image: url('//datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/b7df2458e43133e6310d7302df79b2dc.png'); border-radius: 0px; cursor: pointer; background-repeat: no-repeat; background-size: 100% 100%;"></div>
          </div>
          <div
              class="risk-wrapper" style="height: 0.35rem; left: 48px; top: 0.1rem;">
            <div
                style="width: 4.7rem; height: 0.35rem; pointer-events: auto; display: flex; align-items: center; justify-content: flex-start; color: rgb(255, 0, 0); font-weight: bold; font-family: 'Microsoft Yahei'; font-size: 0.2rem; writing-mode: horizontal-tb; letter-spacing: 0px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
              实时高风险隐患警告
            </div>
          </div>
          <div
              style="position: absolute; width: 4.7rem; height: 2.2rem; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 0.45rem;">
            <HighRiskNote :noteList="noteList" :tableHeight="tableHeight" :noteHeader="noteHeader">
            </HighRiskNote>
          </div>
        </el-row>
      </el-col>
      <el-col :span="24" class="boundary-A" style="height: 25%">
        <div class="record">
          <div class="record-wrapper">
            <RecordList2 ref="rl" :recordList="recordList" :tableHeight="tableHeight"
                         :tableHeader="tableHeader" :cellClassName="cellClassName"></RecordList2>
          </div>
        </div>
      </el-col>
    </el-col>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'check-fire',
              name: '消防'
            }"
        ></MajorPicture>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'check-lift',
              name: '电梯'
            }"
        ></MajorPicture>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'check-electric',
              name: '电气'
            }"
        ></MajorPicture>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'check-fuel',
              name: '燃气'
            }"
        ></MajorPicture>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import MajorPicture from "@/components/views/BigScreen/MajorPicture.vue";
import NumCounter from "@/components/views/BigScreen/NumCounter.vue";
import StageRatio from "@/components/views/BigScreen/StageRatio.vue";
import HighRiskNote from "@/components/views/BigScreen/HighRiskNote.vue";
import RecordList2 from "@/components/views/BigScreen/RecordList2.vue";

export default {
  name: "NewCheckScreen",
  components: {RecordList2, HighRiskNote, StageRatio, NumCounter, MajorPicture},
  data() {
    return {
      check_code: this.$store.state.get_check.check_code,
      timer: null,
      nowDate: "",
      nowTime: "",
      high_risk: 0,
      mid_risk: 0,
      low_risk: 0,
      tableHeight: '100%',
      tableHeader: [
        {prop: 'create_time', label: '录入时间', width: "150"},
        {prop: 'recorder', label: '录入人员', width: "80"},
        {prop: 'position', label: '隐患位置', width: "90"},
        {prop: 'system_name', label: '系统类型', width: "100"},
        {prop: 'major_name', label: '所属专业', width: "90"},
        {prop: 'note', label: '问题描述', width: "170"},
        {prop: 'risk_level', label: '风险等级', width: "80"},
        {prop: 'stage', label: '致因阶段', width: "80"},
        {prop: 'area', label: '分布区域', width: "80"},
        {prop: 'rule_name', label: '法规名称', width: "180"},
        {prop: 'clause', label: '相关条款', width: "80"},
        {prop: 'clause_contact', label: '条款内容'},
      ],
      fire_num: 0,
      lift_num: 0,
      electric_num: 0,
      fuel_num: 0,
      noteHeader: [
        // {prop: 'position', label: '隐患位置', width: "80"},
        {prop: 'note', label: '隐患描述', width: "350"}
      ],
      num_flag: false
    }
  },
  computed: {
    recordList() {
      let data = this.$store.state.get_screen.checks_table
      return data['record_list']
    },
    noteList() {
      let data = this.$store.state.get_screen.checks_high_risk_note['note_list']
      let arr = []
      for (let i in data) {
        let obj = {
          note: ''
        }
        obj.note = data[i]
        arr.push(obj)
      }
      return arr
    },
    getRisk() {
      let data = this.$store.state.get_screen.checks_risk_level
      this.high_risk = data.risk_level_ratio['3']
      this.mid_risk = data.risk_level_ratio['2']
      this.low_risk = data.risk_level_ratio['1']
    },
    getMajor() {
      let data = this.$store.state.get_screen.checks_risk_num_rank
      this.fire_num = data["消防专业"]
      this.lift_num = data["电梯专业"]
      this.electric_num = data["电气专业"]
      this.fuel_num = data["燃气专业"]
    },
    getNumber() {
      var num = this.$store.state.get_screen.checks_risk_num['risk_num']
      if (this.num_flag == false) {
        //自定义字符串,用于拼接标签
        var numStr = "";
        //自定义数组
        var numArr = [];
        var num_copy = num
        if (typeof (num_copy) == "number") {
          this.num_flag = true
          while (num_copy / 10) {
            numArr.unshift(num_copy % 10)
            num_copy = Math.floor(num_copy / 10)
          }
          /****forEach循环****/
          numArr.forEach(e => {
            numStr += `<span class="number">${e}</span>`;
          })
          setInterval(() => {
            this.$nextTick(_ => {
              //拼接完字符串数组后用innerHTML把它渲染到页面中
              document.getElementById("check-real-number").innerHTML = numStr
              let numbers = document.getElementsByClassName("number")
              if (numbers) {
                for (let i = 0; i < numbers.length; i++) {
                  let number = numbers[i]
                  number.style.backgroundColor = '#ff6300'
                  number.style.display = 'inline-block'
                  number.style.fontWeight = 'bolder'
                  number.style.marginRight = '0.15rem'
                  number.style.borderRadius = '6px'
                }
              }
            })
          }, 200);
        }
      }
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
  methods: {
    cellClassName({row, column, rowIndex, columnIndex}) {
      if (column.property == 'note')
        return "CellNote"
      else if (column.property == 'rule_name')
        return "CellRule"
      else if (column.property == 'clause_contact')
        return "CellClauseContact"
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
  },
  watch: {
    $route: {
      handler: function (route) {
        let param = new URLSearchParams();
        param.append('check_code', route.params.id);
        this.$store.commit('get_screen/changeParams', {params: param})
        this.$store.dispatch('get_screen/getCheckScreenRiskNumber')
        this.$store.dispatch('get_screen/getCheckScreenRNRank')
        this.$store.dispatch('get_screen/getCheckScreenRiskLevel')
        this.$store.dispatch('get_screen/getCheckScreenStageRatio')
        this.$store.dispatch('get_screen/getCheckScreenHighRiskNote')
        this.$store.dispatch('get_screen/getCheckScreenPictureNote')
        this.$store.dispatch('get_screen/getCheckScreenTable')
      },
      immediate: true
    }
  },
  created() {
    // let param = new URLSearchParams();
    // // param.append('check_code', this.$store.state.get_check.check_code);
    // param.append('check_code', 'ZRH(ZB)-2007-L01-A04-000-15');
    // this.$store.commit('get_screen/changeParams', {params: param})
    // this.$store.dispatch('get_screen/getCheckScreenRiskNumber')
    // this.$store.dispatch('get_screen/getCheckScreenRNRank')
    // this.$store.dispatch('get_screen/getCheckScreenRiskLevel')
    // this.$store.dispatch('get_screen/getCheckScreenStageRatio')
    // this.$store.dispatch('get_screen/getCheckScreenHighRiskNote')
    // this.$store.dispatch('get_screen/getCheckScreenPictureNote')
    // this.$store.dispatch('get_screen/getCheckScreenTable')
  }
}
</script>

<style scoped>


.boundary-A {
  /*border: 1px dashed #fff*/
}

.check_screen {
  background-image: url("../assets/screen_bg2.jpg");
}

.level2 {
  font-family: "Microsoft YaHei";
  font-style: normal;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  color: #ffffff;
  font-size: 0.32rem;
  display: flex;
  align-items: center;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: normal;
  margin: 0px;
  justify-content: flex-start;
  width: 100%;
}

.counter-container {
  display: flex;
  align-items: baseline;
  color: #ffffff;
  text-align: center;
  white-space: nowrap;
  justify-content: flex-start;
  font-family: "Microsoft Yahei";
  width: 380px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0);
}

.prefix {
  content: '累计';
  color: #ffffff;
  font-weight: normal;
  vertical-align: super;
  font-family: Microsoft Yahei
}

.number {
  background-color: #ff6300;
  display: inline-block;
  letter-spacing: 0.02em;
  text-indent: 0.02em;
  height: auto;
  line-height: normal;
  font-weight: bolder;
  margin-right: 0.10em;
  border-radius: 6px;
}

.suffix {
  content: '例';
  color: #ffffff;
  font-weight: normal;
  vertical-align: super;
  font-family: Microsoft Yahei
}

.risk-title {
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 0.20rem;
  font-weight: normal;
  font-family: "Microsoft YaHei";
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: normal;
  margin: 0px;
  justify-content: flex-start;
  width: 100%;
}

.numbers {
  display: inline-block;
  letter-spacing: 0.02em;
  text-indent: 0.02em;
  height: auto;
  line-height: normal;
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 0.02em;
  margin-right: 0em;
  border-radius: 0px;
}

.major-card {
  width: 2.25rem;
  height: 100%;
  pointer-events: auto;
  background-image: url("../assets/check_screen_card.png");
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title {
  width: 700px;
  height: 100%;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: "Microsoft Yahei";
  font-size: 28px;
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

.record {
  position: absolute;
  width: 19rem;
  height: 22%;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.record-wrapper {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  overflow: hidden;
  background-color: transparent;
  cursor: pointer;
  font-family: "Microsoft Yahei";
  transform: translateZ(0px);
}

.risk-wrapper {
  position: absolute;
  width: 4.7rem;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {

  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th {

  background-color: #873b0e;
  border-color: #873b0e;

}

/* 表格内背景颜色 */
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
  color: #ffffff;
}

/*自定义斑马线颜色*/
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(44, 54, 67, 0.5);
}

/deep/ .el-table td .cell {
  overflow: hidden;
  z-index: 2;
}

/deep/ .CellNote {
  overflow: hidden;
  white-space: nowrap;
}

/deep/ .CellRule {
  overflow: hidden;
  white-space: nowrap;
}

/deep/ .CellClauseContact {
  overflow: hidden;
  white-space: nowrap;
}

/deep/ .CellNote .cell {
  overflow: hidden;
  white-space: nowrap;
  animation: 3s wordsLoop1 linear infinite normal;
  display: inline-block;
  z-index: -1;
}

@keyframes wordsLoop1 {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-60px);
    -webkit-transform: translateX(-60px);
  }
}

@-webkit-keyframes wordsLoop1 {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-60px);
    -webkit-transform: translateX(-60px);
  }
}

/deep/ .CellRule .cell {
  overflow: hidden;
  white-space: nowrap;
  animation: 3s wordsLoop2 linear infinite normal;
  display: inline-block;
}

@keyframes wordsLoop2 {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-80px);
    -webkit-transform: translateX(-80px);
  }
}

@-webkit-keyframes wordsLoop2 {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-80px);
    -webkit-transform: translateX(-80px);
  }
}

/deep/ .CellClauseContact .cell {
  overflow: hidden;
  white-space: nowrap;
  animation: 3s wordsLoop3 linear infinite normal;
  display: inline-block;
}

@keyframes wordsLoop3 {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-80px);
    -webkit-transform: translateX(-80px);
  }
}

@-webkit-keyframes wordsLoop3 {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-80px);
    -webkit-transform: translateX(-80px);
  }
}
</style>