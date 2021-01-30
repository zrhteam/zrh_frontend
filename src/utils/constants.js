//此处存放所有全局变量
//针对 bar chart 的 option
export const bar_option = {
    tooltip: {},
    dataset: {
        dimensions: ['name', 'count'],
        source: []
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
                fontSize: 10
            }
        },
        axisLine: {
            lineStyle: {
                color: '#ffffff',
                fontSize: 8
            }
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#ffffff'
            }
        },
        axisLabel: {
            // textStyle: {
            //   fontSize: 10
            // }
        }
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#77b5b8'},
                            // {offset: 0.5, color: '#1f77a0'},
                            {offset: 1, color: '#107480'}
                        ]
                    )
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#40abc4'
                    //     new echarts.graphic.LinearGradient(
                    //     0, 0, 0, 1,
                    //     [
                    //       {offset: 0, color: '#2378f7'},
                    //       {offset: 0.7, color: '#2378f7'},
                    //       {offset: 1, color: '#83bff6'}
                    //     ]
                    // )
                }
            },
            barMaxWidth: 40
        }
    ]
};
//对于一个x量对应三个bar
export const bar_option2 = {
    legend: {},
    tooltip: {},
    dataset: {
        source: []
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                }
            },
            barMaxWidth: 40
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                }
            },
            barMaxWidth: 40
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                }
            },
            barMaxWidth: 40
        }
    ],
    xAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
                fontSize: 10
            }
        },
        axisLine: {
            lineStyle: {
                color: '#ffffff',
                fontSize: 8
            }
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#ffffff'
            }
        },
        axisLabel: {
            // textStyle: {
            //   fontSize: 10
            // }
        }
    },
};
//针对 pie chart 的 option
export const pie_option = {
    tooltip: {
        formatter: '{b}:{c} ({d}%)'
    },
    // legend: {
    //   type: "scroll",
    //   orient: 'vertical',
    //   top: 20,
    //   right: '2%',
    //   textStyle:{
    //     color: '#fff',
    //     fontSize: 12
    //   },
    //   // data: arr.name
    // },

    series: [
        {
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            label: {
                normal: {
                    show: true,
                    color: '#fff',
                    formatter: '{b}: {c}' //自定义显示格式(b:name, c:value, d:百分比)
                }
            },
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    // shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    color: function (params) {
                        let colorList = [
                            {
                                c1: '#fce5ca',
                                c2: '#ff9d62'
                            },
                            {
                                c1: '#63e587',
                                c2: '#5fe2e4'
                            },
                            {
                                c1: '#db6400',
                                c2: '#ceb895'
                            },
                            {
                                c1: '#e8e87e',
                                c2: '#a1a170'
                            },
                            {
                                c1: '#007965',
                                c2: '#b1e2da'
                            },
                            {
                                c1: '#7c9473',
                                c2: '#d6efc7'
                            }];
                        return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: colorList[(params.dataIndex) % colorList.length].c1
                        }, {
                            offset: 1,
                            color: colorList[(params.dataIndex) % colorList.length].c2
                        }])
                    }
                }
            },

        }
    ]
};