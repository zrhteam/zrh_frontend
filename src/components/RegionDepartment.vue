<template>
  <!-- 商业地产事业部2020年巡检项目EHS大数据分析 -->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span = "24">
          <div id="title" class="grid-content bg-purple-dark" style="text-align: left">
            <span>商业地产事业部2020年巡检项目EHS大数据分析</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style = "margin-bottom: 100px">
        <el-col :span = "6">
          <div class = "grid-content bf-purple">
            <div class = "chart-image-icon"></div>
            <div>
              <div style = "color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: normal; font-size: 21.09px;">
                <span>安全指数</span>
              </div>
              <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; line-height: 75.945px; font-size: 50.63px; height: 75.945px;">
                <span>45.90</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <el-row>
              <el-col :span ="6">
                <div>
                  <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                    <span>28.93</span>
                  </div>
                  <div class = "chart-text-title" style = 'font-family: "Microsoft YaHei"'>
                    <span>消防指数</span>
                  </div>
                </div>

              </el-col>
              <el-col :span = "6">
                <div class = "grid-content bg-purple-light">
                  <div>
                    <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                      <span>76.83</span>
                    </div>
                    <div class = "chart-text-title" style = 'font-family: "Microsoft YaHei"'>
                      <span>电梯指数</span>
                    </div>
                  </div>

                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span = "6">
                <div class = "grid-content bg-purple">
                  <div>
                    <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                      <span>82.69</span>
                    </div>
                    <div class = "chart-text-title" style = "left: 35%; bottom: 20%; font-family: 'Microsoft YaHei'">
                      <span>燃气指数</span>
                    </div>
                  </div>

                </div>
              </el-col>
              <el-col :span = "6">
                <div class = "grid-content bg-purple-light">
                  <div>
                    <div style = "color: rgb(59, 162, 255); font-family: Avenir; font-weight: normal; font-style: normal; font-size: 21.09px;">
                      <span>82.69</span>
                    </div>
                    <div class = "chart-text-title" style = "left: 45%; bottom: 20%; font-family: 'Microsoft YaHei'">
                      <span>电气指数</span>
                    </div>
                  </div>

                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div style= "color: rgb(0, 0, 0); font-family: 'microsoft YaHei'; font-weight: bold; font-style: normal; max-width: 100%; line-height: 16px; font-size: 16px; height: 16px;">
              <span>已检查项目数量</span>
            </div>
            <div style = "color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 30px;" >
              {{getExamineNumber}}
            </div>
          </div>
        </el-col>
        <el-col :span = "6">
          <div style = "display: none; color: rgb(0,0,0);" >
            {{getRiskLevelData}}
          </div>
          <div class = "grid-content bg-purple-light">
            <div class = "text item">
              <span>所有项目累计发现隐患数量</span>
            </div>
            <el-table
                :data = "riskLevelData"
                border
                style = "width: 100%">
              <el-table-column
                prop = "risk"
                label = "隐患风险等级">
              </el-table-column>
              <el-table-column
                prop = "num"
                label="累计发现隐患数量">
              </el-table-column>
            </el-table>
          </div>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span = "6">
          <div style = 'display: none'>
            {{getNoRectificationRisk}}
          </div>
          <div class = "grid-content bg-purple-light">
            <div class = "text list">
              <span>项目当前未整改高风险隐患列表</span>
            </div>
          </div>
          <el-table
            :data = "noRectificationNumber"
            style = "width: 100%"
            max-height = "400">
            <el-table-column
              prop = "description"
              label = "隐患描述"
              width = "550">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span = "6">
          <div class = "grid-content bg-purple">
            <div>
              <span>未整改高风险隐患图片</span>
            </div>
          </div>
          <div class = "grid-content bg-purple">
            <div class = 'demo-image__placeholder'>
              <div class = 'block'>
                <img src = 'images' id = 'img' style ='width: 400px; height: 400px'>
              </div>
            </div>
          </div>
          <div style = "display: none">
            {{getImage}}
          </div>
        </el-col>
        <el-col :span = "12">
          <div class="grid-content bg-purple">
            <div>
              <span>所有项目累计发现隐患专业分布</span>
            </div>
            <div>
              <div id = "mycheckbox" >
                <checkbox></checkbox>
              </div>
<!--              在这里展示三维图-->
              <div>
                <RiskDistribution></RiskDistribution>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span = "8">
          <div style="display: none">
            {{getRiskNumberTop}}
          </div>
          <div class = "grid-content bg-purple-light">
            <div id = "subtitle1">
              <span>项目累计出现隐患前十条</span>
            </div>
            <div>
              <el-table
                :data = "riskNumberTop"
                stripe
                style = "width: 100%">
                <el-table-column
                  prop = "description"
                  label = "隐患描述"
                  width = '550'>
                </el-table-column>
                <el-table-column
                  prop = "num"
                  label = "出现次数">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span = "8">
          <div class = "grid-content bg-purple">
            <div style = "text-align: center">
              <span>项目安全指数排名</span>
            </div>
            <div>
              <div id = "mydiv3" style = "font-color: black">
