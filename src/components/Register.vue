<!--<template>-->
<!--  <div class="echarts">-->
<!--    <div :style="{height:'400px',width:'100%'}" ref="myEchart"></div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import echarts from "echarts";-->
<!--//   import '../../node_modules/echarts/map/js/world.js'-->
<!--import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据-->
<!--export default {-->
<!--  name: "echarts",-->
<!--  props: ["userJson"],-->
<!--  data() {-->
<!--    return {-->
<!--      chart: null-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.chinaConfigure();-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    if (!this.chart) {-->
<!--      return;-->
<!--    }-->
<!--    this.chart.dispose();-->
<!--    this.chart = null;-->
<!--  },-->
<!--  methods: {-->
<!--    chinaConfigure() {-->
<!--      console.log(this.userJson)-->
<!--      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置-->
<!--      window.onresize = myChart.resize;-->
<!--      myChart.setOption({ // 进行相关配置-->
<!--        opacity: 0,-->
<!--        tooltip: {}, // 鼠标移到图里面的浮动提示框-->
<!--        dataRange: {-->
<!--          show: false,-->
<!--          min: 0,-->
<!--          max: 1000,-->
<!--          text: ['High', 'Low'],-->
<!--          realtime: true,-->
<!--          calculable: true,-->
<!--          color: ['orangered', 'yellow', 'lightskyblue']-->
<!--        },-->
<!--        geo: { // 这个是重点配置区-->
<!--          map: 'china', // 表示中国地图-->
<!--          roam: true,-->
<!--          label: {-->
<!--            normal: {-->
<!--              show: true, // 是否显示对应地名-->
<!--              textStyle: {-->
<!--                color: 'rgba(0,0,0,0.4)'-->
<!--              }-->
<!--            }-->
<!--          },-->
<!--          itemStyle: {-->
<!--            normal: {-->
<!--              // borderColor: 'rgba(0, 0, 0, 0.2)'-->
<!--              areaColor: "#0d0059",-->
<!--              borderColor: "#389dff",-->
<!--              borderWidth: 0.5-->
<!--            },-->
<!--            emphasis: {-->
<!--              // areaColor: null,-->
<!--              // shadowOffsetX: 0,-->
<!--              // shadowOffsetY: 0,-->
<!--              // shadowBlur: 20,-->
<!--              // borderWidth: 0,-->
<!--              // shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--              areaColor: "#17008d",-->
<!--              shadowOffsetX: 0,-->
<!--              shadowOffsetY: 0,-->
<!--              shadowBlur: 5,-->
<!--              borderWidth: 0,-->
<!--              shadowColor: "rgba(0, 0, 0, 0.5)"-->
<!--            }-->
<!--          }-->
<!--        },-->
<!--        series: [{-->
<!--          type: 'scatter',-->
<!--          coordinateSystem: 'geo', // 对应上方配置-->
<!--          // itemStyle: {-->
<!--          //   normal: {-->
<!--          //     areaColor: "#0d0059",-->
<!--          //     borderColor: "#389dff",-->
<!--          //     borderWidth: 0.5-->
<!--          //   },-->
<!--          //   emphasis: {-->
<!--          //     areaColor: "#17008d",-->
<!--          //     shadowOffsetX: 0,-->
<!--          //     shadowOffsetY: 0,-->
<!--          //     shadowBlur: 5,-->
<!--          //     borderWidth: 0,-->
<!--          //     shadowColor: "rgba(0, 0, 0, 0.5)"-->
<!--          //   }-->
<!--          // }-->
<!--        },-->
<!--          {-->
<!--            name: '启动次数', // 浮动框的标题-->
<!--            type: 'map',-->
<!--            geoIndex: 0,-->
<!--            data: [{-->
<!--              "name": "北京",-->
<!--              "value": 599-->
<!--            }, {-->
<!--              "name": "上海",-->
<!--              "value": 142-->
<!--            }, {-->
<!--              "name": "黑龙江",-->
<!--              "value": 44-->
<!--            }, {-->
<!--              "name": "深圳",-->
<!--              "value": 92-->
<!--            }, {-->
<!--              "name": "湖北",-->
<!--              "value": 810-->
<!--            }, {-->
<!--              "name": "四川",-->
<!--              "value": 453-->
<!--            }]-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--    <model-obj src="example/models/obj/LeePerrySmith.obj"></model-obj>-->
<!--</template>-->
<!--<script>-->
<!--    import { ModelObj } from 'vue-3d-model'-->

<!--    export default {-->
<!--        components: { ModelObj }-->
<!--    }-->


<!--<template>-->
<!--  <div style="height:100%;width:100%">-->
<!--    <div class="body" :style="view">-->
<!--      <div class="scroll-content" :style="{top}" >-->
<!--        <tr v-for="item in dutyRateData">-->
<!--          <td>{{item.group}}</td>-->
<!--          <td>{{item.bookNum}}</td>-->
<!--          <td>{{item.sceneNum}}</td>-->
<!--          <td>{{item.dutyRate}}</td>-->
<!--        </tr>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    viewHeight: {//可视窗口-->
<!--      type: [Number, String],-->
<!--      default: "200px"-->
<!--    },-->
<!--    // animationTime: {//移动间隔-->
<!--    //   type: [Number, String],-->
<!--    //   default: "0.825s"-->
<!--    // },-->
<!--    // direction:{//移动方向-->
<!--    //     type:String,-->
<!--    //     default:top,-->
<!--    // },-->
<!--    moveDistance:{//移动距离-->
<!--        type:Number,-->
<!--        default:25-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      dutyRateData: [-->
<!--        { group: "电工班1", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班2", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班3", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班4", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班5", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班6", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班7", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班8", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班9", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班10", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班11", bookNum: 3, sceneNum: 0, dutyRate: "88%" }-->
<!--      ],-->
<!--      activeIndex: 0,-->
<!--      view:'',-->
<!--      count: 0,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->

<!--  },-->
<!--  computed: {-->
<!--    top() {-->
<!--      return -this.activeIndex * this.moveDistance + "px"; //定义移动的单元高度-->
<!--    },-->

<!--  },-->
<!--  mounted() {-->
<!--    this.view= {"height":this.viewHeight}-->
<!--    setInterval(_ => {-->
<!--      //自定义滚动 出勤率-->
<!--      // if ( this.activeIndex < this.dutyRateData.length /* this.towerListArr.length */) {-->
<!--        this.activeIndex += 1;-->
<!--      // } else {-->
<!--      //   this.activeIndex = 0;-->
<!--      // }-->
<!--      // if(this.activeIndex % 25 == 0) {-->
<!--        let temp = this.dutyRateData[this.count%this.dutyRateData.length];-->
<!--        this.dutyRateData.push(temp)-->
<!--      this.count++;-->
<!--      // }-->
<!--    }, 500);-->
<!--    // setInterval(_ => {-->
<!--      //自定义滚动 出勤率-->
<!--      // if ( this.activeIndex < this.dutyRateData.length /* this.towerListArr.length */) {-->
<!--      // } else {-->
<!--      //   this.activeIndex = 0;-->
<!--      // }-->
<!--      // if(this.activeIndex % 25 == 0) {-->
<!--      // this.dutyRateData.shift()-->
<!--      // }-->
<!--    // }, 500);-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style scoped>-->
<!--.scroll-content {-->
<!--  /*//自定义滚动 间隔时间和方向*/-->
<!--  position: relative;-->
<!--  transition: top 0.825s; /*//向上移动*/-->
<!--}-->
<!--.body {-->
<!--  width: 100%;-->
<!--  height: 100px;-->
<!--  overflow-y: hidden;-->
<!--  /*//   position: absolute;*/-->
<!--}-->
<!--</style>-->
<template>
<div>
  <el-row :gutter="20"  class="el-row" >
    <el-col :span="8"  class="el-col" >
      <el-card class="el-card" >
        <div slot="header" class="clearfix">
          <span>item.appname</span>
        </div>
        <div >
          <div class="text item">
            <div class="item_tag" >
              <span >用户标签：</span>
            </div>
            <div class="item_desr">
              <span > item.tag</span>
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>搜索标签：</span>
            </div>
            <div class="item_desr">
              item.seatag}}
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>短信签名：</span>
            </div>
            <div class="item_desr">
              <span>
                 item.wxname}}
              </span>
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>客服QQ：</span>
            </div>
            <div class="item_desr">
              item.qq}}
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>商务合作：</span>
            </div>
            <div class="item_desr">
              item.buscoo}}
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" >
        <div class="el-card__body mid">
          <el-button  icon="el-icon-circle-plus" circle></el-button>
          <el-button style="margin-left: 0;color: #505458" type="text">添加APP</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20"  class="el-row" type="flex" >
    <el-col :span="8"  class="el-col" >
      <el-card class="el-card" >
        <div slot="header" class="clearfix">
          <span>item.appname</span>
        </div>
        <div >
          <div class="text item">
            <div class="item_tag" >
              <span >用户标签：</span>
            </div>
            <div class="item_desr">
              <span > item.tag</span>
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>搜索标签：</span>
            </div>
            <div class="item_desr">
              item.seatag}}
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>短信签名：</span>
            </div>
            <div class="item_desr">
              <span>
                 item.wxname}}
              </span>
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>客服QQ：</span>
            </div>
            <div class="item_desr">
              item.qq}}
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>商务合作：</span>
            </div>
            <div class="item_desr">
              item.buscoo}}
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" style="min-height: 200px;" align="middle" onclick="">
        <div class="el-card__body mid">
          <el-button  icon="el-icon-circle-plus" circle></el-button>
          <el-button style="margin-left: 0;color: #505458" type="text">添加APP</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20"  class="el-row" type="flex" >
    <el-col :span="8"  class="el-col" >
      <el-card class="el-card" >
        <div slot="header" class="clearfix">
          <span>item.appname</span>
        </div>
        <div >
          <div class="text item">
            <div class="item_tag" >
              <span >用户标签：</span>
            </div>
            <div class="item_desr">
              <span > item.tag</span>
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>搜索标签：</span>
            </div>
            <div class="item_desr">
              item.seatag}}
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>短信签名：</span>
            </div>
            <div class="item_desr">
              <span>
                 item.wxname}}
              </span>
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>客服QQ：</span>
            </div>
            <div class="item_desr">
              item.qq}}
            </div>
          </div>
          <div class="text item">
            <div class="item_tag">
              <span>商务合作：</span>
            </div>
            <div class="item_desr">
              item.buscoo}}
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" style="min-height: 200px;" align="middle" onclick="">
        <div class="el-card__body mid">
          <el-button  icon="el-icon-circle-plus" circle></el-button>
          <el-button style="margin-left: 0;color: #505458" type="text">添加APP</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>
<style type="text/css">
  .all{
    margin-top: -30px;
    word-break: break-all;
    height: 100%;
  }
  .mid{
    margin-top: 25%;
    height: 50%;
  }
  .mid_item{
    justify-content: center;
    align-items: center;
  }
  .item {
    margin-bottom: 10px;
  }
  .item_tag{
    float:left;
    text-align:left;
  }
  .item_desr{
    margin-left: 40%;
    min-height: 30px;
    text-align:left;
  }
  .text {
    width: 100%;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    color: #909399;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .el-card {
    min-width: 100%;
    margin-right: 20px;
    /*transition: all .5s;*/
  }
  .el-card:hover{
    margin-top: -5px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
    align-items: stretch;
    margin-bottom: 40px;
  }
</style>