<template>
  <!--  <el-carousel :interval="5000000" indicator-position="outside"-->
  <!--               style="width: 98%; height: 100%; left: 0.2rem; top: 0px">-->
  <!--    <el-carousel-item v-for="(item, index) in CarouselCardData" :key="index">-->
  <div style="height: 100%; width: 100%">
    <div class="absolute" style="width: 100%; height: 100%; overflow-x: hidden">
      <div id="element1">
        <div
             style="width: 100%; height: 8%; margin-left: 0.25rem;">
          <div class="title-wrapper" style="width: 100%; height: 100%; "> 实时风险严重程度分析</div>
        </div>
        <div ref="myBarChart1" style="width: 100%; height: 41%">
        </div>
        <div ref="myPieChart1" style="width: 100%; height: 41%">
        </div>
      </div>
      <div id="element2">
        <div
             style="width: 100%; height: 8%; margin-left: 0.25rem;">
          <div class="title-wrapper" style="width: 100%; height: 100%; "> 实时风险所处区域分析</div>
        </div>
        <div ref="myBarChart2" style="width: 100%; height: 50%">
        </div>
        <div ref="myPieChart2" style="width: 100%; height: 50%">
        </div>
      </div>
      <div id="element3">
        <div
             style="width: 100%; height: 8%; margin-left: 0.25rem;">
          <div class="title-wrapper" style="width: 100%; height: 100%; "> 实时风险致因阶段分析</div>
        </div>
        <div ref="myBarChart3" style="width: 100%; height: 50%">
        </div>
        <div ref="myPieChart3" style="width: 100%; height: 50%">
        </div>
      </div>
    </div>
  </div>
  <!--    </el-carousel-item>-->
  <!--  </el-carousel>-->
</template>