<!--                这里是写项目安全指数排名的柱状图-->
                <SafetyIndexHistogram></SafetyIndexHistogram>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span = "8">
          <div class = "grid-content bg-purple">
            <div style = "text-align: center">
              <span>项目累计高风险数量排名</span>
            </div>
            <div id = "mydiv4" >
<!--              这里写累计高风险数量排名的柱状图-->
              <RegionNumberHistogram></RegionNumberHistogram>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import dataService from "@/service/dataService";
import FireHazardIndex from "@/components/FireHazardIndex.vue";
import checkbox from "@/components/checkbox.vue";
import SafetyIndexHistogram from "@/components/SafetyIndexHistogram.vue";
import RegionNumberHistogram from "@/components/RegionNumberHistogram.vue";
import RiskDistribution from "@/components/RiskDistribution.vue";
import * as d3 from "d3";

function sortNumber(attr, rev){
  //默认升序排序
  if(rev == undefined){
    rev =1;
  }
  else{
    rev = (rev) ? 1 : -1;
  }

  return function (a,b){
    a = a[attr];
    b = b[attr];
    if(a < b){
      return rev * -1;
    }
    if(a > b){
      return rev * 1;
    }
    return 0;
  }
}

export default {
name: "RegionDepartment",
  components: {checkbox, RiskDistribution, SafetyIndexHistogram, RegionNumberHistogram},
  data(){
    return {
      riskLevelData: [],
      // riskLevelData: {
      //   risk: " ",
      //   num: " "
      // },
      noRectificationNumber: [],
      riskNumberTop: [],
      images: '',
      timer: ''

    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
  //得到已检查项目数量
    getExamineNumber(){
      return this.$store.state.get_region.examine_number;
    },

    //得到各等级风险对应的隐患数量
    getRiskLevelData(){
      let data = this.$store.state.get_region.risk_level_data;
      console.log(this.$store.state.get_region.risk_level_data)
      //console.log(data)
      //风险等级对应情况
      //1: 低风险，2：中风险，3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          risk: ' ',
          num: 0
        }
        if (i == 1){
          obj.risk = '低风险'
          obj.num = data[i]
        }
        if (i ==2){
          obj.risk = '中风险'
          obj.num = data[i]
        }
        if (i == 3) {
          obj.risk = '高风险'
          obj.num = data[i]
        }
        dataArray.push(obj)
        //console.log(dataArray)
      }//for

      let obj = {
        risk: '风险',
        num: 0
      }
      if( dataArray.length ==3){
        obj.risk = '列总计'
        obj.num = dataArray[0].num + dataArray[1].num + dataArray[2].num
        dataArray.push(obj)
        console.log(dataArray)
      }
      this.riskLevelData = dataArray

    },

    //得到未整改高风险隐患列表
    getNoRectificationRisk(){
      let data = this.$store.state.get_region.no_rectification_risk.note_list;
      console.log(this.$store.state.get_region.no_rectification_risk.note_list)
      console.log(data)

      let dataArray = []
      let reg = RegExp(/测试/)
      for (let i in data) {
        let obj = {
          description: ""
        }
        if(!data[i].match(reg)){
          obj.description =data[i]
          dataArray.push(obj)
        }

      }//for

      console.log(dataArray)
      this.noRectificationNumber = dataArray
    },

    //得到未整改高风险隐患图片
    getImage(){
      let data = this.$store.state.get_region.images;
      let count = 0;
      // document.getElementById('img').src = 'http://' + data[0][0]
      for (let i in data) {
        for (let j in data[i]){
          if (count >0)
          {
            break
          }
          if (count ==0) {
            document.getElementById('img').src = 'http://' + data[i][j]
            this.images = 'http://' + data[i][j]//存在的问题是，会把所有图片都显示在上面，要改成轮播形式
          }
          count ++
        }
      }
      console.log(this.images)
    },

    //得到排名前十的隐患描述
    getRiskNumberTop(){
      let data = this.$store.state.get_region.risk_number_top;
      console.log(this.$store.state.get_region.risk_number_top)
      console.log(data)

      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ' ',
          num: 0
        }
        //console.log(i)
        obj.description = i;
        obj.num = data[i]['appear_time']
        dataArray.push(obj)
      }
      //按出现次数降序
      dataArray.sort(sortNumber('num', false))
      console.log(dataArray)
      this.riskNumberTop =  dataArray
    }

  },

  methods: {
    updateTable(){
      let first = this.noRectificationNumber[0];
      this.noRectificationNumber.shift();
      this.noRectificationNumber.push(first);
    },
  },

  created() {
    this.$store.dispatch('get_region/getInitRegionProjectNumber')
    this.$store.dispatch('get_region/getInitRegionRiskLevel')
    this.$store.dispatch('get_region/getInitRegionHighRisk')
    this.$store.dispatch('get_region/getInitRegionNumberTop')
    this.$store.dispatch('get_region/getInitRegionImage')
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/ibdex.css");

#title {
  text-align: left;
  font-size: 28px;
  font-weight: 700;
}

i {
  font-style: normal;
}

.chart-image-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 25%;
  height: 100%;
  background-size: 100% 100%;
}

.chart-image-icon {
  background-image: url('../components/svg/card-skin-1.svg');
  font-family: 'microsoft YaHei';
}

.chart-text-title {
  color: #000000;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  font-size: 12px;
}
</style>