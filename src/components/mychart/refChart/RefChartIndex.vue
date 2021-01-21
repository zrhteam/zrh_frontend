<template>
    <div class="chart-card">
        <div ref="refChart" style="width: 400px; height: 300px;"/>
    </div>
</template>

<script>
    import translateInsightType from "@/js/analyze/language";
    import {wrapperChartOption} from "@/js/analyze/chartDataParse";

    export default {
        name: "RefChart",
        props: [
            'chartData'
        ],
        data () {
            let this_ = this
            return {
                refChart: undefined,
                chartOption: {
                    title : {
                        text: '未知',
                        // subtext: ''
                    },
                    backgroundColor: '',
                    grid: {
                        right: '100px',
                    },
                    tooltip : {
                        trigger: 'item',
                        showDelay : 0,
                        formatter : function (params) {
                            if (params.value.length > 1) {
                                return params.seriesName + ' :<br/>'
                                    + 'x : ' + params.value[0] + '<br/>'
                                    + 'y : ' + params.value[1] + '<br/>';
                            } else {
                                return params.name + '值 : '
                                    + params.value;
                            }
                        },
                        axisPointer:{
                            show: true,
                            type : 'cross',
                            lineStyle: {
                                type : 'dashed',
                                width : 1
                            }
                        }
                    },
                    legend: {
                        data:[]
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {show: true, readOnly: true},
                            myClose: {
                                show: true,
                                icon: 'path://M512 65C265.146 65 65 265.146 65 512c0 246.854 200.146 447 447 447 246.854 0 447-200.146 447-447C959 265.146 758.854 65 512 65zM512 929.2C281.952 929.2 94.8 742.048 94.8 512S281.952 94.8 512 94.8 929.2 281.952 929.2 512 742.048 929.2 512 929.2z M683.35 320.257 511.971 491.636 340.65 320.257 320.25 340.687 491.6 512.022 320.264 683.342 340.65 703.729 511.971 532.408 683.35 703.742 703.736 683.342 532.414 512.022 703.75 340.643Z',
                                title : '关闭',
                                onclick: this_.closeChart
                            }
                        },
                    },
                    series : []
                },
            }
        },
        methods: {
            initChart () {
                let refChart = this.$echarts.init(this.$refs.refChart, 'dark')
                this.refChart = refChart
                refChart.setOption(this.chartOption);
            },
            updateRefChartData (chartData) {

                this.chartOption.title.text = translateInsightType(this.chartData.type)

                if (chartData.y_coord_str) {
                    if (chartData.y_coord_str.indexOf('danger_number') !== -1) {
                        chartData.y_coord_str = '危险指数和'
                    } else if (chartData.y_coord_str.indexOf('count of risk_level') !== -1) {
                        let cnt = chartData.y_coord_str.split('=')[1]
                        chartData.y_coord_str = '风险等级' + cnt + '数量'
                    }
                }
                this.chartOption = wrapperChartOption(this.chartOption, chartData)
                this.refChart.setOption(this.chartOption);
            },
            closeChart () {
                console.log('close chart %d', this.chartData.chartKey)
                this.$store.commit('get_analyze/removeChartData',
                    {chartKey: this.chartData.chartKey})
            }
        },
        mounted: function () {
            this.initChart();
            this.updateRefChartData(this.chartData);
        },
    }
</script>

<style scoped>
    .chart-card {
        /*width: 480px;*/
        /*height: 300px;*/
    }
</style>
