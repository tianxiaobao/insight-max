import {createDataLabelsOption} from './publicChartOption.js';
export default [{
    id: '',
    type: 'columnRange',
    chartType: 'highchart', // chartType是highchart的会统一调hightchart接口渲染，其它调用callback渲染
    name: '柱状范围图',
    x: 100,  // x坐标
    y: 100,  // y坐标
    height: 300,
    width: 500,
    visiable: true,
    img: './static/images/10.png', // 缩略图信息
    checked:false,
    zIndex : 100,
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData:[
            {
                "x": "一月",
                "y1": 7.0,
                "y2": 6.0,
                "s": "1"
            },
            {
                "x": "一月",
                "y1": 2,
                "y2": 4,
                "s": "2"
            },
            {
                "x": "一月",
                "y1": 4.4,
                "y2": 3.4,
                "s": "3"
            },
            {
                "x": "二月",
                "y1": 6.9,
                "y2": 5.9,
                "s": "1"
            },
            {
                "x": "二月",
                "y1": 0.8,
                "y2": 1.8,
                "s": "2"
            },
            {
                "x": "二月",
                "y1": 2,
                "y2": 1,
                "s": "3"
            },
            {
                "x": "三月",
                "y1": 9.5,
                "y2": 5.5,
                "s": "1"
            },
            {
                "x": "三月",
                "y1": 5.7,
                "y2": 6.7,
                "s": "2"
            },
            {
                "x": "三月",
                "y1": 10,
                "y2": 12,
                "s": "3"
            },
            {
                "x": "四月",
                "y1": 14.5,
                "y2": 12.5,
                "s": "1"
            },
            {
                "x": "四月",
                "y1": 11.3,
                "y2": 10.3,
                "s": "2"
            },
            {
                "x": "四月",
                "y1": 17,
                "y2": 15,
                "s": "3"
            }
        ],
        data: [], // 存储具体数据
        reflect: [{
            name: "x",
            reflectName: 'x',
            construction: '类目',
            state: true
        },{
            name: "y1",
            reflectName: 'y1',
            construction: '值',
            state: true
        },
        {
            name: "y2",
            reflectName: 'y2',
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
                dataLabels: createDataLabelsOption()
            },
            series : [
                {
                    value : 1,
                    name  : '东京',
                    color : '#327EC8',
                    dataLabels: createDataLabelsOption()
                }
            ]
        },
        credits:{
            enabled:false
        },
        chart:{
            type :'columnrange',
            inverted: true,
            backgroundColor : '',
            borderColor:'#335cad', // 边框颜色
            borderWidth: 0,        // 边框宽度
            marginLeft: 60,        // 左侧
            marginRight: 60,       // 右侧
            marginTop: 70,         // 顶部
            marginBottom: 60      // 底部
        },
        title: {
            text: '不同城市的月平均气温', // 标题名称
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
        xAxis: {
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
                text : '月份', // 标题名称
                style:{
                    color: "#ffffff", // 颜色
                    fontSize: "12" // 大小
                },
                x: 0, // 位置
                y: -5 // weizhi
            },
            type:'category'
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
                text: '温度 (°C)', //
                style:{
                    color: "#ffffff",//
                    fontSize: "12"//
                },
                x: 0,//
                y: 0 //
            },
            gridLineWidth : 0
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
                pointWidth:'20'
            }
        },
        legend: {
            enabled:true,
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
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
            name: '东京',
            data: [
                [1.7, 9.4],
                [1.7, 6.5],
                [3.5, 9.4],
                [1.4, 19.9]
            ],
            color : '#327EC8'
        }]
    }
}];
