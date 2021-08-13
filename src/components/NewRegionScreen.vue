<template>
  <div style="height: 100%; background-color: #000000">
    <el-row style="height: 10%" class="boundary-A">
      <div class="absolute-layer" style="width: 100%; height: 50%; left: 0px; top: 0px;">
        <div class="header"
             style="width: 100%; height: 100%; pointer-events: auto; border-radius: 0px; cursor: pointer; background-repeat: no-repeat; background-size: 100% 100%;">
        </div>
      </div>
      <div class="absolute-layer" style="width: 6.8rem; height: 0.7rem; left: 0px; top: 25%;">
        <div class="title" style="width: 6.8rem; height: 0.7rem; font-size: 0.4rem;">
          {{ region_name }}隐患大屏
        </div>
      </div>
      <div class="absolute-layer" style="width: 6.8rem; height: 0.7rem; left: 19.5rem; top: 25%;">
        <div class="title"
             style="width: 6.8rem; height: 0.7rem; font-size: 0.2rem; color: #adc3d5; font-weight: normal">
          {{ nowTime }}
        </div>
      </div>
      <div class="absolute-layer" style="width: 6.8rem; height: 0.7rem; left: 20.5rem; top: 25%;">
        <div class="title"
             style="width: 6.8rem; height: 0.7rem; font-size: 0.2rem; color: #adc3d5; font-weight: normal">
          {{ nowDate }}
        </div>
      </div>
      <div class="absolute-layer" style="width: 6.8rem; height: 0.7rem; left: 22rem; top: 40%;">
        <div class="zrh">
        </div>
      </div>
      <div class="absolute-layer" style="width: 6.8rem; height: 0.3rem; left: 23.1rem; top: 40%;">
        <el-button class="title" v-if="show" round size="mini" @click="quitRegionScreen" style="z-index: 999;top: 40%">退出</el-button>
      </div>
      <div style="position: absolute !important; width: 6.8rem; height: 0.3rem; left: 23.15rem; top: 10%;">
        <a class="title" v-if="show" style="font-size: 0.15rem" @click="copyUrl()">复制链接</a>
      </div>
    </el-row>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 36.4%" class="boundary-A">
        <DangerNumber :dangerData="dangerData" :renderSign="renderSign4"></DangerNumber>
      </el-row>
      <el-row style="height: 31.3%" class="boundary-A">
        <RegionRank :regionData="regionData" :renderSign="renderSign3"></RegionRank>
      </el-row>
      <el-row style="height: 31.3%" class="boundary-A">
        <RiskNumber :riskName="riskName1" :riskNumber="majorRiskNumber" :renderSign="renderSign1"></RiskNumber>
      </el-row>
    </el-col>
    <el-col :span="14" class="boundary-A" style="height: 90%">
      <el-row style="height: 75%" class="boundary-A">
        <HeadMap :provinceInfo="provinceInfo" :renderSign="renderSign6"></HeadMap>
      </el-row>
      <el-row style="height: 25%" class="boundary-A">
        <div class="record">
          <div class="record-wrapper">
            <RecordList2 ref="rl" :recordList="recordList" :tableHeight="tableHeight"
                         :tableHeader="tableHeader" :cellClassName="cellClassName" showRank="true"></RecordList2>
          </div>
        </div>
      </el-row>
    </el-col>
    <el-col :span="5" class="boundary-A" style="height: 90%">
      <el-row style="height: 35%" class="boundary-A">
        <div class="absolute-layer" style="width: 4.7rem; height: 0.45rem; left: 0px; top: 0px;">
          <div class="box1" style="width: 4.7rem; height: 0.45rem;">
          </div>
        </div>
        <div class="absolute-layer" style="width: 3.75rem; height: 0.7rem; left: 0.61rem; top: -0.1rem;">
          <div class="card-title" style="width: 3.75rem; height: 0.7rem; font-size: 0.2rem;">
            项目隐患数量排名
          </div>
        </div>
        <div class="absolute-layer" style="width: 93%; height: 80%; left: 0.06rem; top: 0.61rem;">
          <div class="box2" style="width: 100%; height: 100%;">
            <RecordList2 ref="rl2" :recordList="recordRank" :tableHeight="tableHeight"
                         :tableHeader="tableHeader2" showRank="false"></RecordList2>
          </div>
        </div>
      </el-row>
      <el-row style="height: 35%" class="boundary-A">
        <RiskByStage ref="rl3" :stageLegend="stageLegend" :stageyAxis="stageyAxis" :stageSdata="stageSdata"
                     :renderSign="renderSign5"></RiskByStage>
      </el-row>
      <el-row style="height: 30%" class="boundary-A">
        <RiskNumber :riskName="riskName2" :riskNumber="areaRiskNumber" :renderSign="renderSign2"></RiskNumber>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import HeadMap from "@/components/views/BigScreen/HeadMap.vue";
