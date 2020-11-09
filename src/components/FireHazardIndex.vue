<template>

</template>

<script>
// import * as d3 from 'd3/d3'

// import Chart from "@/js/dashboard"

class Chart {
  constructor() {
    this._width = 175;
    this._height = 175;
    this._margins = {top: 30, left: 30, right: 30, bottom: 30};
    this._data = [];
    this._scaleX = null;
    this._scaleY = null;
    // this._colors = d3.scaleOrdinal(d3.schemeCategory10);
    this._colors = d3.scale.category10();
    this._box = null;
    this._svg = null;
    this._body = null;
    this._padding = {top: 10, left: 10, right: 10, bottom: 10};
  }

  width(w) {
    if (arguments.length === 0) return this._width;
    this._width = w;
    return this;
  }

  height(h) {
    if (arguments.length === 0) return this._height;
    this._height = h;
    return this;
  }

  margins(m) {
    if (arguments.length === 0) return this._margins;
    this._margins = m;
    return this;
  }

  data(d) {
    if (arguments.length === 0) return this._data;
    this._data = d;
    return this;
  }

  scaleX(x) {
    if (arguments.length === 0) return this._scaleX;
    this._scaleX = x;
    return this;
  }

  scaleY(y) {
    if (arguments.length === 0) return this._scaleY;
    this._scaleY = y;
    return this;
  }

  svg(s) {
    if (arguments.length === 0) return this._svg;
    this._svg = s;
    return this;
  }

  body(b) {
    if (arguments.length === 0) return this._body;
    this._body = b;
    return this;
  }

  box(b) {
    if (arguments.length === 0) return this._box;
    this._box = b;
    return this;
  }

  getBodyWidth() {
    let width = this._width - this._margins.left - this._margins.right;
    return width > 0 ? width : 0;
  }

  getBodyHeight() {
    let height = this._height - this._margins.top - this._margins.bottom;
    return height > 0 ? height : 0;
  }

  padding(p) {
    if (arguments.length === 0) return this._padding;
    this._padding = p;
    return this;
  }

  defineBodyClip() {

    this._svg.append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', this.getBodyWidth() + this._padding.left + this._padding.right)
        .attr('height', this.getBodyHeight() + this._padding.top + this._padding.bottom)
        .attr('x', -this._padding.left)
        .attr('y', -this._padding.top);
  }

  render() {
    return this;
  }

  bodyX() {
    return this._margins.left;

  }

  bodyY() {
    return this._margins.top;
  }

  renderBody() {
    if (!this._body) {
      this._body = this._svg.append('g')
          .attr('class', 'body')
          .attr('transform', 'translate(' + this.bodyX() + ',' + this.bodyY() + ')')
          .attr('clip-path', "url(#clip)");
    }

    this.render();
  }

  renderChart() {
    if (!this._box) {
      this._box = d3.select('#app')
          .append('div')
          .attr('class', 'box');
    }

    if (!this._svg) {
      this._svg = this._box.append('svg')
          .attr('width', this._width)
          .attr('height', this._height);
    }

    this.defineBodyClip();

    this.renderBody();
  }

}

