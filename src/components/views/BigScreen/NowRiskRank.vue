<template>
  <div>
    <div class="absolute"
         style="width: 100%; height: 14%; left: 0.25rem;">
      <div class="title-wrapper" style="width: 100%; height: 100%; "> 实时重复隐患排名</div>
    </div>
    <div class="absolute" style="width: 100%; height: 88%; top: 20%; font-size: 0.20rem">
      <div class="wrapper">
        <div class="element">
          <div class="front">
            <div class="table-wrapper">
              <span class="table-index">1</span>
              <div class="table-content">
                {{ this.nowRiskRankData[0].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[0].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
          <div class="back">
            <div class="table-wrapper">
              <span class="table-index"
                    style="">6</span>
              <div class="table-content"
                   style="">
                {{ this.nowRiskRankData[5].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[5].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
        </div>
        <div class="element">
          <div class="front">
            <div class="table-wrapper">
              <span class="table-index">2</span>
              <div class="table-content">
                {{ this.nowRiskRankData[1].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[1].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
          <div class="back">
            <div class="table-wrapper">
              <span class="table-index"
                    style="">7</span>
              <div class="table-content"
                   style="">
                {{ this.nowRiskRankData[6].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[6].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
        </div>
        <div class="element">
          <div class="front">
            <div class="table-wrapper">
              <span class="table-index">3</span>
              <div class="table-content">
                {{ this.nowRiskRankData[2].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[2].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
          <div class="back">
            <div class="table-wrapper">
              <span class="table-index"
                    style="">8</span>
              <div class="table-content"
                   style="">
                {{ this.nowRiskRankData[7].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[7].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
        </div>
        <div class="element">
          <div class="front">
            <div class="table-wrapper">
              <span class="table-index">4</span>
              <div class="table-content">
                {{ this.nowRiskRankData[3].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[3].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
          <div class="back">
            <div class="table-wrapper">
              <span class="table-index"
                    style="">9</span>
              <div class="table-content"
                   style="">
                {{ this.nowRiskRankData[8].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[8].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
        </div>
        <div class="element">
          <div class="front">
            <div class="table-wrapper">
              <span class="table-index">5</span>
              <div class="table-content">
                {{ this.nowRiskRankData[4].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[4].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
          <div class="back">
            <div class="table-wrapper">
              <span class="table-index"
                    style="">10</span>
              <div class="table-content"
                   style="">
                {{ this.nowRiskRankData[9].note }}
              </div>
              <div class="appear-time"
                   style=" color: #fff; font-size: 0.2rem; font-weight: normal; padding-left: 10px;">
                {{ this.nowRiskRankData[9].appear_time }}
              </div>
            </div>
            <div class="table-bar">
              <div class="light"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "NowRiskRank",
  props: {
    nowRiskRankData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
  },
  mounted() {
    let flag = false
    setInterval(() => {
      if (flag == false) {
        $(".element").css("transform", "rotateX(0deg)")
        flag = true
      } else {
        $(".element").css("transform", "rotateX(180deg)")
        flag = false
      }
    }, 5000)
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

.wrapper {
  width: 100%;
  height: 154px;
  pointer-events: auto;
  border-radius: 0px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title-wrapper {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: rgb(255, 99, 0);
  font-weight: bold;
  font-family: 'Microsoft Yahei';
  font-size: 0.30rem;
  writing-mode: horizontal-tb;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.table-bar {
  height: 0.1rem;
  background: rgb(255, 99, 0);
  display: inline-block;
  overflow: hidden;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
}

.light {
  /*position: absolute;*/
  /*left: 0px;*/
  /*top: 0px;*/
  /*!*width: 70px;*!*/
  /*!*height: 2px;*!*/
  /*background: radial-gradient(rgb(121, 218, 255) 5%, rgba(0, 0, 0, 0) 80%);*/
  /*transition: none 0s ease 0s;*/
}

.element {
  position: relative;
  color: #fff;
  text-align: center;
  line-height: 0.3rem;
  transform-style: preserve-3d;
  transition: 1.5s;
  margin-bottom: 0.2rem;
  margin-left: 0.2rem;
}

.element, .front, .back {
  width: 96%;
  height: 0.4rem;
  backface-visibility: hidden;
}

.front, .back {
  position: absolute;
  left: 0;
  top: 0;
}

.table-wrapper {
  display: flex;
  position: relative;
  transform-origin: 50% 50%;
  bottom: 0.1rem;
}

.back {
  /*background: #0f0;*/
  transform: rotateX(180deg);
}

.table-index {
  color: #fff;
  font-size: 0.20rem;
  font-weight: normal;
  padding-right: 0.2rem;
  width: auto;
  flex: none;
}

.table-content {
  display: flex;
  align-items: flex-start;
  position: relative;
  transform-origin: 50% 50%;
  width: 100%;
  height: 0.25rem;
}
</style>