<script>
export default {
  name: "CarouselCard",
  props: {
    CarouselCardData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      myBarChart: null,
      myPieChart: null,
      barChart: null,
      pieChart: null,
      timer: null
    }
  },
  watch: {
    CarouselCardData() {

      //拼接完字符串数组后用innerHTML把它渲染到页面中
      this.myBarChart = this.$refs.myBarChart1;
      this.barChart = this.$echarts.init(this.myBarChart)
      this.myPieChart = this.$refs.myPieChart1;
      this.pieChart = this.$echarts.init(this.myPieChart)
      this.drawChart(this.CarouselCardData[0])

      // this.barChart.dispose() // 销毁
      // this.pieChart.dispose() // 销毁
      this.myBarChart = this.$refs.myBarChart2;
      this.barChart = this.$echarts.init(this.myBarChart)
      this.myPieChart = this.$refs.myPieChart2;
      this.pieChart = this.$echarts.init(this.myPieChart)
      this.drawChart(this.CarouselCardData[1])

      this.myBarChart = this.$refs.myBarChart3;
      this.barChart = this.$echarts.init(this.myBarChart)
      this.myPieChart = this.$refs.myPieChart3;
      this.pieChart = this.$echarts.init(this.myPieChart)
      this.drawChart(this.CarouselCardData[2])
    }
  },
  methods: {
    drawChart(arr) {
      // let arr = this.CarouselCardData[0]
      let series = []
      let obj = {
        type: 'bar',
        label: {
          show: true,
          formatter: (a) => {
            return a.count
          },
          textStyle: {
            color: '#fff'
          }
        },
      }
      for (let i = 0; i < arr.bar_data[0].length - 1; i++) {
        series.push(obj)
      }
      let bar_option = {
        legend: {
          top: 'top',
          textStyle: {
            color: '#ffffff',
            fontSize: this.fontSize(0.1),
            itemHeight: this.fontSize(0.10),
            itemGap: this.fontSize(0.10),
          },
          itemHeight: this.fontSize(0.10),
          itemGap: this.fontSize(0.10),
          show: true
        },
        tooltip: {},
        dataset: {
          source: arr.bar_data
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
            show: true
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
            show: true
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#272727'
            },
          }
        },
        series: series,
      };
      // pie_option["series"][0]["itemStyle"]["normal"] = {
      //   color: function (params) {
      //     let colorList = [
      //       '#ee5a24', '#ea2027', '#009432', '#00b3ff',
      //       '#0652dd', '#f79f1f', '#ed4ccb', '#a55eea',
      //       '#c8d4d9', '#16a085'
      //     ];
      //     return colorList[params.dataIndex % arr.length]
      //   },
      // }
      this.barChart.setOption(bar_option);
      window.addEventListener("resize", () => {
        this.barChart.resize();
      });

      let pie_option = {
        legend: {
          top: 'bottom',
          textStyle: {
            color: '#ffffff',
            fontSize: this.fontSize(0.1),
            itemHeight: this.fontSize(0.10),
            itemGap: this.fontSize(0.10),
          },
          itemHeight: this.fontSize(0.10),
          itemGap: this.fontSize(0.10),
          show: true
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '62%'],
            center: ['50%', '50%'],
            label: {
              color: '#fff',
              formatter: '{d}% \n {b} ',
              position: 'center',
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                color: '#ffffff'
              }
            },
            itemStyle: {
              borderRadius: 0,
              normal: {
                color: function (params) {
                  //自定义颜色
                  let colorList = [
                    '#ee5a24', '#ea2027', '#009432', '#00b3ff',
                    '#0652dd', '#f79f1f', '#ed4ccb', '#a55eea',
                    '#c8d4d9', '#16a085'
                  ];
                  return colorList[params.dataIndex]
                },
              }
            },
            data: arr.pie_data
          }
        ]
      };
      // pie_option["series"][0]["itemStyle"]["normal"] = {
      //   color: function (params) {
      //     let colorList = [
      //       '#ee5a24', '#ea2027', '#009432', '#00b3ff',
      //       '#0652dd', '#f79f1f', '#ed4ccb', '#a55eea',
      //       '#c8d4d9', '#16a085'
      //     ];
      //     return colorList[params.dataIndex % arr.length]
      //   },
      // }
      this.pieChart.setOption(pie_option);
      window.addEventListener("resize", () => {
        this.pieChart.resize();
      });

    },
    fontSize(res) {
      let docEl = document.documentElement,
          clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
  },
  mounted() {
    if (this.barChart != null && this.barChart != "" && this.barChart != "undefined") {
      this.barChart.dispose() // 销毁
    }
    if (this.pieChart != null && this.pieChart != "" && this.pieChart != "undefined") {
      this.pieChart.dispose() // 销毁
    }
    let chooseIndex1 = 0;//默认选中高亮模块索引 现在是默认第一条
    let chooseIndex2 = 0;
    let chooseIndex3 = 0;
    this.timer = setInterval(() => {
      let len = this.CarouselCardData[0].pie_data.length
      this.myPieChart = this.$refs.myPieChart1;
      this.pieChart = this.$echarts.init(this.myPieChart)
      // this.pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex1});
      // 没用选中的取消高亮
      this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex1});
      if (chooseIndex1 != chooseIndex2) {
        this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex2});
      }
      if (chooseIndex1 != chooseIndex3) {
        this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex3});
      }
      //选中某一条高亮
      chooseIndex1 = (chooseIndex1 + 1) % len;
      this.pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex1});

      len = this.CarouselCardData[1].pie_data.length
      this.myPieChart = this.$refs.myPieChart2;
      this.pieChart = this.$echarts.init(this.myPieChart)
      this.pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex2});
      // 没用选中的取消高亮
      this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex2});
      if (chooseIndex1 != chooseIndex2) {
        this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex1});
      }
      if (chooseIndex2 != chooseIndex3) {
        this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex3});
      }
      //选中某一条高亮
      chooseIndex2 = (chooseIndex2 + 1) % len;
      this.pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex2});

      len = this.CarouselCardData[2].pie_data.length
      this.myPieChart = this.$refs.myPieChart3;
      this.pieChart = this.$echarts.init(this.myPieChart)
      this.pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex3});
      // 没用选中的取消高亮
      this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex2});
      if (chooseIndex1 != chooseIndex3) {
        this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex1});
      }
      if (chooseIndex2 != chooseIndex3) {
        this.pieChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex3});
      }
      //选中某一条高亮
      chooseIndex3 = (chooseIndex3 + 1) % len;
      this.pieChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex3});
    }, 2000);

    let count = 0
    setInterval(() => {
      if (count == 0) {
        $("#element1").css("display", "block")
        $("#element2").css("transform", "translateX(100%)")
        $("#element2").css("left", "100%")
        $("#element3").css("display", "none")
        $("#element3").css("transform", "translateX(0%)")
        setTimeout(() => {
          $("#element1").css("transform", "translateX(100%)")
        }, 1000)
        $("#element3").css("left", "-100%")
      } else if (count == 1) {
        $("#element3").css("display", "block")
        $("#element1").css("transform", "translateX(100%)")
        $("#element1").css("left", "100%")
        $("#element2").css("display", "none")
        $("#element2").css("transform", "translateX(0%)")
        setTimeout(() => {
          $("#element3").css("transform", "translateX(100%)")
        }, 1000)
        $("#element2").css("left", "-100%")
      } else if (count == 2) {
        $("#element2").css("display", "block")
        $("#element3").css("transform", "translateX(100%)")
        $("#element3").css("left", "100%")
        $("#element1").css("display", "none")
        $("#element1").css("transform", "translateX(0%)")
        setTimeout(() => {
          $("#element2").css("transform", "translateX(100%)")
        }, 1000)
        $("#element1").css("left", "-100%")
      }
      count = (count + 1) % 3
    }, 4000)

    // $("#element2").css("transform", "translateX(100%)")
    //   setTimeout(() => {
    //     $("#element1").css("transform", "translateX(100%)")
    //   }, 2000)
  },
  beforeDestroy() {
    if (!this.barChart) {
      return;
    }
    this.barChart.dispose();
    this.barChart = null;

    if (!this.pieChart) {
      return;
    }
    this.pieChart.dispose();
    this.pieChart = null;
  },
  destroyed() {
    clearInterval(this.timer)
    window.removeEventListener("resize", () => {
      this.barChart.resize();
    });

    window.removeEventListener("resize", () => {
      this.pieChart.resize();
    });
  }
}
</script>

<style scoped>
/deep/ .el-carousel__container {
  width: 100%;
  height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item {
  background-image: url("../../../assets/major_card2.png");
}

.absolute {
  position: absolute !important;
  margin: 0 !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.title-wrapper {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 99, 0);
  font-weight: bold;
  font-family: 'Microsoft Yahei';
  font-size: 0.30rem;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

#element1 {
  left: -100%;
}

#element2 {
  left: 0%;
}

#element3 {
  left: 100%;
  width: 100%;
  height: 100%;
}

#element1, #element2, #element3 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 120px;
  transform-style: preserve-3d;
  transition: 1s;
}
</style>