<template>
  <div class="echarts">

  </div>
</template>
<script>
export default {
  name: "echarts",
  props: ["userJson"],
  data() {
    return {
      chart: null
    };
  },
  created() {
    let param = new URLSearchParams();
    param.append('check_key', 'ZRH(ZB)-2007-L01-A04-000-15');
    param.append('flag', '3');
    param.append('start', '2000-1-3 00:00:00');
    param.append('end', '2022-1-3 00:00:00');
    this.$store.commit('get_insight/changeParams', {params: param})
    this.$store.dispatch('get_insight/getAnalyzeRedlineData')
    this.$store.dispatch('get_insight/getAnalyzeTendencyHeadquarter')
    this.$store.dispatch('get_insight/getAnalyzeTendencyRegion')
    this.$store.dispatch('get_insight/getAnalyzeTendencyProject')
    this.$store.dispatch('get_insight/getAnalyzeTendencyProfession')
    this.$store.dispatch('get_insight/getAnalyzeRatioHeadquarter')
    this.$store.dispatch('get_insight/getAnalyzeRatioRegion')
    this.$store.dispatch('get_insight/getAnalyzeRatioProject')
    this.$store.dispatch('get_insight/getAnalyzeRatioProfession')
  }
}
</script>
<!--<template>-->
<!--    <model-obj src="example/models/obj/LeePerrySmith.obj"></model-obj>-->
<!--</template>-->
<!--<script>-->
<!--    import { ModelObj } from 'vue-3d-model'-->

<!--    export default {-->
<!--        components: { ModelObj }-->
<!--    }-->


<!--<template>-->
<!--  <div style="height:100%;width:100%">-->
<!--    <div class="body" :style="view">-->
<!--      <div class="scroll-content" :style="{top}" >-->
<!--        <tr v-for="item in dutyRateData">-->
<!--          <td>{{item.group}}</td>-->
<!--          <td>{{item.bookNum}}</td>-->
<!--          <td>{{item.sceneNum}}</td>-->
<!--          <td>{{item.dutyRate}}</td>-->
<!--        </tr>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    viewHeight: {//可视窗口-->
<!--      type: [Number, String],-->
<!--      default: "200px"-->
<!--    },-->
<!--    // animationTime: {//移动间隔-->
<!--    //   type: [Number, String],-->
<!--    //   default: "0.825s"-->
<!--    // },-->
<!--    // direction:{//移动方向-->
<!--    //     type:String,-->
<!--    //     default:top,-->
<!--    // },-->
<!--    moveDistance:{//移动距离-->
<!--        type:Number,-->
<!--        default:25-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      dutyRateData: [-->
<!--        { group: "电工班1", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班2", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班3", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班4", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班5", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班6", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班7", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班8", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班9", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班10", bookNum: 3, sceneNum: 0, dutyRate: "88%" },-->
<!--        { group: "电工班11", bookNum: 3, sceneNum: 0, dutyRate: "88%" }-->
<!--      ],-->
<!--      activeIndex: 0,-->
<!--      view:'',-->
<!--      count: 0,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->

<!--  },-->
<!--  computed: {-->
<!--    top() {-->
<!--      return -this.activeIndex * this.moveDistance + "px"; //定义移动的单元高度-->
<!--    },-->

<!--  },-->
<!--  mounted() {-->
<!--    this.view= {"height":this.viewHeight}-->
<!--    setInterval(_ => {-->
<!--      //自定义滚动 出勤率-->
<!--      // if ( this.activeIndex < this.dutyRateData.length /* this.towerListArr.length */) {-->
<!--        this.activeIndex += 1;-->
<!--      // } else {-->
<!--      //   this.activeIndex = 0;-->
<!--      // }-->
<!--      // if(this.activeIndex % 25 == 0) {-->
<!--        let temp = this.dutyRateData[this.count%this.dutyRateData.length];-->
<!--        this.dutyRateData.push(temp)-->
<!--      this.count++;-->
<!--      // }-->
<!--    }, 500);-->
<!--    // setInterval(_ => {-->
<!--      //自定义滚动 出勤率-->
<!--      // if ( this.activeIndex < this.dutyRateData.length /* this.towerListArr.length */) {-->
<!--      // } else {-->
<!--      //   this.activeIndex = 0;-->
<!--      // }-->
<!--      // if(this.activeIndex % 25 == 0) {-->
<!--      // this.dutyRateData.shift()-->
<!--      // }-->
<!--    // }, 500);-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style scoped>-->
<!--.scroll-content {-->
<!--  /*//自定义滚动 间隔时间和方向*/-->
<!--  position: relative;-->
<!--  transition: top 0.825s; /*//向上移动*/-->
<!--}-->
<!--.body {-->
<!--  width: 100%;-->
<!--  height: 100px;-->
<!--  overflow-y: hidden;-->
<!--  /*//   position: absolute;*/-->
<!--}-->
<!--</style>-->
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