import DangerNumber from "@/components/views/BigScreen/DangerNumber.vue";
import RegionRank from "@/components/views/BigScreen/RegionRank.vue";
import RiskNumber from "@/components/views/BigScreen/RiskNumber.vue";
import RecordList2 from "@/components/views/BigScreen/RecordList2.vue";
import RiskByStage from "@/components/views/BigScreen/RiskByStage.vue";

export default {
  name: "NewRegionScreen",
  components: {RiskByStage, RecordList2, RiskNumber, RegionRank, DangerNumber, HeadMap},
  data() {
    return {
      show: true,
      timer: "",
      nowDate: "",
      nowTime: "",
      tableHeight: '100%',
      tableHeader: [
        {prop: 'note', label: '问题描述', width: "300"},
        {prop: 'risk_level', label: '风险等级', width: "80"},
        {prop: 'major_name', label: '专业', width: "80"},
        {prop: 'stage', label: '致因阶段', width: "80"},
        {prop: 'area', label: '分布区域', width: "80"},
        {prop: 'rule_name', label: '法规名称', width: "260"},
        // {prop: 'clause_contact', label: '条款内容'},
        {prop: 'clause', label: '相关条款'},
      ],
      tableHeader2: [
        {prop: 'rank', label: '', width: "45"},
        {prop: 'appear_time', label: '隐患数量', width: "80"},
        {prop: 'check_name', label: '项目名称'},
      ],
      renderSign1: false,
      riskName1: "不同专业",
      renderSign2: false,
      riskName2: "不同分布区域",
      renderSign3: false,
      renderSign4: false,
      renderSign5: false,
      renderSign6: false,
      stageLegend: [],
      stageyAxis: [],
      region_name: ""
    }
  },
  methods: {
    cellClassName({row, column, rowIndex, columnIndex}) {
      if (column.property == 'note')
        return "CellNote"
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
    quitRegionScreen() {
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
    provinceInfo() {
      let data = this.$store.state.get_screen.province_info
      let list = []
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          value: [],
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.value[2];    //地图上展示文字 + 数值
              },
              fontSize: 10
            }
          },
        }
        obj.name = "项目数量"
        obj.value.push(data[i].lng)
        obj.value.push(data[i].lat)
        obj.value.push(data[i].check_num)
        arr.push(obj)
      }
      list.push(arr)
      arr = []
      for (let i in data) {
        let obj = {
          name: '',
          value: [],
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.value[2];    //地图上展示文字 + 数值
              },
              fontSize: 10
            }
          },
        }
        obj.name = "隐患数量"
        obj.value.push(data[i].lng - 1)
        obj.value.push(data[i].lat)
        obj.value.push(data[i].record_num)
        arr.push(obj)
      }
      list.push(arr)
      if (arr.length > 0) {
        this.renderSign6 = true
      }
      return list
    }
  },
  computed: {
    recordList() {
      let data = this.$store.state.get_screen.regions_table
      return data['record_list']
    },
    recordRank() {
      let data = this.$store.state.get_screen.regions_check_num_rank

      let arr = []
      let len = 0
      for (let i in data) {
        len++
      }
      for (let i = 0; i < len; i++) {
        for (let j in data) {
          let obj = {
            rank: 0,
            appear_time: 0,
            check_name: "",
          }
          if (i == data[j].rank) {
            obj.rank = data[j].rank
            obj.appear_time = data[j].appear_time
            obj.check_name = j
            arr.push(obj)
          }
        }
      }
      return arr
    },
    areaRiskNumber() {
      let data = this.$store.state.get_screen.regions_area_num
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          value: 0
        }
        obj.name = i;
        obj.value = data[i];
        arr.push(obj)
      }
      if (arr.length > 0) this.renderSign2 = true
      return arr
    },
    majorRiskNumber() {
      let data = this.$store.state.get_screen.regions_major_num
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          value: 0
        }
        obj.name = i;
        obj.value = data[i];
        arr.push(obj)
      }
      if (arr.length > 0) this.renderSign1 = true
      return arr
    },
    regionData() {
      let data = this.$store.state.get_screen.regions_risk_num_rank
      let arr = []
      let len = 0
      for (let i in data) {
        len++
      }
      for (let i = 0; i < len; i++) {
        for (let j in data) {
          let obj = {
            count: 0,
            name: "",
          }
          if (i == data[j].rank) {
            obj.count = data[j].appear_time
            obj.name = j
            arr.push(obj)
          }
        }
      }
      if (arr.length > 0) this.renderSign3 = true
      return arr
    },
    dangerData() {
      let data = this.$store.state.get_screen.regions_risk_num
      if (data.risk_num != undefined) {
        this.renderSign4 = true
      }
      let obj = {
        sum: data.risk_num,
        arr_num: []
      }
      let sub_obj = {
        name: '低风险',
        count: data['低'],
      }
      obj.arr_num.push(sub_obj)
      sub_obj = {
        name: '中风险',
        count: data['中'],
      }
      obj.arr_num.push(sub_obj)
      sub_obj = {
        name: '高风险',
        count: data['高'],
      }
      obj.arr_num.push(sub_obj)
      return obj
    },
    stageSdata() {
      let data = this.$store.state.get_screen.regions_major_stage_info
      let sub_arr = [];
      let legend = [];
      let yAxis = [];
      let s_data = [];
      for (let i in data) {
        for (let j in data[i]) {
          let obj = {
            name: '',
            value: 0
          }
          let flag = false
          sub_arr.forEach(item => {
            if (item.name === j) {
              item.value = item.value + data[i][j]
              flag = true
            }
          })
          if (flag === false) {
            obj.name = j;
            obj.value = data[i][j];
            sub_arr.push(obj)
            legend.push(j)
          }
        }
        yAxis.push(i)
      }
      for (let i in data) {
        let sub_data = []
        for (let k in legend) {
          let flag = false
          for (let j in data[i]) {
            if (j == legend[k]) {
              sub_data.push(data[i][j])
              flag = true
            }
          }
          if (flag == false) {
            sub_data.push(0)
          }
        }
        s_data.push(sub_data)
      }

      let sub_data = []
      for (let k in legend) {
        let flag = false
        for (let j in sub_arr) {
          if (sub_arr[j].name == legend[k]) {
            sub_data.push(sub_arr[j].value)
            flag = true
          }
        }
        if (flag == false) {
          sub_data.push(0)
        }
      }
      if (sub_data.length > 0) {
        this.renderSign5 = true
      }
      s_data.push(sub_data)
      yAxis.push("总计")
      this.stageLegend = legend
      this.stageyAxis = yAxis
      return s_data
    },
    provinceInfo() {
      let data = this.$store.state.get_screen.province_info
      let list = []
      let arr = []
      for (let i in data) {
        let obj = {
          name: '',
          value: [],
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.value[2];    //地图上展示文字 + 数值
              },
              fontSize: 10
            }
          },
        }
        obj.name = "项目数量"
        obj.value.push(data[i].lng)
        obj.value.push(data[i].lat)
        obj.value.push(data[i].check_num)
        arr.push(obj)
      }
      list.push(arr)
      arr = []
      for (let i in data) {
        let obj = {
          name: '',
          value: [],
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return params.value[2];    //地图上展示文字 + 数值
              },
              fontSize: 10
            }
          },
        }
        obj.name = "隐患数量"
        obj.value.push(data[i].lng - 1)
        obj.value.push(data[i].lat)
        obj.value.push(data[i].record_num)
        arr.push(obj)
      }
      list.push(arr)
      if (arr.length > 0) {
        this.renderSign6 = true
      }
      return list
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
  watch: {
    $route: {
      handler: function (route) {
        if(route.query.id != undefined & route.query.id == 1) {
          this.show = false
        }
        this.region_name = route.query.region_name
        let param = new URLSearchParams();
        param.append('region_name', route.query.region_name);
        this.$store.commit('get_screen/changeParams', {params: param})
        this.$store.dispatch('get_screen/getRegionScreenRiskNumber')
        this.$store.dispatch('get_screen/getRegionScreenRNRank')
        this.$store.dispatch('get_screen/getRegionScreenMajorNumber')
        this.$store.dispatch('get_screen/getRegionScreenCNRank')
        this.$store.dispatch('get_screen/getRegionScreenMajorStageInfo')
        this.$store.dispatch('get_screen/getRegionScreenAreaNumber')
        this.$store.dispatch('get_screen/getRegionScreenTable')
        this.$store.dispatch('get_screen/getProvinceInfo')
      },
      immediate: true
    }
  },
  created() {
    // let param = new URLSearchParams();
    // param.append('region_name', this.$store.state.get_region.region_name);
    // // param.append('region_name', '华北区域');
    // this.$store.commit('get_screen/changeParams', {params: param})
    // this.$store.dispatch('get_screen/getRegionScreenRiskNumber')
    // this.$store.dispatch('get_screen/getRegionScreenRNRank')
    // this.$store.dispatch('get_screen/getRegionScreenMajorNumber')
    // this.$store.dispatch('get_screen/getRegionScreenCNRank')
    // this.$store.dispatch('get_screen/getRegionScreenMajorStageInfo')
    // this.$store.dispatch('get_screen/getRegionScreenAreaNumber')
    // this.$store.dispatch('get_screen/getRegionScreenTable')
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
.absolute-layer {
  position: absolute !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.header {
  background-image: url('../assets/head_title.png');
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

.title {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-family: 'Microsoft Yahei';
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.record {
  position: absolute;
  width: 14rem;
  height: 100%;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  left: 0px;
  top: 0px;
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

/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell {

  background-color: transparent;
}

/* 表格内背景颜色 */
/deep/ .el-table th {

  background-color: #052357;
  border-color: #052357;

}

/* 表格内背景颜色 */
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
  color: #ffffff;
}

/*自定义斑马线颜色*/
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #211a1a;
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

/deep/ .CellNote {
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
/*    transform: translateX(0px);*/
/*    -webkit-transform: translateX(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateX(-60px);*/
/*    -webkit-transform: translateX(-60px);*/
/*  }*/
/*}*/

/*@-webkit-keyframes wordsLoop1 {*/
/*  0% {*/
/*    transform: translateX(0px);*/
/*    -webkit-transform: translateX(0px);*/
/*  }*/
/*  100% {*/
/*    transform: translateX(-60px);*/
/*    -webkit-transform: translateX(-60px);*/
/*  }*/
/*}*/

.card-title {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  font-weight: normal;
  font-family: "Microsoft Yahei";
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.box1 {
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../assets/card-title.png");
}

.box2 {
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../assets/screen_card.png");
}

/deep/ .el-button{
  background: transparent !important;
  color: #ffffff;
  height: 0.3rem;
}
</style>