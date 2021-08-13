<template>
  <div class="project_screen" style="height: 100%;">
    <el-row style="height: 10%" class="boundary-A">
      <!--      <el-col :span="24">-->
      <div
          style="position: absolute !important; width: 8.75rem; height: 50%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 2px;">
        <div class="title" style="width: 8.75rem; height: 100%;">{{ project_name }}实时隐患监控大屏</div>
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
        <el-button class="title" v-if="show" round size="mini" @click="quitProjectScreen" style="z-index: 999;top: 40%">退出
        </el-button>
      </div>
      <div style="position: absolute !important; width: 6.8rem; height: 0.3rem; left: 23.15rem; top: 10%;">
        <a class="title" v-if="show" style="font-size: 0.15rem" @click="copyUrl()">复制链接</a>
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
              <div id="real-number" style="font-size: 0.45rem">
                {{ getNumber }}
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
              <a @click="intoFireScreen" style="display: block; width: 100%; height: 100%;"></a>
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
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
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
              <a @click="intoLiftScreen" style="display: block; width: 100%; height: 100%;"></a>
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
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
                    <NumCounter :value=this.lift_num class="text-color-blue nums"></NumCounter>
                  </span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 100%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0px; top: 1.325rem;">
            <div class="major-card">
              <a @click="intoElectricScreen" style="display: block; width: 100%; height: 100%;"></a>
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
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
                    <NumCounter :value=this.electric_num class="text-color-blue nums"></NumCounter>
                  </span>
                  <span class="suffix" style="font-size: 0.2rem">例</span>
                </div>
              </div>
            </div>
          </div>
          <div
              style="position: absolute !important; width: 100%; height: 48%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 52%; top: 1.325rem;">
            <div class="major-card">
              <a @click="intoFuelScreen" style="display: block; width: 100%; height: 100%;"></a>
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
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
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
              :context="{sign: 'project-stage'}"></StageRatio>
        </el-row>
      </el-col>
      <el-col :span=" 6
          " class="boundary-A" :offset="12" style="height: 75%">
        <el-row style="height: 32%" class="boundary-A">
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
                         :tableHeader="tableHeader" :cellClassName="cellClassName" :rowClassName="rowClassName"
                         showRank="true"></RecordList2>
          </div>
        </div>
      </el-col>
    </el-col>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'project-fire',
              name: '消防'
            }"
            :pictureData="fireData"
        >
        </MajorPicture>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'project-lift',
              name: '电梯'
            }"
            :pictureData="liftData"
        ></MajorPicture>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'project-electric',
              name: '电气'
            }"
            :pictureData="electricData"
        ></MajorPicture>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <MajorPicture
            :context="{
              sign: 'project-fuel',
              name: '燃气'
            }"
            :pictureData="fuelData"
        ></MajorPicture>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import MajorPicture from "@/components/views/BigScreen/MajorPicture.vue";
import RecordList2 from "@/components/views/BigScreen/RecordList2.vue";
import HighRiskNote from "@/components/views/BigScreen/HighRiskNote.vue";
import StageRatio from "@/components/views/BigScreen/StageRatio.vue";
import NumCounter from "@/components/views/BigScreen/NumCounter.vue";

