/* eslint-disable */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory)
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'))
    } else {
        // Browser globals
        factory({}, root.echarts)
    }
})(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg)
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded')
        return
    }
    echarts.registerTheme('customed', {
        color: [
            '#2a82ff',
            '#ffa600',
            '#00cfa9',
            '#816af8',
            '#505d6f',
            '#7899fe',
            '#fd9144',
            '#cd6efe',
            '#0348ff',
            '#29c7c6',
            '#667cf0',
            '#8799cf',
            '#6c7b87',
            '#4bd6f0',
            '#93dbcb',
            '#82bf64',
            '#e8ca69',
            '#e89880',
            '#96aac7',
            '#a7c796',
            '#348f72',
            '#bab279',
            '#d97e0f',
            '#f54a4a',
            '#ff69aa',
            '#a475e8',
            '#4041ff',
            '#67a4ff',
            '#2ec4c4',
            '#11cc87',
        ],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textStyle: {},
        title: {
            textStyle: {
                color: '#303133',
            },
            subtextStyle: {
                color: '#606266',
            },
        },
        line: {
            itemStyle: {
                borderWidth: '1',
            },
            lineStyle: {
                width: '2',
            },
            symbolSize: '6',
            symbol: 'emptyCircle',
            smooth: true,
        },
        radar: {
            itemStyle: {
                borderWidth: '1',
            },
            lineStyle: {
                width: '2',
            },
            symbolSize: '6',
            symbol: 'emptyCircle',
            smooth: true,
        },
        bar: {
            itemStyle: {
                barBorderWidth: '0',
                barBorderColor: '#ffffff',
            },
        },
        pie: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        scatter: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        boxplot: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        parallel: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        sankey: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        funnel: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        gauge: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
        },
        candlestick: {
            itemStyle: {
                color: '#41a2ff',
                color0: '#7ecf51',
                borderColor: '#41a2ff',
                borderColor0: '#7ecf51',
                borderWidth: 1,
            },
        },
        graph: {
            itemStyle: {
                borderWidth: '0',
                borderColor: '#ffffff',
            },
            lineStyle: {
                width: 1,
                color: '#cccccc',
            },
            symbolSize: '6',
            symbol: 'emptyCircle',
            smooth: true,
            color: [
                '#2a82ff',
                '#ffa600',
                '#00cfa9',
                '#816af8',
                '#505d6f',
                '#7899fe',
                '#fd9144',
                '#cd6efe',
                '#0348ff',
                '#29c7c6',
                '#667cf0',
                '#8799cf',
                '#6c7b87',
                '#4bd6f0',
                '#93dbcb',
                '#82bf64',
                '#e8ca69',
                '#e89880',
                '#96aac7',
                '#a7c796',
                '#348f72',
                '#bab279',
                '#d97e0f',
                '#f54a4a',
                '#ff69aa',
                '#a475e8',
                '#4041ff',
                '#67a4ff',
                '#2ec4c4',
                '#11cc87',
            ],
            label: {
                color: '#ffffff',
            },
        },
        map: {
            itemStyle: {
                normal: {
                    areaColor: '#eee',
                    borderColor: '#444',
                    borderWidth: 0.5,
                },
                emphasis: {
                    areaColor: 'rgba(0,148,255,0.8)',
                    borderColor: '#444',
                    borderWidth: 1,
                },
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#000',
                    },
                },
                emphasis: {
                    textStyle: {
                        color: 'rgb(100,0,0)',
                    },
                },
            },
        },
        geo: {
            itemStyle: {
                normal: {
                    areaColor: '#eee',
                    borderColor: '#444',
                    borderWidth: 0.5,
                },
                emphasis: {
                    areaColor: 'rgba(0,148,255,0.8)',
                    borderColor: '#444',
                    borderWidth: 1,
                },
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#000',
                    },
                },
                emphasis: {
                    textStyle: {
                        color: 'rgb(100,0,0)',
                    },
                },
            },
        },
        categoryAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cfdae8',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#303133',
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#303133',
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#ebeef5'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
                },
            },
        },
        valueAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cfdae8',
                },
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#cfdae8',
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#303133',
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#f3f5fa'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
                },
            },
        },
        logAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#cccccc',
                },
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: '#333',
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#303133',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#ebeef5'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
                },
            },
        },
        timeAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#333',
                },
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#333',
                },
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#303133',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#ebeef5'],
                },
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
                },
            },
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: '#94adc3',
                },
                emphasis: {
                    borderColor: '#303133',
                },
            },
        },
        legend: {
            textStyle: {
                color: '#303133',
            },
        },
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: '#bac0d4',
                    width: '1',
                },
                crossStyle: {
                    color: '#bac0d4',
                    width: '1',
                },
            },
        },
        timeline: {
            lineStyle: {
                color: '#293c55',
                width: '1',
            },
            itemStyle: {
                normal: {
                    color: '#293c55',
                    borderWidth: 1,
                },
                emphasis: {
                    color: '#7dbdff',
                },
            },
            controlStyle: {
                normal: {
                    color: '#293c55',
                    borderColor: '#293c55',
                    borderWidth: 0.5,
                },
                emphasis: {
                    color: '#293c55',
                    borderColor: '#293c55',
                    borderWidth: 0.5,
                },
            },
            checkpointStyle: {
                color: '#409eff',
                borderColor: '#409eff',
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#303133',
                    },
                },
                emphasis: {
                    textStyle: {
                        color: '#303133',
                    },
                },
            },
        },
        visualMap: {
            color: ['#bf444c', '#d88273', '#f6efa6'],
        },
        dataZoom: {
            backgroundColor: 'rgba(47,69,84,0)',
            dataBackgroundColor: 'rgba(0,18,37,0.3)',
            fillerColor: 'rgba(167,183,204,0.4)',
            handleColor: '#a7b7cc',
            handleSize: '100%',
            textStyle: {
                color: '#303133',
            },
        },
        markPoint: {
            label: {
                color: '#ffffff',
            },
            emphasis: {
                label: {
                    color: '#ffffff',
                },
            },
        },
    })
})
