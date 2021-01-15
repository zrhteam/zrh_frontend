<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 90%; left: 10%; top: 10%">
    <div class="level4" style = 'text-align: left; padding-top: 15px; padding-bottom: 10px'>
      <span>所有项目累计发现隐患专业分布</span>
    </div>
<!--    <div>-->
<!--      <checkbox></checkbox>-->
<!--    </div>-->
    <div>
      <div style="display: none; text-align: center">
        {{getRiskDistribution}}
      </div>
      <div id = 'risk_distribution' style = 'height: 290px; width: 100%; '></div>
    </div>
<!--      &lt;!&ndash;              在这里展示三维图&ndash;&gt;-->
<!--      <div>-->
<!--&lt;!&ndash;        <RiskDistribution></RiskDistribution>&ndash;&gt;-->
<!--      </div>-->
  </el-card>
</template>

<script>
//import RiskDistribution from "@/components/views/functions/RiskDistribution.vue";

import checkbox from "@/components/views/functions/checkbox.vue";
export default {
  name: "Region2_3",
  components: {checkbox},
  computed: {
    getRiskDistribution() {
      let data = this.$store.state.get_region.risk_distribution;
      console.log("major_region", data)
      let xdata = [];
      for( let i in data){
        xdata.push(i)
      }
      //let ydata = [];

      let series = [];
      for (let i = 1; i < 4; i++){
        let dataset = this.generateData(data, i);
        if(i == 1){
          series.push({
            name: '低风险',
            type: 'bar3D',
            data: dataset.map(function (item){
              return{
                value: [item[0], item[1], item[2]]
              }
            }),
            stack: 'stack',
            shading: 'lambert',
            label:{
              textStyle:{
                fontsize: 12,
                borderWidth: 1,
                color: '#900'
              }
            },
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 16,
                  color: '#900'
                }
              }
            }
          });
        }//if
        if(i == 2){
          series.push({
            name: '中风险',
            type: 'bar3D',
            data: dataset.map(function (item){
              return{
                value: [item[0], item[1], item[2]]
              }
            }),
            stack: 'stack',
            shading: 'lambert',
            label:{
              textStyle:{
                fontsize: 12,
                borderWidth: 1,
                color: '#F8F6F6'
              }
            },
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 16,
                  color: '#900'
                }
              }
            }
          });
        }
        if(i == 3){
          series.push({
            name: '高风险',
            type: 'bar3D',
            data: dataset.map(function (item){
              return{
                value: [item[0], item[1], item[2]]
              }
            }),
            stack: 'stack',
            shading: 'lambert',
            label:{
              textStyle:{
                fontsize: 12,
                borderWidth: 1,
                color: '#f8f6f8'
              }
            },
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 16,
                  color: '#900'
                }
              }
            }
          });
        }
      }


      let option = {

        legend: {
          data: ['低风险', '中风险', '高风险'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis3D: {
          type: 'category',
          data: xdata,
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 6
            }
          }
        },
        yAxis3D: {
          type: 'category',
          data: ['消防专业', '电梯专业', '电气专业', '燃气专业', '其他专业','在建专业'],
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 6
            }
          }
        },
        zAxis3D: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              fontSize: 8
            }
          }
        },
        grid3D: {
          viewControl: {
            // autoRotate: true
          },
          light: {
            main: {
              shadow: true,
              quality: 'ultra',
              intensity: 1.5
            }
          }
        },
        series: series
      };
      return option
    }

  },
  methods: {
    draw3D() {
      let myChart = this.$echarts.init(document.getElementById('risk_distribution'))
      myChart.setOption(this.getRiskDistribution);
      myChart.resize();
      window.addEventListener('resize', function () {
        myChart.resize();
      })
    },
    generateData(data, level){
      let arr = [];
      for (let i in data) {
        for (let j in data[i]['major']){
          arr.push([i, j, data[i]['risk_level'][level]])
        }//for j
      }//for i
      console.log('the distribution:', arr)
      return arr;
    },

  },
  mounted() {
    this.draw3D();
  },
  updated() {
    this.draw3D();
  }
}
</script>

<style scoped>

</style>