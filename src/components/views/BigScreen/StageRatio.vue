<template>
  <div>
    <div class="title">
      <div class="title-wrapper">现场各类型隐患实施占比情况{{ getRoseData }}</div>
    </div>
    <div class="rosePie" ref='rosePie' style="height: 80%; width: 100%;"></div>
  </div>
</template>

<script>

export default {
  name: "StageRatio",
  props: ['context'],
  data() {
    return {
      rosePie: null,
      myChart: null,
      renderSign: false,
      pie_data: [],
      timer: null
    }
  },
  computed: {
    getRoseData() {
      let data
      if (this.context.sign == 'project-stage') {
        data = this.$store.state.get_screen.projects_stage_ratio
      } else if (this.context.sign == 'check-stage') {
        data = this.$store.state.get_screen.checks_stage_ratio
      }
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
      this.pie_data = arr
      this.renderSign = !this.renderSign
    }
  },
  methods: {
    drawBarChart() {
      let arr = this.pie_data
      let pie_option = {
        legend: {
          top: 'bottom',
          icon: 'circle',
          itemHeight: this.fontSize(0.10),
          itemGap: this.fontSize(0.10),
          formatter: null,
          textStyle: {
            color: '#ffffff',
            fontSize: this.fontSize(0.1),
          },
        },
        toolbox: {
          show: true,
        },
        tooltip: {
          formatter: '{d}%'
        },
        animation: true,
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: ['35%', '55%'],
            center: ['50%', '40%'],
            roseType: 'area',
            label: {
              color: '#fff',
              formatter: '{d}% '
            },
            labelLine: {
              normal: {
                length: 3
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
      }
      this.myChart.setOption(pie_option);

      window.addEventListener('resize', () => {
        if (this.myChart != null) {
          this.myChart.resize();
        }
      })
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
    this.rosePie = this.$refs.rosePie;
    this.myChart = this.$echarts.init(this.rosePie)

    this.drawBarChart()

    this.timer = setInterval(() => {
      var option1 = this.myChart.getOption();
      this.myChart = this.$echarts.getInstanceByDom(this.$refs.rosePie)
      if (this.myChart == null) { // 如果不存在，就进行初始化
        this.myChart = this.$echarts.init(this.rosePie)
      }
      this.myChart.setOption(option1);

      // this.rosePie = this.$refs.rosePie;
      // this.myChart = this.$echarts.init(this.rosePie)
    }, 10000);
  },
  watch: {
    renderSign() {
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
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  width: 100%;
  height: 0.5rem;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  left: 0.9rem;
  top: 0px;
}

.title-wrapper {
  width: 100%;
  height: 0.5rem;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 99, 0);
  font-weight: bold;
  font-family: "Microsoft Yahei";
  font-size: 0.2rem;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.rosePie {
  position: absolute;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  left: 0px;
  top: 0.5rem;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #303843;
}
</style>