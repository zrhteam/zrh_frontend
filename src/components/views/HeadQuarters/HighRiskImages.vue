<template>
  <el-card class="box-card boundary-C" shadow="never"
           style="background-color: transparent; height: 90%; left: 10%; top: 10%">
    <div class="level4" style="padding-top: 15px; padding-bottom: 15px">
      <span>所有项目未整改高风险隐患图片</span>
      <div style="display: none">
        {{ getImage }}
      </div>
    </div>
    <div
          style="color: rgb(247, 10, 10); font-family: Avenir; font-weight: bold; font-style: normal; line-height: normal; font-size: 52px;">
        <!--              图片播放-->

        <el-carousel indicator-position="none" :interval="3000">
          <el-carousel-item v-for="item in img_list">
            <img :src="item.url" alt/>
          </el-carousel-item>
        </el-carousel>
      </div>
<!--    <div>-->
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          <div class="grid-content bg-purple">-->
<!--            <div class="demo-image__placeholder">-->
<!--              <div class="block">-->
<!--                <img src="images0" id="img0" style="width: 100%; height: 100%"/>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash;                  <div class="login-center-img"><img src="images0"/></div>&ndash;&gt;-->
<!--          </div>-->
<!--        </el-col>-->
<!--&lt;!&ndash;        <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="grid-content bg-purple-light">&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash;                  图片2&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="demo-image__placeholder">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="block">&ndash;&gt;-->
<!--&lt;!&ndash;                <img src="images1" id="img1" style="width: 100%; height: 100%"/>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash;                  <div class="login-center-img"><img src="images1" id="img1"/></div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-col>&ndash;&gt;-->
<!--      </el-row>-->
<!--    </div>-->
  </el-card>
</template>

<script>
export default {
  name: "HighRiskImages",
  data() {
    return {
      images0: '',
      images1: '',
      tableData: [],
      timer: '',
      img_list:[]
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTable, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    getImage() {
      let data = this.$store.state.get_headquarter.images;
      console.log("kan", data)
      // let count = 0
      // for (let i in data) {
      //   for (let j in data[i]) {
      //     if (count >= 2) {
      //       break
      //     }
      //     if (count == 0) {
      //       document.getElementById('img0').src = 'http://' + data[i][j]
      //       // this.images0 = 'http://' + data[i][j]
      //     }
      //     if (count == 1) {
      //       document.getElementById('img1').src = 'http://' + data[i][j]
      //       // this.images1 = 'http://' + data[i][j]
      //     }
      //     count++
      //   }
      // }
      for (let i in data) {
        let obj = {
          url: ''
        }
        obj.url = 'http://' + data[i]
        this.img_list.push(obj)
      }
      console.log(this.img_list)
      console.log(this.images0)
    },
    //得到所有项目中出现隐患数量排名前10的隐患
    getNumberTop() {
      let data = this.$store.state.get_headquarter.hidden_danger;
      console.log(this.$store.state.get_headquarter.hidden_danger)
      console.log(data)
      //  风险等级对应情况
      //  1：低风险； 2：中风险； 3：高风险
      let dataArray = []
      for (let i in data) {
        let obj = {
          description: ''
        }
        obj.description = i
        dataArray.push(obj)
      }
      console.log(dataArray)
      this.tableData = dataArray
    }
  },
  methods: {
    updateTable() {
      let first = this.tableData[0];
      this.tableData.shift();
      this.tableData.push(first);
    },
  }
}
</script>

<style scoped>

</style>