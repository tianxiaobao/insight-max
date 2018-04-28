import {createDataLabelsOption} from './publicChartOption.js';
export default [{
    id: '',
    type: 'waterFall',
    chartType: 'highchart', // chartType是highchart的会统一调hightchart接口渲染，其它调用callback渲染
    name: '瀑布图',
    x: 100,  // x坐标
    y: 100,  // y坐标
    height: 300,
    width: 500,
    visiable: true,
    img: './static/images/14.png', // 缩略图信息
    checked:false,
    zIndex : 100,
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData:[
            {
                "x": "启动资金",
                "y": 120000
            },
            {
                "x": "产品收入",
                "y": 569000
            },
            {
                "x": "服务收入",
                "y": 231000
            },
            {
                "x": "正平衡",
                "y": ''
            },
            {
                "x": "固定成本",
                "y": -342000
            },
            {
                "x": "可变成本",
                "y": -233000
            },
            {
                "x": "余额",
                "y": ''
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
    },

    chartMsg: {
        extra:{
            defaultSeries : {
                name  : '数据',
                rName : '启动资金',
                y:'',
                isY:true,
                isIntermediateSum: false,
                isSum: false,
                color : '#327EC8',
                dataLabels: createDataLabelsOption()
            },
            series : [{
                data:[
                    {
                        name  : '启动资金',
                        rName : '启动资金',
                        y:'120000',
                        isY:true,
                        isIntermediateSum: false,
                        isSum: false,
                        color : '#90ec7d',
                        dataLabels: createDataLabelsOption()
                    },
                    {
                        name  : '产品收入',
                        rName : '产品收入',
                        y:'569000',
                        isY:true,
                        isIntermediateSum: false,
                        isSum: false,
                        color : '#90ec7d',
                        dataLabels: createDataLabelsOption()
                    },
                    {
                        name  : '服务收入',
                        rName : '服务收入',
                        y:'231000',
                        isY:true,
                        isIntermediateSum: false,
                        isSum: false,
                        color : '#90ec7d',
                        dataLabels: createDataLabelsOption()
                    },
                    {
                        name  : '正平衡',
                        rName : '正平衡',
                        y:'',
                        isY:false,
                        isIntermediateSum: true,
                        isSum: false,
                        color : '#444349',
                        dataLabels: createDataLabelsOption()
                    },
                    {
                        name  : '固定成本',
                        rName : '固定成本',
                        y:'',
                        isY:true,
                        isIntermediateSum: false,
                        isSum: false,
                        color : '#f7a35d',
                        dataLabels: createDataLabelsOption()
                    },
                    {
                        name  : '可变成本',
                        rName : '可变成本',
                        y:'',
                        isY:true,
                        isIntermediateSum: false,
                        isSum: false,
                        color : '#f7a35d',
                        dataLabels: createDataLabelsOption()
                    },
                    {
                        name  : '余额',
                        rName : '余额',
                        y:'',
                        isY:false,
                        isIntermediateSum: false,
                        isSum: true,
                        color : '#444349',
                        dataLabels: createDataLabelsOption()
                    }
                ]
            }]
        },
        credits:{
            enabled:false
        },
        chart:{
            type :'waterfall',
            backgroundColor : '',
            borderColor:'#335cad', // 边框颜色
            borderWidth: 0,        // 边框宽度
            marginLeft: 80,        // 左侧
            marginRight: 60,       // 右侧
            marginTop: 70,         // 顶部
            marginBottom: 60      // 底部
        },
        title: {
            text: 'Highcharts Waterfall', // 标题名称
            style:{
                color    :   "#ffffff",  // 颜色
                fontSize :   "18"     // 字号
            },
            x: 0, // x 偏移
            y: 18 // y 偏移
        },
        subtitle: {
            text: '数据来源: jcloud.com', // 标题名称
            style:{
                color    :   "#ffffff", // 颜色
                fontSize :   "12" // 字号
            },
            x: 0, // x 偏移
            y: 38 // y 偏移
        },
        xAxis:{
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
                text : null, // 标题名称
                style:{
                    color: "#ffffff", // 颜色
                    fontSize: "12" // 大小
                },
                x: 0, // 位置
                y: -5 // weizhi
            },
            type :'category'
        },
        yAxis: {
            visible:true,
            lineColor: '#ffffff', //
            lineWidth: 1, //
            labels:{
                style:{
                    color: "#ffffff", //
                    fontSize: "11" //
                }
            },
            title: {
                text: 'USD', //
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
                }
            }
        },
        legend: {
            enabled:false
        },
        series: [
            {
                data: [{
                    name: '启动资金',
                    y: 120000
                }, {
                    name: '产品收入',
                    y: 569000
                }, {
                    name: '服务收入',
                    y: 231000
                }, {
                    name: '正平衡',
                    isIntermediateSum: true
                }, {
                    name: '固定成本',
                    y: -342000
                }, {
                    name: '可变成本',
                    y: -233000
                }, {
                    name: '余额',
                    isSum: true
                }]
            }
        ]
    }
}];
