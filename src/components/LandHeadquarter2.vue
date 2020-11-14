<template>
  <el-row style="margin-bottom: 100px">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple" >
          <div style="margin-left: 80px">
            <span>项目综合&专业风险指数排名</span>
          </div>
          <div>
            <div id="mydiv1" style="font-color: black">
<!--              <svg>-->
<!--                <rect></rect>-->
<!--              </svg>-->
              <IndexHistogram></IndexHistogram>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div>
            <span>项目高风险数量排名</span>
          </div>
          <div>
            <div id="mydiv2">
<!--              <svg>-->
<!--                <rect></rect>-->
<!--              </svg>-->
              <NumberHistogram></NumberHistogram>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import IndexHistogram from "@/components/IndexHistogram.vue";
import NumberHistogram from "@/components/NumberHistogram.vue";
import * as d3 from "d3";

export default {
  name: "LandHeadquarter2",
  components: {IndexHistogram, NumberHistogram},
  data() {
    return{

    }
  },
  created() {
    // this.getlinear();
  },
  methods: {
    //   test(d, i) {
    //     this.$alert(d, i, {
    //       confirmButtonText: '确定',
    //       callback: action => {
    //         this.$message({
    //           type: 'info',
    //           message: `action: ${ action }`
    //         });
    //       }
    //     });
    //   }
    }

}
</script>

<style scoped>
.grid-content{
  text-align: left;
}
</style>