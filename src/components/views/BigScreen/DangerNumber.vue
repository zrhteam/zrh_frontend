<template>
  <div>
    <div class="absolute-layer" style="width: 4.7rem; height: 0.45rem; left: 0px; top: 0px;">
      <div class="box1" style="width: 4.5rem; height: 0.45rem;">
      </div>
    </div>
    <div class="absolute-layer" style="width: 3.75rem; height: 0.7rem; left: 0.62rem; top: -0.1rem;">
      <div class="card-title" style="width: 3.75rem; height: 0.7rem; font-size: 0.2rem;">
        隐患数量
      </div>
    </div>
    <div class="absolute-layer" style="width: 3.75rem; height: 0.9rem; left: 0.13rem; top: 0.58rem;">
      <div class="sub-wrapper">
        <div class="title-container">截止目前已发现隐患</div>
        <div class="counter-container">{{ risk_num }}</div>
      </div>
    </div>
    <div class="absolute-layer" style="width: 92%; height: 64%; left: 0.10rem; top: 1.36rem;">
      <div class="box2" style="width: 100%; height: 100%;">
        <div ref='dangerNumBar' style="height: 100%; width: 100%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "DangerNumber",
  props: {
    dangerData: {
      type: Object,
      default: function () {
        return {}
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
      dangerNumBar: null,
      myChart: null,
      // renderSign: false,
      risk_num: 0
    }
  },
  methods: {
    drawBarChart() {
      let arr = this.dangerData.arr_num
      this.risk_num = this.dangerData.sum
      // this.renderSign = true
      let bar_option = {
        tooltip: {},
        dataset: [{
          dimensions: ['name', 'count'],
          source: arr
        }, {
          transform: {
            type: 'sort',
            config: {dimension: 'count', order: 'desc'}
          }
        }],
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize(0.1),
              color: '#ffffff'
            },
            formatter: function (params) {
              let val = "";
              let show = 8;
              if (params.length > show) {
                val = params.substr(0, show) + '...';
                return val;
              } else {
                return params;
              }
            },
          },
          axisLine: false,
          splitLine: {
            show: false
          },
          axisTick: false
        },
        yAxis: {
          axisLine: {
            lineStyle: {},
            show: false
          },
          axisTick: false,
          axisLabel: {
            textStyle: {},
            show: false
          },
          splitLine: false
        },
        grid: {
          left: this.fontSize(0.65),
          top: this.fontSize(0.25),
          right: this.fontSize(0.85),
          bottom: this.fontSize(0.10),
          containLabel: true
        },
        series: [
          {
            type: 'bar',
            encode: null,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 1, 0.6, 0.3,
                    [
                      {offset: 0, color: '#c16ad5'},
                      {offset: 0.3, color: '#9956cb'},
                      {offset: 0.6, color: '#7746c1'},
                      {offset: 1, color: '#3626af'}
                    ]
                )
              }
            },
            label: {
              show: true,
              formatter: (a) => {
                return a.count
              }
            },
            // emphasis: {
            //   itemStyle: {
            //     color: '#40abc4'
            //   }
            // },
            barCategoryGap: this.fontSize(0.30),
            barMaxWidth: this.fontSize(0.20),
            showBackground: true
          },
        ]
      };

      this.myChart.setOption(bar_option);

      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    fontSize(res) {
      let docEl = document.documentElement,
          clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    }
  },
  mounted() {
    if(this.myChart != null && this.myChart != "" && this.myChart != undefined) {
      this.myChart.dispose() // 销毁
    }
    this.dangerNumBar = this.$refs.dangerNumBar;
    this.myChart = this.$echarts.init(this.dangerNumBar)
    this.drawBarChart()
  },
  watch: {
    dangerData() {
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
  transform: rotate(0deg);
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

.sub-wrapper {
  width: 300px;
  height: 73px;
  pointer-events: auto;
  display: block;
  align-items: start;
  flex-direction: column;
  --prefix-num-margin-right: 0px;
  --num-suffix-margin-left: 0px;
}

.title-container {
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  font-weight: normal;
  font-family: "Microsoft Yahei";
  font-size: 0.2rem;
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
  color: rgb(255, 255, 255);
  text-align: center;
  white-space: nowrap;
  justify-content: flex-start;
  font-size: 0.4rem;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  width: 300px;
  height: 49px;
  background-color: rgba(0, 0, 0, 0);
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