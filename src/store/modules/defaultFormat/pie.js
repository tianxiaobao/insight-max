const commonProp = (name, imgsrc) => {
    return {
        id: '',
        type: 'pie',
        chartType: 'highchart', // chartType是highchart的会统一调hightchart接口渲染，其它调用callback渲染
        name: name,
        x: 100,  // x坐标
        y: 100,  // y坐标
        height: 300,
        width: 500,
        visiable: true,
        img: imgsrc, // 缩略图信息
        checked: false
    };
};

const basePie = {
    ...commonProp('基础饼图', './static/images/pie.png'),

    chartMsg: { // highchart渲染信息
        credits: {
            enabled: false
        },
        // 全局
        chart: {
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            margin: [40, 20, 60, 20]
        },
        // 标题
        title: {
            text: '浏览器的市场占比',
            x: 1,
            y: 14,
            style: {
                color: '#fff',
                fontSize: 14
            }
        },
        // 副标题
        subtitle: {
            x: 1,
            y: 40,
            text: '',
            style: {
                color: '#FFF',
                fontSize: 12
            }
        },
        // 数据样式
        plotOptions: {
            pie: {
                borderColor: '#EEE',
                borderWidth: 1,
                dataLabels: { // 数据标签
                    enabled: true, // show/hide
                    format: '<b>{point.name}</b>: <span>{point.percentage:.1f}%</span>',
                    distance: 30,
                    style: {
                        color: '#FFF',
                        fontSize: 12
                    }
                },
                showInLegend: true
            },
            series: {
                animation: false,
                events: {
                    legendItemClick: function () {
                  // return false 即可禁止图例点击响应
                        return false;
                    }
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        tooltip: {
            valueDecimals: 1
        },
        legend: {
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            y:20,
            x : 0,
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
        // 数据列
        series: [{
            type: 'pie',
            data: [
                {
                    name: 'Firefox',
                    y: 45.0,
                    color: 'rgb(124, 181, 236)'
                },
                {
                    name: 'IE',
                    y: 26.8,
                    color: 'rgb(92, 92, 97)'
                },
                {
                    name: 'Chrome',
                    y: 12.8,
                    color: 'rgb(144, 237, 125)'
                },
                {
                    name: 'Safari',
                    y: 8.5,
                    color: 'rgb(247, 163, 92)'
                },
                {
                    name: 'Opera',
                    y: 6.2,
                    color: 'rgb(128, 133, 233)'
                },
                {
                    name: '其他',
                    y: 0.7,
                    color: 'rgb(241, 92, 128)'
                }
            ]
        }]
    },
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [
            {
                "x": "Firefox",
                "y": 45.0
            },
            {
                "x": 'IE',
                "y": 26.8
            },
            {
                "x": 'Chrome',
                "y": 12.8
            },
            {
                "x": 'Safari',
                "y": 8.5
            },
            {
                "x": "Opera",
                "y": 6.2
            },
            {
                "x": "其他",
                "y": 0.7
            }

        ],
        data: [], // 存储具体数据
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
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    }
};

export default [basePie];
