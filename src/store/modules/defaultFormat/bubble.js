import commonProp from './commonProp';

const bubble = {
    ...commonProp('bubble', '气泡图', './static/images/9.png', 'highchart'),
    chartMsg: {
        credits: {
            enabled: false
        },
        // 全局
        chart: {
            type: 'bubble',
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            marginTop: 80,
            marginRight: 40,
            marginBottom: 100,
            marginLeft: 80
        },
        // 标题
        title: {
            text: '气泡图',
            x: 1,
            y: 14,
            style: {
                color: '#fff',
                fontSize: 16
            }
        },
        // 副标题
        subtitle: {
            x: 1,
            y: 40,
            text: '',
            style: {
                color: '#FFF',
                fontSize: 14
            }
        },
        xAxis: {
            visible: true,
            gridLineWidth: 0,
            labels: {
                style: {
                    color: '#cccccc',
                    fontSize: 12
                }
            },
            lineColor: '#ccd6eb',
            lineWidth: 1,
            title: {
                text: '',
                align: 'low',
                style: {
                    color: '#666666',
                    fontSize: 12
                },
                x: 0,
                y: 0
            }
        },
        yAxis: {
            visible: true,
            gridLineWidth: 0,
            labels: {
                style: {
                    color: '#cccccc',
                    fontSize: 12
                }
            },
            lineColor: '#ccd6eb',
            lineWidth: 1,
            title: {
                text: 'Values',
                align: 'high',
                style: {
                    color: '#666666',
                    fontSize: 12
                },
                x: 0,
                y: 0
            }
        },
        yplotLine: {
            color: '#FF0000',
            width: 0,
            value: 50,
            id: 'plot-line-1'
        },
        plotOptions: {
            bubble: {
                // minSize: 8,
                // maxSize: 20,
                showInLegend: true
            },
            series: {
                animation:false
            }
        },
        legend: {
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            x: 0,
            y: 20,
            itemStyle: {
                color: '#FFF',
                fontSize: 12
            },
            itemHoverStyle: {
                color: '#EEE'
            },
            margin: 100,
            align: 'center',
            verticalAlign: 'bottom'
        },
        series: [
            {
                value: 1,
                name: '数据列1',
                marker: {
                    fillColor: '#78CFEF',
                    lineColor: '#78CFEF'
                },
                data: [
                    [9, 81, 63],
                    [98, 5, 89],
                    [45, 50, 73],
                    [31, 2, 44],
                    [78, 37, 34],
                    [65, 46, 53]
                ]
            }
        ],
        s: [
            {
                value: 1,
                name: '数据列1',
                marker: {
                    fillColor: '#78CFEF',
                    lineColor: '#78CFEF'
                }
            }
        ]
    },

    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [
            {"x": 9, "y": 81, "r": 63, "s": 1 },
            {"x": 98, "y": 5, "r": 89, "s": 1 },
            {"x": 45, "y": 50, "r": 73, "s": 1 },
            {"x": 31, "y": 2, "r": 44, "s": 1 },
            {"x": 78, "y": 37, "r": 34, "s": 1 },
            {"x": 65, "y": 46, "r": 53, "s": 1 },

            {"x": 25, "y": 10, "r": 87, "s": 2 },
            {"x": 2, "y": 75, "r": 59, "s": 2 },
            {"x": 86, "y": 55, "r": 73, "s": 2 },
            {"x": 5, "y": 3, "r": 58, "s": 2 },
            {"x": 90, "y": 63, "r": 44, "s": 2 },
            {"x": 51, "y": 69, "r": 40, "s": 2 },

            {"x": 22, "y": 2, "r": 27, "s": 3 },
            {"x": 32, "y": 15, "r": 89, "s": 3 },
            {"x": 46, "y": 65, "r": 93, "s": 3 },
            {"x": 75, "y": 31, "r": 58, "s": 3 },
            {"x": 11, "y": 22, "r": 64, "s": 3 },
            {"x": 9, "y": 59, "r": 30, "s": 3 }
        ],
        data: [],
        reflect: [{
            name: "x",
            reflectName: 'x',
            construction: '类目',
            state: true
        },{
            name: "y",
            reflectName: 'y',
            construction: '值',
            state: true
        },{
            name: "r",
            reflectName: 'r',
            construction: '半径值',
            state: true
        },{
            name: "s",
            reflectName: 's',
            construction: '系列',
            state: true
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    }
};

export default [bubble];
