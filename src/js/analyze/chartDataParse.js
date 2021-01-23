export function wrapperChartOption (chartOption, chartData) {
    let funcMap = {
        'top1': wrapperTop1,
        'trend': wrapperTrend,
        'change point': wrapperChangePointOrOutlier,
        'outlier': wrapperChangePointOrOutlier,
        'attribution': wrapperAttribution,
    }
    let func = funcMap[chartData.type]
    let ret;
    if (func) {
        console.log('chartData %o', chartData)
        ret = func(chartOption, chartData.chartMeta)
        console.log('chartOption %o', chartOption)
    } else{
        ret = chartOption
        console.log('Chart type unsupported !!')
    }
    return ret
}

function wrapperTop1 (chartOption, chartMeta) {
    let xLabelList = []
    for (let i = 1; i <= 10; i++) {
        xLabelList.push(i)
    }
    chartOption.xAxis = {
        name: '排名',
        type: 'category',
        data: xLabelList
    }
    chartOption.yAxis = {
        name: chartMeta.y_coord_str,
        type: 'value'
    }
    chartOption.tooltip.formatter = function (params) {
        return '排名 : ' + params.name + '<br/>' + params.value;
    }
    chartOption.legend.data = []
    chartOption.series = [{
        name: 'Rank',
        type: 'bar',
        data: chartMeta.data_list
    }]
    return chartOption
}

function wrapperTrend (chartOption, chartMeta) {
    chartOption.xAxis = {
        name: chartMeta.x_coord_str,
        type: 'category',
        boundaryGap : false,
        data: chartMeta.x_label_list,
    }
    chartOption.yAxis = {
        name: chartMeta.y_coord_str,
        type: 'value'
    }
    chartOption.legend.data = []
    chartOption.series = [{
        name: 'Line',
        type: 'line',
        data: chartMeta.data_list,
        markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
        }
    }]
    return chartOption
}

function wrapperChangePointOrOutlier (chartOption, chartMeta) {
    chartOption.xAxis = {
        name: chartMeta.x_coord_str,
        type : 'category',
        boundaryGap : false,
        data: chartMeta.x_label_list,
    }
    chartOption.yAxis = {
        type: 'value'
    }
    chartOption.legend.data = []
    let value = chartMeta.data_list[chartMeta.highlight_idx]
    let index = chartMeta.highlight_idx
    console.log(value, index)
    chartOption.series = [
        {
            name: 'Line',
            type: 'line',
            data: chartMeta.data_list,
            markPoint : {
                data : [
                    {name: '', value: value, xAxis: index, yAxis: value},
                ],
                label: {
                    formatter: params => params.value
                }
            },
        }]
    return chartOption
}

function wrapperAttribution (chartOption, chartMeta) {
    delete chartOption.xAxis
    delete chartOption.yAxis
    chartOption.tooltip = {
        trigger: 'item',
        // formatter: "{a} <br/>{b} : {c} ({d}%)",
        formatter: "{b} : {c} ({d}%)",
    }
    console.log(chartOption)
    chartOption.legend = {
        orient : 'vertical',
        x: 'left',
        y: 'bottom',
        data: Array.from(chartMeta.data_list, item => item[0])
    }
    chartOption.calculable = true
    chartOption.series = [{
        name:'Proportion',
        type:'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data: Array.from(chartMeta.data_list, item => {
            return {value: item[1], name: item[0]}
        })
    }]
    return {...chartOption}
}
