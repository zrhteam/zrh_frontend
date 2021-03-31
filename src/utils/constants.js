//字体自适应
import echarts from "echarts";

function fontSize(res) {
    let docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}

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
                fontSize: fontSize(0.1)
            },
            formatter: function (params) {
                let val = "";
                let show = 8;
                if (params.length > show) {
                    val = params.substr(0, show) + '...';
                    return val;
                } else {
                    return params;
                }
            }
        },
        axisLine: {
            lineStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.08)
            }
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.08)
            }
        },
        axisLabel: {
            margin: 2,
            textStyle: {
                fontSize: fontSize(0.1)
            }
        },
        splitLine: {
            show: false
        }
    },
    grid: {
        left: fontSize(0.25),
        top: fontSize(0.25),
        right: fontSize(0.55),
        bottom: fontSize(0.55),
    },
    series: [
        {
            type: 'bar',
            encode: null,
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#23dbdc'},
                            // {offset: 0.5, color: '#1f77a0'},
                            {offset: 1, color: '#1860b4'}
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
            // barMaxWidth: 40,
            barCategoryGap: toString(fontSize(0.10)),
        }
    ]
};
//对于一个x量对应三个bar
export const bar_option2 = {
    legend: {
        textStyle: {
            color: '#ffffff',
            fontSize: fontSize(0.1)
        },
        left: 6
    },
    tooltip: {},
    dataset: {
        source: []
    },
    grid: {
        left: fontSize(0.25),
        top: fontSize(0.25),
        right: fontSize(0.55),
        bottom: fontSize(0.55),
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
                    color: "#4992ff"
                }
            },
            barMaxWidth: fontSize(0.40)
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                    color: '#58d9f9'
                }
            },
            barMaxWidth: fontSize(0.40)
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                    color: '#05c091'
                }
            },
            barMaxWidth: fontSize(0.40)
        }
    ],
    xAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
                fontSize: fontSize(0.1)
            }
        },
        axisLine: {
            lineStyle: {
                color: '#ffffff',
                fontSize: fontSize(0.08)
            }
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#ffffff',
                fontSize: fontSize(0.08)
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: fontSize(0.1)
            }
        },
        splitLine: {
            show: false
        }
    },
};
//针对纵向bar
export const bar_option3 = {
    dataset: {
        // dimensions: ['name', 'count'],
        source: []
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        }
    },
    grid: {
        left: fontSize(0.25),
        top: fontSize(0.25),
        right: fontSize(0.55),
        bottom: fontSize(0.55),
        containLabel: true
    },
    xAxis: {
        name: 'amount',
        axisLabel: {
            interval: 0,
            textStyle: {
                fontSize: fontSize(0.10),
                color: '#058ddb'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.08)
            },
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.08)
            },
            show: false
        },
        axisLabel: {
            textStyle: {
                fontSize: fontSize(0.10)
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    series: [
        {
            type: 'bar',
            encode: {
                // Map the "amount" column to X axis.
                x: 'count',
                // Map the "product" column to Y axis
                y: 'name'
            },
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius: [0, 10, 10, 0],
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#23dbdc'},
                            // {offset: 0.5, color: '#1f77a0'},
                            {offset: 1, color: '#1860b4'}
                        ]
                    )
                }
            },
            emphasis: {
                itemStyle: {
                    color: '#40abc4'
                }
            },
            // barMaxWidth: 20,
            // barCategoryGap: toString(fontSize(0.18)),
            barCategoryGap: fontSize(0.18),
        }
    ]
};

//针对 pie chart 的 option
export const pie_option = {
    tooltip: {
        formatter: '{b}:{c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: toString(fontSize(0.10)),
        textStyle: {
            color: '#ffffff',
            fontSize: fontSize(0.1)
        },
        formatter: null
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
            center: ['60%', '60%'],
            // minAngle: 5, //最小的扇区角度
            // startAngle: 45, //起始角度
            label: {
                normal: {
                    show: false,
                    color: '#fff',
                    // formatter: '{b}: {c}' //自定义显示格式(b:name, c:value, d:百分比)
                    formatter(v) {
                        let text = v.name + ':' + v.value
                        return text = `${text.slice(0, v.name.length + 1)}\n${text.slice(v.name.length + 1)}`
                        // if (text.length < 8) {
                        //     return text;
                        // } else if (text.length > 8 && text.length <= 16) {
                        //     return text = `${text.slice(0, 8)}\n${text.slice(8)}`
                        // } else if (text.length > 16 && text.length <= 24) {
                        //     return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(24)}`
                        // } else if (text.length > 18 && text.length <= 24) {
                        //     return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24)}`
                        // } else if (text.length > 24) {
                        //     return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24, 32)}\n${text.slice(32)}`
                        // }
                    },
                }
            },
            labelLine: {
                show: false
            },
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: fontSize(0.10),
                    shadowOffsetX: 0,
                    // shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    color: function (params) {
                        //自定义颜色
                        let colorList = [
                            '#3d5bfb', '#7c00ff', '#11aeff', '#27e0a6', '#00c800', '#e8395d',
                        ];
                        return colorList[params.dataIndex]
                    },
                    //渐变色
                    //     color: function (params) {
                    //         let colorList = [
                    //             {
                    //                 c1: '#fce5ca',
                    //                 c2: '#ff9d62'
                    //             },
                    //             {
                    //                 c1: '#63e587',
                    //                 c2: '#5fe2e4'
                    //             },
                    //             {
                    //                 c1: '#db6400',
                    //                 c2: '#ceb895'
                    //             },
                    //             {
                    //                 c1: '#e8e87e',
                    //                 c2: '#a1a170'
                    //             },
                    //             {
                    //                 c1: '#007965',
                    //                 c2: '#b1e2da'
                    //             },
                    //             {
                    //                 c1: '#7c9473',
                    //                 c2: '#d6efc7'
                    //             }];
                    //         return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    //             offset: 0,
                    //             color: colorList[(params.dataIndex) % colorList.length].c1
                    //         }, {
                    //             offset: 1,
                    //             color: colorList[(params.dataIndex) % colorList.length].c2
                    //         }])
                    // }
                }
            },

        }
    ]
};
//折线图堆叠
export const line_option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        textStyle: {
            color: '#058ddb'
        },
        data: []
    },
    grid: {
        left: fontSize(0.25),
        top: fontSize(0.45),
        right: fontSize(0.55),
        bottom: fontSize(0.25),
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.1)
            }
        },
        axisLine: {
            lineStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.08)
            }
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.08)
            }
        },
        axisLabel: {
            textStyle: {
                color: '#058ddb',
                fontSize: fontSize(0.1)
            }
        },
        splitLine: {
            show: false
        }
    },
    series: []
}