<template>
  <div>
    <div class="absolute-layer" style="width: 4.7rem; height: 0.45rem; left: 0px; top: 0px;">
      <div class="box1" style="width: 4.7rem; height: 37px;">
      </div>
    </div>
    <div class="absolute-layer" style="width: 3.75rem; height: 0.7rem; left: 0.61rem; top: -0.1rem;">
      <div class="card-title" style="width: 3.75rem; height: 0.7rem; font-size: 0.2rem;">
        {{ this.riskName }}隐患数量
      </div>
    </div>
    <div class="absolute-layer" style="width: 93%; height: 80%; left: 0.06rem; top: 0.61rem;">
      <div class="box2" style="width: 100%; height: 100%;">
        <div ref='riskNumberPie' style="height: 100%; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RiskNumber",
  props: {
    riskName: {
      type: String,
      default: function () {
        return ''
      }
    },
    riskNumber: {
      type: Array,
      default: function () {
        return []
      }
    },
    renderSign: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data() {
    return {
      riskNumberPie: null,
      myChart: null,
      // renderSign: false,
      timer: null
    }
  },
  methods: {
    drawBarChart() {
      let arr = this.riskNumber
      // this.renderSign = true
      let pie_option2 = {
        series: [
          {
            type: 'pie',
            radius: ['55%', '70%'],
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
            data: arr
          }
        ]
      };
      pie_option2["series"][0]["itemStyle"]["normal"] = {
        color: function (params) {
          let colorList = [
            '#ee5a24', '#ea2027', '#009432', '#00b3ff',
            '#0652dd', '#f79f1f', '#ed4ccb', '#a55eea',
            '#c8d4d9', '#16a085'
          ];
          return colorList[params.dataIndex % arr.length]
        },
      }
      this.myChart.setOption(pie_option2);

      window.addEventListener("resize", () => {
        if (this.myChart != null) { // 如果不存在，就进行初始化
          this.myChart.resize();
        }
      });
    }
  },
  mounted() {
    if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
      this.myChart.dispose() // 销毁
    }
    this.riskNumberPie = this.$refs.riskNumberPie;
    this.myChart = this.$echarts.init(this.riskNumberPie)

    this.drawBarChart()

    let chooseIndex = 0;//默认选中高亮模块索引 现在是默认第一条, echart轮播
    this.timer = setInterval(() => {
      let len = this.riskNumber.length
      this.myChart = echarts.getInstanceByDom(this.riskNumberPie)
      if (this.myChart == null) { // 如果不存在，就进行初始化
        this.myChart = this.$echarts.init(this.riskNumberPie)
      }
      this.myChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex});
      // 没用选中的取消高亮
      this.myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: chooseIndex});
      //选中某一条高亮
      chooseIndex = (chooseIndex + 1) % len;
      this.myChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: chooseIndex});
    }, 2000);
  },
  watch: {
    riskNumber() {
      this.drawBarChart()
    }
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  destroyed() {
    clearInterval(this.timer)
    window.removeEventListener("resize", () => {
      this.myChart.resize();
    });
  }
}
</script>

<style scoped>
.absolute-layer {
  position: absolute !important;
  z-index: 0;
  transform: rotate(0deg
  );
  opacity: 1;
  pointer-events: none;
}

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
  background-image: url("../../../assets/card-title.png");
}

.box2 {
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../assets/screen_card.png");
}
</style>