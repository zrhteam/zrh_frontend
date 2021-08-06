<template>
  <div>
    <div class="absolute-layer" style="width: 4.7rem; height: 0.45rem; left: 0px; top: 0px;">
      <div class="box1" style="width: 4.7rem; height: 0.45rem;">
      </div>
    </div>
    <div class="absolute-layer" style="width: 3.75rem; height: 0.45rem; left: 0.61rem; top: -0.1rem;">
      <div class="card-title" style="width: 3.75rem; height: 0.7rem; font-size: 0.2rem;">
        不同致因阶段隐患数量
      </div>
    </div>
    <div class="absolute-layer" style="width: 93%; height: 80%; left: 0.06rem; top: 0.61rem;">
      <div class="box2" style="width: 100%; height: 100%;">
        <div ref='rankBar' style="height: 95%; width: 100%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bar_option} from "@/utils/constants";

export default {
  name: "RiskByStage",
  props: {
    stageLegend: {
      type: Array,
      default: function () {
        return []
      }
    },
    stageyAxis: {
      type: Array,
      default: function () {
        return []
      }
    },
    stageSdata: {
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
      rankBar: null,
      myChart: null,
      // renderSign: false,
    }
  },
  methods: {
    drawBarChart() {
      let r_data = []
      let data = []
      let color = ['#0a73ff', '#3dabff', '#79daff', '#a3f6ff']
      //转置
      let hang = this.stageSdata.length
      if (hang > 0) {
        let lie = this.stageSdata[0].length
        for (let i = 0; i < lie; i++) {
          let sub_r = []
          for (let j = 0; j < hang; j++) {
            sub_r.push(this.stageSdata[j][i])
          }
          r_data.push(sub_r)
        }
      }
      for (let i in r_data) {
        let obj = {
          name: this.stageLegend[i],
          type: 'bar',
          stack: 'total',
          label: {
            normal: {
              show: false,
              formatter: function (params) {
                if (params.value < Math.ceil(500)) {
                  return '';
                } else {
                  return params.value;
                }
              },
              fontWeight: 200,
              fontSize: this.fontSize(0.10),
              color: "#ffffff"
            },
          },
          emphasis: {
            focus: 'series'
          },
          data: r_data[i],
          itemStyle: {
            normal: {
              color: null,
            }
          },
          barCategoryGap: this.fontSize(0.2 / hang),
        }
        // if (this.legend[i] == "高风险" || this.legend[i] == "中风险" || this.legend[i] == "低风险") {
        obj["itemStyle"]["normal"]["color"] = color[i]
        // }
        data.push(obj)
      }
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          data: this.stageLegend,
          top: 'bottom',
          textStyle: {
            // color: '#058ddb',
            color: '#ffffff',
            fontSize: this.fontSize(0.1),
            itemHeight: this.fontSize(0.10),
            itemGap: this.fontSize(0.10),
          },
          itemHeight: this.fontSize(0.10),
          itemGap: this.fontSize(0.10),
          // type: "scroll",
          show: true
        },
        grid: {
          left: this.fontSize(0.25),
          top: this.fontSize(0.15),
          right: this.fontSize(0.55),
          bottom: this.fontSize(0.45),
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#058ddb',
              fontSize: this.fontSize(0.1)
            },
            show: false
          },
          axisLine: {
            lineStyle: {
              fontSize: this.fontSize(0.08),
              color: '#058ddb'
            },
            show: false
          },
          type: 'value',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#ffffff',
              fontSize: this.fontSize(0.1)
            }
          },
          axisLine: {
            lineStyle: {
              color: '#058ddb',
              fontSize: this.fontSize(0.08)
            },
            show: false
          },
          axisTick: {
            show: false
          },
          type: 'category',
          data: this.stageyAxis,
        },
        series: data
      };
      this.myChart.setOption(option);

      window.addEventListener("resize", () => {
        if (this.myChart != null) { // 如果不存在，就进行初始化
          this.myChart.resize();
        }
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
    if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
      this.myChart.dispose() // 销毁
    }
    this.rankBar = this.$refs.rankBar;
    this.myChart = this.$echarts.init(this.rankBar)
    this.drawBarChart()
  },
  watch: {
    stageSdata() {
      this.drawBarChart()
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.myChart.resize();
    });

    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
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