export default {
  name: "FireHazardIndex",
  data() {
    return {}
  },
  methods: {
    drawDashboard: function () {

      /* ----------------------------配置参数------------------------  */
      const chart = new Chart();
      const config = {
        // margins: {top: 80, left: 80, bottom: 50, right: 80},
        margins: {top: 20, left: 0, bottom: 20, right: 0},
        textColor: 'black',
        title: '仪表盘',
        totalAngle: 270,
        totalValue: 100,
        showValue: 90,
        width: 10,
        domain: [0, 20, 80, 100],
        lineColor: 'white',
        animateDuration: 500
      }

      chart.margins(config.margins);

      /* ----------------------------计算半径-----------------------------  */

      const radius = d3.min([chart.getBodyWidth() * 0.95, chart.getBodyHeight() * 0.95]) / 2;

      /* ----------------------------渲染弧形仪表盘轮廓------------------------  */
      chart.renderSlices = function(){
	    const drawAngles = config.domain.map((value, i, domain) => {
	        const angle = value / config.totalValue * config.totalAngle;
	        if (i !== domain.length-1){
	            return {
	                startAngle: (angle - config.totalAngle/2) * Math.PI/180,
	                endAngle: (domain[i+1] / config.totalValue * config.totalAngle - config.totalAngle/2) * Math.PI/180
	            }
	        }
	    });

	    drawAngles.pop();

	    const arc = d3.svg.arc()
	                    .outerRadius(radius)
	                    .innerRadius(radius - config.width > 0 ? radius - config.width : 10);

	    const slices = chart.body()
	                        .append('g')
	                        .attr('transform', 'translate(' + chart.getBodyWidth()/2 + ',' + chart.getBodyHeight()/2 + ')')
	                        .selectAll('.arc')
	                        .data(drawAngles);

	          slices.enter()
	                  .append('path')
	                  .attr('class', (d,i) => 'arc arc-' + i)
	               .merge(slices)
	                  .attr('fill', (d,i) => chart._colors(i % 10))
	                  .attr('d', arc);

	          slices.exit()
	                  .remove();
	}
      /* -----------------------渲染环形坐标轴和标签------------------------  */
      chart.renderTicks = function () {
        const drawAngles = [];
        for (let i = -config.totalAngle / 2; i <= config.totalAngle / 2 + 0.01; i += config.totalAngle / 50) {
          drawAngles.push(i * Math.PI / 180);
        }

        const ticks = chart.body()
            .append('g')
            .attr('transform', 'translate(' + chart.getBodyWidth() / 2 + ',' + chart.getBodyHeight() / 2 + ')')
            .selectAll('.ticks')
            .data(drawAngles);

        ticks.enter()
            .append('g')
            .attr('class', 'ticks')
            .merge(ticks)
            .each(drawTicks)
            .each(drawLabels);

        function drawTicks(d, i) {
          if (i === 0 || i === 50) return;
          const innerRadius = (i % 5 === 0 ? radius - config.width : radius - config.width / 3)
          d3.select(this)
              .append('line')
              .attr('stroke', config.lineColor)
              .attr('x1', Math.sin(d) * radius)
              .attr('y1', -Math.cos(d) * radius)
              .attr('x2', Math.sin(d) * innerRadius)
              .attr('y2', -Math.cos(d) * innerRadius)
        }

        function drawLabels(d, i) {
          let textAnchor = 'end';
          if (i === 25) textAnchor = 'middle';
          if (i % 5 === 0) {
            const textRadius = radius - config.width - 10;
            d3.select(this)
                .append('text')
                .attr('class', 'label')
                .attr('x', Math.sin(d) * textRadius)
                .attr('y', -Math.cos(d) * textRadius)
                .attr('dy', 5.5)
                .attr('stroke', config.textColor)
                .attr('text-anchor', d < 0 ? 'start' : textAnchor)
                .text(i / 50 * config.totalValue);
          }
        }
      }

      /* --------------------------渲染指针--------------------------  */
      chart.renderPointer = function () {
        const verticalLongOffset = Math.floor((radius - config.width - 10) * 0.8);
        const verticalShortOffset = Math.floor(verticalLongOffset * 0.12);
        const horizontalOffset = Math.floor(verticalShortOffset * 0.6);

        const points = [
          "0," + verticalShortOffset,
          horizontalOffset + ",0",
          "0," + (-verticalLongOffset),
          -horizontalOffset + ",0"
        ].join(" ");

        const pointer = chart.body()
            .selectAll(".pointer")
            .data([config.showValue]);

        pointer.enter()
            .append('polygon')
            .attr('class', 'pointer')
            .attr('points', points)
            .attr('shape-rendering', 'geometricPrecision')
            .attr('stroke', 'none')
            .attr('transform', 'translate(' + chart.getBodyWidth() / 2 + ',' + chart.getBodyHeight() / 2 + ') ' + 'rotate(' + (-0.5) * config.totalAngle + ')')
            .merge(pointer)
            .attr('fill', (d) => {
              let i = 0;
              while (i < config.domain.length - 1 && config.domain[i] < d) {
                i++
              }
              return chart._colors((i - 1) % 10);
            })
            .transition().duration(config.animateDuration)
            .attrTween('transform', rotateTween);

        pointer.exit()
            .remove();

        function rotateTween(d) {
          let lastAngle = this.last || 0;
          let angleDiff = d - lastAngle;
          this.last = d;
          return function (t) {
            return 'translate(' + chart.getBodyWidth() / 2 + ',' + chart.getBodyHeight() / 2 + ') ' + 'rotate(' + ((lastAngle + angleDiff * t) / config.totalValue - 0.5) * config.totalAngle + ')';
          }
        }

      }

      /* ----------------------------渲染图标题------------------------  */
      chart.renderTitle = function () {
        chart.svg().append('text')
            .classed('title', true)
            .attr('x', chart.width() / 2)
            .attr('y', 0)
            .attr('dy', '2em')
            .text(config.title)
            .attr('fill', config.textColor)
            .attr('text-anchor', 'middle')
            .attr('stroke', config.textColor);
      }

      // 渲染数字，将仪表盘对应的数字直接写出来
      chart.renderShowNumber = function () {
        chart.svg().append('text')
            .classed('show', true)
            .attr('x', chart.width() / 2)
            .attr('y', chart.width() - 65)
            .attr('dy', '2em')
            .text(config.showValue)
            .attr('fill', config.textColor)
            .attr('text-anchor', 'middle')
            .attr('stroke', config.textColor);
      }

      chart.render = function () {

        chart.renderTitle();

        chart.renderSlices();

        chart.renderSlices();

        chart.renderTicks();

        chart.renderPointer();

        chart.renderShowNumber();
      }

      chart.renderChart();


// setInterval(()=>{
//     // config.showValue = Math.random() * 100;
// 	config.showValue = 0.8 * 100;
//     chart.renderPointer();
// 	chart.renderShowNumber();
// }, 150000);
    }
  },
  created() {
    this.drawDashboard();
  }
}


</script>

<style scoped>
.box {
  /* margin: 10% auto; */
  width: 175px;
  height: 175px;
  background-color: #ddd;
}

.title {
  font-size: 10px;
}

.label {
  font-size: 7px;
}

.show {
  font-size: 10px;
}
</style>