<template>
    <div>
        <div id='base-scatter-chart' ref="baseScatterChart"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import translateInsightType from "@/js/analyze/language";

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
                        formatter: this.tooltipFormatter,
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
                        data: []
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
                    series: []
                },
                seriesTemplate: {
                    name: '未知',
                    type: 'scatter',
                    data: [],
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ],
                    //     label: {
                    //         formatter: params => params.value.toFixed(3)
                    //     }
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
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
                    this.$store.dispatch("get_analyze/addNewRefChart",
                        {pid: params.data.pid, type: params.data.type})
                }
            },
            tooltipFormatter (params) {
                if (params.componentType === 'series') {
                    return params.seriesName + '<br/>'
                        + '影响: ' + params.value[0].toFixed(3) + '<br/>'
                        + '重要性: ' + params.value[1].toFixed(3) + '<br/>';
                } else {
                    return '重要性: ' + params.value.toFixed(3)
                }
            }
        },
        computed: {
            ...mapGetters({
                seriesTypeList: 'get_analyze/renderSeriesTypeList',
                insightMap: 'get_analyze/renderInsightMap'
            })
        },
        watch: {
            insightMap: function (insightMap) {
                console.log('insightMap %o', insightMap)
                this.chartOption.legend.data = this.seriesTypeList.forEach(type => translateInsightType(type))
                let series = []
                for (let item of insightMap.entries()) {
                    let oneSeries = {...this.seriesTemplate}
                    oneSeries.name = translateInsightType(item[0])
                    oneSeries.data = item[1]
                    series.push(oneSeries)
                }
                console.log('series %o', series)
                this.chartOption.series = series
                this.scatterChart.setOption(this.chartOption)
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
