<template>
  <div>
    <div class="absolute" style="width: 4.75rem; height: 60%; left: 1.3rem; top: 0px;">
      <div
          style="width: 4.75rem; height: 100%; z-index: 0; transform: rotate(0deg); opacity: 1; pointer-events: none; left: 0.375rem; top: 0.2rem;">
        <div class="level2">截止目前已发现隐患</div>
        <div class="counter-container">
          <span class="prefix" style="font-size: 0.30rem">累计</span>
          <!--            写一个循环的number-->
          <div id="real-number" style="font-size: 0.45rem">
            {{ getNumber }}
          </div>
          <span class="suffix" style="font-size: 0.30rem">例</span>
        </div>
      </div>
    </div>
    <div class="absolute" style="width: 2.5rem; height: 1.0rem; left: 1.3rem; top: 1.2rem;">
      <div class="major-card" id="fire-major">
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.1rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%;">
            消防
          </div>
        </div>
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.4rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%; ">
            专业
          </div>
        </div>
        <div class="absolute"
            style="width: 1.15rem; height: 0.54rem; left: 0.9375rem; top: 0.325rem;">
          <div
              style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
                    <NumCounter :value=this.fire_num class="text-color-blue nums"></NumCounter>
                  </span>
            <span class="suffix" style="font-size: 0.2rem">例</span>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute" style="width: 2.5rem; height: 1.0rem; left: 4.1rem; top: 1.2rem;">
      <div class="major-card" id="lift-major">
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.1rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%;">
            电梯
          </div>
        </div>
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.4rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%;">
            专业
          </div>
        </div>
        <div class="absolute"
            style="width: 1.15rem; height: 0.54rem; left: 0.9375rem; top: 0.325rem;">
          <div
              style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
                    <NumCounter :value=this.lift_num class="text-color-blue nums"></NumCounter>
                  </span>
            <span class="suffix" style="font-size: 0.2rem">例</span>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute" style="width: 2.5rem; height: 1.0rem; left: 1.3rem; top: 2.4rem;">
      <div class="major-card" id="electric-major">
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.1rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%;">
            电气
          </div>
        </div>
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.4rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%;">
            专业
          </div>
        </div>
        <div class="absolute"
            style="width: 1.15rem; height: 0.54rem; left: 0.9375rem; top: 0.325rem;">
          <div
              style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
                    <NumCounter :value=this.electric_num class="text-color-blue nums"></NumCounter>
                  </span>
            <span class="suffix" style="font-size: 0.2rem">例</span>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute" style="width: 2.5rem; height: 1.0rem; left: 4.1rem; top: 2.4rem;">
      <div class="major-card" id="fuel-major">
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.1rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%; ">
            燃气
          </div>
        </div>
        <div class="absolute"
            style="width: 0.9rem; height: 50%; left: 0.1rem; top: 0.4rem;">
          <div class="risk-title"
               style="width: 0.9rem; height: 100%; ">
            专业
          </div>
        </div>
        <div class="absolute"
            style="width: 1.15rem; height: 0.54rem; left: 0.9375rem; top: 0.325rem;">
          <div
              style="display: flex; align-items: baseline; color: rgb(255, 255, 255); text-align: center; white-space: nowrap; justify-content: flex-end; width: 1.15rem; height: 0.5375rem; background-color: rgba(0, 0, 0, 0);">
                  <span class="numbers" style="font-size: 0.32rem; font-family: 'Microsoft YaHei'">
                    <NumCounter :value=this.fuel_num class="text-color-blue nums"></NumCounter>
                  </span>
            <span class="suffix" style="font-size: 0.2rem">例</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumCounter from "@/components/views/BigScreen/NumCounter.vue";
export default {
  name: "MajorRisk",
  components: {NumCounter},
  props: {
    majorType: {
      type: String,
      default: function () {
        return ""
      }
    },
    majorRiskData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      timer: null,
      num_flag: false,
      fire_num: 0,
      lift_num: 0,
      electric_num: 0,
      fuel_num: 0,
    }
  },
  watch: {
    majorType() {
      // document.getElementById(value).style.backgroundImage = "url('//datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/51e03f25363ef4f791943a5c383b29a0.png')";
      document.getElementById(this.majorType).style.backgroundImage = 'url(' + require('../../../assets/major_card5.png') + ')'
    },
    majorRiskData(value) {
      this.fire_num = value["消防专业"]
      this.lift_num = value["电梯专业"]
      this.electric_num = value["电气专业"]
      this.fuel_num = value["燃气专业"]
    }
  },
  computed: {
    getNumber() {
      var num = this.$store.state.get_screen.projectm_risk_num.risk_num
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
          this.timer = setInterval(() => {
            this.$nextTick(_ => {
              //拼接完字符串数组后用innerHTML把它渲染到页面中
              document.getElementById("real-number").innerHTML = numStr
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
    }
  },
  mounted() {
    this.$nextTick(_ => {
      document.getElementById(this.majorType).style.backgroundImage = 'url(' + require('../../../assets/major_card5.png') + ')'
      // document.getElementById(this.majorType).style.backgroundImage = "url('//datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/51e03f25363ef4f791943a5c383b29a0.png')";
    })
  },
  destroyed() {
    clearInterval(this.timer)
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

.major-card {
  width: 2.5rem;
  height: 1.0rem;
  pointer-events: auto;
  background-image: url('../../../assets/major_card7.png');
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
  width: 100%;
  pointer-events: auto;
  justify-content: center;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
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

.prefix {
  content: '累计';
  color: #ffffff;
  font-weight: normal;
  vertical-align: super;
  font-family: Microsoft Yahei
}

</style>
