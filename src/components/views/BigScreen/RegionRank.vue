<template>
  <div>
    <div class="absolute-layer" style="width: 4.7rem; height: 0.45rem; left: 0px; top: 0px;">
      <div class="box1" style="width: 4.7rem; height: 0.45rem;">
      </div>
    </div>
    <div class="absolute-layer" style="width: 3.75rem; height: 0.7rem; left: 0.61rem; top: -0.1rem;">
      <div class="card-title" style="width: 3.75rem; height: 0.7rem; font-size: 0.2rem;">
        累计高风险数量区域排名
      </div>
    </div>
    <div class="absolute-layer" style="width: 93%; height: 80%; left: 0.06rem; top: 0.61rem;">
      <div class="box2" style="width: 100%; height: 100%;">
        <div ref='rankBar' style="height: 100%; width: 100%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "RegionRank",
  props: {
    regionData: {
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
    }
  },
  methods: {
    doResize() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    drawBarChart() {
      let arr = this.regionData
      let data = []
      let titlename = []
      let max = 0
      let max_arr = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].count > max) {
          max = arr[i].count
        }
        data.push(arr[i].count)
        titlename.push(arr[i].name)
      }
      for (let i = 0; i < arr.length; i++) {
        max_arr.push(max)
      }
      // if (data.length != 0) {
      // this.renderSign = true
      let bar_option3 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter(param) {
            return param[0].name + ":" + param[0].data
          }
        },
        grid: {
          left: this.fontSize(0.25),
          top: this.fontSize(0.25),
          right: this.fontSize(0.25),
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          data: titlename,
          axisLine: {
            lineStyle: {
              color: '#058ddb',
              fontSize: this.fontSize(0.08)
            },
            show: false
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize(0.10),
              color: '#ffffff'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },

        series: [{
          type: 'bar',
          barMaxWidth: 8,
          // barMaxWidth: this.fontSize(0.08),
          itemStyle: {
            barBorderRadius: 10,
            color: '#0a73ff'
          },
          label: {
            show: true,
            formatter: (a) => {
              return a.count
            },
            fontSize: this.fontSize(0.10)
          },
          data: data
        }, {
          type: 'bar',
          barGap: '-100%',
          barMaxWidth: 8,
          // barMaxWidth: this.fontSize(0.08),
          itemStyle: {
            color: 'none',
            borderColor: '#272020',
            capacity: 0.1,
            barBorderRadius: 10,
          },
          z: -12,
          data: max_arr
        }]
      };

      this.myChart.setOption(bar_option3);

      window.addEventListener("resize", this.doResize);
      // } else if (data.length == 0) {
      //   this.$nextTick(_ => {
      //     this.rankBar.innerHTML = '暂无数据'
      //     this.rankBar.style.color = '#ffffff'
      //     this.rankBar.style.fontSize = '14px'
      //     this.rankBar.removeAttribute("_echarts_instance_")
      //   })
      // }
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
    if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
      this.myChart.dispose() // 销毁
    }
    this.rankBar = this.$refs.rankBar;
    this.myChart = this.$echarts.init(this.rankBar)
    // this.drawBarChart()
  },
  watch: {
    regionData() {
      this.drawBarChart()
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.doResize);

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
