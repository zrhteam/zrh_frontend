<template>
  <div>
    <div class="absolute" style="width: 4.75rem; height: 60%; left: 0.5rem; top: 0px;">
      <div
          style="width: 4.75rem; height: 100%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.375rem; top: 0.2rem;">
        <div class="level2">{{ majorName }}发现隐患</div>
        <div class="counter-container">
          <!--            写一个循环的number-->
          <div id="number" style="font-size: 0.45rem">
          </div>
          <span class="suffix" style="font-size: 0.30rem">例</span>
        </div>
      </div>
    </div>
    <div class="absolute"
         style="width: 1.15rem; height: 40%; left: 0.5rem; top: 1.3rem">
      <div class="risk-title">
        高风险
      </div>
      <div class="counter-container">
              <span class="numbers" style="color:rgb(255, 10, 10); font-size: 0.32rem">
                <NumCounter :value=this.high_risk class="text-color-blue nums"></NumCounter>
              </span>
        <span class="suffix" style="font-size: 0.2rem">例</span>
      </div>
    </div>
    <div class="absolute"
         style="width: 1.15rem; height: 40%; left: 3.8rem; top: 1.3rem">
      <div class="risk-title">
        中风险
      </div>
      <div class="counter-container">
              <span class="numbers" style="color:rgb(255, 139, 0); font-size: 0.32rem">
                <NumCounter :value=this.mid_risk class="text-color-blue nums"
                            style="color: rgb(255, 139, 0)"></NumCounter>
              </span>
        <span class="suffix" style="font-size: 0.2rem">例</span>
      </div>
    </div>
    <div class="absolute"
         style="width: 1.15rem; height: 40%; left: 6.9rem; top: 1.3rem">
      <div class="risk-title">
        低风险
      </div>
      <div class="counter-container">
              <span class="numbers" style="color: rgb(10, 166, 255); font-size: 0.32rem">
                <NumCounter :value=this.low_risk class="text-color-blue nums"></NumCounter>
              </span>
        <span class="suffix" style="font-size: 0.2rem">例</span>
      </div>
    </div>
    <div class="absolute" style="width: 97%; height: 69%; left: 0.12rem; top: 2.2rem;">
      <div
          style="width: 100%; height: 100%; pointer-events: auto; z-index: -1; background-image: url(require('../../../assets/major_card4.png'))'; border-radius: 0px; cursor: pointer; background-repeat: no-repeat; background-size: 100% 100%;"></div>
      <div class="slide">
        <div class="slide-wrapper" ref="major">
          <el-carousel indicator-position="none" :interval="200000" :height="dataHeight">
            <el-carousel-item v-for='item in image_list' :key="item.url">
              <div style="height: 100%">
                <div
                    style="position: absolute; width: 100%; min-height: 20px; top:0px;font-size: 8px; color: #ffffff; padding: 0; overflow: hidden; z-index: 3; background-color: rgba(33, 32, 30, 0.5);">
                  {{ item.note }}
                </div>
                <el-image :src='item.url' alt style="height: 100%"/>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumCounter from "@/components/views/BigScreen/NumCounter.vue";

export default {
  name: "OneMajorRisk",
  components: {NumCounter},
  props: {
    majorName: {
      type: String,
      default: function () {
        return ""
      }
    },
    OneMajorRiskData: {
      type: Object,
      default: function () {
        return ""
      }
    },
    dataHeight: {
      type: String,
      default: '5rem'
    },
  },
  data() {
    return {
      timer: null,
      high_risk: 0,
      mid_risk: 0,
      low_risk: 0,
      num_flag: false,
      image_list: []
    }
  },
  watch: {
    OneMajorRiskData() {
      this.getNumber(this.OneMajorRiskData.risk_num)
      this.high_risk = this.OneMajorRiskData.risk_level_ratio['3']
      this.mid_risk = this.OneMajorRiskData.risk_level_ratio['2']
      this.low_risk = this.OneMajorRiskData.risk_level_ratio['1']
      if (this.OneMajorRiskData.image_list.length == 0) {
        this.$nextTick(_ => {
          this.$refs.major.innerHTML = '暂无数据'
        })
      }
      let data = this.OneMajorRiskData.image_list
      for (let i in data) {
        let obj = {
          url: '',
          note: ''
        }
        obj['url'] = 'http://' + data[i]['image_url']
        obj['note'] = data[i]['note']
        this.image_list.push(obj)
      }
    }
  },
  methods: {
    getNumber(num) {
      if (this.num_flag == false) {
        //自定义字符串,用于拼接标签
        var numStr = "";
        //自定义数组
        var numArr = [];
        var num_copy = num
        if (typeof (num) == "number") {
          this.num_flag = true
          while (num_copy / 10) {
            numArr.unshift(num_copy % 10)
            num_copy = Math.floor(num_copy / 10)
          }
          /****forEach循环****/
          numArr.forEach(e => {
            numStr += `<span class="number">${e}</span>`;
          })
          this.timer = setTimeout(() => {
            this.$nextTick(_ => {
              //拼接完字符串数组后用innerHTML把它渲染到页面中
              document.getElementById("number").innerHTML = numStr
              let numbers = document.getElementsByClassName("number")
              if (numbers) {
                for (let i = 0; i < numbers.length; i++) {
                  let number = numbers[i]
                  number.style.backgroundColor = '#ff6300'
                  number.style.display = 'inline-block'
                  number.style.fontWeight = 'bolder'
                  number.style.marginRight = '0.15rem'
                  number.style.borderRadius = '6px'
                }
              }
            })
          }, 200);
        }
      }
    },
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
.absolute {
  position: absolute !important;
  margin: 0 !important;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
}

.level2 {
  font-family: "Microsoft YaHei";
  font-style: normal;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  color: #ffffff;
  font-size: 0.30rem;
  display: flex;
  align-items: center;
  font-weight: normal;
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
  color: #ffffff;
  text-align: center;
  white-space: nowrap;
  justify-content: flex-start;
  font-family: "Microsoft Yahei";
  width: 4.75rem;
  height: 0.375rem;
  background-color: rgba(0, 0, 0, 0);
}

.number {
  background-color: #ff6300;
  display: inline-block;
  letter-spacing: 0.02em;
  text-indent: 0.02em;
  height: auto;
  line-height: normal;
  font-weight: bolder;
  margin-right: 0.10em;
  border-radius: 6px;
}

.suffix {
  content: '例';
  color: #ffffff;
  font-weight: normal;
  vertical-align: super;
  font-family: Microsoft Yahei
}

.risk-title {
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 0.20rem;
  font-weight: normal;
  font-family: "Microsoft YaHei";
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: normal;
  margin: 0px;
  justify-content: flex-start;
  width: 100%;
}

.slide {
  position: absolute;
  width: 96%;
  height: 100%;
  z-index: 0;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  left: 0.2rem;
  top: 0.2rem;
}

.slide-wrapper {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  font-size: 12px;
  font-family: "Microsoft Yahei";
  color: rgb(255, 255, 255);
  cursor: pointer;
}

</style>
