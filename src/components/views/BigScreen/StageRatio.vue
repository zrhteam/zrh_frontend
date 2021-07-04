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
      pie_data: []
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
          formatter: null,
          textStyle: {
            color: '#ffffff',
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
            radius: ['45%', '70%'],
            center: ['50%', '45%'],
            roseType: 'area',
            label: {
              color: '#fff',
              formatter: '{d}% '
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

      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  },
  mounted() {
    this.rosePie = this.$refs.rosePie;
    this.myChart = this.$echarts.init(this.rosePie)

    this.drawBarChart()

    setInterval(() => {
      var option1 = this.myChart.getOption();
      this.myChart.clear();
      this.myChart.setOption(option1);

      this.rosePie = this.$refs.rosePie;
      this.myChart = this.$echarts.init(this.rosePie)
    }, 10000);
  },
  watch: {
    renderSign() {
      this.drawBarChart()
    }
  },
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