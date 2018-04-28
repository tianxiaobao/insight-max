import commonProp from './commonProp';

const scatter = {
    ...commonProp('scatter', '散点图', './static/images/scatter.png', 'highchart'),
    chartMsg: {
        credits: {
            enabled: false
        },
        // 全局
        chart: {
            type: 'scatter',
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
            text: '按性别划分的身高和体重分布图',
            x: 1,
            y: 14,
            style: {
                color: '#FFFFFF',
                fontSize: 16
            }
        },
        // 副标题
        subtitle: {
            x: 1,
            y: 40,
            text: '数据来源: Heinz  2003',
            style: {
                color: '#FFFFFF',
                fontSize: 14
            }
        },
        xAxis: {
            visible: true,
            gridLineWidth: 0,
            labels: {
                style: {
                    color: '#CCCCCC',
                    fontSize: 12
                }
            },
            lineColor: '#CCD6EB',
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
            gridLineColor: '#EEEEEE',
            labels: {
                style: {
                    color: '#CCCCCC',
                    fontSize: 12
                }
            },
            lineColor: '#CCD6EB',
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
            scatter: {
                showInLegend: true
            },
            series: {
                animation: false,
                marker: {
                    radius: 4
                }
            }
        },
        legend: {
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            itemStyle: {
                color: '#FFFFFF',
                fontSize: 12
            },
            itemHoverStyle: {
                color: '#EEE'
            },
            margin: 100,
            // align: 'center',
            // verticalAlign: 'bottom',
            x: 0,
            y: 20
        },
        series: [
            {
                name: '女',
                value: 1,
                color: 'rgba(223, 83, 83, .5)',
                data: [
                    [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                    [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                    [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8]
                ]
            }, {
                name: '男',
                value: 2,
                color: 'rgba(119, 152, 191, .5)',
                data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                   [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
                   [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
                   [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
                   [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                   [180.3, 83.2], [180.3, 83.2]]
            }
        ],
        s: [
            {
                value: 1,
                name: '女',
                marker: {
                    fillColor: 'rgba(223, 83, 83, .5)'
                }
            },
            {
                value: 2,
                name: '男',
                marker: {
                    fillColor: 'rgba(119, 152, 191, .5)'
                }
            }
        ]
    },
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [
            {"x": 161.2, "y": 51.6, "s": 1 }, {"x": 167.5, "y": 59.0, "s": 1 }, {"x": 159.5, "y": 49.2, "s": 1 }, {"x": 159.5, "y": 49.2, "s": 1 }, {"x": 157.0, "y": 63.0, "s": 1}, {"x": 155.8, "y": 53.6, "s": 1},
            {"x": 170.0, "y": 59.0, "s": 1}, {"x": 159.1, "y": 47.6, "s": 1}, {"x": 166.0, "y": 69.8, "s": 1}, {"x": 176.2, "y": 66.8, "s": 1}, {"x": 160.2, "y": 75.2, "s": 1},
            {"x": 172.5, "y": 55.2, "s": 1}, {"x": 170.9, "y": 54.2, "s": 1}, {"x": 172.9, "y": 62.5, "s": 1}, {"x": 153.4, "y": 42.0, "s": 1}, {"x": 160.0, "y": 50.0, "s": 1},
            {"x": 147.2, "y": 49.8, "s": 1}, {"x": 168.2, "y": 49.2, "s": 1}, {"x": 175.0, "y": 73.2, "s": 1}, {"x": 157.0, "y": 47.8, "s": 1}, {"x": 167.6, "y": 68.8, "s": 1},
            {"x": 159.5, "y": 50.6, "s": 1}, {"x": 175.0, "y": 82.5, "s": 1}, {"x": 166.8, "y": 57.2, "s": 1}, {"x": 176.5, "y": 87.8, "s": 1}, {"x": 170.2, "y": 72.8, "s": 1},

            {"x": 174.0, "y": 65.6, "s": 2}, {"x": 175.3, "y": 71.8, "s": 2}, {"x": 193.5, "y": 80.7, "s": 2}, {"x": 186.5, "y": 72.6, "s": 2}, {"x": 187.2, "y": 78.8, "s": 2},
            {"x": 174.0, "y": 70.9, "s": 2}, {"x": 167.6, "y": 64.5, "s": 2}, {"x": 170.2, "y": 77.3, "s": 2}, {"x": 167.6, "y": 72.3, "s": 2}, {"x": 188.0, "y": 87.3, "s": 2},
            {"x": 174.0, "y": 80.0, "s": 2}, {"x": 176.5, "y": 82.3, "s": 2}, {"x": 180.3, "y": 73.6, "s": 2}, {"x": 167.6, "y": 74.1, "s": 2}, {"x": 188.0, "y": 85.9, "s": 2},
            {"x": 180.3, "y": 73.2, "s": 2}, {"x": 167.6, "y": 76.3, "s": 2}, {"x": 183.0, "y": 65.9, "s": 2}, {"x": 183.0, "y": 90.9, "s": 2}, {"x": 179.1, "y": 89.1, "s": 2},
            {"x": 170.2, "y": 62.3, "s": 2}, {"x": 177.8, "y": 82.7, "s": 2}, {"x": 179.1, "y": 79.1, "s": 2}, {"x": 190.5, "y": 98.2, "s": 2}, {"x": 177.8, "y": 84.1, "s": 2},
            {"x": 180.3, "y": 83.2, "s": 2}, {"x": 180.3, "y": 83.2, "s": 2}
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
export default [scatter];
