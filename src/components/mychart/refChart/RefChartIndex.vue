<template>
    <div class="chart-card">
<!--        <el-button type="text" id="close-btm" @click="closeChart" icon="el-icon-close"></el-button>-->
        <div ref="refChart" style="width: 400px; height: 300px;"/>
    </div>
</template>

<script>
    import dataService from "@/service/dataService";
    export default {
        name: "RefChart",
        props: [
            'pid', 'type', 'chartKey'
        ],
        data () {
            let this_ = this
            let chartName;
            switch (this.type) {
                case 'top1': chartName = '前K项'; break;
                case 'trend': chartName = '趋势'; break;
                case 'correlation': chartName = '相关性'; break;
                default: console.log('type error: %s', this.type)
            }
            return {
                refChart: undefined,
                chartOption: {
                    title : {
                        text: chartName,
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
                                return params.seriesName + ' :<br/>'
                                    + params.name + ' : '
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
                            myClose: {
                                show: true,
                                icon: 'path://M512 65C265.146 65 65 265.146 65 512c0 246.854 200.146 447 447 447 246.854 0 447-200.146 447-447C959 265.146 758.854 65 512 65zM512 929.2C281.952 929.2 94.8 742.048 94.8 512S281.952 94.8 512 94.8 929.2 281.952 929.2 512 742.048 929.2 512 929.2z M683.35 320.257 511.971 491.636 340.65 320.257 320.25 340.687 491.6 512.022 320.264 683.342 340.65 703.729 511.971 532.408 683.35 703.742 703.736 683.342 532.414 512.022 703.75 340.643Z',
                                title : '关闭',
                                onclick: this_.closeChart
                            }
                        },
                    },
                    xAxis : [
                        {
                            type : 'value',
                            scale:true,
                            axisLabel : {
                                formatter: '{value}'
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale:true,
                            axisLabel : {
                                formatter: '{value}'
                            }
                        }
                    ],
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
            updateRefChartData (chartMeta) {
                if (chartMeta.y_coord_str) {
                    if (chartMeta.y_coord_str.indexOf('danger_number') !== -1) {
                        chartMeta.y_coord_str = '危险指数和'
                    } else if (chartMeta.y_coord_str.indexOf('count of risk_level') !== -1) {
                        let cnt = chartMeta.y_coord_str.split('=')[1]
                        chartMeta.y_coord_str = '风险等级' + cnt + '数量'
                    }
                }
                if (this.type === 'correlation') {
                    for (let i = 0; i < chartMeta.data_list.length; i++) {
                        if (chartMeta.data_list[i].col.indexOf('danger_number') !== -1){
                            chartMeta.data_list[i].col = '危险指数和'
                        } else if (chartMeta.data_list[i].col.indexOf('count of risk_level') !== -1) {
                            let cnt = chartMeta.data_list[i].col.split('=')[1]
                            chartMeta.data_list[i].col = '风险等级' + cnt + '数量'
                        }
                    }
                }
                switch(this.type) {
                    case 'top1':
                        let xLabelList = []
                        for (let i = 1; i <= 10; i++) {
                            xLabelList.push(i)
                        }
                        this.chartOption.xAxis = {
                            name: '排名',
                            type: 'category',
                            data: xLabelList
                        }
                        this.chartOption.yAxis = {
                            name: chartMeta.y_coord_str,
                            type: 'value'
                        }
                        this.chartOption.tooltip.formatter = function (params) {
                            return '排名 : ' + params.name + '<br/>' + params.value;
                        }
                        this.chartOption.legend.data = []
                        this.chartOption.series = [{
                            name: 'Rank',
                            type: 'bar',
                            data: chartMeta.data_list
                        }]
                        break;
                    case 'trend':
                        this.chartOption.xAxis = {
                            name: chartMeta.x_coord_str,
                            type: 'category',
                            boundaryGap : false,
                            data: chartMeta.x_label_list,
                        }
                        this.chartOption.yAxis = {
                            name: chartMeta.y_coord_str,
                            type: 'value'
                        }
                        this.chartOption.legend.data = []
                        this.chartOption.series = [{
                            name: 'Rank',
                            type: 'line',
                            data: chartMeta.data_list,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        }]
                        break;
                    case 'correlation':
                        this.chartOption.xAxis = {
                            name: chartMeta.x_coord_str,
                            type : 'category',
                            boundaryGap : false,
                            data: chartMeta.x_label_list,
                        }
                        this.chartOption.yAxis = {
                            // name: 'yy',
                            type: 'value'
                        }
                        this.chartOption.legend.data = [
                            chartMeta.data_list[0].col,
                            chartMeta.data_list[1].col,
                        ]
                        this.chartOption.series = [
                            {
                                name: chartMeta.data_list[0].col,
                                type: 'line',
                                data: chartMeta.data_list[0].list,
                                markPoint : {
                                    data : [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                },
                            },
                            {
                                name: chartMeta.data_list[1].col,
                                type: 'line',
                                data: chartMeta.data_list[1].list,
                                markPoint: {
                                    data: [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                },
                            }]
                        console.log('series %o', this.chartOption.series)
                        break;
                    default:
                        console.log('type error')
                }
                console.log('chart option: %o', this.chartOption)
                this.refChart.setOption(this.chartOption);
            },
            closeChart () {
                console.log('close chart %d', this.chartKey)
                this.$store.commit('get_analyze/removeChartData',
                    {chartKey: this.chartKey})
            }
        },
        mounted: function () {
            this.initChart();
            let params = new URLSearchParams();
            params.append('pid', this.pid)
            params.append('type', this.type)
            dataService.getAnalyzeRefChartData(params,response => {
                this.updateRefChartData(response)
            })
        }
    }
</script>

<style scoped>
    .chart-card {
        /*width: 480px;*/
        /*height: 300px;*/
    }
</style>
