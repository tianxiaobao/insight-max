const commonProp = (name, imgsrc) => {
    return {
        id: '',
        type: 'threeDPie',
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

const threeDPie = {
    ...commonProp('3D饼图', './static/images/threeDPie.png'),

    chartMsg: { // highchart渲染信息
        credits: {
            enabled: false
        },
        // 全局样式
        chart:{
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor : '',
            borderColor:'#335cad', // 边框颜色
            borderWidth: 0,        // 边框宽度
            marginLeft: 60,        // 左侧
            marginRight: 60,       // 右侧
            marginTop: 70,         // 顶部
            marginBottom: 60       // 底部
        },
        // 主标题
        title: {
            text: '浏览器的市场占比',
            style:{
                color    :   "#ffffff",  // 颜色
                fontSize :   "18"     // 字号
            },
            x: 0, // x 偏移
            y: 18 // y 偏移
        },
        // 副标题
        subtitle: {
            text: '数据来源: jcloud.com', // 标题名称
            style:{
                color    :   "#ffffff", // 颜色
                fontSize :   "12" // 字号
            },
            x: 0, // x 偏移
            y: 38 // y 偏移
        },
        // 数据样式
        plotOptions: {
            pie: {
                cursor: '',
                depth: 45,
                dataLabels: {
                    enabled: false,
                    distance: 30,
                    format: '<b>{point.name}</b>: <span>{point.percentage:.1f}%</span>',
                    style: {
                        color: '#ffffff',
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
            enabled: false
        },
        legend: {
            enabled:true,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            x : 0, // 位置
            y:20, // 位置
            itemStyle:{
                color: "#ffffff", // 颜色
                fontSize: "12",  // 大小
                cursor : 'move' // 形状
            },
            itemHoverStyle: null
        },
        // 数据列
        series: [{
            type: 'pie',
            data: [
                {
                    name: 'Firefox',
                    y: 45.0
                },
                {
                    name: 'IE',
                    y: 26.8
                },
                {
                    name: 'Chrome',
                    y: 12.8
                },
                {
                    name: 'Safari',
                    y: 8.5
                },
                {
                    name: 'Opera',
                    y: 6.2
                },
                {
                    name: '其他',
                    y: 0.7
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

export default [threeDPie];
