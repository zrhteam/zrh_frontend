<template>
    <div>
        <div id='base-scatter-chart' ref="baseScatterChart"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'BaseScatterChart',
        data() {
            return {
                scatterChart: undefined,
                chartOption: {
                    title: {
                        text: '数据洞察',
                        // subtext: ''
                    },
                    backgroundColor: '',
                    tooltip: {
                        trigger: 'item',
                        showDelay: 0,
                        formatter: function (params) {
                            if (params.componentType === 'series') {
                                return params.seriesName + '<br/>'
                                    + '影响: ' + params.value[0] + '<br/>'
                                    + '重要性: ' + params.value[1].toFixed(2) + '<br/>';
                            } else {
                                return '重要性: ' + params.value.toFixed(2)
                            }
                        },
                        axisPointer: {
                            show: true,
                            type: 'cross',
                            lineStyle: {
                                type: 'dashed',
                                width: 1
                            }
                        }
                    },
                    legend: {
                        data: ['前K项', '趋势', '相关性']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataZoom: {show: true},
                            dataView: {show: true, readOnly: true},
                            restore: {show: true},
                            saveAsImage: {show: true},
                        }
                    },
                    xAxis: [
                        {
                            type: 'value',
                            name: '影响',
                            scale: true,
                            axisLabel: {
                                formatter: (value, index) => {
                                    return value
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '重要性',
                            scale: true,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '前K项',
                            type: 'scatter',
                            data: [
                                // {value: [1, 2], pid: 1},
                                // {value: [167.5, 59.0], pid: 2},
                                // {value: [159.5, 49.2], pid: 3},
                            ],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ],
                                label: {
                                    formatter: params => params.value.toFixed(2)
                                }
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '趋势',
                            type: 'scatter',
                            data: [
                                // {value: [3, 4], pid: 2},
                                // {value: [177.3, 71.8], pid: 5},
                                // {value: [173.5, 80.7], pid: 6},
                            ],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ],
                                label: {
                                    formatter: params => params.value.toFixed(2)
                                }
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '相关性',
                            type: 'scatter',
                            data: [
                                // {value: [4, 5], pid: 3},
                                // {value: [180.2, 109.1], pid: 8},
                                // {value: [185.3, 104.5], pid: 9},
                            ],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ],
                                label: {
                                    formatter: params => params.value.toFixed(2)
                                }
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                },
            }
        },
        methods: {
            initChart () {
                let scatterChart = this.$echarts.init(this.$refs.baseScatterChart, 'dark')
                this.scatterChart = scatterChart
                scatterChart.setOption(this.chartOption);
                console.log('chartOption: %o', this.chartOption)
                scatterChart.on('click', this.glyphClicked)
            },
            glyphClicked (params) {
                if (params.componentType === 'series') {
                    console.log('click %o', params);
                    let seriesType;
                    switch (params.seriesName) {
                        case '前K项': seriesType = 'top1'; break;
                        case '趋势': seriesType = 'trend'; break;
                        case '相关性': seriesType = 'correlation'; break;
                        default: console.log('Error type'); return;
                    }
                    this.$store.commit("get_analyze/addChartData",
                        {pid: params.data.pid, type: seriesType})
                }
            },
            updateInsightList (insightList) {
                // top k: 0, trend: 1, correlation: 2
                let dataList = [[], [], []]
                for (let i = 0; i < insightList.length; i++) {
                    let insight = insightList[i]
                    let index;
                    switch (insight[3]) {
                        case 'top1': index = 0; break;
                        case 'trend': index = 1; break;
                        case 'correlation': index = 2; break;
                        default: console.log('Error type %s', insight[3]); return;
                    }
                    dataList[index].push({
                        value: [insight[1], insight[2]],
                        pid: insight[0]
                    })
                }
                console.log('dataList %o', dataList)
                for (let i = 0; i < dataList.length; i++) {
                    this.chartOption.series[i].data = dataList[i]
                }
                this.scatterChart.setOption(this.chartOption);
            },
        },
        computed: {
            ...mapGetters({
                insightList: 'get_analyze/renderInsightList'
            })
        },
        watch: {
            insightList: function (insightList) {
                this.updateInsightList(insightList)
            }
        },
        mounted: function () {
            this.initChart();
            this.$store.dispatch('get_analyze/getInsightList')
        }
    }
</script>

<style scoped>
    #base-scatter-chart {
        width: 600px;
        height:400px;
    }
</style>
