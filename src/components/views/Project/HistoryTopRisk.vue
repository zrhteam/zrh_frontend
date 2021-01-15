<template>
  <el-card class="box-card " shadow="never"
                 style="background-color: transparent; height: 49%; margin: 0px 5px 5px 5px">
    <div style="display: none">
      {{ getPrjRiskTop }}
    </div>
    <div class="level4" style="padding-top: 0px; padding-bottom: 10px; padding-left: 10px">
      <span>历次重复出现隐患前五名</span>
    </div>
    <div>

      <el-table
          :header-cell-style="{color: '#fff'}"
          :data="riskTop"
          :row-style="{height: '20px'}"
          :cell-style="{padding: '0px'}"
          style="width: 100%; height: 100%; color: #fff">
        <el-table-column
            label="序号" type = 'index'>
<!--            type="index">-->
<!--          <span>{{scope.$index}} </span>-->
        </el-table-column>
        <el-table-column
            property="description"
            label="隐患描述" width="100%">
        </el-table-column>
        <el-table-column
            prop="major"
            label="所属专业">
        </el-table-column>
        <el-table-column
            prop="frequency"
            label="出现频率">
        </el-table-column>
      </el-table>
    </div>
<!--    <dv-scroll-board :config="config" style="width: 100%; height: 100%"/>-->
  </el-card>
</template>

<script>
export default {
  name: "HistoryTopRisk",
  // header: ['隐患描述', '所属专业', '出现频率'],
  // props: ['getPrjRiskTop'],
  data() {
    return {
      riskTop: [],
      timer: ''
      // config: {
      //   header: ['隐患描述', '所属专业', '出现频率'],
      //   index: true,
      //   headerBGC: '#5aebeb',
      //   // waitTime: 2000,
      //   align: ['center'],
      //   headerHeight: 12,
      //   data: []
      // },
    }
  },
  // mounted() {
  //   this.config = {
  //     data: this.data,
  //     header: this.header,
  //     rowNum: 6,
  //     index: true,
  //     columnWidth: [50],
  //     align: ['center'],
  //     waitTime: 2000
  //   }
  // }
  computed: {
    getPrjRiskTop() {
      let data = this.$store.state.get_project.prj_risk_top;
      console.log(this.$store.state.get_project.prj_risk_top)
      console.log(data)
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: '隐患描述',
          major: '所属专业',
          frequency: 0
        }
        obj.description = i
        obj.major = data[i].belonged_major
        obj.frequency = data[i].appear_time
        dataArray.push(obj)
      }
      dataArray.sort(this.sortNumber('frequency', false))
      this.riskTop = dataArray
      // console.log(dataArray)
      //this.config = dataArray
      // let nowData = this.config
      // nowData = {data: dataArray}
      // this.config = {...nowData}
      // this.config = {data: dataArray, header: ['隐患描述', '所属专业', '出现频率'], index: true, align: ['center']}

    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  methods: {
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
    },
    updateTable(){
      let first = this.riskTop[0];
      this.riskTop.shift();
      this.riskTop.push(first);
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
  }
}
</script>

<!--<style lang="less" scoped>-->
<style  scoped>
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{

  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {

  background-color: transparent;
}

/*//.dv-scroll-board {*/
/*//  color: #3c3f52;*/
/*//  /deep/ .header-item{*/
/*//    font-size: 1em;*/
/*//    text-align: center;*/
/*//    white-space: nowrap;*/
/*//  }*/
/*//  .rows{*/
/*//    .row-item{*/
/*//      text-align: center;*/
/*//      line-height: 2rem;*/
/*//      .ceil{*/
/*//        color: #3c3f52;*/
/*//        font-size: 1em;*/
/*//        i{*/
/*//          font-size: 0.5em;*/
/*//        }*/
/*//      }*/
/*//      .ceil:nth-child(2){*/
/*//        color: #eb5a6d !important;*/
/*//        font-size: 1.1em;*/
/*//        width: 25%;*/
/*//      }*/
/*//    }*/
/*//  }*/
/*//}*/
/*.l-content {*/
/*  .dv-scroll-board{*/
/*    color: #3c3f52;*/
/*    .header{*/
/*      font-size: 1em;*/
/*      color: #91a0b9;*/
/*      text-align: center;*/
/*      white-space: nowrap;*/
/*    }*/
/*    .rows{*/
/*      .row-item{*/
/*        text-align: center;*/
/*        .ceil{*/
/*          color: #3c3f52;*/
/*          font-size: 1em;*/
/*          i{*/
/*            font-size: 0.5em;*/
/*            color: #7cb9ff;*/
/*          }*/
/*        }*/
/*        .ceil:nth-child(1){*/
/*            color: #7cb9ff;*/
/*            fontsize: 1.1em;*/
/*            width: 25%;*/
/*        }*/
/*      }*/
/*    }*/
/*  }*/
/*}*/

</style>