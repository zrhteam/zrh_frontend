<template>
  <!--每个项目历次检查的指数，放到项目级默认下的地图下面-->
  <el-card class="box-card boundary-B" shadow="never"
           style="background-color: transparent; height: 19%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getPrjIndex }}
    </div>
    <div class="level4">
      <span>历次检查危险指数</span>
    </div>
    <div id="index_chart" style="height: 100%; width: 100%; display: block"></div>
  </el-card>
</template>

<script>
export default {
  name: "PrjIndex",
  computed: {
    getPrjIndex() {
      //历次检查的指数
      let tree_data = this.$store.state.get_login.grant_data.data.value
      let arr = []
      let obj = {
        // check_node: '',
        // index: 0
        name: '',
        count: 0
      };
      for (let i in tree_data['headquarter_tag']) {
        for (let j in tree_data['headquarter_tag'][i]['region_tag']) {
          for (let k in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag']) {
            for (let l in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k]) {
              for (let m in tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l]) {
                obj['name'] = m;
                obj['count'] = tree_data['headquarter_tag'][i]['region_tag'][j]['project_tag'][k][l][m].index
                arr.push(obj)
              }
            }
          }
        }
      }
      console.log("Index_arr", arr)
      return arr
    },
  }
  ,
  updated() {
    this.drawBarChart()
  }
  ,
  mounted() {
    this.drawBarChart();
  }
  ,
  methods: {
    drawBarChart() {
      // document.getElementById('history_chart').innerHTML = ''
      let myChart = this.$echarts.init(document.getElementById('index_chart'))
      // 使用刚指定的配置项和数据显示图表。
      let arr = this.getPrjIndex
      if (arr.length) {
        let option = {
          tooltip: {},
          dataset: {
            dimensions: ['name', 'count'],
            source: arr
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              show: true,
              // inside: true,
              interval: 0,
              rotate: 0,
              textStyle: {
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff',
                fontSize: 8
              }
            }
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitNumber: 3
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  //柱形图圆角，初始化效果
                  barBorderRadius: [10, 10, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#77b5b8'},
                        // {offset: 0.5, color: '#1f77a0'},
                        {offset: 1, color: '#107480'}
                      ]
                  )
                }
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                      ]
                  )
                }
              },
              barMaxWidth: 20
            }
          ]
        };
        myChart.setOption(option);
      } else {
        // document.getElementById('history_chart').innerHTML = ''
        // document.getElementById('history_chart').innerHTML = '<div style="color: #909399; text-align: center; vertical-align: center">暂无数据</div>'
      }
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    },
    sortNumber(attr, rev) {
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    }
  }
}
</script>

<style scoped>

</style>