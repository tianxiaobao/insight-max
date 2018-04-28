import {createDataLabelsOption} from './publicChartOption.js';
export default [{
    id: '',
    type: 'lineBar',
    chartType: 'highchart', // chartType是highchart的会统一调hightchart接口渲染，其它调用callback渲染
    name: '折线柱图',
    x: 100,  // x坐标
    y: 100,  // y坐标
    height: 300,
    width: 500,
    visiable: true,
    img: './static/images/line-bar.png', // 缩略图信息
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
        },
        {
            name: "y1",
            reflectName: 'y1',
            construction: '柱状值',
            state: true
        },
        {
            name: "y2",
            reflectName: 'y2',
            construction: '折线值',
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
            series : {
                'column':{
                    value : 1,
                    name  : '东京',
                    type: 'column',
                    yAxis: 0,
                    color : '#327EC8',
                    borderColor:'#327EC8',
                    borderWidth:2 ,
                    pointWidth:'20',
                    dataLabels: createDataLabelsOption()
                },
                'line':{
                    name  : '纽约',
                    dashStyle : 'Solid',
                    type: 'line',
                    yAxis: 1,
                    color : '#6CF5F2',
                    lineWidth:2 ,
                    marker : {
                        fillColor : '#6CF5F2',
                        radius  : 5
                    },
                    dataLabels: createDataLabelsOption()
                }
            }
        },
        credits:{
            enabled:false
        },
        // 全局样式
        chart:{
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
            text: '不同城市的月平均气温', // 标题名称
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
        // X轴
        xAxis: {
            visible: true,
            lineColor: '#ffffff', // 颜色
            lineWidth: 1, // 宽度
            tickLength: 0,// 刻度线长度
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
                y: -5 // 位置
            },
            // categories: ['一月', '二月', '三月', '四月']
            type:'category'
        },
        yAxis: [{
            visible: true,
            lineColor: '#ffffff', // 颜色
            lineWidth: 1, // 宽度
            plotLines: [{
                color: '',
                width: 0,
                value: 0
            }],
            labels:{
                style:{
                    color: "#ffffff", // 文本颜色
                    fontSize: "11" // 文本字号
                }
            },
            title: {
                text: '温度 (°C)', // 标题名称
                style:{
                    color: "#ffffff",// 颜色
                    fontSize: "12"// 大小
                },
                x: 0,// 位置
                y: 0 // 位置
            },
            gridLineColor: "#e6e6e6", // 坐标轴的网格线颜色
            gridLineWidth : 0 // 坐标轴的网格线宽度
        },
        {
            visible: true,
            lineColor: '#ffffff', // 颜色
            lineWidth: 1, // 宽度
            plotLines: [{
                color: '',
                width: 0,
                value: 0
            }],
            labels:{
                style:{
                    color: "#ffffff", // 文本颜色
                    fontSize: "11" // 文本字号
                }
            },
            title: {
                text: '降雨量 (mm)', // 标题名称
                style:{
                    color: "#ffffff",// 颜色
                    fontSize: "12"// 大小
                },
                x: 0,// 位置
                y: 0 // 位置
            },
            gridLineColor: "#e6e6e6", // 坐标轴的网格线颜色
            gridLineWidth : 0, // 坐标轴的网格线宽度
            opposite: true
        }],
        // 提示
        tooltip: {
            enabled: false
        },
        plotOptions:{
            line:{
                marker:{
                    symbol : 'circle'
                }
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
        // 图例
        legend: {
            enabled:true,
            x : 0, // 位置
            y:20, // 位置
            itemStyle:{
                color: "#ffffff", // 颜色
                fontSize: "12",  // 大小
                cursor : 'move' // 形状
            },
            itemHoverStyle: null
        },
        // 系列生成数据
        s : [
            {
                'column':{
                    value : 1,
                    name  : '东京',
                    type: 'column',
                    yAxis: 0,
                    color : '#327EC8',
                    borderColor:'#327EC8',
                    borderWidth:2 ,
                    pointWidth:'20',
                    dataLabels: createDataLabelsOption()
                },
                'line':{
                    name  : '纽约',
                    dashStyle : 'Solid',
                    type: 'line',
                    yAxis: 1,
                    color : '#6CF5F2',
                    lineWidth:2 ,
                    marker : {
                        fillColor : '#6CF5F2',
                        radius  : 5
                    },
                    dataLabels: createDataLabelsOption()
                }
            }
        ],
        series: [{
            name: '东京',
            type: 'column',
            yAxis: 0,
            data: [7.0, 6.9, 9.5, 14.5],
            color : '#327EC8',
            borderColor:'#327EC8',
            borderWidth:2 ,
            pointWidth:'20',
            dataLabels: createDataLabelsOption()
        }, {
            name: '纽约',
            dashStyle : 'Solid',
            type: 'line',
            yAxis: 1,
            data: [6, 5.9, 5.5, 12.5],
            color : '#6CF5F2',
            lineWidth:2 ,
            marker : {
                fillColor : '#6CF5F2',
                radius  : 5
            },
            dataLabels: createDataLabelsOption()
        }]
    }
}];