export default {
  name: "NewProjectScreen",
  components: {NumCounter, StageRatio, HighRiskNote, RecordList2, MajorPicture},
  data() {
    return {
      show: true,
      project_name: "",
      timer: null,
      nowDate: "",
      nowTime: "",
      high_risk: 0,
      mid_risk: 0,
      low_risk: 0,
      tableHeight: '100%',
      tableHeader: [
        {prop: 'note', label: '问题描述', width: "260"},
        {prop: 'risk_level', label: '风险等级', width: "80"},
        {prop: 'position', label: '隐患位置', width: "90"},
        {prop: 'major_name', label: '专业', width: "90"},
        {prop: 'stage', label: '致因阶段', width: "80"},
        {prop: 'area', label: '分布区域', width: "80"},
        {prop: 'rule_name', label: '法规名称', width: "260"},
        {prop: 'clause', label: '相关条款', width: "80"},
        // {prop: 'clause_contact', label: '条款内容'},
        {prop: 'create_time', label: '录入时间', width: "150"},
        {prop: 'recorder', label: '录入人员'},
      ],
      fire_num: 0,
      lift_num: 0,
      electric_num: 0,
      fuel_num: 0,
      noteHeader: [
        // {prop: 'position', label: '隐患位置', width: "80"},
        {prop: 'note', label: '隐患描述', width: "350"}
      ],
      num_flag: false,
    }
  },
  computed: {
    recordList() {
      let data = this.$store.state.get_screen.projects_table
      return data['record_list']
    },
    noteList() {
      let data = this.$store.state.get_screen.projects_high_risk_note['note_list']
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
      let data = this.$store.state.get_screen.projects_risk_level
      if (typeof (data.risk_level_ratio) != "undefined") {
        this.high_risk = data.risk_level_ratio['3']
        this.mid_risk = data.risk_level_ratio['2']
        this.low_risk = data.risk_level_ratio['1']
      }
    },
    getMajor() {
      let data = this.$store.state.get_screen.projects_risk_num_rank
      this.fire_num = data["消防专业"]
      this.lift_num = data["电梯专业"]
      this.electric_num = data["电气专业"]
      this.fuel_num = data["燃气专业"]
    },
    fireData() {
      let data = this.$store.state.get_screen.projects_picture_note;
      let fire_list = []
      for (let i in data['消防专业']) {
        let obj = {
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data['消防专业'][i]['image_url']
        obj['note'] = data['消防专业'][i]['note']
        fire_list.push(obj)
      }
      return fire_list
    },
    liftData() {
      let data = this.$store.state.get_screen.projects_picture_note;
      let lift_list = []
      for (let i in data['电梯专业']) {
        let obj = {
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data['电梯专业'][i]['image_url']
        obj['note'] = data['电梯专业'][i]['note']
        lift_list.push(obj)
      }
      return lift_list
    },
    electricData() {
      let data = this.$store.state.get_screen.projects_picture_note;
      let electric_list = []
      for (let i in data['电气专业']) {
        let obj = {
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data['电气专业'][i]['image_url']
        obj['note'] = data['电气专业'][i]['note']
        electric_list.push(obj)
      }
      return electric_list
    },
    fuelData() {
      let data = this.$store.state.get_screen.projects_picture_note;
      let fuel_list = []
      for (let i in data['燃气专业']) {
        let obj = {
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data['燃气专业'][i]['image_url']
        obj['note'] = data['燃气专业'][i]['note']
        fuel_list.push(obj)
      }
      return fuel_list
    },
    getNumber() {
      var num = this.$store.state.get_screen.projects_risk_num.risk_num
      if (this.num_flag == false) {
        //自定义字符串,用于拼接标签
        var numStr = "";
        //自定义数组
        var numArr = [];
        var num_copy = num
        if (typeof (num) == "number") {
          this.num_flag = true
          while (num_copy / 10) {
            numArr.unshift(num_copy % 10)
            num_copy = Math.floor(num_copy / 10)
          }
          /****forEach循环****/
          numArr.forEach(e => {
            numStr += `<span class="number">${e}</span>`;
          })

          setTimeout(() => {
            this.$nextTick(_ => {
              //拼接完字符串数组后用innerHTML把它渲染到页面中
              document.getElementById("real-number").innerHTML = numStr
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
    rowClassName(row) {
      if (row.rowIndex % 2 == 0) {
        return "even-stripe"
      } else {
        return "odd-stripe"
      }
    },
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
    quitProjectScreen() {
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
    intoFireScreen() {
      var project_name = this.project_name
      var major = "消防专业"
      // this.$router.push({name: `/project_fire_screen/${this.$store.state.get_project.prj_name}/${major}`});
      this.$router.push({path: '/project_fire_screen', query: {project_name: project_name, major: major}})
    },
    intoLiftScreen() {
      var project_name = this.project_name
      var major = "电梯专业"
      // this.$router.push({name: `/project_fire_screen/${this.$store.state.get_project.prj_name}/${major}`});
      this.$router.push({path: '/project_lift_screen', query: {project_name: project_name, major: major}})
    },
    intoElectricScreen() {
      var project_name = this.project_name
      var major = "电气专业"
      // this.$router.push({name: `/project_fire_screen/${this.$store.state.get_project.prj_name}/${major}`});
      this.$router.push({path: '/project_electric_screen', query: {project_name: project_name, major: major}})
    },
    intoFuelScreen() {
      var project_name = this.project_name
      var major = "燃气专业"
      // this.$router.push({name: `/project_fire_screen/${this.$store.state.get_project.prj_name}/${major}`});
      this.$router.push({path: '/project_fuel_screen', query: {project_name: project_name, major: major}})
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        if(route.query.id != undefined & route.query.id == 1) {
          this.show = false
        }
        this.project_name = route.query.project_name
        let param = new URLSearchParams();
        param.append('project_name', route.query.project_name);
        this.$store.commit('get_screen/changeParams', {params: param})
        this.$store.dispatch('get_screen/getProjectScreenRiskNumber')
        this.$store.dispatch('get_screen/getProjectScreenRNRank')
        this.$store.dispatch('get_screen/getProjectScreenRiskLevel')
        this.$store.dispatch('get_screen/getProjectScreenStageRatio')
        this.$store.dispatch('get_screen/getProjectScreenHighRiskNote')
        this.$store.dispatch('get_screen/getProjectScreenPictureNote')
        this.$store.dispatch('get_screen/getProjectScreenTable')
      },
      immediate: true
    }
  },
  created() {
    // let param = new URLSearchParams();
    // // param.append('project_name', this.$store.state.get_login.grant_data.data.project_tag);
    // param.append('project_name', '合肥欢乐颂');
    // this.$store.commit('get_screen/changeParams', {params: param})
    // this.$store.dispatch('get_screen/getProjectScreenRiskNumber')
    // this.$store.dispatch('get_screen/getProjectScreenRNRank')
    // this.$store.dispatch('get_screen/getProjectScreenRiskLevel')
    // this.$store.dispatch('get_screen/getProjectScreenStageRatio')
    // this.$store.dispatch('get_screen/getProjectScreenHighRiskNote')
    // this.$store.dispatch('get_screen/getProjectScreenPictureNote')
    // this.$store.dispatch('get_screen/getProjectScreenTable')
    // debugger
    // console.log(this.$route.params)
  },
  destroyed() {
    clearInterval(this.timer)

    // if (this.$el)
    //   delete this.$el.__vue__;
    // window.location.reload();
  }
}
</script>

<style scoped>
.boundary-A {
  /*border: 1px dashed #fff*/
}

.project_screen {
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
  width: 4.75rem;
  height: 0.375rem;
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
  font-size: 0.375rem;
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

  background-color: rgba(255, 99, 0, 0.5);
  border-color: rgba(255, 99, 0, 0.5);
  font-size: 0.15rem;

}

/* 表格内背景颜色 */
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
  color: #ffffff;
  font-size: 0.15rem;
}

/*!*自定义斑马线颜色*!*/
/*/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {*/
/*  background-color: rgba(0, 0, 0, 0.3);*/
/*}*/

/deep/ .el-table--striped .el-table__body tr.el-table__row.even-stripe td {
  background-color: rgba(255, 255, 255, 0.3);
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
  -moz-transform-origin-x: 0;
  -moz-transform: scale(0.80);
  margin-right: 0;
  padding-right: 0;
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

/*/deep/ .CellNote .cell {*/
/*  overflow: hidden;*/
/*  white-space: nowrap;*/
/*  animation: 3s wordsLoop1 linear infinite normal;*/
/*  display: inline-block;*/
/*  z-index: -1;*/
/*}*/

/*@keyframes wordsLoop1 {*/
/*  0% {*/
/*    transform: translateY(0px);*/
/*    -webkit-transform: translateY(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateY(-30px);*/
/*    -webkit-transform: translateY(-30px);*/
/*  }*/
/*}*/

/*@-webkit-keyframes wordsLoop1 {*/
/*  0% {*/
/*    transform: translateY(30px);*/
/*    -webkit-transform: translateY(30px);*/
/*  }*/
/*  100% {*/
/*    transform: translateY(-30px);*/
/*    -webkit-transform: translateY(-30px);*/
/*  }*/
/*}*/

/*/deep/ .CellRule .cell {*/
/*  overflow: hidden;*/
/*  white-space: nowrap;*/
/*  animation: 3s wordsLoop2 linear infinite normal;*/
/*  display: inline-block;*/
/*}*/

/*@keyframes wordsLoop2 {*/
/*  0% {*/
/*    transform: translateX(0px);*/
/*    -webkit-transform: translateX(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateX(-80px);*/
/*    -webkit-transform: translateX(-80px);*/
/*  }*/
/*}*/

/*@-webkit-keyframes wordsLoop2 {*/
/*  0% {*/
/*    transform: translateX(0px);*/
/*    -webkit-transform: translateX(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateX(-80px);*/
/*    -webkit-transform: translateX(-80px);*/
/*  }*/
/*}*/

/*/deep/ .CellClauseContact .cell {*/
/*  overflow: hidden;*/
/*  white-space: nowrap;*/
/*  animation: 3s wordsLoop3 linear infinite normal;*/
/*  display: inline-block;*/
/*}*/

/*@keyframes wordsLoop3 {*/
/*  0% {*/
/*    transform: translateX(0px);*/
/*    -webkit-transform: translateX(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateX(-80px);*/
/*    -webkit-transform: translateX(-80px);*/
/*  }*/
/*}*/

/*@-webkit-keyframes wordsLoop3 {*/
/*  0% {*/
/*    transform: translateX(0px);*/
/*    -webkit-transform: translateX(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateX(-80px);*/
/*    -webkit-transform: translateX(-80px);*/
/*  }*/
/*}*/

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
  height: 0.3rem;
}

/deep/ .el-button span {
  font-size: 12px;
  text-align: center;
}
</style>