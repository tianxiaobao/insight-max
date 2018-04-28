export default [{
    id: '',
    type: 'negativeBar',
    chartType: 'highchart', // chartType是highchart的会统一调hightchart接口渲染，其它调用callback渲染
    name: '金字塔条形图',
    x: 100,  // x坐标
    y: 100,  // y坐标
    height: 300,
    width: 500,
    visiable: true,
    img: './static/images/13.png', // 缩略图信息
    checked:false,
    zIndex : 100,
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData:[
            {
                "x": "0-4",
                "y": -1746181,
                "s": "1"
            },
            {
                "x": "0-4",
                "y": 1656154,
                "s": "2"
            },
            {
                "x": "5-9",
                "y": -1884428,
                "s": "1"
            },
            {
                "x": "5-9",
                "y": 1787564,
                "s": "2"
            },
            {
                "x": "10-14",
                "y": -2089758,
                "s": "1"
            },
            {
                "x": "10-14",
                "y": 1981671,
                "s": "2"
            },
            {
                "x": "15-19",
                "y": -2222362,
                "s": "1"
            },
            {
                "x": "15-19",
                "y": 2108575,
                "s": "2"
            },
            {
                "x": "20-24",
                "y": -2537431,
                "s": "1"
            },
            {
                "x": "20-24",
                "y": 2403438,
                "s": "2"
            },
            {
                "x": "25-29",
                "y": -2507081,
                "s": "1"
            },
            {
                "x": "25-29",
                "y": 2366003,
                "s": "2"
            },
            {
                "x": "30-34",
                "y": -2443179,
                "s": "1"
            },
            {
                "x": "30-34",
                "y": 2301402,
                "s": "2"
            },
            {
                "x": "35-39",
                "y": -2664537,
                "s": "1"
            },
            {
                "x": "35-39",
                "y": 2519874,
                "s": "2"
            },
            {
                "x": "40-44",
                "y": -3556505,
                "s": "1"
            },
            {
                "x": "40-44",
                "y": 3360596,
                "s": "2"
            },
            {
                "x": "45-49",
                "y": -3680231,
                "s": "1"
            },
            {
                "x": "45-49",
                "y": 3493473,
                "s": "2"
            },
            {
                "x": "50-54",
                "y": -3143062,
                "s": "1"
            },
            {
                "x": "50-54",
                "y": 3050775,
                "s": "2"
            },
            {
                "x": "55-59",
                "y": -2721122,
                "s": "1"
            },
            {
                "x": "55-59",
                "y": 2759560,
                "s": "2"
            },
            {
                "x": "60-64",
                "y": -2229181,
                "s": "1"
            },
            {
                "x": "60-64",
                "y": 2304444,
                "s": "2"
            },
            {
                "x": "65-69",
                "y": -2227768,
                "s": "1"
            },
            {
                "x": "65-69",
                "y": 2426504,
                "s": "2"
            },
            {
                "x": "70-74",
                "y": -2176300,
                "s": "1"
            },
            {
                "x": "70-74",
                "y": 2568938,
                "s": "2"
            },
            {
                "x": "75-79",
                "y": -1329968,
                "s": "1"
            },
            {
                "x": "75-79",
                "y": 1785638,
                "s": "2"
            },
            {
                "x": "80-84",
                "y": -836804,
                "s": "1"
            },
            {
                "x": "80-84",
                "y": 1447162,
                "s": "2"
            },
            {
                "x": "85-89",
                "y": -354784,
                "s": "1"
            },
            {
                "x": "85-89",
                "y": 1005011,
                "s": "2"
            },
            {
                "x": "90-94",
                "y": -90569,
                "s": "1"
            },
            {
                "x": "90-94",
                "y": 330870,
                "s": "2"
            },
            {
                "x": "95-99",
                "y": -28367,
                "s": "1"
            },
            {
                "x": "95-99",
                "y": 130632,
                "s": "2"
            },
            {
                "x": "100+",
                "y": -3878,
                "s": "1"
            },
            {
                "x": "100+",
                "y": 21208,
                "s": "2"
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
        },
        {
            name: "s",
            reflectName: 's',
            construction: '系列(可选)',
            state: true
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },

    chartMsg: {
        extra:{
            defaultSeries : {
                value : 1,
                name  : '系列',
                color : '#327EC8',
                dataLabels: {
                    enabled: false,       // 开启数据标签
                    color: '',
                    style: {
                        fontSize: 11
                    },
                    formatter: function () {
                        return Math.abs(this.y);
                    }
                }
            },
            series : [
                {
                    value : 1,
                    name  : '男',
                    color : '#327EC8',
                    dataLabels: {
                        enabled: false,       // 开启数据标签
                        color: '',
                        style: {
                            fontSize: 11
                        },
                        formatter: function () {
                            return Math.abs(this.y);
                        }
                    }
                },
                {
                    value : 2,
                    name  : '女',
                    xAxis: 1,
                    color : '#6CF5F2',
                    dataLabels: {
                        enabled: false,       // 开启数据标签
                        color: '',
                        style: {
                            fontSize: 11
                        },
                        formatter: function () {
                            return Math.abs(this.y);
                        }
                    }
                }
            ]
        },
        credits:{
            enabled:false
        },
        chart:{
            type :'bar',
            backgroundColor : '',
            borderColor:'#335cad', // 边框颜色
            borderWidth: 0,        // 边框宽度
            marginLeft: 80,        // 左侧
            marginRight: 80,       // 右侧
            marginTop: 70,         // 顶部
            marginBottom: 60      // 底部
        },
        title: {
            text: '2015 年德国人口金字塔', // 标题名称
            style:{
                color    :   "#ffffff",  // 颜色
                fontSize :   "18"     // 字号
            },
            x: 0, // x 偏移
            y: 18 // y 偏移
        },
        subtitle: {
            text: '1950 ~ 2100 年世界人口金字塔', // 标题名称
            style:{
                color    :   "#ffffff", // 颜色
                fontSize :   "12" // 字号
            },
            x: 0, // x 偏移
            y: 38 // y 偏移
        },
        xAxis: [
            {
                reversed: false,
                visible: true,
                lineColor: '#ffffff', // 颜色
                lineWidth: 1, // 宽度
                tickLength: 0,
                labels:{
                    style:{
                        color: "#ffffff", // 文本颜色
                        fontSize: "11" // 文本字号
                    }
                },
                title:{
                    text : '年龄段', // 标题名称
                    style:{
                        color: "#ffffff", // 颜色
                        fontSize: "12" // 大小
                    },
                    x: 0, // 位置
                    y: -5 // weizhi
                },
                type :'category'
            },
            {
                opposite: true,
                reversed: false,
                visible: true,
                lineColor: '#ffffff', // 颜色
                lineWidth: 1, // 宽度
                tickLength: 0,
                labels:{
                    style:{
                        color: "#ffffff", // 文本颜色
                        fontSize: "11" // 文本字号
                    }
                },
                title:{
                    text : '年龄段', // 标题名称
                    style:{
                        color: "#ffffff", // 颜色
                        fontSize: "12" // 大小
                    },
                    x: 0, // 位置
                    y: -5 // weizhi
                },
                type :'category'
            }
        ],
        yAxis: {
            visible:true,
            lineColor: '#ffffff', //
            lineWidth: 1, //
            labels:{
                style:{
                    color: "#ffffff", //
                    fontSize: "11" //
                },
                formatter: function () {
                    return Math.abs(this.value);
                }
            },
            title: {
                text: null, //
                style:{
                    color: "#ffffff",//
                    fontSize: "12"//
                },
                x: 0,//
                y: 0 //
            },
            gridLineWidth : 0 //
        },
        tooltip: {
            enabled: false
        },
        plotOptions:{
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
                },
                stacking: 'normal'
            }
        },
        legend: {
            enabled:true,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            verticalAlign :'top',
            y:20, //
            x : 0, //
            itemStyle:{
                color: "#ffffff", //
                fontSize: "12",  //
                cursor : 'move'
            },
            itemHoverStyle: null
        },
        series: [{
            value : 1,
            name: '男',
            data: [
                {
                    y: -1746181,
                    name: '0-4'
                },
                {
                    y:  -1884428,
                    name: '5-9'
                }
            ],
            color : '#327EC8'
        }, {
            value : 2,
            name: '女',
            xAxis: 1,
            data: [
                {
                    y: 1656154,
                    name: '0-4'
                }, {
                    y:  1787564,
                    name: '5-9'
                }
            ],
            color : '#6CF5F2'
        }]
    }
}];
