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