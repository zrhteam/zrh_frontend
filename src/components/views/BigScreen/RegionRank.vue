<template>
  <div>
    <div class="absolute-layer" style="width: 372px; height: 37px; left: 0px; top: 0px;">
      <div class="box1" style="width: 372px; height: 37px;">
      </div>
    </div>
    <div class="absolute-layer" style="width: 300px; height: 56px; left: 50px; top: -8px;">
      <div class="card-title" style="width: 300px; height: 56px; font-size: 0.2rem;">
        累计高风险数量区域排名
      </div>
    </div>
    <div class="absolute-layer" style="width: 368px; height: 220px; left: 5px; top: 50px;">
      <div class="box2" style="width: 368px; height: 220px;">
        <div ref='rankBar' style="height: 85%; width: 100%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bar_option, bar_option3} from "@/utils/constants";
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
      renderSign: false,
    }
  },
  methods: {
    drawBarChart() {
      let arr = this.regionData
      this.renderSign = true
      bar_option3["dataset"]["source"] = arr
      bar_option3["yAxis"]["axisLabel"]["textStyle"]["color"] = '#ffffff'
      bar_option3["xAxis"]["axisLabel"] = {
        show: false
      }
      bar_option3["grid"] = {
        left: this.fontSize(0.25),
        top: this.fontSize(0.25),
        right: this.fontSize(0.25),
        bottom: this.fontSize(0.10),
        containLabel: true
      }
      bar_option3["series"][0]["itemStyle"] = {
        normal: {
          barBorderRadius: [4, 4, 4, 4],
          color: '#0a73ff'
        }
      }
      bar_option3["series"][0]["label"] = {
        show: true,
        formatter: (a) => {
          return a.count
        },
      }
      // bar_option3["series"][0]["showBackground"] = true
      this.myChart.setOption(bar_option3);
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
    this.rankBar = this.$refs.rankBar;
    this.myChart = this.$echarts.init(this.rankBar)
  },
  watch: {
    renderSign() {
      this.drawBarChart()
    }
  },
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