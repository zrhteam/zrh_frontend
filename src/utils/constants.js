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
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        }
    },
    dataset: [{
        dimensions: ['name', 'count'],
        source: []
    }, {
        transform: {
            type: 'sort',
            config: { dimension: 'count', order: 'desc' }
        }
    }],
    xAxis: {
        type: 'category',
        axisLabel: {
            // interval: 0,
            // rotate: 45,
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
        bottom: fontSize(0.35),
        containLabel: true
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
            barCategoryGap: fontSize(0.40),
            barMaxWidth: fontSize(0.20)
        },
    ]
};
//对于一个x量对应三个bar
export const bar_option2 = {
    legend: {
        textStyle: {
            // color: '#058ddb',
            color: '#ffffff',
            fontSize: fontSize(0.1),
            itemHeight: fontSize(0.10),
            itemGap: fontSize(0.10),
        },
        left: fontSize(0.06)
    },
    tooltip: {},
    dataset: {
        source: []
    },
    grid: {
        left: fontSize(0.25),
        top: fontSize(0.25),
        right: fontSize(0.55),
        bottom: fontSize(0.35),
        containLabel: true
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
            barMaxWidth: fontSize(0.20)
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
            barMaxWidth: fontSize(0.20)
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
            barMaxWidth: fontSize(0.20)
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
        bottom: fontSize(0.40),
        containLabel: true
    },
    xAxis: {
        type: 'value',
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
            // encode: {
            //     // Map the "amount" column to X axis.
            //     x: 'count',
            //     // Map the "product" column to Y axis
            //     y: 'name'
            // },
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
            barMaxWidth: fontSize(0.2),
            // barCategoryGap: toString(fontSize(0.18)),
            barCategoryGap: fontSize(0.13),
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
        icon: "circle",
        itemHeight: fontSize(0.10),
        itemGap: fontSize(0.10),
        left: fontSize(0.2),
        textStyle: {
            // color: '#058ddb',
            color: '#ffffff',
            fontSize: fontSize(0.1),
            itemHeight: fontSize(0.10),
            itemGap: fontSize(0.10),
        },
        formatter: null
    },
    series: [
        {
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            // minAngle: 5, //最小的扇区角度
            // startAngle: 45, //起始角度
            hoverAnimation:false,
            label: {
                normal: {
                    show: false,
                    color: '#fff',
                    formatter: '{b}: {c}' //自定义显示格式(b:name, c:value, d:百分比)
                    // formatter(v) {
                    //     let text = v.name + ':' + v.value
                    //     console.log("qqq", `${text.slice(0, v.name.length + 1)}\n${text.slice(v.name.length + 1, text.length + 1)}`)
                    //     return text = `${text.slice(0, v.name.length + 1)}\n${text.slice(v.name.length + 1, text.length + 1)}`
                    // },
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
//折线图
export const line_option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        textStyle: {
            // color: '#058ddb',
            color: '#ffffff',
            fontSize: fontSize(0.1),
            itemHeight: fontSize(0.10),
            itemGap: fontSize(0.10),
        },
        data: [],
        itemHeight: fontSize(0.10),
        itemGap: fontSize(0.10),
    },
    grid: {
        left: fontSize(0.25),
        top: fontSize(0.45),
        right: fontSize(0.55),
        bottom: fontSize(0.25),
        containLabel: true
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
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