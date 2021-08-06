<template>
  <div>
    <div class="projectCost">
      <div class="container">
        <div class="wrapper" v-for="(item,index) in list" :key="index">
          <div class="roseChart"></div>
        </div>
      </div>
    </div>
    <div style="position: relative; width: 100px; height: 200px; left: 500px; overflow: hidden">
      <div class="element1">
        <div class="front">
          123
          <div class="table-bar">
            <div class="light"></div>
          </div>
        </div>
        <div class="back">
          456
          <div class="table-bar">
            <div class="light"></div>
          </div>
        </div>
      </div>
      <div class="element2">
        <div class="front">
          123
          <div class="table-bar">
            <div class="light"></div>
          </div>
        </div>
        <div class="back">
          456
          <div class="table-bar">
            <div class="light"></div>
          </div>
        </div>
      </div>
    </div>

    <button class="btn" @click="Click">点击切换</button>
  </div>
</template>
<script>
export default {
  name: "echarts",
  data() {
    return {
      list: [ // 假数据
        {
          id: 1,
          price: {
            name: '项目一',
            resData: [
              {name: '订购费用', value: 12},
              {name: '饲养费用', value: 18},
              {name: '实验费用', value: 8},
              {name: '其他费用', value: 10},
            ]
          }
        }, {
          id: 2,
          price: {
            name: '项目二',
            resData: [
              {name: '订购费用', value: 18},
              {name: '饲养费用', value: 10},
              {name: '实验费用', value: 20},
              {name: '其他费用', value: 9},
            ]
          }
        }
      ]
    }
  },
  methods: {
    drawRose() {
      var echarts = require("echarts");
      var roseCharts = document.getElementsByClassName('roseChart'); // 对应地使用ByClassName
      for (var i = 0; i < roseCharts.length; i++) { // 通过for循环，在相同class的dom内绘制元素
        var myChart = echarts.init(roseCharts[i]);
        myChart.setOption({
          color: ["#4DFFFD", "#7B3FF6", "#1F6DFE", "#34A6FE"],
          title: {
            text: this.list[i].price.name,
            left: '70',
            top: 5,
            textStyle: {
              color: '#4DFFFD',
              fontSize: 14,
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            type: "scroll",
            orient: "vartical",
            top: "center",
            right: '0px',
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 16,
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },
            data: ['订购费用', '饲养费用', '实验费用', '其他费用']
          },
          polar: {
            center: ['36%', '56%'],
          },
          angleAxis: {
            interval: 3, // 强制设置坐标轴分割间隔
            type: 'category',
            z: 10,
            axisLine: {show: false},
            axisLabel: {show: false},
          },
          radiusAxis: {
            min: 10,
            max: 1000,
            interval: 200,
            axisLine: {show: false},
            axisLabel: {show: false},
            splitLine: {
              lineStyle: {
                color: "#2277C3",
                width: 1,
                type: "solid"
              }
            }
          },
          calculable: true,
          series: [
            {
              type: 'pie',
              radius: ["10%", "14%"],
              center: ['36%', '56%'],
              hoverAnimation: false,
              labelLine: {show: false},
              data: [{
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#809DF5"
                  }
                }
              }]
            }, {
              stack: 'a',
              type: 'pie',
              radius: ['20%', '80%'],
              center: ['36%', '56%'],
              roseType: 'area',
              zlevel: 10,
              label: {show: false},
              labelLine: {show: false},
              data: this.list[i].price.resData // 渲染每个图表对应的数据
            }]
        })
      }
    },
    Click() {
      $(".element1").css("transform", "translateX(100%)")
      setTimeout(() => {
        $(".element2").css("transform", "translateX(100%)")
      }, 2000)
      // $(".element")[0].style.transform = rotateX(360deg)
    }
  },
  mounted() {
    this.drawRose()
  }
}
</script>
<style scoped>
/*.scroll-content {*/
/*  !/自定义滚动 间隔时间和方向*!*!*/
/*  position: relative;*/
/*  transition: top 0.825s; !/向上移动*!*!*/
/*}*/
/*.body {*/
/*  width: 100%;*/
/*  height: 100px;*/
/*  overflow-y: hidden;*/
/*  !/   position: absolute;*!*!*/
/*}*/
.projectCost {
  margin-left: 40px;
}

.container {
  display: flex;
  width: 680px;
  height: 240px;
  background-size: 100% 100%;
  /*/ / background-image: url('../../../assets/images/projectTest/costDetail.png');*/
}

.wrapper {
  margin-top: 20px;
  width: 340px;
  height: 180px;
  border-right: 1px solid #0B61B3;
}

.roseChart {
  width: 260px;
  height: 180px;
}

* {
  margin: 0;
  padding: 0;
}

.element1, .element2 {
  position: absolute;
  color: #fff;
  text-align: center;
  line-height: 120px;
  transform-style: preserve-3d;
  transition: 1s;
}

.element2 {
  position: absolute;
  left: -90px
}

.element1, .element2, .front, .back {
  width: 90px;
  height: 120px;
  backface-visibility: hidden;
}

.front, .back {
  position: absolute;
  left: 0;
  top: 0;
}

.front {
  background: #f00;
}

.back {
  background: #0f0;
  transform: rotateY(180deg);
}

.ele {
  transform: rotateX(180deg);
}
</style>
<!--<template>-->
<!--  <SubRegister :value="100" class="text-color-blue nums"-->
<!--  ></SubRegister>-->
<!--</template>-->

<!--<script>-->
<!--import SubRegister from "@/components/views/SubRegister.vue";-->

<!--export default {-->
<!--  components: {SubRegister},-->
<!--}-->
<!--</script>-->