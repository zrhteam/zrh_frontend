<template>
  <div>
    <div class="absolute-layer" style="width: 372px; height: 37px; left: 0px; top: 0px;">
      <div class="box1" style="width: 372px; height: 37px;">
      </div>
    </div>
    <div class="absolute-layer" style="width: 300px; height: 56px; left: 50px; top: -8px;">
      <div class="card-title" style="width: 300px; height: 56px; font-size: 0.2rem;">
        隐患数量
      </div>
    </div>
    <div class="absolute-layer" style="width: 300px; height: 73px; left: 10px; top: 45px;">
      <div class="sub-wrapper">
        <div class="title-container">截止目前已发现隐患</div>
        <div class="counter-container">{{ risk_num }}</div>
      </div>
    </div>
    <div class="absolute-layer" style="width: 368px; height: 220px; left: 10px; top: 93px;">
      <div class="box2" style="width: 368px; height: 220px;">
        <div ref='dangerNumBar' style="height: 85%; width: 100%;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bar_option} from "@/utils/constants";
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
      renderSign: false,
      risk_num: 0
    }
  },
  methods: {
    drawBarChart() {
      let arr = this.dangerData.arr_num
      this.risk_num = this.dangerData.sum
      // this.renderSign = true
      bar_option["tooltip"] = {}
      bar_option["dataset"][0]["source"] = arr
      bar_option["yAxis"]["axisLine"]["show"] = false
      bar_option["yAxis"]["axisTick"] = false
      bar_option["yAxis"]["splitLine"] = false
      bar_option["yAxis"]["axisLabel"]["show"] = false
      bar_option["xAxis"]["axisTick"] = false
      bar_option["xAxis"]["axisLine"]["show"] = false
      bar_option["xAxis"]["axisLabel"]["textStyle"]["color"] = "#ffffff"
      bar_option["grid"] = {
        left: this.fontSize(0.65),
        top: this.fontSize(0.25),
        right: this.fontSize(0.85),
        bottom: this.fontSize(0.20),
        containLabel: true
      }
      bar_option["series"][0]["itemStyle"] = {
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
      }
      bar_option["series"][0]["label"] = {
        show: true,
        formatter: (a) => {
          return a.count
        },
      }
      bar_option["series"][0]["barMaxWidth"] = this.fontSize(0.3)
      bar_option["series"][0]["showBackground"] = true

      this.myChart.setOption(bar_option);
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
    this.dangerNumBar = this.$refs.dangerNumBar;
    this.myChart = this.$echarts.init(this.dangerNumBar)
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