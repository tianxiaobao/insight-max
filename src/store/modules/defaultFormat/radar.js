import { publicChartOption,createDataLabelsOption } from './publicChartOption.js';

const option = publicChartOption();
option.type = 'Radar';
option.chartMsg.chart.polar = true;
option.name = '雷达图';
option.img = './static/images/radar.png';
option.chartType = 'highchart';
option.chartMsg.yAxis.gridLineWidth = 2;
option.chartMsg.yAxis.gridLineDashStyle = 'Solid';
option.chartMsg.yAxis.gridLineInterpolation = 'circle';
option.chartMsg.xAxis.tickmarkPlacement='on';
option.chartMsg.xAxis.lineWidth=0;
option.chartMsg.pane ={
    size: '80%',
    startAngle: 40
};
option.chartMsg.optionDisplay={
    dashStyle : 'Solid',
    value : 1,
    name  : '预算拨款',
    color : '#327EC8',
    lineWidth:2 ,
    lineColor:'#327EC8',
    pointPlacement: 'on',
    dataLabels: createDataLabelsOption()
};
option.chartMsg.extra = {
    defaultSeries :[
        {
            type : 'area',
            dashStyle : 'Solid',
            value : 1,
            name  : '预算拨款',
            color : '#327EC8',
            lineWidth:2 ,
            lineColor:'#327EC8',
            pointPlacement: 'on',
            dataLabels: createDataLabelsOption()
        }
    ],
    series : [
        {
            type : 'area',
            dashStyle : 'Solid',
            value : 1,
            name  : '预算拨款',
            color : '#327EC8',
            lineWidth:2 ,
            lineColor:'#327EC8',
            pointPlacement: 'on',
            dataLabels: createDataLabelsOption()
        },
        {
            type : 'area',
            dashStyle : 'Solid',
            value : 2,
            name  : '实际支出',
            color : '#6CF5F2',
            lineWidth:2 ,
            lineColor:'#6CF5F2',
            pointPlacement: 'on',
            dataLabels: createDataLabelsOption()
        }
    ]
};

export default [ option ];
