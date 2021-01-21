export default function translateInsightType (name) {
    let map = {
        'trend': '趋势',
        'top1': '第一项',
        'change point': '变化点',
        'outlier': '离群点',
        'attribution': '属性',
    }
    let res = map[name]
    return res ? res : '未知类型'
}
